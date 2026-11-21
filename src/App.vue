
<template>
  <div class="page">

    <!-- SPLASH INTRO -->
    <Transition name="splash">
      <SplashIntro
        v-if="showSplash"
        @finish="showSplash = false"
      />
    </Transition>

    <!-- APPLICATION HEADER -->
    <header v-if="!hideChrome" class="app-header">

      <!-- LOGO -->
      <div class="logo">
        <img
          src="@/assets/stream.png"
          alt="Stream.Store Logo"
        />
        <router-link to="/home">
          Stream.store
        </router-link>
      </div>

      <!-- MAIN NAVIGATION -->
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

      <!-- HEADER ACTIONS -->
      <div class="uses">

        <!-- SEARCH -->
        <form
          class="search-box"
          @submit.prevent="submitSearch"
          role="search"
        >
          <Search :size="18" aria-hidden="true" />

          <input
            ref="searchInput"
            v-model="searchQuery"
            type="search"
            placeholder="Search movies, series, actors..."
            aria-label="Search movies, series and actors"
          />

          <kbd class="search-kbd">/</kbd>
        </form>

        <!-- GET APP -->
        <button class="get-app" @click="getApp">
          <Download :size="17" />
          <span>Get App</span>
        </button>

        <!-- SETTINGS MENU -->
        <div class="user-wrap">

          <button
            ref="userBtn"
            class="user-btn"
            :class="{ active: show }"
            @click.stop="show = !show"
            aria-label="Open settings menu"
            :aria-expanded="show"
          >
            <Settings :size="21" />
            <span class="user-status-dot"></span>
          </button>

          <Transition name="dropdown">
            <div
              v-if="show"
              class="user-menu"
              @click.stop
            >

              <!-- MENU HEADER -->
              <div class="user-menu-header">

                <div class="user-avatar">
                  <Settings :size="20" />
                </div>

                <div class="user-meta">
                  <p class="user-name">Settings</p>
                  <p class="user-email">Settings Panel</p>
                </div>

              </div>

              <div class="menu-divider"></div>

              <!-- APPLICATION SETTINGS -->
              <button
                class="menu-item"
                @click="goTo('/settings')"
              >
                <Settings :size="17" />
                <span>App Settings</span>
              </button>

              <!-- ADMIN PANEL -->
              <button
                class="menu-item admin-menu-item"
                @click="goToAdmin"
              >
                <ShieldCheck :size="17" />
                <span>Admin Panel</span>
              </button>

              <div class="menu-divider"></div>

              <p class="menu-footer">
                Stream.Store Settings
              </p>

            </div>
          </Transition>

        </div>
      </div>
    </header>

    <!-- MAIN ROUTER CONTENT -->
    <main
      class="main-content"
      :class="{ 'no-chrome': hideChrome }"
    >

      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>

    </main>

    <!-- APPLICATION FOOTER -->
    <footer v-if="!hideChrome" class="site-footer">

      <div class="footer-container">

        <div class="footer-grid">

          <!-- BRAND -->
          <div class="footer-brand">

            <router-link to="/home" class="footer-logo">

              <img
                src="@/assets/stream.png"
                alt="Stream.Store Logo"
              />

              <span>
                Stream<span class="dot">.</span>Store
              </span>

            </router-link>

            <p class="footer-tagline">
              Enjoy your favorite Agasobanuye films and series online for free!
            </p>

          </div>

          <!-- COMPANY -->
          <div class="footer-col">

            <h4>
              <Building2 :size="14" />
              Company
            </h4>

            <ul>
              <li>
                <router-link to="/about">
                  <Info :size="14" />
                  About Us
                </router-link>
              </li>

              <li>
                <router-link to="/contact">
                  <Mail :size="14" />
                  Contact
                </router-link>
              </li>

              <li>
                <router-link to="/privacy">
                  <Shield :size="14" />
                  Privacy
                </router-link>
              </li>

              <li>
                <router-link to="/terms">
                  <FileText :size="14" />
                  Terms
                </router-link>
              </li>
            </ul>

          </div>

          <!-- BROWSE -->
          <div class="footer-col">

            <h4>
              <Compass :size="14" />
              Browse
            </h4>

            <ul>
              <li>
                <router-link to="/home">
                  <House :size="14" />
                  Home
                </router-link>
              </li>

              <li>
                <router-link to="/movies">
                  <Clapperboard :size="14" />
                  Movies
                </router-link>
              </li>

              <li>
                <router-link to="/series">
                  <Tv :size="14" />
                  Series
                </router-link>
              </li>

              <li>
                <router-link to="/mylist">
                  <Bookmark :size="14" />
                  My List
                </router-link>
              </li>
            </ul>

          </div>

          <!-- SOCIAL LINKS -->
          <div class="footer-col">

            <h4>
              <Share2 :size="14" />
              Follow Us
            </h4>

            <div class="footer-social">

              <a
                href="https://wa.me/250789358535"
                target="_blank"
                rel="noopener noreferrer"
                class="social-pill"
              >
                <MessageCircle :size="16" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="social-pill"
              >
                <Instagram :size="16" />
                <span>Instagram</span>
              </a>

              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="social-pill"
              >
                <Youtube :size="16" />
                <span>YouTube</span>
              </a>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                class="social-pill"
              >
                <Send :size="16" />
                <span>Telegram</span>
              </a>

            </div>

          </div>

        </div>

        <!-- COPYRIGHT -->
        <div class="footer-bottom">

          <p>
            &copy; {{ currentYear }}

            <span class="highlight">
              Stream.Store with kennedy dev(codeman)
            </span>.

            All rights reserved.
          </p>

        </div>

      </div>
    </footer>

  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";

import {
  useRouter,
  useRoute,
} from "vue-router";

import SplashIntro from "./components/SplashIntro.vue";

import { useAuthStore } from "@/stores/authStore.js";

import {
  House,
  Clapperboard,
  Tv,
  Bookmark,
  Search,
  Download,
  Settings,
  MessageCircle,
  Instagram,
  Youtube,
  Send,
  Building2,
  Mail,
  Shield,
  FileText,
  Info,
  Compass,
  Share2,
  ShieldCheck,
} from "lucide-vue-next";

// --------------------------------------------------
// ROUTER
// --------------------------------------------------

const router = useRouter();
const route = useRoute();

// --------------------------------------------------
// AUTHENTICATION STORE
// --------------------------------------------------

const authStore = useAuthStore();

// --------------------------------------------------
// APPLICATION STATE
// --------------------------------------------------

const showSplash = ref(true);

const show = ref(false);

const showCategories = ref(false);

const searchQuery = ref("");

const searchInput = ref(null);

const userBtn = ref(null);

const currentYear = new Date().getFullYear();

// --------------------------------------------------
// HIDE PUBLIC HEADER AND FOOTER ON ADMIN PAGES
// --------------------------------------------------

const hideChrome = computed(() => {
  return (
    route.path.startsWith("/admin") ||
    route.path.startsWith("/embed")
  );
});

// --------------------------------------------------
// SEARCH FUNCTIONALITY
// --------------------------------------------------

function submitSearch() {
  const query = searchQuery.value.trim();

  if (!query) {
    searchInput.value?.focus();
    return;
  }

  router.push({
    path: "/browse",
    query: {
      search: query,
    },
  });

  searchQuery.value = "";

  show.value = false;
}

// --------------------------------------------------
// ADMIN PANEL NAVIGATION
// --------------------------------------------------

async function goToAdmin() {
  // Close settings dropdown
  show.value = false;

  // Check existing authentication session
  const loggedIn = authStore.checkSession();

  if (loggedIn) {
    // Already logged in: open dashboard
    await router.push({
      name: "AdminLogin",
    });

    return;
  }

  // Not logged in: open admin login
  await router.push({
    name: "AdminLogin",
    query: {
      redirect: "/admin",
    },
  });
}

// --------------------------------------------------
// GENERAL NAVIGATION
// --------------------------------------------------

function goTo(path) {
  show.value = false;

  router.push(path);
}

// --------------------------------------------------
// GET APP
// --------------------------------------------------

function getApp() {
  show.value = false;

  router.push("/download");
}

// --------------------------------------------------
// CLOSE MENUS WHEN CLICKING OUTSIDE
// --------------------------------------------------

function handleClickOutside(event) {
  if (
    show.value &&
    !event.target.closest(".user-wrap")
  ) {
    show.value = false;
  }

  if (
    showCategories.value &&
    !event.target.closest(".categories-bar")
  ) {
    showCategories.value = false;
  }
}

// --------------------------------------------------
// KEYBOARD SHORTCUTS
// --------------------------------------------------

function handleKeydown(event) {
  if (event.key === "Escape") {
    show.value = false;
    showCategories.value = false;
  }

  // Press / to focus search
  if (
    event.key === "/" &&
    document.activeElement !== searchInput.value &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey
  ) {
    event.preventDefault();

    searchInput.value?.focus();
  }
}

// --------------------------------------------------
// CLOSE DROPDOWN WHEN ROUTE CHANGES
// --------------------------------------------------

watch(
  () => route.fullPath,
  () => {
    show.value = false;
    showCategories.value = false;
  }
);

// --------------------------------------------------
// COMPONENT MOUNT
// --------------------------------------------------

onMounted(() => {
  document.addEventListener(
    "click",
    handleClickOutside
  );

  document.addEventListener(
    "keydown",
    handleKeydown
  );
});

// --------------------------------------------------
// COMPONENT CLEANUP
// --------------------------------------------------

onBeforeUnmount(() => {
  document.removeEventListener(
    "click",
    handleClickOutside
  );

  document.removeEventListener(
    "keydown",
    handleKeydown
  );
});
</script>

<style>
/* --------------------------------------------------
   GLOBAL STYLES
-------------------------------------------------- */

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
    linear-gradient(
      135deg,
      #080b18,
      #11162b 55%,
      #090d1b
    );

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

#app,
.page {
  min-height: 100vh;
  width: 100%;
}

.page {
  overflow: hidden;
}

/* --------------------------------------------------
   HEADER
-------------------------------------------------- */

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  width: 100%;
  min-height: 76px;

  padding: 14px 24px;

  background: rgba(20, 27, 55, 0.72);

  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 0 0 12px 12px;

  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

/* LOGO */

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  color: #a5b4fc;
}

.logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.logo a {
  font-size: 20px;
  font-weight: 750;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
}

/* NAVIGATION */

.route {
  display: flex;
  align-items: center;
  gap: 6px;
}

.routers {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 11px 13px;

  border-radius: 12px;

  color: #cbd5e1;
  font-size: 14px;
  font-weight: 500;

  text-decoration: none;
  white-space: nowrap;

  transition: all 0.25s ease;
}

.routers:hover {
  color: #fff;
  background: rgba(129, 140, 248, 0.12);
}

.routers.router-link-active {
  color: #fff;

  background: linear-gradient(
    135deg,
    #6366f1,
    #7c3aed
  );

  box-shadow: 0 5px 18px rgba(99, 102, 241, 0.25);
}

/* --------------------------------------------------
   HEADER ACTIONS
-------------------------------------------------- */

.uses {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* SEARCH */

.search-box {
  position: relative;

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
}

.search-box:focus-within {
  border-color: #818cf8;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

.search-box input {
  width: 100%;
  min-width: 0;
  height: 100%;

  color: #fff;
  font-size: 12px;

  background: transparent;
  border: none;
  outline: none;
}

.search-box input::placeholder {
  color: #94a3b8;
}

.search-kbd {
  position: absolute;
  right: 10px;
  top: 50%;

  transform: translateY(-50%);

  padding: 2px 6px;

  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;

  background: rgba(148, 163, 184, 0.12);

  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 5px;

  pointer-events: none;
}

/* GET APP BUTTON */

.get-app {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  min-height: 42px;
  padding: 10px 13px;

  color: #fff;
  font-size: 13px;
  font-weight: 600;

  background: linear-gradient(
    135deg,
    #6366f1,
    #7c3aed
  );

  border: 1px solid rgba(167, 139, 250, 0.4);
  border-radius: 12px;

  box-shadow: 0 5px 18px rgba(99, 102, 241, 0.2);

  transition: all 0.25s ease;
  white-space: nowrap;
}

.get-app:hover {
  transform: translateY(-1px);
  box-shadow: 0 7px 22px rgba(99, 102, 241, 0.35);
}

/* --------------------------------------------------
   SETTINGS MENU
-------------------------------------------------- */

.user-wrap {
  position: relative;
}

.user-btn {
  position: relative;

  width: 43px;
  height: 43px;
  padding: 0;

  border-radius: 50%;

  color: #fff;

  background: linear-gradient(
    135deg,
    #4f46e5,
    #9333ea
  );

  border: 1px solid rgba(196, 181, 253, 0.35);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease;
}

.user-btn:hover,
.user-btn.active {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
}

.user-status-dot {
  position: absolute;
  bottom: 1px;
  right: 1px;

  width: 10px;
  height: 10px;

  background: #34d399;
  border: 2px solid #11162b;
  border-radius: 50%;
}

/* DROPDOWN */

.user-menu {
  position: absolute;

  top: calc(100% + 12px);
  right: 0;

  width: 240px;
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  background: rgba(15, 23, 42, 0.98);

  backdrop-filter: blur(24px);

  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 16px;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);

  z-index: 200;
}

.user-menu-header {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px;
  margin-bottom: 4px;

  border-radius: 10px;

  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.18),
    rgba(124, 58, 237, 0.18)
  );

  border: 1px solid rgba(129, 140, 248, 0.25);
}

.user-avatar {
  width: 34px;
  height: 34px;

  border-radius: 50%;

  color: #fff;

  background: linear-gradient(
    135deg,
    #6366f1,
    #9333ea
  );

  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.user-email {
  color: #94a3b8;
  font-size: 11px;
}

/* MENU ITEMS */

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  padding: 9px 11px;

  color: #cbd5e1;
  font-size: 13px;
  font-weight: 500;

  background: transparent;
  border: none;
  border-radius: 9px;

  text-align: left;

  transition: all 0.2s ease;
}

.menu-item:hover {
  color: #fff;

  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.85),
    rgba(124, 58, 237, 0.85)
  );
}

.menu-item svg {
  color: #a5b4fc;
  flex-shrink: 0;
}

.menu-item:hover svg {
  color: #fff;
}

/* ADMIN MENU ITEM */

.admin-menu-item {
  color: #c4b5fd;
}

.admin-menu-item svg {
  color: #a78bfa;
}

.admin-menu-item:hover {
  background: linear-gradient(
    135deg,
    #4f46e5,
    #7c3aed
  );
}

.menu-divider {
  height: 1px;
  margin: 4px 0;

  background: rgba(148, 163, 184, 0.16);
}

.menu-footer {
  text-align: center;
  color: #94a3b8;
  font-size: 11px;
  padding: 5px;
}

/* --------------------------------------------------
   MAIN CONTENT
-------------------------------------------------- */

.main-content {
  width: min(1200px, calc(100% - 48px));

  margin: 0 auto;
  padding: 35px 0 70px;

  margin-top: 76px;
}

/* ADMIN AND EMBED FULL SCREEN */

.main-content.no-chrome {
  padding: 0 !important;
  margin: 0 !important;

  width: 100% !important;
  max-width: none !important;

  min-height: 100vh;
}

/* --------------------------------------------------
   DROPDOWN AND PAGE TRANSITIONS
-------------------------------------------------- */

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --------------------------------------------------
   FOOTER
-------------------------------------------------- */

.site-footer {
  background: linear-gradient(
    180deg,
    #0b1022,
    #080b18
  );

  border-top: 1px solid rgba(129, 140, 248, 0.22);

  padding: 40px 0 28px;
  margin-top: 60px;
}

.footer-container {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
}

.footer-grid {
  display: grid;

  grid-template-columns: 1.4fr 1fr 1fr 1.4fr;

  gap: 40px;

  padding-bottom: 28px;

  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

/* FOOTER LOGO */

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 14px;

  color: #a5b4fc;
  text-decoration: none;

  font-size: 20px;
  font-weight: 750;
}

.footer-logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.footer-logo span {
  color: #fff;
}

.footer-logo .dot {
  color: #c084fc;
}

.footer-tagline {
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.7;
}

/* FOOTER COLUMNS */

.footer-col h4 {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 14px;

  color: #fff;
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
  gap: 10px;

  list-style: none;
}

.footer-col li a {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  color: #94a3b8;
  font-size: 13px;

  text-decoration: none;

  transition: all 0.2s ease;
}

.footer-col li a:hover {
  color: #fff;
  transform: translateX(4px);
}

.footer-col li a svg {
  color: #818cf8;
}

/* SOCIAL LINKS */

.footer-social {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 9px 12px;

  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;

  text-decoration: none;

  background: rgba(255, 255, 255, 0.04);

  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 11px;

  transition: all 0.2s ease;
}

.social-pill:hover {
  color: #fff;
  background: rgba(99, 102, 241, 0.25);
}

.social-pill svg {
  color: #a5b4fc;
}

/* COPYRIGHT */

.footer-bottom {
  padding-top: 20px;

  color: #94a3b8;
  font-size: 12px;

  text-align: center;
}

.footer-bottom .highlight {
  color: #c084fc;
  font-weight: 700;
}

/* --------------------------------------------------
   RESPONSIVE DESIGN
-------------------------------------------------- */

@media (max-width: 1100px) {
  .app-header {
    gap: 12px;
    padding: 12px 16px;
  }

  .search-box {
    width: 190px;
  }

  .routers {
    padding: 10px;
  }
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .app-header {
    flex-wrap: wrap;
  }

  .route {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .uses {
    margin-left: auto;
  }
}

@media (max-width: 600px) {
  .app-header {
    gap: 10px;
    padding: 10px 12px;
  }

  .logo a {
    font-size: 17px;
  }

  .logo img {
    width: 34px;
    height: 34px;
  }

  .route {
    justify-content: space-between;
    gap: 2px;
  }

  .routers {
    gap: 5px;
    padding: 9px 7px;
    font-size: 11px;
  }

  .routers svg {
    width: 15px;
    height: 15px;
  }

  .uses {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .search-box {
    width: 100%;
    flex: 1 1 100%;
  }

  .get-app {
    flex: 1;
    justify-content: center;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .main-content {
    width: calc(100% - 28px);
    padding-top: 24px;
    margin-top: 145px;
  }

  .main-content.no-chrome {
    margin-top: 0;
  }
}

/* --------------------------------------------------
   SPLASH INTRO TRANSITION
-------------------------------------------------- */

.splash-enter-active,
.splash-leave-active {
  transition: opacity 650ms ease;
}

.splash-enter-from,
.splash-leave-to {
  opacity: 0;
}

/* REDUCED MOTION */

@media (prefers-reduced-motion: reduce) {
  .splash-enter-active,
  .splash-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>
