// Global, dependency-free progressive-enhancement scripts: scroll fade-ins,
// the mobile nav toggle, the transparent-over-hero header, and a lightbox
// for gallery images. Loaded on every page.

function setupFadeIns() {
  const targets = document.querySelectorAll<HTMLElement>('.fade-in');
  if (!targets.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  targets.forEach((el) => observer.observe(el));
}

function setupNav() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-nav-panel]');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}

function setupHeaderScroll() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header || !header.classList.contains('header--transparent')) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 48);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupLightbox() {
  const triggers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-lightbox-trigger]'),
  );
  if (!triggers.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="Close">&times;</button>
    <button type="button" class="lightbox__arrow lightbox__arrow--prev" aria-label="Previous">&#8249;</button>
    <img class="lightbox__img" alt="" />
    <button type="button" class="lightbox__arrow lightbox__arrow--next" aria-label="Next">&#8250;</button>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('img') as HTMLImageElement;
  const closeBtn = overlay.querySelector('.lightbox__close') as HTMLButtonElement;
  const prevBtn = overlay.querySelector('.lightbox__arrow--prev') as HTMLButtonElement;
  const nextBtn = overlay.querySelector('.lightbox__arrow--next') as HTMLButtonElement;

  let currentIndex = 0;
  let lastFocused: HTMLElement | null = null;

  function show(index: number) {
    currentIndex = (index + triggers.length) % triggers.length;
    const trigger = triggers[currentIndex];
    const full = trigger.getAttribute('data-full') ?? '';
    const alt = trigger.getAttribute('data-alt') ?? '';
    imgEl.src = full;
    imgEl.alt = alt;
  }

  function open(index: number) {
    lastFocused = document.activeElement as HTMLElement;
    show(index);
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    imgEl.src = '';
    document.removeEventListener('keydown', onKeydown);
    lastFocused?.focus();
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(currentIndex + 1);
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
  }

  triggers.forEach((trigger, i) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      open(i);
    });
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', () => show(currentIndex + 1));
  prevBtn.addEventListener('click', () => show(currentIndex - 1));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Basic touch swipe support.
  let touchStartX = 0;
  overlay.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  });
  overlay.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      show(currentIndex + (dx < 0 ? 1 : -1));
    }
  });
}

function init() {
  setupFadeIns();
  setupNav();
  setupHeaderScroll();
  setupLightbox();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
