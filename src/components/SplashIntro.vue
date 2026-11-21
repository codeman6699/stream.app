<script setup>
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits(["finish"]);

const INTRO_DURATION = 1500;
let introTimer;

onMounted(() => {
  introTimer = window.setTimeout(() => {
    emit("finish");
  }, INTRO_DURATION);
});

onUnmounted(() => {
  window.clearTimeout(introTimer);
});
</script>

<template>
  <section
    class="splash-screen"
    role="status"
    aria-label="Stream.store is loading"
  >
    <img
      class="splash-image"
      src="@/assets/stream-intro.png"
      alt="Stream.store — Download Free Agasobanuye Series and Movies — kubuntu"
      fetchpriority="high"
    />

    <div class="splash-progress" aria-hidden="true">
      <span class="splash-progress-fill"></span>
    </div>
  </section>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 999999;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(22px, 4vh, 38px);
  padding: clamp(18px, 4vw, 48px);
  overflow: hidden;
  background: #000;
}

.splash-image {
  display: block;
  width: min(100%, 1100px);
  max-height: 78vh;
  max-height: 78dvh;
  object-fit: contain;
  animation: splash-logo-in 900ms cubic-bezier(.2, .75, .25, 1) both;
}

.splash-progress {
  width: min(190px, 42vw);
  height: 3px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, .18);
}

.splash-progress-fill {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #8b22ff, #f000a8, #ffb800);
  transform: scaleX(0);
  transform-origin: left center;
  animation: splash-loading 3.35s linear forwards;
}

@keyframes splash-logo-in {
  from {
    opacity: 0;
    transform: scale(.88);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes splash-loading {
  to {
    transform: scaleX(1);
  }
}

@media (max-width: 600px) {
  .splash-image {
    width: 100%;
    max-height: 62vh;
    max-height: 62dvh;
  }
}

@media (prefers-reduced-motion: reduce) {
  .splash-image,
  .splash-progress-fill {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
