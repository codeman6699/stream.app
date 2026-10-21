<template>
  <div class="mylist-page">
    <!-- ================= HEADER ================= -->
    <section class="page-header">
      <div class="header-content">
        <h1>
          <Bookmark :size="28" class="header-icon" />
          My List
        </h1>
        <p>Your saved movies and series, ready to watch anytime.</p>
      </div>

      <div class="header-stats" v-if="savedItems.length > 0">
        <span class="stat-pill">
          <Clapperboard :size="14" />
          {{ savedItems.length }} Saved
        </span>
        <button class="clear-btn" @click="clearList">
          <Trash2 :size="14" />
          Clear All
        </button>
      </div>
    </section>

    <!-- ================= EMPTY STATE ================= -->
    <div v-if="savedItems.length === 0" class="empty-state">
      <div class="empty-icon-wrap">
        <Bookmark :size="48" />
      </div>
      <h2>Your list is empty</h2>
      <p>Movies and series you save will appear here. Start browsing and build your watchlist!</p>
      <div class="empty-actions">
        <router-link to="/" class="btn-primary">
          <Compass :size="18" />
          Browse Movies
        </router-link>
        <router-link to="/series" class="btn-secondary">
          <Tv :size="18" />
          Browse Series
        </router-link>
      </div>
    </div>

    <!-- ================= SAVED ITEMS GRID ================= -->
    <div v-else class="cards">
      <div class="card" v-for="card in savedItems" :key="card.id">
        <img :src="card.image" :alt="card.title" loading="lazy">
        
        <span class="card-rating">★ {{ card.rating }}</span>
        <span class="card-quality">{{ card.quality }}</span>

        <!-- Remove button (appears on hover) -->
        <button 
          class="remove-btn" 
          @click="removeItem(card.id)" 
          aria-label="Remove from list"
          title="Remove from list"
        >
          <X :size="16" />
        </button>

        <div class="collection">
          <p>{{ card.title }}</p>

          <div class="card-tags">
            <span
              class="card-type"
              :class="card.type === 'Series' ? 'is-series' : 'is-movie'"
            >
              {{ card.type }}
            </span>

            <span
              v-if="card.type === 'Series' && card.episodes"
              class="card-episodes"
            >
              {{ card.episodes }} Episodes
            </span>
          </div>

          <small>{{ card.info }}</small>

          <button @click="watchCard(card)">
            <Play :size="14" fill="currentColor" />
            {{ card.type === 'Series' ? 'Watch Series' : 'Watch Movie' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Bookmark,
  Trash2,
  Compass,
  Tv,
  Play,
  X,
  Clapperboard,
} from "lucide-vue-next";

// Mock imported images (replace with your actual imports)
import lastWarriorImg from "@/assets/5eDgJqnnmYVvE8T72rDST4u0VCq.webp";
import shadowDragonImg from "@/assets/9cWoy2uxaUYtlFLiC11YRC0bPex.webp";
import ironFistImg from "@/assets/osZ6HJJBPwptZLTXFYbGQ0Jc7WB.webp";

const router = useRouter();

/* 
  MOCK DATA: 
  In a real app, you would fetch this from a Pinia store, localStorage, or your backend.
  Here we are pre-filling it so you can see how the grid looks.
*/
const savedItems = ref([
  {
    id: 1,
    title: "The Last Warrior",
    info: "Fantasy • 2021 • Disney Adventure",
    image: lastWarriorImg,
    rating: 7.8,
    quality: "HD",
    type: "Movie",
    episodes: null,
  },
  {
    id: 5,
    title: "Iron Fist Legacy",
    info: "Martial Arts • 2026 • Agasobanuye by Perfect",
    image: ironFistImg,
    rating: 8.4,
    quality: "4K",
    type: "Movie",
    episodes: null,
  },
  {
    id: 14,
    title: "Neon Streets",
    info: "Cyberpunk • 2025 • Season 3",
    image: shadowDragonImg,
    rating: 7.4,
    quality: "HD",
    type: "Series",
    episodes: 10,
  },
]);

/* ---------- ACTIONS ---------- */
function watchCard(card) {
  router.push(`/watch/${card.id}`);
}

function removeItem(id) {
  savedItems.value = savedItems.value.filter((item) => item.id !== id);
  // Note: In a real app, you would also update your backend/localStorage here
}

function clearList() {
  if (confirm("Are you sure you want to clear your entire list?")) {
    savedItems.value = [];
  }
}
</script>

<style scoped>
.mylist-page {
  width: 100%;
  animation: fadeIn 0.4s ease-out;
}

/* ================= HEADER ================= */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(129, 140, 248, 0.15);
}

.header-content h1 {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 32px;
  font-weight: 850;
  letter-spacing: -1px;
}

.header-icon {
  color: #818cf8;
}

.header-content p {
  margin-top: 8px;
  color: #94a3b8;
  font-size: 14px;
}

.header-stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  color: #c7d2fe;
  font-size: 13px;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.25);
  border-radius: 10px;
}

.clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  color: #fca5a5;
  font-size: 13px;
  font-weight: 600;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 10px;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.45);
}

/* ================= EMPTY STATE ================= */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 50vh;
  padding: 40px 20px;
}

.empty-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  margin-bottom: 24px;
  color: #818cf8;
  background: rgba(99, 102, 241, 0.1);
  border: 1px dashed rgba(129, 140, 248, 0.4);
  border-radius: 50%;
}

.empty-state h2 {
  color: #ffffff;
  font-size: 24px;
  font-weight: 750;
  margin-bottom: 12px;
}

.empty-state p {
  max-width: 400px;
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.empty-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.btn-primary, .btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 12px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.btn-primary {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  box-shadow: 0 8px 22px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.25);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(129, 140, 248, 0.55);
}

/* ================= CARDS GRID ================= */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  align-items: stretch;
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
  isolation: isolate;
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
  object-position: center;
  background: #11162b;
  border-radius: 16px 16px 0 0;
  transition: transform 0.5s ease;
}

.card:hover > img {
  transform: scale(1.05);
}

.collection {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  gap: 4px;
  padding: 12px;
  background: linear-gradient(180deg, rgba(21, 27, 50, 0.96), #0d1224);
}

.collection p {
  width: 100%;
  margin: 0;
  overflow: hidden;
  color: #f8fafc;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.2px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.collection small {
  display: block;
  max-width: 100%;
  overflow: hidden;
  color: #a5b4fc;
  font-size: 10px;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.collection button:not(.remove-btn) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  min-height: 34px;
  margin: auto 0 0;
  padding: 6px 10px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 650;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.35);
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.15);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.collection button:not(.remove-btn):hover {
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
  box-shadow: 0 6px 14px rgba(99, 102, 241, 0.32);
  transform: translateY(-1px);
}

/* ================= BADGES & TAGS ================= */
.card-rating, .card-quality {
  position: absolute;
  top: 8px;
  z-index: 2;
  padding: 3px 7px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 6px;
  backdrop-filter: blur(6px);
  white-space: nowrap;
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
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin: 2px 0;
}

.card-type, .card-episodes {
  display: inline-flex;
  align-items: center;
  padding: 2px 7px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  border-radius: 6px;
  white-space: nowrap;
}

.card-type.is-movie {
  color: #a7f3d0;
  background: rgba(16, 185, 129, 0.18);
  border: 1px solid rgba(52, 211, 153, 0.45);
}

.card-type.is-series {
  color: #fbcfe8;
  background: rgba(219, 39, 119, 0.18);
  border: 1px solid rgba(244, 114, 182, 0.45);
}

.card-episodes {
  color: #c7d2fe;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.4);
}

/* ================= REMOVE BUTTON ================= */
.remove-btn {
  position: absolute;
  top: 8px;
  right: 48px; /* Offset from the HD badge */
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  color: #fca5a5;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 6px;
  backdrop-filter: blur(6px);
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease;
}

.card:hover .remove-btn {
  opacity: 1;
  transform: scale(1);
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.9);
  color: #ffffff;
}

/* ================= ANIMATIONS & RESPONSIVE ================= */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 950px) {
  .cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
}

@media (max-width: 650px) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .header-stats {
    width: 100%;
    justify-content: space-between;
  }
  .card { border-radius: 13px; }
  .card > img { border-radius: 13px 13px 0 0; }
  .collection { padding: 10px; gap: 3px; }
  .collection p { font-size: 12px; }
  .collection small { font-size: 9px; }
  .collection button:not(.remove-btn) { min-height: 30px; padding: 5px 6px; font-size: 10px; }
  .card-type, .card-episodes { font-size: 8px; padding: 2px 6px; }
  
  /* Always show remove button on mobile since there's no hover */
  .remove-btn {
    opacity: 1;
    transform: scale(1);
    right: 8px;
    top: 40px; /* Move below the quality badge to avoid overlap */
  }
}

@media (max-width: 380px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>