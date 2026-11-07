<template>
  <div class="embed-page">
    <div v-if="!content" class="embed-error"><p>Content not found</p></div>
    <template v-else>
      <div class="embed-player">
        <video
          ref="videoEl"
          :src="videoUrl"
          :poster="content.image"
          controls
          playsinline
          autoplay
          preload="metadata"
          @timeupdate="onTimeUpdate"
        ></video>
      </div>
      <div class="embed-bar">
        <span class="embed-title">{{ content.title }}</span>
        <a :href="watchUrl" target="_blank" class="embed-cta">Watch on Stream.Store →</a>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { findById } from "@/data/content.js";
import { saveProgress } from "@/composables/useWatchHistory.js";

const route = useRoute();
const videoEl = ref(null);

const content = computed(() => {
  const id = Number(route.params.id);
  const item = findById(id);
  if (!item) return null;
  const expected = item.type === "Series" ? "series" : "movie";
  if (route.params.type !== expected) return null;
  return item;
});

const videoUrl = computed(() => {
  const c = content.value;
  if (!c) return "";
  if (c.type === "Series") return c.seasons?.[0]?.episodes?.[0]?.videoUrl || "";
  if (c.parts) return c.parts[0]?.videoUrl || "";
  return c.videoUrl || "";
});

const watchUrl = computed(() => `${window.location.origin}/watch/${content.value?.id}`);

let lastSaved = 0;
function onTimeUpdate(e) {
  if (!content.value) return;
  const v = e.target;
  if (!v.duration) return;
  const now = Date.now();
  if (now - lastSaved < 5000) return;
  lastSaved = now;
  saveProgress({
    contentId: content.value.id,
    type: content.value.type === "Series" ? "series" : "movie",
    title: content.value.title,
    image: content.value.image,
    season: content.value.type === "Series" ? 1 : null,
    episode: content.value.type === "Series" ? 1 : null,
    part: content.value.parts ? 1 : null,
    progress: v.currentTime / v.duration,
  });
}
</script>

<style scoped>
.embed-page {
  width: 100vw; min-height: 100vh; background: #000;
  display: flex; flex-direction: column;
  overflow: hidden;
  font-family: 'Segoe UI', system-ui, sans-serif; color: #f8fafc;
}
.embed-player {
  position: relative; width: 100%; flex: 1;
  min-height: 0; display: flex;
  align-items: center; justify-content: center; background: #000;
}
.embed-player video {
  width: 100%; height: 100%; max-height: 100vh;
  object-fit: contain; background: #000; display: block;
}
.embed-bar {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; padding: 10px 16px;
  background: linear-gradient(180deg, rgba(11, 16, 34, 0.85), rgba(11, 16, 34, 0.98));
  border-top: 1px solid rgba(129, 140, 248, 0.2);
}
.embed-title { color: #fff; font-size: 13px; font-weight: 700; }
.embed-cta {
  color: #a5b4fc; font-size: 12px; font-weight: 600;
  text-decoration: none; padding: 6px 12px;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.35); border-radius: 8px;
}
.embed-cta:hover { color: #fff; background: rgba(99, 102, 241, 0.3); }
.embed-error {
  display: flex; align-items: center; justify-content: center;
  width: 100vw; height: 100vh; color: #94a3b8; font-size: 14px;
}
</style>