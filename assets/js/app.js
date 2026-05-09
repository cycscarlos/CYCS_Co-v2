/**
 * CYCS & Co. — Main Application Entry Point
 * Orchestrates all modules and libraries using ESM imports.
 */

// 1. Components Loader (must be first to inject dynamic HTML)
import './components-loader.js';

// 2. Core Styles (Vite will bundle these)
import '../css/all.min.css';
import '../css/style.css';
import '../css/smartphones.css';
import '../css/nosotros.css';
import '../css/contacto.css';
import '../css/servicios.css';
import '../css/security.css';

// 3. Vendor-specific initializations
import { initHeroSwiper } from './swiper/swiper.js';
import { initServiceSwipers } from './swiper/swiper_v2.js';
import { initScrollReveal } from './scroll/scrollReveal.js';

// 4. Utility modules
import { initGalleryLightbox } from './utils/galleryLightbox.js';
import { initMouseHover } from './utils/mouseHover.js';
import { initFormspree } from './utils/formspree.js';

// 5. Core logic
import { initAll } from './core/main.js';

// Initialize libraries
document.addEventListener('DOMContentLoaded', () => {
  initHeroSwiper();
  initServiceSwipers();
  initScrollReveal();
  initGalleryLightbox();
  initMouseHover();
  initFormspree();
  initAll();
});

// Re-initialize specific components after dynamic load
document.addEventListener('components:loaded', () => {
  initHeroSwiper();
  initServiceSwipers();
  initScrollReveal();
  initGalleryLightbox();
  initMouseHover();
  initFormspree();
  initAll();
});
// 6. Preloader control
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    document.body.classList.add('loaded');
  }
});
