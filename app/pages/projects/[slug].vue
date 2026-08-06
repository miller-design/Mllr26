<script setup lang="ts">
/**
 * Dynamic project template.
 */
import { getProjectBySlug } from "~/data/projects";

const { slug } = useRoute().params;
const project = getProjectBySlug(slug as string);

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: "Project not found",
  });
}

const sizeOverride = computed(() => {
  if (project.name === "Huxley Parlour") {
    return "small";
  } else if (project.name === "Assemblage") {
    return "medium";
  } else {
    return undefined;
  }
});

const targetFolder = computed(() => {
  return project.slug;
});
</script>

<template>
  <div>
    <ProjectHero :title="project.name" :sizeOverride="sizeOverride" />
    <div class="grid">
      <ProjectDetails :project="project" />
      <ProjectGallery :slug="targetFolder" />
    </div>
  </div>
</template>
