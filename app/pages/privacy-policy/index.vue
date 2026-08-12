<script setup lang="ts">
/**
 * Privacy policy page.
 */
import { SITE_OG_IMAGE } from "~/lib/const";

useSeoMeta({
  title: "Privacy Policy",
  description:
    "How Mllr26 collects, uses, and protects personal information on this site.",
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
