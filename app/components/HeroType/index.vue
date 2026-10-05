<script setup lang="ts">
/**
 * Full-bleed decorative hero wordmark (SVG logo type).
 *
 * The document H1 lives in `LedeText` so the primary heading carries
 * topical SEO copy rather than the brand name alone.
 *
 * @param className - Optional class on the root wrapper.
 *
 * @example
 * <HeroType />
 */
import { motion } from "motion-v";
import LogoType from "~/assets/icons/logo-type.svg";
import styles from "./styles.module.css";
import type { HeroTypeProps } from "./types";

const { className } = defineProps<HeroTypeProps>();

/** Skip replay on browser back/forward; still play on link navigations. */
const playEntrance = usePlayEntrance();

const logoType = {
  initial: {
    y: "120%",
  },
  animate: {
    y: "0%",
    transition: {
      type: "spring",
      visualDuration: 0.5,
      bounce: 0.25,
      delay: 0.4,
    },
  },
};
</script>

<template>
  <div :class="[styles.root, className]">
    <div :class="styles.wrapper" aria-hidden="true">
      <motion.div
        :variants="logoType"
        :initial="playEntrance ? 'initial' : false"
        animate="animate"
      >
        <LogoType :class="styles.logoType" />
      </motion.div>
    </div>
  </div>
</template>
