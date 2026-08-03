<script setup lang="ts">
/**
 * Homepage.
 */
import styles from './styles.module.css'

useSeoMeta({
  title: 'Home',
})

const config = useRuntimeConfig()
</script>

<template>
  <div :class="styles.page">
    <h1>{{ config.public.siteName }}</h1>
    <p :class="styles.lede">
      Bare Nuxt starter with CSS Modules and PostCSS. Add pages, components, and
      server routes as you need them.
    </p>
  </div>
</template>
