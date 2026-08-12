<script setup lang="ts">
/**
 * Cookie policy page.
 */
import { SITE_OG_IMAGE } from "~/lib/const";

useSeoMeta({
  title: "Cookie Policy",
  description:
    "How Mllr26 uses cookies and similar technologies on this site.",
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
