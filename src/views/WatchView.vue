<template>
  <div class="watch-page">
    <button class="back-btn" @click="router.back()">
      <ArrowLeft :size="20" />
      <span>Back to Browse</span>
    </button>

    <div v-if="loading" class="watch-message">
      <p>Loading video...</p>
    </div>

    <div v-else-if="loadError || !currentContent" class="watch-message">
      <AlertCircle :size="36" />
      <h2>Content not found</h2>
      <p>{{ loadError || "This movie or series may have been removed." }}</p>
      <button class="btn-primary" @click="router.push('/browse')">
        Browse content
      </button>
    </div>

    <template v-else>
      <section class="player-section">
        <div class="video-container">
          <video
            :key="currentVideoUrl"
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
            <p>No video source available for this selection.</p>
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
            <span class="rating">★ {{ currentContent.rating || "—" }}</span>
            <span class="dot"></span>
            <span>{{ currentContent.year || "—" }}</span>
            <span class="dot"></span>
            <span>{{ currentContent.type }}</span>
            <span v-if="currentContent.genre" class="dot"></span>
            <span>{{ currentContent.genre }}</span>
          </div>

          <p class="description">
            {{ currentContent.info || "Watch now on Stream.Store." }}
          </p>

          <div class="action-buttons">
            <button class="btn-primary" @click="togglePlay" :disabled="!currentVideoUrl">
              <Play v-if="!isPlaying" :size="20" fill="currentColor" />
              <Pause v-else :size="20" fill="currentColor" />
              {{ isPlaying ? "Pause" : "Play Now" }}
            </button>

            <button class="btn-secondary" @click="goToDownload">
              <Download :size="20" />
              Download
            </button>

            <button class="btn-icon" @click="shareContent" aria-label="Share">
              <Share2 :size="20" />
            </button>

            <button class="btn-icon" @click="goToEmbed" aria-label="Embed">
              <Code2 :size="20" />
            </button>
          </div>

          <div v-if="resumeHint" class="resume-hint">
            <Clock :size="14" />
            <span>{{ resumeHint }}</span>
          </div>
        </div>

        <div
          v-if="currentContent.type === 'Series' && currentContent.seasons.length"
          class="episodes-sidebar"
        >
          <div class="sidebar-header">
            <h3>Episodes</h3>

            <select v-model.number="activeSeason" class="season-select">
              <option
                v-for="season in currentContent.seasons"
                :key="season.season"
                :value="season.season"
              >
                Season {{ season.season }}
              </option>
            </select>
          </div>

          <div class="episodes-list">
            <button
              v-for="episode in currentEpisodes"
              :key="`${activeSeason}-${episode.ep}`"
              class="episode-card"
              :class="{ active: episode.ep === activeEpisode }"
              @click="selectEpisode(episode.ep)"
            >
              <div class="ep-thumb">
                <img :src="currentContent.image" alt="Episode thumbnail">
                <span class="ep-num">E{{ episode.ep }}</span>
              </div>

              <div class="ep-info">
                <p>{{ episode.title }}</p>
                <small>{{ episode.duration || `Episode ${episode.ep}` }}</small>
              </div>

              <Play :size="16" class="ep-play" />
            </button>

            <p v-if="!currentEpisodes.length" class="no-episodes">
              No episodes have been added to this season yet.
            </p>
          </div>
          <div v-if="currentContent.seasons.length" class="episode-navigation">
            <button type="button" :disabled="!hasPreviousEpisode" @click="navigateEpisode(-1)">Previous episode</button>
            <button type="button" :disabled="!hasNextEpisode" @click="navigateEpisode(1)">Next episode</button>
          </div>
        </div>
      </section>

      <section class="more-like-this" v-if="relatedContent.length">
        <div class="section-heading">
          <h2><span class="heading-line"></span>More Like This</h2>
        </div>

        <div class="cards">
          <div
            class="card"
            v-for="card in relatedContent"
            :key="card.id"
            @click="changeVideo(card.id)"
          >
            <img :src="card.image" :alt="card.title" loading="lazy">
            <span class="card-rating">★ {{ card.rating }}</span>
            <span class="card-quality">{{ card.quality }}</span>

            <div class="collection">
              <p>{{ card.title }}</p>
              <span
                class="card-type"
                :class="card.type === 'Series' ? 'is-series' : 'is-movie'"
              >
                {{ card.type }}
              </span>
              <small>{{ card.info }}</small>
            </div>
          </div>
        </div>
      </section>

      <CommentsSection :content-id="currentContent.id" />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  ArrowLeft,
  Play,
  Pause,
  Download,
  Share2,
  Code2,
  AlertCircle,
  Clock,
} from "lucide-vue-next";

import { getPublicContent } from "@/utils/adminContent.js";
import {
  saveProgress,
  getProgress,
} from "@/composables/useWatchHistory.js";

import CommentsSection from "@/components/CommentsSection.vue";

const route = useRoute();
const router = useRouter();

const videoEl = ref(null);
const isPlaying = ref(false);
const loading = ref(true);
const loadError = ref("");
const allContent = ref([]);

const currentId = ref(Number(route.params.id) || 0);
const activeSeason = ref(1);
const activeEpisode = ref(1);
const resumeHint = ref("");
let preserveEpisodeAfterSeasonChange = false;

const currentContent = computed(() => {
  return allContent.value.find(
    (item) => Number(item.id) === Number(currentId.value)
  ) || null;
});

const currentEpisodes = computed(() => {
  if (currentContent.value?.type !== "Series") return [];

  const season = currentContent.value.seasons.find(
    (item) => Number(item.season) === Number(activeSeason.value)
  );

  return season?.episodes || [];
});

const currentEpisode = computed(() => {
  return currentEpisodes.value.find(
    (episode) => Number(episode.ep) === Number(activeEpisode.value)
  ) || null;
});

const orderedEpisodes = computed(() => currentContent.value?.seasons
  .flatMap((season) => season.episodes.map((episode) => ({ ...episode, season: season.season }))) || []);
const currentEpisodeIndex = computed(() => orderedEpisodes.value.findIndex((episode) =>
  Number(episode.season) === Number(activeSeason.value) && Number(episode.ep) === Number(activeEpisode.value)
));
const hasPreviousEpisode = computed(() => currentEpisodeIndex.value > 0);
const hasNextEpisode = computed(() => currentEpisodeIndex.value >= 0 && currentEpisodeIndex.value < orderedEpisodes.value.length - 1);

const currentVideoUrl = computed(() => {
  if (!currentContent.value) return "";

  if (currentContent.value.type === "Series") {
    return currentEpisode.value?.videoUrl ||
      currentEpisode.value?.sourceUrl ||
      "";
  }

  return currentContent.value.videoUrl || "";
});

const relatedContent = computed(() => {
  if (!currentContent.value) return [];

  return allContent.value
    .filter((item) => (
      Number(item.id) !== Number(currentId.value) &&
      item.type === currentContent.value.type
    ))
    .slice(0, 5);
});

const currentTypeStr = computed(() => (
  currentContent.value?.type === "Series" ? "series" : "movie"
));

async function loadContent() {
  loading.value = true;
  loadError.value = "";

  try {
    allContent.value = await getPublicContent();

    if (!currentContent.value) {
      loadError.value = "The requested movie or series could not be found.";
    }
  } catch (error) {
    console.error("Unable to load watch content:", error);
    loadError.value =
      error.response?.data?.error ||
      "Unable to connect to the content server.";
  } finally {
    loading.value = false;
  }
}

let lastSaved = 0;

function onTimeUpdate(event) {
  const video = event.target;

  if (!currentContent.value || !video.duration) return;

  const now = Date.now();
  if (now - lastSaved < 4000) return;

  lastSaved = now;

  saveProgress({
    contentId: currentContent.value.id,
    type: currentTypeStr.value,
    title: currentContent.value.title,
    image: currentContent.value.image,
    season: currentContent.value.type === "Series"
      ? activeSeason.value
      : null,
    episode: currentContent.value.type === "Series"
      ? activeEpisode.value
      : null,
    progress: video.currentTime / video.duration,
  });
}

function tryResume() {
  nextTick(() => {
    if (!videoEl.value || !currentContent.value) return;

    const progress = getProgress(
      currentContent.value.id,
      currentTypeStr.value,
      currentContent.value.type === "Series" ? activeSeason.value : null,
      currentContent.value.type === "Series" ? activeEpisode.value : null,
      null
    );

    if (progress > 0.05 && progress < 0.95) {
      const resume = () => {
        if (!videoEl.value) return;

        videoEl.value.currentTime =
          progress * (videoEl.value.duration || 0);

        resumeHint.value = `Resumed at ${Math.floor(progress * 100)}%`;

        window.setTimeout(() => {
          resumeHint.value = "";
        }, 5000);
      };

      if (videoEl.value.duration) {
        resume();
      } else {
        videoEl.value.addEventListener("loadedmetadata", resume, {
          once: true,
        });
      }
    }
  });
}

function onLoadedMetadata() {
  tryResume();
}

function onEnded() {
  isPlaying.value = false;

  if (currentContent.value?.type !== "Series") return;
  if (!hasNextEpisode.value) return;
  navigateEpisode(1);
  nextTick(() => videoEl.value?.play().catch(() => {}));
}

watch(currentContent, (content) => {
  if (!content) return;

  activeSeason.value = content.seasons?.[0]?.season || 1;
  activeEpisode.value = content.seasons?.[0]?.episodes?.[0]?.ep || 1;
  isPlaying.value = false;
  resumeHint.value = "";
});

watch(activeSeason, () => {
  if (preserveEpisodeAfterSeasonChange) {
    preserveEpisodeAfterSeasonChange = false;
    return;
  }
  activeEpisode.value = currentEpisodes.value[0]?.ep || 1;
  isPlaying.value = false;
});

watch(
  () => route.params.id,
  (newId) => {
    if (!newId) return;

    currentId.value = Number(newId);
    isPlaying.value = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
);

function togglePlay() {
  if (!videoEl.value || !currentVideoUrl.value) return;

  if (videoEl.value.paused) {
    videoEl.value.play().catch((error) => {
      console.warn("Playback could not start:", error);
    });
  } else {
    videoEl.value.pause();
  }
}

function selectEpisode(episodeNumber) {
  activeEpisode.value = Number(episodeNumber);
  isPlaying.value = false;
  resumeHint.value = "";
  nextTick(tryResume);
}

function navigateEpisode(direction) {
  const next = orderedEpisodes.value[currentEpisodeIndex.value + direction];
  if (!next) return;
  preserveEpisodeAfterSeasonChange = Number(next.season) !== Number(activeSeason.value);
  activeSeason.value = Number(next.season);
  activeEpisode.value = Number(next.ep);
  isPlaying.value = false;
  resumeHint.value = "";
  nextTick(tryResume);
}

function goToDownload() {
  if (!currentContent.value) return;

  router.push(
    `/download/${currentTypeStr.value}/${currentContent.value.id}`
  );
}

function goToEmbed() {
  if (!currentContent.value) return;

  router.push({
    path: `/embed/${currentTypeStr.value}/${currentContent.value.id}`,
  });
}

async function shareContent() {
  if (!currentContent.value) return;

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
      window.alert("Link copied!");
    }
  } catch {
    // Sharing was cancelled or unavailable.
  }
}

function changeVideo(id) {
  router.push(`/watch/${id}`);
}

onMounted(loadContent);
</script>

<style scoped>
.episode-navigation {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid rgba(148, 163, 184, 0.16);
}
.episode-navigation button {
  flex: 1;
  padding: 9px 10px;
  color: #e2e8f0;
  background: #1d365b;
  border: 1px solid #31517d;
  border-radius: 8px;
  cursor: pointer;
}
.episode-navigation button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>