/* ============================================================
   productos.js — Accordion catalog rendered from productos.json
   ============================================================ */

const ICONS = {
  gear: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <circle cx="24" cy="24" r="9"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/>
    <line x1="24" y1="6" x2="24" y2="13"/><line x1="24" y1="35" x2="24" y2="42"/>
    <line x1="6" y1="24" x2="13" y2="24"/><line x1="35" y1="24" x2="42" y2="24"/>
    <line x1="11.5" y1="11.5" x2="16.5" y2="16.5"/><line x1="31.5" y1="31.5" x2="36.5" y2="36.5"/>
    <line x1="36.5" y1="11.5" x2="31.5" y2="16.5"/><line x1="16.5" y1="31.5" x2="11.5" y2="36.5"/>
  </svg>`,
  coupling: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <ellipse cx="24" cy="24" rx="16" ry="9"/><line x1="8" y1="24" x2="40" y2="24"/>
    <ellipse cx="24" cy="24" rx="6" ry="3.5"/>
  </svg>`,
  union: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="5"/>
    <line x1="24" y1="10" x2="24" y2="19"/><line x1="24" y1="29" x2="24" y2="38"/>
  </svg>`,
  valve: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <rect x="18" y="8" width="12" height="32" rx="6"/>
    <line x1="24" y1="8" x2="24" y2="4"/><line x1="24" y1="40" x2="24" y2="44"/>
    <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/>
  </svg>`,
  drum: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <ellipse cx="24" cy="36" rx="12" ry="6"/><ellipse cx="24" cy="20" rx="12" ry="6"/>
    <line x1="12" y1="20" x2="12" y2="36"/><line x1="36" y1="20" x2="36" y2="36"/>
  </svg>`,
  star: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="24,6 29,18 42,18 32,27 36,40 24,32 12,40 16,27 6,18 19,18"/>
  </svg>`
};

const DOWNLOAD_ICON = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 11v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2"/>
  <polyline points="5,7 8,10 11,7"/>
  <line x1="8" y1="2" x2="8" y2="10"/>
</svg>`;

const CHEVRON_ICON = `<svg class="acordeon__chevron" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="5,8 10,13 15,8"/>
</svg>`;

/* ── Build a single product card ── */
function buildCard(producto) {
  const hasPdf    = !!producto.catalogoPdf;
  const hasSeries = producto.productosIncluidos && producto.productosIncluidos.length > 0;

  const imgStyle = producto.imagen
    ? `background-image: url('${producto.imagen}'); background-color: transparent;`
    : '';

  const imgContent = producto.imagen
    ? `<img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />`
    : '';

  const badge = hasPdf
    ? `<span class="producto-card__pdf-badge">${DOWNLOAD_ICON} PDF</span>`
    : `<span class="producto-card__soon-badge">Próximamente</span>`;

  const series = hasSeries
    ? `<div>
        <p class="producto-card__series-label">Modelos incluidos</p>
        <div class="producto-card__series">
          ${producto.productosIncluidos.map(s => `<span class="producto-card__serie-tag">${s}</span>`).join('')}
        </div>
       </div>`
    : '';

  const action = hasPdf
    ? `<a class="producto-card__download" href="${producto.catalogoPdf}" target="_blank" rel="noopener noreferrer">
        ${DOWNLOAD_ICON} Descargar catálogo
       </a>`
    : `<a class="producto-card__contact" href="#contacto">Consultar disponibilidad →</a>`;

  return `
    <article class="producto-card" data-id="${producto.id}">
      <div class="producto-card__img" style="${imgStyle}">
        ${imgContent}
        ${badge}
      </div>
      <div class="producto-card__body">
        <h4 class="producto-card__nombre">${producto.nombre}</h4>
        <p class="producto-card__desc">${producto.descripcion}</p>
        ${series}
        <div class="producto-card__footer">
          ${action}
        </div>
      </div>
    </article>`;
}

/* ── Build one accordion item ── */
function buildAcordeonItem(categoria, index) {
  const fabBadge = categoria.fabricante
    ? `<span class="acordeon__fab-badge">${categoria.fabricante}</span>`
    : '';

  const count = categoria.productos.length;
  const countLabel = count === 1 ? '1 producto' : `${count} productos`;

  const cards = categoria.productos.map(buildCard).join('');

  return `
    <div class="acordeon__item${index === 0 ? ' acordeon__item--open' : ''}"
         data-id="${categoria.id}"
         data-fabricante="${categoria.fabricante || ''}">

      <button class="acordeon__trigger"
              aria-expanded="${index === 0 ? 'true' : 'false'}"
              aria-controls="panel-${categoria.id}">
        <div class="acordeon__trigger-left">
          <div class="acordeon__icon">${ICONS[categoria.icono] || ICONS.gear}</div>
          <div class="acordeon__info">
            <span class="acordeon__nombre">${categoria.nombre}</span>
            <span class="acordeon__meta">
              ${countLabel}
              ${fabBadge}
            </span>
          </div>
        </div>
        <div class="acordeon__trigger-right">
          <span class="acordeon__count">${count}</span>
          ${CHEVRON_ICON}
        </div>
      </button>

      <div class="acordeon__panel"
           id="panel-${categoria.id}"
           role="region">
        <div class="acordeon__panel-inner">
          <div class="acordeon__grid">${cards}</div>
        </div>
      </div>
    </div>`;
}

/* ── Open / close an item ── */
function openItem(item) {
  const panel   = item.querySelector('.acordeon__panel');
  const trigger = item.querySelector('.acordeon__trigger');
  const inner   = item.querySelector('.acordeon__panel-inner');

  item.classList.add('acordeon__item--open');
  trigger.setAttribute('aria-expanded', 'true');
  panel.style.maxHeight = inner.scrollHeight + 'px';
}

function closeItem(item) {
  const panel   = item.querySelector('.acordeon__panel');
  const trigger = item.querySelector('.acordeon__trigger');

  item.classList.remove('acordeon__item--open');
  trigger.setAttribute('aria-expanded', 'false');
  panel.style.maxHeight = '0';
}

/* ── Wire up accordion behaviour ── */
function initAccordion(container) {
  /* Open first item on mount */
  const first = container.querySelector('.acordeon__item--open');
  if (first) openItem(first);

  container.addEventListener('click', e => {
    const trigger = e.target.closest('.acordeon__trigger');
    if (!trigger) return;

    const item    = trigger.closest('.acordeon__item');
    const isOpen  = item.classList.contains('acordeon__item--open');

    /* Close all open items */
    container.querySelectorAll('.acordeon__item--open').forEach(closeItem);

    /* Toggle: if it was closed, open it */
    if (!isOpen) openItem(item);
  });
}

/* ── Filter logic ── */
function initFilters(filtersEl, acordeonEl, fabricantes) {
  const allFilters = [
    { id: 'todos', label: 'Todos' },
    ...fabricantes.map(f => ({ id: f.toLowerCase(), label: f }))
  ];

  filtersEl.innerHTML = allFilters.map(f => `
    <button class="productos__filter-btn${f.id === 'todos' ? ' productos__filter-btn--active' : ''}"
            data-filter="${f.id}">
      ${f.id !== 'todos' ? '<span class="productos__filter-dot"></span>' : ''}
      ${f.label}
    </button>`).join('');

  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('.productos__filter-btn');
    if (!btn) return;

    const filter = btn.dataset.filter;

    /* Update active button */
    filtersEl.querySelectorAll('.productos__filter-btn').forEach(b =>
      b.classList.toggle('productos__filter-btn--active', b === btn)
    );

    /* Show / hide accordion items */
    const items = acordeonEl.querySelectorAll('.acordeon__item');
    let visibleCount = 0;

    items.forEach(item => {
      const match = filter === 'todos' ||
                    item.dataset.fabricante.toLowerCase() === filter;
      item.classList.toggle('acordeon__item--hidden', !match);
      if (match) visibleCount++;

      /* Close hidden items */
      if (!match && item.classList.contains('acordeon__item--open')) {
        closeItem(item);
      }
    });

    /* Empty state */
    let empty = acordeonEl.querySelector('.productos__empty');
    if (!empty) {
      empty = document.createElement('p');
      empty.className = 'productos__empty';
      empty.textContent = 'No hay categorías para este filtro.';
      acordeonEl.appendChild(empty);
    }
    empty.classList.toggle('productos__empty--visible', visibleCount === 0);
  });
}

/* ── Fabricante logos bar ── */
function buildFabLogos(fabricantes) {
  return fabricantes.map((fab, i) => {
    const divider = i < fabricantes.length - 1
      ? '<span class="productos__fab-divider">+</span>'
      : '';
    return `<span class="productos__fab-logo">${fab}</span>${divider}`;
  }).join('');
}

/* ── Bootstrap ── */
fetch('assets/jsons/productos.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => {
    const filtersEl  = document.getElementById('productosFilters');
    const acordeonEl = document.getElementById('productosAcordeon');
    const logosEl    = document.getElementById('fabricantesLogos');

    if (acordeonEl) {
      acordeonEl.innerHTML = data.categorias
        .map((cat, i) => buildAcordeonItem(cat, i))
        .join('');
      initAccordion(acordeonEl);
    }

    if (filtersEl && acordeonEl) {
      initFilters(filtersEl, acordeonEl, data.fabricantes);
    }

    if (logosEl) {
      logosEl.innerHTML = buildFabLogos(data.fabricantes);
    }
  })
  .catch(err => console.error('productos.json no se pudo cargar:', err));
