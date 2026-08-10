<script setup lang="ts">
import { VueLenis } from "lenis/vue";
import { cancelFrame, frame } from "motion-v";
import { onMounted, onUnmounted, ref } from "vue";

const lenisRef = ref();
const lenisOptions = {
  autoRaf: false,
  lerp: 0.1,
  duration: 1.2,
};

function update({ timestamp }: { timestamp: number }) {
  lenisRef.value?.lenis?.raf(timestamp);
}

onMounted(() => {
  frame.update(update, true);
});

onUnmounted(() => {
  cancelFrame(update);
});
</script>

<template>
  <VueLenis ref="lenisRef" root :options="lenisOptions" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
