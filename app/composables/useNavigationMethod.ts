export type NavigationMethod = "load" | "push" | "replace" | "pop";

/**
 * Global record of how the current route was reached.
 * Updated by `navigation-method.client` at the start of each navigation.
 *
 * - `load` — first document load / SSR
 * - `push` — in-app link or `router.push` / `navigateTo`
 * - `replace` — `router.replace` / `navigateTo(..., { replace: true })`
 * - `pop` — browser back/forward (or `router.back()` / `router.go`)
 *
 * @returns Reactive navigation method for the active route.
 * @example
 * const method = useNavigationMethod()
 * // method.value === 'pop' after the user hits the back button
 */
export function useNavigationMethod() {
  return useState<NavigationMethod>("navigation-method", () => "load");
}

/**
 * Whether a Motion entrance should play for the current page mount.
 * Plays on `load` / `push` / `replace`; skips on browser back/forward (`pop`).
 *
 * Call during `setup` only — this is a mount-time snapshot, not a live ref.
 * The home/project page remounts on each visit, so setup runs again then.
 *
 * @returns `true` when the entrance animation should run.
 * @example
 * const playEntrance = usePlayEntrance()
 * // <motion.div :initial="playEntrance ? 'initial' : false" animate="animate" />
 */
export function usePlayEntrance(): boolean {
  if (import.meta.server) {
    return true;
  }

  return useNavigationMethod().value !== "pop";
}
