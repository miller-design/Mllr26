<script setup lang="ts">
import styles from "./styles.module.css";
import type { HeaderProps } from "./types";
import BracketIcon from "~/assets/icons/bracket.svg";

const { className } = defineProps<HeaderProps>();
const route = useRoute();
const contactPanelOpen = useState("contact-panel-open", () => false);

/**
 * Whether the current route is the home page.
 * Recomputes on client-side navigation so the header can hide itself on `/`.
 *
 * @example
 * // On `/` → true; on `/projects/foo` → false
 * const isHome = computed(() => route.path === "/");
 */
const isHome = computed(() => route.path === "/");

function onContact() {
  contactPanelOpen.value = !contactPanelOpen.value;
}
</script>

<template>
  <div
    :class="[
      styles.root,
      !isHome && styles.notHome,
      panelActive && styles.panelActive,
      className,
    ]"
  >
    <div :class="styles.wrapper">
      <div :class="styles.linkList">
        <div :class="styles.bracketIcons">
          <BracketIcon />
          <BracketIcon :class="styles.reverse" />
        </div>
        <NuxtLink to="/" :class="styles.link">Home</NuxtLink>
      </div>
      <button
        :class="[
          styles.contactButton,
          contactPanelOpen && styles.contactButtonOpen,
        ]"
        type="button"
        @click="onContact"
      >
        {{ contactPanelOpen ? "Close" : "Contact" }}<span></span>
      </button>
    </div>
  </div>
</template>
