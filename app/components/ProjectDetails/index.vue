<script setup lang="ts">
import styles from "./styles.module.css";
import type { ProjectDetailsProps } from "./types";

const { project, className } = defineProps<ProjectDetailsProps>();
</script>

<template>
  <div :class="[styles.root, className]">
    <div :class="styles.content">
      <ul :class="styles.features">
        <span>Tech:</span>
        <li v-for="feature in project.features" :key="feature">
          {{ feature }}
        </li>
      </ul>
      <p :class="styles.description">
        <span>Description:</span> {{ project.description }}
      </p>
      <p :class="styles.designer">
        <span>Designed by: </span>
        <NuxtLink
          :to="project.designer.link"
          target="_blank"
          rel="noopener noreferrer"
          >{{ project.designer.name }}</NuxtLink
        >
      </p>
      <p :class="styles.year"><span>Developed in: </span>{{ project.year }}</p>
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
