import { useReducedMotion, useScroll, useSpring, useTransform } from "motion-v";
import { useMediaQuery } from "@vueuse/core";
import type { ComponentPublicInstance, Ref } from "vue";

type ElementRef = Ref<HTMLElement | ComponentPublicInstance | null>;

type UseFooterRevealOptions = {
  /** Ref attached to the fixed footer shell for height measurement. */
  footerRef: ElementRef;
  /** Ref attached to the transparent reveal spacer sibling. */
  spacerRef: Ref<HTMLElement | null>;
  /** Starting translateY while the footer is hidden (percentage of its height). */
  revealOffset?: string;
};

/**
 * Resolve a template ref to a DOM element.
 * Motion components expose a component instance (`$el`), not a raw Element.
 *
 * @param value - Template ref value from a native element or Vue component.
 *
 * @example
 * resolveElement(footerRef.value) // → HTMLElement | null
 */
function resolveElement(
  value: HTMLElement | ComponentPublicInstance | null,
): HTMLElement | null {
  if (value instanceof HTMLElement) {
    return value;
  }

  if (value && "$el" in value && value.$el instanceof HTMLElement) {
    return value.$el;
  }

  return null;
}

/**
 * Scroll-linked footer reveal — keeps the footer fixed while main content
 * scrolls over it, then translates the footer up into its settled position.
 *
 * @param options.footerRef - Ref on the fixed footer shell element.
 * @param options.spacerRef - Ref on the transparent sibling after `<main>`.
 * @param options.revealOffset - Initial Y offset while hidden. Defaults to `"30%"`.
 *
 * @example
 * const footerRef = ref<HTMLElement | null>(null)
 * const spacerRef = ref<HTMLElement | null>(null)
 * const { footerHeight, y, overlayOpacity, prefersReducedMotion } =
 *   useFooterReveal({ footerRef, spacerRef })
 */
export function useFooterReveal({
  footerRef,
  spacerRef,
  revealOffset = "30%",
}: UseFooterRevealOptions) {
  const prefersReducedMotion = useReducedMotion();
  const supportsHover = useMediaQuery("(hover: hover)");
  const shouldReveal = computed(
    () => supportsHover.value && !prefersReducedMotion.value,
  );
  const footerHeight = ref(0);

  let resizeObserver: ResizeObserver | undefined;

  /**
   * Track footer height so the reveal spacer matches — users can scroll
   * exactly far enough to fully uncover the fixed footer.
   */
  onMounted(() => {
    const element = resolveElement(footerRef.value);
    if (!element) {
      return;
    }

    resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) {
        footerHeight.value = entry.contentRect.height;
      }
    });

    resizeObserver.observe(element);
  });

  onUnmounted(() => {
    resizeObserver?.disconnect();
  });

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start end", "end end"],
    trackContentSize: true,
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [revealOffset, "0%"]);

  /**
   * Overlay opacity tracks reveal progress 1:1 (no spring) — the veil is
   * already covering the screen; only the fade is scroll-linked.
   */
  // Function form keeps opacity off Motion's native ViewTimeline path, which
  // flickers for this fixed layer on touch browsers.
  const overlayOpacity = useTransform(scrollYProgress, (progress) => 1 - progress);

  const y = useSpring(rawY, {
    stiffness: 220,
    damping: 25,
    restDelta: 0.001,
  });

  return {
    footerHeight,
    y,
    overlayOpacity,
    shouldReveal,
  };
}
