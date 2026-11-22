/**
 * Zero-dependency Vercel build: copies editable site source and unpacks media.
 * The media archive keeps GitHub uploads compact; no runtime network requests.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { gunzipSync } from 'node:zlib';

const out = 'dist';
mkdirSync(out, { recursive: true });
for (const name of ['index.html', 'styles.css', 'app.js', '404.html']) {
  copyFileSync(name, join(out, name));
}
const archive = existsSync('media')
  ? Buffer.concat(readdirSync('media').filter(n => /^part-\d{3}\.bin$/.test(n)).sort().map(n => readFileSync(join('media', n))))
  : readFileSync('site-media.tar.gz');
const tar = gunzipSync(archive);
let pos = 0;
let count = 0;
while (pos + 512 <= tar.length) {
  const head = tar.subarray(pos, pos + 512);
  const rawName = head.toString('utf8', 0, 100).split('\0')[0];
  if (!rawName) break;
  const prefix = head.toString('utf8', 345, 500).split('\0')[0];
  const name = prefix ? `${prefix}/${rawName}` : rawName;
  const rawSize = head.toString('ascii', 124, 136).replace(/\0/g, '').trim();
  const size = parseInt(rawSize, 8) || 0;
  const type = head.toString('ascii', 156, 157);
  const start = pos + 512;
  const allowed = (name.startsWith('assets/') || name.startsWith('images/')) && !name.includes('..') && !name.startsWith('/');
  if (!allowed) throw new Error(`Unexpected archive path: ${name}`);
  if (type === '0' || type === '\0' || type === '') {
    if (start + size > tar.length) throw new Error(`Corrupt archive entry: ${name}`);
    const outputPath = join(out, name);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, tar.subarray(start, start + size));
    count++;
  }
  pos += 512 + Math.ceil(size / 512) * 512;
}
console.log(`Built Çikolata Kuşağı static demo: ${count} media files.`);
