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
import styles from "./styles.module.css";
import type { SitesListProps } from "./types";

const { className, projects } = defineProps<SitesListProps>();

type NameSegment = {
  part: string;
  showMark: boolean;
};

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
      <li v-for="project in projects" :key="project.id" :class="styles.item">
        <NuxtLink :to="{ name: 'projects-id', params: { id: project.id } }">
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
  </div>
</template>
