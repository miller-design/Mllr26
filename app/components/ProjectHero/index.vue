<script setup lang="ts">
/**
 * Full-bleed project title. Names containing ® render a full-size CSS circle-R
 * instead of the font’s raised trademark glyph.
 *
 * @param title - Project display name, e.g. `"Los York ®"`.
 * @param sizeOverride - Optional size tier bypassing length-based sizing.
 * @param className - Optional class on the root.
 * @example
 * <ProjectHero title="Los York ®" />
 */
import styles from "./styles.module.css";
import type { NameSegment, ProjectHeroProps } from "./types";

const { title, sizeOverride, className } = defineProps<ProjectHeroProps>();

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
</script>

<template>
  <div :class="[styles.root, className]" :style="titleStyle">
    <div :class="[styles.content]">
      <h1 ref="titleRef" :class="[styles.title, fontSize]">
        <template v-for="(segment, index) in nameSegments(title)" :key="index">
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
    </div>
  </div>
</template>
