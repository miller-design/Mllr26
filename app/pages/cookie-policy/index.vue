<script setup lang="ts">
/**
 * Cookie policy page.
 */
import { COOKIE_SEO } from "~/lib/seo";

useSeoMeta({
  title: COOKIE_SEO.title,
  description: COOKIE_SEO.description,
  robots: "noindex, follow",
  twitterCard: "summary_large_image",
});

useGeneratedOgImage({
  title: COOKIE_SEO.title,
  description: COOKIE_SEO.description,
});
</script>

<template>
  <div>
    <h1>Cookie Policy</h1>
  </div>
</template>
