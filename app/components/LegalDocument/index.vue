<script setup lang="ts">
/**
 * Shared layout for legal / policy pages.
 *
 * Renders a title, last-updated line, and slotted sections styled to the
 * site grid. Use `<template #default>` for policy body content; prefer the
 * exported CSS module classes (`section`, `heading`, `text`, `list`, etc.)
 * via `useCssModule` or by wrapping content that uses `:deep` selectors.
 *
 * @param title - Page heading, e.g. `"Privacy Policy"`.
 * @param updated - Human-readable last-updated date, e.g. `"12 August 2026"`.
 * @param className - Optional class on the root element.
 *
 * @example
 * <LegalDocument title="Cookie Policy" updated="12 August 2026">
 *   <section :class="styles.section">
 *     <h2 :class="styles.heading">Overview</h2>
 *     <p :class="styles.text">…</p>
 *   </section>
 * </LegalDocument>
 */
import styles from "./styles.module.css";
import type { LegalDocumentProps } from "./types";

const { title, updated, className } = defineProps<LegalDocumentProps>();
</script>

<template>
  <article :class="[styles.root, className]">
    <header :class="styles.header">
      <h1 :class="styles.title">{{ title }}</h1>
      <p :class="styles.updated">Last updated: {{ updated }}</p>
    </header>

    <div :class="styles.body">
      <slot :styles="styles" />
    </div>
  </article>
</template>
