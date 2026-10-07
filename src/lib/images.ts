import type { ImageMetadata } from 'astro';

export interface EventImage {
  file: ImageMetadata;
  name: string;
}

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/events/**/*.{jpg,jpeg,JPG,JPEG,png,webp}',
  { eager: true },
);

/** All photos for a given event slug, sorted by filename. */
export function getEventImages(slug: string): EventImage[] {
  return Object.entries(modules)
    .filter(([path]) => path.includes(`/assets/events/${slug}/`))
    .map(([path, mod]) => ({
      file: mod.default,
      name: path.split('/').pop() ?? path,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** The cover photo: a file named "cover.*" if present, otherwise the first. */
export function getCover(images: EventImage[]): EventImage {
  const cover = images.find((img) => /^cover\./i.test(img.name));
  return cover ?? images[0];
}

/** Every photo in the folder, capped at `max`, for the editorial gallery. */
export function getShowcase(images: EventImage[], max = 30): EventImage[] {
  return images.slice(0, max);
}

/** A photo whose filename starts with `prefix`, or `fallback` if none matches. */
export function findImage(images: EventImage[], prefix: string, fallback: EventImage): EventImage {
  return images.find((img) => img.name.startsWith(prefix)) ?? fallback;
}
