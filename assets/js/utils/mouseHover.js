export function initMouseHover() {
  const allGalleryContainer = document.querySelectorAll(".gallery-container");
  allGalleryContainer.forEach((galleryContainer) => {
    if (galleryContainer.dataset.initialized) return;
    galleryContainer.dataset.initialized = 'true';

    const addListeners = (div) => {
      if (!div) return;
      
      div.addEventListener("mouseenter", () => {
        div.classList.add("hover");
      });
      div.addEventListener("mouseleave", () => {
        div.classList.remove("hover");
      });
    };

    addListeners(galleryContainer);
  });
}
