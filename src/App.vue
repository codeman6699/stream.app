
<template>
  <div class="page">
    <header v-if="!hideChrome" class="app-header">
      <div class="logo">
        <Clapperboard :size="27" :stroke-width="2.2" />
        <router-link to="/">Stream.store</router-link>
      </div>

      <nav class="route">
        <router-link class="routers" to="/"><House :size="18" /><span>Home</span></router-link>
        <router-link class="routers" to="/movies"><Clapperboard :size="18" /><span>Movies</span></router-link>
        <router-link class="routers" to="/series"><Tv :size="18" /><span>Series</span></router-link>
        <router-link class="routers" to="/mylist"><Bookmark :size="18" /><span>My List</span></router-link>
        <router-link class="routers" to="/login"><LogIn :size="18" /><span>Log in</span></router-link>
      </nav>

      <div class="uses">
        <form class="search-box" @submit.prevent="submitSearch" role="search">
          <Search :size="18" aria-hidden="true" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="search"
            placeholder="Search movies, series, actors..."
            aria-label="Search movies, series and actors"
          />
          <kbd class="search-kbd" aria-hidden="true">/</kbd>
        </form>
        <button class="get-app" @click="getApp">
          <Download :size="17" /><span>Get App</span>
        </button>
        <div class="user-wrap">
          <button
            ref="userBtn"
            class="user-btn"
            :class="{ active: show }"
            @click.stop="show = !show"
            aria-label="Open user menu"
          >
            <UserRound :size="21" />
            <span class="user-status-dot" aria-hidden="true"></span>
          </button>
          <Transition name="dropdown">
            <div v-if="show" class="user-menu" @click.stop>
              <div class="user-menu-header">
                <div class="user-avatar"><UserRound :size="20" /></div>
                <div class="user-meta">
                  <p class="user-name">Guest User</p>
                  <p class="user-email">guest@stream.store</p>
                </div>
              </div>
              <div class="menu-divider"></div>
              <button class="menu-item" @click="goTo('/profile')"><UserRoundCog :size="17" /><span>Profile Settings</span></button>
              <button class="menu-item" @click="goTo('/settings')"><Settings :size="17" /><span>App Settings</span></button>
              <button class="menu-item" @click="goTo('/admin')"><ShieldCheck :size="17" /><span>Admin Panel</span></button>
              <button class="menu-item" @click="goTo('/mylist')"><Bookmark :size="17" /><span>My List</span></button>
              <div class="menu-divider"></div>
              <button class="menu-item logout" @click="goTo('/login')"><LogOut :size="17" /><span>Logout</span></button>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <main class="main-content" :class="{ 'no-chrome': hideChrome }">
      <div v-if="!hideChrome" class="categories-bar">
        <button class="categories-btn" @click.stop="showCategories = !showCategories">
          <LayoutGrid :size="18" /><span>Categories</span>
          <ChevronDown :size="16" class="chev" :class="{ open: showCategories }" />
        </button>
        <Transition name="dropdown">
          <div v-if="showCategories" class="categories-menu" @click.stop>
            <div class="cat-group">
              <p class="cat-title">Genres</p>
              <button v-for="g in genres" :key="g" class="cat-item" @click="pickCategory('genre', g)">
                <Tag :size="14" /><span>{{ g }}</span>
              </button>
            </div>
            <div class="menu-divider"></div>
            <div class="cat-group">
              <p class="cat-title">Type</p>
              <button class="cat-item" @click="pickCategory('type', 'Movie')"><Clapperboard :size="14" /><span>Movies</span></button>
              <button class="cat-item" @click="pickCategory('type', 'Series')"><Tv :size="14" /><span>Series</span></button>
            </div>
            <div class="menu-divider"></div>
            <div class="cat-group">
              <p class="cat-title">Quality</p>
              <button class="cat-item" @click="pickCategory('quality', '4K')"><Sparkles :size="14" /><span>4K Ultra HD</span></button>
              <button class="cat-item" @click="pickCategory('quality', 'HD')"><MonitorPlay :size="14" /><span>HD</span></button>
            </div>
          </div>
        </Transition>
      </div>

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer v-if="!hideChrome" class="site-footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-brand">
            <router-link to="/" class="footer-logo">
              <Clapperboard :size="24" :stroke-width="2.2" />
              <span>Stream<span class="dot">.</span>Store</span>
            </router-link>
            <p class="footer-tagline">Enjoy your favorite Agasobanuye films and series online for free!</p>
          </div>
          <div class="footer-col">
            <h4><Building2 :size="14" /> Company</h4>
            <ul>
              <li><router-link to="/about"><Info :size="14" /> About Us</router-link></li>
              <li><router-link to="/contact"><Mail :size="14" /> Contact</router-link></li>
              <li><router-link to="/privacy"><Shield :size="14" /> Privacy</router-link></li>
              <li><router-link to="/terms"><FileText :size="14" /> Terms</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4><Compass :size="14" /> Browse</h4>
            <ul>
              <li><router-link to="/"><House :size="14" /> Home</router-link></li>
              <li><router-link to="/movies"><Clapperboard :size="14" /> Movies</router-link></li>
              <li><router-link to="/series"><Tv :size="14" /> Series</router-link></li>
              <li><router-link to="/mylist"><Bookmark :size="14" /> My List</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4><Share2 :size="14" /> Follow Us</h4>
            <div class="footer-social">
              <a href="https://wa.me/250789358535" target="_blank" class="social-pill"><MessageCircle :size="16" /><span>WhatsApp</span></a>
              <a href="https://instagram.com/" target="_blank" class="social-pill"><Instagram :size="16" /><span>Instagram</span></a>
              <a href="https://youtube.com/" target="_blank" class="social-pill"><Youtube :size="16" /><span>YouTube</span></a>
              <a href="https://t.me/" target="_blank" class="social-pill"><Send :size="16" /><span>Telegram</span></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© {{ new Date().getFullYear() }} <span class="highlight">Stream.Store</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  House, Clapperboard, Tv, Bookmark, Search, Download, UserRound, UserRoundCog,
  Settings, LogOut, LayoutGrid, ChevronDown, Tag, Sparkles, MonitorPlay,
  MessageCircle, Instagram, Youtube, Send, Building2, Mail, Shield, FileText,
  Info, Compass, Share2, LogIn, ShieldCheck,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

const hideChrome = computed(() =>
  route.path.startsWith("/admin") || route.path.startsWith("/embed")
);

const show = ref(false);
const showCategories = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);
const userBtn = ref(null);

const genres = ["Action","Fantasy","Sci-Fi","Drama","Thriller","Mystery","Horror","Cyberpunk"];

function submitSearch() {
  const q = searchQuery.value.trim();
  if (!q) return searchInput.value?.focus();
  router.push({ path: "/browse", query: { search: q } });
  searchQuery.value = "";
}

function pickCategory(kind, value) {
  showCategories.value = false;
  router.push({ path: "/browse", query: { [kind]: value } });
}

function goTo(path) {
  show.value = false;
  router.push(path);
}

function getApp() { router.push("/download"); }

function handleClickOutside(e) {
  if (show.value && !e.target.closest(".user-wrap")) show.value = false;
  if (showCategories.value && !e.target.closest(".categories-bar")) showCategories.value = false;
}

function handleKeydown(e) {
  if (e.key === "Escape") { show.value = false; showCategories.value = false; }
  if (e.key === "/" && document.activeElement !== searchInput.value) {
    e.preventDefault();
    searchInput.value?.focus();
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html { min-height: 100%; scroll-behavior: smooth; }
body {
  min-height: 100vh;
  font-family: "Poppins", "Segoe UI", Arial, sans-serif;
  background:
    radial-gradient(circle at 15% 0%, rgba(79, 70, 229, 0.22), transparent 35%),
    linear-gradient(135deg, #080b18, #11162b 55%, #090d1b);
  color: #f8fafc;
}
button, input { font: inherit; }
button { cursor: pointer; }
button:focus-visible, a:focus-visible, input:focus-visible {
  outline: 2px solid #a5b4fc; outline-offset: 3px;
}
#app, .page { min-height: 100vh; width: 100%; }
.page { overflow: hidden; }

.app-header {
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
  width: calc(100% - 40px); min-height: 76px;
  margin: 5px 20px 0; padding: 14px 24px;
  background: rgba(20, 27, 55, 0.72);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 22px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  position: fixed; z-index: 100;
}
.logo { display: flex; align-items: center; gap: 12px; flex-shrink: 0; color: #a5b4fc; }
.logo a { font-size: 20px; font-weight: 750; color: #fff; text-decoration: none; white-space: nowrap; }
.route { display: flex; align-items: center; gap: 6px; }
.routers {
  display: inline-flex; align-items: center; gap: 8px; padding: 11px 13px;
  border-radius: 12px; color: #cbd5e1; font-size: 14px; font-weight: 500;
  text-decoration: none; white-space: nowrap;
  transition: all 0.25s ease;
}
.routers:hover { color: #fff; background: rgba(129, 140, 248, 0.12); }
.routers.router-link-active {
  color: #fff; background: linear-gradient(135deg, #6366f1, #7c3aed);
  box-shadow: 0 5px 18px rgba(99, 102, 241, 0.25);
}

.uses { display: flex; align-items: center; gap: 10px; }
.search-box {
  position: relative; display: flex; align-items: center; gap: 9px;
  width: 255px; height: 42px; padding: 0 13px 0 13px;
  color: #94a3b8; background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 13px;
}
.search-box:focus-within { border-color: #818cf8; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12); }
.search-box input {
  width: 100%; min-width: 0; height: 100%; color: #fff; font-size: 12px;
  background: transparent; border: none; outline: none;
}
.search-box input::placeholder { color: #94a3b8; }
.search-kbd {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  padding: 2px 6px; font-size: 10px; font-weight: 700; color: #94a3b8;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.22); border-radius: 5px;
  pointer-events: none;
}
.get-app {
  display: inline-flex; align-items: center; gap: 8px;
  min-height: 42px; padding: 10px 13px; color: #fff; font-size: 13px; font-weight: 600;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.4); border-radius: 12px;
  box-shadow: 0 5px 18px rgba(99, 102, 241, 0.2);
  transition: all 0.25s ease; white-space: nowrap;
}
.get-app:hover { transform: translateY(-1px); box-shadow: 0 7px 22px rgba(99, 102, 241, 0.35); }

.user-wrap { position: relative; }
.user-btn {
  position: relative; width: 43px; height: 43px; padding: 0; border-radius: 50%;
  color: #fff; background: linear-gradient(135deg, #4f46e5, #9333ea);
  border: 1px solid rgba(196, 181, 253, 0.35);
  display: inline-flex; align-items: center; justify-content: center;
  transition: all 0.2s ease;
}
.user-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35); }
.user-status-dot {
  position: absolute; bottom: 1px; right: 1px; width: 10px; height: 10px;
  background: #34d399; border: 2px solid #11162b; border-radius: 50%;
}
.user-menu {
  position: absolute; top: calc(100% + 12px); right: 0;
  width: 240px; padding: 8px;
  display: flex; flex-direction: column; gap: 4px;
  background: rgba(15, 23, 42, 0.98); backdrop-filter: blur(24px);
  border: 1px solid rgba(129, 140, 248, 0.3); border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); z-index: 200;
}
.user-menu-header {
  display: flex; align-items: center; gap: 10px; padding: 10px; margin-bottom: 4px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(124, 58, 237, 0.18));
  border: 1px solid rgba(129, 140, 248, 0.25);
}
.user-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  color: #fff; background: linear-gradient(135deg, #6366f1, #9333ea);
  display: inline-flex; align-items: center; justify-content: center;
}
.user-name { color: #fff; font-size: 13px; font-weight: 700; }
.user-email { color: #94a3b8; font-size: 11px; }
.menu-item {
  display: flex; align-items: center; gap: 10px; width: 100%;
  padding: 9px 11px; color: #cbd5e1; font-size: 13px; font-weight: 500;
  background: transparent; border: none; border-radius: 9px; text-align: left;
  transition: all 0.2s ease;
}
.menu-item:hover {
  color: #fff;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.85), rgba(124, 58, 237, 0.85));
}
.menu-item svg { color: #a5b4fc; flex-shrink: 0; }
.menu-item:hover svg { color: #fff; }
.menu-item.logout { color: #fca5a5; }
.menu-item.logout:hover { background: rgba(239, 68, 68, 0.2); color: #fff; }
.menu-divider { height: 1px; margin: 4px 0; background: rgba(148, 163, 184, 0.16); }

.main-content {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto; padding: 35px 0 70px; margin-top: 6ch;
}
.main-content.no-chrome {
  padding: 0 !important; margin: 0 !important;
  width: 100% !important; max-width: none !important; min-height: 100vh;
}

.categories-bar { display: flex; justify-content: flex-end; margin-bottom: 26px; position: relative; }
.categories-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 11px 16px; color: #fff; font-size: 13px; font-weight: 650;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.45); border-radius: 12px;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
  transition: all 0.25s ease;
}
.categories-btn:hover { transform: translateY(-2px); }
.categories-btn .chev { transition: transform 0.25s ease; }
.categories-btn .chev.open { transform: rotate(180deg); }
.categories-menu {
  position: absolute; top: calc(100% + 10px); right: 0;
  width: 260px; padding: 10px;
  background: rgba(15, 23, 42, 0.97); backdrop-filter: blur(24px);
  border: 1px solid rgba(129, 140, 248, 0.28); border-radius: 15px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45); z-index: 50;
}
.cat-title {
  padding: 6px 8px 4px; color: #94a3b8; font-size: 10px; font-weight: 750;
  letter-spacing: 1.2px; text-transform: uppercase;
}
.cat-item {
  display: flex; align-items: center; gap: 9px; width: 100%;
  padding: 9px 10px; color: #cbd5e1; font-size: 13px; font-weight: 500;
  text-align: left; background: transparent; border: none; border-radius: 9px;
  transition: all 0.2s ease;
}
.cat-item:hover { color: #fff; background: linear-gradient(135deg, #6366f1, #7c3aed); }
.cat-item svg { color: #a5b4fc; flex-shrink: 0; }
.cat-item:hover svg { color: #fff; }

.dropdown-enter-active, .dropdown-leave-active { transition: all 0.18s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.site-footer {
  background: linear-gradient(180deg, #0b1022, #080b18);
  border-top: 1px solid rgba(129, 140, 248, 0.22);
  padding: 40px 0 28px; margin-top: 60px;
}
.footer-container { width: min(1200px, calc(100% - 48px)); margin: 0 auto; }
.footer-grid {
  display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
  gap: 40px; padding-bottom: 28px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}
.footer-logo {
  display: inline-flex; align-items: center; gap: 10px;
  margin-bottom: 14px; color: #a5b4fc; text-decoration: none;
  font-size: 20px; font-weight: 750;
}
.footer-logo span { color: #fff; }
.footer-logo .dot { color: #c084fc; }
.footer-tagline { color: #94a3b8; font-size: 13px; line-height: 1.7; }
.footer-col h4 {
  display: flex; align-items: center; gap: 8px; margin-bottom: 14px;
  color: #fff; font-size: 12px; font-weight: 750;
  letter-spacing: 1.2px; text-transform: uppercase;
}
.footer-col h4 svg { color: #a5b4fc; }
.footer-col ul { display: flex; flex-direction: column; gap: 10px; list-style: none; }
.footer-col li a {
  display: inline-flex; align-items: center; gap: 8px;
  color: #94a3b8; font-size: 13px; text-decoration: none;
  transition: all 0.2s ease;
}
.footer-col li a:hover { color: #fff; transform: translateX(4px); }
.footer-col li a svg { color: #818cf8; }
.footer-social { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.social-pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 12px; color: #cbd5e1; font-size: 12px; font-weight: 600;
  text-decoration: none; background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 11px;
  transition: all 0.2s ease;
}
.social-pill:hover { color: #fff; background: rgba(99, 102, 241, 0.25); }
.social-pill svg { color: #a5b4fc; }
.footer-bottom {
  padding-top: 20px; color: #94a3b8; font-size: 12px; text-align: center;
}
.footer-bottom .highlight { color: #c084fc; font-weight: 700; }

@media (max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
  .app-header { flex-wrap: wrap; }
  .route { order: 3; width: 100%; justify-content: center; }
  .search-box { width: 200px; }
}
@media (max-width: 600px) {
  .search-box { width: 100%; flex: 1 1 100%; }
  .uses { width: 100%; justify-content: center; flex-wrap: wrap; }
  .footer-grid { grid-template-columns: 1fr; }
  .main-content { width: calc(100% - 28px); padding-top: 24px; }
}
</style>