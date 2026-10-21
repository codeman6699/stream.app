<template>
  <div class="page">
    <!-- ================= HEADER ================= -->
    <header class="app-header">
      <div class="logo">
        <Clapperboard :size="27" :stroke-width="2.2" />
        <a href="./App.vue">Stream.store</a>
      </div>

      <nav class="route">
        <router-link class="routers" to="/home">
          <House :size="18" />
          <span>Home</span>
        </router-link>

        <router-link class="routers" to="/movies">
          <Clapperboard :size="18" />
          <span>Movies</span>
        </router-link>

        <router-link class="routers" to="/series">
          <Tv :size="18" />
          <span>Series</span>
        </router-link>

        <router-link class="routers" to="/mylist">
          <Bookmark :size="18" />
          <span>My List</span>
        </router-link>

      </nav>

      <div class="uses">
        <div class="search-box">
          <Search :size="18" />
          <input
            type="search"
            placeholder="Search movies, series, actors..."
            aria-label="Search movies, series and actors"
          >
        </div>

        <button class="notification" aria-label="Notifications">
          <Bell :size="20" />
          <span class="notification-dot"></span>
        </button>

        <button class="get-app">
          <Download :size="17" />
          <span>Get App</span>
        </button>

        <button
          class="user-btn"
          @click="show = !show"
          :aria-expanded="show"
          aria-label="Open user menu"
        >
          <UserRound :size="21" />
        </button>

        <div v-if="show" class="user-menu">
          <button @click="show = false">
            <UserRoundCog :size="17" />
            Profile Settings
          </button>

          <button @click="show = false">
            <Settings :size="17" />
            App Settings
          </button>

          <button @click="show = false">
            <Info :size="17" />
            About Us
          </button>

          <div class="menu-divider"></div>

          <button class="logout" @click="logout">
            <LogOut :size="17" />
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- ================= MAIN CONTENT ================= -->
    <main class="main-content">

      <!-- ================= CATEGORIES BAR ================= -->
      <div class="categories-bar">
        <button
          class="categories-btn"
          @click="showCategories = !showCategories"
          :aria-expanded="showCategories"
          aria-label="Toggle categories menu"
        >
          <LayoutGrid :size="18" />
          <span>Categories</span>
          <ChevronDown
            :size="16"
            class="chev"
            :class="{ open: showCategories }"
          />
        </button>

        <div v-if="showCategories" class="categories-menu">
          <div class="cat-group">
            <p class="cat-title">Genres</p>

            <button
              v-for="genre in genres"
              :key="genre"
              class="cat-item"
              @click="pickCategory('genre', genre)"
            >
              <Tag :size="14" />
              <span>{{ genre }}</span>
            </button>
          </div>

          <div class="menu-divider"></div>

          <div class="cat-group">
            <p class="cat-title">Type</p>

            <button class="cat-item" @click="pickCategory('type', 'Movie')">
              <Clapperboard :size="14" />
              <span>Movies</span>
            </button>

            <button class="cat-item" @click="pickCategory('type', 'Series')">
              <Tv :size="14" />
              <span>Series</span>
            </button>
          </div>

          <div class="menu-divider"></div>

          <div class="cat-group">
            <p class="cat-title">Quality</p>

            <button class="cat-item" @click="pickCategory('quality', '4K')">
              <Sparkles :size="14" />
              <span>4K Ultra HD</span>
            </button>

            <button class="cat-item" @click="pickCategory('quality', 'HD')">
              <MonitorPlay :size="14" />
              <span>HD</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Welcome Section -->
      <section class="welcome-section">
        <div class="brand-icon">
          <Clapperboard :size="32" />
        </div>

        <h1>STREAM<span>.STORE</span></h1>

        <p class="tagline">
          Download Free Agasobanuye Series and Movies
        </p>

        <div class="welcome-banner">
          <Info :size="19" />
          <p>
            Welcome to <strong>STREAM.STORE</strong> —
            your support keeps us going!
          </p>
        </div>

        <div class="welcome-description">
          <p>
            Welcome to Stream. Download Agasobanuye ku buntu
            ku basobanuzi bose ushaka.
          </p>
          <p>Find your favorite movies and series here.</p>
        </div>
      </section>

      <!-- Featured Movies -->
      <section class="featured-section">
        <div class="section-heading">
          <h2>
            <span class="heading-line"></span>
            Featured Movies
          </h2>

          <span class="movie-count">5 Movies</span>
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
            </div>

            <p class="movie-description">
              Agasobanuye by Perfect. Enjoy your favorite
              movies and discover exciting entertainment.
            </p>

            <div class="movie-actions">
              <button class="watch-btn" @click="watchMovie">
                <Play :size="18" fill="currentColor" />
                Watch Now
              </button>

              <button class="download-btn" @click="downloadMovie">
                <Download :size="18" />
                Download Now
              </button>
            </div>
          </div>
        </article>
      </section>

      <!-- Trending Movies -->
      <div class="featured1-section">
        <div class="section-heading">
          <h2><Flame :size="20" color="#FF6B35" /> Trending Movies</h2>
          <span class="movie-count">{{ trendingMovies.length }} Movies</span>
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
      </div>

      <!-- Latest Movies -->
      <div class="featured1-section">
        <div class="section-heading">
          <h2>
            <span class="heading-line"></span>
            Latest Movies
          </h2>
          <span class="movie-count">{{ latestMovies.length }} Movies</span>
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
      </div>

      <!-- Latest Series -->
      <div class="featured1-section">
        <div class="section-heading">
          <h2>
            <span class="heading-line"></span>
            Latest Series
          </h2>
          <span class="movie-count">{{ latestSeries.length }} Series</span>
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
      </div>
       <router-view />

    </main>

    <!-- ================= FOOTER ================= -->
    <footer class="site-footer">
      <div class="footer-container">

        <!-- CTA strip -->
        <div class="footer-cta">
          <div class="footer-cta-content">
            <span class="footer-cta-badge">
              <Sparkles :size="14" />
              NOW STREAMING
            </span>
            <h3>Ready to binge your next favorite?</h3>
            <p>Join thousands of fans watching Agasobanuye movies and series — free, forever.</p>
          </div>

          <router-link to="/home" class="footer-cta-btn">
            <Play :size="16" fill="currentColor" />
            Start Watching
          </router-link>
        </div>

        <!-- Main grid -->
        <div class="footer-grid">

          <!-- Brand -->
          <div class="footer-brand">
            <router-link to="/home" class="footer-logo" aria-label="Stream.Store Home">
              <Clapperboard :size="24" :stroke-width="2.2" />
              <span>Stream<span class="dot">.</span>Store</span>
            </router-link>
            <p class="footer-tagline">
              Thank you for choosing Stream.Store. Enjoy your favorite
              Agasobanuye films and series online for free!
            </p>
            <div class="footer-badges">
              <span class="footer-badge">
                <Sparkles :size="13" /> 4K Ultra HD
              </span>
              <span class="footer-badge">
                <Download :size="13" /> Free Downloads
              </span>
            </div>
          </div>

          <!-- Company -->
          <div class="footer-col">
            <h4><Building2 :size="14" /> Company</h4>
            <ul>
              <li>
                <router-link to="/about">
                  <Info :size="14" /> About Us
                </router-link>
              </li>
              <li>
                <router-link to="/contact">
                  <Mail :size="14" /> Contact Us
                </router-link>
              </li>
              <li>
                <router-link to="/privacy">
                  <Shield :size="14" /> Privacy Policy
                </router-link>
              </li>
              <li>
                <router-link to="/terms">
                  <FileText :size="14" /> Terms
                </router-link>
              </li>
              <li>
                <router-link to="/disclaimer">
                  <AlertCircle :size="14" /> Disclaimer
                </router-link>
              </li>
              <li>
                <router-link to="/howwork">
                  <HelpCircle :size="14" /> How It Works
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Browse -->
          <div class="footer-col">
            <h4><Compass :size="14" /> Browse</h4>
            <ul>
              <li>
                <router-link to="/home">
                  <House :size="14" /> Home
                </router-link>
              </li>
              <li>
                <router-link to="/movies">
                  <Clapperboard :size="14" /> Movies
                </router-link>
              </li>
              <li>
                <router-link to="/series">
                  <Tv :size="14" /> Series
                </router-link>
              </li>
              <li>
                <router-link to="/mylist">
                  <Bookmark :size="14" /> My List
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Follow Us -->
          <div class="footer-col footer-follow">
            <h4><Share2 :size="14" /> Follow Us</h4>
            <div class="footer-social">
              <a href="https://wa.me/250789358535" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="WhatsApp">
                <MessageCircle :size="16" />
                <span>WhatsApp</span>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="Instagram">
                <Instagram :size="16" />
                <span>Instagram</span>
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="YouTube">
                <Youtube :size="16" />
                <span>YouTube</span>
              </a>
              <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="TikTok">
                <Music2 :size="16" />
                <span>TikTok</span>
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="Telegram">
                <Send :size="16" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <p>
            © <span id="year"></span>
            <span class="highlight">Stream.Store</span>.
            All rights reserved. Made with ❤️ for Agasobanuye fans.
          </p>
          <div class="footer-bottom-links">
            <router-link to="/privacy">Privacy</router-link>
            <span class="sep">•</span>
            <router-link to="/terms">Terms</router-link>
            <span class="sep">•</span>
            <router-link to="/disclaimer">Disclaimer</router-link>
          </div>
        </div>

      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref } from "vue";


import lastWarriorImg from "@/assets/5eDgJqnnmYVvE8T72rDST4u0VCq.webp";
import shadowDragonImg from "@/assets/9cWoy2uxaUYtlFLiC11YRC0bPex.webp";
import midnightRevengeImg from "@/assets/ccY2f1o9M8OjFpQb0SVZTuokkYQ.webp";
import scorpionKingImg from "@/assets/oFEHcmPuI95aoeNrWXCVnA4oI5Y.webp";
import ironFistImg from "@/assets/osZ6HJJBPwptZLTXFYbGQ0Jc7WB.webp";
import raudseRusikagaImg from "@/assets/p9x1aME4mFJTeqhKEAYcUCVuzqC.webp";
import extraImg from "@/assets/nGU2cNmKfNk5MNgp7SmlCELvJMo.webp";



/* ---------- CATEGORIES ---------- */
const showCategories = ref(false);

const genres = [
  "Action",
  "Fantasy",
  "Sci-Fi",
  "Drama",
  "Thriller",
  "Mystery",
  "Horror",
  "Cyberpunk",
];




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


</script>

<script>
import {
  House,
  Clapperboard,
  Tv,
  Bookmark,
  Search,
  Bell,
  Download,
  UserRound,
  UserRoundCog,
  Settings,
  Info,
  LogOut,
  Play,
  Flame,
  LayoutGrid,
  ChevronDown,
  Tag,
  Sparkles,
  MonitorPlay,
  MessageCircle,
  Instagram,
  Youtube,
  Music2,
  Send,
  Building2,
  Mail,
  Shield,
  FileText,
  AlertCircle,
  HelpCircle,
  Compass,
  Share2
} from "lucide-vue-next";

export default {
  name: "AppHeader",

  components: {
    House,
    Clapperboard,
    Tv,
    Bookmark,
    Search,
    Bell,
    Download,
    UserRound,
    UserRoundCog,
    Settings,
    Info,
    LogOut,
    Play,
    Flame,
    LayoutGrid,
    ChevronDown,
    Tag,
    Sparkles,
    MonitorPlay,
    MessageCircle,
    Instagram,
    Youtube,
    Music2,
    Send,
    Building2,
    Mail,
    Shield,
    FileText,
    AlertCircle,
    HelpCircle,
    Compass,
    Share2
  },

  data() {
    return {
      show: false,
    };
  },

  methods: {
    watchMovie() {
      this.$router.push("/about");
    },

    downloadMovie() {
      alert("Please connect your movie download link here.");
    },

    logout() {
      this.show = false;
      this.$router.push("/");
    },
  },
};
</script>

<style>
/* ================= GLOBAL STYLES ================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  min-height: 100%;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  font-family: "Poppins", "Segoe UI", Arial, sans-serif;
  background:
    radial-gradient(
      circle at 15% 0%,
      rgba(79, 70, 229, 0.22),
      transparent 35%
    ),
    linear-gradient(135deg, #080b18, #11162b 55%, #090d1b);
  color: #f8fafc;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #a5b4fc;
  outline-offset: 3px;
}

#app {
  min-height: 100vh;
}

.page {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

/* ================= HEADER ================= */

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  width: calc(100% - 40px);
  min-height: 76px;
  margin-left: 20px;
  margin-top: 5px;
  padding: 14px 24px;

  background: rgba(20, 27, 55, 0.72);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 22px;

  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);

  position: fixed;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  color: #a5b4fc;
}

.logo a {
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.6px;
  color: #ffffff;
  white-space: nowrap;
  text-decoration: none;
}

/* ================= NAVIGATION ================= */

.route {
  display: flex;
  align-items: center;
  gap: 6px;
}

.routers {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 11px 13px;
  border-radius: 12px;

  color: #cbd5e1;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;

  transition:
    color 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease;
}

.routers:hover {
  color: #ffffff;
  background: rgba(129, 140, 248, 0.12);
  transform: translateY(-1px);
}

.routers.router-link-active {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  box-shadow: 0 5px 18px rgba(99, 102, 241, 0.25);
}

/* ================= USER ACTIONS ================= */

.uses {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  flex-shrink: 0;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 9px;

  width: 255px;
  height: 42px;
  padding: 0 13px;

  color: #94a3b8;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 13px;

  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.search-box:focus-within {
  background: rgba(255, 255, 255, 0.07);
  border-color: #818cf8;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

.search-box input {
  width: 100%;
  min-width: 0;
  height: 100%;

  color: #ffffff;
  font-family: inherit;
  font-size: 12px;

  background: transparent;
  border: none;
  outline: none;
}

.search-box input::placeholder {
  color: #94a3b8;
}

.uses > button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-height: 42px;
  padding: 10px 13px;

  color: #e2e8f0;
  font-size: 13px;
  font-weight: 500;

  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 12px;

  white-space: nowrap;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.uses > button:hover {
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(129, 140, 248, 0.55);
  transform: translateY(-1px);
}

.uses > button:active {
  transform: translateY(0);
}

.uses .notification {
  width: 42px;
  padding: 0;
  position: relative;
  background: transparent;
  border-color: transparent;
}

.notification-dot {
  position: absolute;
  top: 8px;
  right: 8px;

  width: 7px;
  height: 7px;

  background: #f87171;
  border: 1px solid #11162b;
  border-radius: 50%;
}

.uses .get-app {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.4);
  box-shadow: 0 5px 18px rgba(99, 102, 241, 0.2);
}

.uses .get-app:hover {
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
  box-shadow: 0 7px 22px rgba(99, 102, 241, 0.3);
}

.uses .user-btn {
  width: 43px;
  height: 43px;
  padding: 0;
  border-radius: 50%;

  color: #ffffff;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  border: 1px solid rgba(196, 181, 253, 0.35);
}

/* ================= USER DROPDOWN ================= */

.user-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;

  width: 215px;
  padding: 9px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  background: rgba(15, 23, 42, 0.97);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 15px;

  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);

  animation: dropdownEnter 0.2s ease-out;
}

.uses .user-menu button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  width: 100%;
  min-height: 42px;
  padding: 10px 12px;

  color: #cbd5e1;
  font-size: 13px;

  background: transparent;
  border: none;
  border-radius: 9px;
}

.uses .user-menu button:hover {
  color: #ffffff;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.85),
    rgba(124, 58, 237, 0.85)
  );
}

.menu-divider {
  height: 1px;
  margin: 4px 0;
  background: rgba(148, 163, 184, 0.16);
}

.uses .user-menu button.logout {
  color: #fca5a5;
}

.uses .user-menu button.logout:hover {
  color: #ffffff;
  background: rgba(239, 68, 68, 0.18);
}

@keyframes dropdownEnter {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ================= MAIN CONTENT ================= */

.main-content {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  padding: 35px 0 70px;
  margin-top: 6ch;
}

/* ================= CATEGORIES BAR ================= */

.categories-bar {
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 26px;
  z-index: 50;
}

.categories-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-left: 140ch;
  padding: 11px 16px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.2px;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.45);
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.categories-btn:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
  box-shadow: 0 10px 26px rgba(99, 102, 241, 0.35);
}

.categories-btn .chev {
  transition: transform 0.25s ease;
}

.categories-btn .chev.open {
  transform: rotate(180deg);
}

.categories-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 110ch;

  width: 260px;
  padding: 10px;

  background: rgba(15, 23, 42, 0.97);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 15px;

  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);

  animation: dropdownEnter 0.2s ease-out;
}

.cat-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cat-title {
  padding: 6px 8px 4px;

  color: #94a3b8;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.cat-item {
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
  border-radius: 9px;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.cat-item:hover {
  color: #ffffff;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.85),
    rgba(124, 58, 237, 0.85)
  );
  transform: translateX(3px);
}

.cat-item svg {
  flex-shrink: 0;
  color: #a5b4fc;
}

.cat-item:hover svg {
  color: #ffffff;
}

/* ================= WELCOME SECTION ================= */

.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 22px 0 55px;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 68px;
  height: 68px;
  margin-bottom: 18px;

  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(196, 181, 253, 0.3);
  border-radius: 22px;

  box-shadow: 0 12px 35px rgba(99, 102, 241, 0.25);
}

.welcome-section h1 {
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 850;
  letter-spacing: -1.5px;
  color: #ffffff;
}

.welcome-section h1 span {
  background: linear-gradient(135deg, #818cf8, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.tagline {
  margin-top: 10px;
  color: #a5b4fc;
  font-size: 15px;
  font-weight: 500;
}

.welcome-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: min(680px, 100%);
  min-height: 58px;
  margin-top: 32px;
  padding: 15px 20px;

  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.6;

  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 15px;
}

.welcome-banner > svg {
  flex-shrink: 0;
  color: #a5b4fc;
}

.welcome-banner strong {
  color: #ffffff;
}

.welcome-description {
  margin-top: 24px;
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.9;
}

/* ================= FEATURED MOVIES ================= */

.featured-section {
  width: 100%;
}

.featured1-section {
  width: 100%;
  margin-top: 4ch;
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
  padding: 8px 13px;

  color: #c7d2fe;
  font-size: 12px;
  font-weight: 600;

  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.22);
  border-radius: 10px;
}

/* Featured movie image and overlay */

.featured-movie {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;

  width: 100%;
  min-height: 470px;
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
    linear-gradient(
      90deg,
      rgba(5, 8, 20, 0.96) 0%,
      rgba(5, 8, 20, 0.77) 42%,
      rgba(5, 8, 20, 0.12) 100%
    ),
    linear-gradient(
      0deg,
      rgba(5, 8, 20, 0.75),
      transparent 65%
    );
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

  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
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
  border-color: rgba(203, 213, 225, 0.3) !important;
  backdrop-filter: blur(12px);
}

.download-btn:hover {
  background: rgba(99, 102, 241, 0.3);
}

/* ================= TRENDING MOVIE CARDS ================= */

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
  transition:
    transform 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
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
  transition:
    background 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.collection button:hover {
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
  box-shadow: 0 6px 14px rgba(99, 102, 241, 0.32);
  transform: translateY(-1px);
}

.collection button:active {
  transform: scale(0.98);
}

/* ================= CARD BADGES ================= */

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

/* ================= RESPONSIVE DESIGN ================= */

@media (min-width: 1400px) {
  .cards {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 1200px) {
  .app-header {
    gap: 14px;
    padding: 14px 18px;
  }

  .logo a {
    font-size: 18px;
  }

  .route {
    gap: 2px;
  }

  .routers {
    gap: 6px;
    padding: 10px 9px;
    font-size: 13px;
  }

  .uses {
    gap: 6px;
  }

  .search-box {
    width: 205px;
  }

  .uses .get-app {
    padding: 10px;
  }
}

@media (max-width: 950px) {
  .app-header {
    flex-wrap: wrap;
    justify-content: space-between;
    border-radius: 20px;
  }

  .logo {
    margin-right: auto;
  }

  .route {
    order: 3;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 5px;
  }

  .uses {
    margin-left: auto;
  }

  .search-box {
    width: 220px;
  }

  .main-content {
    width: calc(100% - 36px);
  }

  .featured-movie {
    min-height: 420px;
  }

  .movie-details {
    padding: 30px;
  }

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

  .categories-menu {
    width: 240px;
  }
}

@media (max-width: 600px) {
  .app-header {
    width: calc(100% - 20px);
    margin: 10px auto;
    padding: 16px 12px;
    gap: 16px;
    border-radius: 18px;
  }

  .logo {
    justify-content: center;
    width: 100%;
    margin: 0;
  }

  .logo a {
    font-size: 21px;
  }

  .route {
    gap: 4px;
  }

  .routers {
    gap: 5px;
    padding: 9px 8px;
    font-size: 12px;
  }

  .routers svg {
    width: 15px;
    height: 15px;
  }

  .uses {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0;
    gap: 8px;
  }

  .search-box {
    width: 100%;
    flex: 1 1 100%;
  }

  .uses .notification,
  .uses .get-app,
  .uses .user-btn {
    flex: 0 0 auto;
  }

  .user-menu {
    top: calc(100% + 8px);
    right: 0;
    z-index: 200;
  }

  .main-content {
    width: calc(100% - 28px);
    padding-top: 24px;
  }

  .categories-btn {
    width: 100%;
    justify-content: space-between;
    padding: 12px 14px;
  }

  .categories-menu {
    width: 100%;
  }

  .welcome-section {
    padding: 18px 0 38px;
  }

  .brand-icon {
    width: 58px;
    height: 58px;
    border-radius: 18px;
  }

  .welcome-section h1 {
    font-size: 30px;
    letter-spacing: -1px;
  }

  .tagline {
    max-width: 300px;
    font-size: 13px;
    line-height: 1.7;
  }

  .welcome-banner {
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
    padding: 14px;
    font-size: 12px;
  }

  .welcome-description {
    font-size: 12px;
  }

  .section-heading {
    gap: 10px;
    margin-bottom: 16px;
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

  .featured-image {
    object-position: center;
  }

  .movie-overlay {
    background:
      linear-gradient(
        0deg,
        rgba(5, 8, 20, 0.98) 0%,
        rgba(5, 8, 20, 0.8) 48%,
        rgba(5, 8, 20, 0.12) 100%
      );
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

  .movie-actions {
    gap: 9px;
  }

  .movie-actions button {
    flex: 1 1 100%;
    min-height: 45px;
    padding: 11px;
  }
}

@media (max-width: 380px) {
  .cards {
    grid-template-columns: 1fr;
  }
}

/* ================= ACCESSIBILITY ================= */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ==================== FOOTER ==================== */

.site-footer {
  position: relative;
  margin-top: 60px;
  padding: 0 0 28px;
  background:
    radial-gradient(
      circle at 15% 0%,
      rgba(99, 102, 241, 0.16),
      transparent 40%
    ),
    linear-gradient(180deg, #0b1022, #080b18);
  border-top: 1px solid rgba(129, 140, 248, 0.22);
  overflow: hidden;
}

.site-footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(129, 140, 248, 0.6),
    rgba(192, 132, 252, 0.6),
    transparent
  );
}

.footer-container {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  padding-top: 60px;
}

/* CTA strip */
.footer-cta {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 48px;
  padding: 28px 32px;
  background:
    radial-gradient(
      circle at 85% 20%,
      rgba(192, 132, 252, 0.28),
      transparent 55%
    ),
    linear-gradient(135deg, #1a2247, #121834);
  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 20px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.3);
}

.footer-cta::before {
  content: "";
  position: absolute;
  top: -60px;
  right: -60px;
  width: 180px;
  height: 180px;
  background: radial-gradient(
    circle,
    rgba(192, 132, 252, 0.22),
    transparent 70%
  );
  pointer-events: none;
}

.footer-cta-content {
  position: relative;
  z-index: 1;
  max-width: 560px;
}

.footer-cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  padding: 5px 10px;
  color: #c7d2fe;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 1px;
  background: rgba(99, 102, 241, 0.18);
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 8px;
}

.footer-cta h3 {
  color: #ffffff;
  font-size: clamp(18px, 2.4vw, 24px);
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.25;
}

.footer-cta p {
  margin-top: 8px;
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.6;
}

.footer-cta-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.45);
  border-radius: 12px;
  box-shadow: 0 8px 22px rgba(99, 102, 241, 0.32);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
  white-space: nowrap;
}

.footer-cta-btn:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
  box-shadow: 0 12px 28px rgba(99, 102, 241, 0.45);
}

/* Main grid */
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.footer-brand {
  max-width: 340px;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  color: #a5b4fc;
  text-decoration: none;
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.5px;
}

.footer-logo span {
  color: #ffffff;
}

.footer-logo .dot {
  background: linear-gradient(135deg, #818cf8, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.footer-tagline {
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.75;
}

.footer-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.footer-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  color: #c7d2fe;
  font-size: 11px;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 999px;
}

.footer-badge svg {
  color: #a5b4fc;
}

.footer-col h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.footer-col h4 svg {
  color: #a5b4fc;
}

.footer-col ul {
  display: flex;
  flex-direction: column;
  gap: 11px;
  list-style: none;
}

.footer-col li a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.footer-col li a svg {
  color: #818cf8;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.footer-col li a:hover {
  color: #ffffff;
  transform: translateX(4px);
}

.footer-col li a:hover svg {
  color: #c084fc;
}

/* Social pills */
.footer-social {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 12px;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 11px;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}

.social-pill:hover {
  color: #ffffff;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.28),
    rgba(124, 58, 237, 0.28)
  );
  border-color: rgba(129, 140, 248, 0.55);
  transform: translateY(-2px);
}

.social-pill svg {
  flex-shrink: 0;
  color: #a5b4fc;
  transition: color 0.25s ease;
}

.social-pill:hover svg {
  color: #ffffff;
}

/* Bottom bar */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  padding-top: 26px;
  color: #94a3b8;
  font-size: 12px;
}

.footer-bottom .highlight {
  color: #c084fc;
  font-weight: 700;
}

.footer-bottom-links {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.footer-bottom-links a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-bottom-links a:hover {
  color: #a5b4fc;
}

.footer-bottom-links .sep {
  color: rgba(148, 163, 184, 0.4);
}

/* Footer responsive */
@media (max-width: 950px) {
  .footer-cta {
    padding: 24px;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }

  .footer-brand,
  .footer-follow {
    grid-column: 1 / -1;
  }

  .footer-brand {
    max-width: none;
  }

  .footer-social {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .footer-container {
    width: calc(100% - 32px);
    padding-top: 44px;
  }

  .footer-cta {
    padding: 20px;
    border-radius: 16px;
    gap: 16px;
    margin-bottom: 36px;
  }

  .footer-cta h3 {
    font-size: 18px;
  }

  .footer-cta-btn {
    width: 100%;
    justify-content: center;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
    padding-bottom: 36px;
  }

  .footer-brand,
  .footer-follow {
    grid-column: auto;
  }

  .footer-social {
    grid-template-columns: 1fr 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>

// an other codes

<template>
  <div class="get-app-page">
    <!-- Ambient Background -->
    <div class="ambient-glow"></div>

    <!-- ================= HERO ================= -->
    <section class="hero">
      <div class="hero-badge">
        <Sparkles :size="14" />
        <span>OFFICIAL APP</span>
      </div>

      <h1 class="hero-title">
        Stream.Store on <span class="gradient-text">every screen</span>.
      </h1>

      <p class="hero-subtitle">
        Download the app for faster streaming, offline downloads, and a
        distraction-free cinema experience — free, forever.
      </p>

      <div class="hero-actions">
        <button
          class="store-btn"
          @click="selectPlatform('android')"
          :class="{ active: platform === 'android' }"
        >
          <Smartphone :size="22" />
          <div class="store-btn-text">
            <span class="store-btn-label">Download for</span>
            <span class="store-btn-name">Android</span>
          </div>
        </button>

        <button
          class="store-btn"
          @click="selectPlatform('ios')"
          :class="{ active: platform === 'ios' }"
        >
          <Apple :size="22" />
          <div class="store-btn-text">
            <span class="store-btn-label">Download for</span>
            <span class="store-btn-name">iOS</span>
          </div>
        </button>

        <button
          class="store-btn"
          @click="selectPlatform('tv')"
          :class="{ active: platform === 'tv' }"
        >
          <Tv :size="22" />
          <div class="store-btn-text">
            <span class="store-btn-label">Install on</span>
            <span class="store-btn-name">Smart TV</span>
          </div>
        </button>
      </div>

      <div class="hero-meta">
        <span class="meta-pill">
          <Check :size="12" /> 100% Free
        </span>
        <span class="meta-pill">
          <Star :size="12" /> 4.8/5 rating
        </span>
        <span class="meta-pill">
          <Download :size="12" /> 500K+ downloads
        </span>
        <span class="meta-pill">
          <ShieldCheck :size="12" /> Virus-free
        </span>
      </div>
    </section>

    <!-- ================= PHONE MOCKUP + QR ================= -->
    <section class="showcase">
      <!-- Phone mockup -->
      <div class="phone-mockup" aria-hidden="true">
        <div class="phone-notch"></div>
        <div class="phone-screen">
          <div class="phone-header">
            <Clapperboard :size="18" class="phone-logo" />
            <span class="phone-title">Stream.Store</span>
          </div>

          <div class="phone-hero">
            <div class="phone-hero-shimmer"></div>
            <span class="phone-hero-play">
              <Play :size="20" fill="currentColor" />
            </span>
          </div>

          <div class="phone-row">
            <div class="phone-card"></div>
            <div class="phone-card"></div>
            <div class="phone-card"></div>
          </div>

          <div class="phone-row">
            <div class="phone-card small"></div>
            <div class="phone-card small"></div>
          </div>

          <div class="phone-tabbar">
            <House :size="14" />
            <Clapperboard :size="14" />
            <Bookmark :size="14" />
            <UserRound :size="14" />
          </div>
        </div>
      </div>

      <!-- QR + instructions -->
      <div class="qr-panel">
        <div class="qr-card">
          <div class="qr-svg" v-html="qrSvg"></div>
          <p class="qr-label">Scan to download</p>
        </div>

        <div class="qr-instructions">
          <h3>
            <QrCode :size="18" />
            Scan with your phone
          </h3>
          <ol>
            <li>Open the camera app on your phone.</li>
            <li>Point it at the QR code on the left.</li>
            <li>Tap the link that appears to install the app.</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ================= FEATURES ================= -->
    <section class="features">
      <div class="section-header">
        <h2>Why download the app?</h2>
        <p>Everything you love about Stream.Store — but faster and offline-ready.</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon"><Download :size="20" /></div>
          <h3>Offline downloads</h3>
          <p>Save movies and episodes to watch without internet — perfect for travel.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><Zap :size="20" /></div>
          <h3>Lightning fast</h3>
          <p>Native performance, instant search, and smooth playback at 60fps.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><Bell :size="20" /></div>
          <h3>Smart notifications</h3>
          <p>Get alerts the moment your favorite series drops a new episode.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><MonitorPlay :size="20" /></div>
          <h3>4K Ultra HD</h3>
          <p>Experience every frame in stunning clarity on supported devices.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><ShieldCheck :size="20" /></div>
          <h3>Safe & private</h3>
          <p>No ads, no trackers, no nonsense. Your data stays yours.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><Tv :size="20" /></div>
          <h3>Cast anywhere</h3>
          <p>Stream to Chromecast, Apple TV, or any smart TV in one tap.</p>
        </div>
      </div>
    </section>

    <!-- ================= PLATFORM MATRIX ================= -->
    <section class="platforms">
      <div class="section-header">
        <h2>Available on all your devices</h2>
        <p>Pick a platform to see the install requirements.</p>
      </div>

      <div class="platform-tabs" role="tablist">
        <button
          v-for="p in platforms"
          :key="p.id"
          class="platform-tab"
          :class="{ active: platform === p.id }"
          role="tab"
          :aria-selected="platform === p.id"
          @click="selectPlatform(p.id)"
        >
          <component :is="p.icon" :size="16" />
          <span>{{ p.label }}</span>
        </button>
      </div>

      <div class="platform-detail">
        <div class="platform-info">
          <div class="platform-info-icon">
            <component :is="currentPlatform.icon" :size="28" />
          </div>
          <div>
            <h3>{{ currentPlatform.label }}</h3>
            <p>{{ currentPlatform.description }}</p>
          </div>
        </div>

        <ul class="platform-reqs">
          <li v-for="(req, i) in currentPlatform.requirements" :key="i">
            <Check :size="14" />
            <span>{{ req }}</span>
          </li>
        </ul>

        <button class="btn-primary big" @click="downloadNow">
          <Download :size="16" />
          <span>Download for {{ currentPlatform.label }}</span>
        </button>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="faq">
      <div class="section-header">
        <h2>Frequently asked</h2>
        <p>Quick answers before you hit download.</p>
      </div>

      <div class="faq-list">
        <details
          v-for="(item, i) in faqs"
          :key="i"
          class="faq-item"
        >
          <summary>
            <span>{{ item.q }}</span>
            <ChevronDown :size="16" class="faq-chev" />
          </summary>
          <p>{{ item.a }}</p>
        </details>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="cta">
      <div class="cta-card">
        <div class="cta-text">
          <h2>Ready to start watching?</h2>
          <p>Join 500,000+ fans already using the Stream.Store app.</p>
        </div>
        <button class="btn-primary big" @click="downloadNow">
          <Download :size="18" />
          <span>Get the app free</span>
        </button>
      </div>
    </section>

    <!-- ================= TOAST ================= -->
    <Transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <CheckCircle2 v-if="toast.type === 'success'" :size="18" />
        <AlertCircle v-else-if="toast.type === 'error'" :size="18" />
        <Info v-else :size="18" />
        <span>{{ toast.message }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  Sparkles, Smartphone, Tv, Apple, Download, Check, Star,
  ShieldCheck, Clapperboard, Play, House, Bookmark, UserRound,
  QrCode, Zap, Bell, MonitorPlay, ChevronDown, CheckCircle2,
  AlertCircle, Info
} from "lucide-vue-next";

/* ---------- PLATFORMS ---------- */
const platforms = [
  {
    id: "android",
    label: "Android",
    icon: Smartphone,
    description: "Compatible with Android 8.0 and above. Direct APK download.",
    requirements: [
      "Android 8.0 (Oreo) or higher",
      "100 MB free storage",
      "Internet connection for first launch",
    ],
    link: "https://play.google.com/store/apps",
  },
  {
    id: "ios",
    label: "iOS",
    icon: Apple,
    description: "Available on iPhone and iPad via the App Store.",
    requirements: [
      "iOS 14.0 or higher",
      "150 MB free storage",
      "Apple ID signed in",
    ],
    link: "https://apps.apple.com",
  },
  {
    id: "tv",
    label: "Smart TV",
    icon: Tv,
    description: "Available on Android TV, Fire TV, and Samsung Tizen.",
    requirements: [
      "Android TV 9.0+ / Tizen 5.0+",
      "Wi-Fi or Ethernet",
      "Remote with navigation keys",
    ],
    link: "https://play.google.com/store/apps",
  },
  {
    id: "web",
    label: "Web App",
    icon: MonitorPlay,
    description: "Add Stream.Store to your home screen as a PWA — no install required.",
    requirements: [
      "Chrome, Edge, or Safari",
      "JavaScript enabled",
      "No install — instant access",
    ],
    link: "/",
  },
];

const platform = ref("android");

const currentPlatform = computed(() =>
  platforms.find((p) => p.id === platform.value) || platforms[0]
);

function selectPlatform(id) {
  platform.value = id;
  // Smooth scroll to the platform detail section
  const el = document.querySelector(".platforms");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- SIMULATED QR CODE ---------- */
// A lightweight SVG "QR-like" pattern — replace with a real QR generator
// (e.g. `qrcode` npm package) when wiring to a real download URL.
const qrSvg = `
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <rect width="120" height="120" fill="#ffffff"/>
  <rect x="6" y="6" width="24" height="24" fill="#0b1022"/>
  <rect x="10" y="10" width="16" height="16" fill="#ffffff"/>
  <rect x="14" y="14" width="8" height="8" fill="#0b1022"/>
  <rect x="90" y="6" width="24" height="24" fill="#0b1022"/>
  <rect x="94" y="10" width="16" height="16" fill="#ffffff"/>
  <rect x="98" y="14" width="8" height="8" fill="#0b1022"/>
  <rect x="6" y="90" width="24" height="24" fill="#0b1022"/>
  <rect x="10" y="94" width="16" height="16" fill="#ffffff"/>
  <rect x="14" y="98" width="8" height="8" fill="#0b1022"/>
  <g fill="#0b1022">
    <rect x="40" y="8" width="6" height="6"/><rect x="52" y="8" width="6" height="6"/>
    <rect x="64" y="8" width="6" height="6"/><rect x="76" y="8" width="6" height="6"/>
    <rect x="40" y="20" width="6" height="6"/><rect x="64" y="20" width="6" height="6"/>
    <rect x="76" y="20" width="6" height="6"/>
    <rect x="40" y="32" width="6" height="6"/><rect x="52" y="32" width="6" height="6"/>
    <rect x="64" y="32" width="6" height="6"/>
    <rect x="8" y="40" width="6" height="6"/><rect x="20" y="40" width="6" height="6"/>
    <rect x="32" y="40" width="6" height="6"/><rect x="44" y="40" width="6" height="6"/>
    <rect x="56" y="40" width="6" height="6"/><rect x="68" y="40" width="6" height="6"/>
    <rect x="80" y="40" width="6" height="6"/><rect x="92" y="40" width="6" height="6"/>
    <rect x="104" y="40" width="6" height="6"/>
    <rect x="14" y="52" width="6" height="6"/><rect x="32" y="52" width="6" height="6"/>
    <rect x="50" y="52" width="6" height="6"/><rect x="68" y="52" width="6" height="6"/>
    <rect x="86" y="52" width="6" height="6"/><rect x="104" y="52" width="6" height="6"/>
    <rect x="8" y="64" width="6" height="6"/><rect x="20" y="64" width="6" height="6"/>
    <rect x="38" y="64" width="6" height="6"/><rect x="56" y="64" width="6" height="6"/>
    <rect x="74" y="64" width="6" height="6"/><rect x="92" y="64" width="6" height="6"/>
    <rect x="104" y="64" width="6" height="6"/>
    <rect x="14" y="76" width="6" height="6"/><rect x="44" y="76" width="6" height="6"/>
    <rect x="62" y="76" width="6" height="6"/><rect x="80" y="76" width="6" height="6"/>
    <rect x="98" y="76" width="6" height="6"/>
    <rect x="40" y="88" width="6" height="6"/><rect x="58" y="88" width="6" height="6"/>
    <rect x="76" y="88" width="6" height="6"/><rect x="94" y="88" width="6" height="6"/>
    <rect x="40" y="100" width="6" height="6"/><rect x="52" y="100" width="6" height="6"/>
    <rect x="70" y="100" width="6" height="6"/><rect x="88" y="100" width="6" height="6"/>
    <rect x="104" y="100" width="6" height="6"/>
  </g>
</svg>
`;

/* ---------- FAQS ---------- */
const faqs = [
  {
    q: "Is the app really free?",
    a: "Yes — Stream.Store is 100% free forever. No subscriptions, no hidden fees, no credit card required. Just download and start watching.",
  },
  {
    q: "Do I need an account to use the app?",
    a: "You can browse anonymously, but creating a free account lets you save titles to My List, sync your watch history, and get personalized recommendations across devices.",
  },
  {
    q: "Can I watch offline?",
    a: "Yes! Download any movie or episode from the app and watch it without internet. Downloads are stored locally on your device and can be removed anytime.",
  },
  {
    q: "Which devices are supported?",
    a: "Android (8.0+), iOS (14+), Android TV, Fire TV, Samsung Tizen, and any modern browser via our progressive web app. Chromecast and Apple AirPlay are both supported.",
  },
  {
    q: "How much data does streaming use?",
    a: "Around 1 GB per hour in HD, or 3 GB per hour in 4K. You can lower the quality in Settings → Data Usage to save mobile data.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. We don't sell your data, don't show third-party ads, and encrypt all traffic. You can delete your account and all associated data at any time.",
  },
];

/* ---------- TOAST ---------- */
const toast = reactive({ show: false, message: "", type: "success" });
let toastTimer = null;

function showToast(message, type = "success") {
  toast.show = true;
  toast.message = message;
  toast.type = type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.show = false), 2800);
}

/* ---------- ACTIONS ---------- */
function downloadNow() {
  const p = currentPlatform.value;

  // Web app — no download, just navigate home as PWA prompt
  if (p.id === "web") {
    showToast("Add Stream.Store to your home screen for app-like access.", "info");
    return;
  }

  // Simulate opening the store / APK
  showToast(`Opening ${p.label} store…`, "success");

  // In production, replace this with:
  //   window.open(p.link, "_blank");
  // or trigger an APK download for Android.
  setTimeout(() => {
    // Comment out the line below when wiring a real store link
    // window.open(p.link, "_blank", "noopener,noreferrer");
  }, 600);
}
</script>

<style scoped>
/* ==========================================================================
   BASE
   ========================================================================== */

.get-app-page {
  --bg-base: #080b18;
  --bg-panel: rgba(20, 27, 55, 0.72);
  --bg-panel-hover: rgba(30, 40, 70, 0.8);
  --bg-input: rgba(255, 255, 255, 0.045);

  --text-main: #f8fafc;
  --text-muted: #94a3b8;

  --border-light: rgba(148, 163, 184, 0.2);
  --accent-color: #6366f1;
  --accent-glow: 0 0 24px rgba(99, 102, 241, 0.35);

  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 0 80px;
  color: var(--text-main);
  position: relative;
}

.ambient-glow {
  position: fixed;
  top: -20vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  height: 80vh;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 60%);
  opacity: 0.5;
  pointer-events: none;
  z-index: -1;
  filter: blur(100px);
}

/* ==========================================================================
   HERO
   ========================================================================== */

.hero {
  text-align: center;
  padding: 20px 0 60px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  padding: 6px 14px;
  color: #c7d2fe;
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 999px;
}

.hero-title {
  font-size: clamp(30px, 5vw, 52px);
  font-weight: 850;
  letter-spacing: -1.2px;
  line-height: 1.1;
  color: #ffffff;
  max-width: 780px;
  margin: 0 auto;
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  margin: 20px auto 0;
  max-width: 560px;
  color: var(--text-muted);
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 36px;
}

.store-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: var(--text-main);
  background: var(--bg-input);
  border: 1.5px solid var(--border-light);
  border-radius: 14px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.store-btn:hover {
  background: var(--bg-panel-hover);
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.store-btn.active {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(147, 51, 234, 0.25));
  border-color: #818cf8;
  box-shadow: var(--accent-glow);
}

.store-btn svg {
  color: #a5b4fc;
  flex-shrink: 0;
}

.store-btn.active svg {
  color: #ffffff;
}

.store-btn-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 1.2;
}

.store-btn-label {
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.store-btn-name {
  color: var(--text-main);
  font-size: 15px;
  font-weight: 750;
}

.store-btn.active .store-btn-label {
  color: #c7d2fe;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 32px;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: 999px;
}

.meta-pill svg {
  color: #34d399;
}

/* ==========================================================================
   SHOWCASE (PHONE + QR)
   ========================================================================== */

.showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 60px 0;
}

/* Phone mockup */
.phone-mockup {
  position: relative;
  width: 260px;
  height: 520px;
  margin: 0 auto;
  padding: 14px;
  background: linear-gradient(135deg, #1a1f3a, #0b0f1e);
  border: 2px solid rgba(129, 140, 248, 0.35);
  border-radius: 40px;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.6),
    0 0 60px rgba(99, 102, 241, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.phone-notch {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 22px;
  background: #0b0f1e;
  border-radius: 0 0 14px 14px;
  z-index: 2;
}

.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 32px 14px 14px;
  background: radial-gradient(circle at 20% 0%, rgba(99, 102, 241, 0.15), transparent 50%), #0b1022;
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.phone-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 4px;
}

.phone-logo {
  color: #a5b4fc;
}

.phone-title {
  color: #ffffff;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: -0.3px;
}

.phone-hero {
  position: relative;
  height: 110px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-hero-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.phone-hero-play {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.35);
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  backdrop-filter: blur(8px);
}

.phone-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.phone-card {
  height: 60px;
  background: linear-gradient(135deg, rgba(129, 140, 248, 0.25), rgba(147, 51, 234, 0.25));
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 8px;
}

.phone-row:last-of-type .phone-card {
  grid-column: span 1;
}

.phone-card.small {
  height: 50px;
  grid-column: span 1.5;
}

.phone-row:last-of-type {
  grid-template-columns: 1fr 1fr;
}

.phone-tabbar {
  margin-top: auto;
  display: flex;
  justify-content: space-around;
  padding: 10px 6px;
  color: var(--text-muted);
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 12px;
}

/* QR panel */
.qr-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.qr-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: var(--bg-panel);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
}

.qr-svg {
  width: 160px;
  height: 160px;
  padding: 10px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.qr-svg svg {
  width: 100%;
  height: 100%;
  display: block;
}

.qr-label {
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.qr-instructions {
  padding: 20px 22px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: 16px;
}

.qr-instructions h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--text-main);
  font-size: 14px;
  font-weight: 700;
}

.qr-instructions h3 svg {
  color: #a5b4fc;
}

.qr-instructions ol {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 18px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.5;
}

.qr-instructions li::marker {
  color: #a5b4fc;
  font-weight: 700;
}

/* ==========================================================================
   SECTIONS
   ========================================================================== */

.section-header {
  text-align: center;
  margin-bottom: 36px;
}

.section-header h2 {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 800;
  letter-spacing: -0.6px;
  color: #ffffff;
}

.section-header p {
  margin-top: 8px;
  color: var(--text-muted);
  font-size: 14px;
}

/* FEATURES */
.features {
  padding: 40px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.feature-card {
  padding: 22px;
  background: var(--bg-panel);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  transition: all 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  border-color: rgba(129, 140, 248, 0.55);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3), var(--accent-glow);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 14px;
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 12px;
}

.feature-card h3 {
  margin-bottom: 6px;
  color: var(--text-main);
  font-size: 15px;
  font-weight: 700;
}

.feature-card p {
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
}

/* PLATFORMS */
.platforms {
  padding: 40px 0;
}

.platform-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 26px;
}

.platform-tab {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 16px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 600;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: 999px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.platform-tab:hover {
  color: var(--text-main);
  border-color: var(--accent-color);
}

.platform-tab.active {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-color: transparent;
  box-shadow: var(--accent-glow);
}

.platform-tab.active svg {
  color: #ffffff;
}

.platform-detail {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 26px;
  background: var(--bg-panel);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

.platform-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.platform-info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 16px;
  flex-shrink: 0;
}

.platform-info h3 {
  color: var(--text-main);
  font-size: 17px;
  font-weight: 750;
  margin-bottom: 4px;
}

.platform-info p {
  color: var(--text-muted);
  font-size: 13px;
}

.platform-reqs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 18px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  list-style: none;
}

.platform-reqs li {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--text-muted);
  font-size: 13px;
}

.platform-reqs li svg {
  color: #34d399;
  flex-shrink: 0;
}

/* FAQ */
.faq {
  padding: 40px 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 780px;
  margin: 0 auto;
}

.faq-item {
  background: var(--bg-panel);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.faq-item[open] {
  border-color: rgba(129, 140, 248, 0.5);
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  color: var(--text-main);
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-chev {
  color: var(--text-muted);
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

.faq-item[open] .faq-chev {
  transform: rotate(180deg);
  color: #a5b4fc;
}

.faq-item p {
  padding: 0 20px 18px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.65;
}

/* CTA */
.cta {
  padding: 40px 0 0;
}

.cta-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding: 32px;
  background:
    radial-gradient(circle at 85% 20%, rgba(192, 132, 252, 0.3), transparent 55%),
    linear-gradient(135deg, #1a2247, #121834);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.cta-text h2 {
  color: #ffffff;
  font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.cta-text p {
  margin-top: 6px;
  color: #cbd5e1;
  font-size: 14px;
}

/* ==========================================================================
   BUTTONS
   ========================================================================== */

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.4);
  border-radius: 12px;
  box-shadow: 0 8px 22px rgba(99, 102, 241, 0.32);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-primary:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
  box-shadow: 0 12px 28px rgba(99, 102, 241, 0.45);
}

.btn-primary.big {
  padding: 14px 26px;
  font-size: 14px;
}

/* ==========================================================================
   TOAST
   ========================================================================== */

.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 18px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
}

.toast.success { background: rgba(16, 185, 129, 0.95); border: 1px solid rgba(52, 211, 153, 0.6); }
.toast.error { background: rgba(239, 68, 68, 0.95); border: 1px solid rgba(248, 113, 113, 0.6); }
.toast.info { background: rgba(59, 130, 246, 0.95); border: 1px solid rgba(96, 165, 250, 0.6); }

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* ==========================================================================
   RESPONSIVE
   ========================================================================== */

@media (max-width: 900px) {
  .showcase {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .phone-mockup {
    width: 220px;
    height: 440px;
  }

  .phone-hero {
    height: 90px;
  }

  .phone-card {
    height: 50px;
  }

  .phone-card.small {
    height: 40px;
  }

  .platform-detail {
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .get-app-page {
    padding: 20px 0 60px;
  }

  .hero {
    padding: 10px 0 40px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .store-btn {
    justify-content: center;
  }

  .phone-mockup {
    width: 200px;
    height: 400px;
  }

  .qr-svg {
    width: 130px;
    height: 130px;
  }

  .section-header {
    margin-bottom: 24px;
  }

  .features,
  .platforms,
  .faq {
    padding: 30px 0;
  }

  .cta-card {
    padding: 22px;
    text-align: center;
    justify-content: center;
  }

  .cta-card .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .toast {
    bottom: 16px;
    left: 16px;
    right: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>