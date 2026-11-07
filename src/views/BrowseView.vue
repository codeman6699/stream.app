<template>
  <div class="browse-page">
    <section class="browse-header">
      <div class="header-top">
        <div>
          <h1><Compass :size="28" class="header-icon" />Browse Library</h1>
          <p>Discover your next favorite Agasobanuye movie or series.</p>
        </div>
        <span class="result-count">{{ filteredItems.length }} Results</span>
      </div>

      <div class="search-wrap">
        <Search :size="20" class="search-icon" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search by title, genre, or year..."
          aria-label="Search library"
        >
        <button v-if="searchQuery" class="clear-search" @click="searchQuery = ''"><X :size="16" /></button>
      </div>
    </section>

    <section class="filters-section">
      <div class="filter-group">
        <span class="filter-label">Type</span>
        <div class="filter-options">
          <button
            v-for="t in ['All', 'Movie', 'Series']" :key="t"
            class="filter-btn" :class="{ active: localType === t }"
            @click="setFilter('type', t === 'All' ? null : t)"
          >
            {{ t === 'All' ? 'All Types' : t + 's' }}
          </button>
        </div>
      </div>
      <div class="filter-group">
        <span class="filter-label">Quality</span>
        <div class="filter-options">
          <button
            v-for="q in ['All', '4K', 'HD']" :key="q"
            class="filter-btn" :class="{ active: localQuality === q }"
            @click="setFilter('quality', q === 'All' ? null : q)"
          >
            {{ q === 'All' ? 'All Qualities' : q }}
          </button>
        </div>
      </div>
      <div class="filter-group genre-group">
        <span class="filter-label">Genre</span>
        <div class="filter-options">
          <button
            v-for="g in genres" :key="g"
            class="filter-btn" :class="{ active: localGenre === g }"
            @click="setFilter('genre', localGenre === g ? null : g)"
          >{{ g }}</button>
        </div>
      </div>
    </section>

    <div v-if="hasActiveFilters" class="active-filters">
      <span class="active-label">Active Filters:</span>
      <button v-if="localType" class="filter-badge" @click="setFilter('type', null)">
        Type: {{ localType }} <X :size="12" />
      </button>
      <button v-if="localQuality" class="filter-badge" @click="setFilter('quality', null)">
        Quality: {{ localQuality }} <X :size="12" />
      </button>
      <button v-if="localGenre" class="filter-badge" @click="setFilter('genre', null)">
        Genre: {{ localGenre }} <X :size="12" />
      </button>
      <button class="clear-all" @click="clearAllFilters">Clear All</button>
    </div>

    <div v-if="filteredItems.length > 0" class="cards">
      <div class="card" v-for="card in filteredItems" :key="card.id" @click="watchCard(card)">
        <img :src="card.image" :alt="card.title" loading="lazy">
        <span class="card-rating">★ {{ card.rating }}</span>
        <span class="card-quality">{{ card.quality }}</span>
        <div class="collection">
          <p>{{ card.title }}</p>
          <div class="card-tags">
            <span class="card-type" :class="card.type === 'Series' ? 'is-series' : 'is-movie'">{{ card.type }}</span>
            <span v-if="card.type === 'Series' && card.episodes" class="card-episodes">{{ card.episodes }} Episodes</span>
          </div>
          <small>{{ card.info }}</small>
          <button @click.stop="watchCard(card)">
            <Play :size="14" fill="currentColor" />
            {{ card.type === 'Series' ? 'Watch Series' : 'Watch Movie' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon-wrap"><SearchX :size="48" /></div>
      <h2>No results found</h2>
      <p>We couldn't find anything matching your filters. Try adjusting them!</p>
      <button class="btn-primary" @click="clearAllFilters">Reset Filters</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Compass, Search, X, Play, SearchX } from "lucide-vue-next";

import lastWarriorImg from "@/assets/5eDgJqnnmYVvE8T72rDST4u0VCq.webp";
import shadowDragonImg from "@/assets/9cWoy2uxaUYtlFLiC11YRC0bPex.webp";
import midnightRevengeImg from "@/assets/ccY2f1o9M8OjFpQb0SVZTuokkYQ.webp";
import scorpionKingImg from "@/assets/oFEHcmPuI95aoeNrWXCVnA4oI5Y.webp";
import ironFistImg from "@/assets/osZ6HJJBPwptZLTXFYbGQ0Jc7WB.webp";
import raudseRusikagaImg from "@/assets/p9x1aME4mFJTeqhKEAYcUCVuzqC.webp";
import extraImg from "@/assets/nGU2cNmKfNk5MNgp7SmlCELvJMo.webp";

const route = useRoute();
const router = useRouter();

const allContent = [
  { id:1,  title:"The Last Warrior",     info:"Fantasy • 2021 • Disney",            image:lastWarriorImg,     rating:7.8, quality:"HD", year:2021, type:"Movie",  genre:"Fantasy",   episodes:null },
  { id:2,  title:"Shadow of the Dragon", info:"Action • 1992 • Crime Thriller",     image:shadowDragonImg,    rating:7.2, quality:"HD", year:1992, type:"Movie",  genre:"Action",    episodes:null },
  { id:3,  title:"Midnight Revenge",     info:"Action • 1986 • Hong Kong Crime",    image:midnightRevengeImg, rating:6.9, quality:"HD", year:1986, type:"Movie",  genre:"Action",    episodes:null },
  { id:4,  title:"Rise of the Warrior",  info:"Action • 2008 • Scorpion King 2",    image:scorpionKingImg,    rating:5.8, quality:"HD", year:2008, type:"Movie",  genre:"Action",    episodes:null },
  { id:5,  title:"Iron Fist Legacy",     info:"Martial Arts • 2026 • Perfect",      image:ironFistImg,        rating:8.4, quality:"4K", year:2026, type:"Movie",  genre:"Action",    episodes:null },
  { id:6,  title:"Raudse Rusikaga",      info:"Drama • 2026 • Estonian Horror",     image:raudseRusikagaImg,  rating:7.5, quality:"HD", year:2026, type:"Movie",  genre:"Horror",    episodes:null },
  { id:7,  title:"Bloodline Hunter",     info:"Action • 2026 • Perfect",            image:lastWarriorImg,     rating:8.1, quality:"4K", year:2026, type:"Movie",  genre:"Action",    episodes:null },
  { id:8,  title:"Crimson Horizon",      info:"Sci-Fi • 2025 • Kevin",              image:shadowDragonImg,    rating:7.9, quality:"HD", year:2025, type:"Movie",  genre:"Sci-Fi",    episodes:null },
  { id:9,  title:"Wrath of the King",    info:"Historical • 2024 • Chris",          image:extraImg,           rating:7.3, quality:"HD", year:2024, type:"Movie",  genre:"Drama",     episodes:null },
  { id:10, title:"VisionQuest",          info:"Sci-Fi • 2026 • Marvel TV",          image:midnightRevengeImg, rating:8.6, quality:"4K", year:2026, type:"Movie",  genre:"Sci-Fi",    episodes:null },
  { id:11, title:"Dark Horizon",         info:"Thriller • 2026 • Season 1",         image:scorpionKingImg,    rating:8.0, quality:"HD", year:2026, type:"Series", genre:"Thriller",  episodes:8 },
  { id:12, title:"The Silent Order",     info:"Mystery • 2025 • Season 2",          image:ironFistImg,        rating:7.7, quality:"HD", year:2025, type:"Series", genre:"Mystery",   episodes:12 },
  { id:13, title:"Echoes of War",        info:"Drama • 2026 • Season 1",            image:raudseRusikagaImg,  rating:8.2, quality:"4K", year:2026, type:"Series", genre:"Drama",     episodes:6 },
  { id:14, title:"Neon Streets",         info:"Cyberpunk • 2025 • Season 3",        image:shadowDragonImg,    rating:7.4, quality:"HD", year:2025, type:"Series", genre:"Cyberpunk", episodes:10 },
  { id:15, title:"Kingdom Come",         info:"Fantasy • 2026 • Season 1",          image:lastWarriorImg,     rating:8.5, quality:"4K", year:2026, type:"Series", genre:"Fantasy",   episodes:9 },
];

const genres = ["Action","Fantasy","Sci-Fi","Drama","Thriller","Mystery","Horror","Cyberpunk"];

const searchQuery = ref(route.query.search || "");
const localType = ref(route.query.type || null);
const localQuality = ref(route.query.quality || null);
const localGenre = ref(route.query.genre || null);

watch(
  () => route.query,
  (q) => {
    searchQuery.value = q.search || "";
    localType.value = q.type || null;
    localQuality.value = q.quality || null;
    localGenre.value = q.genre || null;
  },
  { immediate: true }
);

function setFilter(key, value) {
  const query = { ...route.query };
  if (value) query[key] = value;
  else delete query[key];
  router.push({ query });
}

function clearAllFilters() {
  searchQuery.value = "";
  router.push({ query: {} });
}

const hasActiveFilters = computed(
  () => !!(searchQuery.value || localType.value || localQuality.value || localGenre.value)
);

const filteredItems = computed(() =>
  allContent.filter((item) => {
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.genre.toLowerCase().includes(q) ||
        item.info.toLowerCase().includes(q) ||
        item.year.toString().includes(q);
      if (!match) return false;
    }
    if (localType.value && item.type !== localType.value) return false;
    if (localQuality.value && item.quality !== localQuality.value) return false;
    if (localGenre.value && item.genre !== localGenre.value) return false;
    return true;
  })
);

function watchCard(card) {
  router.push(`/watch/${card.id}`);
}
</script>

<style scoped>
.browse-page { width: 100%; animation: fadeIn 0.4s ease-out; padding-bottom: 40px; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.browse-header { margin-bottom: 32px; }
.header-top {
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 20px; margin-bottom: 24px; flex-wrap: wrap;
}
.header-top h1 {
  display: flex; align-items: center; gap: 12px;
  color: #fff; font-size: 32px; font-weight: 850; letter-spacing: -1px;
}
.header-icon { color: #818cf8; }
.header-top p { margin-top: 8px; color: #94a3b8; font-size: 14px; }
.result-count {
  padding: 8px 14px; color: #c7d2fe; font-size: 13px; font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.25); border-radius: 10px;
}
.search-wrap {
  position: relative; display: flex; align-items: center;
  width: 100%; height: 54px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 16px; padding: 0 18px;
}
.search-wrap:focus-within { border-color: #818cf8; }
.search-icon { color: #94a3b8; flex-shrink: 0; }
.search-wrap input {
  width: 100%; height: 100%; padding: 0 14px;
  color: #fff; font-size: 15px;
  background: transparent; border: none; outline: none;
}
.search-wrap input::placeholder { color: #64748b; }
.clear-search {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; color: #94a3b8;
  background: rgba(255, 255, 255, 0.1);
  border: none; border-radius: 50%;
}
.filters-section {
  display: flex; flex-direction: column; gap: 20px;
  padding: 24px;
  background: linear-gradient(145deg, rgba(21, 27, 50, 0.6), rgba(13, 18, 36, 0.6));
  border: 1px solid rgba(129, 140, 248, 0.15);
  border-radius: 20px; margin-bottom: 24px;
}
.filter-group { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.filter-label {
  width: 70px; flex-shrink: 0; color: #94a3b8;
  font-size: 13px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.filter-options { display: flex; flex-wrap: wrap; gap: 8px; }
.filter-btn {
  padding: 8px 16px; color: #cbd5e1; font-size: 13px; font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 999px;
}
.filter-btn:hover { background: rgba(99, 102, 241, 0.15); color: #fff; }
.filter-btn.active {
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-color: rgba(167, 139, 250, 0.5); color: #fff;
}
.active-filters {
  display: flex; align-items: center; flex-wrap: wrap;
  gap: 10px; margin-bottom: 24px;
}
.active-label { color: #94a3b8; font-size: 13px; font-weight: 600; }
.filter-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; color: #fff; font-size: 12px; font-weight: 600;
  background: rgba(99, 102, 241, 0.25);
  border: 1px solid rgba(129, 140, 248, 0.5); border-radius: 8px;
}
.clear-all {
  color: #fca5a5; font-size: 12px; font-weight: 600;
  background: transparent; border: none; padding: 6px;
  text-decoration: underline;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px; width: 100%; align-items: stretch;
}
.card {
  position: relative; display: flex; flex-direction: column;
  overflow: hidden;
  background: linear-gradient(145deg, #151b32, #0d1224);
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 16px; cursor: pointer;
  transition: all 0.35s ease;
}
.card:hover {
  transform: translateY(-5px);
  border-color: rgba(129, 140, 248, 0.8);
}
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
.collection button {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px; width: 100%; margin-top: 8px;
  padding: 6px 10px; color: #fff; font-size: 11px; font-weight: 650;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: none; border-radius: 8px;
}
.card-rating, .card-quality {
  position: absolute; top: 8px; z-index: 2;
  padding: 3px 7px; font-size: 10px; font-weight: 700;
  border-radius: 6px;
}
.card-rating { left: 8px; color: #fde68a; background: rgba(15, 23, 42, 0.75); }
.card-quality { right: 8px; color: #c7d2fe; background: rgba(99, 102, 241, 0.35); }
.card-tags { display: flex; gap: 6px; margin: 4px 0; flex-wrap: wrap; }
.card-type, .card-episodes {
  padding: 2px 7px; font-size: 9px; font-weight: 700;
  text-transform: uppercase; border-radius: 6px;
}
.card-type.is-movie { color: #a7f3d0; background: rgba(16, 185, 129, 0.18); }
.card-type.is-series { color: #fbcfe8; background: rgba(219, 39, 119, 0.18); }
.card-episodes { color: #c7d2fe; background: rgba(99, 102, 241, 0.15); }
.empty-state {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; text-align: center;
  min-height: 40vh; padding: 40px 20px;
}
.empty-icon-wrap {
  display: flex; align-items: center; justify-content: center;
  width: 96px; height: 96px; margin-bottom: 24px;
  color: #818cf8; background: rgba(99, 102, 241, 0.1);
  border: 1px dashed rgba(129, 140, 248, 0.4); border-radius: 50%;
}
.empty-state h2 { color: #fff; font-size: 24px; font-weight: 750; margin-bottom: 12px; }
.empty-state p { max-width: 400px; color: #94a3b8; font-size: 14px; margin-bottom: 24px; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; color: #fff; font-size: 14px; font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: none; border-radius: 12px;
}
@media (max-width: 950px) {
  .cards { grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .header-top { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 650px) {
  .cards { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .header-top h1 { font-size: 26px; }
  .filter-group { flex-direction: column; align-items: flex-start; }
  .filter-label { width: 100%; }
}
@media (max-width: 380px) {
  .cards { grid-template-columns: 1fr; }
}
</style>