"use strict";

const examples = {
  fireworks: "a crowd of people watching fireworks",
  portrait: "Close up of an intimidating head with smoke coming out of the ears, watching a smartphone. dynamic angle",
  "green-hair": "a sad man with green hair",
  painting: "jake gyllenhaall drinking an ice cold beer, painting by egon schiele",
  squirrel: "A punk rock squirrel in a studded leather jacket shouting into a microphone while standing on a stump",
  raccoon: "portrait of a well-dressed raccoon, oil painting in the style of Rembrandt",
  shoes: "a pair of brown suede shoes",
  tower: "wonderful image of a landscape and a medieval tower",
  cottage: "fairy cottage with smoke coming up chimney and a squirrel looking from the window",
};
const models = { sd15: "SD1.5", gft: "GFT", scale: "SCALE" };
let activeExample = "fireworks";
const dpoToggle = document.querySelector("#dpo-toggle");
const exampleButtons = document.querySelectorAll("[data-example]");
const exampleKeys = Object.keys(examples);

function updateComparison(revealThumbnail = false) {
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
    // Reveal the active thumbnail without moving the page vertically.
    if (revealThumbnail && button.dataset.example === activeExample) {
      const picker = button.parentElement;
      const pickerBounds = picker.getBoundingClientRect();
      const buttonBounds = button.getBoundingClientRect();
      if (buttonBounds.left < pickerBounds.left + 4) {
        picker.scrollLeft += buttonBounds.left - pickerBounds.left - 4;
      } else if (buttonBounds.right > pickerBounds.right - 4) {
        picker.scrollLeft += buttonBounds.right - pickerBounds.right + 4;
      }
    }
  }
  document.querySelector("#prompt-text").textContent = `“${examples[activeExample]}”`;
  document.querySelector("#example-position").textContent = `${exampleKeys.indexOf(activeExample) + 1} / ${exampleKeys.length}`;
}

for (const button of exampleButtons) {
  button.addEventListener("click", () => {
    activeExample = button.dataset.example;
    updateComparison(true);
  });
}
function stepExample(direction) {
  const index = exampleKeys.indexOf(activeExample);
  activeExample = exampleKeys[(index + direction + exampleKeys.length) % exampleKeys.length];
  updateComparison(true);
}
document.querySelector("#previous-example").addEventListener("click", () => stepExample(-1));
document.querySelector("#next-example").addEventListener("click", () => stepExample(1));
dpoToggle.addEventListener("change", () => updateComparison());
updateComparison();
document.querySelector(".comparison-controls").hidden = false;
document.querySelector(".example-picker").hidden = false;

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
