<script setup lang="ts">
/**
 * Site header with brand and primary nav.
 */
import styles from "./styles.module.css";
</script>

<template>
  <header :class="styles.header">
    <div :class="styles.inner">
      <NuxtLink to="/" :class="styles.brand">Mllr26</NuxtLink>
    </div>
  </header>
</template>
