<script setup lang="ts">
/**
 * Full-bleed hero title that scales to its container via SVG `textLength`,
 * with a visually hidden h1 for screen readers and SEO.
 *
 * @param title - Heading copy (also drawn inside the SVG).
 * @param className - Optional class on the root wrapper.
 *
 * @example
 * <HeroType title="MLLR26" />
 */
import { motion } from "motion-v";
import styles from "./styles.module.css";
import type { HeroTypeProps } from "./types";
import LogoType from "~/assets/icons/logo-type.svg";

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
    <h1 :class="styles.srOnly">MLLR26</h1>
    <div :class="styles.wrapper">
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
