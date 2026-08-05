<script setup lang="ts">
/**
 * Project links list. Names containing ® render a full-size CSS circle-R
 * instead of the font’s raised trademark glyph.
 *
 * @param className - Optional class on the root.
 * @param projects - Projects to list.
 * @example
 * <SitesList :projects="PROJECTS" />
 */
import { ref } from "vue";
import styles from "./styles.module.css";
import type { SitesListProps } from "./types";
import type { FeaturedImageRatio, Project } from "~/data/projects";

const { className, projects = [] } = defineProps<SitesListProps>();

/**
 * Featured preview for the hovered list row. Defaults to the first project so
 * smaller screens can reserve a stable image area before any hover. Stays on
 * the last hovered project when the pointer leaves the list.
 *
 * @example
 * activeProject.value // => projects[0] on mount
 */
const activeProject = ref<Project | null>(projects[0] ?? null);

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
</script>

<template>
  <div id="work" :class="[styles.root, className]">
    <ul :class="styles.list">
      <li
        v-for="project in projects"
        :key="project.slug"
        :class="styles.item"
        @mouseenter="activeProject = project"
      >
        <NuxtLink
          :to="{ name: 'projects-slug', params: { slug: project.slug } }"
        >
          <h3>
            <template
              v-for="(segment, index) in nameSegments(project.name)"
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
          </h3>
        </NuxtLink>
      </li>
    </ul>

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
