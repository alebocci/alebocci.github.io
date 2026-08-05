(() => {
  const root = document.documentElement;
  const languageButton = document.querySelector('[data-404-language]');
  const themeButton = document.querySelector('.theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const themeColours = { light: '#f5f6f2', dark: '#0c0f14' };
  let language = 'it';

  try {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'it') language = saved;
  } catch {}

  const savedTheme = () => {
    try {
      const value = localStorage.getItem('theme');
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  };

  const updateThemeState = (theme = root.dataset.theme === 'dark' ? 'dark' : 'light') => {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    if (themeMeta) themeMeta.content = themeColours[dark ? 'dark' : 'light'];
    if (!themeButton) return;
    const suffix = language === 'en' ? 'En' : 'It';
    const label = dark ? themeButton.dataset[`lightLabel${suffix}`] : themeButton.dataset[`darkLabel${suffix}`];
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
    const hidden = themeButton.querySelector('.theme-toggle-label');
    if (hidden) hidden.textContent = label;
  };

  const applyLanguage = () => {
    root.lang = language;
    document.querySelectorAll('[data-404-it][data-404-en]').forEach((element) => {
      element.textContent = language === 'en' ? element.getAttribute('data-404-en') : element.getAttribute('data-404-it');
    });
    document.querySelectorAll('[data-404-aria-it][data-404-aria-en]').forEach((element) => {
      element.setAttribute('aria-label', language === 'en' ? element.getAttribute('data-404-aria-en') : element.getAttribute('data-404-aria-it'));
    });
    const english = language === 'en';
    document.title = english ? 'Page not found · Alessandro Bocci' : 'Pagina non trovata · Alessandro Bocci';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = english ? 'The requested page is unavailable.' : 'La pagina richiesta non è disponibile.';
    if (languageButton) {
      const label = english ? 'Passa all’italiano' : 'Switch to English';
      languageButton.textContent = english ? 'IT' : 'EN';
      languageButton.setAttribute('aria-label', label);
      languageButton.title = label;
    }
    updateThemeState();
  };

  languageButton?.addEventListener('click', () => {
    language = language === 'it' ? 'en' : 'it';
    try { localStorage.setItem('language', language); } catch {}
    applyLanguage();
  });

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch {}
    updateThemeState(next);
  });

  systemTheme.addEventListener?.('change', (event) => {
    if (!savedTheme()) updateThemeState(event.matches ? 'dark' : 'light');
  });

  const initialTheme = savedTheme() || (systemTheme.matches ? 'dark' : 'light');
  updateThemeState(initialTheme);

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
  applyLanguage();
})();
