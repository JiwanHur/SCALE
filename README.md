# SCALE · NeurIPS 2026

**Improving Guidance-Free Visual Generation via Self-Contrastive Alignment for Likelihood Estimation**

Jiwan Hur · Dong-Jae Lee · Dongyeun Lee · Gyojin Han · Junmo Kim  
KAIST, South Korea

**Our paper has been accepted to NeurIPS 2026. Code coming soon!**

[Project page](https://jiwanhur.github.io/SCALE/) · [Paper](docs/assets/paper.pdf)

SCALE learns from the contrast between the model's predictions on real and self-generated samples. It incorporates this self-contrastive signal into likelihood training, improving visual generation with one model evaluation per sampling step and no additional sampling-time guidance branch. The framework applies to diffusion and autoregressive models and complements preference-based fine-tuning.

![Guidance-free generation with SD1.5, GFT, and SCALE, with and without DPO](docs/assets/images/comparison.webp)

## Selected results

Guidance-free class-conditional generation on ImageNet 256 × 256. FID-50k ↓; lower is better.

| Model | Base | GFT | SCALE |
| --- | ---: | ---: | ---: |
| DiT-XL/2 | 9.62 | 1.99 | **1.87** |
| LlamaGen-L | 19.0 | 2.88 | **2.58** |

See the paper for the full comparisons, text-to-image results, and experimental settings.

## Code release

The official implementation will be released in this repository. Training code, inference instructions, and dependencies will be documented with the release.

## Citation

```bibtex
@inproceedings{hur2026scale,
  title     = {Improving Guidance-Free Visual Generation via
               Self-Contrastive Alignment for Likelihood Estimation},
  author    = {Hur, Jiwan and Lee, Dong-Jae and Lee, Dongyeun
               and Han, Gyojin and Kim, Junmo},
  booktitle = {Advances in Neural Information Processing Systems},
  year      = {2026},
  url       = {https://jiwanhur.github.io/SCALE/}
}
```

## Project page maintenance

The website is a static page in `docs/`; no build step or package installation is required.

```bash
python3 -m http.server 8000 --directory docs
```

Open `http://localhost:8000`. The same files also work under the GitHub Pages `/SCALE/` path.

For GitHub Pages, select **Settings → Pages → Deploy from a branch → main → /docs**. The expected URL is `https://jiwanhur.github.io/SCALE/`.

Alternatively, log in to the **official GitHub CLI** as `JiwanHur`, then run:

```bash
gh auth login --hostname github.com --git-protocol https --web
python3 scripts/publish.py
```

The helper creates the public repository if needed, commits the website files, pushes `main`, and configures Pages to serve `docs/`. It does not force-push or change global Git settings. If the official CLI has a different executable path, set `SCALE_GH_BIN` to that path when running the helper.

- `docs/index.html`: paper details, method, results, and citation.
- `docs/style.css`: responsive layout and styling.
- `docs/script.js`: example/DPO comparison, figure enlargement, and citation copying.
- `docs/assets/paper.pdf`: downloadable manuscript; replace when the final PDF is ready.
- `ASSETS.md`: figure sources and extraction notes.
- `scripts/publish.py`: GitHub repository and Pages setup after account authentication.

When code is released, update the announcement in both this README and `docs/index.html`.
