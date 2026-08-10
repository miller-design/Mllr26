<script setup lang="ts">
import styles from "./styles.module.css";
import type { ProjectDetailsProps } from "./types";

const { project, className } = defineProps<ProjectDetailsProps>();
</script>

<template>
  <div :class="[styles.root, className]">
    <div :class="styles.content">
      <p :class="styles.description" v-if="project.description">
        <span :class="styles.label">Description:</span>
        <span v-html="parseRichText(project.description)"></span>
      </p>
      <ul :class="styles.features">
        <span :class="styles.label">Tech:</span>
        <li v-for="feature in project.features" :key="feature">
          {{ feature }}
        </li>
      </ul>
      <p :class="styles.designer">
        <span :class="styles.label">Designed by: </span>
        <NuxtLink
          :to="project.designer.link"
          target="_blank"
          rel="noopener noreferrer"
          >{{ project.designer.name }}</NuxtLink
        >
      </p>
      <p :class="styles.year">
        <span :class="styles.label">Developed in: </span>{{ project.year }}
      </p>
      <NuxtLink
        v-if="project.link"
        :to="project.link"
        target="_blank"
        rel="noopener noreferrer"
        :class="styles.liveLink"
        >Live Site</NuxtLink
      >
    </div>
  </div>
</template>
