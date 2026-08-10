<script setup lang="ts">
import type Lenis from "lenis";
import { VueLenis } from "lenis/vue";
import { cancelFrame, frame } from "motion-v";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { setRootLenis } from "~/composables/useLenisScroll";

const lenisRef = ref<{ lenis?: Lenis }>();
const lenisOptions = {
  autoRaf: false,
  lerp: 0.1,
  duration: 1.2,
};

function update({ timestamp }: { timestamp: number }) {
  lenisRef.value?.lenis?.raf(timestamp);
}

/**
 * Keep the shared root Lenis ref in sync so useLenisScroll works
 * outside setup (router scrollBehavior).
 */
watch(
  () => lenisRef.value?.lenis,
  (instance) => {
    setRootLenis(instance);
  },
  { immediate: true },
);

onMounted(() => {
  frame.update(update, true);
});

onUnmounted(() => {
  setRootLenis(undefined);
  cancelFrame(update);
});
</script>

<template>
  <VueLenis ref="lenisRef" root :options="lenisOptions" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
