<script setup lang="ts">
/**
 * Privacy policy page.
 */
import { PRIVACY_SEO, SITE_OG_IMAGE } from "~/lib/seo";

useSeoMeta({
  title: PRIVACY_SEO.title,
  description: PRIVACY_SEO.description,
  robots: "noindex, follow",
  ogImage: SITE_OG_IMAGE,
  twitterCard: "summary_large_image",
  twitterImage: SITE_OG_IMAGE,
});
</script>

<template>
  <div>
    <h1>Privacy Policy</h1>
  </div>
</template>
