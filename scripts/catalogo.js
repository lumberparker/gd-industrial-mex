/* ============================================================
   catalogo.js — Full product catalog for catalogo.html
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

const DOWNLOAD_SVG = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 11v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2"/>
  <polyline points="5,7 8,10 11,7"/>
  <line x1="8" y1="2" x2="8" y2="10"/>
</svg>`;

/* ── State ── */
let allCategorias = [];
let activeCatId   = 'todos';
let activeFab     = 'todos';
let searchQuery   = '';

/* ── Build a single catalog card ── */
function buildCatCard(producto, categoria) {
  const hasPdf    = !!producto.catalogoPdf;
  const hasSeries = producto.productosIncluidos && producto.productosIncluidos.length > 0;

  const imgStyle = producto.imagen
    ? `background-image: url('${producto.imagen}'); background-color: transparent;`
    : '';

  const imgContent = producto.imagen
    ? `<img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />`
    : '';

  const fabBadge = categoria.fabricante
    ? `<span class="cat-card__fab-badge">${categoria.fabricante}</span>`
    : '';

  const badge = hasPdf
    ? `<span class="cat-card__pdf-badge">${DOWNLOAD_SVG} PDF</span>`
    : `<span class="cat-card__soon-badge">Próximamente</span>`;

  const series = hasSeries
    ? `<div>
        <p class="cat-card__series-label">Modelos incluidos</p>
        <div class="cat-card__series">
          ${producto.productosIncluidos.map(s => `<span class="cat-card__serie-tag">${s}</span>`).join('')}
        </div>
       </div>`
    : '';

  const action = hasPdf
    ? `<a class="cat-card__download" href="${producto.catalogoPdf}" target="_blank" rel="noopener noreferrer">
        ${DOWNLOAD_SVG} Catálogo PDF
       </a>`
    : `<a class="cat-card__contact" href="index.html#contacto">Consultar disponibilidad →</a>`;

  return `
    <article class="cat-card cat-card--fade-in"
             data-id="${producto.id}"
             data-cat="${categoria.id}"
             data-fab="${categoria.fabricante || ''}"
             data-nombre="${producto.nombre.toLowerCase()}"
             data-desc="${producto.descripcion.toLowerCase()}">
      <div class="cat-card__img" style="${imgStyle}">
        ${imgContent}
        <div class="cat-card__badges">
          <span class="cat-card__cat-badge">${categoria.nombre}</span>
          ${fabBadge}
        </div>
        ${badge}
      </div>
      <div class="cat-card__body">
        <h3 class="cat-card__nombre">${producto.nombre}</h3>
        <p class="cat-card__desc">${producto.descripcion}</p>
        ${series}
        <div class="cat-card__footer">
          ${action}
        </div>
      </div>
    </article>`;
}

/* ── Render all cards ── */
function renderCards(categorias, gridEl) {
  let html = '';
  categorias.forEach(cat => {
    cat.productos.forEach(p => {
      html += buildCatCard(p, cat);
    });
  });
  html += `<div class="cat-empty" id="catEmpty">
    <div class="cat-empty__icon">
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="18"/><line x1="16" y1="16" x2="32" y2="32"/><line x1="32" y1="16" x2="16" y2="32"/>
      </svg>
    </div>
    <p class="cat-empty__title">Sin resultados</p>
    <p class="cat-empty__body">Intenta con otro término o limpia los filtros activos.</p>
  </div>`;
  gridEl.innerHTML = html;
}

/* ── Apply active filters ── */
function applyFilters(gridEl, toolbarEl) {
  const cards = gridEl.querySelectorAll('.cat-card');
  let visible = 0;

  cards.forEach(card => {
    const matchCat = activeCatId === 'todos' || card.dataset.cat === activeCatId;
    const matchFab = activeFab === 'todos'   || card.dataset.fab.toLowerCase() === activeFab.toLowerCase();
    const matchSearch = !searchQuery ||
      card.dataset.nombre.includes(searchQuery) ||
      card.dataset.desc.includes(searchQuery);

    const show = matchCat && matchFab && matchSearch;
    card.classList.toggle('cat-card--hidden', !show);
    if (show) visible++;
  });

  /* Update toolbar count */
  const countEl = toolbarEl.querySelector('.cat-toolbar__count');
  if (countEl) {
    countEl.innerHTML = `Mostrando <strong>${visible}</strong> producto${visible !== 1 ? 's' : ''}`;
  }

  /* Empty state */
  const emptyEl = document.getElementById('catEmpty');
  if (emptyEl) emptyEl.classList.toggle('cat-empty--visible', visible === 0);
}

/* ── Build sidebar nav ── */
function buildSidebar(data, sidebarEl, gridEl, toolbarEl) {
  /* Search */
  const searchEl = sidebarEl.querySelector('#catSearch');
  if (searchEl) {
    searchEl.addEventListener('input', e => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters(gridEl, toolbarEl);
      updateClearBtn();
    });
  }

  /* Fabricante chips */
  const fabChipsEl = sidebarEl.querySelector('#catFabChips');
  if (fabChipsEl) {
    const chips = [
      { id: 'todos', label: 'Todos' },
      ...data.fabricantes.map(f => ({ id: f, label: f }))
    ];

    fabChipsEl.innerHTML = chips.map(c => `
      <button class="cat-fab-chip${c.id === 'todos' ? ' cat-fab-chip--active' : ''}"
              data-fab="${c.id}">
        ${c.id !== 'todos' ? '<span class="cat-fab-dot"></span>' : ''}
        ${c.label}
      </button>`).join('');

    fabChipsEl.addEventListener('click', e => {
      const btn = e.target.closest('.cat-fab-chip');
      if (!btn) return;
      activeFab = btn.dataset.fab;
      fabChipsEl.querySelectorAll('.cat-fab-chip').forEach(b =>
        b.classList.toggle('cat-fab-chip--active', b === btn)
      );
      applyFilters(gridEl, toolbarEl);
      updateClearBtn();
    });
  }

  /* Category nav */
  const navListEl = sidebarEl.querySelector('#catNavList');
  if (navListEl) {
    const cats = [
      { id: 'todos', nombre: 'Todas las categorías', count: data.categorias.reduce((s, c) => s + c.productos.length, 0) },
      ...data.categorias.map(c => ({ id: c.id, nombre: c.nombre, count: c.productos.length }))
    ];

    navListEl.innerHTML = cats.map(c => `
      <li>
        <button class="cat-nav-btn${c.id === 'todos' ? ' cat-nav-btn--active' : ''}"
                data-cat="${c.id}">
          <span class="cat-nav-btn__label">${c.nombre}</span>
          <span class="cat-nav-btn__count">${c.count}</span>
        </button>
      </li>`).join('');

    navListEl.addEventListener('click', e => {
      const btn = e.target.closest('.cat-nav-btn');
      if (!btn) return;
      activeCatId = btn.dataset.cat;
      navListEl.querySelectorAll('.cat-nav-btn').forEach(b =>
        b.classList.toggle('cat-nav-btn--active', b === btn)
      );

      /* Update toolbar active filter badge */
      updateToolbarFilter(btn.querySelector('.cat-nav-btn__label').textContent, toolbarEl);
      applyFilters(gridEl, toolbarEl);
      updateClearBtn();

      /* Scroll to top of content on mobile */
      if (window.innerWidth <= 768) {
        gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* Clear button */
  const clearBtn = sidebarEl.querySelector('#catClear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearAllFilters(sidebarEl, gridEl, toolbarEl);
    });
  }
}

function updateClearBtn() {
  const clearBtn = document.getElementById('catClear');
  if (!clearBtn) return;
  const hasFilters = activeCatId !== 'todos' || activeFab !== 'todos' || searchQuery !== '';
  clearBtn.classList.toggle('cat-clear--visible', hasFilters);
}

function clearAllFilters(sidebarEl, gridEl, toolbarEl) {
  activeCatId = 'todos';
  activeFab   = 'todos';
  searchQuery = '';

  const searchEl = document.getElementById('catSearch');
  if (searchEl) searchEl.value = '';

  sidebarEl.querySelectorAll('.cat-fab-chip').forEach((b, i) =>
    b.classList.toggle('cat-fab-chip--active', i === 0)
  );

  sidebarEl.querySelectorAll('.cat-nav-btn').forEach((b, i) =>
    b.classList.toggle('cat-nav-btn--active', i === 0)
  );

  updateToolbarFilter(null, toolbarEl);
  applyFilters(gridEl, toolbarEl);
  updateClearBtn();
}

function updateToolbarFilter(label, toolbarEl) {
  const filterTagEl = toolbarEl.querySelector('.cat-toolbar__active-filter');
  if (!filterTagEl) return;

  if (!label || label === 'Todas las categorías') {
    filterTagEl.style.display = 'none';
  } else {
    filterTagEl.style.display = 'inline-flex';
    filterTagEl.querySelector('span:first-child').textContent = label;
  }
}

/* ── Mobile sidebar toggle ── */
function initMobileToggle(toggleBtn, sidebarEl) {
  if (!toggleBtn || !sidebarEl) return;
  toggleBtn.addEventListener('click', () => {
    sidebarEl.classList.toggle('cat-sidebar--open');
    const isOpen = sidebarEl.classList.contains('cat-sidebar--open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.querySelector('.cat-toggle-label').textContent =
      isOpen ? 'Ocultar filtros' : 'Mostrar filtros';
  });
}

/* ── URL hash category pre-select ── */
function applyHashFilter(sidebarEl, gridEl, toolbarEl) {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;
  const btn = sidebarEl.querySelector(`[data-cat="${hash}"]`);
  if (!btn) return;
  btn.click();
}

/* ── Toolbar X button ── */
function initToolbarX(sidebarEl, gridEl, toolbarEl) {
  const xBtn = document.getElementById('catFilterX');
  if (!xBtn) return;
  xBtn.addEventListener('click', () => {
    activeCatId = 'todos';
    if (sidebarEl) {
      sidebarEl.querySelectorAll('.cat-nav-btn').forEach((b, i) =>
        b.classList.toggle('cat-nav-btn--active', i === 0)
      );
    }
    updateToolbarFilter(null, toolbarEl);
    applyFilters(gridEl, toolbarEl);
    updateClearBtn();
  });
}

/* ── Bootstrap ── */
fetch('assets/jsons/productos.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => {
    allCategorias = data.categorias;

    const gridEl    = document.getElementById('catGrid');
    const sidebarEl = document.getElementById('catSidebar');
    const toolbarEl = document.getElementById('catToolbar');
    const toggleBtn = document.getElementById('catSidebarToggle');

    if (!gridEl) return;

    renderCards(data.categorias, gridEl);
    if (sidebarEl && toolbarEl) buildSidebar(data, sidebarEl, gridEl, toolbarEl);
    applyFilters(gridEl, toolbarEl);
    initMobileToggle(toggleBtn, sidebarEl);
    initToolbarX(sidebarEl, gridEl, toolbarEl);
    applyHashFilter(sidebarEl, gridEl, toolbarEl);
  })
  .catch(err => console.error('catalogo.json no se pudo cargar:', err));
