/**
 * Scroll Reveal Animation
 * Handles scroll reveal animations using ScrollReveal library
 */

import ScrollReveal from 'scrollreveal';

export function initScrollReveal() {
  const sr = ScrollReveal({
    distance: "60px",
    duration: 4800,
    // reset: true, // Uncomment to reset animations on scroll up
  });

  // Reveal animations from top
  sr.reveal(`.proveedores, .telco, .muro`, {
    origin: "top",
    interval: 100,
  });

  // Reveal animations from left
  sr.reveal(`.galeria, .ctrlAcceso, .equipo`, {
    origin: "left",
    interval: 100,
  });

  // Reveal animations from right
  sr.reveal(`.clients, .security, .servicesRD`, {
    origin: "right",
    interval: 100,
  });
}







