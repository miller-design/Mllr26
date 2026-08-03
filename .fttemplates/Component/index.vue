<script setup lang="ts">
import styles from './styles.module.css'
import type { <FTName>Props } from './types'

const { className } = defineProps<<FTName>Props>()
</script>

<template>
  <div :class="[styles.root, className]">
    <!-- TODO -->
  </div>
</template>
