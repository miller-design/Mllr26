# AGENTS.md — Mllr26

Guidance for AI coding agents working in this repository.

## What this is

Personal portfolio site for **Jack Miller** (creative developer, East Midlands, UK). Brand: **Mllr26**. Stack: **Nuxt 4**, **Vue 3**, **TypeScript**, **CSS Modules** (no Tailwind). Motion via **motion-v**; smooth scroll via **Lenis**. SEO via **@nuxtjs/seo** (sitemap, schema.org Person, OG images).

## Commands

```bash
nvm use          # Node 24 — see .nvmrc
pnpm install
pnpm dev         # local dev
pnpm build       # production build (SSR)
pnpm generate    # static export (if used)
pnpm preview
pnpm typecheck
pnpm lint        # Biome
pnpm lint:fix
```

## Environment

Runtime config (set in deployment / `.env`):

| Variable | Purpose |
| -------- | ------- |
| `NUXT_SITE_URL` | Canonical site URL for SEO, sitemap, `llms.txt` |
| `NUXT_SITE_ENV` | Set to `production` to allow indexing (`site.indexable`) |
| `NUXT_RESEND_API_KEY` | Resend API key for contact form |
| `NUXT_RESEND_FROM_NAME` | From name for outbound mail |
| `NUXT_RESEND_EMAIL` | Inbox / from address for contact form |

Contact API: `server/api/contact/index.post.ts`. Shared Zod schema: `shared/schemas/contact.ts`.

## Directory layout

```text
app/
  components/     # Folder-per-component (see below)
  composables/
  data/projects/  # Portfolio content + gallery image lists
  layouts/
  lib/            # seo.ts, const.ts, email.ts
  pages/
  assets/styles/  # Global CSS, tokens, breakpoints, mixins
server/
  api/            # Nitro routes (contact, sitemap URLs)
shared/
  schemas/        # Zod shared client/server
public/           # Static assets, project images, favicons
```

## Component conventions

One folder per component; only `index.vue` is auto-registered:

```text
app/components/Header/
  index.vue
  types.ts
  styles.module.css
```

Import styles as CSS modules: `import styles from "./styles.module.css"`.

## Styling

- Global tokens, reset, typography: `app/assets/styles/`
- Component styles: **CSS Modules** with **nested CSS**
- Breakpoints: custom media from `app/assets/styles/config/_breakpoints.css` — use `@media (--md)` etc. (injected globally via PostCSS; do not duplicate breakpoint values)
- Fluid type/spacing: mixins in `_mixins.css` via `@mixin`
- Respect `@media (--motion-reduce)` for animation-heavy UI

## SEO and content

- Site-wide copy: `app/lib/seo.ts` (titles, descriptions, legal page meta)
- Social / footer links: `app/lib/const.ts`
- Projects: `app/data/projects/index.ts` — add slugs, copy, and update `PROJECT_IMAGES` when gallery assets change
- Per-project SEO: `app/composables/useProjectSeo.ts`
- Dynamic sitemap entries: `server/api/__sitemap__/urls.ts`
- `public/site.webmanifest` description must be updated manually to match `SITE_DESCRIPTION`

## Routing and scroll

- Pages: `app/pages/` (home, `projects/[slug]`, legal)
- Lenis-aware scroll behavior: `app/router.options.ts` — do not call `window.scrollTo` for route changes; use `useLenisScroll()`

## Code quality

- **Biome** for format/lint (`biome.jsonc`) — run `pnpm lint` before finishing substantive edits
- TypeScript `strict: true` — never use `any`
- Prefer existing patterns over new abstractions; keep diffs small
- Function comments: document parameters with an `@example` when adding non-trivial functions (project convention)

## AI-facing files

| File | Role |
| ---- | ---- |
| `AGENTS.md` | This file — repo conventions for coding agents |
| `public/llms.txt` | Static `/llms.txt` — site summary for LLM crawlers (optional for Google Search; useful for other AI tools) |

When adding routes or projects, update `app/data/projects/index.ts` and sync `public/llms.txt` (same pattern as `public/site.webmanifest` vs `SITE_DESCRIPTION`).

## Do not

- Add Tailwind or unrelated UI frameworks
- Hardcode production URLs in components — use `NUXT_SITE_URL` / site config
- Commit secrets (`.env`, API keys)
- Register non-`.vue` files as Nuxt components
