<script setup lang="ts">
/**
 * Default layout — header, page slot, footer.
 */
import styles from './styles.module.css'
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
