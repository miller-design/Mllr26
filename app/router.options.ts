import type { RouterConfig } from "@nuxt/schema";
import type { RouterScrollBehavior } from "vue-router";
import { useLenisScroll } from "./composables/useLenisScroll";

/**
 * Lenis-aware scroll restoration.
 * Returns `false` so Vue Router does not also call `window.scrollTo`.
 */
const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  const nuxtApp = useNuxtApp();
  const { scrollTo } = useLenisScroll();

  // Same-path hash: smooth scroll to the target (no page change)
  if (to.path === from.path) {
    if (to.hash) {
      scrollTo(to.hash);
      return false;
    }
    return false;
  }

  return new Promise((resolve) => {
    const run = () => {
      if (savedPosition) {
        scrollTo(savedPosition.top, { immediate: true });
      } else if (to.hash) {
        // Land on the hash after the new page is ready
        scrollTo(to.hash, { immediate: true });
      } else {
        scrollTo(0, { immediate: true });
      }

      resolve(false);
    };

    // Wait for leave transition when present; otherwise after page load
    const hook =
      // Nuxt sets this while a page transition is active
      (nuxtApp as { _runningTransition?: boolean })._runningTransition
        ? "page:transition:finish"
        : "page:loading:end";

    nuxtApp.hooks.hookOnce(hook, () => {
      requestAnimationFrame(run);
    });
  });
};

export default <RouterConfig>{ scrollBehavior };
