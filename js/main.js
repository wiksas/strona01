/* Café Zakrzówek – sezony, pojawianie się treści, galeria z podglądem, menu, status otwarcia, odległość pieszo.
   Animacje zależne od przewijania są w CSS (animation-timeline); tutaj tylko IntersectionObserver. */
(() => {
  'use strict';

  const C = window.CAFE;
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reduceMotion ? 'auto' : 'smooth';
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Ścieżki z CMS są od katalogu głównego strony ("/assets/img/x.webp"); na GitHub Pages trzeba dodać baseurl.
  const url = (p) => (p && p.startsWith('/') ? C.base + p : p);
  const smalls = new Set(C.smalls);
  const imgData = (path) => {
    const [w, h] = C.images[path] || [480, 640];
    const small = path.replace(/\.webp$/, '-320.webp');
    return { src: url(path), srcset: small !== path && smalls.has(small) ? `${url(small)} 320w, ${url(path)} ${w}w` : '', w, h };
  };
  const imgAttrs = (path, sizes) => {
    const d = imgData(path);
    return `src="${d.src}"${d.srcset ? ` srcset="${d.srcset}" sizes="${sizes}"` : ''} width="${d.w}" height="${d.h}"`;
  };

  /* ---------------------------------------------------------------
     Pojawianie się przy przewijaniu
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
      long = soon ? `Otwarte jeszcze do ${fmtHour(close)}, zdążysz!` : `Otwarte teraz · do ${fmtHour(close)}`;
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
    $$('[data-hours]').forEach((el) => { el.textContent = `${fmtHour(open)}–${fmtHour(close)}`; });
  }

  /* ---------------------------------------------------------------
     Treści sezonowe
     --------------------------------------------------------------- */
  const highlightsEl = $('[data-highlights]');
  const marqueeEl = $('[data-marquee]');

  function renderHighlights(s) {
    const cards = s.karty || [];
    highlightsEl.style.setProperty('--rest', Math.max(0, cards.length - 1));
    highlightsEl.innerHTML = cards.map((h, i) => `
      <article class="card" data-reveal style="--i:${i}">
        <div class="card-img">
          <img ${imgAttrs(h.obraz, '(max-width: 760px) 78vw, 380px')} loading="lazy" alt="${esc(h.alt || '')}">
          ${h.etykieta ? `<span class="tag">${esc(h.etykieta)}</span>` : ''}
        </div>
        <div class="card-body">
          <h3>${esc(h.tytul || '')}</h3>
          <p>${esc(h.tekst || '')}</p>
        </div>
      </article>`).join('');
    observeReveals(highlightsEl);
  }

  // Pas haseł: grupa powielona tak, żeby była szersza niż ekran, i zdublowana (CSS przesuwa pas o -50% w rytm przewijania strony).
  function renderMarquee(s) {
    const items = (s.hasla || []).map((t) => `<span>${esc(t)}</span>`).join('');
    marqueeEl.innerHTML = `<div class="marquee-group">${items}</div>`;
    const one = marqueeEl.firstElementChild.scrollWidth || 1;
    const group = `<div class="marquee-group">${items.repeat(Math.max(1, Math.ceil(innerWidth / one)))}</div>`;
    marqueeEl.innerHTML = group + group;
  }

  function itemHTML(it, i) {
    return `<li class="item" style="--i:${i}"><span class="item-name">${esc(it.nazwa)}${it.znaczek ? `<span class="badge-s">${esc(it.znaczek)}</span>` : ''}</span>${it.opis ? `<p>${esc(it.opis)}</p>` : ''}</li>`;
  }

  function renderSeasonalMenu(s) {
    $('[data-seasonal-menu]').innerHTML = (s.menu_sezonowe || []).map(itemHTML).join('');
    $('#panel-sezon .panel-title').textContent = `Oferta sezonowa · ${s.nazwa}`;
    const tab = $('#tab-panel-sezon');
    if (tab) tab.textContent = `Sezonowo · ${s.nazwa}`;
  }

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

    const walker = $('[data-s-img="spacer_obraz"]');
    const wd = imgData(s.spacer_obraz.obraz);
    if (wd.srcset) walker.srcset = wd.srcset; else walker.removeAttribute('srcset');
    walker.src = wd.src;
    walker.width = wd.w; walker.height = wd.h;
    walker.alt = s.spacer_obraz.alt;

    window.CZ_setHero(key);
    renderHighlights(s);
    renderMarquee(s);
    renderSeasonalMenu(s);

    $('meta[name="theme-color"]').setAttribute('content', s.kolor_motywu);
    $$('[data-season-btn]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.seasonBtn === key));

    if (!initial) {
      $$('.hero-in').forEach((el) => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
      const url = new URL(location.href);
      if (url.searchParams.has('sezon')) { url.searchParams.set('sezon', key); history.replaceState(history.state, '', url); }
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
        { duration: 600, easing: 'cubic-bezier(.2,.7,.2,1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  }

  $$('[data-season-btn]').forEach((b) => b.addEventListener('click', () => switchSeason(b.dataset.seasonBtn, b)));

  /* ---------------------------------------------------------------
     Warstwy z obsługą przycisku „wstecz” (menu mobilne, podgląd zdjęć)
     --------------------------------------------------------------- */
  const layers = {};       // nazwa → funkcja zamykająca UI
  let openLayer = null;

  function pushLayer(name) {
    openLayer = name;
    root.classList.add('is-locked');
    history.pushState({ czLayer: name }, '');
  }
  // Zamknięcie z UI (×, Esc, tło, link) cofa wpis historii; właściwe zamknięcie robi popstate.
  function closeLayer() { if (openLayer) history.back(); }
  addEventListener('popstate', () => {
    if (!openLayer) return;
    const name = openLayer;
    openLayer = null;
    root.classList.remove('is-locked');
    layers[name]();
  });

  /* ---------------------------------------------------------------
     Nagłówek, aktywna pozycja menu, pasek akcji
     --------------------------------------------------------------- */
  const header = $('.site-header');
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none';
  sentinel.setAttribute('aria-hidden', 'true');
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting)).observe(sentinel);

  const nav = $('#nav');
  const navLinks = $$('a[href^="#"]', nav);
  const spyTargets = $$('main > section');
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const id = e.target.id;
      navLinks.forEach((a) => {
        if (id && a.hash === `#${id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  spyTargets.forEach((t) => spy.observe(t));

  const actionBar = $('.action-bar');
  const away = new Set();
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? away.add(e.target) : away.delete(e.target)));
    actionBar.classList.toggle('is-away', away.size > 0);
  });
  barObserver.observe($('#kontakt'));
  barObserver.observe($('.footer'));

  /* ---------------------------------------------------------------
     Menu mobilne
     --------------------------------------------------------------- */
  const burger = $('.burger');
  let pendingHash = null;
  const setNavUI = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  };
  layers.nav = () => {
    setNavUI(false);
    if (pendingHash) {
      const target = $(pendingHash);
      history.pushState(null, '', pendingHash);
      pendingHash = null;
      // po popstate przeglądarka przywraca pozycję przewinięcia – przewijamy klatkę później
      requestAnimationFrame(() => target?.scrollIntoView({ behavior }));
    }
  };
  burger.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) closeLayer();
    else { setNavUI(true); pushLayer('nav'); }
  });
  navLinks.forEach((a) => a.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    e.preventDefault();
    pendingHash = a.hash;
    closeLayer();
  }));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && openLayer === 'nav') { closeLayer(); burger.focus(); } });

  /* ---------------------------------------------------------------
     Galeria: strzałki + licznik (komputer), przesuwanie palcem (telefon)
     --------------------------------------------------------------- */
  const track = $('[data-gallery]');
  const photos = $$('.g-item:not(.g-cta)', track);
  const allItems = $$('.g-item', track);
  const prevBtn = $('[data-gallery-prev]');
  const nextBtn = $('[data-gallery-next]');
  const countEl = $('[data-gallery-count]');
  const visibleItems = new Set();
  $('[data-gallery-nav]').hidden = false;

  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visibleItems.add(e.target) : visibleItems.delete(e.target)));
    const idx = allItems.findIndex((it) => visibleItems.has(it));
    if (idx >= 0) countEl.textContent = `${Math.min(idx + 1, photos.length)} / ${photos.length}`;
    prevBtn.disabled = visibleItems.has(allItems[0]);
    nextBtn.disabled = visibleItems.has(allItems[allItems.length - 1]);
  }, { root: track, threshold: 0.9 });
  allItems.forEach((it) => galleryObserver.observe(it));

  const step = () => allItems[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
  prevBtn.addEventListener('click', () => track.scrollBy({ left: -step(), behavior }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left: step(), behavior }));

  /* ---------------------------------------------------------------
     Podgląd zdjęć (lightbox)
     --------------------------------------------------------------- */
  const lb = $('[data-lb]');
  const lbImg = $('[data-lb-img]');
  const lbCaption = $('[data-lb-caption]');
  const lbCount = $('[data-lb-count]');
  const openers = $$('[data-lightbox]');
  let lbIndex = 0, lbOpener = null;

  function lbShow(i) {
    lbIndex = (i + openers.length) % openers.length;
    const btn = openers[lbIndex];
    const img = $('img', btn);
    lbImg.src = img.getAttribute('src');  // największa dostępna wersja
    lbImg.alt = img.alt;
    lbCaption.textContent = btn.closest('figure').querySelector('figcaption')?.textContent || '';
    lbCount.textContent = `${lbIndex + 1} / ${openers.length}`;
  }
  layers.lb = () => { lb.close(); lbOpener?.focus(); };

  openers.forEach((btn, i) => btn.addEventListener('click', () => {
    lbOpener = btn;
    lbShow(i);
    lb.showModal();
    pushLayer('lb');
  }));
  $('[data-lb-close]').addEventListener('click', closeLayer);
  $('[data-lb-prev]').addEventListener('click', () => lbShow(lbIndex - 1));
  $('[data-lb-next]').addEventListener('click', () => lbShow(lbIndex + 1));
  lb.addEventListener('cancel', (e) => { e.preventDefault(); closeLayer(); });
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-figure')) closeLayer(); });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); lbShow(lbIndex - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); lbShow(lbIndex + 1); }
  });
  let swipeX = null;
  lb.addEventListener('pointerdown', (e) => { swipeX = e.clientX; });
  lb.addEventListener('pointerup', (e) => {
    if (swipeX == null) return;
    const dx = e.clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1));
  });

  /* ---------------------------------------------------------------
     Menu – zakładki budowane z paneli w HTML (bez JS widać wszystkie)
     --------------------------------------------------------------- */
  function initTabs() {
    const tabsEl = $('[data-tabs]');
    const panels = $$('[data-panels] .panel');
    tabsEl.innerHTML = panels.map((p, i) => `
      <button type="button" role="tab" id="tab-${p.id}" aria-controls="${p.id}"
        aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(p.dataset.panelLabel)}</button>`).join('');
    panels.forEach((p, i) => {
      p.setAttribute('role', 'tabpanel');
      p.setAttribute('aria-labelledby', `tab-${p.id}`);
      p.hidden = i !== 0;
      p.classList.toggle('is-shown', i === 0);
    });
    tabsEl.hidden = false;
    $('[data-panels]').classList.add('tabs-ready');

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
    // Linki z data-open-tab (np. „Co dziś w witrynie?” w hero) przewijają do menu i otwierają wskazaną zakładkę.
    $$('[data-open-tab]').forEach((a) => a.addEventListener('click', () => {
      const tab = document.getElementById(`tab-${a.dataset.openTab}`);
      if (tab) select(tab);
    }));
  }

  /* ---------------------------------------------------------------
     Mapa Google – wczytywana dopiero po kliknięciu
     --------------------------------------------------------------- */
  $('[data-map-load]').addEventListener('click', () => {
    const map = $('[data-map]');
    const iframe = document.createElement('iframe');
    const q = encodeURIComponent(map.dataset.mapQuery);
    iframe.title = `Mapa Google: ${map.dataset.mapQuery}`;
    iframe.src = `https://www.google.com/maps?q=${q}&z=15&output=embed`;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    map.append(iframe);
    $('.map-cta', map).remove();
    iframe.focus();
  });

  /* ---------------------------------------------------------------
     „Ile mam do was?” – odległość pieszo
     --------------------------------------------------------------- */
  const out = $('[data-distance]');
  const haversine = (a, b) => {
    const R = 6371e3, rad = Math.PI / 180;
    const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  };

  $('[data-locate]').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    if (!('geolocation' in navigator)) {
      out.textContent = 'Twoja przeglądarka nie udostępnia lokalizacji. Skorzystaj z przycisku „Prowadź do nas”.';
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
      else if (d > 15000) out.innerHTML = `Jesteś ok. <strong>${dist}</strong> od nas. Zapraszamy przy najbliższym spacerze nad Zakrzówkiem ☼`;
      else out.innerHTML = `Jesteś ok. <strong>${dist}</strong> od nas, to ok. <strong>${min} min</strong> spacerem. <a href="${$('[data-directions]').href}" target="_blank" rel="noopener">Pokaż trasę pieszą</a>`;
    }, () => {
      btn.disabled = false;
      out.textContent = 'Bez dostępu do lokalizacji nie policzymy odległości. Trasę pokaże Ci mapa po kliknięciu „Prowadź do nas”.';
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  });

  /* ---------------------------------------------------------------
     Start
     --------------------------------------------------------------- */
  $$('[data-split]').forEach((el) => splitWords(el, el.textContent.trim()));
  initTabs();
  applySeason(root.dataset.season, { initial: true });
  observeReveals();
  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  let resizeRaf = 0;
  addEventListener('resize', () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => renderMarquee(C.seasons[root.dataset.season]));
  }, { passive: true });
  document.fonts?.ready.then(() => renderMarquee(C.seasons[root.dataset.season]));
})();
