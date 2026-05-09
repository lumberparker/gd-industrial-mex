/* ============================================================
   encuentra.js — Contact form + select options from productos.json
   ============================================================ */

/* ── Populate product select from JSON ── */
fetch('assets/jsons/productos.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => {
    const select = document.getElementById('producto');
    if (!select) return;

    data.categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.nombre;
      select.appendChild(option);
    });

    // Always add a catch-all at the end
    const otro = document.createElement('option');
    otro.value = 'otro';
    otro.textContent = 'Otro';
    select.appendChild(otro);
  })
  .catch(err => console.error('No se pudieron cargar las categorías:', err));

/* ── Form submission ── */
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.encuentra__submit');
    const original = btn.textContent;

    btn.textContent = '✓ Mensaje enviado';
    btn.classList.add('encuentra__submit--sent');
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('encuentra__submit--sent');
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}
