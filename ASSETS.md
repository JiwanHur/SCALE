# Project page assets

All research figures and reported results are taken from the accompanying SCALE manuscript. No new experimental samples were generated for the website.

| Website asset | Manuscript source |
| --- | --- |
| `docs/assets/images/{portrait,fireworks}-{sd15,gft,scale}[-dpo].webp` | The two image strips embedded in `figure/visualize_sd15_dpo.pdf`, split into their six original 512 × 512 panels. Column order: SD1.5, SD1.5+DPO, GFT, GFT+DPO, SCALE, SCALE+DPO. |
| `docs/assets/images/comparison.webp` | Full rendering of `figure/visualize_sd15_dpo.pdf`. |
| `docs/assets/images/method.webp` | `figure/method_idea_2.pdf`. |
| `docs/assets/images/dit.webp` | `figure/visualize_supp_dit.pdf`. |
| `docs/assets/images/llamagen.webp` | `figure/visualize_supp_llama.pdf`. |
| `docs/assets/paper.pdf` | Current manuscript, rebuilt with its Project page link set to `https://jiwanhur.github.io/SCALE/`. |

Figures are rendered or extracted with Poppler and saved as WebP at quality 93. Image panels are not retouched. The gallery preserves the original alpha/beta grids and labels; smaller alpha/beta values correspond to stronger implicit guidance.

The downloadable PDF was built from a temporary copy of the main LaTeX file. Its extracted text differs from the manuscript PDF only in the Project page URL. The original LaTeX files and PDF in the manuscript workspace were not modified.

The favicon and small patch motif are native SVG/CSS elements created for this page. The page uses system fonts and does not load third-party scripts, trackers, or font services.

Selected FID-50k values are from the manuscript's class-conditional ImageNet 256 × 256 table: DiT-XL/2 (base 9.62, GFT 1.99, SCALE 1.87) and LlamaGen-L (base 19.0, GFT 2.88, SCALE 2.58). “One evaluation per sampling step” describes the number of model evaluations, not one-step generation or a measured wall-clock speedup.
