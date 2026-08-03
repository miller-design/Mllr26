<script setup lang="ts">
/**
 * Dynamic project template.
 */
import { PROJECTS } from "~/data/projects";

const { id } = useRoute().params;
const project = PROJECTS.find(
  (project) => project.id === parseInt(id as string),
);

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: "Project not found",
  });
}
</script>

<template>
  <div>
    <h1>{{ project.name }}</h1>
    <p>Date: {{ project.year }}</p>
    <p>Features: {{ project.features.join(", ") }}</p>
    <p>
      Project Link:
      <NuxtLink
        v-if="project.link"
        :to="project.link"
        target="_blank"
        rel="noopener noreferrer"
        >{{ project.link }}</NuxtLink
      >
    </p>
    <p>
      Designer:
      <a
        v-if="project.designer.link"
        :href="project.designer.link"
        target="_blank"
        rel="noopener noreferrer"
        >{{ project.designer.name }}</a
      >
    </p>
  </div>
</template>
