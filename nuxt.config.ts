// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

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
   * 4. Compile nested rules
   * 5. Add vendor prefixes last
   */
  postcss: {
    plugins: {
      "postcss-import": {},
      "@csstools/postcss-global-data": {
        files: ["./app/assets/styles/config/_breakpoints.css"],
      },
      "postcss-custom-media": {},
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

  runtimeConfig: {
    public: {
      siteName: "Mllr26",
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      titleTemplate: "%s · Mllr26",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  typescript: {
    strict: true,
  },

  modules: ["@nuxt/fonts", "motion-v/nuxt", "lenis/nuxt"],
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
