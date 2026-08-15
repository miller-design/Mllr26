// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
import {
  SITE_DESCRIPTION,
  SITE_JOB_TITLE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_PERSON_NAME,
} from "./app/lib/seo";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/styles/main.css", "lenis/dist/lenis.css"],

  vite: {
    plugins: [
      svgLoader({
        defaultImport: "component",
      }),
    ],
  },

  /**
   * PostCSS pipeline for the Nuxt app.
   *
   * Order matters:
   * 1. Resolve `@import` statements
   * 2. Inject shared custom-media / tokens into every CSS file
   * 3. Compile `@custom-media` queries
   * 4. Expand `@mixin` helpers (fluid scale — must be at-rules, not values)
   * 5. Compile nested rules
   * 6. Add vendor prefixes last
   */
  postcss: {
    plugins: {
      "postcss-import": {},
      "@csstools/postcss-global-data": {
        files: ["./app/assets/styles/config/_breakpoints.css"],
      },
      "postcss-custom-media": {},
      "postcss-mixins": {
        mixinsFiles: ["./app/assets/styles/config/_mixins.css"],
      },
      "postcss-nested": {},
      autoprefixer: {},
    },
  },

  /**
   * Folder-per-component: `components/Header/index.vue` → `<Header />`
   * Only `.vue` files are registered (`types.ts` / `styles.module.css` stay local).
   */
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      extensions: [".vue"],
    },
  ],

  /**
   * Shared site identity for @nuxtjs/seo (canonicals, sitemap, OG, schema).
   * Override `url` in production via `NUXT_SITE_URL`.
   * Set `NUXT_SITE_ENV=production` to allow indexing.
   */
  site: {
    url: process.env.NUXT_SITE_URL || "http://localhost:3000",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    defaultLocale: "en",
    indexable: process.env.NUXT_SITE_ENV === "production",
  },

  schemaOrg: {
    identity: {
      type: "Person",
      name: SITE_PERSON_NAME,
      jobTitle: SITE_JOB_TITLE,
      description: SITE_DESCRIPTION,
      url: process.env.NUXT_SITE_URL || "http://localhost:3000",
    },
  },

  routeRules: {
    "/privacy-policy": { robots: "noindex, follow", sitemap: false },
    "/cookie-policy": { robots: "noindex, follow", sitemap: false },
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },

  ogImage: {
    defaults: {
      width: 1200,
      height: 630,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7,
    },
  },

  runtimeConfig: {
    public: {
      siteName: SITE_NAME,
    },
  },

  /**
   * Site-wide OG/Twitter image fallback (`SITE_OG_IMAGE`).
   * Project pages override with their featured image.
   */
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { property: "og:image", content: SITE_OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: SITE_OG_IMAGE },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicons/favicon.ico",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicons/favicon-96x96.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/favicons/icon-192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/favicons/icon-512.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },

  typescript: {
    strict: true,
  },

  modules: ["@nuxtjs/seo", "@nuxt/fonts", "motion-v/nuxt", "lenis/nuxt"],
  fonts: {
    provider: "google",
    families: [
      {
        name: "Special Gothic",
        provider: "google",
        weights: ["400 700"],
      },
    ],
  },
});
