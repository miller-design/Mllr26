<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { motion, useReducedMotion, useScroll } from "motion-v";
import styles from "./styles.module.css";
import type { ProjectTickerProps } from "./types";

type SlideId = "landscape" | "portrait" | "square";

interface Slide {
  id: SlideId;
  className: string;
}

const SLIDES: Slide[] = [
  { id: "portrait", className: styles.portrait ?? "" },
  { id: "landscape", className: styles.landscape ?? "" },
  { id: "square", className: styles.square ?? "" },
];

/** Dwell time per slide before flicking to the next. */
const INTERVAL_MS = 1400;

/** Hide the ticker once scroll passes this many pixels. */
const SCROLL_HIDE_THRESHOLD = 8;

/** Snappy ease — quick settle, almost no linger. */
const SNAP_EASE = [0.26, 0.02, 0.23, 0.94] as const;

/** First paint only — slower reveal on page load. */
const LOAD_TRANSITION = {
  ease: SNAP_EASE,
  duration: 0.4,
} as const;

/** Scroll-driven show/hide after the first entrance. */
const SNAP_TRANSITION = {
  ease: SNAP_EASE,
  duration: 0.2,
} as const;

const { className } = defineProps<ProjectTickerProps>();

const prefersReducedMotion = useReducedMotion();
const activeIndex = ref(0);
/** True while the page is at (or near) the top — drives enter vs reverse. */
const isAtTop = ref(true);
/** After the first load entrance, scroll toggles use the snappy timing. */
const hasEntered = ref(false);

const { scrollY } = useScroll();

let timer: ReturnType<typeof setInterval> | null = null;
let unsubscribeScroll: (() => void) | undefined;

/**
 * Advance to the next slide in the ticker loop.
 *
 * @example
 * advanceSlide() // landscape → portrait → square → landscape
 */
function advanceSlide() {
  activeIndex.value = (activeIndex.value + 1) % SLIDES.length;
}

/**
 * Motion target for a slide based on whether it is the active index.
 *
 * @param index - Index of the slide within `SLIDES`.
 *
 * @example
 * slideAnimate(0) // { opacity: 1, scale: 1 } when activeIndex is 0
 */
function slideAnimate(index: number) {
  const isActive = activeIndex.value === index;

  return {
    opacity: isActive ? 1 : 0,
    scale: isActive ? 1 : 0.94,
  };
}

/**
 * Start or stop the slide interval based on visibility and reduced-motion.
 *
 * @param shouldRun - Whether the ticker should keep cycling slides.
 *
 * @example
 * syncSlideTimer(true) // starts interval when at top
 * syncSlideTimer(false) // clears interval while scrolled away
 */
function syncSlideTimer(shouldRun: boolean) {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  if (shouldRun && !prefersReducedMotion.value) {
    timer = setInterval(advanceSlide, INTERVAL_MS);
  }
}

/**
 * Mark the load entrance as done so later show/hide uses snap timing.
 *
 * @param definition - Variant label Motion just finished animating to.
 *
 * @example
 * onContainerAnimationComplete('animate') // unlocks SNAP_TRANSITION
 */
function onContainerAnimationComplete(definition?: unknown) {
  if (definition === "animate") {
    hasEntered.value = true;
  }
}

const containerVariants = computed(() => ({
  initial: {
    opacity: 0,
    scale: 0.97,
    transition: SNAP_TRANSITION,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: hasEntered.value ? SNAP_TRANSITION : LOAD_TRANSITION,
  },
}));

const slideTransition = {
  duration: 0.2,
  ease: SNAP_EASE,
};

watch(isAtTop, (atTop) => {
  syncSlideTimer(atTop);

  // Scrolling away mid-load still flips to snap for the next return.
  if (!atTop) {
    hasEntered.value = true;
  }
});

onMounted(() => {
  isAtTop.value = scrollY.get() < SCROLL_HIDE_THRESHOLD;
  syncSlideTimer(isAtTop.value);

  unsubscribeScroll = scrollY.on("change", (latest) => {
    isAtTop.value = latest < SCROLL_HIDE_THRESHOLD;
  });
});

onUnmounted(() => {
  unsubscribeScroll?.();
  syncSlideTimer(false);
});
</script>

<template>
  <div :class="[styles.root, className]">
    <div :class="styles.wrapper">
      <motion.div
        :class="styles.ticker"
        :variants="containerVariants"
        initial="initial"
        :animate="isAtTop ? 'animate' : 'initial'"
        @animationComplete="onContainerAnimationComplete"
      >
        <motion.div
          v-for="(slide, index) in SLIDES"
          :key="slide.id"
          :class="[styles.tickerItem, slide.className]"
          :aria-hidden="activeIndex !== index"
          :initial="false"
          :animate="slideAnimate(index)"
          :transition="slideTransition"
        />
      </motion.div>
    </div>
  </div>
</template>
