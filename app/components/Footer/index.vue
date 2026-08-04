<script setup lang="ts">
/**
 * Site footer — full-bleed wordmark and legal bar.
 *
 * @param className - Optional class on the root footer element.
 *
 * @example
 * <Footer />
 * <Footer className="layout-footer" />
 */
import styles from "./styles.module.css";
import type { FooterProps } from "./types";
import LogoType from "~/assets/icons/logo-type.svg";
import { FOOTER_LINKS } from "~/lib/const";

const { className } = defineProps<FooterProps>();
const year = new Date().getFullYear();
</script>

<template>
  <footer :class="[styles.root, className]">
    <div :class="styles.wordmark">
      <NuxtLink to="/" :class="styles.wordmarkLink" aria-label="MLLR home">
        <LogoType :class="styles.logoType" />
      </NuxtLink>
    </div>

    <div :class="styles.bar">
      <p :class="styles.copyright">
        &copy;{{ year }} MLLR. All rights reserved.
      </p>
      <ul :class="styles.legal">
        <li v-for="link in FOOTER_LINKS" :key="link.id">
          <NuxtLink :to="link.url" :class="styles.legalLink">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
