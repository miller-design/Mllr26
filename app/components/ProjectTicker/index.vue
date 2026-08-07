<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { motion, useReducedMotion, useScroll } from "motion-v";
import BracketIcon from "~/assets/icons/bracket.svg";
import {
  PROJECTS,
  type FeaturedImageRatio,
  type Project,
} from "~/data/projects";
import styles from "./styles.module.css";
import type { ProjectTickerProps } from "./types";

/** How many random project images to cycle through on each page load. */
const TICKER_SLIDE_COUNT = 4;

interface TickerSlide {
  project: Project;
  className: string;
}

const ratioClassMap: Record<FeaturedImageRatio, string> = {
  landscape: styles.landscape ?? "",
  portrait: styles.portrait ?? "",
  square: styles.square ?? "",
};

/**
 * Returns a shuffled copy of `projects` with at most `count` entries.
 *
 * @param projects - Full project list to sample from.
 * @param count - Maximum number of projects to return.
 * @returns A random subset, e.g. four projects when `count` is 4.
 * @example
 * pickRandomProjects(PROJECTS, 4) // => [kinfolk, title, hotel-izza, fellowship]
 */
function pickRandomProjects(projects: Project[], count: number): Project[] {
  const pool = [...projects];
  const limit = Math.min(count, pool.length);

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = pool[i];
    const swap = pool[j];

    if (current && swap) {
      pool[i] = swap;
      pool[j] = current;
    }
  }

  return pool.slice(0, limit);
}

/**
 * Builds ticker slides from a random subset of projects on load.
 *
 * @param projects - All site projects to sample from.
 * @returns Slides with each project's ratio class for sizing.
 * @example
 * buildTickerSlides(PROJECTS)
 * // => [{ project: kinfolk, className: "..." }, ...]
 */
function buildTickerSlides(projects: Project[]): TickerSlide[] {
  return pickRandomProjects(projects, TICKER_SLIDE_COUNT).map((project) => ({
    project,
    className: ratioClassMap[project.featuredImageRatio],
  }));
}

const slides = ref<TickerSlide[]>([]);

/** Dwell time per slide before flicking to the next. */
const INTERVAL_MS = 800;

/** Hide the ticker once scroll passes this many pixels. */
const SCROLL_HIDE_THRESHOLD = 8;

/** Snappy ease — quick settle, almost no linger. */
const SNAP_EASE = [0.26, 0.02, 0.23, 0.94] as const;

/** First paint only — slower reveal on page load. */
const LOAD_TRANSITION = {
  ease: SNAP_EASE,
  duration: 0.7,
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
 * advanceSlide() // slide 0 → 1 → 2 → 3 → 0
 */
function advanceSlide() {
  if (slides.value.length === 0) {
    return;
  }

  activeIndex.value = (activeIndex.value + 1) % slides.value.length;
}

/**
 * Motion target for a slide based on whether it is the active index.
 *
 * @param index - Index of the slide within `slides`.
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
  slides.value = buildTickerSlides(PROJECTS);
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
          v-for="(slide, index) in slides"
          :key="slide.project.slug"
          :class="styles.tickerItem"
          :aria-hidden="activeIndex !== index"
          :initial="false"
          :animate="slideAnimate(index)"
          :transition="slideTransition"
        >
          <div :class="[styles.imageWrapper, slide.className]">
            <img
              :src="slide.project.featuredImage"
              :alt="`${slide.project.name} featured image`"
              :class="styles.image"
            />
          </div>
        </motion.div>
        <div :class="styles.bracketIcons">
          <BracketIcon />
          <BracketIcon :class="styles.reverse" />
        </div>
      </motion.div>
    </div>
  </div>
</template>
