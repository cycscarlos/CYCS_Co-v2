/* ============================================================
   CYCS & Co. — Formspree Integration v2.0
   Envío async con feedback visual · sin onbeforeunload
   ============================================================ */
export function initFormspree() {
  const form = document.querySelector('.contact__form');
  if (!form || form.dataset.initialized) return;
  form.dataset.initialized = 'true';

  // Create or find success message element
  let successMsg = form.querySelector('.form-success-msg');
  if (!successMsg) {
    successMsg = document.createElement('p');
    successMsg.className = 'form-success-msg';
    successMsg.textContent = '¡Mensaje enviado! Nos pondremos en contacto contigo pronto.';
    form.appendChild(successMsg);
  }

  const submitBtn = form.querySelector('[type="submit"]');

  // Remove existing listener if any (prevent double binding)
  form.onsubmit = null; 

  form.addEventListener('submit', async function (e) {
    // Only intercept if the form action points to Formspree
    if (!form.action || !form.action.includes('formspree')) return;

    e.preventDefault();

    if (submitBtn) {
      submitBtn.dataset.loading = 'true';
      submitBtn.textContent = 'Enviando…';
    }

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        successMsg.classList.add('show');
        form.reset();
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Formspree Error:', response.status, errorData);
        
        if (response.status === 403) {
          alert('Error 403: El dominio (localhost) no está autorizado en Formspree o el formulario está desactivado.');
        } else {
          alert('Hubo un problema al enviar. Por favor intenta de nuevo.');
        }
      }
    } catch (err) {
      console.error('Connection Error:', err);
      alert('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      if (submitBtn) {
        submitBtn.dataset.loading = 'false';
        submitBtn.textContent = 'Enviar Mensaje';
      }
    }
  });
}
