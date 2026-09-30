/**
 interactions.js: Global Interactive Effects untuk Charvlibrary
 Effects:
 1. Custom cursor glow (cuman dekstoop)
 2. Magnetic buttons: CTA button tertarik ke arah cursor
 3. Ripple effect pada semua button clicks
 4. Book card 3D tilt 
 5. Parallax hero decorative elements
 6. Page-leave transition (fade + slide)
 7. Navbar scroll shrink + shadow
 8. Text scramble pada hover badge/genre tags
 9. Count-up animasi angka statistik
 10. Sticky header progress bar =
 */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth < 768;

  /* 1. CUSTOM CURSOR GLOW */
  function initCursor() {
    if (isMobile() || prefersReduced) return;

    const style = document.createElement('style');
    style.textContent = `
      .charv-cursor {
        position: fixed;
        left: 0; top: 0;          /* anchor ke 0,0: posisi lewat transform */
        pointer-events: none;
        z-index: 9999;
        will-change: transform;
        transition: opacity .3s ease;
      }
      .charv-cursor-dot {
        width: 8px; height: 8px;
        background: var(--color-accent);
        border-radius: 50%;
        transform: translate(var(--cx,0px), var(--cy,0px)) translate(-50%,-50%);
        transition: width .2s ease, height .2s ease, background .2s ease;
      }
      .charv-cursor-aura {
        width: 40px; height: 40px;
        background: rgba(217, 119, 6, 0.12);
        border: 1.5px solid rgba(217, 119, 6, 0.25);
        border-radius: 50%;
        transform: translate(var(--ax,0px), var(--ay,0px)) translate(-50%,-50%);
        transition: width .3s var(--ease-out), height .3s var(--ease-out), background .25s ease;
      }
      .cursor-hover .charv-cursor-aura {
        width: 56px; height: 56px;
        background: rgba(217, 119, 6, 0.18);
      }
      .cursor-hover .charv-cursor-dot {
        width: 6px; height: 6px;
        background: var(--color-secondary);
      }
    `;
    document.head.appendChild(style);

    const dot  = document.createElement('div');
    dot.className = 'charv-cursor charv-cursor-dot';
    const aura = document.createElement('div');
    aura.className = 'charv-cursor charv-cursor-aura';
    document.body.appendChild(dot);
    document.body.appendChild(aura);

    let ax = 0, ay = 0, mx = 0, my = 0;

    document.addEventListener('mousemove', e => {
      // clientX/clientY: viewport-relative, tidak dipengaruhi scroll
      mx = e.clientX; my = e.clientY;
      // Pakai CSS custom properties → transform, bukan top/left
      dot.style.setProperty('--cx', mx + 'px');
      dot.style.setProperty('--cy', my + 'px');
    });

    // Aura follows with lerp: smooth lag effect
    let rafId;
    function lerpAura() {
      ax += (mx - ax) * 0.1;
      ay += (my - ay) * 0.1;
      aura.style.setProperty('--ax', ax.toFixed(2) + 'px');
      aura.style.setProperty('--ay', ay.toFixed(2) + 'px');
      rafId = requestAnimationFrame(lerpAura);
    }
    lerpAura();

    // Hover state untuk links/buttons
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, [role=button], input, textarea, select')) {
        document.documentElement.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button, [role=button], input, textarea, select')) {
        document.documentElement.classList.remove('cursor-hover');
      }
    });

    // Hide/show saat keluar masuk window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      aura.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      aura.style.opacity = '1';
    });
  }

  function initMagneticButtons() {
    if (isMobile() || prefersReduced) return;

    document.querySelectorAll('.btn-primary, .btn-magnetic').forEach(btn => {
      btn.style.transition = 'transform .3s var(--ease-out), box-shadow .3s ease';

      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0) scale(1)';
      });
    });
  }

  function initRipple() {
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
      .btn { position: relative; overflow: hidden; }
      .ripple-wave {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim .55s linear;
        background: rgba(255, 255, 255, 0.35);
        pointer-events: none;
      }
      @keyframes rippleAnim {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(rippleStyle);

    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      if (prefersReduced) return;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-wave';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
      `;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  function initCardTilt() {
    if (isMobile() || prefersReduced) return;

    const tiltStyle = document.createElement('style');
    tiltStyle.textContent = `
      .book-card {
        transform-style: preserve-3d;
        will-change: transform;
      }
      .book-card .book-cover {
        transition: transform .3s var(--ease-out), box-shadow .3s ease;
      }
      .book-card:hover .book-cover {
        transform: translateZ(8px);
        box-shadow: var(--shadow-book-hover);
      }
    `;
    document.head.appendChild(tiltStyle);

    function attachTilt(card) {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const rx   = ((e.clientY - cy) / (rect.height / 2)) * -6;
        const ry   = ((e.clientX - cx) / (rect.width  / 2)) * 6;
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
      });
    }

    // Attach to existing + future cards
    document.querySelectorAll('.book-card').forEach(attachTilt);

    const cardObserver = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          node.querySelectorAll?.('.book-card').forEach(attachTilt);
          if (node.classList?.contains('book-card')) attachTilt(node);
        });
      });
    });
    cardObserver.observe(document.body, { childList: true, subtree: true });
  }

  function initParallax() {
    if (prefersReduced) return;

    const layers = [];

    function collectLayers() {
      document.querySelectorAll('[data-parallax]').forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        layers.push({ el, speed });
      });
    }
    collectLayers();

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        layers.forEach(({ el, speed }) => {
          el.style.transform = `translateY(${y * speed}px)`;
        });
        ticking = false;
      });
    }, { passive: true });
  }

  function initPageTransitions() {
    if (prefersReduced) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: var(--color-background);
      opacity: 0; pointer-events: none;
      transition: opacity .35s var(--ease-in);
    `;
    document.body.appendChild(overlay);

    document.addEventListener('click', e => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      const isExternal = href.startsWith('http') || href.startsWith('//');
      const isAnchor   = href.startsWith('#');
      const isDownload  = link.hasAttribute('download');

      if (isExternal || isAnchor || isDownload) return;
      if (link.target === '_blank') return;

      e.preventDefault();
      overlay.style.pointerEvents = 'all';
      overlay.style.opacity = '1';

      setTimeout(() => {
        window.location.href = href;
      }, 350);
    });

    // Fade-in on load
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
      @keyframes pageFadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      main { animation: pageFadeIn .4s var(--ease-out) both; }
    `;
    document.head.appendChild(fadeInStyle);
  }

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const navStyle = document.createElement('style');
    navStyle.textContent = `
      .navbar {
        transition: height .3s var(--ease-out), box-shadow .3s ease, background .3s ease;
      }
      .navbar.scrolled {
        box-shadow: 0 2px 20px rgba(146, 64, 14, 0.12);
        background: rgba(255, 251, 235, 0.97);
      }
      .navbar-inner {
        transition: padding .3s ease;
      }
      .navbar.scrolled .navbar-inner {
        padding-block: 10px;
      }
    `;
    document.head.appendChild(navStyle);

    let last = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 60);
      navbar.classList.toggle('navbar--hidden', y > last + 80 && y > 300);
      navbar.classList.toggle('navbar--visible', y < last);
      last = y;
    }, { passive: true });
  }

  function initCountUp() {
    if (prefersReduced) return;

    const targets = document.querySelectorAll('[data-count]');
    if (!targets.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el  = entry.target;
        const end = parseFloat(el.dataset.count);
        const dur = 1400;
        const dec = el.dataset.countDecimals ? parseInt(el.dataset.countDecimals) : 0;
        const sep = el.dataset.countSep || '';
        const start = performance.now();

        function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

        function tick(now) {
          const t   = Math.min((now - start) / dur, 1);
          const val = easeOut(t) * end;
          el.textContent = sep
            ? Math.round(val).toLocaleString('id')
            : val.toFixed(dec);
          if (t < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    targets.forEach(el => observer.observe(el));
  }

  function initCardGlow() {
    if (isMobile() || prefersReduced) return;

    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
      .book-card, .borrow-card, .event-card, .review-item, .admin-stat-card {
        --glow-x: 50%; --glow-y: 50%;
        background: radial-gradient(
          circle 180px at var(--glow-x) var(--glow-y),
          rgba(217, 119, 6, 0.06),
          transparent 60%
        ), var(--color-card);
        background-clip: padding-box;
        transition: background .3s ease, box-shadow .3s ease, transform .25s var(--ease-out);
      }
    `;
    document.head.appendChild(glowStyle);

    function attachGlow(card) {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
        const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
        card.style.setProperty('--glow-x', x);
        card.style.setProperty('--glow-y', y);
      });
    }

    document.querySelectorAll('.book-card, .borrow-card, .event-card, .review-item, .admin-stat-card').forEach(attachGlow);

    const glowObserver = new MutationObserver(m => {
      m.forEach(mut => {
        mut.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          const sel = '.book-card, .borrow-card, .event-card, .review-item, .admin-stat-card';
          node.querySelectorAll?.(sel).forEach(attachGlow);
          if (node.matches?.(sel)) attachGlow(node);
        });
      });
    });
    glowObserver.observe(document.body, { childList: true, subtree: true });
  }

  function initEnhancedReveal() {
    if (prefersReduced) return;

    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
      .fade-up {
        transition: opacity .55s var(--ease-out), transform .55s var(--ease-out);
      }
      .book-grid .book-card.fade-up,
      .reco-books-scroll .book-card.fade-up {
        transition-property: opacity, transform;
        transition-duration: .45s;
        transition-timing-function: var(--ease-out);
      }
    `;
    document.head.appendChild(revealStyle);

    document.querySelectorAll('.book-grid, .reco-books-scroll, .admin-stats-grid').forEach(grid => {
      grid.querySelectorAll('.fade-up').forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i * 0.07, 0.5)}s`;
      });
    });
  }

  function initFocusStyles() {
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
      :focus-visible {
        outline: 2.5px solid var(--color-accent);
        outline-offset: 3px;
        border-radius: var(--radius-sm);
        box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.15);
      }
    `;
    document.head.appendChild(focusStyle);
  }

  function initAnimatedLinks() {
    const linkStyle = document.createElement('style');
    linkStyle.textContent = `
      .navbar-nav a {
        position: relative;
        text-decoration: none !important;
      }
      .navbar-nav a::after {
        content: '';
        position: absolute;
        bottom: -2px; left: 0;
        width: 0%; height: 2px;
        background: var(--color-accent);
        border-radius: 1px;
        transition: width .25s var(--ease-out);
      }
      .navbar-nav a:hover::after,
      .navbar-nav a[aria-current="page"]::after {
        width: 100%;
      }
      .navbar-nav a[aria-current="page"] {
        color: var(--color-secondary);
        font-weight: 600;
      }
    `;
    document.head.appendChild(linkStyle);
  }

  function enhanceToasts() {
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
      .toast {
        animation: toastPop .4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important;
      }
      @keyframes toastPop {
        from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.9); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1); }
      }
      .toast.removing {
        animation: toastDismiss .3s ease forwards !important;
      }
      @keyframes toastDismiss {
        to { opacity: 0; transform: translateX(-50%) translateY(12px) scale(0.95); }
      }
    `;
    document.head.appendChild(toastStyle);
  }

  function init() {
    initCursor();
    initMagneticButtons();
    initRipple();
    initCardTilt();
    initParallax();
    initPageTransitions();
    initNavbarScroll();
    initCountUp();
    initCardGlow();
    initEnhancedReveal();
    initFocusStyles();
    initAnimatedLinks();
    enhanceToasts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
