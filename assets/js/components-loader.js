/**
 * Component Loader for CYCS & Co. Website
 * Loads reusable HTML components (header, footer, whatsapp, copyright) into pages.
 * Detects page context (index vs subpages) for correct paths.
 * Re-initializes main.js after components are loaded.
 */
(function() {
  'use strict';

  /**
   * Detect if current page is a subpage (inside /assets/html/)
   * @returns {boolean}
   */
  function isSubpage() {
    return window.location.pathname.includes('/assets/html/');
  }

  /**
   * Get the base path prefix for fetching component files
   * - From index.html: './assets/html/components/'
   * - From subpages:   './components/'  (relative to /assets/html/)
   * @returns {string}
   */
  function getComponentsBasePath() {
    // Use absolute path from project root for Vite dev server compatibility
    return '/assets/html/components/';
  }

  /**
   * Loads a component HTML file and inserts it into the target element
   * @param {string} componentFile - Filename of the component (e.g., 'header.html')
   * @param {HTMLElement} target - DOM element to inject into
   * @returns {Promise<void>}
   */
  function loadComponent(componentFile, target) {
    var basePath = getComponentsBasePath();
    var fullPath = basePath + componentFile;
    var fetchUrl = fullPath + '?v=' + new Date().getTime(); // Cache-buster

    return fetch(fetchUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
      })
      .then(function(html) {
        var temp = document.createElement('div');
        temp.innerHTML = html.trim();
        while (temp.firstChild) {
          target.parentNode.insertBefore(temp.firstChild, target);
        }
        target.parentNode.removeChild(target);
      })
      .catch(function(error) {
        console.error('Error loading component:', fullPath, error);
      });
  }

  /**
   * Initialize component loading when DOM is ready.
   * Supported data-component values:
   *   - "header"       → loads header.html (for index.html)
   *   - "header-subpages" → loads header-subpages.html (for nosotros/contacto)
   *   - "header-tech"  → loads header-tech.html (for technical subpages)
   *   - "footer"       → loads footer.html
   *   - "whatsapp"     → loads whatsapp.html
   *   - "copyright"    → loads copyright.html
   */
  function init() {
    var placeholders = document.querySelectorAll('[data-component]');
    if (!placeholders.length) return;

    var promises = [];

    placeholders.forEach(function(el) {
      var name = el.getAttribute('data-component');
      if (!name) return;

      var file = name + '.html';
      promises.push(loadComponent(file, el));
    });

    // After all components are loaded, re-initialize main.js event listeners
    Promise.all(promises).then(function() {
      // Dispatch custom event so main.js can re-bind to dynamically loaded elements
      document.dispatchEvent(new CustomEvent('components:loaded'));
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
