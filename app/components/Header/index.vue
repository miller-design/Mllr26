<script setup lang="ts">
import styles from "./styles.module.css";
import type { HeaderProps } from "./types";
import BracketIcon from "~/assets/icons/bracket.svg";

const { className } = defineProps<HeaderProps>();
const route = useRoute();

/**
 * Whether the current route is the home page.
 * Recomputes on client-side navigation so the header can hide itself on `/`.
 *
 * @example
 * // On `/` → true; on `/projects/foo` → false
 * const isHome = computed(() => route.path === "/");
 */
const isHome = computed(() => route.path === "/");
</script>

<template>
  <div :class="[styles.root, className]" v-if="!isHome">
    <div :class="styles.wrapper">
      <div :class="styles.linkList">
        <div :class="styles.bracketIcons">
          <BracketIcon />
          <BracketIcon :class="styles.reverse" />
        </div>
        <NuxtLink to="/" :class="styles.link">Home</NuxtLink>
      </div>
    </div>
  </div>
</template>
