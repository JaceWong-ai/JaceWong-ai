# Jace Wong — Intelligence & Beyond

Personal home and writing space for Jace Wong: an AI practitioner interested in
intelligence, philosophy, reading, investing, and the questions shaping what
comes next.

## Run locally

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Write a new post

Posts live in [`lib/blog.ts`](./lib/blog.ts). Add a new object to the `posts`
array with:

- a unique `slug` and sequential `number`
- title, short description, category, date, and reading time
- an accent: `violet`, `amber`, or `cyan`
- body blocks using `paragraph`, `heading`, or `quote`

The post will automatically appear on the homepage, the writing index, and its
own route at `/blog/[slug]`.

## Project shape

- `app/page.tsx` — personal homepage and interactive field
- `app/blog/page.tsx` — writing index
- `app/blog/[slug]/page.tsx` — article reader
- `app/globals.css` — visual system, motion, and responsive layout
- `components/` — shared navigation and footer
- `lib/blog.ts` — article content
- `public/og.png` — social sharing card

## Commands

```bash
npm run dev
npm run build
npm run build:pages
npm test
```

`npm run build:pages` creates the static GitHub Pages artifact in `out/`. The
public root site is deployed from the separate
[`JaceWong-ai.github.io`](https://github.com/JaceWong-ai/JaceWong-ai.github.io)
repository, while this repository remains the editable source of truth.
