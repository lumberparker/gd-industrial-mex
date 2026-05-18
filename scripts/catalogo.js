/* ============================================================
   catalogo.js — Atlas Edition
   ============================================================ */

/* ── Icon map ── */
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

/* ── Per-category visual themes ── */
const CAT_THEMES = {
  'embragues-frenos':    { bg: 'linear-gradient(145deg,#0c1a28 0%,#0f2433 100%)',  accent: '#00bfaf', glow: 'rgba(0,191,175,0.18)',   iconBg: 'rgba(0,191,175,0.08)',  iconBgH: 'rgba(0,191,175,0.16)'  },
  'coples-flexibles':    { bg: 'linear-gradient(145deg,#081e1a 0%,#0c2820 100%)',  accent: '#00bfaf', glow: 'rgba(0,191,175,0.18)',   iconBg: 'rgba(0,191,175,0.08)',  iconBgH: 'rgba(0,191,175,0.16)'  },
  'uniones-giratorias':  { bg: 'linear-gradient(145deg,#0c1830 0%,#102040 100%)',  accent: '#4db8ff', glow: 'rgba(77,184,255,0.18)',  iconBg: 'rgba(77,184,255,0.08)', iconBgH: 'rgba(77,184,255,0.16)' },
  'valvulas':            { bg: 'linear-gradient(145deg,#1a1008 0%,#241408 100%)',  accent: '#e8611a', glow: 'rgba(232,97,26,0.22)',   iconBg: 'rgba(232,97,26,0.08)',  iconBgH: 'rgba(232,97,26,0.16)'  },
  'materiales-hule':     { bg: 'linear-gradient(145deg,#0c180c 0%,#102014 100%)',  accent: '#5ab85a', glow: 'rgba(90,184,90,0.18)',   iconBg: 'rgba(90,184,90,0.08)',  iconBgH: 'rgba(90,184,90,0.16)'  },
  'herramientas-pesca':  { bg: 'linear-gradient(145deg,#181408 0%,#20180c 100%)',  accent: '#e8c01a', glow: 'rgba(232,192,26,0.18)',  iconBg: 'rgba(232,192,26,0.08)', iconBgH: 'rgba(232,192,26,0.16)' },
};
const DEFAULT_THEME = { bg: 'linear-gradient(145deg,#0c1828 0%,#0f2030 100%)', accent: '#00bfaf', glow: 'rgba(0,191,175,0.18)', iconBg: 'rgba(0,191,175,0.08)', iconBgH: 'rgba(0,191,175,0.15)' };

/* ── State ── */
let allData = null;

/* ─────────────────────────────────────────────
   ATLAS
───────────────────────────────────────────── */

function buildChapter(cat) {
  const t = CAT_THEMES[cat.id] || DEFAULT_THEME;
  const count = cat.productos.length;

  return `
    <div class="cat-chapter" data-cat="${cat.id}"
         style="background:${t.bg};--cat-accent:${t.accent};--cat-glow:${t.glow};--cat-icon-bg:${t.iconBg};--cat-icon-bg-h:${t.iconBgH};">
      <div class="cat-chapter__glow"></div>
      <div class="cat-chapter__top">
        ${cat.fabricante
          ? `<span class="cat-chapter__fab">${cat.fabricante}</span>`
          : `<span></span>`}
        <span class="cat-chapter__count-badge">${count}</span>
      </div>
      <div class="cat-chapter__icon-wrap">
        <div class="cat-chapter__icon">${ICONS[cat.icono] || ICONS.gear}</div>
      </div>
      <div class="cat-chapter__body">
        <h3 class="cat-chapter__name">${cat.nombre}</h3>
        <p class="cat-chapter__desc">${cat.descripcionCorta || ''}</p>
        <div class="cat-chapter__meta">
          <span class="cat-chapter__products">${count} ${count === 1 ? 'producto' : 'productos'}</span>
          <span class="cat-chapter__cta">Explorar →</span>
        </div>
      </div>
    </div>`;
}

function initAtlas(gridEl) {
  gridEl.querySelectorAll('.cat-chapter').forEach(ch => {
    /* Mouse-tracking glow */
    ch.addEventListener('mousemove', e => {
      const r = ch.getBoundingClientRect();
      ch.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
      ch.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
    });
    ch.addEventListener('click', () => openCategory(ch.dataset.cat));
  });
}

/* ─────────────────────────────────────────────
   VIEW TRANSITIONS
───────────────────────────────────────────── */

function openCategory(catId) {
  const atlasEl = document.getElementById('catAtlas');
  const stageEl = document.getElementById('catStage');

  /* Fade atlas out */
  atlasEl.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
  atlasEl.style.opacity = '0';
  atlasEl.style.transform = 'scale(0.97)';

  setTimeout(() => {
    atlasEl.style.display = 'none';

    populateStage(catId);

    stageEl.style.display = 'block';
    stageEl.style.opacity = '0';
    stageEl.style.transform = 'translateY(18px)';

    requestAnimationFrame(() => requestAnimationFrame(() => {
      stageEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      stageEl.style.opacity = '1';
      stageEl.style.transform = 'translateY(0)';
    }));

    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState(null, '', `#${catId}`);
  }, 280);
}

function closeStage() {
  const atlasEl = document.getElementById('catAtlas');
  const stageEl = document.getElementById('catStage');

  stageEl.style.transition = 'opacity 0.26s ease, transform 0.26s ease';
  stageEl.style.opacity = '0';
  stageEl.style.transform = 'translateY(10px)';

  setTimeout(() => {
    stageEl.style.display = 'none';
    atlasEl.style.display = 'block';
    atlasEl.style.opacity = '0';
    atlasEl.style.transform = 'scale(0.97)';

    requestAnimationFrame(() => requestAnimationFrame(() => {
      atlasEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      atlasEl.style.opacity = '1';
      atlasEl.style.transform = 'scale(1)';
    }));

    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState(null, '', location.pathname);
  }, 260);
}

/* ─────────────────────────────────────────────
   STAGE
───────────────────────────────────────────── */

function populateStage(catId) {
  const data = allData;
  const cat  = data.categorias.find(c => c.id === catId);
  if (!cat) return;

  const t = CAT_THEMES[catId] || DEFAULT_THEME;

  /* ── Category tab strip ── */
  const tabsEl = document.getElementById('catStageTabs');
  tabsEl.innerHTML = data.categorias.map(c => {
    const active = c.id === catId;
    const ct = CAT_THEMES[c.id] || DEFAULT_THEME;
    return `
      <button class="cat-stage-tab${active ? ' cat-stage-tab--active' : ''}"
              data-cat="${c.id}"
              style="${active ? `color:${ct.accent}` : ''}">
        <span class="cat-stage-tab__icon">${ICONS[c.icono] || ICONS.gear}</span>
        ${c.nombre.split(' ').slice(0, 2).join(' ')}
      </button>`;
  }).join('');

  /* Scroll active tab into view */
  const activeTab = tabsEl.querySelector('.cat-stage-tab--active');
  activeTab?.scrollIntoView({ inline: 'center', block: 'nearest' });

  /* ── Mini category hero ── */
  document.getElementById('catCatHero').innerHTML = `
    <div class="cat-stage__cat-hero-inner">
      <div class="cat-stage__cat-icon" style="color:${t.accent}">${ICONS[cat.icono] || ICONS.gear}</div>
      <div>
        <span class="cat-stage__cat-label" style="color:${t.accent}">${cat.fabricante || 'Línea especializada'}</span>
        <h2 class="cat-stage__cat-name">${cat.nombre}</h2>
        <p class="cat-stage__cat-desc">${cat.descripcionCorta || ''}</p>
        <span class="cat-stage__cat-count"
              style="background:${t.iconBg};color:${t.accent};border-color:${t.iconBgH}">
          ${cat.productos.length} ${cat.productos.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>
    </div>`;

  /* ── Product cards ── */
  const gridEl = document.getElementById('catStageGrid');
  gridEl.innerHTML = cat.productos.map(p => buildProductCard(p, cat)).join('');

  /* Stagger entrance animation */
  gridEl.querySelectorAll('.cat-card').forEach((card, i) => {
    setTimeout(() => {
      card.style.transition = 'opacity 0.36s ease, transform 0.36s ease';
      card.style.opacity    = '1';
      card.style.transform  = 'translateY(0)';
    }, 60 + i * 80);
  });
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */

function buildProductCard(producto, categoria) {
  const hasPdf    = !!producto.catalogoPdf;
  const hasSeries = producto.productosIncluidos?.length > 0;

  const imgStyle = producto.imagen
    ? `background-image:url('${producto.imagen}');background-color:transparent;`
    : '';

  const fabBadge = categoria.fabricante
    ? `<span class="cat-card__fab-badge">${categoria.fabricante}</span>`
    : '';

  const cornerBadge = hasPdf
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
    ? `<a class="cat-card__download" href="${producto.catalogoPdf}" target="_blank" rel="noopener noreferrer">${DOWNLOAD_SVG} Catálogo PDF</a>`
    : `<a class="cat-card__contact" href="index.html#contacto">Consultar disponibilidad →</a>`;

  return `
    <article class="cat-card" data-id="${producto.id}">
      <div class="cat-card__img" style="${imgStyle}">
        ${fabBadge}
        ${cornerBadge}
      </div>
      <div class="cat-card__body">
        <h3 class="cat-card__nombre">${producto.nombre}</h3>
        <p class="cat-card__desc">${producto.descripcion}</p>
        ${series}
        <div class="cat-card__footer">${action}</div>
      </div>
    </article>`;
}

/* ─────────────────────────────────────────────
   COMMAND PALETTE SEARCH
───────────────────────────────────────────── */

let paletteIndex = -1;

function flatProducts(data) {
  return data.categorias.flatMap(cat =>
    cat.productos.map(p => ({ producto: p, categoria: cat }))
  );
}

function openSearch() {
  document.getElementById('catSearchOverlay').classList.add('cat-search-overlay--open');
  setTimeout(() => document.getElementById('catPaletteInput').focus(), 40);
  paletteIndex = -1;
  renderPaletteResults('');
}

function closeSearch() {
  document.getElementById('catSearchOverlay').classList.remove('cat-search-overlay--open');
  document.getElementById('catPaletteInput').value = '';
}

function renderPaletteResults(query) {
  const q = query.toLowerCase().trim();
  const all = flatProducts(allData);

  const matches = q
    ? all.filter(({ produto: _p, producto, categoria }) =>
        producto.nombre.toLowerCase().includes(q) ||
        producto.descripcion.toLowerCase().includes(q) ||
        categoria.nombre.toLowerCase().includes(q) ||
        (producto.productosIncluidos || []).some(s => s.toLowerCase().includes(q))
      )
    : all;

  document.getElementById('catPaletteHint').textContent =
    q ? `${matches.length} resultado${matches.length !== 1 ? 's' : ''}` : 'Todos los productos';

  const resultsEl = document.getElementById('catPaletteResults');

  if (!matches.length) {
    resultsEl.innerHTML = `<p class="cat-palette__empty">Sin resultados para "<em>${query}</em>"</p>`;
    return;
  }

  resultsEl.innerHTML = matches.map(({ producto, categoria }) => `
    <div class="cat-palette__result" data-cat="${categoria.id}" data-id="${producto.id}">
      <div class="cat-palette__result-icon">${ICONS[categoria.icono] || ICONS.gear}</div>
      <div>
        <p class="cat-palette__result-cat">${categoria.nombre}</p>
        <p class="cat-palette__result-name">${producto.nombre}</p>
      </div>
      <span class="cat-palette__result-arrow">→</span>
    </div>`).join('');

  resultsEl.querySelectorAll('.cat-palette__result').forEach(r => {
    r.addEventListener('click', () => {
      closeSearch();
      openCategory(r.dataset.cat);
    });
  });
}

function movePaletteFocus(dir) {
  const items = document.querySelectorAll('.cat-palette__result');
  if (!items.length) return;
  items[paletteIndex]?.classList.remove('cat-palette__result--focused');
  paletteIndex = Math.max(0, Math.min(items.length - 1, paletteIndex + dir));
  items[paletteIndex].classList.add('cat-palette__result--focused');
  items[paletteIndex].scrollIntoView({ block: 'nearest' });
}

function initSearch() {
  const overlay  = document.getElementById('catSearchOverlay');
  const input    = document.getElementById('catPaletteInput');
  const trigger  = document.getElementById('catSearchTrigger');
  const escBtn   = document.getElementById('catPaletteEsc');

  trigger?.addEventListener('click', openSearch);
  escBtn?.addEventListener('click', closeSearch);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });

  input.addEventListener('input', () => {
    paletteIndex = -1;
    renderPaletteResults(input.value);
  });

  /* Keyboard shortcuts */
  document.addEventListener('keydown', e => {
    const isOpen = overlay.classList.contains('cat-search-overlay--open');

    /* / to open (when not typing in an input) */
    if (e.key === '/' && !isOpen) {
      const tag = document.activeElement?.tagName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); openSearch(); }
    }

    if (!isOpen) return;

    if (e.key === 'Escape') { closeSearch(); return; }
    if (e.key === 'ArrowDown')  { e.preventDefault(); movePaletteFocus(+1); }
    if (e.key === 'ArrowUp')    { e.preventDefault(); movePaletteFocus(-1); }
    if (e.key === 'Enter') {
      const focused = document.querySelector('.cat-palette__result--focused');
      if (focused) { closeSearch(); openCategory(focused.dataset.cat); }
    }
  });
}

/* ── Tab strip delegation (on document so it survives innerHTML swaps) ── */
function initTabs() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.cat-stage-tab');
    if (btn && btn.dataset.cat) populateStage(btn.dataset.cat);
  });
}

/* ── Browser back/forward ── */
window.addEventListener('popstate', () => {
  const hash = location.hash.replace('#', '');
  if (hash && allData?.categorias.find(c => c.id === hash)) {
    openCategory(hash);
  } else {
    closeStage();
  }
});

/* ─────────────────────────────────────────────
   BOOTSTRAP
───────────────────────────────────────────── */

fetch('assets/jsons/productos.json')
  .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
  .then(data => {
    allData = data;

    /* Render atlas */
    const atlasGrid = document.getElementById('catAtlasGrid');
    if (atlasGrid) {
      atlasGrid.innerHTML = data.categorias.map(buildChapter).join('');
      initAtlas(atlasGrid);
    }

    /* Back button */
    document.getElementById('catBack')?.addEventListener('click', closeStage);

    /* Tabs + search */
    initTabs();
    initSearch();

    /* Deep-link via URL hash */
    const hash = location.hash.replace('#', '');
    if (hash && data.categorias.find(c => c.id === hash)) {
      setTimeout(() => openCategory(hash), 120);
    }
  })
  .catch(err => console.error('productos.json load error:', err));
