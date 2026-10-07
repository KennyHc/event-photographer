// Global, dependency-free progressive-enhancement scripts: scroll fade-ins,
// the mobile nav toggle, the transparent-over-hero header, and a lightbox
// for gallery images. Loaded on every page.
//
// The site uses Astro's ClientRouter, so this module only runs once per full
// load. Per-page setup lives in init(), which runs on every `astro:page-load`
// and registers its teardown in `cleanups` so it can safely run again.

const EASE = 'cubic-bezier(.2,.8,.2,1)';

let cleanups: Array<() => void> = [];

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupFadeIns() {
  const targets = document.querySelectorAll<HTMLElement>('.fade-in');
  if (!targets.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Reveal anything already in (or above) the viewport instantly, with no
  // transition, so above-the-fold content never visibly animates in.
  const revealInstantly = (el: HTMLElement) => {
    const previousTransition = el.style.transition;
    el.style.transition = 'none';
    el.classList.add('is-visible');
    el.offsetHeight; // force reflow before restoring the transition
    el.style.transition = previousTransition;
  };

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const toObserve: HTMLElement[] = [];

  targets.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom > 0) {
      revealInstantly(el);
    } else {
      toObserve.push(el);
    }
  });

  if (!toObserve.length) return;

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

  toObserve.forEach((el) => observer.observe(el));
  cleanups.push(() => observer.disconnect());
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

  // Start closed, in case the previous page was left with the menu open.
  document.body.classList.remove('nav-open');

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}

// Registered once; looks the header up each time because ClientRouter
// replaces it on navigation.
function updateHeaderScroll() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header || !header.classList.contains('header--transparent')) return;
  header.classList.toggle('is-scrolled', window.scrollY > 48);
}

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
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
    <div class="lightbox__backdrop"></div>
    <button type="button" class="lightbox__close" aria-label="Close">&times;</button>
    <button type="button" class="lightbox__arrow lightbox__arrow--prev" aria-label="Previous">&#8249;</button>
    <button type="button" class="lightbox__arrow lightbox__arrow--next" aria-label="Next">&#8250;</button>
    <p class="lightbox__counter" aria-live="polite"></p>
  `;
  document.body.appendChild(overlay);

  const backdrop = overlay.querySelector('.lightbox__backdrop') as HTMLElement;
  const closeBtn = overlay.querySelector('.lightbox__close') as HTMLButtonElement;
  const prevBtn = overlay.querySelector('.lightbox__arrow--prev') as HTMLButtonElement;
  const nextBtn = overlay.querySelector('.lightbox__arrow--next') as HTMLButtonElement;
  const counter = overlay.querySelector('.lightbox__counter') as HTMLElement;

  const count = triggers.length;
  const preloaded = new Set<string>();
  let isOpen = false;
  let isClosing = false;
  let currentIndex = 0;
  let currentImg: HTMLImageElement | null = null;
  let currentBox: Box | null = null;

  const ms = (n: number) => (prefersReducedMotion() ? 0 : n);
  const thumbOf = (i: number) => triggers[i].querySelector('img') as HTMLImageElement;
  const fullOf = (i: number) => triggers[i].getAttribute('data-full') ?? '';

  function thumbBox(i: number): Box {
    const r = thumbOf(i).getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  }

  function isInView(b: Box) {
    return (
      b.top + b.height > 0 &&
      b.top < overlay.clientHeight &&
      b.left + b.width > 0 &&
      b.left < overlay.clientWidth
    );
  }

  function aspectOf(i: number) {
    const t = thumbOf(i);
    const w = t.naturalWidth || Number(t.getAttribute('width'));
    const h = t.naturalHeight || Number(t.getAttribute('height'));
    return w && h ? w / h : 3 / 2;
  }

  /** Contain-fit box, centered in the viewport, for a photo of this aspect. */
  function fitBox(aspect: number): Box {
    const vw = overlay.clientWidth;
    const vh = overlay.clientHeight;
    let width = Math.min(vw * 0.92, 1400);
    let height = width / aspect;
    if (height > vh * 0.88) {
      height = vh * 0.88;
      width = height * aspect;
    }
    return { left: (vw - width) / 2, top: (vh - height) / 2, width, height };
  }

  function place(el: HTMLElement, b: Box) {
    el.style.left = `${b.left}px`;
    el.style.top = `${b.top}px`;
    el.style.width = `${b.width}px`;
    el.style.height = `${b.height}px`;
  }

  /** Transform that makes an element laid out at `to` appear at `from`. */
  function flip(from: Box, to: Box) {
    return `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`;
  }

  function preload(i: number) {
    const src = fullOf(i);
    if (preloaded.has(src)) return;
    preloaded.add(src);
    new Image().src = src;
  }

  function preloadNeighbours(i: number) {
    preload((i + 1) % count);
    preload((i - 1 + count) % count);
  }

  /** An <img> showing photo `i`: the loaded thumbnail first, then the full-size file. */
  function createImg(i: number) {
    const el = document.createElement('img');
    el.className = 'lightbox__img';
    el.alt = triggers[i].getAttribute('data-alt') ?? '';
    el.decoding = 'async';
    const thumb = thumbOf(i);
    const full = fullOf(i);
    const useThumb = thumb.complete && thumb.naturalWidth > 0;
    el.src = useThumb ? thumb.currentSrc || thumb.src : full;
    if (useThumb) {
      const loader = new Image();
      loader.src = full;
      const swap = () => {
        if (el.isConnected) el.src = full;
      };
      loader.decode().then(swap, swap);
    }
    return el;
  }

  function setThumbHidden(i: number, hidden: boolean) {
    const value = hidden ? 'hidden' : '';
    thumbOf(i).style.visibility = value;
    const label = triggers[i].querySelector<HTMLElement>('.gallery__label');
    if (label) label.style.visibility = value;
  }

  function updateCounter() {
    counter.textContent = `${currentIndex + 1} / ${count}`;
  }

  function lockScroll() {
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--sbw', `${gap}px`);
    document.body.classList.add('lightbox-open');
  }

  function unlockScroll() {
    document.body.classList.remove('lightbox-open');
    document.documentElement.style.removeProperty('--sbw');
  }

  function open(index: number) {
    if (isOpen) return;
    isOpen = true;
    currentIndex = index;

    const from = thumbBox(index);
    lockScroll();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');

    const el = createImg(index);
    currentBox = fitBox(aspectOf(index));
    place(el, currentBox);
    overlay.appendChild(el);
    currentImg = el;
    setThumbHidden(index, true);
    updateCounter();

    overlay.offsetWidth; // flush so the backdrop fade runs from opacity 0
    overlay.classList.add('is-visible');
    el.animate([{ transform: flip(from, currentBox) }, { transform: 'none' }], {
      duration: ms(500),
      easing: EASE,
    });

    closeBtn.focus({ preventScroll: true });
    document.addEventListener('keydown', onKeydown);
    window.addEventListener('resize', onResize);
    preloadNeighbours(index);
  }

  function go(dir: 1 | -1) {
    if (!isOpen || isClosing || count < 2 || !currentImg) return;
    overlay.querySelectorAll('.lightbox__img.is-leaving').forEach((el) => el.remove());

    const outgoing = currentImg;
    outgoing.classList.add('is-leaving');
    outgoing
      .animate(
        { transform: `translateX(${-dir * 6}%)`, opacity: 0 },
        { duration: ms(400), easing: EASE, fill: 'forwards' },
      )
      .finished.then(() => outgoing.remove(), () => {});

    setThumbHidden(currentIndex, false);
    currentIndex = (currentIndex + dir + count) % count;
    setThumbHidden(currentIndex, true);

    const incoming = createImg(currentIndex);
    currentBox = fitBox(aspectOf(currentIndex));
    place(incoming, currentBox);
    overlay.appendChild(incoming);
    currentImg = incoming;
    incoming.animate(
      [
        { transform: `translateX(${dir * 6}%)`, opacity: 0 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: ms(500), easing: EASE },
    );

    updateCounter();
    preloadNeighbours(currentIndex);
  }

  function close() {
    if (!isOpen || isClosing || !currentImg || !currentBox) return;
    isClosing = true;
    overlay.classList.remove('is-visible');
    overlay.querySelectorAll('.lightbox__img.is-leaving').forEach((el) => el.remove());

    // Bring the current photo's thumbnail on screen so the image can land on it.
    let target = thumbBox(currentIndex);
    const vh = overlay.clientHeight;
    if (target.top < 0 || target.top + target.height > vh) {
      window.scrollTo({
        top: window.scrollY + target.top - (vh - target.height) / 2,
        behavior: 'instant',
      });
      target = thumbBox(currentIndex);
    }

    const anim = isInView(target)
      ? currentImg.animate(
          [{ transform: 'none' }, { transform: flip(target, currentBox) }],
          { duration: ms(450), easing: EASE, fill: 'forwards' },
        )
      : currentImg.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: ms(300),
          easing: EASE,
          fill: 'forwards',
        });

    const finish = () => {
      triggers.forEach((_, i) => setThumbHidden(i, false));
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.querySelectorAll('.lightbox__img').forEach((el) => el.remove());
      currentImg = null;
      unlockScroll();
      isOpen = false;
      isClosing = false;
      triggers[currentIndex].focus({ preventScroll: true });
    };
    document.removeEventListener('keydown', onKeydown);
    window.removeEventListener('resize', onResize);
    anim.finished.then(finish, finish);
  }

  function onResize() {
    if (!currentImg) return;
    currentBox = fitBox(aspectOf(currentIndex));
    place(currentImg, currentBox);
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'Tab') {
      // Keep focus inside the dialog.
      const items = [closeBtn, prevBtn, nextBtn];
      const idx = items.indexOf(document.activeElement as HTMLButtonElement);
      e.preventDefault();
      items[(idx + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    }
  }

  triggers.forEach((trigger, i) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      open(i);
    });
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', () => go(1));
  prevBtn.addEventListener('click', () => go(-1));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === backdrop) close();
  });

  // Basic touch swipe support.
  let touchStartX = 0;
  overlay.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  });
  overlay.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  });

  cleanups.push(() => {
    document.removeEventListener('keydown', onKeydown);
    window.removeEventListener('resize', onResize);
    if (isOpen) unlockScroll();
    overlay.remove();
  });
}

function init() {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  document.documentElement.classList.add('js');
  setupFadeIns();
  setupNav();
  updateHeaderScroll();
  setupLightbox();
}

document.addEventListener('astro:page-load', init);
// The incoming document's <html> has no `js` class (it is added by an inline
// script that doesn't re-run), so restore it before the new page paints.
document.addEventListener('astro:after-swap', () => {
  document.documentElement.classList.add('js');
});
// Tear down before the DOM is replaced so no listeners or overlays leak.
document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
});
window.addEventListener('scroll', updateHeaderScroll, { passive: true });
