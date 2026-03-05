/* ============================================================
   APP.JS — メインアプリケーションロジック
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  injectCommonData();

  const page = document.body.dataset.page;
  switch (page) {
    case 'home':      initHomePage();      break;
    case 'portfolio': initPortfolioPage(); break;
    case 'diary':     initDiaryPage();     break;
    case 'gallery':   initGalleryPage();   break;
  }

  initFadeIn();
});

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNav() {
  const nav    = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const mobile = document.querySelector('.nav__mobile-menu');

  // Active link detection
  const path = window.location.pathname;
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const isHome = (path === '/' || path.endsWith('/index.html')) && href.includes('index');
    const isMatch = href && path.endsWith(href.replace('./', '').replace('../', ''));
    if (isHome || isMatch) link.classList.add('active');
  });

  // Scroll → border emphasis
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile toggle
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      mobile.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobile.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        mobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ============================================================
   COMMON DATA INJECTION (runs on every page)
   ============================================================ */
function injectCommonData() {
  // Nav logo
  setTextAll('.nav__logo', CONFIG.nameShort || CONFIG.name);

  // Footer
  setTextAll('.footer__name', CONFIG.name);
  setTextAll('.footer__copy', `© ${new Date().getFullYear()} ${CONFIG.name}`);

  // Footer social links
  const footerSocial = document.querySelector('.footer__social');
  if (footerSocial) {
    footerSocial.innerHTML = Object.values(CONFIG.social)
      .filter(s => s.url)
      .map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="footer__social-link">${s.label}</a>`)
      .join('');
  }

  // Page <title>
  document.title = document.title.replace('{name}', CONFIG.name);
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function initHomePage() {
  // Hero
  setTextAll('.hero__name', CONFIG.name);
  setTextAll('.hero__tagline', CONFIG.tagline);
  setTextAll('.hero__eyebrow-text', CONFIG.tagline);

  // Hero CTA links
  const heroContactBtn = document.querySelector('.hero__contact-btn');
  if (heroContactBtn) heroContactBtn.href = CONFIG.contactUrl;

  // Scroll button
  document.querySelector('.hero__scroll')?.addEventListener('click', () => {
    document.querySelector('.about')?.scrollIntoView({ behavior: 'smooth' });
  });

  // About
  setTextAll('.about__name-text', CONFIG.name);
  const aboutBio = document.querySelector('.about__bio');
  if (aboutBio) {
    aboutBio.innerHTML = CONFIG.bio.map(p => `<p>${p}</p>`).join('');
  }

  // Avatar
  const imgBox = document.querySelector('.about__image-box');
  if (imgBox && CONFIG.avatar) {
    imgBox.innerHTML = `<img src="${CONFIG.avatar}" alt="${CONFIG.name}">`;
  }

  // Stats
  const statsEl = document.querySelector('.about__stats');
  if (statsEl && CONFIG.stats.length) {
    statsEl.innerHTML = CONFIG.stats.map(s =>
      `<div class="about__stat">
         <div class="about__stat-number">${s.number}</div>
         <div class="about__stat-label">${s.label}</div>
       </div>`
    ).join('');
  } else if (statsEl) {
    statsEl.style.display = 'none';
  }

  // Featured portfolio
  const featuredGrid = document.querySelector('.featured-works__grid');
  if (featuredGrid) {
    const featured = PORTFOLIO.filter(p => p.featured).slice(0, 3);
    featuredGrid.innerHTML = featured.map(item => portfolioCardHTML(item)).join('');
    featuredGrid.querySelectorAll('.portfolio-card').forEach((card, i) => {
      card.addEventListener('click', () => {
        if (featured[i].link && featured[i].link !== '#') window.open(featured[i].link, '_blank', 'noopener');
      });
    });
  }

  // Latest diary
  const diaryList = document.querySelector('.home-diary-list');
  if (diaryList) {
    const latest = [...DIARY].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    diaryList.innerHTML = latest.map(e => diaryItemHTML(e)).join('');
    diaryList.querySelectorAll('.diary-item').forEach((el, i) => {
      el.addEventListener('click', () => { window.location.href = `./diary.html?id=${latest[i].id}`; });
    });
  }

  // Social links section
  const socialLinks = document.querySelector('.social-links');
  if (socialLinks) {
    const links = Object.entries(CONFIG.social).filter(([, v]) => v.url);
    socialLinks.innerHTML = links.map(([key, v]) =>
      `<a href="${v.url}" target="_blank" rel="noopener noreferrer" class="social-link">
         ${socialIconSVG(key)}<span>${v.label}</span>
       </a>`
    ).join('');
  }

  // Contact message
  setTextAll('.contact-message', CONFIG.contactMessage);
}

/* ============================================================
   PORTFOLIO PAGE
   ============================================================ */
function initPortfolioPage() {
  const categories = ['All', ...new Set(PORTFOLIO.map(p => p.category))];
  const filtersEl  = document.querySelector('.portfolio-filters');
  const gridEl     = document.querySelector('.portfolio-grid');

  if (filtersEl) {
    filtersEl.innerHTML = categories.map((cat, i) =>
      `<button class="filter-btn${i === 0 ? ' active' : ''}" data-category="${cat}">${cat}</button>`
    ).join('');

    filtersEl.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      renderPortfolioGrid(cat === 'All' ? PORTFOLIO : PORTFOLIO.filter(p => p.category === cat));
    });
  }

  renderPortfolioGrid(PORTFOLIO);
}

function renderPortfolioGrid(items) {
  const gridEl = document.querySelector('.portfolio-grid');
  if (!gridEl) return;

  if (!items.length) {
    gridEl.innerHTML = `<div class="portfolio-grid-empty">No items found.</div>`;
    return;
  }

  gridEl.innerHTML = items.map(item => portfolioCardHTML(item)).join('');
  gridEl.querySelectorAll('.portfolio-card').forEach((card, i) => {
    card.addEventListener('click', () => {
      if (items[i].link && items[i].link !== '#') window.open(items[i].link, '_blank', 'noopener');
    });
  });
}

function portfolioCardHTML(item) {
  const img = item.image
    ? `<img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'portfolio-card__placeholder\\'>Image</div>'">`
    : `<div class="portfolio-card__placeholder">Image</div>`;

  return `
    <div class="portfolio-card">
      <div class="portfolio-card__img-wrap">
        ${img}
        <div class="portfolio-card__overlay">
          <div class="portfolio-card__overlay-arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </div>
          <div class="portfolio-card__overlay-title">${item.title}</div>
          <div class="portfolio-card__overlay-cat">${item.category} · ${item.year}</div>
        </div>
      </div>
      <div class="portfolio-card__body">
        <div class="portfolio-card__category">${item.category} · ${item.year}</div>
        <div class="portfolio-card__title">${item.title}</div>
      </div>
    </div>`;
}

/* ============================================================
   DIARY PAGE
   ============================================================ */
let diaryModalOpen = false;

function initDiaryPage() {
  const listEl = document.querySelector('.diary-page-list');
  if (!listEl) return;

  const sorted = [...DIARY].sort((a, b) => new Date(b.date) - new Date(a.date));
  listEl.innerHTML = sorted.map(e => diaryItemHTML(e)).join('');
  listEl.querySelectorAll('.diary-item').forEach((el, i) => {
    el.addEventListener('click', () => openDiaryModal(sorted[i]));
  });

  setupDiaryModal();

  // Direct link via query param
  const id = new URLSearchParams(window.location.search).get('id');
  if (id) {
    const entry = DIARY.find(d => d.id === parseInt(id));
    if (entry) openDiaryModal(entry);
  }
}

function diaryItemHTML(entry) {
  const tempDiv   = document.createElement('div');
  tempDiv.innerHTML = entry.content;
  const preview   = tempDiv.textContent.trim().slice(0, 120).trim() + '…';
  const tagsHTML  = entry.tags.map(t => `<span class="tag tag--dark">${t}</span>`).join('');

  return `
    <div class="diary-item" data-id="${entry.id}">
      <div class="diary-item__date">${formatDate(entry.date)}</div>
      <div class="diary-item__body">
        <div class="diary-item__title">${entry.title}</div>
        <div class="diary-item__preview">${preview}</div>
        <div class="diary-item__tags">${tagsHTML}</div>
      </div>
      <div class="diary-item__arrow">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square">
          <polyline points="9 6 15 12 9 18"/>
        </svg>
      </div>
    </div>`;
}

function setupDiaryModal() {
  const modal   = document.querySelector('.diary-modal');
  if (!modal) return;
  modal.querySelector('.diary-modal__backdrop')?.addEventListener('click', closeDiaryModal);
  modal.querySelector('.diary-modal__close-btn')?.addEventListener('click', closeDiaryModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && diaryModalOpen) closeDiaryModal(); });
}

function openDiaryModal(entry) {
  const modal = document.querySelector('.diary-modal');
  if (!modal) return;

  const el = (sel) => modal.querySelector(sel);
  el('.diary-modal__title').textContent = entry.title;
  el('.diary-modal__date').textContent  = formatDateLong(entry.date);
  el('.diary-modal__tags').innerHTML    = entry.tags.map(t => `<span class="tag tag--dark">${t}</span>`).join('');

  const cover = el('.diary-modal__cover');
  if (cover) {
    if (entry.cover) {
      cover.src = entry.cover;
      cover.classList.add('visible');
    } else {
      cover.classList.remove('visible');
    }
  }
  el('.diary-modal__body').innerHTML = entry.content;

  // Scroll panel to top
  el('.diary-modal__panel').scrollTop = 0;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  diaryModalOpen = true;

  history.pushState({ diaryId: entry.id }, '', `?id=${entry.id}`);
}

function closeDiaryModal() {
  const modal = document.querySelector('.diary-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  diaryModalOpen = false;
  history.pushState({}, '', window.location.pathname);
}

/* ============================================================
   GALLERY PAGE
   ============================================================ */
let lightboxIndex = 0;

function initGalleryPage() {
  const gridEl = document.querySelector('.gallery-grid');
  if (!gridEl) return;

  gridEl.innerHTML = GALLERY.map((item, i) => `
    <div class="gallery-item" data-index="${i}">
      <img src="${item.src}" alt="${item.caption || ''}" loading="lazy"
           onerror="this.parentElement.innerHTML='<div class=\\'gallery-placeholder\\'>Image</div>'">
      ${item.caption ? `<div class="gallery-item__caption">${item.caption}</div>` : ''}
    </div>`
  ).join('');

  gridEl.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
  });

  setupLightbox();
}

function setupLightbox() {
  const lb = document.querySelector('.lightbox');
  if (!lb) return;

  lb.querySelector('.lightbox__close')?.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
  lb.querySelector('.lightbox__prev')?.addEventListener('click',  e => { e.stopPropagation(); navigateLightbox(-1); });
  lb.querySelector('.lightbox__next')?.addEventListener('click',  e => { e.stopPropagation(); navigateLightbox(1); });
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigateLightbox(-1);
    if (e.key === 'ArrowRight')  navigateLightbox(1);
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  updateLightbox();
  document.querySelector('.lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.querySelector('.lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + GALLERY.length) % GALLERY.length;
  updateLightbox();
}

function updateLightbox() {
  const lb   = document.querySelector('.lightbox');
  const item = GALLERY[lightboxIndex];
  if (!lb || !item) return;

  const img     = lb.querySelector('.lightbox__img');
  const caption = lb.querySelector('.lightbox__caption');
  const counter = lb.querySelector('.lightbox__counter');

  if (img)     { img.src = item.src; img.alt = item.caption || ''; }
  if (caption)   caption.textContent = item.caption || '';
  if (counter)   counter.textContent = `${lightboxIndex + 1} / ${GALLERY.length}`;
}

/* ============================================================
   FADE-IN OBSERVER
   ============================================================ */
function initFadeIn() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-fade]').forEach(el => observer.observe(el));
}

/* ============================================================
   UTILITIES
   ============================================================ */
function setTextAll(selector, text) {
  document.querySelectorAll(selector).forEach(el => { el.textContent = text; });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('.');
}

function formatDateLong(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}

function socialIconSVG(key) {
  const icons = {
    x: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
    note: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 3h5v2h-5V6zm-4 0h2v2H8V6zm11 12H5V10h14v8zm-9-6H8v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>`
  };
  return icons[key] || '';
}
