<script setup lang="ts">
/**
 * Site footer with scroll-linked reveal.
 *
 * Renders as a multi-root fragment: a transparent spacer (for scroll room)
 * plus a fixed shell that slides up and fades its black overlay as main
 * content scrolls away. Must be placed as a sibling after `<main>`.
 *
 * @param className - Optional class on the inner `<footer>` element.
 *
 * @example
 * <main>...</main>
 * <Footer />
 */
import { motion } from "motion-v";
import type { ComponentPublicInstance } from "vue";
import styles from "./styles.module.css";
import type { FooterProps } from "./types";
import { useFooterReveal } from "../../composables/useFooterReveal";
import LogoType from "~/assets/icons/logo-type.svg";
import { FOOTER_LINKS } from "~/lib/const";

const { className } = defineProps<FooterProps>();
const year = new Date().getFullYear();

const footerRef = ref<HTMLElement | ComponentPublicInstance | null>(null);
const spacerRef = ref<HTMLElement | null>(null);

const { footerHeight, y, overlayOpacity, shouldReveal } =
  useFooterReveal({
    footerRef,
    spacerRef,
  });
</script>

<template>
  <!-- Transparent scroll room — must sit outside <main>'s opaque background -->
  <div
    ref="spacerRef"
    :class="styles.spacer"
    :style="{ blockSize: `${footerHeight}px` }"
    aria-hidden="true"
  />

  <!-- Fixed full-viewport background — already in place; opacity only tracks reveal -->
  <motion.div
    v-if="shouldReveal"
    :class="styles.overlay"
    aria-hidden="true"
    :style="{ opacity: overlayOpacity }"
  />

  <motion.div
    ref="footerRef"
    :class="styles.shell"
    :style="shouldReveal ? { y } : undefined"
  >
    <footer :class="[styles.root, className]">
      <div :class="styles.wordmark">
        <NuxtLink to="/" :class="styles.wordmarkLink" aria-label="MLLR home">
          <LogoType :class="styles.logoType" />
        </NuxtLink>
      </div>

      <div :class="styles.bar">
        <p :class="styles.copyright">
          &copy;{{ year }} MLLR. All rights reserved.
        </p>
        <ul :class="styles.legal">
          <li v-for="link in FOOTER_LINKS" :key="link.id">
            <NuxtLink :to="link.url" :class="styles.legalLink">
              {{ link.text }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </footer>
  </motion.div>
</template>
