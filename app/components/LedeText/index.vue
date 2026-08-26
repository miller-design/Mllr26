<script setup lang="ts">
/**
 * Homepage lede: primary H1 plus supporting rich-text paragraph.
 *
 * @param title - Visible H1 copy (keyword-relevant topical headline).
 * @param text - Supporting HTML-ish string parsed by `parseRichText`.
 * @param className - Optional class on the root wrapper.
 *
 * @example
 * <LedeText
 *   title="I am a full-stack developer building intentional experiences."
 *   text="With a background at studios like <a href='…'>Six</a>…"
 * />
 */
import { computed } from "vue";
import { parseRichText } from "~/utils/parseRichText";
import styles from "./styles.module.css";
import type { LedeTextProps } from "./types";

const { title, text, className } = defineProps<LedeTextProps>();

const parsedText = computed(() => parseRichText(text));
</script>

<template>
  <div :class="[styles.root, className]">
    <h1 :class="styles.title">{{ title }}</h1>
    <p :class="styles.text" v-html="parsedText" />
  </div>
</template>
