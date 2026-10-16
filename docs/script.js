"use strict";

const examples = {
  fireworks: "a crowd of people watching fireworks",
  portrait: "Close up of an intimidating head with smoke coming out of the ears, watching a smartphone. dynamic angle",
};
const models = { sd15: "SD1.5", gft: "GFT", scale: "SCALE" };
let activeExample = "fireworks";
const dpoToggle = document.querySelector("#dpo-toggle");
const exampleButtons = document.querySelectorAll("[data-example]");

function updateComparison() {
  const suffix = dpoToggle.checked ? "-dpo" : "";
  const labelSuffix = dpoToggle.checked ? " + DPO" : "";
  for (const [key, label] of Object.entries(models)) {
    const img = document.querySelector(`#sample-${key}`);
    const description = `${label}${labelSuffix}: ${examples[activeExample]}`;
    img.src = `assets/images/${activeExample}-${key}${suffix}.webp`;
    img.alt = description;
    img.parentElement.href = img.src;
    img.parentElement.dataset.caption = description;
    document.querySelector(`[data-model-label="${key}"]`).textContent = label + labelSuffix;
  }
  for (const button of exampleButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.example === activeExample));
  }
  document.querySelector("#prompt-text").textContent = `“${examples[activeExample]}”`;
}

for (const button of exampleButtons) {
  button.addEventListener("click", () => {
    activeExample = button.dataset.example;
    updateComparison();
  });
}
dpoToggle.addEventListener("change", updateComparison);
updateComparison();
document.querySelector(".comparison-controls").hidden = false;

const dialog = document.querySelector("#figure-dialog");
let figureOpener = null;
if (typeof dialog.showModal === "function") {
  for (const link of document.querySelectorAll("a.zoomable")) {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      figureOpener = link;
      const description = link.dataset.caption || link.querySelector("img")?.alt || "Figure from the paper";
      document.querySelector("#dialog-image").src = link.href;
      document.querySelector("#dialog-image").alt = description;
      document.querySelector("#dialog-caption").textContent = description;
      dialog.showModal();
      document.body.classList.add("modal-open");
    });
  }
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    figureOpener?.focus({ preventScroll: true });
  });
}

const copyButton = document.querySelector("#copy-citation");
const citationStatus = document.querySelector("#citation-status");
copyButton.hidden = false;
copyButton.addEventListener("click", async () => {
  const citation = document.querySelector("#bibtex");
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(citation.textContent);
    copyButton.textContent = "Copied!";
    citationStatus.textContent = "BibTeX copied to clipboard.";
    setTimeout(() => { copyButton.textContent = "Copy BibTeX"; }, 2200);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(citation);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    citationStatus.textContent = "Citation selected. Press Ctrl+C (or ⌘C on Mac) to copy.";
  }
});
