<script setup lang="ts">
/**
 * Default layout — opaque main scrolls away to reveal the fixed footer.
 *
 * Footer must sit after `<main>` so its spacer is outside main's background.
 */
import styles from "./styles.module.css";
</script>

<template>
  <div :class="styles.root">
    <Header />
    <main :class="styles.main">
      <slot />
    </main>
    <Footer />
  </div>
</template>
