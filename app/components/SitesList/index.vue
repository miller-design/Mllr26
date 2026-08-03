<script setup lang="ts">
import styles from "./styles.module.css";
import type { SitesListProps } from "./types";

const { className, projects } = defineProps<SitesListProps>();
</script>

<template>
  <div :class="[styles.root, className]">
    <ul>
      <li v-for="project in projects" :key="project.id">
        <NuxtLink :to="{ name: 'projects-id', params: { id: project.id } }">
          <h3>{{ project.name }}</h3>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
