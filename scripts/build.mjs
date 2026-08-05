import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'dist');
const SITE = 'https://alebocci.github.io';
const ASSET_VERSION = (process.env.GITHUB_SHA || 'development').slice(0, 12);

const readJson = async (file) => JSON.parse(await fs.readFile(path.join(root, file), 'utf8'));
const [it, en, publications] = await Promise.all([
  readJson('content.json'),
  readJson('content.en.json'),
  readJson('publications.json')
]);

const ui = {
  it: {
    code: 'it', locale: 'it_IT', name: 'Italiano', otherCode: 'en', otherLabel: 'EN',
    otherAria: 'Passa alla versione inglese',
    skip: 'Vai al contenuto', homeAria: 'Vai alla home', navAria: 'Navigazione principale',
    openMenu: 'Apri menu', closeMenu: 'Chiudi menu',
    themeDark: 'Passa al tema scuro', themeLight: 'Passa al tema chiaro',
    nav: { profile: 'Profilo', research: 'Ricerca', publications: 'Pubblicazioni', teaching: 'Didattica', engagement: 'Terza missione', contacts: 'Contatti' },
    ids: { profile: 'profilo', research: 'ricerca', publications: 'pubblicazioni', engagement: 'terza-missione', contacts: 'contatti' },
    profileIndex: '01 · Profilo', researchIndex: '02 · Ricerca', publicationsIndex: '03 · Pubblicazioni', engagementIndex: '04 · Terza missione',
    researchHeading: 'Infrastrutture eterogenee, requisiti osservabili, software riproducibile',
    projectsIndex: 'Progetti e software', projectsHeading: 'Dal metodo all’artefatto aperto', githubProfile: 'Profilo GitHub',
    engagementHeading: 'Informatica e quantum computing fuori dall’aula',
    updated: 'Aggiornato:', portraitAlt: 'Ritratto di Alessandro Bocci', socialAlt: 'Alessandro Bocci, ricercatore e docente in Informatica presso l’Università di Pisa',
    searchLabel: 'Cerca tra le pubblicazioni', searchPlaceholder: 'Cerca per titolo, autore, sede o anno', filterAria: 'Filtra per tipo',
    all: 'Tutte', journals: 'Riviste', conferences: 'Conferenze', kind: { Journal: 'Rivista', Conference: 'Conferenza' },
    publicationCount: (n) => `${n} ${n === 1 ? 'pubblicazione visibile' : 'pubblicazioni visibili'}`,
    noResults: 'Nessuna pubblicazione corrisponde ai filtri selezionati.', open: 'Apri',
    contactHeading: 'Parliamo di ricerca, tesi o divulgazione.',
    teachingEyebrow: 'Didattica universitaria', coursesIndex: 'Corsi', yearByYear: 'Anno per anno', academicYear: 'Anno accademico',
    supervisionIndex: 'Supervisione', supervisionHeading: 'Tesi magistrali e triennali', fullList: 'Elenco completo',
    teachingContactHeading: 'Per ricevimento, tesi e proposte didattiche.', teachingContactText: 'Scrivimi per concordare un incontro o discutere un possibile argomento di tesi.',
    thesesBack: '← Torna a Didattica', thesesHeading: 'Tesi supervisionate',
    universityProfile: 'Pagina di Ateneo',
    noScript: 'Il contenuto resta disponibile; ricerca, filtri, tema e menu mobile richiedono JavaScript.',
    pages: {
      home: { title: 'Alessandro Bocci · Ricerca, didattica e terza missione', description: 'Sito accademico personale di Alessandro Bocci: ricerca, didattica e terza missione.' },
      teaching: { title: 'Didattica · Alessandro Bocci', description: 'Attività didattica di Alessandro Bocci: corsi universitari, laboratori e tesi supervisionate.' },
      theses: { title: 'Tesi supervisionate · Alessandro Bocci', description: 'Elenco delle tesi magistrali e triennali supervisionate da Alessandro Bocci.' }
    }
  },
  en: {
    code: 'en', locale: 'en_GB', name: 'English', otherCode: 'it', otherLabel: 'IT',
    otherAria: 'Switch to the Italian version',
    skip: 'Skip to content', homeAria: 'Go to the home page', navAria: 'Primary navigation',
    openMenu: 'Open menu', closeMenu: 'Close menu',
    themeDark: 'Switch to dark theme', themeLight: 'Switch to light theme',
    nav: { profile: 'Profile', research: 'Research', publications: 'Publications', teaching: 'Teaching', engagement: 'Public engagement', contacts: 'Contact' },
    ids: { profile: 'profile', research: 'research', publications: 'publications', engagement: 'public-engagement', contacts: 'contact' },
    profileIndex: '01 · Profile', researchIndex: '02 · Research', publicationsIndex: '03 · Publications', engagementIndex: '04 · Public engagement',
    researchHeading: 'Heterogeneous infrastructures, observable requirements, reproducible software',
    projectsIndex: 'Projects and software', projectsHeading: 'From methods to open artefacts', githubProfile: 'GitHub profile',
    engagementHeading: 'Computer science and quantum computing beyond the classroom',
    updated: 'Updated:', portraitAlt: 'Portrait of Alessandro Bocci', socialAlt: 'Alessandro Bocci, researcher and lecturer in Computer Science at the University of Pisa',
    searchLabel: 'Search publications', searchPlaceholder: 'Search by title, author, venue, or year', filterAria: 'Filter by type',
    all: 'All', journals: 'Journals', conferences: 'Conferences', kind: { Journal: 'Journal', Conference: 'Conference' },
    publicationCount: (n) => `${n} visible ${n === 1 ? 'publication' : 'publications'}`,
    noResults: 'No publications match the selected filters.', open: 'Open',
    contactHeading: 'Let’s discuss research, thesis projects, or public engagement.',
    teachingEyebrow: 'University teaching', coursesIndex: 'Courses', yearByYear: 'Year by year', academicYear: 'Academic year',
    supervisionIndex: 'Supervision', supervisionHeading: 'Master’s and bachelor’s theses', fullList: 'Complete list',
    teachingContactHeading: 'For office hours, theses, and teaching proposals.', teachingContactText: 'Email me to arrange a meeting or discuss a possible thesis topic.',
    thesesBack: '← Back to Teaching', thesesHeading: 'Supervised theses',
    universityProfile: 'University profile',
    noScript: 'The content remains available; search, filters, theme, and the mobile menu require JavaScript.',
    pages: {
      home: { title: 'Alessandro Bocci · Research, teaching, and public engagement', description: 'Alessandro Bocci’s academic website: research, teaching, and public engagement.' },
      teaching: { title: 'Teaching · Alessandro Bocci', description: 'Alessandro Bocci’s teaching activities: university courses, laboratories, and supervised theses.' },
      theses: { title: 'Supervised theses · Alessandro Bocci', description: 'Master’s and bachelor’s theses supervised by Alessandro Bocci.' }
    }
  }
};

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const attr = esc;
const normalizeSearch = (value, locale = 'en') => String(value ?? '')
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLocaleLowerCase(locale);
const isExternal = (url = '') => /^https?:\/\//i.test(url);
const linkAttrs = (url = '') => isExternal(url) ? ' target="_blank" rel="noreferrer"' : '';
const visiblePublications = publications.items.filter((item) => item.visible !== false);
const thesisCount = it.teaching.theses.groups.reduce((sum, group) => sum + group.items.length, 0);

const routes = {
  it: { home: '/', teaching: '/didattica.html', theses: '/tesi.html' },
  en: { home: '/en/', teaching: '/en/didattica.html', theses: '/en/tesi.html' }
};
const pageRoute = (lang, page) => routes[lang][page];
const canonical = (lang, page) => `${SITE}${pageRoute(lang, page)}`;
const counterpart = (lang, page) => pageRoute(lang === 'it' ? 'en' : 'it', page);
const homeAnchor = (lang, key) => `${routes[lang].home}#${ui[lang].ids[key]}`;

function metaHead(lang, page, data) {
  const u = ui[lang];
  const p = u.pages[page];
  const url = canonical(lang, page);
  const otherLang = lang === 'it' ? 'en' : 'it';
  const profileImage = `${SITE}/assets/alessandro-bocci.webp`;
  const socialImage = `${SITE}/assets/og-card-${lang}.webp`;
  const profileJson = page === 'home' ? `\n<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#profile-page`,
    url,
    name: p.title,
    description: p.description,
    inLanguage: lang,
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE}/#alessandro-bocci`,
      name: data.site.name,
      jobTitle: data.site.role,
      affiliation: { '@type': 'Organization', name: lang === 'it' ? 'Università di Pisa' : 'University of Pisa', url: 'https://www.unipi.it/' },
      image: profileImage,
      email: `mailto:${data.site.email}`,
      url: SITE,
      sameAs: data.site.links.filter((l) => /^https?:\/\//.test(l.url)).map((l) => l.url),
      knowsAbout: data.research.areas.map((area) => area.title)
    }
  })}</script>` : '';
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#f5f6f2">
<meta name="color-scheme" content="light dark">
<meta name="description" content="${attr(p.description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="it" href="${canonical('it', page)}">
<link rel="alternate" hreflang="en" href="${canonical('en', page)}">
<link rel="alternate" hreflang="x-default" href="${canonical('it', page)}">
<meta property="og:type" content="${page === 'home' ? 'profile' : 'website'}">
<meta property="og:locale" content="${u.locale}">
<meta property="og:locale:alternate" content="${ui[otherLang].locale}">
<meta property="og:title" content="${attr(p.title)}">
<meta property="og:description" content="${attr(p.description)}">
<meta property="og:image" content="${socialImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/webp">
<meta property="og:image:alt" content="${attr(u.socialAlt)}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Alessandro Bocci">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(p.title)}">
<meta name="twitter:description" content="${attr(p.description)}">
<meta name="twitter:image" content="${socialImage}">
<meta name="twitter:image:alt" content="${attr(u.socialAlt)}">
<link rel="icon" href="/assets/favicon.ico?v=${ASSET_VERSION}" sizes="any">
<link rel="icon" href="/assets/favicon.png?v=${ASSET_VERSION}" type="image/png">
<link rel="apple-touch-icon" href="/assets/favicon-192.png?v=${ASSET_VERSION}">
<link rel="stylesheet" href="/assets/style.css?v=${ASSET_VERSION}">
<script>(()=>{try{const s=localStorage.getItem('theme');const t=s==='dark'||s==='light'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;const m=document.querySelector('meta[name=\"theme-color\"]');if(m)m.content=t==='dark'?'#0c0f14':'#f5f6f2'}catch{}})()</script>
<script defer src="/assets/app.js?v=${ASSET_VERSION}"></script>${profileJson}
<title>${esc(p.title)}</title>`;
}

function nav(lang, active, page) {
  const u = ui[lang];
  const links = [
    ['profile', u.nav.profile, homeAnchor(lang, 'profile')],
    ['research', u.nav.research, homeAnchor(lang, 'research')],
    ['publications', u.nav.publications, homeAnchor(lang, 'publications')],
    ['teaching', u.nav.teaching, routes[lang].teaching],
    ['engagement', u.nav.engagement, homeAnchor(lang, 'engagement')],
    ['contacts', u.nav.contacts, homeAnchor(lang, 'contacts')]
  ];
  return `<nav class="primary-nav" id="primary-nav" aria-label="${attr(u.navAria)}">
${links.map(([key, label, url]) => {
  const current = active === key;
  const currentValue = page === 'theses' ? 'location' : 'page';
  return `<a href="${url}" data-nav="${key}"${current ? ` class="is-active" aria-current="${currentValue}"` : ''}>${esc(label)}</a>`;
}).join('\n')}
</nav>`;
}

function header(lang, page, active, showLogo = false) {
  const u = ui[lang];
  const logo = showLogo ? '<span class="brand-mark brand-mark-subtle"><img src="/assets/logo.png?v=' + ASSET_VERSION + '" alt="" aria-hidden="true"></span>' : '';
  return `<header class="site-header" id="top">
<div class="shell header-inner">
<a class="brand" href="${routes[lang].home}" aria-label="${attr(u.homeAria)}">${logo}<span class="brand-name">Alessandro Bocci</span></a>
<button class="nav-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="${attr(u.openMenu)}" data-open-label="${attr(u.openMenu)}" data-close-label="${attr(u.closeMenu)}">
<span></span><span></span><span></span><span class="sr-only nav-toggle-label">${esc(u.openMenu)}</span>
</button>
${nav(lang, active, page)}
<div class="header-controls">
<a class="language-toggle" href="${counterpart(lang, page)}" hreflang="${u.otherCode}" lang="${u.otherCode}" aria-label="${attr(u.otherAria)}" title="${attr(u.otherAria)}">${u.otherLabel}</a>
<button class="theme-toggle" type="button" aria-pressed="false" aria-label="${attr(u.themeDark)}" title="${attr(u.themeDark)}" data-dark-label="${attr(u.themeDark)}" data-light-label="${attr(u.themeLight)}"><span aria-hidden="true">◐</span><span class="sr-only theme-toggle-label">${esc(u.themeDark)}</span></button>
</div>
</div>
</header>`;
}

function footer(lang) {
  const u = ui[lang];
  return `<footer class="site-footer"><div class="shell footer-inner footer-simple">
<p>© <span id="current-year">2026</span> · Alessandro Bocci</p>
<div class="footer-links"><a href="mailto:alessandro.bocci@unipi.it">Email</a><a href="https://orcid.org/0000-0002-7000-2103" target="_blank" rel="noreferrer">ORCID</a><a href="https://github.com/alebocci" target="_blank" rel="noreferrer">GitHub</a><a href="https://di.unipi.it/persone/#a044855" target="_blank" rel="noreferrer">${esc(u.universityProfile)}</a></div>
</div></footer>`;
}

function buttons(links) {
  return links.map((l) => `<a class="button${l.url.startsWith('mailto:') ? ' button-primary' : ''}" href="${attr(l.url)}"${linkAttrs(l.url)}>${esc(l.label)} <span aria-hidden="true">${l.url.startsWith('mailto:') ? '→' : '↗'}</span></a>`).join('');
}

function publicationHtml(lang) {
  const u = ui[lang];
  return visiblePublications.map((item) => {
    const searchable = normalizeSearch(`${item.year} ${item.kind} ${item.title} ${item.authors} ${item.venue}`, lang);
    return `<article class="publication-item reveal" data-publication data-kind="${attr(item.kind)}" data-search="${attr(searchable)}">
<span class="publication-year">${esc(item.year)}</span>
<div><h3>${esc(item.title)}</h3><p class="publication-authors">${esc(item.authors)}</p><p class="publication-meta">${esc(u.kind[item.kind] ?? item.kind)} · ${esc(item.venue)}</p></div>
<a class="publication-link" href="${attr(item.url)}" target="_blank" rel="noreferrer" aria-label="${attr(`${u.open}: ${item.title}`)}">↗</a>
</article>`;
  }).join('\n');
}

function layout({ lang, page, active, data, body, showLogo = false }) {
  const u = ui[lang];
  return `<!doctype html>
<html lang="${lang}">
<head>
${metaHead(lang, page, data)}
</head>
<body data-page="${page}" data-language="${lang}">
<a class="skip-link" href="#main">${esc(u.skip)}</a>
<div class="page-glow page-glow-a" aria-hidden="true"></div><div class="page-glow page-glow-b" aria-hidden="true"></div>
${header(lang, page, active, showLogo)}
${body}
${footer(lang)}
<noscript><div class="noscript">${esc(u.noScript)}</div></noscript>
</body>
</html>\n`;
}

function homePage(lang, data) {
  const u = ui[lang];
  const heroLinks = data.site.links.filter((l) => /mailto:|orcid\.org|scholar\.google|github\.com/i.test(l.url));
  const contactLinks = data.site.links.filter((l) => /mailto:|orcid\.org|github\.com|di\.unipi\.it/i.test(l.url));
  const body = `<main id="main">
<section class="hero shell" aria-labelledby="hero-title">
<div class="hero-copy reveal"><p class="eyebrow">${esc(data.site.eyebrow)}</p><h1 id="hero-title">${esc(data.site.name)}</h1><p class="hero-role">${esc(data.site.role)}</p><p class="hero-affiliation">${esc(data.site.affiliation)}</p><p class="hero-intro">${esc(data.site.intro)}</p><div class="hero-actions">${buttons(heroLinks)}</div><p class="availability"><span aria-hidden="true"></span><span>${esc(data.site.availability)}</span></p></div>
<aside class="hero-visual reveal"><div class="monogram-card profile-card"><img class="profile-photo" src="/assets/alessandro-bocci.webp?v=${ASSET_VERSION}" alt="${attr(u.portraitAlt)}" width="820" height="1024"><div class="hero-meta"><span>${esc(data.site.location)}</span><span>${esc(u.updated)} <strong>${esc(data.site.lastUpdated)}</strong></span></div></div></aside>
</section>
<section class="section section-soft" id="${u.ids.profile}"><div class="shell split-layout"><div class="section-heading reveal"><p class="section-index">${esc(u.profileIndex)}</p><h2>${esc(data.about.title)}</h2></div><div class="about-copy reveal"><div>${data.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}</div><div class="timeline">${data.about.positions.map((i) => `<div class="timeline-item"><time>${esc(i.period)}</time><div><strong>${esc(i.role)}</strong><span>${esc(i.place)}</span></div></div>`).join('')}</div></div></div></section>
<section class="section" id="${u.ids.research}"><div class="shell"><div class="section-heading section-heading-wide reveal"><p class="section-index">${esc(u.researchIndex)}</p><h2>${esc(u.researchHeading)}</h2><p>${esc(data.research.intro)}</p></div><div class="research-grid">${data.research.areas.map((a) => `<article class="research-card reveal"><span class="card-number">${esc(a.number)}</span><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p><ul class="tag-list">${a.tags.map((tag) => `<li class="tag">${esc(tag)}</li>`).join('')}</ul></article>`).join('')}</div><div class="subheading-row reveal"><div><p class="section-index">${esc(u.projectsIndex)}</p><h3>${esc(u.projectsHeading)}</h3></div><a class="text-link" href="https://github.com/alebocci" target="_blank" rel="noreferrer">${esc(u.githubProfile)} <span aria-hidden="true">↗</span></a></div><div class="project-grid">${data.research.projects.map((p) => `<article class="project-card reveal"><span class="project-type">${esc(p.type)}</span><h4>${esc(p.title)}</h4><p>${esc(p.description)}</p><a href="${attr(p.url)}"${linkAttrs(p.url)}>${esc(p.cta || 'Repository')} <span aria-hidden="true">↗</span></a></article>`).join('')}</div></div></section>
<section class="section section-ink" id="${u.ids.publications}"><div class="shell"><div class="section-heading section-heading-wide reveal"><p class="section-index">${esc(u.publicationsIndex)}</p><h2>${esc(u.nav.publications)}</h2><p>${esc(data.publications.intro)}</p></div><div class="publication-toolbar reveal"><label class="search-field"><span class="sr-only">${esc(u.searchLabel)}</span><span aria-hidden="true">⌕</span><input id="publication-search" type="search" placeholder="${attr(u.searchPlaceholder)}" autocomplete="off" aria-controls="publications-list"></label><div class="filter-pills" role="group" aria-label="${attr(u.filterAria)}"><button class="filter-pill is-active" type="button" data-filter="all" aria-pressed="true" aria-controls="publications-list">${esc(u.all)}</button><button class="filter-pill" type="button" data-filter="Journal" aria-pressed="false" aria-controls="publications-list">${esc(u.journals)}</button><button class="filter-pill" type="button" data-filter="Conference" aria-pressed="false" aria-controls="publications-list">${esc(u.conferences)}</button></div></div><p class="publication-count" id="publication-count" role="status" aria-live="polite" data-count-singular="${lang === 'it' ? 'pubblicazione visibile' : 'visible publication'}" data-count-plural="${lang === 'it' ? 'pubblicazioni visibili' : 'visible publications'}">${esc(u.publicationCount(visiblePublications.length))}</p><div class="publication-list" id="publications-list">${publicationHtml(lang)}</div><p class="no-results" id="publication-no-results" hidden>${esc(u.noResults)}</p></div></section>
<section class="section section-soft" id="${u.ids.engagement}"><div class="shell"><div class="section-heading section-heading-wide reveal"><p class="section-index">${esc(u.engagementIndex)}</p><h2>${esc(u.engagementHeading)}</h2><p>${esc(data.engagement.intro)}</p></div><div class="engagement-list">${data.engagement.items.map((item, index) => `<article class="engagement-item engagement-card reveal"><div class="engagement-topline"><span class="engagement-number">0${index + 1}</span><span class="engagement-period">${esc(item.period)}</span></div><h3>${esc(item.title)}</h3><p class="engagement-role">${esc(item.role)}</p><p class="engagement-description">${esc(item.description)}</p><a class="engagement-link" href="${attr(item.url)}"${linkAttrs(item.url)}>${esc(item.cta)} <span aria-hidden="true">↗</span></a></article>`).join('')}</div></div></section>
<section class="contact-section" id="${u.ids.contacts}"><div class="shell contact-card reveal"><div><p class="section-index">${esc(u.nav.contacts)}</p><h2>${esc(u.contactHeading)}</h2><p>${esc(data.site.availability)}</p></div><div class="contact-actions">${buttons(contactLinks)}</div></div></section>
</main>`;
  return layout({ lang, page: 'home', active: '', data, body, showLogo: true });
}

function teachingPage(lang, data) {
  const u = ui[lang];
  const body = `<main id="main">
<section class="page-hero shell page-hero-compact"><div class="page-hero-copy reveal"><p class="eyebrow">${esc(u.teachingEyebrow)}</p><h1>${esc(u.nav.teaching)}</h1><p>${esc(data.teaching.intro)}</p></div></section>
<section class="section section-soft teaching-page-section"><div class="shell"><div class="section-heading section-heading-wide reveal"><p class="section-index">${esc(u.coursesIndex)}</p><h2>${esc(u.yearByYear)}</h2></div><div class="teaching-years">${data.teaching.years.map((group, index) => `<section class="teaching-year reveal"><div class="teaching-year-heading"><span>${String(index + 1).padStart(2, '0')}</span><div><p class="section-index">${esc(u.academicYear)}</p><h2>${esc(group.year)}</h2></div></div><div class="year-course-list">${group.courses.map((course) => `<article class="year-course-item"><div><h3>${esc(course.title)}</h3><p class="course-role">${esc(course.role)}</p><p class="course-description">${esc(course.description)}</p></div><a class="course-link" href="${attr(course.url)}"${linkAttrs(course.url)}>${esc(course.urlLabel)} <span aria-hidden="true">↗</span></a></article>`).join('')}</div></section>`).join('')}</div></div></section>
<section class="section"><div class="shell supervision-banner reveal"><div><p class="section-index">${esc(u.supervisionIndex)}</p><h2>${esc(u.supervisionHeading)}</h2><p>${esc(data.teaching.supervision.description)}</p></div><div class="supervision-banner-side"><strong>${thesisCount}</strong><span>${esc(data.teaching.supervision.label)}</span><a class="button button-primary" href="${routes[lang].theses}">${esc(u.fullList)} <span aria-hidden="true">→</span></a></div></div></section>
<section class="contact-section"><div class="shell contact-card reveal"><div><p class="section-index">${esc(u.nav.contacts)}</p><h2>${esc(u.teachingContactHeading)}</h2><p>${esc(u.teachingContactText)}</p></div><div class="contact-actions"><a class="button button-primary" href="mailto:alessandro.bocci@unipi.it">Email <span aria-hidden="true">→</span></a><a class="button" href="https://di.unipi.it/persone/#a044855" target="_blank" rel="noreferrer">${esc(u.universityProfile)} <span aria-hidden="true">↗</span></a></div></div></section>
</main>`;
  return layout({ lang, page: 'teaching', active: 'teaching', data, body });
}

function thesesPage(lang, data) {
  const u = ui[lang];
  const body = `<main id="main">
<section class="page-hero shell page-hero-compact"><div class="page-hero-copy reveal"><a class="back-link" href="${routes[lang].teaching}">${esc(u.thesesBack)}</a><p class="eyebrow">${esc(u.supervisionIndex)}</p><h1>${esc(u.thesesHeading)}</h1><p>${esc(data.teaching.theses.intro)}</p></div></section>
<section class="section section-soft"><div class="shell thesis-groups">${data.teaching.theses.groups.map((group, index) => `<section class="thesis-group reveal"><div class="thesis-group-heading"><span>${String(index + 1).padStart(2, '0')}</span><h2>${esc(group.title)}</h2></div><div class="thesis-list">${group.items.map((item) => `<article class="thesis-item"><div class="thesis-meta"><span>${esc(item.date)}</span><span>${esc(item.degree)}</span></div><h3>${esc(item.title)}</h3><p class="thesis-student">${esc(item.student)}</p><p>${esc(item.description)}</p></article>`).join('')}</div></section>`).join('')}</div></section>
</main>`;
  return layout({ lang, page: 'theses', active: 'teaching', data, body });
}

function notFoundPage() {
  return `<!doctype html>
<html lang="it"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f5f6f2"><meta name="color-scheme" content="light dark">
<meta name="robots" content="noindex"><meta name="description" content="La pagina richiesta non è disponibile.">
<link rel="icon" href="/assets/favicon.ico?v=${ASSET_VERSION}" sizes="any"><link rel="icon" href="/assets/favicon.png?v=${ASSET_VERSION}" type="image/png"><link rel="apple-touch-icon" href="/assets/favicon-192.png?v=${ASSET_VERSION}"><link rel="stylesheet" href="/assets/style.css?v=${ASSET_VERSION}">
<script>(()=>{try{const s=localStorage.getItem('theme');const t=s==='dark'||s==='light'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;const m=document.querySelector('meta[name=\"theme-color\"]');if(m)m.content=t==='dark'?'#0c0f14':'#f5f6f2'}catch{}})()</script><script defer src="/assets/404.js?v=${ASSET_VERSION}"></script>
<title>Pagina non trovata · Alessandro Bocci</title></head>
<body data-page="404"><a class="skip-link" href="#main" data-404-it="Vai al contenuto" data-404-en="Skip to content">Vai al contenuto</a>
<header class="site-header"><div class="shell header-inner"><a class="brand" href="/" aria-label="Vai alla home" data-404-aria-it="Vai alla home" data-404-aria-en="Go to the home page"><span class="brand-name">Alessandro Bocci</span></a><div class="header-controls header-controls-minimal"><button class="language-toggle" type="button" aria-label="Passa all’inglese" title="Passa all’inglese" data-404-language>EN</button><button class="theme-toggle" type="button" aria-pressed="false" aria-label="Passa al tema scuro" title="Passa al tema scuro" data-dark-label-it="Passa al tema scuro" data-light-label-it="Passa al tema chiaro" data-dark-label-en="Switch to dark theme" data-light-label-en="Switch to light theme"><span aria-hidden="true">◐</span><span class="sr-only theme-toggle-label">Passa al tema scuro</span></button></div></div></header>
<main class="shell error-page" id="main"><p class="eyebrow">404</p><h1 data-404-it="Pagina non trovata" data-404-en="Page not found">Pagina non trovata</h1><p data-404-it="La pagina richiesta non esiste o è stata spostata." data-404-en="The requested page does not exist or has been moved.">La pagina richiesta non esiste o è stata spostata.</p><a class="button button-primary" href="/" data-404-it="Torna alla home" data-404-en="Back to the home page">Torna alla home</a></main>
<footer class="site-footer"><div class="shell footer-inner footer-simple"><p>© <span id="current-year">2026</span> · Alessandro Bocci</p><div class="footer-links"><a href="mailto:alessandro.bocci@unipi.it">Email</a><a href="https://orcid.org/0000-0002-7000-2103" target="_blank" rel="noreferrer">ORCID</a><a href="https://github.com/alebocci" target="_blank" rel="noreferrer">GitHub</a></div></div></footer></body></html>\n`;
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const source = path.join(src, entry.name);
    const target = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(source, target);
    else await fs.copyFile(source, target);
  }
}

async function write(file, content) {
  const target = path.join(outDir, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content, 'utf8');
}

await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });
await copyDir(path.join(root, 'assets'), path.join(outDir, 'assets'));
await Promise.all([
  write('index.html', homePage('it', it)),
  write('didattica.html', teachingPage('it', it)),
  write('tesi.html', thesesPage('it', it)),
  write('en/index.html', homePage('en', en)),
  write('en/didattica.html', teachingPage('en', en)),
  write('en/tesi.html', thesesPage('en', en)),
  write('404.html', notFoundPage()),
  write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`),
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${['home','teaching','theses'].flatMap((page) => ['it','en'].map((lang) => `  <url><loc>${canonical(lang, page)}</loc><xhtml:link rel="alternate" hreflang="it" href="${canonical('it', page)}"/><xhtml:link rel="alternate" hreflang="en" href="${canonical('en', page)}"/></url>`)).join('\n')}\n</urlset>\n`),
  write('.nojekyll', '')
]);
console.log(`Built ${visiblePublications.length} publications and ${thesisCount} theses into ${outDir}`);
