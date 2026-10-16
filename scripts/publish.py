#!/usr/bin/env python3
"""Publish this project page using an authenticated official GitHub CLI."""

import json
import os
from pathlib import Path
import shlex
import shutil
import subprocess
import sys
import time


ROOT = Path(__file__).resolve().parents[1]
REPO = "JiwanHur/SCALE"
REMOTE = f"https://github.com/{REPO}.git"
SITE = "https://jiwanhur.github.io/SCALE/"
GH = os.environ.get("SCALE_GH_BIN") or shutil.which("gh")


def run(*args, check=True):
    if args[0] == "git" and args[1] != "init":
        args = ("git", f"--git-dir={ROOT / '.git'}", f"--work-tree={ROOT}", *args[1:])
    result = subprocess.run(args, cwd=ROOT, text=True, capture_output=True)
    if check and result.returncode:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    return result


def api(endpoint, method="GET", data=None, missing_ok=False):
    args = [GH, "api", endpoint, "--method", method]
    if data is not None:
        args += ["--input", "-"]
    result = subprocess.run(args, cwd=ROOT, text=True, capture_output=True,
                            input=json.dumps(data) if data is not None else None)
    if result.returncode:
        if missing_ok and "HTTP 404" in result.stderr:
            return None
        raise RuntimeError(result.stderr.strip())
    return json.loads(result.stdout) if result.stdout.strip() else {}


def main():
    if not GH or not run(GH, "--version", check=False).stdout.startswith("gh version "):
        raise RuntimeError("The official GitHub CLI is required. Set SCALE_GH_BIN to its executable path.")
    run(GH, "auth", "status", "--hostname", "github.com")
    user = api("user")
    if user["login"].lower() != "jiwanhur":
        raise RuntimeError("Log in with the JiwanHur account before publishing this repository.")

    # Validate the local source before creating or modifying a remote repository.
    if not (ROOT / "docs/index.html").is_file() or not (ROOT / "docs/assets/paper.pdf").is_file():
        raise RuntimeError("The project page or paper PDF is missing.")
    if not (ROOT / ".git").exists():
        run("git", "init")
        run("git", "symbolic-ref", "HEAD", "refs/heads/main")
    if run("git", "symbolic-ref", "--short", "HEAD").stdout.strip() != "main":
        raise RuntimeError("Switch to the main branch before publishing.")
    origin = run("git", "remote", "get-url", "origin", check=False)
    if origin.returncode:
        run("git", "remote", "add", "origin", REMOTE)
    elif origin.stdout.strip() != REMOTE:
        raise RuntimeError(f"The origin remote must be {REMOTE}. Existing remotes are not changed automatically.")

    repo = api(f"repos/{REPO}", missing_ok=True)
    if repo is None:
        api("user/repos", "POST", {
            "name": "SCALE", "private": False,
            "description": "[NeurIPS 2026] Self-Contrastive Alignment for Likelihood Estimation. Code coming soon.",
            "homepage": SITE,
        })

    # A repository-local public GitHub identity avoids changing global Git settings.
    if run("git", "config", "user.name", check=False).returncode:
        run("git", "config", "user.name", user.get("name") or user["login"])
    if run("git", "config", "user.email", check=False).returncode:
        run("git", "config", "user.email", f"{user['id']}+{user['login']}@users.noreply.github.com")
    run("git", "add", "--", "README.md", "ASSETS.md", ".gitignore", "docs", "scripts")
    if run("git", "diff", "--cached", "--quiet", check=False).returncode == 1:
        run("git", "commit", "-m", "Add SCALE NeurIPS 2026 project page")
    expected_commit = run("git", "rev-parse", "HEAD").stdout.strip()
    helper = "!" + shlex.quote(GH) + " auth git-credential"
    run("git", "-c", "credential.helper=", "-c", f"credential.helper={helper}",
        "push", "--set-upstream", "origin", "main")
    print(f"Source uploaded: https://github.com/{REPO}", flush=True)

    pages = api(f"repos/{REPO}/pages", missing_ok=True)
    configuration = {"build_type": "legacy", "source": {"branch": "main", "path": "/docs"}}
    if pages is None:
        api(f"repos/{REPO}/pages", "POST", configuration)
    elif pages.get("source") != configuration["source"] or pages.get("build_type", "legacy") != "legacy":
        api(f"repos/{REPO}/pages", "PUT", configuration)
    api(f"repos/{REPO}", "PATCH", {"homepage": SITE})
    print("GitHub Pages configured for main /docs. Waiting for the build…", flush=True)
    for attempt in range(12):
        status = api(f"repos/{REPO}/pages/builds/latest", missing_ok=True)
        if status and status.get("status") == "built" and status.get("commit") == expected_commit:
            print(f"GitHub Pages build succeeded: {SITE}", flush=True)
            return
        if status and status.get("status") == "errored" and status.get("commit") == expected_commit:
            raise RuntimeError(f"Pages build failed: {status.get('error', {}).get('message', 'See the repository Actions tab.')}")
        time.sleep(10)
    print(f"Source is uploaded; the Pages build is still pending. Check {SITE}", flush=True)


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, OSError) as error:
        print(f"Publication stopped: {error}", file=sys.stderr)
        sys.exit(1)
