# Project page assets

All research figures and reported results are taken from the accompanying SCALE manuscript. No new experimental samples were generated for the website.

| Website asset | Manuscript source |
| --- | --- |
| `docs/assets/images/{portrait,fireworks}-{sd15,gft,scale}[-dpo].webp` | The two image strips embedded in `figure/visualize_sd15_dpo.pdf`, split into their six original 512 × 512 panels. Column order: SD1.5, SD1.5+DPO, GFT, GFT+DPO, SCALE, SCALE+DPO. |
| `docs/assets/images/comparison.webp` | Full rendering of `figure/visualize_sd15_dpo.pdf`. |
| `docs/assets/images/{green-hair,painting,squirrel,raccoon,shoes,tower,cottage}-{sd15,gft,scale}[-dpo].webp` | The seven image strips embedded in `figure/visualize_supp_sd15_dpo.pdf` (Figure 11), split into their six original 512 × 512 panels. Same column order as above. |
| `docs/assets/images/comparison-supp.webp` | Full rendering of `figure/visualize_supp_sd15_dpo.pdf` (Figure 11). |
| `docs/assets/images/method.webp` | `figure/method_idea_2.pdf`. |
| `docs/assets/images/dit.webp` | `figure/visualize_supp_dit.pdf`. |
| `docs/assets/images/llamagen.webp` | `figure/visualize_supp_llama.pdf`. |
| `docs/assets/images/t2i-pareto.svg` | `figure/panel_a_pareto.pdf`, Figure 4(a): CLIPScore–FID trade-off. |
| `docs/assets/images/t2i-dpo.svg` | `figure/panel_b_bars.pdf`, Figure 4(c): SD1.5, GFT, and SCALE with and without DPO. |
| `docs/assets/paper.pdf` | Current manuscript, rebuilt with its Project page link set to `https://jiwanhur.github.io/SCALE/`. |

Raster figures are rendered or extracted with Poppler and saved as WebP at quality 93. Image panels are not retouched. The gallery preserves the original alpha/beta grids and labels; smaller alpha/beta values correspond to stronger implicit guidance.

The Figure 4 plots are converted directly from the original PDFs to self-contained SVG with `pdftocairo`, preserving the plotted values, axes, legends, and vector quality. The page shows panel (a) centered above panel (c), which spans the text column.

Figure 11's PDF object order differs from its visual row order. With `pdfimages -j`, the zero-based image indices are: `green-hair` → 4, `painting` → 0, `squirrel` → 5, `raccoon` → 6, `shoes` → 2, `tower` → 1, and `cottage` → 3. The comparison picker follows the visual row order, after the two main-paper examples. Prompt text is transcribed from the figures, including the original spelling. Thumbnail previews use the SCALE column without DPO; the DPO switch changes all three full-size comparison panels together.

The downloadable PDF was built from a temporary copy of the main LaTeX file. Its extracted text differs from the manuscript PDF only in the Project page URL. The original LaTeX files and PDF in the manuscript workspace were not modified.

The favicon is a native SVG created for this page. The page uses system fonts and does not load third-party scripts, trackers, or font services. The revised layout takes visual cues from the [HyperVAttention project page](https://leedongyeun.github.io/hypervattention-page/); the HTML, CSS, and comparison controls are implemented independently.

Selected FID-50k values are from the manuscript's class-conditional ImageNet 256 × 256 table: DiT-XL/2 (base 9.62, GFT 1.99, SCALE 1.87) and LlamaGen-L (base 19.0, GFT 2.88, SCALE 2.58). “One evaluation per sampling step” describes the number of model evaluations, not one-step generation or a measured wall-clock speedup.
