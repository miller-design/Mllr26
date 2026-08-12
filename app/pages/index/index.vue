<script setup lang="ts">
/**
 * Homepage.
 */
import { PROJECTS } from "~/data/projects";
import { HERO_LEDE_TEXT, SITE_DESCRIPTION, SITE_OG_IMAGE } from "~/lib/const";

useSeoMeta({
  title: "Jack Miller — Creative Developer",
  description: SITE_DESCRIPTION,
  ogTitle: "Mllr26 · Jack Miller",
  ogDescription: SITE_DESCRIPTION,
  ogImage: SITE_OG_IMAGE,
  twitterCard: "summary_large_image",
  twitterTitle: "Mllr26 · Jack Miller",
  twitterDescription: SITE_DESCRIPTION,
  twitterImage: SITE_OG_IMAGE,
});

useSchemaOrg([
  defineWebPage({
    "@type": "ProfilePage",
    name: "Jack Miller — Creative Developer",
    description: SITE_DESCRIPTION,
  }),
]);
</script>

<template>
  <div>
    <ProjectTicker />
    <HeroType />
    <LedeText :title="HERO_LEDE_TEXT.title" :text="HERO_LEDE_TEXT.text" />
    <SitesList :projects="PROJECTS" />
  </div>
</template>
