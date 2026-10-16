<div align="center">

<h1>SCALE: Improving Guidance-Free Visual Generation via Self-Contrastive Alignment for Likelihood Estimation</h1>

<p><strong>NeurIPS 2026</strong></p>

<p>
  <strong>Jiwan&nbsp;Hur &nbsp;·&nbsp; Dong-Jae&nbsp;Lee &nbsp;·&nbsp; Dongyeun&nbsp;Lee &nbsp;·&nbsp; Gyojin&nbsp;Han &nbsp;·&nbsp; Junmo&nbsp;Kim</strong><br>
  KAIST, South Korea
</p>

[![Project Page](https://img.shields.io/badge/Project_Page-3156d8?style=for-the-badge&logo=github&logoColor=white)](https://jiwanhur.github.io/SCALE/)
[![Paper PDF](https://img.shields.io/badge/Paper-PDF-b31b1b?style=for-the-badge)](docs/assets/paper.pdf)
[![Code coming soon](https://img.shields.io/badge/Code-Coming_Soon-64748b?style=for-the-badge&logo=github&logoColor=white)](#code-release)

</div>

> 🎉 **Our paper has been accepted to NeurIPS 2026!** Code will be released soon.

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
