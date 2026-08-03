<script setup lang="ts">
/**
 * Site footer.
 */
import styles from "./styles.module.css";

const year = new Date().getFullYear();
</script>

<template>
  <footer :class="[styles.footer]">
    <div :class="styles.inner">
      <p>©{{ year }} - Mllr26</p>
    </div>
  </footer>
</template>
