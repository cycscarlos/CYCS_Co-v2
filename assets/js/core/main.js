/**
 * CYCS & Co. — Main Initialization Module
 * Unifies: menuNav + darkTheme + scroll handling + active link detection
 */

/* ── UTILITY: getElement safely ────────────────────────────── */
function getEl(id) {
  return document.getElementById(id);
}
function queryEl(selector) {
  return document.querySelector(selector);
}
function queryAll(selector) {
  return document.querySelectorAll(selector);
}

/* ════════════════════════════════════════════════════════════
    NAVIGATION — Mobile Menu
    ════════════════════════════════════════════════════════════ */
export function initNav() {
  const navMenu   = getEl('nav-menu');
  const navToggle = getEl('nav-toggle');
  const navClose  = getEl('nav-close');

  if (navToggle && !navToggle.dataset.initialized) {
    navToggle.dataset.initialized = 'true';
    navToggle.addEventListener('click', function () {
      if (navMenu) navMenu.classList.add('show-menu');
    });
  }
  if (navClose && !navClose.dataset.initialized) {
    navClose.dataset.initialized = 'true';
    navClose.addEventListener('click', function () {
      if (navMenu) navMenu.classList.remove('show-menu');
    });
  }
  queryAll('.nav__link').forEach(function (link) {
    if (link.dataset.initializedNav) return;
    link.dataset.initializedNav = 'true';
    link.addEventListener('click', function () {
      if (navMenu) navMenu.classList.remove('show-menu');
    });
  });
}

/* ════════════════════════════════════════════════════════════
    THEME — Dark/Light Toggle
    Default: Dark mode (:root in variables.css)
    Toggle: light-theme class on body
    ════════════════════════════════════════════════════════════ */
export function initTheme() {
  const themeButton = getEl('theme-button');
  if (!themeButton || themeButton.dataset.initialized) return;
  themeButton.dataset.initialized = 'true';

  const lightThemeClass = 'light-theme';
  const iconSun = 'ri-sun-line';
  const iconMoon = 'ri-moon-line';

  const selectedTheme = localStorage.getItem('selected-theme');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.classList.add(lightThemeClass);
      themeButton.classList.remove(iconSun);
      themeButton.classList.add(iconMoon); // Show moon to go dark
    } else {
      document.body.classList.remove(lightThemeClass);
      themeButton.classList.remove(iconMoon);
      themeButton.classList.add(iconSun); // Show sun to go light
    }
  };

  // Default to light if no preference
  applyTheme(selectedTheme || 'light');

  themeButton.onclick = null;
  themeButton.addEventListener('click', () => {
    const isCurrentlyLight = document.body.classList.contains(lightThemeClass);
    const newTheme = isCurrentlyLight ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('selected-theme', newTheme);
  });
}

/* ════════════════════════════════════════════════════════════
    SCROLL — Unified scroll handling
    ════════════════════════════════════════════════════════════ */
export function initScroll() {
  var header   = getEl('header');
  var scrollUp = getEl('scroll-up');

  function scrollHeader() {
    if (!header) return;
    if (window.scrollY >= 50) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }
  }

  function scrollUpButton() {
    if (!scrollUp) return;
    if (window.scrollY >= 200) {
      scrollUp.classList.add('show-scroll');
    } else {
      scrollUp.classList.remove('show-scroll');
    }
  }

  function scrollActiveLinks() {
    var sections = queryAll('section[id], div[id]');
    if (!sections.length) return;
    var scrollY = window.pageYOffset;
    sections.forEach(function (current) {
      var sectionHeight = current.offsetHeight;
      var sectionTop = current.offsetTop - 80;
      var sectionId = current.getAttribute('id');
      var navLink = queryEl('.nav__menu a[href*=' + sectionId + ']');
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active-link');
        } else {
          navLink.classList.remove('active-link');
        }
      }
    });
  }

  function handleScroll() {
    scrollHeader();
    scrollUpButton();
    scrollActiveLinks();
  }

  var ticking = false;
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  handleScroll();
}

/* ════════════════════════════════════════════════════════════
    SCROLLSPY — Intersection Observer
    ════════════════════════════════════════════════════════════ */
export function initScrollSpy() {
  var sections = queryAll('section[id], div[id]');
  if (!sections.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        queryAll('.nav__link').forEach(function (link) {
          link.classList.remove('active-link');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active-link');
          }
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-10% 0px -50% 0px' });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/* ════════════════════════════════════════════════════════════
    ACTIVE LINK — Set on load
    ════════════════════════════════════════════════════════════ */
export function initActiveLink() {
  var currentPath = window.location.pathname;
  var currentHash = window.location.hash;

  queryAll('.nav__link').forEach(function (link) {
    link.classList.remove('active-link');
    var href = link.getAttribute('href');
    if (!href) return;

    if (href.startsWith('#')) {
      if (currentHash === href) link.classList.add('active-link');
      return;
    }

    var normalizedHref = href.replace(/^\.\//, '/').replace(/^\//, '');
    var normalizedPath = currentPath.replace(/^\//, '');

    if (normalizedPath.endsWith(normalizedHref) || normalizedHref.endsWith(normalizedPath)) {
      link.classList.add('active-link');
    }

    if ((href === '#' || href === '/' || href === 'index.html') &&
        (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '')) {
      link.classList.add('active-link');
    }
  });
}

/* ════════════════════════════════════════════════════════════
    INITIALIZE ALL
    ════════════════════════════════════════════════════════════ */
export function initAll() {
  initNav();
  initTheme();
  initScroll();
  initScrollSpy();
  initActiveLink();
}
