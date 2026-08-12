<script setup lang="ts">
import styles from "./styles.module.css";
import type { ProjectGalleryProps } from "./types";
import { getProjectImages } from "~/data/projects";

/**
 * Renders a project's gallery images from `public/projects/{slug}`.
 *
 * Resolves image paths from the static `PROJECT_IMAGES` map based on the
 * `slug` prop (project folder name under `public/projects`).
 *
 * @param props.slug - Project folder slug, e.g. `"hotel-izza"`.
 * @param props.className - Optional extra class on the root element.
 * @example
 * <ProjectGallery slug="hotel-izza" />
 */
const { slug, className } = defineProps<ProjectGalleryProps>();

const images = getProjectImages(slug);
</script>

<template>
  <div :class="[styles.root, className]">
    <ul v-if="images.length" :class="styles.list">
      <li v-for="src in images" :key="src" :class="styles.item">
        <img :src="src" :alt="`${slug} gallery image`" :class="styles.image" />
      </li>
    </ul>
  </div>
</template>
