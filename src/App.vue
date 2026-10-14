
<template>
  <div class="page">
    <!-- ================= HEADER ================= -->
    <header class="app-header">
      <div class="logo">
        <Clapperboard :size="27" :stroke-width="2.2" />
        <h3>Stream.store</h3>
      </div>

      <nav class="route">
        <router-link class="routers" to="/home">
          <House :size="18" />
          <span>Home</span>
        </router-link>

        <router-link class="routers" to="/about">
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
            from your favorite translators.
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
            src="@/assets/dira.jpg"
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

    </main>
  </div>
</template>

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
  Play
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
    Play
  },

  data() {
    return {
      show: false
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
    }
  }
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
  margin: 20px auto;
  padding: 14px 24px;

  background: rgba(20, 27, 55, 0.72);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 22px;

  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);

  position: relative;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  color: #a5b4fc;
}

.logo h3 {
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.6px;
  color: #ffffff;
  white-space: nowrap;
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

/* ================= RESPONSIVE DESIGN ================= */

@media (max-width: 1200px) {
  .app-header {
    gap: 14px;
    padding: 14px 18px;
  }

  .logo h3 {
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

  .logo h3 {
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
</style>
