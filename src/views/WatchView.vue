<template>
  <div class="watch-page">
    <button class="back-btn" @click="router.back()">
      <ArrowLeft :size="20" /><span>Back to Browse</span>
    </button>

    <section class="player-section">
      <div class="video-container">
        <video
          ref="videoEl"
          class="real-player"
          :src="currentVideoUrl"
          :poster="currentContent.image"
          controls
          playsinline
          preload="metadata"
          @timeupdate="onTimeUpdate"
          @loadedmetadata="onLoadedMetadata"
          @play="isPlaying = true"
          @pause="isPlaying = false"
          @ended="onEnded"
        ></video>
        <div v-if="!currentVideoUrl" class="no-video">
          <AlertCircle :size="36" />
          <p>No video source available.</p>
        </div>
      </div>
    </section>

    <section class="details-layout">
      <div class="main-details">
        <div class="title-row">
          <h1>{{ currentContent.title }}</h1>
          <span class="badge-quality">{{ currentContent.quality }}</span>
        </div>
        <div class="meta-row">
          <span class="rating">★ {{ currentContent.rating }}</span>
          <span class="dot"></span>
          <span>{{ currentContent.year }}</span>
          <span class="dot"></span>
          <span>{{ currentContent.type }}</span>
          <span class="dot"></span>
          <span>Agasobanuye</span>
        </div>
        <p class="description">{{ currentContent.info }}. Stream now on Stream.Store.</p>

        <div class="action-buttons">
          <button class="btn-primary" @click="togglePlay">
            <Play v-if="!isPlaying" :size="20" fill="currentColor" />
            <Pause v-else :size="20" fill="currentColor" />
            {{ isPlaying ? 'Pause' : 'Play Now' }}
          </button>
          <button class="btn-secondary" @click="goToDownload">
            <Download :size="20" />Download
          </button>
          <button class="btn-icon" @click="shareContent"><Share2 :size="20" /></button>
          <button class="btn-icon" @click="goToEmbed"><Code2 :size="20" /></button>
        </div>
        <div v-if="resumeHint" class="resume-hint">
          <Clock :size="14" /><span>{{ resumeHint }}</span>
        </div>
      </div>

      <div v-if="currentContent.type === 'Series'" class="episodes-sidebar">
        <div class="sidebar-header">
          <h3>Episodes</h3>
          <select v-model.number="activeSeason" class="season-select">
            <option v-for="s in currentContent.seasons" :key="s.season" :value="s.season">
              Season {{ s.season }}
            </option>
          </select>
        </div>
        <div class="episodes-list">
          <button
            v-for="ep in currentEpisodes" :key="ep.ep"
            class="episode-card" :class="{ active: ep.ep === activeEpisode }"
            @click="selectEpisode(ep.ep)"
          >
            <div class="ep-thumb">
              <img :src="currentContent.image" alt="Thumbnail">
              <span class="ep-num">E{{ ep.ep }}</span>
            </div>
            <div class="ep-info">
              <p>{{ ep.title }}</p>
              <small>{{ ep.duration }}</small>
            </div>
            <Play :size="16" class="ep-play" />
          </button>
        </div>
      </div>

      <div v-else-if="currentContent.parts" class="episodes-sidebar">
        <div class="sidebar-header">
          <h3>Parts</h3>
          <span>{{ currentContent.parts.length }} Parts</span>
        </div>
        <div class="episodes-list">
          <button
            v-for="p in currentContent.parts" :key="p.part"
            class="episode-card" :class="{ active: p.part === activePart }"
            @click="selectPart(p.part)"
          >
            <div class="ep-thumb">
              <img :src="currentContent.image" alt="Thumbnail">
              <span class="ep-num">P{{ p.part }}</span>
            </div>
            <div class="ep-info">
              <p>{{ p.title }}</p>
              <small>{{ p.duration }} • {{ p.quality }}</small>
            </div>
            <Play :size="16" class="ep-play" />
          </button>
        </div>
      </div>
    </section>

    <section class="more-like-this">
      <div class="section-heading">
        <h2><span class="heading-line"></span>More Like This</h2>
      </div>
      <div class="cards">
        <div class="card" v-for="card in relatedContent" :key="card.id" @click="changeVideo(card.id)">
          <img :src="card.image" :alt="card.title" loading="lazy">
          <span class="card-rating">★ {{ card.rating }}</span>
          <span class="card-quality">{{ card.quality }}</span>
          <div class="collection">
            <p>{{ card.title }}</p>
            <span class="card-type" :class="card.type === 'Series' ? 'is-series' : 'is-movie'">{{ card.type }}</span>
            <small>{{ card.info }}</small>
          </div>
        </div>
      </div>
    </section>

    <CommentsSection :content-id="currentContent.id" />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft, Play, Pause, Download, Share2, Code2, AlertCircle, Clock,
} from "lucide-vue-next";
import { allContent, findById } from "@/data/content.js";
import { saveProgress, getProgress } from "@/composables/useWatchHistory.js";
import CommentsSection from "@/components/CommentsSection.vue";

const route = useRoute();
const router = useRouter();

const videoEl = ref(null);
const isPlaying = ref(false);
const currentId = ref(Number(route.params.id) || 1);
const activeSeason = ref(1);
const activeEpisode = ref(1);
const activePart = ref(1);
const resumeHint = ref("");

const currentContent = computed(() => findById(currentId.value) || allContent[0]);

const currentEpisodes = computed(() => {
  if (currentContent.value.type !== "Series") return [];
  const s = currentContent.value.seasons?.find((x) => x.season === activeSeason.value);
  return s?.episodes || [];
});

const currentVideoUrl = computed(() => {
  const c = currentContent.value;
  if (c.type === "Series") {
    const ep = currentEpisodes.value.find((e) => e.ep === activeEpisode.value);
    return ep?.videoUrl || "";
  }
  if (c.parts) {
    const p = c.parts.find((x) => x.part === activePart.value);
    return p?.videoUrl || "";
  }
  return c.videoUrl || "";
});

const relatedContent = computed(() =>
  allContent.filter((i) => i.id !== currentId.value).slice(0, 5)
);

const currentTypeStr = computed(() =>
  currentContent.value.type === "Series" ? "series" : "movie"
);

let lastSaved = 0;
function onTimeUpdate(e) {
  const v = e.target;
  if (!v.duration) return;
  const now = Date.now();
  if (now - lastSaved < 4000) return;
  lastSaved = now;
  saveProgress({
    contentId: currentContent.value.id,
    type: currentTypeStr.value,
    title: currentContent.value.title,
    image: currentContent.value.image,
    season: currentContent.value.type === "Series" ? activeSeason.value : null,
    episode: currentContent.value.type === "Series" ? activeEpisode.value : null,
    part: currentContent.value.parts ? activePart.value : null,
    progress: v.currentTime / v.duration,
  });
}

function tryResume() {
  nextTick(() => {
    if (!videoEl.value) return;
    const p = getProgress(
      currentContent.value.id, currentTypeStr.value,
      currentContent.value.type === "Series" ? activeSeason.value : null,
      currentContent.value.type === "Series" ? activeEpisode.value : null,
      currentContent.value.parts ? activePart.value : null
    );
    if (p > 0.05 && p < 0.95) {
      videoEl.value.currentTime = p * (videoEl.value.duration || 0);
      resumeHint.value = `Resumed at ${Math.floor(p * 100)}%`;
      setTimeout(() => (resumeHint.value = ""), 5000);
    }
  });
}

function onLoadedMetadata() { tryResume(); }

function onEnded() {
  isPlaying.value = false;
  if (currentContent.value.type === "Series") {
    const idx = currentEpisodes.value.findIndex((e) => e.ep === activeEpisode.value);
    if (idx >= 0 && idx < currentEpisodes.value.length - 1) {
      selectEpisode(currentEpisodes.value[idx + 1].ep);
      nextTick(() => videoEl.value?.play());
    }
  }
}

watch(currentContent, (c) => {
  activeSeason.value = c.seasons?.[0]?.season || 1;
  activeEpisode.value = 1;
  activePart.value = 1;
  isPlaying.value = false;
  resumeHint.value = "";
});

watch(() => route.params.id, (newId) => {
  if (newId) {
    currentId.value = Number(newId);
    isPlaying.value = false;
  }
});

function togglePlay() {
  if (!videoEl.value) return;
  if (videoEl.value.paused) videoEl.value.play();
  else videoEl.value.pause();
}

function selectEpisode(ep) {
  activeEpisode.value = ep;
  isPlaying.value = false;
  nextTick(() => tryResume());
}

function selectPart(p) {
  activePart.value = p;
  isPlaying.value = false;
  nextTick(() => tryResume());
}

function goToDownload() {
  router.push(`/download/${currentTypeStr.value}/${currentContent.value.id}`);
}

function goToEmbed() {
  router.push({
    path: `/download/${currentTypeStr.value}/${currentContent.value.id}`,
    query: { tab: "embed" },
  });
}

async function shareContent() {
  const url = `${window.location.origin}/watch/${currentContent.value.id}`;
  try {
    if (navigator.share) {
      await navigator.share({
        title: currentContent.value.title,
        text: `Watch ${currentContent.value.title} on Stream.Store`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  } catch { /* cancelled */ }
}

function changeVideo(id) {
  router.push(`/watch/${id}`);
  currentId.value = id;
  isPlaying.value = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped>
.watch-page { width: 100%; animation: fadeIn 0.4s ease-out; padding-bottom: 60px; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.back-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 16px; margin-bottom: 20px;
  color: #cbd5e1; font-size: 14px; font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 10px;
}
.back-btn:hover { color: #fff; background: rgba(99, 102, 241, 0.2); }
.player-section {
  width: 100%; margin-bottom: 32px;
  border-radius: 20px; overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(129, 140, 248, 0.2);
}
.video-container { position: relative; width: 100%; aspect-ratio: 16 / 9; background: #000; }
.real-player { width: 100%; height: 100%; display: block; background: #000; }
.no-video {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 12px;
  color: #94a3b8; font-size: 13px;
}
.no-video svg { color: #f59e0b; }
.details-layout {
  display: grid; grid-template-columns: 1fr 340px;
  gap: 32px; margin-bottom: 48px;
}
.main-details { display: flex; flex-direction: column; }
.title-row {
  display: flex; align-items: center; gap: 16px;
  margin-bottom: 12px; flex-wrap: wrap;
}
.title-row h1 {
  color: #fff; font-size: clamp(28px, 4vw, 40px);
  font-weight: 850; letter-spacing: -1px;
}
.badge-quality {
  padding: 4px 10px; color: #c7d2fe; font-size: 12px; font-weight: 700;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(129, 140, 248, 0.4); border-radius: 8px;
}
.meta-row {
  display: flex; align-items: center; flex-wrap: wrap; gap: 10px;
  margin-bottom: 20px; color: #cbd5e1; font-size: 14px;
}
.rating { color: #fde68a; font-weight: 700; }
.dot { width: 4px; height: 4px; background: #64748b; border-radius: 50%; }
.description {
  color: #94a3b8; font-size: 15px; line-height: 1.7;
  margin-bottom: 28px; max-width: 800px;
}
.action-buttons { display: flex; flex-wrap: wrap; gap: 12px; }
.btn-primary, .btn-secondary {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  padding: 14px 28px; font-size: 15px; font-weight: 700;
  border-radius: 12px; transition: all 0.2s ease;
}
.btn-primary {
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: none; box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);
}
.btn-primary:hover { transform: translateY(-2px); }
.btn-secondary {
  color: #e2e8f0; background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.3);
}
.btn-secondary:hover { background: rgba(99, 102, 241, 0.15); }
.btn-icon {
  display: flex; align-items: center; justify-content: center;
  width: 50px; height: 50px; color: #e2e8f0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.3); border-radius: 12px;
}
.btn-icon:hover { background: rgba(99, 102, 241, 0.2); color: #fff; }
.resume-hint {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 14px; padding: 6px 12px;
  color: #a5b4fc; font-size: 12px; font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.3); border-radius: 999px;
}
.episodes-sidebar {
  background: linear-gradient(145deg, rgba(21, 27, 50, 0.8), rgba(13, 18, 36, 0.8));
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 16px; padding: 20px;
  height: fit-content; max-height: 600px;
  display: flex; flex-direction: column;
}
.sidebar-header {
  display: flex; align-items: center; justify-content: space-between;
  gap: 10px; margin-bottom: 16px; padding-bottom: 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}
.sidebar-header h3 { color: #fff; font-size: 18px; font-weight: 750; }
.sidebar-header span { color: #94a3b8; font-size: 12px; }
.season-select {
  padding: 6px 10px; color: #e2e8f0; font-size: 12px; font-weight: 600;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.4);
  border-radius: 8px; outline: none; cursor: pointer;
}
.season-select option { color: #0f172a; background: #f8fafc; }
.episodes-list {
  display: flex; flex-direction: column; gap: 10px;
  overflow-y: auto; padding-right: 5px;
}
.episode-card {
  display: flex; align-items: center; gap: 12px;
  padding: 8px; background: transparent;
  border: 1px solid transparent; border-radius: 12px;
  text-align: left; transition: all 0.2s ease;
}
.episode-card:hover { background: rgba(255, 255, 255, 0.04); }
.episode-card.active {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(129, 140, 248, 0.4);
}
.ep-thumb {
  position: relative; width: 100px; height: 56px;
  flex-shrink: 0; border-radius: 8px; overflow: hidden;
}
.ep-thumb img { width: 100%; height: 100%; object-fit: cover; }
.ep-num {
  position: absolute; bottom: 4px; left: 4px;
  padding: 2px 6px; color: #fff; font-size: 10px; font-weight: 700;
  background: rgba(0, 0, 0, 0.7); border-radius: 4px;
}
.ep-info { flex: 1; overflow: hidden; }
.ep-info p {
  color: #fff; font-size: 13px; font-weight: 600;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  margin-bottom: 4px;
}
.ep-info small { color: #94a3b8; font-size: 11px; }
.ep-play { color: #818cf8; opacity: 0; transition: opacity 0.2s ease; }
.episode-card:hover .ep-play,
.episode-card.active .ep-play { opacity: 1; }
.more-like-this { width: 100%; margin-bottom: 32px; }
.section-heading { margin-bottom: 22px; }
.section-heading h2 {
  display: flex; align-items: center; gap: 12px;
  color: #f8fafc; font-size: 21px; font-weight: 750;
}
.heading-line {
  display: inline-block; width: 5px; height: 29px;
  background: linear-gradient(180deg, #818cf8, #7c3aed); border-radius: 8px;
}
.cards {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px; width: 100%;
}
.card {
  position: relative; display: flex; flex-direction: column;
  overflow: hidden;
  background: linear-gradient(145deg, #151b32, #0d1224);
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 16px; cursor: pointer;
  transition: all 0.35s ease;
}
.card:hover { transform: translateY(-5px); border-color: rgba(129, 140, 248, 0.8); }
.card > img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.collection { padding: 12px; background: linear-gradient(180deg, rgba(21, 27, 50, 0.96), #0d1224); }
.collection p {
  color: #f8fafc; font-size: 13px; font-weight: 700;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  margin-bottom: 4px;
}
.collection small {
  display: block; color: #a5b4fc; font-size: 10px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.card-rating, .card-quality {
  position: absolute; top: 8px; z-index: 2;
  padding: 3px 7px; font-size: 10px; font-weight: 700;
  border-radius: 6px;
}
.card-rating { left: 8px; color: #fde68a; background: rgba(15, 23, 42, 0.75); }
.card-quality { right: 8px; color: #c7d2fe; background: rgba(99, 102, 241, 0.35); }
.card-type {
  display: inline-block; padding: 2px 6px; margin: 4px 0;
  font-size: 9px; font-weight: 700; text-transform: uppercase;
  border-radius: 4px;
}
.card-type.is-movie { color: #a7f3d0; background: rgba(16, 185, 129, 0.18); }
.card-type.is-series { color: #fbcfe8; background: rgba(219, 39, 119, 0.18); }
@media (max-width: 1000px) {
  .details-layout { grid-template-columns: 1fr; }
  .episodes-sidebar { max-height: 400px; }
}
@media (max-width: 650px) {
  .title-row { flex-direction: column; align-items: flex-start; }
  .action-buttons { flex-direction: column; }
  .btn-primary, .btn-secondary { width: 100%; }
  .btn-icon { width: 100%; height: 48px; }
  .cards { grid-template-columns: repeat(2, 1fr); }
}
</style>