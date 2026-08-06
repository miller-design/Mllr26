<script setup lang="ts">
/**
 * Project links list. Names containing ® render a full-size CSS circle-R
 * instead of the font’s raised trademark glyph. On hover-capable (non-touch)
 * viewports, a spring-driven dot tracks the active row beside the list.
 *
 * @param className - Optional class on the root.
 * @param projects - Projects to list.
 * @example
 * <SitesList :projects="PROJECTS" />
 */
import { motion, useSpring } from "motion-v";
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import styles from "./styles.module.css";
import type { SitesListProps } from "./types";
import type { FeaturedImageRatio, Project } from "~/data/projects";

/** Matches `.indicator` width/height in `styles.module.css`. */
const INDICATOR_SIZE_PX = 6;

const { className, projects = [] } = defineProps<SitesListProps>();

const listRef = ref<HTMLUListElement | null>(null);

/**
 * Featured preview for the hovered list row. Defaults to the first project so
 * smaller screens can reserve a stable image area before any hover. Stays on
 * the last hovered project when the pointer leaves the list.
 *
 * @example
 * activeProject.value // => projects[0] on mount
 */
const activeProject = ref<Project | null>(projects[0] ?? null);

/**
 * Index of the hovered (or default) project. Drives the left-edge indicator.
 *
 * @example
 * activeIndex.value // => 0 on mount
 */
const activeIndex = ref(0);

/**
 * Vertical offset (px) for the active-row indicator, sprung to each new target.
 *
 * @example
 * indicatorY.set(48) // spring toward 48px from the list top
 */
const indicatorY = useSpring(0, {
  visualDuration: 0.35,
  bounce: 0.15,
});

type NameSegment = {
  part: string;
  showMark: boolean;
};

const ratioClassMap: Record<FeaturedImageRatio, string> = {
  landscape: styles.landscape ?? "",
  portrait: styles.portrait ?? "",
  square: styles.square ?? "",
};

/**
 * Maps a featured-image ratio to its CSS module class.
 *
 * @param ratio - `"landscape"`, `"portrait"`, or `"square"`.
 * @returns The matching aspect-ratio class from `styles.module.css`.
 * @example
 * ratioClass("portrait") // => styles.portrait
 */
function ratioClass(ratio: FeaturedImageRatio): string {
  return ratioClassMap[ratio];
}

/**
 * Splits a project name on ® into render segments with a mark flag.
 *
 * @param name - Project display name, e.g. `"Los York ®"`.
 * @returns Parts and whether a CSS ® mark follows each part.
 * @example
 * nameSegments("Los ® Films")
 * // => [{ part: "Los ", showMark: true }, { part: " Films", showMark: false }]
 */
function nameSegments(name: string): NameSegment[] {
  const parts = name.split("®");
  return parts.map((part, index) => ({
    part,
    showMark: index < parts.length - 1,
  }));
}

/**
 * Measures the Y offset that centres the indicator on a list row.
 *
 * @param index - Zero-based project index in the list.
 * @returns Pixel offset from the list top, or `null` if the row is missing.
 * @example
 * measureIndicatorY(2) // => 96
 */
function measureIndicatorY(index: number): number | null {
  const list = listRef.value;
  const item = list?.children[index];

  if (!(item instanceof HTMLElement)) {
    return null;
  }

  return item.offsetTop + item.offsetHeight / 2 - INDICATOR_SIZE_PX / 2;
}

/**
 * Springs (or jumps) the indicator to the vertical centre of a list row.
 *
 * @param index - Zero-based project index to align with.
 * @param immediate - When true, snaps with `jump` instead of springing.
 * @example
 * syncIndicator(1) // spring to the second row
 * syncIndicator(0, true) // snap to the first row (resize / mount)
 */
function syncIndicator(index: number, immediate = false): void {
  const y = measureIndicatorY(index);

  if (y === null) {
    return;
  }

  if (immediate) {
    indicatorY.jump(y);
    return;
  }

  indicatorY.set(y);
}

/**
 * Sets the active project/index from a list-row hover and moves the indicator.
 *
 * @param project - Project bound to the hovered row.
 * @param index - Index of that row in `projects`.
 * @example
 * onItemEnter(projects[1], 1)
 */
function onItemEnter(project: Project, index: number): void {
  activeProject.value = project;
  activeIndex.value = index;
  syncIndicator(index);
}

/**
 * Re-snaps the indicator after layout changes (breakpoints, font size).
 *
 * @example
 * handleResize() // jump to the current active row centre
 */
function handleResize(): void {
  syncIndicator(activeIndex.value, true);
}

onMounted(() => {
  void nextTick(() => {
    syncIndicator(activeIndex.value, true);
  });
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div id="work" :class="[styles.root, className]">
    <div :class="styles.listWrap">
      <motion.span
        v-if="projects.length"
        :class="styles.indicator"
        aria-hidden="true"
        :style="{ y: indicatorY }"
      />
      <ul ref="listRef" :class="styles.list">
        <li
          v-for="(project, index) in projects"
          :key="project.slug"
          :class="styles.item"
          @mouseenter="onItemEnter(project, index)"
        >
          <NuxtLink
            :to="{ name: 'projects-slug', params: { slug: project.slug } }"
          >
            <h3>
              <template
                v-for="(segment, segmentIndex) in nameSegments(project.name)"
                :key="segmentIndex"
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
            </h3>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div
      v-if="activeProject"
      :class="styles.featuredImage"
      aria-hidden="true"
    >
      <div :class="styles.imageFrame">
        <div
          :class="[
            styles.imageWrapper,
            ratioClass(activeProject.featuredImageRatio),
          ]"
        >
          <img
            :src="activeProject.featuredImage"
            :alt="`${activeProject.name} featured image`"
            :class="styles.image"
          />
        </div>
      </div>
    </div>
  </div>
</template>
