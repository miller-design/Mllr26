<script setup lang="ts">
/**
 * Homepage.
 */
import { PROJECTS } from "~/data/projects";
import { HERO_LEDE_TEXT } from "~/lib/const";
import { HOME_SEO } from "~/lib/seo";

useSeoMeta({
  title: HOME_SEO.title,
  description: HOME_SEO.description,
  ogTitle: HOME_SEO.shareTitle,
  ogDescription: HOME_SEO.description,
  twitterCard: "summary_large_image",
  twitterTitle: HOME_SEO.shareTitle,
  twitterDescription: HOME_SEO.description,
});

useGeneratedOgImage({
  title: HOME_SEO.shareTitle,
  description: HOME_SEO.description,
});

useSchemaOrg([
  defineWebPage({
    "@type": "ProfilePage",
    name: HOME_SEO.shareTitle,
    description: HOME_SEO.description,
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
