<script setup lang="ts">
/**
 * App-level error page.
 *
 * @param props.error - Nuxt error with status / statusText
 *
 * @example
 * throw createError({ status: 404, statusText: 'Not found' })
 */
import type { NuxtError } from '#app'
import styles from './error/styles.module.css'

const props = defineProps<{
  error: NuxtError
}>()

const message = computed(
  () => props.error.statusText || props.error.message || 'Something went wrong',
)

useSeoMeta({
  title: computed(() => {
    const status = props.error.statusCode || props.error.status || "Error";
    return `${status}`;
  }),
  description: computed(() => message.value),
  robots: "noindex, nofollow",
});

/**
 * Clears the error and returns home.
 */
function goHome() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <div :class="styles.page">
    <p :class="styles.code">{{ error.status || 'Error' }}</p>
    <h1>{{ message }}</h1>
    <button type="button" :class="styles.link" @click="goHome">
      Back home
    </button>
  </div>
</template>
