<script setup lang="ts">
/**
 * Default layout — opaque main scrolls away to reveal the fixed footer.
 *
 * Footer must sit after `<main>` so its spacer is outside main's background.
 */
import styles from "./styles.module.css";
const contactPanelOpen = useState("contact-panel-open", () => false);
const contactPanelHeight = useState("contact-panel-height", () => 0);
const { lock, unlock } = useLenisScroll();

// lock scroll when contact panel is open
watch(contactPanelOpen, () => {
  const isOpen = contactPanelOpen.value;
  if (isOpen) {
    lock();
  } else {
    unlock();
  }
});
</script>

<template>
  <div
    :class="styles.root"
    :style="{ '--contact-panel-height': `${contactPanelHeight}px` }"
  >
    <Header :panelActive="contactPanelOpen" />
    <ContactForm />
    <main :class="[styles.main, contactPanelOpen && styles.contactPanelOpen]">
      <slot />
    </main>
    <Footer />
  </div>
</template>
