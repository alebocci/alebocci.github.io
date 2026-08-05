import { promises as fs } from 'node:fs';

const files = ['content.json', 'content.en.json', 'publications.json'];
const urls = new Set();

function collect(value) {
  if (Array.isArray(value)) return value.forEach(collect);
  if (!value || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    if (key === 'url' && typeof item === 'string' && /^https?:\/\//i.test(item)) urls.add(item);
    else collect(item);
  }
}

for (const file of files) collect(JSON.parse(await fs.readFile(file, 'utf8')));

const queue = [...urls];
const failures = [];
const concurrency = 4;

async function check(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal, headers: { 'user-agent': 'alebocci-site-link-check/1.0' } });
    if ([405, 501].includes(response.status)) {
      response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers: { 'user-agent': 'alebocci-site-link-check/1.0', range: 'bytes=0-1024' } });
    }
    if (response.status === 404 || response.status >= 500) failures.push(`${response.status} ${url}`);
    else console.log(`${response.status} ${url}`);
  } catch (error) {
    failures.push(`${error.name}: ${url}`);
  } finally {
    clearTimeout(timer);
  }
}

async function worker() {
  while (queue.length) await check(queue.shift());
}
await Promise.all(Array.from({ length: concurrency }, worker));
if (failures.length) {
  failures.forEach((failure) => console.error(`LINK: ${failure}`));
  process.exit(1);
}
console.log(`Controllati ${urls.size} collegamenti esterni.`);
