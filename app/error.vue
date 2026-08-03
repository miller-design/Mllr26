<script setup lang="ts">
/**
 * App-level error page.
 *
 * @param props.error - Nuxt error with statusCode / statusMessage
 *
 * @example
 * throw createError({ statusCode: 404, statusMessage: 'Not found' })
 */
import type { NuxtError } from '#app'
import styles from './error/styles.module.css'

const props = defineProps<{
  error: NuxtError
}>()

const message = computed(
  () => props.error.statusMessage || props.error.message || 'Something went wrong',
)

/**
 * Clears the error and returns home.
 */
function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div :class="styles.page">
    <p :class="styles.code">{{ error.statusCode || 'Error' }}</p>
    <h1>{{ message }}</h1>
    <button type="button" :class="styles.link" @click="goHome">
      Back home
    </button>
  </div>
</template>
