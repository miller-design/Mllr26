<script setup lang="ts">
/**
 * Full-bleed project title. Names containing ® render a full-size CSS circle-R
 * instead of the font’s raised trademark glyph. Entrance matches HeroType:
 * spring slide-up from below.
 *
 * @param title - Project display name, e.g. `"Los York ®"`.
 * @param sizeOverride - Optional size tier bypassing length-based sizing.
 * @param className - Optional class on the root.
 * @example
 * <ProjectHero title="Los York ®" />
 */
import { motion } from "motion-v";
import styles from "./styles.module.css";
import type { NameSegment, ProjectHeroProps } from "./types";

const { title, sizeOverride, className } = defineProps<ProjectHeroProps>();

/**
 * Splits a project name around ® so each mark can render as a CSS circle-R.
 *
 * @param name - Display name that may include ®, e.g. `"Los York ®"`.
 * @returns Segments of plain text plus whether a mark follows each part.
 * @example
 * nameSegments("Los York ®")
 * // [{ part: "Los York ", showMark: true }, { part: "", showMark: false }]
 */
function nameSegments(name: string): NameSegment[] {
  const parts = name.split("®");
  return parts.map((part, index) => ({
    part,
    showMark: index < parts.length - 1,
  }));
}

const fontSize = computed(() => {
  if (sizeOverride) {
    return styles[sizeOverride];
  }

  const charCount = title.replaceAll("®", "").length;

  if (charCount <= 7) {
    return styles.xlarge;
  }

  if (charCount <= 11) {
    return styles.large;
  }

  if (charCount <= 14) {
    return styles.medium;
  }

  return styles.small;
});

/**
 * Tracks title height so the root can hang 20% below the viewport via
 * `--title-offset`, matching the static `translateY(20%)` layout offset.
 *
 * @param element - The measured title element.
 * @example
 * observeTitleHeight(titleRef.value)
 */
function observeTitleHeight(element: HTMLElement) {
  const resizeObserver = new ResizeObserver(([entry]) => {
    if (entry) {
      titleHeight.value = entry.contentRect.height;
    }
  });

  resizeObserver.observe(element);

  onUnmounted(() => {
    resizeObserver.disconnect();
  });
}

onMounted(() => {
  if (titleRef.value) {
    observeTitleHeight(titleRef.value);
  }
});

const titleRef = ref<HTMLElement | null>(null);
const titleHeight = ref(0);
const titleStyle = computed(() => ({
  "--title-offset": `${titleHeight.value * 0.2}px`,
}));

/** Same spring slide-up as HeroType logo entrance. */
const titleReveal = {
  initial: {
    y: "120%",
  },
  animate: {
    y: "0%",
    transition: {
      type: "spring",
      visualDuration: 0.5,
      bounce: 0.25,
      delay: 0.4,
    },
  },
};
</script>

<template>
  <div :class="[styles.root, className]" :style="titleStyle">
    <div :class="[styles.content]">
      <div :class="[styles.titleSlot, fontSize]">
        <motion.div
          :variants="titleReveal"
          initial="initial"
          animate="animate"
        >
          <h1 ref="titleRef" :class="styles.title">
            <template
              v-for="(segment, index) in nameSegments(title)"
              :key="index"
            >
              {{ segment.part }}
              <span
                v-if="segment.showMark"
                :class="styles.mark"
                role="img"
                aria-label="registered trademark"
              >
                <span :class="styles.markLetter" aria-hidden="true">R</span>
              </span>
            </template>
          </h1>
        </motion.div>
      </div>
    </div>
  </div>
</template>
