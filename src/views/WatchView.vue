<template>
  <div class="watch-page">
    <!-- ================= BACK BUTTON ================= -->
    <button class="back-btn" @click="router.back()">
      <ArrowLeft :size="20" />
      <span>Back to Browse</span>
    </button>

    <!-- ================= VIDEO PLAYER SECTION ================= -->
    <section class="player-section">
      <div class="video-container">
        <!-- 
          MOCK PLAYER: 
          Replace this div with your actual <video> or <iframe> (YouTube, Vimeo, etc.) 
        -->
        <div class="mock-player">
          <img :src="currentContent.image" :alt="currentContent.title" class="player-poster">
          <div class="player-overlay">
            <button class="big-play-btn" @click="togglePlay">
              <Pause v-if="isPlaying" :size="40" fill="currentColor" />
              <Play v-else :size="40" fill="currentColor" />
            </button>
            <p class="player-text">{{ isPlaying ? 'Playing...' : 'Click to Play' }}</p>
          </div>
        </div>

        <!-- Video Controls (Mock) -->
        <div class="video-controls">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="controls-row">
            <div class="controls-left">
              <button @click="togglePlay" class="ctrl-btn">
                <Play v-if="!isPlaying" :size="18" fill="currentColor" />
                <Pause v-else :size="18" fill="currentColor" />
              </button>
              <button class="ctrl-btn"><Volume2 :size="18" /></button>
              <span class="time-display">00:00 / 01:45:00</span>
            </div>
            <div class="controls-right">
              <button class="ctrl-btn"><Settings :size="18" /></button>
              <button class="ctrl-btn"><Maximize :size="18" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= MAIN CONTENT (Details & Episodes) ================= -->
    <section class="details-layout">
      <!-- Left Side: Movie Info -->
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

        <p class="description">
          {{ currentContent.info }}. Enjoy this amazing content in stunning {{ currentContent.quality }} quality. 
          Download offline or stream directly on Stream.Store.
        </p>

        <div class="action-buttons">
          <button class="btn-primary" @click="togglePlay">
            <Play v-if="!isPlaying" :size="20" fill="currentColor" />
            <Pause v-else :size="20" fill="currentColor" />
            {{ isPlaying ? 'Pause' : 'Play Now' }}
          </button>
          <button class="btn-secondary">
            <Download :size="20" />
            Download
          </button>
          <button class="btn-icon" aria-label="Add to My List" @click="addToList">
            <Plus :size="20" />
          </button>
        </div>
      </div>

      <!-- Right Side: Episodes Sidebar (Only for Series) -->
      <div v-if="currentContent.type === 'Series'" class="episodes-sidebar">
        <div class="sidebar-header">
          <h3>Episodes</h3>
          <span>{{ currentContent.episodes }} Episodes</span>
        </div>
        
        <div class="episodes-list">
          <button 
            v-for="ep in mockEpisodes" 
            :key="ep.num"
            class="episode-card"
            :class="{ active: ep.num === 1 }"
          >
            <div class="ep-thumb">
              <img :src="currentContent.image" alt="Thumbnail">
              <span class="ep-num">E{{ ep.num }}</span>
            </div>
            <div class="ep-info">
              <p>{{ ep.title }}</p>
              <small>{{ ep.duration }}</small>
            </div>
            <Play :size="16" class="ep-play" />
          </button>
        </div>
      </div>
    </section>

    <!-- ================= MORE LIKE THIS ================= -->
    <section class="more-like-this">
      <div class="section-heading">
        <h2>
          <span class="heading-line"></span>
          More Like This
        </h2>
      </div>

      <div class="cards">
        <div class="card" v-for="card in relatedContent" :key="card.id" @click="changeVideo(card.id)">
          <img :src="card.image" :alt="card.title" loading="lazy">
          <span class="card-rating">★ {{ card.rating }}</span>
          <span class="card-quality">{{ card.quality }}</span>

          <div class="collection">
            <p>{{ card.title }}</p>
            <div class="card-tags">
              <span class="card-type" :class="card.type === 'Series' ? 'is-series' : 'is-movie'">
                {{ card.type }}
              </span>
            </div>
            <small>{{ card.info }}</small>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize,
  Download,
  Plus,
} from "lucide-vue-next";

// Import images (Replace with your actual asset paths)
import lastWarriorImg from "@/assets/5eDgJqnnmYVvE8T72rDST4u0VCq.webp";
import shadowDragonImg from "@/assets/9cWoy2uxaUYtlFLiC11YRC0bPex.webp";
import midnightRevengeImg from "@/assets/ccY2f1o9M8OjFpQb0SVZTuokkYQ.webp";
import scorpionKingImg from "@/assets/oFEHcmPuI95aoeNrWXCVnA4oI5Y.webp";
import ironFistImg from "@/assets/osZ6HJJBPwptZLTXFYbGQ0Jc7WB.webp";
import raudseRusikagaImg from "@/assets/p9x1aME4mFJTeqhKEAYcUCVuzqC.webp";
import extraImg from "@/assets/nGU2cNmKfNk5MNgp7SmlCELvJMo.webp";

const route = useRoute();
const router = useRouter();

// Mock Database (Matches the IDs from your other pages)
const allContent = [
  { id: 1, title: "The Last Warrior", info: "Fantasy • 2021 • Disney Adventure", image: lastWarriorImg, rating: 7.8, quality: "HD", year: 2021, type: "Movie", episodes: null },
  { id: 2, title: "Shadow of the Dragon", info: "Action • 1992 • Crime Thriller", image: shadowDragonImg, rating: 7.2, quality: "HD", year: 1992, type: "Movie", episodes: null },
  { id: 3, title: "Midnight Revenge", info: "Action • 1986 • Hong Kong Crime", image: midnightRevengeImg, rating: 6.9, quality: "HD", year: 1986, type: "Movie", episodes: null },
  { id: 4, title: "Rise of the Warrior", info: "Action • 2008 • The Scorpion King 2", image: scorpionKingImg, rating: 5.8, quality: "HD", year: 2008, type: "Movie", episodes: null },
  { id: 5, title: "Iron Fist Legacy", info: "Martial Arts • 2026 • Agasobanuye by Perfect", image: ironFistImg, rating: 8.4, quality: "4K", year: 2026, type: "Movie", episodes: null },
  { id: 6, title: "Raudse Rusikaga", info: "Drama • 2026 • Estonian Horror", image: raudseRusikagaImg, rating: 7.5, quality: "HD", year: 2026, type: "Movie", episodes: null },
  { id: 7, title: "Bloodline Hunter", info: "Action • 2026 • Agasobanuye by Perfect", image: lastWarriorImg, rating: 8.1, quality: "4K", year: 2026, type: "Movie", episodes: null },
  { id: 8, title: "Crimson Horizon", info: "Sci-Fi • 2025 • Agasobanuye by Kevin", image: shadowDragonImg, rating: 7.9, quality: "HD", year: 2025, type: "Movie", episodes: null },
  { id: 9, title: "Wrath of the King", info: "Historical • 2024 • Agasobanuye by Chris", image: extraImg, rating: 7.3, quality: "HD", year: 2024, type: "Movie", episodes: null },
  { id: 10, title: "VisionQuest", info: "Sci-Fi • 2026 • Marvel Television", image: midnightRevengeImg, rating: 8.6, quality: "4K", year: 2026, type: "Movie", episodes: null },
  { id: 11, title: "Dark Horizon", info: "Thriller • 2026 • Season 1", image: scorpionKingImg, rating: 8.0, quality: "HD", year: 2026, type: "Series", episodes: 8 },
  { id: 12, title: "The Silent Order", info: "Mystery • 2025 • Season 2", image: ironFistImg, rating: 7.7, quality: "HD", year: 2025, type: "Series", episodes: 12 },
  { id: 13, title: "Echoes of War", info: "Drama • 2026 • Season 1", image: raudseRusikagaImg, rating: 8.2, quality: "4K", year: 2026, type: "Series", episodes: 6 },
  { id: 14, title: "Neon Streets", info: "Cyberpunk • 2025 • Season 3", image: shadowDragonImg, rating: 7.4, quality: "HD", year: 2025, type: "Series", episodes: 10 },
  { id: 15, title: "Kingdom Come", info: "Fantasy • 2026 • Season 1", image: lastWarriorImg, rating: 8.5, quality: "4K", year: 2026, type: "Series", episodes: 9 },
];

/* ---------- STATE ---------- */
const isPlaying = ref(false);
const currentId = ref(Number(route.params.id) || 1);

// Find the current content based on the URL ID. Fallback to the first item.
const currentContent = computed(() => {
  return allContent.find((item) => item.id === currentId.value) || allContent[0];
});

// Filter out the current content to show "More Like This"
const relatedContent = computed(() => {
  return allContent.filter((item) => item.id !== currentId.value).slice(0, 5);
});

// Mock episodes for Series
const mockEpisodes = [
  { num: 1, title: "The Beginning", duration: "45m" },
  { num: 2, title: "Shadows Rising", duration: "42m" },
  { num: 3, title: "No Way Out", duration: "48m" },
  { num: 4, title: "The Reckoning", duration: "50m" },
  { num: 5, title: "Blood and Sand", duration: "44m" },
];

/* ---------- ACTIONS ---------- */
function togglePlay() {
  isPlaying.value = !isPlaying.value;
}

function addToList() {
  alert(`"${currentContent.value.title}" added to your list!`);
}

function changeVideo(id) {
  // Update URL and reset player
  router.push(`/watch/${id}`);
  currentId.value = id;
  isPlaying.value = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Watch for route changes (e.g., if user clicks a "More Like This" card)
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      currentId.value = Number(newId);
      isPlaying.value = false;
    }
  }
);
</script>

<style scoped>
.watch-page {
  width: 100%;
  animation: fadeIn 0.4s ease-out;
  padding-bottom: 60px;
}

/* ================= BACK BUTTON ================= */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  margin-bottom: 20px;
  color: #cbd5e1;
  font-size: 14px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 10px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(129, 140, 248, 0.5);
}

/* ================= PLAYER SECTION ================= */
.player-section {
  width: 100%;
  margin-bottom: 32px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(129, 140, 248, 0.2);
}

.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}

/* Mock Video Player */
.mock-player {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.player-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.mock-player:hover .player-poster {
  opacity: 0.4;
}

.player-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.big-play-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 84px;
  color: #ffffff;
  background: rgba(99, 102, 241, 0.85);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, background 0.2s ease;
}

.big-play-btn:hover {
  transform: scale(1.05);
  background: rgba(99, 102, 241, 1);
}

.player-text {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* Video Controls */
.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.9), transparent);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.video-container:hover .video-controls {
  transform: translateY(0);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  cursor: pointer;
  margin-bottom: 16px;
}

.progress-fill {
  width: 25%; /* Mock progress */
  height: 100%;
  background: #6366f1;
  border-radius: 3px;
  position: relative;
}

.progress-fill::after {
  content: "";
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.8);
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.controls-left,
.controls-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ctrl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #ffffff;
  background: transparent;
  border: none;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.ctrl-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.time-display {
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

/* ================= DETAILS LAYOUT ================= */
.details-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  margin-bottom: 48px;
}

/* Main Details */
.main-details {
  display: flex;
  flex-direction: column;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.title-row h1 {
  color: #ffffff;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 850;
  letter-spacing: -1px;
  line-height: 1.2;
}

.badge-quality {
  padding: 4px 10px;
  color: #c7d2fe;
  font-size: 12px;
  font-weight: 700;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(129, 140, 248, 0.4);
  border-radius: 8px;
}

.meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  color: #cbd5e1;
  font-size: 14px;
}

.rating {
  color: #fde68a;
  font-weight: 700;
}

.dot {
  width: 4px;
  height: 4px;
  background: #64748b;
  border-radius: 50%;
}

.description {
  color: #94a3b8;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 28px;
  max-width: 800px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.btn-primary, .btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn-primary {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: none;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(99, 102, 241, 0.45);
}

.btn-secondary {
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.btn-secondary:hover {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(129, 140, 248, 0.5);
  transform: translateY(-2px);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background: rgba(99, 102, 241, 0.2);
  color: #ffffff;
  border-color: rgba(129, 140, 248, 0.5);
}

/* ================= EPISODES SIDEBAR ================= */
.episodes-sidebar {
  background: linear-gradient(145deg, rgba(21, 27, 50, 0.8), rgba(13, 18, 36, 0.8));
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 16px;
  padding: 20px;
  height: fit-content;
  max-height: 600px;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}

.sidebar-header h3 {
  color: #ffffff;
  font-size: 18px;
  font-weight: 750;
}

.sidebar-header span {
  color: #94a3b8;
  font-size: 12px;
}

.episodes-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding-right: 5px; /* For scrollbar */
}

/* Custom Scrollbar for Episodes */
.episodes-list::-webkit-scrollbar {
  width: 6px;
}
.episodes-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
.episodes-list::-webkit-scrollbar-thumb {
  background: rgba(129, 140, 248, 0.3);
  border-radius: 3px;
}

.episode-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 12px;
  text-align: left;
  transition: all 0.2s ease;
}

.episode-card:hover {
  background: rgba(255, 255, 255, 0.04);
}

.episode-card.active {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(129, 140, 248, 0.4);
}

.ep-thumb {
  position: relative;
  width: 100px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
}

.ep-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ep-num {
  position: absolute;
  bottom: 4px;
  left: 4px;
  padding: 2px 6px;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
}

.ep-info {
  flex: 1;
  overflow: hidden;
}

.ep-info p {
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.ep-info small {
  color: #94a3b8;
  font-size: 11px;
}

.ep-play {
  color: #818cf8;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.episode-card:hover .ep-play,
.episode-card.active .ep-play {
  opacity: 1;
}

/* ================= MORE LIKE THIS (Cards) ================= */
.more-like-this {
  width: 100%;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

.section-heading h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #f8fafc;
  font-size: 21px;
  font-weight: 750;
  letter-spacing: -0.4px;
}

.heading-line {
  display: inline-block;
  width: 5px;
  height: 29px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #818cf8, #7c3aed);
  border-radius: 8px;
}

/* Reusing standard card grid */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(145deg, #151b32, #0d1224);
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}

.card:hover {
  transform: translateY(-5px);
  border-color: rgba(129, 140, 248, 0.8);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.35), 0 0 18px rgba(99, 102, 241, 0.12);
}

.card > img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  height: auto;
  object-fit: cover;
  background: #11162b;
  border-radius: 16px 16px 0 0;
  transition: transform 0.5s ease;
}

.card:hover > img {
  transform: scale(1.05);
}

.collection {
  padding: 12px;
  background: linear-gradient(180deg, rgba(21, 27, 50, 0.96), #0d1224);
}

.collection p {
  color: #f8fafc;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.collection small {
  display: block;
  color: #a5b4fc;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-rating, .card-quality {
  position: absolute;
  top: 8px;
  z-index: 2;
  padding: 3px 7px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 6px;
  backdrop-filter: blur(6px);
}

.card-rating {
  left: 8px;
  color: #fde68a;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(253, 230, 138, 0.35);
}

.card-quality {
  right: 8px;
  color: #c7d2fe;
  background: rgba(99, 102, 241, 0.35);
  border: 1px solid rgba(129, 140, 248, 0.5);
}

.card-tags {
  display: flex;
  gap: 6px;
  margin: 4px 0;
}

.card-type {
  padding: 2px 6px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 4px;
}

.card-type.is-movie {
  color: #a7f3d0;
  background: rgba(16, 185, 129, 0.18);
}

.card-type.is-series {
  color: #fbcfe8;
  background: rgba(219, 39, 119, 0.18);
}

/* ================= ANIMATIONS & RESPONSIVE ================= */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1000px) {
  .details-layout {
    grid-template-columns: 1fr;
  }
  .episodes-sidebar {
    max-height: 400px;
  }
}

@media (max-width: 650px) {
  .title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .action-buttons {
    flex-direction: column;
    width: 100%;
  }
  .btn-primary, .btn-secondary {
    width: 100%;
  }
  .btn-icon {
    width: 100%;
    height: 48px;
  }
  .cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
}

@media (max-width: 380px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>