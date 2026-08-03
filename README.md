# Nuxt starter

Minimal Nuxt 4 app with CSS Modules, PostCSS, and pnpm. No Tailwind.

## Setup

```bash
nvm use          # Node 24 — see .nvmrc
pnpm install
cp .env.example .env
pnpm dev
```

## Conventions

**Components** — one folder each:

```text
app/components/Header/
  index.vue
  types.ts
  styles.module.css
```

**Styles** — global tokens/reset in `app/assets/styles/`; component styles in CSS Modules. Breakpoints from `_breakpoints.css` are available everywhere via PostCSS (`@media (--md)`).

**Nuxt dirs** — add as needed: `composables/`, `middleware/`, `plugins/`, `utils/`, `server/api/`.

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm typecheck
```
