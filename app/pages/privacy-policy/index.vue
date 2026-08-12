<script setup lang="ts">
/**
 * Privacy policy page.
 */
import { PRIVACY_SEO } from "~/lib/seo";

useSeoMeta({
  title: PRIVACY_SEO.title,
  description: PRIVACY_SEO.description,
  robots: "noindex, follow",
  twitterCard: "summary_large_image",
});

useGeneratedOgImage({
  title: PRIVACY_SEO.title,
  description: PRIVACY_SEO.description,
});
</script>

<template>
  <div>
    <h1>Privacy Policy</h1>
  </div>
</template>
