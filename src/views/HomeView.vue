<template>
  <div class="home-dashboard">
    <!-- ================= HERO / WELCOME BANNER ================= -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <Clapperboard :size="16" />
          <span>Agasobanuye ku Buntu</span>
        </div>

        <h1>
          Welcome to
          <span class="gradient-text">STREAM.STORE</span>
        </h1>

        <p class="hero-tagline">
          Download Free Agasobanuye Series and Movies. Your support keeps us going!
        </p>

        <div class="hero-actions">
          <router-link to="/movies" class="btn-primary">
            <Play :size="18" fill="currentColor" />
            Browse Movies
          </router-link>

          <router-link to="/series" class="btn-secondary">
            <Tv :size="18" />
            Browse Series
          </router-link>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">500+</span>
            <span class="stat-label">Movies</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">120+</span>
            <span class="stat-label">Series</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">4K</span>
            <span class="stat-label">Quality</span>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="floating-card card-1">
          <Flame :size="20" color="#FF6B35" />
          <span>Trending</span>
        </div>
        <div class="floating-card card-2">
          <Sparkles :size="20" color="#c084fc" />
          <span>New Releases</span>
        </div>
        <div class="floating-card card-3">
          <Download :size="20" color="#34d399" />
          <span>Free Download</span>
        </div>
      </div>
    </section>

    <!-- ================= QUICK CATEGORIES ================= -->
    <section class="quick-categories">
      <div class="section-heading">
        <h2>
          <span class="heading-line"></span>
          Browse by Category
        </h2>
        <router-link to="/browse" class="view-all">
          View All <ChevronRight :size="16" />
        </router-link>
      </div>

      <div class="category-grid">
        <button
          v-for="cat in quickCategories"
          :key="cat.name"
          class="category-card"
          @click="pickCategory(cat.kind, cat.value)"
        >
          <div class="cat-icon" :style="{ background: cat.gradient }">
            <component :is="cat.icon" :size="22" />
          </div>
          <span class="cat-name">{{ cat.name }}</span>
          <span class="cat-count">{{ cat.count }}</span>
        </button>
      </div>
    </section>

    <!-- ================= FEATURED MOVIE ================= -->
    <section class="featured-section">
      <div class="section-heading">
        <h2>
          <span class="heading-line"></span>
          Featured Movie
        </h2>
        <span class="movie-count">
          <Clapperboard :size="13" />
          Hand-picked
        </span>
      </div>

      <article class="featured-movie">
        <img
          class="featured-image"
          src="@/assets/nGU2cNmKfNk5MNgp7SmlCELvJMo.webp"
          alt="Kung Fu Soccer featured movie"
        >
        <div class="movie-overlay"></div>

        <div class="movie-details">
          <span class="movie-badge">
            <Clapperboard :size="14" />
            FEATURED
          </span>

          <h2>Kung Fu Soccer</h2>

          <div class="movie-meta">
            <span>Agasobanuye</span>
            <span class="meta-dot"></span>
            <span>2026</span>
            <span class="meta-dot"></span>
            <span class="quality-tag">4K</span>
          </div>

          <p class="movie-description">
            Agasobanuye by Perfect. Enjoy your favorite movies and discover
            exciting entertainment in stunning quality.
          </p>

          <div class="movie-actions">
            <button class="watch-btn" @click="watchMovie">
              <Play :size="18" fill="currentColor" />
              Watch Now
            </button>
            <button class="download-btn" @click="downloadMovie">
              <Download :size="18" />
              Download
            </button>
          </div>
        </div>
      </article>
    </section>

    <!-- ================= TRENDING ================= -->
    <section class="content-section">
      <div class="section-heading">
        <h2>
          <Flame :size="20" color="#FF6B35" />
          Trending Now
        </h2>
        <router-link to="/movies" class="view-all">
          View All <ChevronRight :size="16" />
        </router-link>
      </div>

      <div class="cards">
        <div class="card" v-for="card in trendingMovies" :key="card.id">
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
            <button @click="watchCard(card)">
              <Play :size="14" fill="currentColor" />
              {{ card.type === 'Series' ? 'Watch Series' : 'Watch Movie' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= LATEST MOVIES ================= -->
    <section class="content-section">
      <div class="section-heading">
        <h2>
          <span class="heading-line"></span>
          Latest Movies
        </h2>
        <router-link to="/movies" class="view-all">
          View All <ChevronRight :size="16" />
        </router-link>
      </div>

      <div class="cards">
        <div class="card" v-for="card in latestMovies" :key="card.id">
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
            <button @click="watchCard(card)">
              <Play :size="14" fill="currentColor" />
              {{ card.type === 'Series' ? 'Watch Series' : 'Watch Movie' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= LATEST SERIES ================= -->
    <section class="content-section">
      <div class="section-heading">
        <h2>
          <span class="heading-line"></span>
          Latest Series
        </h2>
        <router-link to="/series" class="view-all">
          View All <ChevronRight :size="16" />
        </router-link>
      </div>

      <div class="cards">
        <div class="card" v-for="card in latestSeries" :key="card.id">
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
            <button @click="watchCard(card)">
              <Play :size="14" fill="currentColor" />
              {{ card.type === 'Series' ? 'Watch Series' : 'Watch Movie' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA BANNER ================= -->
    <section class="cta-banner">
      <div class="cta-content">
        <div class="cta-icon">
          <Download :size="26" />
        </div>
        <div>
          <h3>Get the Stream.Store App</h3>
          <p>Download movies and series offline. Watch anywhere, anytime.</p>
        </div>
      </div>
      <button class="cta-btn" @click="getApp">
        <Download :size="18" />
        Get App
      </button>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {
  Clapperboard,
  Play,
  Tv,
  Flame,
  Sparkles,
  Download,
  ChevronRight,
  MonitorPlay,
  Ghost,
  Swords,
  Laugh,
  Heart,
  Rocket,
} from "lucide-vue-next";

import lastWarriorImg from "@/assets/5eDgJqnnmYVvE8T72rDST4u0VCq.webp";
import shadowDragonImg from "@/assets/9cWoy2uxaUYtlFLiC11YRC0bPex.webp";
import midnightRevengeImg from "@/assets/ccY2f1o9M8OjFpQb0SVZTuokkYQ.webp";
import scorpionKingImg from "@/assets/oFEHcmPuI95aoeNrWXCVnA4oI5Y.webp";
import ironFistImg from "@/assets/osZ6HJJBPwptZLTXFYbGQ0Jc7WB.webp";
import raudseRusikagaImg from "@/assets/p9x1aME4mFJTeqhKEAYcUCVuzqC.webp";
import extraImg from "@/assets/nGU2cNmKfNk5MNgp7SmlCELvJMo.webp";

const router = useRouter();

/* ---------- QUICK CATEGORIES ---------- */
const quickCategories = [
  {
    name: "Action",
    kind: "genre",
    value: "Action",
    count: "120+ titles",
    icon: Swords,
    gradient: "linear-gradient(135deg, #ef4444, #f97316)",
  },
  {
    name: "Sci-Fi",
    kind: "genre",
    value: "Sci-Fi",
    count: "85+ titles",
    icon: Rocket,
    gradient: "linear-gradient(135deg, #6366f1, #06b6d4)",
  },
  {
    name: "Horror",
    kind: "genre",
    value: "Horror",
    count: "60+ titles",
    icon: Ghost,
    gradient: "linear-gradient(135deg, #7c3aed, #1e1b4b)",
  },
  {
    name: "Comedy",
    kind: "genre",
    value: "Comedy",
    count: "95+ titles",
    icon: Laugh,
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
  },
  {
    name: "Drama",
    kind: "genre",
    value: "Drama",
    count: "110+ titles",
    icon: Heart,
    gradient: "linear-gradient(135deg, #db2777, #be185d)",
  },
  {
    name: "4K Ultra HD",
    kind: "quality",
    value: "4K",
    count: "Premium",
    icon: Sparkles,
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  },
  {
    name: "Movies",
    kind: "type",
    value: "Movie",
    count: "500+ titles",
    icon: Clapperboard,
    gradient: "linear-gradient(135deg, #6366f1, #7c3aed)",
  },
  {
    name: "Series",
    kind: "type",
    value: "Series",
    count: "120+ titles",
    icon: MonitorPlay,
    gradient: "linear-gradient(135deg, #10b981, #059669)",
  },
];

function pickCategory(kind, value) {
  router.push({ path: "/browse", query: { [kind]: value } });
}

/* ---------- TRENDING MOVIES ---------- */
const trendingMovies = [
  {
    id: 1,
    title: "The Last Warrior",
    info: "Fantasy • 2021 • Disney Adventure",
    image: lastWarriorImg,
    rating: 7.8,
    quality: "HD",
    year: 2021,
    type: "Movie",
    episodes: null,
  },
  {
    id: 2,
    title: "Shadow of the Dragon",
    info: "Action • 1992 • Crime Thriller",
    image: shadowDragonImg,
    rating: 7.2,
    quality: "HD",
    year: 1992,
    type: "Movie",
    episodes: null,
  },
  {
    id: 3,
    title: "Midnight Revenge",
    info: "Action • 1986 • Hong Kong Crime",
    image: midnightRevengeImg,
    rating: 6.9,
    quality: "HD",
    year: 1986,
    type: "Movie",
    episodes: null,
  },
  {
    id: 4,
    title: "Rise of the Warrior",
    info: "Action • 2008 • The Scorpion King 2",
    image: scorpionKingImg,
    rating: 5.8,
    quality: "HD",
    year: 2008,
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
    year: 2026,
    type: "Movie",
    episodes: null,
  },
  
];

/* ---------- LATEST MOVIES ---------- */
const latestMovies = [
  {
    id: 6,
    title: "Raudse Rusikaga",
    info: "Drama • 2026 • Estonian Horror",
    image: raudseRusikagaImg,
    rating: 7.5,
    quality: "HD",
    year: 2026,
    type: "Movie",
    episodes: null,
  },
  {
    id: 7,
    title: "Bloodline Hunter",
    info: "Action • 2026 • Agasobanuye by Perfect",
    image: lastWarriorImg,
    rating: 8.1,
    quality: "4K",
    year: 2026,
    type: "Movie",
    episodes: null,
  },
  {
    id: 8,
    title: "Crimson Horizon",
    info: "Sci-Fi • 2025 • Agasobanuye by Kevin",
    image: shadowDragonImg,
    rating: 7.9,
    quality: "HD",
    year: 2025,
    type: "Movie",
    episodes: null,
  },
  {
    id: 9,
    title: "Wrath of the King",
    info: "Historical • 2024 • Agasobanuye by Chris",
    image: extraImg,
    rating: 7.3,
    quality: "HD",
    year: 2024,
    type: "Movie",
    episodes: null,
  },
  {
    id: 10,
    title: "VisionQuest",
    info: "Sci-Fi • 2026 • Marvel Television",
    image: midnightRevengeImg,
    rating: 8.6,
    quality: "4K",
    year: 2026,
    type: "Movie",
    episodes: null,
  },
];

/* ---------- LATEST SERIES ---------- */
const latestSeries = [
  {
    id: 11,
    title: "Dark Horizon",
    info: "Thriller • 2026 • Season 1",
    image: scorpionKingImg,
    rating: 8.0,
    quality: "HD",
    year: 2026,
    type: "Series",
    episodes: 8,
  },
  {
    id: 12,
    title: "The Silent Order",
    info: "Mystery • 2025 • Season 2",
    image: ironFistImg,
    rating: 7.7,
    quality: "HD",
    year: 2025,
    type: "Series",
    episodes: 12,
  },
  {
    id: 13,
    title: "Echoes of War",
    info: "Drama • 2026 • Season 1",
    image: raudseRusikagaImg,
    rating: 8.2,
    quality: "4K",
    year: 2026,
    type: "Series",
    episodes: 6,
  },
  {
    id: 14,
    title: "Neon Streets",
    info: "Cyberpunk • 2025 • Season 3",
    image: shadowDragonImg,
    rating: 7.4,
    quality: "HD",
    year: 2025,
    type: "Series",
    episodes: 10,
  },
  {
    id: 15,
    title: "Kingdom Come",
    info: "Fantasy • 2026 • Season 1",
    image: lastWarriorImg,
    rating: 8.5,
    quality: "4K",
    year: 2026,
    type: "Series",
    episodes: 9,
  },
];

/* ---------- ACTIONS ---------- */
function watchCard(card) {
  router.push(`/watch/${card.id}`);
}

function watchMovie() {
  router.push("/watch/1");
}

function downloadMovie() {
  alert("Connect your movie download link here.");
}
/* ---------- HEADER ACTIONS ---------- */
function getApp() {
  router.push("/download");
}
</script>

<style scoped>
.home-dashboard {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 40px;
}

/* ================= HERO ================= */
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 48px 44px;
  overflow: hidden;

  background:
    radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.25), transparent 45%),
    radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.2), transparent 45%),
    linear-gradient(135deg, rgba(20, 27, 55, 0.9), rgba(13, 18, 36, 0.9));

  border: 1px solid rgba(129, 140, 248, 0.25);
  border-radius: 26px;
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.3);
}

.hero-content {
  max-width: 580px;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 13px;
  margin-bottom: 20px;

  color: #c7d2fe;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;

  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 20px;
}

.hero-content h1 {
  font-size: clamp(30px, 4.2vw, 48px);
  font-weight: 850;
  line-height: 1.15;
  letter-spacing: -1.5px;
  color: #ffffff;
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-tagline {
  margin-top: 16px;
  color: #a5b4fc;
  font-size: 15px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  min-height: 48px;
  padding: 12px 22px;

  font-size: 13px;
  font-weight: 700;
  text-decoration: none;

  border-radius: 13px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.btn-primary {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  box-shadow: 0 8px 22px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
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

.hero-stats {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 34px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.stat-label {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.stat-divider {
  width: 1px;
  height: 34px;
  background: rgba(148, 163, 184, 0.25);
}

.hero-visual {
  position: relative;
  width: 240px;
  height: 240px;
  flex-shrink: 0;
}

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 11px 15px;

  color: #e2e8f0;
  font-size: 12px;
  font-weight: 600;

  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 13px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);

  animation: float 4s ease-in-out infinite;
}

.card-1 {
  top: 0;
  left: 0;
  animation-delay: 0s;
}

.card-2 {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  animation-delay: 1.2s;
}

.card-3 {
  bottom: 0;
  left: 10%;
  animation-delay: 2.4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.card-2 {
  animation-name: floatRight;
}

@keyframes floatRight {
  0%, 100% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-50%) translateX(-8px); }
}

/* ================= SECTION HEADINGS ================= */
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

.view-all {
  display: inline-flex;
  align-items: center;
  gap: 5px;

  color: #a5b4fc;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;

  transition: color 0.2s ease, gap 0.2s ease;
}

.view-all:hover {
  color: #ffffff;
  gap: 8px;
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

/* ================= QUICK CATEGORIES ================= */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 14px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  padding: 16px;

  background: linear-gradient(145deg, rgba(21, 27, 50, 0.9), rgba(13, 18, 36, 0.9));
  border: 1px solid rgba(129, 140, 248, 0.18);
  border-radius: 15px;

  text-align: left;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.category-card:hover {
  transform: translateY(-3px);
  border-color: rgba(129, 140, 248, 0.6);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.cat-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.cat-name {
  color: #f8fafc;
  font-size: 13px;
  font-weight: 700;
}

.cat-count {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 500;
}

/* ================= FEATURED MOVIE ================= */
.featured-section {
  width: 100%;
}

.featured-movie {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;

  width: 100%;
  min-height: 440px;
  overflow: hidden;

  background: #111827;
  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 22px;
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.3);
}

.featured-image {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.7s ease;
}

.featured-movie:hover .featured-image {
  transform: scale(1.035);
}

.movie-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg, rgba(5, 8, 20, 0.96) 0%, rgba(5, 8, 20, 0.77) 42%, rgba(5, 8, 20, 0.12) 100%),
    linear-gradient(0deg, rgba(5, 8, 20, 0.75), transparent 65%);
}

.movie-details {
  width: min(610px, 100%);
  padding: 42px;
}

.movie-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  margin-bottom: 18px;
  padding: 7px 11px;

  color: #c7d2fe;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 1px;

  background: rgba(99, 102, 241, 0.18);
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 8px;
}

.movie-details h2 {
  color: #ffffff;
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 850;
  letter-spacing: -1.2px;
  line-height: 1.2;
}

.movie-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  color: #cbd5e1;
  font-size: 13px;
}

.meta-dot {
  width: 4px;
  height: 4px;
  background: #818cf8;
  border-radius: 50%;
}

.quality-tag {
  padding: 2px 8px;
  color: #c7d2fe;
  font-size: 10px;
  font-weight: 700;
  background: rgba(99, 102, 241, 0.35);
  border: 1px solid rgba(129, 140, 248, 0.5);
  border-radius: 6px;
}

.movie-description {
  max-width: 440px;
  margin-top: 17px;
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.8;
}

.movie-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 27px;
}

.movie-actions button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  min-height: 48px;
  padding: 12px 19px;

  color: #ffffff;
  font-size: 13px;
  font-weight: 700;

  border: 1px solid transparent;
  border-radius: 12px;
  transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.movie-actions button:hover {
  transform: translateY(-2px);
}

.watch-btn {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
}

.watch-btn:hover {
  background: linear-gradient(135deg, #818cf8, #6366f1);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.35);
}

.download-btn {
  background: rgba(15, 23, 42, 0.65);
  border-color: rgba(203, 213, 225, 0.3);
  backdrop-filter: blur(12px);
}

.download-btn:hover {
  background: rgba(99, 102, 241, 0.3);
}

/* ================= CARDS ================= */
.content-section {
  width: 100%;
}

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
  margin: 2px 0;
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

/* ================= CTA BANNER ================= */
.cta-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;

  padding: 28px 32px;

  background:
    radial-gradient(circle at 10% 50%, rgba(99, 102, 241, 0.25), transparent 40%),
    linear-gradient(135deg, rgba(20, 27, 55, 0.9), rgba(13, 18, 36, 0.9));

  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 22px;
}

.cta-content {
  display: flex;
  align-items: center;
  gap: 18px;
}

.cta-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  flex-shrink: 0;

  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-radius: 16px;
  box-shadow: 0 8px 22px rgba(99, 102, 241, 0.3);
}

.cta-content h3 {
  color: #ffffff;
  font-size: 17px;
  font-weight: 750;
}

.cta-content p {
  margin-top: 4px;
  color: #94a3b8;
  font-size: 13px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;

  min-height: 46px;
  padding: 12px 22px;

  color: #ffffff;
  font-size: 13px;
  font-weight: 700;

  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.4);
  border-radius: 13px;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(99, 102, 241, 0.35);
}

/* ================= RESPONSIVE ================= */
@media (max-width: 1100px) {
  .hero-section {
    flex-direction: column;
    align-items: flex-start;
    padding: 40px 32px;
  }

  .hero-visual {
    display: none;
  }
}

@media (max-width: 950px) {
  .cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .movie-details {
    padding: 30px;
  }

  .featured-movie {
    min-height: 420px;
  }
}

@media (max-width: 650px) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .card {
    border-radius: 13px;
  }

  .card > img {
    border-radius: 13px 13px 0 0;
    aspect-ratio: 16 / 10;
  }

  .collection {
    padding: 10px;
    gap: 3px;
  }

  .collection p {
    font-size: 12px;
  }

  .collection small {
    font-size: 9px;
  }

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
}

@media (max-width: 600px) {
  .home-dashboard {
    gap: 36px;
  }

  .hero-section {
    padding: 28px 20px;
    border-radius: 18px;
  }

  .hero-content h1 {
    font-size: 28px;
    letter-spacing: -1px;
  }

  .hero-tagline {
    font-size: 13px;
  }

  .hero-actions {
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    flex: 1 1 100%;
    min-height: 46px;
  }

  .hero-stats {
    gap: 16px;
  }

  .stat-value {
    font-size: 18px;
  }

  .section-heading h2 {
    gap: 9px;
    font-size: 17px;
  }

  .heading-line {
    height: 24px;
  }

  .movie-count {
    padding: 7px 9px;
    font-size: 11px;
  }

  .featured-movie {
    min-height: 460px;
    border-radius: 17px;
  }

  .movie-overlay {
    background:
      linear-gradient(0deg, rgba(5, 8, 20, 0.98) 0%, rgba(5, 8, 20, 0.8) 48%, rgba(5, 8, 20, 0.12) 100%);
  }

  .movie-details {
    padding: 22px 18px;
  }

  .movie-details h2 {
    font-size: 30px;
  }

  .movie-description {
    font-size: 13px;
  }

  .movie-actions button {
    flex: 1 1 100%;
    min-height: 45px;
    padding: 11px;
  }

  .cta-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 22px;
  }

  .cta-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 380px) {
  .cards {
    grid-template-columns: 1fr;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>