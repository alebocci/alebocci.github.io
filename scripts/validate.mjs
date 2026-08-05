import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const mode = process.argv[2] || '--all';
const errors = [];
const warnings = [];

const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);
const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(path.join(root, file), 'utf8'));
  } catch (error) {
    fail(`${file}: JSON non valido (${error.message})`);
    return null;
  }
}

function requireString(value, label, { nonEmpty = true } = {}) {
  if (typeof value !== 'string' || (nonEmpty && !value.trim())) fail(`${label}: stringa obbligatoria mancante`);
}

function requireUrl(value, label, { allowMailto = true } = {}) {
  requireString(value, label);
  if (typeof value !== 'string') return;
  if (allowMailto && value.startsWith('mailto:')) return;
  if (value.startsWith('/') || /^(?:\.\.?\/)?[^\s:]+(?:\.html)?(?:#.*)?$/.test(value)) return;
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol)) fail(`${label}: protocollo URL non ammesso`);
  } catch {
    fail(`${label}: URL non valido (${value})`);
  }
}

function compareShape(a, b, label = 'content') {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      fail(`${label}: tipo diverso tra italiano e inglese`);
      return;
    }
    if (a.length !== b.length) fail(`${label}: numero di elementi diverso (${a.length} vs ${b.length})`);
    const length = Math.min(a.length, b.length);
    for (let index = 0; index < length; index += 1) compareShape(a[index], b[index], `${label}[${index}]`);
    return;
  }
  if (isObject(a) || isObject(b)) {
    if (!isObject(a) || !isObject(b)) {
      fail(`${label}: tipo diverso tra italiano e inglese`);
      return;
    }
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    if (aKeys.join('|') !== bKeys.join('|')) fail(`${label}: chiavi diverse (${aKeys.join(', ')}) / (${bKeys.join(', ')})`);
    for (const key of aKeys.filter((key) => key in b)) compareShape(a[key], b[key], `${label}.${key}`);
    return;
  }
  if (typeof a !== typeof b) fail(`${label}: tipo diverso (${typeof a} vs ${typeof b})`);
}

function walkUrls(value, label = 'content') {
  if (Array.isArray(value)) return value.forEach((item, index) => walkUrls(item, `${label}[${index}]`));
  if (!isObject(value)) return;
  for (const [key, item] of Object.entries(value)) {
    const itemLabel = `${label}.${key}`;
    if (key === 'url') requireUrl(item, itemLabel);
    else walkUrls(item, itemLabel);
  }
}

async function validateSource() {
  const [it, en, publications] = await Promise.all([
    readJson('content.json'),
    readJson('content.en.json'),
    readJson('publications.json')
  ]);
  if (!it || !en || !publications) return;

  compareShape(it, en);
  for (const [language, content] of [['it', it], ['en', en]]) {
    for (const section of ['site', 'about', 'research', 'publications', 'teaching', 'engagement']) {
      if (!isObject(content[section])) fail(`content.${language}.${section}: sezione obbligatoria mancante`);
    }
    requireString(content.site?.name, `content.${language}.site.name`);
    requireString(content.site?.role, `content.${language}.site.role`);
    requireString(content.site?.email, `content.${language}.site.email`);
    if (!Array.isArray(content.site?.links) || !content.site.links.length) fail(`content.${language}.site.links: almeno un collegamento richiesto`);
    if (!Array.isArray(content.research?.areas) || !content.research.areas.length) fail(`content.${language}.research.areas: almeno un'area richiesta`);
    if (!Array.isArray(content.teaching?.years)) fail(`content.${language}.teaching.years: array richiesto`);
    if (!Array.isArray(content.teaching?.theses?.groups)) fail(`content.${language}.teaching.theses.groups: array richiesto`);
    walkUrls(content, `content.${language}`);
  }

  if (!Array.isArray(publications.items)) {
    fail('publications.items: array richiesto');
    return;
  }
  const ids = new Set();
  const allowedKinds = new Set(['Journal', 'Conference']);
  publications.items.forEach((item, index) => {
    const label = `publications.items[${index}]`;
    if (!isObject(item)) return fail(`${label}: oggetto richiesto`);
    for (const field of ['id', 'title', 'authors', 'venue', 'kind', 'url']) requireString(item[field], `${label}.${field}`);
    if (ids.has(item.id)) fail(`${label}.id: ID duplicato (${item.id})`);
    ids.add(item.id);
    if (!allowedKinds.has(item.kind)) fail(`${label}.kind: valore non ammesso (${item.kind})`);
    if (!(Number.isInteger(item.year) || /^\d{4}$/.test(String(item.year)))) fail(`${label}.year: anno non valido (${item.year})`);
    if (typeof item.visible !== 'boolean') fail(`${label}.visible: valore booleano richiesto`);
    requireUrl(item.url, `${label}.url`, { allowMailto: false });
    if (String(item.url).includes('doi.org') && !/^https:\/\/doi\.org\/10\.\d{4,9}\/.+/i.test(item.url)) {
      fail(`${label}.url: DOI non valido (${item.url})`);
    }
  });

  const thesisCountIt = it.teaching.theses.groups.reduce((sum, group) => sum + (Array.isArray(group.items) ? group.items.length : 0), 0);
  const thesisCountEn = en.teaching.theses.groups.reduce((sum, group) => sum + (Array.isArray(group.items) ? group.items.length : 0), 0);
  if (thesisCountIt !== thesisCountEn) fail(`tesi: conteggio diverso tra italiano e inglese (${thesisCountIt} vs ${thesisCountEn})`);
}

function stripQueryHash(value) {
  return value.split('#')[0].split('?')[0];
}

function routeToFile(route) {
  const clean = stripQueryHash(route);
  if (clean === '' || clean === '/') return 'index.html';
  const relative = clean.replace(/^\//, '');
  if (relative.endsWith('/')) return `${relative}index.html`;
  return relative;
}

async function fileExists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}

function extractAttributes(html, attribute) {
  const values = [];
  const expression = new RegExp(`\\b${attribute}=["']([^"']+)["']`, 'gi');
  for (const match of html.matchAll(expression)) values.push(match[1]);
  return values;
}

async function validateDist() {
  const dist = path.join(root, 'dist');
  if (!(await fileExists(dist))) return fail('dist: cartella non trovata; eseguire prima il build');

  const expected = ['index.html', 'didattica.html', 'tesi.html', 'en/index.html', 'en/didattica.html', 'en/tesi.html', '404.html', 'sitemap.xml', 'robots.txt'];
  for (const file of expected) if (!(await fileExists(path.join(dist, file)))) fail(`dist/${file}: file generato mancante`);
  for (const sourceJson of ['content.json', 'content.en.json', 'publications.json']) {
    if (await fileExists(path.join(dist, sourceJson))) fail(`dist/${sourceJson}: il JSON sorgente non deve essere pubblicato`);
  }

  const htmlFiles = expected.filter((file) => file.endsWith('.html'));
  const htmlByFile = new Map();
  const idsByFile = new Map();
  for (const file of htmlFiles) {
    const html = await fs.readFile(path.join(dist, file), 'utf8');
    htmlByFile.set(file, html);
    if (!/^<!doctype html>/i.test(html.trimStart())) fail(`dist/${file}: doctype HTML mancante`);
    if (!/<html\s+lang=["'][a-z-]+["']/i.test(html)) fail(`dist/${file}: attributo lang mancante`);
    if ((html.match(/<main\b/gi) || []).length !== 1) fail(`dist/${file}: deve esserci un solo elemento main`);
    if ((html.match(/<h1\b/gi) || []).length !== 1) fail(`dist/${file}: deve esserci un solo h1`);
    if (!/<title>[^<]+<\/title>/i.test(html)) fail(`dist/${file}: title mancante o vuoto`);
    if (file !== '404.html') {
      for (const required of ['rel="canonical"', 'property="og:image"', 'name="twitter:card"', 'property="og:image:width"', 'property="og:image:height"']) {
        if (!html.includes(required)) fail(`dist/${file}: metadato mancante (${required})`);
      }
    }
    const ids = extractAttributes(html, 'id');
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length) fail(`dist/${file}: ID duplicati (${[...new Set(duplicates)].join(', ')})`);
    idsByFile.set(file, new Set(ids));
    for (const imageTag of html.match(/<img\b[^>]*>/gi) || []) {
      if (!/\balt=["'][^"']*["']/i.test(imageTag)) fail(`dist/${file}: immagine senza attributo alt`);
    }
  }

  for (const [file, html] of htmlByFile) {
    const attributes = [...extractAttributes(html, 'href'), ...extractAttributes(html, 'src')];
    for (const value of attributes) {
      if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(value)) continue;
      if (value.startsWith('#')) {
        if (!idsByFile.get(file)?.has(value.slice(1))) fail(`dist/${file}: ancora interna inesistente (${value})`);
        continue;
      }
      const [rawPath, fragment] = value.split('#');
      const targetRelative = rawPath.startsWith('/')
        ? routeToFile(rawPath)
        : path.normalize(path.join(path.dirname(file), routeToFile(rawPath)));
      const target = path.join(dist, stripQueryHash(targetRelative));
      if (!(await fileExists(target))) {
        fail(`dist/${file}: collegamento interno inesistente (${value} -> ${targetRelative})`);
        continue;
      }
      if (fragment && targetRelative.endsWith('.html')) {
        const targetHtml = htmlByFile.get(targetRelative) || await fs.readFile(target, 'utf8');
        const targetIds = idsByFile.get(targetRelative) || new Set(extractAttributes(targetHtml, 'id'));
        if (!targetIds.has(fragment)) fail(`dist/${file}: ancora inesistente (${value})`);
      }
    }
  }

  const thesesIt = htmlByFile.get('tesi.html') || '';
  const thesesEn = htmlByFile.get('en/tesi.html') || '';
  for (const [file, html] of [['tesi.html', thesesIt], ['en/tesi.html', thesesEn]]) {
    if (!/href=["'][^"']*didattica\.html["'][^>]*aria-current=["']location["']/i.test(html)) {
      fail(`dist/${file}: la sezione Didattica deve usare aria-current="location"`);
    }
    if (/href=["'][^"']*didattica\.html["'][^>]*aria-current=["']page["']/i.test(html)) {
      fail(`dist/${file}: aria-current="page" non corretto per la sottopagina Tesi`);
    }
  }

  const index = htmlByFile.get('index.html') || '';
  if (/class=["']hero-visual[^"']*["'][^>]+aria-label=/i.test(index)) fail('dist/index.html: aria-label ridondante sull’aside della fotografia');
  if (!/data-search=["'][^"']*garcia/i.test(index)) warn('dist/index.html: nessun dato con accenti disponibile per il test automatico della ricerca');
}

if (mode === '--source' || mode === '--all') await validateSource();
if (mode === '--dist' || mode === '--all') await validateDist();

for (const message of warnings) console.warn(`WARNING: ${message}`);
if (errors.length) {
  for (const message of errors) console.error(`ERROR: ${message}`);
  console.error(`Validazione fallita: ${errors.length} errore/i.`);
  process.exit(1);
}
console.log(`Validazione completata${warnings.length ? ` con ${warnings.length} avviso/i` : ''}.`);
