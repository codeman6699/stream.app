<template>
  <div class="movies-page">

    <!-- ================= PAGE HEADER ================= -->
    <section class="page-hero">
      <div class="page-hero-bg">
        <Clapperboard :size="180" :stroke-width="1" />
      </div>

      <div class="page-hero-content">
        <span class="page-badge">
          <Clapperboard :size="14" />
          MOVIES LIBRARY
        </span>

        <h1>All <span>Movies</span></h1>

        <p class="page-subtitle">
          Browse every Agasobanuye movie in one place.
          Filter by genre, quality, or year and start watching instantly.
        </p>

        <div class="page-stats">
          <div class="stat">
            <strong>{{ allMovies.length }}</strong>
            <span>Movies</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <strong>{{ genreCount }}</strong>
            <span>Genres</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <strong>{{ fourKCount }}</strong>
            <span>4K Titles</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FILTER BAR ================= -->
    <section class="filter-section">
      <div class="filter-row">

        <!-- Search -->
        <div class="filter-search">
          <Search :size="18" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search movies by title..."
            aria-label="Search movies by title"
          >
          <button
            v-if="searchQuery"
            class="clear-search"
            @click="searchQuery = ''"
            aria-label="Clear search"
          >
            <X :size="16" />
          </button>
        </div>

        <!-- Genre dropdown -->
        <div class="filter-dropdown" ref="genreRef">
          <button
            class="filter-btn"
            @click="toggleDropdown('genre')"
            :aria-expanded="openDropdown === 'genre'"
          >
            <Tag :size="16" />
            <span>{{ selectedGenre || 'All Genres' }}</span>
            <ChevronDown
              :size="15"
              class="chev"
              :class="{ open: openDropdown === 'genre' }"
            />
          </button>

          <div v-if="openDropdown === 'genre'" class="filter-menu">
            <button
              class="filter-menu-item"
              :class="{ active: !selectedGenre }"
              @click="selectGenre(null)"
            >
              <LayoutGrid :size="14" />
              All Genres
            </button>
            <button
              v-for="genre in genres"
              :key="genre"
              class="filter-menu-item"
              :class="{ active: selectedGenre === genre }"
              @click="selectGenre(genre)"
            >
              <Tag :size="14" />
              {{ genre }}
            </button>
          </div>
        </div>

        <!-- Quality dropdown -->
        <div class="filter-dropdown" ref="qualityRef">
          <button
            class="filter-btn"
            @click="toggleDropdown('quality')"
            :aria-expanded="openDropdown === 'quality'"
          >
            <MonitorPlay :size="16" />
            <span>{{ selectedQuality || 'All Quality' }}</span>
            <ChevronDown
              :size="15"
              class="chev"
              :class="{ open: openDropdown === 'quality' }"
            />
          </button>

          <div v-if="openDropdown === 'quality'" class="filter-menu">
            <button
              class="filter-menu-item"
              :class="{ active: !selectedQuality }"
              @click="selectQuality(null)"
            >
              <LayoutGrid :size="14" />
              All Quality
            </button>
            <button
              class="filter-menu-item"
              :class="{ active: selectedQuality === '4K' }"
              @click="selectQuality('4K')"
            >
              <Sparkles :size="14" />
              4K Ultra HD
            </button>
            <button
              class="filter-menu-item"
              :class="{ active: selectedQuality === 'HD' }"
              @click="selectQuality('HD')"
            >
              <MonitorPlay :size="14" />
              HD
            </button>
          </div>
        </div>

        <!-- Sort dropdown -->
        <div class="filter-dropdown" ref="sortRef">
          <button
            class="filter-btn"
            @click="toggleDropdown('sort')"
            :aria-expanded="openDropdown === 'sort'"
          >
            <ArrowUpDown :size="16" />
            <span>{{ sortLabels[sortBy] }}</span>
            <ChevronDown
              :size="15"
              class="chev"
              :class="{ open: openDropdown === 'sort' }"
            />
          </button>

          <div v-if="openDropdown === 'sort'" class="filter-menu">
            <button
              v-for="option in sortOptions"
              :key="option.value"
              class="filter-menu-item"
              :class="{ active: sortBy === option.value }"
              @click="selectSort(option.value)"
            >
              <component :is="option.icon" :size="14" />
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Reset -->
        <button
          v-if="hasActiveFilters"
          class="reset-btn"
          @click="resetFilters"
        >
          <X :size="16" />
          Reset
        </button>

      </div>

      <!-- Active filter chips -->
      <div v-if="hasActiveFilters" class="active-filters">
        <span class="active-label">Active filters:</span>

        <button
          v-if="selectedGenre"
          class="filter-chip"
          @click="selectGenre(null)"
        >
          <Tag :size="12" />
          {{ selectedGenre }}
          <X :size="12" />
        </button>

        <button
          v-if="selectedQuality"
          class="filter-chip"
          @click="selectQuality(null)"
        >
          <MonitorPlay :size="12" />
          {{ selectedQuality }}
          <X :size="12" />
        </button>

        <button
          v-if="searchQuery"
          class="filter-chip"
          @click="searchQuery = ''"
        >
          <Search :size="12" />
          "{{ searchQuery }}"
          <X :size="12" />
        </button>
      </div>
    </section>

    <!-- ================= MOVIES GRID ================= -->
    <section class="movies-section">

      <div class="section-heading">
        <h2>
          <span class="heading-line"></span>
          {{ filteredMovies.length }}
          {{ filteredMovies.length === 1 ? 'Movie' : 'Movies' }}
        </h2>

        <span class="movie-count">
          <Flame :size="14" color="#FF6B35" />
          {{ sortLabels[sortBy] }}
        </span>
      </div>

      <!-- Empty state -->
      <div v-if="filteredMovies.length === 0" class="empty-state">
        <div class="empty-icon">
          <SearchX :size="42" />
        </div>
        <h3>No movies found</h3>
        <p>Try adjusting your filters or search query.</p>
        <button class="reset-btn-lg" @click="resetFilters">
          <RotateCcw :size="16" />
          Reset filters
        </button>
      </div>

      <!-- Grid -->
      <div v-else class="cards">
        <div
          class="card"
          v-for="card in paginatedMovies"
          :key="card.id"
          @click="watchCard(card)"
        >
          <img :src="card.image" :alt="card.title" loading="lazy">

          <span class="card-rating">★ {{ card.rating }}</span>
          <span class="card-quality">{{ card.quality }}</span>

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

            <button @click.stop="watchCard(card)">
              <Play :size="14" fill="currentColor" />
              Watch Movie
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="pagination"
      >
        <button
          class="page-btn"
          :disabled="currentPage === 1"
          @click="currentPage--"
          aria-label="Previous page"
        >
          <ChevronLeft :size="18" />
        </button>

        <button
          v-for="page in visiblePages"
          :key="page"
          class="page-btn"
          :class="{ active: currentPage === page }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>

        <button
          class="page-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          aria-label="Next page"
        >
          <ChevronRight :size="18" />
        </button>
      </div>

    </section>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import {
  Clapperboard,
  Search,
  Tag,
  MonitorPlay,
  Sparkles,
  LayoutGrid,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Star,
  Calendar,
  Play,
  Flame,
  X,
  SearchX,
  RotateCcw,
} from "lucide-vue-next";

/* ---------- IMAGES (same imports as HomeView) ---------- */
import lastWarriorImg from "@/assets/5eDgJqnnmYVvE8T72rDST4u0VCq.webp";
import shadowDragonImg from "@/assets/9cWoy2uxaUYtlFLiC11YRC0bPex.webp";
import midnightRevengeImg from "@/assets/ccY2f1o9M8OjFpQb0SVZTuokkYQ.webp";
import scorpionKingImg from "@/assets/oFEHcmPuI95aoeNrWXCVnA4oI5Y.webp";
import ironFistImg from "@/assets/osZ6HJJBPwptZLTXFYbGQ0Jc7WB.webp";
import raudseRusikagaImg from "@/assets/p9x1aME4mFJTeqhKEAYcUCVuzqC.webp";
import extraImg from "@/assets/nGU2cNmKfNk5MNgp7SmlCELvJMo.webp";

const router = useRouter();

/* ---------- FULL MOVIE CATALOG ---------- */
/* Pulled from HomeView's trendingMovies + latestMovies, plus a few extras */
const allMovies = [
  // Trending
  { id: 1,  title: "The Last Warrior",     info: "Fantasy • 2021 • Disney Adventure",       image: lastWarriorImg,     rating: 7.8, quality: "HD", year: 2021, type: "Movie", genre: "Fantasy",  episodes: null },
  { id: 2,  title: "Shadow of the Dragon", info: "Action • 1992 • Crime Thriller",         image: shadowDragonImg,    rating: 7.2, quality: "HD", year: 1992, type: "Movie", genre: "Action",   episodes: null },
  { id: 3,  title: "Midnight Revenge",     info: "Action • 1986 • Hong Kong Crime",        image: midnightRevengeImg, rating: 6.9, quality: "HD", year: 1986, type: "Movie", genre: "Action",   episodes: null },
  { id: 4,  title: "Rise of the Warrior",  info: "Action • 2008 • The Scorpion King 2",    image: scorpionKingImg,    rating: 5.8, quality: "HD", year: 2008, type: "Movie", genre: "Action",   episodes: null },
  { id: 5,  title: "Iron Fist Legacy",     info: "Martial Arts • 2026 • Perfect",          image: ironFistImg,        rating: 8.4, quality: "4K", year: 2026, type: "Movie", genre: "Action",   episodes: null },

  // Latest
  { id: 6,  title: "Raudse Rusikaga",      info: "Drama • 2026 • Estonian Horror",         image: raudseRusikagaImg,  rating: 7.5, quality: "HD", year: 2026, type: "Movie", genre: "Horror",   episodes: null },
  { id: 7,  title: "Bloodline Hunter",     info: "Action • 2026 • Perfect",                image: lastWarriorImg,     rating: 8.1, quality: "4K", year: 2026, type: "Movie", genre: "Action",   episodes: null },
  { id: 8,  title: "Crimson Horizon",      info: "Sci-Fi • 2025 • Kevin",                  image: shadowDragonImg,    rating: 7.9, quality: "HD", year: 2025, type: "Movie", genre: "Sci-Fi",   episodes: null },
  { id: 9,  title: "Wrath of the King",    info: "Historical • 2024 • Chris",              image: extraImg,           rating: 7.3, quality: "HD", year: 2024, type: "Movie", genre: "Drama",    episodes: null },
  { id: 10, title: "VisionQuest",          info: "Sci-Fi • 2026 • Marvel Television",      image: midnightRevengeImg, rating: 8.6, quality: "4K", year: 2026, type: "Movie", genre: "Sci-Fi",   episodes: null },

  // Extra catalog to fill out the page
  { id: 16, title: "Echoes of the Void",   info: "Sci-Fi • 2025 • Perfect",                image: shadowDragonImg,    rating: 8.0, quality: "4K", year: 2025, type: "Movie", genre: "Sci-Fi",   episodes: null },
  { id: 17, title: "Silent Blade",         info: "Action • 2024 • Kevin",                  image: midnightRevengeImg, rating: 7.6, quality: "HD", year: 2024, type: "Movie", genre: "Action",   episodes: null },
  { id: 18, title: "The Last Kingdom",     info: "Drama • 2023 • Chris",                   image: scorpionKingImg,    rating: 7.9, quality: "HD", year: 2023, type: "Movie", genre: "Drama",    episodes: null },
  { id: 19, title: "Neon Requiem",         info: "Cyberpunk • 2026 • Perfect",             image: ironFistImg,        rating: 8.3, quality: "4K", year: 2026, type: "Movie", genre: "Sci-Fi",   episodes: null },
  { id: 20, title: "Hollow Crown",         info: "Thriller • 2025 • Kevin",                image: raudseRusikagaImg,  rating: 7.4, quality: "HD", year: 2025, type: "Movie", genre: "Thriller", episodes: null },
  { id: 21, title: "Blood Moon",           info: "Horror • 2024 • Chris",                  image: lastWarriorImg,     rating: 6.8, quality: "HD", year: 2024, type: "Movie", genre: "Horror",   episodes: null },
  { id: 22, title: "Final Gambit",         info: "Thriller • 2026 • Perfect",              image: extraImg,           rating: 8.2, quality: "4K", year: 2026, type: "Movie", genre: "Thriller", episodes: null },
  { id: 23, title: "Mystic Realms",        info: "Fantasy • 2025 • Kevin",                 image: scorpionKingImg,    rating: 7.7, quality: "HD", year: 2025, type: "Movie", genre: "Fantasy",  episodes: null },
  { id: 24, title: "Cyber Dusk",           info: "Cyberpunk • 2026 • Perfect",             image: shadowDragonImg,    rating: 8.5, quality: "4K", year: 2026, type: "Movie", genre: "Sci-Fi",   episodes: null },
  { id: 25, title: "Rogue Protocol",       info: "Action • 2025 • Chris",                  image: ironFistImg,        rating: 7.8, quality: "HD", year: 2025, type: "Movie", genre: "Action",   episodes: null },
  { id: 26, title: "Whispering Woods",     info: "Mystery • 2024 • Kevin",                 image: raudseRusikagaImg,  rating: 7.1, quality: "HD", year: 2024, type: "Movie", genre: "Mystery",  episodes: null },
  { id: 27, title: "Steel Horizon",        info: "Action • 2026 • Perfect",                image: midnightRevengeImg, rating: 8.0, quality: "4K", year: 2026, type: "Movie", genre: "Action",   episodes: null },
  { id: 28, title: "Crimson Crown",        info: "Drama • 2025 • Chris",                   image: extraImg,           rating: 7.6, quality: "HD", year: 2025, type: "Movie", genre: "Drama",    episodes: null },
];

/* ---------- FILTER STATE ---------- */
const searchQuery = ref("");
const selectedGenre = ref(null);
const selectedQuality = ref(null);
const sortBy = ref("newest");
const currentPage = ref(1);
const perPage = 12;
const openDropdown = ref(null);

const genreRef = ref(null);
const qualityRef = ref(null);
const sortRef = ref(null);

/* ---------- GENRE LIST (derived) ---------- */
const genres = computed(() => {
  const set = new Set(allMovies.map(m => m.genre));
  return Array.from(set).sort();
});

const genreCount = computed(() => genres.value.length);
const fourKCount = computed(
  () => allMovies.filter(m => m.quality === "4K").length
);

/* ---------- SORT OPTIONS ---------- */
const sortOptions = [
  { value: "newest",     label: "Newest First",     icon: Calendar },
  { value: "oldest",     label: "Oldest First",     icon: Calendar },
  { value: "rating",     label: "Top Rated",        icon: Star },
  { value: "az",         label: "A → Z",            icon: ArrowDownWideNarrow },
  { value: "za",         label: "Z → A",            icon: ArrowUpWideNarrow },
];

const sortLabels = computed(() =>
  sortOptions.reduce((acc, o) => ({ ...acc, [o.value]: o.label }), {})
);

/* ---------- FILTERED + SORTED ---------- */
const filteredMovies = computed(() => {
  let list = [...allMovies];

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(m => m.title.toLowerCase().includes(q));
  }

  if (selectedGenre.value) {
    list = list.filter(m => m.genre === selectedGenre.value);
  }

  if (selectedQuality.value) {
    list = list.filter(m => m.quality === selectedQuality.value);
  }

  switch (sortBy.value) {
    case "newest":
      list.sort((a, b) => b.year - a.year);
      break;
    case "oldest":
      list.sort((a, b) => a.year - b.year);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "az":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      list.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  return list;
});

/* ---------- PAGINATION ---------- */
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredMovies.value.length / perPage))
);

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredMovies.value.slice(start, start + perPage);
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else if (current <= 3) {
    pages.push(1, 2, 3, 4, total);
  } else if (current >= total - 2) {
    pages.push(1, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, current - 1, current, current + 1, total);
  }

  return pages;
});

/* ---------- HELPERS ---------- */
const hasActiveFilters = computed(
  () => !!(searchQuery.value || selectedGenre.value || selectedQuality.value)
);

function selectGenre(genre) {
  selectedGenre.value = genre;
  openDropdown.value = null;
  currentPage.value = 1;
}

function selectQuality(q) {
  selectedQuality.value = q;
  openDropdown.value = null;
  currentPage.value = 1;
}

function selectSort(v) {
  sortBy.value = v;
  openDropdown.value = null;
  currentPage.value = 1;
}

function resetFilters() {
  searchQuery.value = "";
  selectedGenre.value = null;
  selectedQuality.value = null;
  sortBy.value = "newest";
  currentPage.value = 1;
}

function toggleDropdown(name) {
  openDropdown.value = openDropdown.value === name ? null : name;
}

function watchCard(card) {
  console.log(`Watching: ${card.title}`);
  router.push("/watch/3");
}

/* Reset to page 1 when filters change */
watch([searchQuery, selectedGenre, selectedQuality], () => {
  currentPage.value = 1;
});

/* Close dropdowns on outside click */
function handleClickOutside(e) {
  const refs = [
    { name: "genre", el: genreRef.value },
    { name: "quality", el: qualityRef.value },
    { name: "sort", el: sortRef.value },
  ];
  for (const { name, el } of refs) {
    if (openDropdown.value === name && el && !el.contains(e.target)) {
      openDropdown.value = null;
    }
  }
}

onMounted(() => document.addEventListener("mousedown", handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("mousedown", handleClickOutside)
);
</script>

<style scoped>
/* ================= PAGE WRAPPER ================= */
.movies-page {
  width: 100%;
  animation: fadeIn 0.35s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ================= PAGE HERO ================= */
.page-hero {
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;
  padding: 40px 32px;
  background:
    radial-gradient(
      circle at 85% 20%,
      rgba(124, 58, 237, 0.28),
      transparent 55%
    ),
    radial-gradient(
      circle at 15% 80%,
      rgba(99, 102, 241, 0.22),
      transparent 50%
    ),
    linear-gradient(135deg, #141b35, #0d1224);
  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 22px;
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.3);
}

.page-hero-bg {
  position: absolute;
  right: -30px;
  bottom: -40px;
  color: rgba(129, 140, 248, 0.08);
  pointer-events: none;
  z-index: 0;
}

.page-hero-content {
  position: relative;
  z-index: 1;
  max-width: 640px;
}

.page-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 16px;
  padding: 7px 11px;
  color: #c7d2fe;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 1.2px;
  background: rgba(99, 102, 241, 0.18);
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 8px;
}

.page-hero h1 {
  color: #ffffff;
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 850;
  letter-spacing: -1.2px;
  line-height: 1.15;
}

.page-hero h1 span {
  background: linear-gradient(135deg, #818cf8, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.page-subtitle {
  margin-top: 14px;
  max-width: 520px;
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.75;
}

.page-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 26px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat strong {
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.stat span {
  color: #a5b4fc;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: rgba(129, 140, 248, 0.3);
}

/* ================= FILTER SECTION ================= */
.filter-section {
  margin-bottom: 28px;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.filter-search {
  display: flex;
  align-items: center;
  gap: 9px;
  flex: 1 1 260px;
  min-width: 220px;
  height: 44px;
  padding: 0 14px;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.filter-search:focus-within {
  background: rgba(255, 255, 255, 0.07);
  border-color: #818cf8;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

.filter-search input {
  flex: 1;
  min-width: 0;
  height: 100%;
  color: #ffffff;
  font-family: inherit;
  font-size: 13px;
  background: transparent;
  border: none;
  outline: none;
}

.filter-search input::placeholder {
  color: #94a3b8;
}

.clear-search {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.06);
  border: none;
  border-radius: 50%;
  transition: color 0.2s ease, background 0.2s ease;
}

.clear-search:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.14);
}

/* Dropdowns */
.filter-dropdown {
  position: relative;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 44px;
  padding: 0 14px;
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 12px;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.filter-btn:hover {
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(129, 140, 248, 0.55);
}

.filter-btn .chev {
  transition: transform 0.25s ease;
  color: #94a3b8;
}

.filter-btn .chev.open {
  transform: rotate(180deg);
}

.filter-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 40;
  width: 220px;
  max-height: 320px;
  overflow-y: auto;
  padding: 8px;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 14px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
  animation: dropdownEnter 0.18s ease-out;
}

@keyframes dropdownEnter {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.filter-menu-item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 9px 10px;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;
}

.filter-menu-item:hover {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.22);
}

.filter-menu-item.active {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
}

.filter-menu-item svg {
  flex-shrink: 0;
  color: #a5b4fc;
}

.filter-menu-item.active svg,
.filter-menu-item:hover svg {
  color: #ffffff;
}

.reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 44px;
  padding: 0 14px;
  color: #fca5a5;
  font-size: 13px;
  font-weight: 600;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(248, 113, 113, 0.35);
  border-radius: 12px;
  transition: background 0.25s ease, color 0.25s ease;
}

.reset-btn:hover {
  color: #ffffff;
  background: rgba(239, 68, 68, 0.24);
}

/* Active filters chips */
.active-filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.active-label {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 600;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  color: #c7d2fe;
  font-size: 11px;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.18);
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 999px;
  transition: background 0.2s ease, color 0.2s ease;
}

.filter-chip:hover {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.32);
}

.filter-chip svg {
  color: #a5b4fc;
}

.filter-chip:hover svg {
  color: #ffffff;
}

/* ================= MOVIES SECTION ================= */
.movies-section {
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

.movie-count {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 13px;
  color: #c7d2fe;
  font-size: 12px;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.22);
  border-radius: 10px;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 70px 20px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px dashed rgba(129, 140, 248, 0.28);
  border-radius: 18px;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 78px;
  margin-bottom: 18px;
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 22px;
}

.empty-state h3 {
  color: #ffffff;
  font-size: 19px;
  font-weight: 750;
  letter-spacing: -0.3px;
}

.empty-state p {
  margin-top: 8px;
  color: #94a3b8;
  font-size: 13px;
}

.reset-btn-lg {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  padding: 12px 20px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 650;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.4);
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.reset-btn-lg:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
  box-shadow: 0 10px 26px rgba(99, 102, 241, 0.35);
}

/* ================= CARDS (same look as HomeView) ================= */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  margin: 24px 0;
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
  cursor: pointer;
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}

.card:hover {
  transform: translateY(-5px);
  border-color: rgba(129, 140, 248, 0.8);
  box-shadow:
    0 18px 35px rgba(0, 0, 0, 0.35),
    0 0 18px rgba(99, 102, 241, 0.12);
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
  margin: 0;
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

.collection button {
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

.collection button:hover {
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
  box-shadow: 0 6px 14px rgba(99, 102, 241, 0.32);
  transform: translateY(-1px);
}

.card-rating,
.card-quality {
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
  margin: 2px 0 2px;
}

.card-type,
.card-episodes {
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

/* ================= PAGINATION ================= */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 10px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.page-btn:hover:not(:disabled):not(.active) {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(129, 140, 248, 0.45);
}

.page-btn.active {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-color: rgba(167, 139, 250, 0.4);
  box-shadow: 0 5px 18px rgba(99, 102, 241, 0.25);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ================= RESPONSIVE ================= */
@media (max-width: 950px) {
  .page-hero {
    padding: 32px 24px;
  }
}

@media (max-width: 650px) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .card {
    border-radius: 13px;
  }

  .card > img {
    border-radius: 13px 13px 0 0;
  }

  .collection {
    padding: 10px;
    gap: 3px;
  }

  .collection p { font-size: 12px; }
  .collection small { font-size: 9px; }

  .collection button {
    min-height: 30px;
    padding: 5px 6px;
    font-size: 10px;
  }

  .card-type,
  .card-episodes {
    font-size: 8px;
    padding: 2px 6px;
  }

  .page-stats {
    gap: 14px;
  }

  .stat strong {
    font-size: 18px;
  }
}

@media (max-width: 600px) {
  .page-hero {
    padding: 26px 18px;
    border-radius: 18px;
  }

  .page-hero h1 {
    font-size: 26px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .filter-row {
    gap: 8px;
  }

  .filter-search {
    flex: 1 1 100%;
  }

  .filter-dropdown {
    flex: 1 1 calc(50% - 4px);
  }

  .filter-btn {
    width: 100%;
    justify-content: space-between;
    padding: 0 12px;
    font-size: 12px;
  }

  .filter-menu {
    width: 100%;
    min-width: 200px;
  }

  .reset-btn {
    flex: 1 1 100%;
    justify-content: center;
  }

  .section-heading h2 {
    font-size: 17px;
  }

  .heading-line {
    height: 24px;
  }

  .movie-count {
    padding: 7px 10px;
    font-size: 11px;
  }
}

@media (max-width: 380px) {
  .cards {
    grid-template-columns: 1fr;
  }

  .filter-dropdown {
    flex: 1 1 100%;
  }
}
</style>