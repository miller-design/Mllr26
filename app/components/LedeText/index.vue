<script setup lang="ts">
import { computed } from "vue";
import { parseRichText } from "~/utils/parseRichText";
import styles from "./styles.module.css";
import type { LedeTextProps } from "./types";

const { title, text, className } = defineProps<LedeTextProps>();

const parsedText = computed(() => parseRichText(text));
</script>

<template>
  <div :class="[styles.root, className]">
    <h2 :class="styles.title">{{ title }}</h2>
    <p :class="styles.text" v-html="parsedText" />
  </div>
</template>
