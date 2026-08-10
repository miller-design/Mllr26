import type { RouteLocationRaw } from "vue-router";
import type { NavigationMethod } from "~/composables/useNavigationMethod";

/**
 * Keeps `navigation-method` in sync with how each route change was triggered.
 *
 * Pending method is set *before* guards/components run:
 * - `history.listen` → `pop` (back/forward). Vue Router only calls this for
 *   external history traversals; it runs in the same sync turn as the router's
 *   own listener, before `beforeEach` microtasks.
 * - Wrapped `push` / `replace` → in-app navigations (`NuxtLink`, `navigateTo`).
 *
 * `beforeEach` commits once per navigation start. Redirect continuations leave
 * `pending` null so the committed method is preserved.
 */
export default defineNuxtPlugin(() => {
  const navigationMethod = useNavigationMethod();
  let pending: NavigationMethod | null = null;

  const router = useRouter();
  const history = router.options.history;

  history.listen(() => {
    pending = "pop";
  });

  const push = router.push.bind(router);
  const replace = router.replace.bind(router);

  router.push = (to: RouteLocationRaw) => {
    pending = "push";
    return push(to);
  };

  router.replace = (to: RouteLocationRaw) => {
    pending = "replace";
    return replace(to);
  };

  router.beforeEach(() => {
    if (pending === null) {
      return;
    }

    navigationMethod.value = pending;
    pending = null;
  });
});
