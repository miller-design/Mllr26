<script setup lang="ts">
/**
 * Homepage.
 */
import { PROJECTS } from "~/data/projects";

useSeoMeta({
  title: "Mllr26",
  description:
    "Portfolio of Jack Miller a creative developer based in the East Midlands (UK)",
});

const ledeText = {
  title:
    "I am a creative developer building intentional, high performing digital experiences.",
  text: "With a background shaping experiences at studios like <a href='https://theoneoff.com/' target='_blank'>TheOneOff</a> [current] and <a href='https://www.madebysix.com/' target='_blank'>Madebysix</a>, I specialize in turning complex designs into fluid, responsive code. From interactive animations to full-scale web platforms or apps, I focus on the details that make the digital world feel alive.",
};
</script>

<template>
  <div>
    <HeroType />
    <LedeText :title="ledeText.title" :text="ledeText.text" />
    <SitesList :projects="PROJECTS" />
  </div>
</template>
