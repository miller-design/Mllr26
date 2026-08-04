<script setup lang="ts">
/**
 * Homepage.
 */
import { PROJECTS } from "~/data/projects";
import { HERO_LEDE_TEXT } from "~/lib/const";

useSeoMeta({
  title: "Mllr26",
  description:
    "Portfolio of Jack Miller a creative developer based in the East Midlands (UK)",
});
</script>

<template>
  <div>
    <ProjectTicker />
    <HeroType />
    <LedeText :title="HERO_LEDE_TEXT.title" :text="HERO_LEDE_TEXT.text" />
    <SitesList :projects="PROJECTS" />
  </div>
</template>
