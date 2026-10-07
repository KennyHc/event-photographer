# Next steps

Status: site builds cleanly (EN + ES, 16 pages). Pages: Home, Work, story pages, Services, About, Contact, 404. Live at https://kennyhc.github.io/event-photographer/ (deploys on every push to `main`).

## 1. Before the first deploy (you)

- [x] **Shrink the photos.** Resized to 2500 px (≈44 MB total); originals backed up in `~/Pictures/event-photographer-originals`.
- [ ] **Delete `src/assets/events/baptism/temp.jpg`.** It currently appears in the gallery.
- [ ] **Pick and order photos.** Max 30 per event, shown in filename order. Rename to `01.jpg`, `02.jpg`… to control the sequence; best shot as `cover.jpg`.
- [x] **Add the real wedding photos** (26 in `src/assets/events/wedding-bali/`).
- [x] **Add your portrait.** About uses `portrait1.jpg`; `portrait2.jpg` is the alternative.
- [ ] **Get consent.** Written OK from your sister and Michelle to publish, especially photos of the baby and identifiable guests.
- [x] **Wedding date** set to September 2025.
- [x] **GitHub Pages enabled** (repo made public; Pages needs a paid plan for private repos).
- [x] First deploy done.

## 2. Content (you)

- [ ] Ask Michelle for a 2–3 sentence testimonial. Add it to the baptism event file's `testimonial:` field.
- [ ] Review the About bio and the Services page wording. Make sure every promise matches what you actually deliver: 1-week delivery, 48 h sneak peek, no RAW files.
- [ ] Decide whether to add a third package detail later (e.g. extra hours) once you know what clients ask for.

## 3. UI polish (agent pass)

Highest impact first:

- [ ] **Editorial gallery layout.** Alternate a full-width landscape with portrait pairs instead of equal masonry columns; one column on phones.
- [x] **Story cover.** Taller 4:5 crop on mobile; full-screen cover with title overlay on desktop.
- [x] **Page transitions.** Astro View Transitions, with the event card image morphing into the story cover.
- [ ] **Image placeholders.** Blurred preview or dominant colour while photos load.
- [ ] **Contact.** WhatsApp as the primary button with a pre-filled message ("Hi Kenny, I'm planning a ___ on ___ in ___"); copy-email button.
- [x] **Lightbox.** "3 / 24" counter, preload neighbouring images, crossfade between photos.
- [ ] **Home.** Replace the "SCROLL" label with a subtle cue; testimonial block once available; tidy the services row.
- [x] **Typography.** `text-wrap: balance` on headings and `pretty` on paragraphs; one consistent spacing scale.
- [ ] **Header.** Hide on scroll down, show on scroll up.
- [ ] **Sharing previews.** Per-event Open Graph image so WhatsApp and Instagram links show the cover.

## 4. Code health

- [ ] **Remove EN/ES page duplication.** Each page exists twice (`src/pages/` and `src/pages/es/`), so every change has to be made twice. Move page bodies into shared components that take `lang`.
- [ ] Add a sitemap (`@astrojs/sitemap`).

## 5. Later

- [ ] Custom domain, e.g. `kennyhe.photo` (update `site`/`base` in `astro.config.mjs` and add a CNAME).
- [ ] Google Business Profile and Instagram bio link pointing to the site.
- [ ] Add each new event as a folder plus two short Markdown files (EN/ES). One line of copy is enough.
- [ ] Consider a client gallery tool (Pixieset or similar) once volume grows.
