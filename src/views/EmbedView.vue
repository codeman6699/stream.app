<template>
  <div class="embed-page">
    <div v-if="loading" class="embed-error">
      <p>Loading player...</p>
    </div>

    <div v-else-if="!content" class="embed-error">
      <AlertCircle :size="30" />
      <p>Content not found</p>
    </div>

    <template v-else>
      <div class="embed-player">
        <video
          :key="videoUrl"
          ref="videoEl"
          :src="videoUrl"
          :poster="content.image"
          controls
          playsinline
          preload="metadata"
          @timeupdate="onTimeUpdate"
        ></video>

        <div v-if="!videoUrl" class="embed-no-video">
          <AlertCircle :size="25" />
          <p>No video source is available.</p>
        </div>
      </div>

      <div class="embed-bar">
        <span class="embed-title">{{ content.title }}</span>
        <a :href="watchUrl" target="_blank" rel="noopener noreferrer" class="embed-cta">
          Watch on Stream.Store →
        </a>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { AlertCircle } from "lucide-vue-next";

import { getPublicContent } from "@/utils/adminContent.js";
import { saveProgress } from "@/composables/useWatchHistory.js";

const route = useRoute();

const videoEl = ref(null);
const allContent = ref([]);
const loading = ref(true);

const content = computed(() => {
  const item = allContent.value.find(
    (entry) => Number(entry.id) === Number(route.params.id)
  );

  if (!item) return null;

  const expectedType = item.type === "Series" ? "series" : "movie";

  if (route.params.type !== expectedType) return null;

  return item;
});

const firstSeason = computed(() => (
  content.value?.seasons?.[0] || null
));

const firstEpisode = computed(() => (
  firstSeason.value?.episodes?.[0] || null
));

const videoUrl = computed(() => {
  if (!content.value) return "";

  if (content.value.type === "Series") {
    return firstEpisode.value?.videoUrl ||
      firstEpisode.value?.sourceUrl ||
      "";
  }

  return content.value.videoUrl || "";
});

const watchUrl = computed(() => (
  content.value
    ? `${window.location.origin}/watch/${content.value.id}`
    : "/"
));

let lastSaved = 0;

function onTimeUpdate(event) {
  if (!content.value) return;

  const video = event.target;
  if (!video.duration) return;

  const now = Date.now();
  if (now - lastSaved < 5000) return;

  lastSaved = now;

  saveProgress({
    contentId: content.value.id,
    type: content.value.type === "Series" ? "series" : "movie",
    title: content.value.title,
    image: content.value.image,
    season: content.value.type === "Series"
      ? firstSeason.value?.season || 1
      : null,
    episode: content.value.type === "Series"
      ? firstEpisode.value?.ep || 1
      : null,
    progress: video.currentTime / video.duration,
  });
}

async function loadContent() {
  loading.value = true;

  try {
    allContent.value = await getPublicContent();
  } catch (error) {
    console.error("Unable to load embed content:", error);
    allContent.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(loadContent);
</script>

<style scoped>
.embed-page {
  width: 100%;
  min-height: 100vh;
  color: #fff;
  background: #05070d;
}

.embed-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}

.embed-player video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}

.embed-no-video {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 10px;
  color: #94a3b8;
  pointer-events: none;
}

.embed-bar {
  min-height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding: 12px 16px;
  background: #111827;
  border-top: 1px solid #263247;
}

.embed-title {
  overflow: hidden;
  color: #e5e7eb;
  font-size: 13px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.embed-cta {
  flex-shrink: 0;
  color: #93c5fd;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

.embed-cta:hover {
  color: #fff;
}

.embed-error {
  min-height: 100vh;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 12px;
  color: #94a3b8;
  background: #05070d;
}

@media (max-width: 480px) {
  .embed-bar {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>