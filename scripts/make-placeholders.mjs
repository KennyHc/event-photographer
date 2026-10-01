// Generates tasteful, neutral-toned placeholder JPEGs for each event (and the
// about portrait) so the site can be built and previewed before real photos
// are available.
//
// Delete the generated files in `src/assets/events/<slug>/` and
// `src/assets/about/` and drop in real JPEGs when ready — see README.md.

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(rootDir, '..', 'src', 'assets');

/** Muted, warm/neutral tone pairs used as gradient endpoints. */
const palettes = [
  ['#e9e2d8', '#c9b9a4'], // warm sand
  ['#e3dace', '#b5a28b'], // taupe
  ['#dfd6ca', '#a6937f'], // mushroom
  ['#e6dfd6', '#c4b4a0'], // oat
  ['#d9d2c6', '#9c8c77'], // stone
  ['#ece4d8', '#cab9a2'], // linen
  ['#d7cfc5', '#998a76'], // clay
  ['#e1d8cb', '#b2a187'], // sand dune
  ['#dcd3c7', '#a89878'], // greige
];

function gradientSvg(width, height, c1, c2, angle) {
  const rad = (angle * Math.PI) / 180;
  const x1 = 50 - Math.cos(rad) * 50;
  const y1 = 50 - Math.sin(rad) * 50;
  const x2 = 50 + Math.cos(rad) * 50;
  const y2 = 50 + Math.sin(rad) * 50;
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="100%" stop-color="${c2}" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" />
  </svg>`;
}

async function makeImage(filePath, width, height, paletteIndex, angle = 135) {
  const [c1, c2] = palettes[paletteIndex % palettes.length];
  const svg = gradientSvg(width, height, c1, c2, angle);
  await sharp(Buffer.from(svg)).jpeg({ quality: 84 }).toFile(filePath);
  console.log(`  wrote ${path.relative(path.join(rootDir, '..'), filePath)}`);
}

/**
 * 8 photos per event: a cover plus 7 numbered shots, mixing portrait
 * (2:3, 1600x2400) and landscape (3:2, 2400x1600) orientation.
 */
async function makeEvent(slug, angle) {
  const dir = path.join(assetsDir, 'events', slug);
  await mkdir(dir, { recursive: true });
  console.log(`Generating placeholders for "${slug}"...`);

  await makeImage(path.join(dir, 'cover.jpg'), 2400, 1600, 0, angle);

  const orientations = [
    'portrait',
    'landscape',
    'portrait',
    'portrait',
    'landscape',
    'portrait',
    'landscape',
  ];

  for (let i = 0; i < orientations.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    const isPortrait = orientations[i] === 'portrait';
    const [w, h] = isPortrait ? [1600, 2400] : [2400, 1600];
    await makeImage(path.join(dir, `${n}.jpg`), w, h, i + 1, angle + i * 7);
  }
}

async function makeAboutPortrait() {
  const dir = path.join(assetsDir, 'about');
  await mkdir(dir, { recursive: true });
  console.log('Generating placeholder about portrait...');
  await makeImage(path.join(dir, 'portrait.jpg'), 1200, 1500, 4, 160);
}

async function main() {
  await makeEvent('wedding-bali', 125);
  await makeEvent('baptism', 95);
  await makeAboutPortrait();
  console.log('Done. Replace these with real photos whenever you like.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
