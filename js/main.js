/* Café Zakrzówek – sezony, animacje scrolla, status otwarcia, odległość dla spacerowiczów */
(() => {
  'use strict';

  const C = window.CAFE;
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => matchMedia('(max-width: 760px)').matches;
  const IMG = 'assets/img/';
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------- */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  const observeReveals = (scope = document) => {
    $$('[data-reveal]:not(.is-in), [data-split]:not(.is-in)', scope).forEach((el) => io.observe(el));
  };

  const splitWords = (el, text) => {
    el.setAttribute('aria-label', text);
    el.innerHTML = text.split(/\s+/).filter(Boolean)
      .map((w, i) => `<span class="w" aria-hidden="true"><span style="--wi:${i}">${esc(w)}</span></span>`)
      .join(' ');
  };

  const replay = (el) => {
    el.classList.remove('is-in');
    void el.offsetWidth;
    io.observe(el);
  };

  /* ---------------------------------------------------------------
     Status otwarcia (czas Warszawy)
     --------------------------------------------------------------- */
  const pad = (n) => String(n).padStart(2, '0');
  const fmtHour = (h) => `${h}:00`;

  function warsawMinutes() {
    const parts = new Intl.DateTimeFormat('pl-PL', {
      timeZone: 'Europe/Warsaw', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    const get = (t) => Number(parts.find((p) => p.type === t).value);
    return get('hour') * 60 + get('minute');
  }

  function updateOpenStatus() {
    const { open, close } = C.hours;
    const now = warsawMinutes();
    const isOpen = now >= open * 60 && now < close * 60;
    const soon = isOpen && close * 60 - now <= 45;
    let long, short;
    if (isOpen) {
      long = soon ? `Otwarte jeszcze do ${fmtHour(close)} – zdążysz!` : `Otwarte teraz · do ${fmtHour(close)}`;
      short = `Otwarte<br>do ${fmtHour(close)}`;
    } else if (now < open * 60) {
      long = `Zamknięte · otwarcie dziś o ${fmtHour(open)}`;
      short = `Zamknięte<br>otwarcie dziś ${fmtHour(open)}`;
    } else {
      long = `Zamknięte · otwarcie jutro o ${fmtHour(open)}`;
      short = `Zamknięte<br>otwarcie jutro ${fmtHour(open)}`;
    }
    $$('[data-open-status]').forEach((el) => {
      el.classList.toggle('is-open', isOpen);
      el.classList.toggle('is-closed', !isOpen);
      $('span', el).innerHTML = el.classList.contains('compact') ? short : long;
    });
    $$('[data-hours]').forEach((el) => { el.textContent = `${fmtHour(C.hours.open)}–${fmtHour(C.hours.close)}`; });
  }

  /* ---------------------------------------------------------------
     Renderowanie treści sezonowych
     --------------------------------------------------------------- */
  const highlightsEl = $('[data-highlights]');
  const marqueeEl = $('[data-marquee]');

  function renderHighlights(s) {
    highlightsEl.innerHTML = s.highlights.map((h, i) => `
      <article class="card" data-reveal style="--i:${i}">
        <div class="card-img">
          <img src="${IMG + h.img}" alt="${esc(h.alt)}" loading="lazy" width="480" height="600">
          <span class="tag">${esc(h.tag)}</span>
        </div>
        <div class="card-body">
          <h3>${esc(h.title)}</h3>
          <p>${esc(h.text)}</p>
        </div>
      </article>`).join('');
    observeReveals(highlightsEl);
  }

  function renderMarquee(s) {
    const group = s.marquee.map((t) => `<span>${esc(t)}</span>`).join('');
    marqueeEl.innerHTML = group;
    // powielamy grupę, aż pas wypełni 2× szerokość ekranu (płynna pętla)
    const gw = marqueeEl.scrollWidth || 1;
    const copies = Math.max(2, Math.ceil((innerWidth * 2) / gw) + 1);
    marqueeEl.innerHTML = group.repeat(copies);
    marquee.groupWidth = gw;
  }

  /* ---------------------------------------------------------------
     Menu z zakładkami
     --------------------------------------------------------------- */
  const tabsEl = $('[data-tabs]');
  const panelsEl = $('[data-panels]');

  function itemHTML(it, i) {
    return `<div class="item" style="--i:${i}">
      <div class="item-top"><h3>${esc(it.name)}</h3>${it.badge ? `<span class="badge-s">${esc(it.badge)}</span>` : ''}</div>
      ${it.desc ? `<p>${esc(it.desc)}</p>` : ''}
    </div>`;
  }

  function renderMenu() {
    tabsEl.innerHTML = C.menu.map((c, i) => `
      <button type="button" role="tab" id="tab-${c.id}" aria-controls="panel-${c.id}"
        aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(c.label)}</button>`).join('');
    panelsEl.innerHTML = C.menu.map((c, i) => `
      <div class="panel${i === 0 ? ' is-shown' : ''}" role="tabpanel" id="panel-${c.id}" aria-labelledby="tab-${c.id}" ${i === 0 ? '' : 'hidden'}>
        ${c.seasonal ? '' : c.items.map(itemHTML).join('')}
        <p class="menu-note">Witryna zmienia się codziennie. Aktualną kartę z cenami znajdziesz na miejscu i w relacjach na Instagramie.</p>
      </div>`).join('');

    const tabs = $$('[role="tab"]', tabsEl);
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        const p = document.getElementById(t.getAttribute('aria-controls'));
        p.hidden = !on;
        p.classList.toggle('is-shown', on);
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
      });
    });
  }

  function renderSeasonalMenu(s) {
    const panel = $('#panel-sezon');
    if (!panel) return;
    const note = $('.menu-note', panel);
    panel.innerHTML = s.menuSeasonal.map(itemHTML).join('');
    panel.append(note);
    $('#tab-sezon').textContent = `Sezonowo · ${s.label}`;
  }

  /* ---------------------------------------------------------------
     Przełączanie sezonu
     --------------------------------------------------------------- */
  function applySeason(key, { initial = false } = {}) {
    const s = C.seasons[key];
    if (!s) return;
    root.dataset.season = key;
    try { sessionStorage.setItem('cz-season', key); } catch (e) { /* tryb prywatny */ }

    $$('[data-s]').forEach((el) => {
      const v = s[el.dataset.s];
      if (v == null) return;
      if (el.hasAttribute('data-split')) {
        splitWords(el, v);
        if (!initial) replay(el);
      } else {
        el.textContent = v;
      }
    });

    $$('[data-s-img]').forEach((img) => {
      const v = s[img.dataset.sImg];
      if (!v) return;
      img.src = IMG + v.src;
      img.alt = v.alt;
    });

    renderHighlights(s);
    renderMarquee(s);
    renderSeasonalMenu(s);
    particles.set(s.particles);

    $('meta[name="theme-color"]').setAttribute('content', s.themeColor);
    $$('[data-season-btn]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.seasonBtn === key));

    if (!initial) {
      // powtórz animację wejścia hero
      $$('.hero-in').forEach((el) => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
      const url = new URL(location.href);
      if (url.searchParams.has('sezon')) { url.searchParams.set('sezon', key); history.replaceState(null, '', url); }
    }
  }

  function switchSeason(key, btn) {
    if (key === root.dataset.season) return;
    if (!document.startViewTransition || reduceMotion) { applySeason(key); return; }
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(() => applySeason(key));
    t.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 800, easing: 'cubic-bezier(.2,.7,.2,1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  }

  $$('[data-season-btn]').forEach((b) => b.addEventListener('click', () => switchSeason(b.dataset.seasonBtn, b)));

  /* ---------------------------------------------------------------
     Cząsteczki sezonowe w hero (płatki / słońce / liście / śnieg)
     --------------------------------------------------------------- */
  const particles = (() => {
    const canvas = $('.particles');
    const ctx = canvas.getContext('2d');
    let type = null, items = [], w = 0, h = 0, raf = 0, visible = true, last = 0;

    const palettes = {
      petals: ['#f2b8c6', '#eaa9b7', '#f7d3dc', '#ffffff'],
      sun: ['#f1c56a', '#ffe3a3', '#e2a93b'],
      leaves: ['#c4692f', '#b8862f', '#a54a22', '#d9a441', '#8a6b2e'],
      snow: ['#ffffff']
    };

    const rand = (a, b) => a + Math.random() * (b - a);

    function spawn(initial) {
      const pal = palettes[type];
      const p = {
        x: rand(0, w), y: initial ? rand(0, h) : -20,
        s: rand(.6, 1.2), rot: rand(0, Math.PI * 2), vr: rand(-.02, .02),
        sway: rand(.5, 1.6), phase: rand(0, Math.PI * 2),
        color: pal[(Math.random() * pal.length) | 0], a: rand(.55, .95)
      };
      if (type === 'snow') { p.vy = rand(.35, 1.1); p.r = rand(1.2, 3.6); }
      else if (type === 'sun') { p.y = initial ? rand(0, h) : h + 20; p.vy = -rand(.15, .45); p.r = rand(1.5, 4.5); }
      else if (type === 'leaves') { p.vy = rand(.6, 1.4); }
      else { p.vy = rand(.4, 1); }
      return p;
    }

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function count() {
      const base = type === 'snow' ? 70 : type === 'sun' ? 34 : 26;
      return Math.round(base * clamp((w * h) / (1400 * 900), .35, 1));
    }

    function draw(p, t) {
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.translate(p.x, p.y);
      if (type === 'snow') {
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill();
      } else if (type === 'sun') {
        const tw = .5 + .5 * Math.sin(t / 600 + p.phase);
        ctx.globalAlpha = p.a * (.35 + .65 * tw);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r * 3);
        g.addColorStop(0, p.color); g.addColorStop(1, 'rgba(255,220,150,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(0, 0, p.r * 3, 0, Math.PI * 2); ctx.fill();
      } else if (type === 'leaves') {
        ctx.rotate(p.rot); ctx.scale(p.s, p.s * (.6 + .4 * Math.abs(Math.sin(t / 700 + p.phase))));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -11); ctx.quadraticCurveTo(9, -3, 0, 11); ctx.quadraticCurveTo(-9, -3, 0, -11);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = .8;
        ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(0, 13); ctx.stroke();
      } else {
        ctx.rotate(p.rot); ctx.scale(p.s, p.s * Math.abs(Math.sin(t / 800 + p.phase)) + .15);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.ellipse(0, 0, 7, 4.2, 0, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }

    function frame(t) {
      raf = 0;
      if (!visible || !type || document.hidden) return;
      const dt = Math.min(3, (t - (last || t)) / 16.7); last = t;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < items.length; i++) {
        const p = items[i];
        p.y += p.vy * dt;
        p.x += Math.sin(t / 1400 + p.phase) * .4 * p.sway * dt;
        p.rot += p.vr * dt;
        if (p.y > h + 24 || p.y < -30 || p.x < -30 || p.x > w + 30) items[i] = spawn(false);
        draw(p, t);
      }
      raf = requestAnimationFrame(frame);
    }

    function start() { if (!raf && type && visible) { last = 0; raf = requestAnimationFrame(frame); } }

    new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); }).observe(canvas);
    document.addEventListener('visibilitychange', start);
    addEventListener('resize', () => { if (type) { resize(); } }, { passive: true });

    return {
      set(next) {
        if (reduceMotion) return;
        type = next;
        resize();
        items = Array.from({ length: count() }, () => spawn(true));
        start();
      }
    };
  })();

  /* ---------------------------------------------------------------
     Marquee – ruch zależny od prędkości scrolla
     --------------------------------------------------------------- */
  const marquee = { x: 0, groupWidth: 1, boost: 0, dir: -1, visible: false, raf: 0 };

  function marqueeFrame() {
    marquee.raf = 0;
    if (!marquee.visible) return;
    marquee.x += marquee.dir * (0.6 + marquee.boost);
    marquee.boost *= 0.92;
    const gw = marquee.groupWidth;
    if (marquee.x <= -gw) marquee.x += gw;
    if (marquee.x > 0) marquee.x -= gw;
    marqueeEl.style.setProperty('--mx', `${marquee.x}px`);
    marquee.raf = requestAnimationFrame(marqueeFrame);
  }
  new IntersectionObserver(([e]) => {
    marquee.visible = e.isIntersecting && !reduceMotion;
    if (marquee.visible && !marquee.raf) marquee.raf = requestAnimationFrame(marqueeFrame);
  }).observe($('.marquee'));

  /* ---------------------------------------------------------------
     Silnik efektów scrolla (jedna pętla rAF)
     --------------------------------------------------------------- */
  const header = $('.site-header');
  const nav = $('#nav');
  const progressBar = $('.progress span');
  const hero = $('.hero');
  const rays = $('[data-rays]');
  const badge = $('[data-spin]');
  const parallaxEls = $$('[data-parallax]');
  const trail = $('[data-trail]');
  const hs = $('[data-hscroll]');
  const hsTrack = $('[data-hscroll-track]');
  const hsImgs = $$('img', hsTrack);
  const sunrise = $('[data-sunrise]');
  const visit = $('#kontakt');
  let lastY = scrollY, ticking = false, hsDistance = 0;

  function layoutHScroll() {
    if (isMobile()) { hs.style.removeProperty('--hs-height'); hsDistance = 0; return; }
    hsDistance = Math.max(0, hsTrack.scrollWidth - innerWidth);
    hs.style.setProperty('--hs-height', `${innerHeight + hsDistance}px`);
  }

  function update() {
    ticking = false;
    const y = scrollY;
    const vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;

    progressBar.style.setProperty('--p', max > 0 ? y / max : 0);

    // nagłówek: tło po zjechaniu, chowanie przy scrollu w dół
    header.classList.toggle('is-scrolled', y > 20);
    const navOpen = nav.classList.contains('is-open');
    if (!navOpen) header.classList.toggle('is-hidden', y > lastY && y > 500);
    if (Math.abs(y - lastY) > 2) {
      marquee.boost = Math.min(8, marquee.boost + Math.abs(y - lastY) * 0.04);
      marquee.dir = y > lastY ? -1 : 1;
    }
    lastY = y;

    if (reduceMotion) { trail.style.setProperty('--trail', 1); trail.style.setProperty('--trail-end', 1); }
    else {
      // hero: promienie się obracają, plakietka kręci
      const hp = clamp(y / (hero.offsetHeight || 1));
      rays.style.setProperty('--rot', `${hp * 28}deg`);
      rays.style.setProperty('--sc', 1 + hp * 0.18);
      badge.style.setProperty('--spin', `${y * 0.12}deg`);

      // paralaksa
      for (const el of parallaxEls) {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
        el.style.setProperty('--py', `${offset.toFixed(1)}px`);
      }

      // ścieżka spacerowa rysuje się podczas scrolla
      const tr = trail.getBoundingClientRect();
      const tp = clamp((vh * 0.75 - tr.top) / (tr.height * 0.85));
      trail.style.setProperty('--trail', tp.toFixed(4));
      trail.style.setProperty('--trail-end', clamp((tp - 0.82) / 0.18).toFixed(3));
    }

    // galeria pozioma (przypięta)
    if (hsDistance > 0) {
      const r = hs.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - vh));
      hsTrack.style.setProperty('--hx', `${(-p * hsDistance).toFixed(1)}px`);
      if (!reduceMotion) hsImgs.forEach((img, i) => img.style.setProperty('--gx', `${((p - i / hsImgs.length) * -40).toFixed(1)}px`));
    }

    // wschodzące słońce w sekcji kontakt
    const vr = visit.getBoundingClientRect();
    sunrise.style.setProperty('--rise', reduceMotion ? 1 : clamp((vh - vr.top) / (vr.height * 0.9)).toFixed(3));
  }

  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => {
    layoutHScroll();
    renderMarquee(C.seasons[root.dataset.season]);
    onScroll();
  }, { passive: true });

  /* ---------------------------------------------------------------
     Nawigacja mobilna
     --------------------------------------------------------------- */
  const burger = $('.burger');
  const setNav = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    if (open) header.classList.remove('is-hidden');
  };
  burger.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
  $$('a', nav).forEach((a) => a.addEventListener('click', () => setNav(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });

  /* ---------------------------------------------------------------
     „Ile mam do was?” – odległość pieszo
     --------------------------------------------------------------- */
  const out = $('[data-distance]');
  const haversine = (a, b) => {
    const R = 6371e3, rad = Math.PI / 180;
    const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };

  $('[data-locate]').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    if (!('geolocation' in navigator)) {
      out.textContent = 'Twoja przeglądarka nie udostępnia lokalizacji – skorzystaj z przycisku „Prowadź do nas”.';
      return;
    }
    btn.disabled = true;
    out.textContent = 'Sprawdzam, gdzie jesteś…';
    navigator.geolocation.getCurrentPosition((pos) => {
      btn.disabled = false;
      const me = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      // ok. 1,3 × odległość w linii prostej ≈ realna trasa pieszo, 80 m/min
      const d = haversine(me, C.location) * 1.3;
      const min = Math.max(1, Math.round(d / 80));
      const dist = d < 1000 ? `${Math.round(d / 10) * 10} m` : `${(d / 1000).toFixed(1).replace('.', ',')} km`;
      if (d < 120) out.innerHTML = '<strong>Jesteś praktycznie u nas!</strong> Wpadaj ☼';
      else if (d > 15000) out.innerHTML = `Jesteś ok. <strong>${dist}</strong> od nas – zapraszamy przy najbliższym spacerze nad Zakrzówkiem ☼`;
      else out.innerHTML = `Jesteś ok. <strong>${dist}</strong> od nas – to ok. <strong>${min} min</strong> spacerem. <a href="${$('[data-directions]').href}" target="_blank" rel="noopener">Pokaż trasę →</a>`;
    }, () => {
      btn.disabled = false;
      out.textContent = 'Bez dostępu do lokalizacji nie policzymy odległości – ale trasę pokaże Ci mapa po kliknięciu „Prowadź do nas”.';
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  });

  /* ---------------------------------------------------------------
     Start
     --------------------------------------------------------------- */
  $$('[data-split]').forEach((el) => splitWords(el, el.textContent.trim()));
  renderMenu();
  applySeason(root.dataset.season, { initial: true });
  observeReveals();
  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  layoutHScroll();
  update();

  document.fonts?.ready.then(() => {
    renderMarquee(C.seasons[root.dataset.season]);
    layoutHScroll();
    update();
  });
})();
