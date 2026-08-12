<script setup lang="ts">
/**
 * Branded Open Graph image for social shares (Satori renderer).
 *
 * Used via `defineOgImage('Mllr', { title, description })`. Props are rendered
 * by nuxt-og-image with the Satori renderer (flex layout only).
 *
 * @param title - Primary headline on the card, e.g. `"Kinfolk"`.
 * @param description - Optional supporting line under the title.
 * @example
 * defineOgImage('Mllr', {
 *   title: 'Kinfolk',
 *   description: 'WordPress, WooCommerce, GSAP',
 * })
 */
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: "Mllr26",
    description:
      "Portfolio of Jack Miller, a creative developer based in the East Midlands (UK).",
  },
);
</script>

<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #111111;
      color: #f5f5f5;
      padding: 72px;
      font-family: 'Special Gothic', sans-serif;
    "
  >
    <div style="display: flex; font-size: 28px; letter-spacing: 0.08em; opacity: 0.7">
      MLLR26
    </div>
    <div style="display: flex; flex-direction: column; gap: 24px">
      <div style="display: flex; font-size: 72px; font-weight: 700; line-height: 1.05">
        {{ title }}
      </div>
      <div
        v-if="description"
        style="
          display: flex;
          font-size: 28px;
          line-height: 1.35;
          opacity: 0.75;
          max-width: 900px;
        "
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>
