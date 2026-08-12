<script setup lang="ts">
/**
 * Cookie policy page.
 */
import { COOKIE_SEO, SITE_OG_IMAGE } from "~/lib/seo";

useSeoMeta({
  title: COOKIE_SEO.title,
  description: COOKIE_SEO.description,
  robots: "noindex, follow",
  ogImage: SITE_OG_IMAGE,
  twitterCard: "summary_large_image",
  twitterImage: SITE_OG_IMAGE,
});
</script>

<template>
  <div>
    <h1>Cookie Policy</h1>
  </div>
</template>
