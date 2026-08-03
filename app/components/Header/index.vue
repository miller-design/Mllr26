<script setup lang="ts">
/**
 * Site header with brand and primary nav.
 */
import styles from './styles.module.css'
import type { HeaderLink } from './types'

const config = useRuntimeConfig()
const siteName = computed(() => config.public.siteName)
const route = useRoute()

const links: HeaderLink[] = [
  { to: '/', label: 'Home' },
]

/**
 * Whether a nav link matches the current route.
 *
 * @param to - Link path
 * @returns True when the link should appear active
 *
 * @example
 * isActive('/') // true on the homepage
 */
function isActive(to: string): boolean {
  return route.path === to
}
</script>

<template>
  <header :class="styles.header">
    <div :class="styles.inner">
      <NuxtLink to="/" :class="styles.brand">
        {{ siteName }}
      </NuxtLink>
      <nav :class="styles.nav" aria-label="Primary">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="[styles.link, isActive(link.to) ? styles.active : undefined]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
