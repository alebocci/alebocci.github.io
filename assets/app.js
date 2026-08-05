(() => {
  const root = document.documentElement;
  const body = document.body;
  const language = body.dataset.language === 'en' ? 'en' : 'it';

  const setThemeState = (theme) => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const dark = theme === 'dark';
    const label = dark ? button.dataset.lightLabel : button.dataset.darkLabel;
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', label);
    button.title = label;
    const hiddenLabel = button.querySelector('.theme-toggle-label');
    if (hiddenLabel) hiddenLabel.textContent = label;
  };

  const initialiseTheme = () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
    setThemeState(current);
    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch {}
      setThemeState(next);
    });
  };

  const initialiseMenu = () => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.primary-nav');
    if (!toggle || !nav) return;

    const label = toggle.querySelector('.nav-toggle-label');
    const setOpen = (open, returnFocus = false) => {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      body.classList.toggle('menu-open', open);
      const text = open ? toggle.dataset.closeLabel : toggle.dataset.openLabel;
      toggle.setAttribute('aria-label', text);
      if (label) label.textContent = text;
      if (!open && returnFocus) toggle.focus();
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false, true);
      }
    });
  };

  const initialiseLanguagePreference = () => {
    const link = document.querySelector('.language-toggle[href]');
    if (!link) return;
    link.addEventListener('click', () => {
      try { localStorage.setItem('language', link.lang === 'en' ? 'en' : 'it'); } catch {}
    });
  };

  const initialisePublications = () => {
    const search = document.getElementById('publication-search');
    const items = [...document.querySelectorAll('[data-publication]')];
    const buttons = [...document.querySelectorAll('.filter-pill')];
    const count = document.getElementById('publication-count');
    const noResults = document.getElementById('publication-no-results');
    if (!items.length || !count) return;

    let filter = 'all';
    let query = '';

    const update = () => {
      let visible = 0;
      for (const item of items) {
        const kindMatches = filter === 'all' || item.dataset.kind === filter;
        const queryMatches = !query || (item.dataset.search || '').includes(query);
        const show = kindMatches && queryMatches;
        item.hidden = !show;
        if (show) visible += 1;
      }
      const label = visible === 1 ? count.dataset.countSingular : count.dataset.countPlural;
      count.textContent = `${visible} ${label}`;
      if (noResults) noResults.hidden = visible !== 0;
    };

    search?.addEventListener('input', (event) => {
      query = event.currentTarget.value.trim().toLocaleLowerCase(language);
      update();
    });

    buttons.forEach((button) => button.addEventListener('click', () => {
      filter = button.dataset.filter || 'all';
      buttons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle('is-active', active);
        candidate.setAttribute('aria-pressed', String(active));
      });
      update();
    }));
  };

  const initialiseReveal = () => {
    const elements = [...document.querySelectorAll('.reveal')];
    if (!elements.length) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    elements.forEach((element) => element.classList.add('reveal-ready'));
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
  };

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 10);
  updateHeader();
  document.addEventListener('scroll', updateHeader, { passive: true });

  initialiseTheme();
  initialiseMenu();
  initialiseLanguagePreference();
  initialisePublications();
  initialiseReveal();
})();
