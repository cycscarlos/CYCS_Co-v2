/* ============================================================
   CYCS & Co. — Gallery Lightbox v2.0
   Usa <dialog> nativo HTML5 — sin dependencias externas
   ============================================================ */
export function initGalleryLightbox() {
  const dialog   = document.getElementById('galleryLightbox');
  if (!dialog || dialog.dataset.initialized) return;
  dialog.dataset.initialized = 'true';

  const img      = document.getElementById('lightboxImg');
  const caption  = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('closeLightbox');

  // Attach click to every gallery image
  document.querySelectorAll('.gallery-container .gallery-item img').forEach(function (thumb) {
    thumb.style.cursor = 'zoom-in';
    thumb.addEventListener('click', function () {
      img.src     = thumb.src;
      img.alt     = thumb.alt;
      caption.textContent = thumb.alt;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });

  // Close button
  closeBtn.addEventListener('click', closeDialog);

  // Click backdrop to close
  dialog.addEventListener('click', function (e) {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom
    ) {
      closeDialog();
    }
  });

  // Escape key (native dialog handles it, but restore scroll)
  dialog.addEventListener('close', function () {
    document.body.style.overflow = '';
  });

  function closeDialog() {
    dialog.close();
    document.body.style.overflow = '';
  }
}
