/**
 * CYCS & Co. — Swiper v2.1 (páginas de servicio)
 * Maneja múltiples instancias de .slideshow2 en la misma página
 */
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initServiceSwipers() {
  var slides = document.querySelectorAll('.swiper.slideshow2');
  if (!slides.length) return;

  slides.forEach(function (el, i) {
    if (el.classList.contains('swiper-initialized')) return;

    /* Cada instancia necesita clases únicas para nav/pagination */
    var pag  = el.querySelector('.swiper-pagination');
    var next = el.querySelector('.swiper-button-next');
    var prev = el.querySelector('.swiper-button-prev');

    var uid = 'slideshow2-' + i;
    el.classList.add(uid);
    if (pag)  pag.classList.add('pag-'  + uid);
    if (next) next.classList.add('next-' + uid);
    if (prev) prev.classList.add('prev-' + uid);

    new Swiper('.' + uid, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 800,
      pagination: pag ? {
        el: '.pag-' + uid,
        type: 'fraction',
      } : false,
      navigation: (next && prev) ? {
        nextEl: '.next-' + uid,
        prevEl: '.prev-' + uid,
      } : false,
      autoplay: {
        delay: 3500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    });
  });
}

