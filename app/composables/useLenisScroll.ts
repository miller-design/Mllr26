import type Lenis from "lenis";
import { computed, shallowRef } from "vue";

/** Client-only root Lenis — readable outside setup (e.g. router scrollBehavior). */
const rootLenis = shallowRef<Lenis>();

/**
 * Registers the root Lenis instance for helpers that run outside setup.
 *
 * @param instance - Active Lenis instance, or `undefined` when destroyed
 * @example
 * setRootLenis(lenisRef.value?.lenis)
 * setRootLenis(undefined)
 */
export function setRootLenis(instance: Lenis | undefined) {
  rootLenis.value = instance;
}

/**
 * Root Lenis helpers: scroll targets + nested scroll locking for overlays.
 *
 * Safe to call from Vue setup and from non-setup contexts such as
 * `router.options` scrollBehavior (does not use inject).
 *
 * @example
 * const { scrollTo, lock, unlock, isLocked } = useLenisScroll()
 * scrollTo(0, { immediate: true })
 * scrollTo('#work')
 * lock()   // modal / menu open
 * unlock() // modal / menu close
 */
export function useLenisScroll() {
  const lenis = computed(() => rootLenis.value);
  const lockCount = useState("lenis-lock-count", () => 0);
  const isLocked = computed(() => lockCount.value > 0);

  const scrollTo = (
    target: number | string | HTMLElement,
    options: { immediate?: boolean; offset?: number } = {},
  ) => {
    const { immediate = false, offset } = options;
    lenis.value?.scrollTo(target, { immediate, offset, force: true });
  };

  /**
   * Stops Lenis scrolling. Safe to call from nested overlays —
   * each lock() needs a matching unlock().
   */
  const lock = () => {
    lockCount.value += 1;
    if (lockCount.value === 1) {
      lenis.value?.stop();
    }
  };

  /**
   * Releases one lock. Restarts Lenis only when the last lock is gone.
   */
  const unlock = () => {
    if (lockCount.value === 0) return;
    lockCount.value -= 1;
    if (lockCount.value === 0) {
      lenis.value?.start();
    }
  };

  return { scrollTo, lock, unlock, isLocked, lenis };
}
