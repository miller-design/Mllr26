<script setup lang="ts">
/**
 * Homepage.
 */
import styles from "./styles.module.css";
// import { PROJECTS } from "~/data/projects";

useSeoMeta({
  title: "Mllr26",
  description:
    "Portfolio of Jack Miller a creative developer based in the East Midlands (UK)",
});
</script>

<template>
  <div :class="styles.page">
    <HeroType />
    <!-- <SitesList :projects="PROJECTS" /> -->
  </div>
</template>
