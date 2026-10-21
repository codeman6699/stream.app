<template>
  <div class="page">
    <!-- ================= HEADER ================= -->
    <header class="app-header">
      <div class="logo">
        <Clapperboard :size="27" :stroke-width="2.2" />
        <router-link to="/">Stream.store</router-link>
      </div>

      <nav class="route">
        <router-link class="routers" to="/">
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
        <router-link class="routers" to="/login">
          <LogIn :size="18" />
          <span>Log in</span>
        </router-link>
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

        <!-- ============ NOTIFICATIONS ============ -->
        <div class="notif-wrap">
          <button
            ref="notifBtn"
            class="notification"
            :class="{ active: showNotifications }"
            @click.stop="toggleNotifications"
            :aria-expanded="showNotifications"
            aria-haspopup="menu"
            aria-controls="notif-dropdown"
            :aria-label="`Notifications (${unreadCount} unread)`"
          >
            <Bell :size="20" />
            <span
              v-if="unreadCount > 0"
              class="notification-dot"
              aria-hidden="true"
            ></span>
            <span
              v-if="unreadCount > 0"
              class="notification-count"
              aria-hidden="true"
            >{{ unreadCount > 9 ? "9+" : unreadCount }}</span>
          </button>

          <Transition name="dropdown">
            <div
              v-if="showNotifications"
              id="notif-dropdown"
              ref="notifMenu"
              class="notif-menu"
              role="menu"
              aria-label="Notifications"
              @click.stop
              @keydown="handleNotifKeydown"
            >
              <!-- Header -->
              <div class="notif-header">
                <div class="notif-header-text">
                  <h3>Notifications</h3>
                  <p v-if="unreadCount > 0">{{ unreadCount }} unread</p>
                  <p v-else>You're all caught up</p>
                </div>
                <button
                  v-if="unreadCount > 0"
                  class="notif-mark-all"
                  @click="markAllRead"
                >
                  <CheckCheck :size="14" />
                  <span>Mark all read</span>
                </button>
              </div>

              <div class="menu-divider" role="separator"></div>

              <!-- Loading -->
              <div v-if="notificationsLoading" class="notif-empty">
                <Loader2 :size="24" class="spin" />
                <p>Loading notifications…</p>
              </div>

              <!-- Empty state -->
              <div v-else-if="notifications.length === 0" class="notif-empty">
                <div class="notif-empty-icon">
                  <BellOff :size="26" />
                </div>
                <p>No notifications yet</p>
                <span>New releases and updates will appear here.</span>
              </div>

              <!-- List -->
              <ul v-else class="notif-list" role="none">
                <li
                  v-for="n in notifications"
                  :key="n.id"
                  role="none"
                  class="notif-item"
                  :class="{ unread: !n.read }"
                >
                  <button
                    role="menuitem"
                    tabindex="0"
                    class="notif-item-btn"
                    @click="openNotification(n)"
                  >
                    <span class="notif-icon" :class="`notif-icon-${n.type}`">
                      <component :is="resolveIcon(n.type)" :size="16" />
                    </span>
                    <span class="notif-body">
                      <span class="notif-title">{{ n.title }}</span>
                      <span class="notif-text">{{ n.message }}</span>
                      <span class="notif-time">{{ timeAgo(n.createdAt) }}</span>
                    </span>
                    <span
                      v-if="!n.read"
                      class="notif-unread-dot"
                      aria-label="Unread"
                    ></span>
                  </button>
                </li>
              </ul>

              <div class="menu-divider" role="separator"></div>

              <!-- Footer -->
              <button class="notif-footer" @click="goTo('/notifications')">
                <span>View all notifications</span>
                <ChevronRight :size="14" />
              </button>
            </div>
          </Transition>
        </div>

        <button class="get-app" @click="getApp">
          <Download :size="17" />
          <span>Get App</span>
        </button>

        <!-- ============ USER BUTTON + DROPDOWN ============ -->
        <div class="user-wrap">
          <button
            ref="userBtn"
            class="user-btn"
            :class="{ active: show }"
            @click.stop="toggleUserMenu"
            :aria-expanded="show"
            aria-haspopup="menu"
            aria-controls="user-dropdown"
            aria-label="Open user menu"
          >
            <UserRound :size="21" />
            <span class="user-status-dot" aria-hidden="true"></span>
          </button>

          <Transition name="dropdown">
            <div
              v-if="show"
              id="user-dropdown"
              ref="userMenu"
              class="user-menu"
              role="menu"
              aria-label="User menu"
              @click.stop
              @keydown="handleMenuKeydown"
            >
              <div class="user-menu-header">
                <div class="user-avatar" aria-hidden="true">
                  <UserRound :size="20" />
                </div>
                <div class="user-meta">
                  <p class="user-name">{{ user.name }}</p>
                  <p class="user-email">{{ user.email }}</p>
                </div>
              </div>

              <div class="menu-divider" role="separator"></div>

              <button role="menuitem" tabindex="0" class="menu-item" @click="goTo('/profile')">
                <UserRoundCog :size="17" />
                <span>Profile Settings</span>
                <span class="menu-arrow" aria-hidden="true">›</span>
              </button>

              <button role="menuitem" tabindex="0" class="menu-item" @click="goTo('/settings')">
                <Settings :size="17" />
                <span>App Settings</span>
                <span class="menu-arrow" aria-hidden="true">›</span>
              </button>

              <button role="menuitem" tabindex="0" class="menu-item" @click="goTo('/about')">
                <Info :size="17" />
                <span>About Us</span>
                <span class="menu-arrow" aria-hidden="true">›</span>
              </button>

              <button role="menuitem" tabindex="0" class="menu-item" @click="goTo('/mylist')">
                <Bookmark :size="17" />
                <span>My List</span>
                <span class="menu-arrow" aria-hidden="true">›</span>
              </button>

              <div class="menu-divider" role="separator"></div>

              <button role="menuitem" tabindex="0" class="menu-item logout" @click="logout">
                <LogOut :size="17" />
                <span>Logout</span>
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <!-- ================= MAIN CONTENT ================= -->
    <main class="main-content">
      <div class="categories-bar">
        <button
          ref="categoriesBtn"
          class="categories-btn"
          @click.stop="toggleCategories"
          :aria-expanded="showCategories"
          aria-haspopup="menu"
          aria-label="Toggle categories menu"
        >
          <LayoutGrid :size="18" />
          <span>Categories</span>
          <ChevronDown :size="16" class="chev" :class="{ open: showCategories }" />
        </button>

        <Transition name="dropdown">
          <div
            v-if="showCategories"
            ref="categoriesMenu"
            class="categories-menu"
            role="menu"
            aria-label="Categories menu"
            @click.stop
          >
            <div class="cat-group">
              <p class="cat-title">Genres</p>
              <button
                v-for="genre in genres"
                :key="genre"
                class="cat-item"
                role="menuitem"
                @click="pickCategory('genre', genre)"
              >
                <Tag :size="14" />
                <span>{{ genre }}</span>
              </button>
            </div>

            <div class="menu-divider" role="separator"></div>

            <div class="cat-group">
              <p class="cat-title">Type</p>
              <button class="cat-item" role="menuitem" @click="pickCategory('type', 'Movie')">
                <Clapperboard :size="14" />
                <span>Movies</span>
              </button>
              <button class="cat-item" role="menuitem" @click="pickCategory('type', 'Series')">
                <Tv :size="14" />
                <span>Series</span>
              </button>
            </div>

            <div class="menu-divider" role="separator"></div>

            <div class="cat-group">
              <p class="cat-title">Quality</p>
              <button class="cat-item" role="menuitem" @click="pickCategory('quality', '4K')">
                <Sparkles :size="14" />
                <span>4K Ultra HD</span>
              </button>
              <button class="cat-item" role="menuitem" @click="pickCategory('quality', 'HD')">
                <MonitorPlay :size="14" />
                <span>HD</span>
              </button>
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

    <!-- ================= FOOTER ================= -->
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-cta">
          <div class="footer-cta-content">
            <span class="footer-cta-badge">
              <Sparkles :size="14" />
              NOW STREAMING
            </span>
            <h3>Ready to binge your next favorite?</h3>
            <p>Join thousands of fans watching Agasobanuye movies and series — free, forever.</p>
          </div>

          <router-link to="/" class="footer-cta-btn">
            <Play :size="16" fill="currentColor" />
            Start Watching
          </router-link>
        </div>

        <div class="footer-grid">
          <div class="footer-brand">
            <router-link to="/" class="footer-logo" aria-label="Stream.Store Home">
              <Clapperboard :size="24" :stroke-width="2.2" />
              <span>Stream<span class="dot">.</span>Store</span>
            </router-link>
            <p class="footer-tagline">
              Thank you for choosing Stream.Store. Enjoy your favorite
              Agasobanuye films and series online for free!
            </p>
            <div class="footer-badges">
              <span class="footer-badge"><Sparkles :size="13" /> 4K Ultra HD</span>
              <span class="footer-badge"><Download :size="13" /> Free Downloads</span>
            </div>
          </div>

          <div class="footer-col">
            <h4><Building2 :size="14" /> Company</h4>
            <ul>
              <li><router-link to="/about"><Info :size="14" /> About Us</router-link></li>
              <li><router-link to="/contact"><Mail :size="14" /> Contact Us</router-link></li>
              <li><router-link to="/privacy"><Shield :size="14" /> Privacy Policy</router-link></li>
              <li><router-link to="/terms"><FileText :size="14" /> Terms</router-link></li>
              <li><router-link to="/disclaimer"><AlertCircle :size="14" /> Disclaimer</router-link></li>
              <li><router-link to="/howwork"><HelpCircle :size="14" /> How It Works</router-link></li>
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

          <div class="footer-col footer-follow">
            <h4><Share2 :size="14" /> Follow Us</h4>
            <div class="footer-social">
              <a href="https://wa.me/250789358535" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="WhatsApp">
                <MessageCircle :size="16" /><span>WhatsApp</span>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="Instagram">
                <Instagram :size="16" /><span>Instagram</span>
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="YouTube">
                <Youtube :size="16" /><span>YouTube</span>
              </a>
              <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="TikTok">
                <Music2 :size="16" /><span>TikTok</span>
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="Telegram">
                <Send :size="16" /><span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>
            © <span id="year">{{ new Date().getFullYear() }}</span>
            <span class="highlight">Stream.Store</span>.
            All rights reserved. Made with ❤️ for Agasobanuye fans.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter } from "vue-router";
import {
  House,
  Clapperboard,
  Tv,
  Bookmark,
  Search,
  Bell,
  BellOff,
  Download,
  UserRound,
  UserRoundCog,
  Settings,
  Info,
  LogOut,
  Play,
  LayoutGrid,
  ChevronDown,
  ChevronRight,
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
  Share2,
  CheckCheck,
  Film,
  Heart,
  UserPlus,
  Megaphone,
  Loader2,
  LogIn
} from "lucide-vue-next";

const router = useRouter();

/* ---------- STATE ---------- */
const show = ref(false);
const showCategories = ref(false);
const showNotifications = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);
const userBtn = ref(null);
const categoriesBtn = ref(null);
const notifBtn = ref(null);
const userMenu = ref(null);
const categoriesMenu = ref(null);
const notifMenu = ref(null);

/* Fake user — replace with real auth store */
const user = reactive({
  name: "Guest User",
  email: "guest@stream.store",
});

const genres = [
  "Action", "Fantasy", "Sci-Fi", "Drama",
  "Thriller", "Mystery", "Horror", "Cyberpunk",
];

/* ---------- NOTIFICATIONS ---------- */
const notifications = ref([]);
const notificationsLoading = ref(false);
let pollTimer = null;

const unreadCount = computed(() =>
  notifications.value.filter((n) => !n.read).length
);

/* Map API notification type → icon component */
const iconMap = {
  release: Film,
  recommend: Heart,
  social: UserPlus,
  system: Megaphone,
};

function resolveIcon(type) {
  return iconMap[type] || Bell;
}

/* ---------- TIME AGO ---------- */
function timeAgo(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "Just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day > 1 ? "s" : ""} ago`;
  const wk = Math.floor(day / 7);
  if (wk < 4) return `${wk} wk ago`;
  const mo = Math.floor(day / 30);
  return `${mo} mo ago`;
}

/* ---------- LOAD NOTIFICATIONS ---------- */
async function loadNotifications(silent = false) {
  if (!silent) notificationsLoading.value = true;
  try {
    const res = await fetch("/api/notifications");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    notifications.value = data.map((n) => ({
      ...n,
      createdAt:
        typeof n.createdAt === "number"
          ? n.createdAt
          : new Date(n.createdAt).getTime(),
      read: Boolean(n.read),
    }));
  } catch (err) {
    console.error("Failed to load notifications:", err);
  } finally {
    notificationsLoading.value = false;
  }
}

/* ---------- CLICK OUTSIDE ---------- */
function handleClickOutside(e) {
  if (
    show.value &&
    userMenu.value &&
    !userMenu.value.contains(e.target) &&
    !userBtn.value?.contains(e.target)
  ) {
    show.value = false;
  }
  if (
    showCategories.value &&
    categoriesMenu.value &&
    !categoriesMenu.value.contains(e.target) &&
    !categoriesBtn.value?.contains(e.target)
  ) {
    showCategories.value = false;
  }
  if (
    showNotifications.value &&
    notifMenu.value &&
    !notifMenu.value.contains(e.target) &&
    !notifBtn.value?.contains(e.target)
  ) {
    showNotifications.value = false;
  }
}

/* ---------- ESCAPE + SHORTCUTS ---------- */
function handleKeydown(e) {
  if (e.key === "Escape") {
    show.value = false;
    showCategories.value = false;
    showNotifications.value = false;
  }
  if (e.key === "/" && document.activeElement !== searchInput.value) {
    e.preventDefault();
    searchInput.value?.focus();
  }
}

/* ---------- LIFECYCLE ---------- */
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeydown);

  loadNotifications();
  pollTimer = setInterval(() => loadNotifications(true), 60_000);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeydown);
  if (pollTimer) clearInterval(pollTimer);
});

/* ---------- SEARCH ---------- */
function submitSearch() {
  const q = searchQuery.value.trim();
  if (!q) {
    searchInput.value?.focus();
    return;
  }
  router.push({ path: "/browse", query: { search: q } });
  searchQuery.value = "";
}

/* ---------- CATEGORY ---------- */
function pickCategory(kind, value) {
  showCategories.value = false;
  router.push({ path: "/browse", query: { [kind]: value } });
}

/* ---------- USER MENU ---------- */
function toggleUserMenu() {
  show.value = !show.value;
  if (show.value) {
    showCategories.value = false;
    showNotifications.value = false;
    nextTick(() => {
      const firstItem = userMenu.value?.querySelector('[role="menuitem"]');
      firstItem?.focus();
    });
  }
}

function goTo(path) {
  show.value = false;
  showNotifications.value = false;
  router.push(path);
}

function logout() {
  show.value = false;
  const ok = typeof window !== "undefined"
    ? window.confirm("Are you sure you want to log out?")
    : true;
  if (ok) router.push("/login");
}

function handleMenuKeydown(e) {
  const items = Array.from(
    userMenu.value?.querySelectorAll('[role="menuitem"]') || []
  );
  if (!items.length) return;

  const currentIndex = items.indexOf(document.activeElement);

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
      break;
    case "ArrowUp":
      e.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
      break;
    case "Home":
      e.preventDefault();
      items[0]?.focus();
      break;
    case "End":
      e.preventDefault();
      items[items.length - 1]?.focus();
      break;
    case "Escape":
      e.preventDefault();
      show.value = false;
      userBtn.value?.focus();
      break;
    case "Tab":
      setTimeout(() => {
        if (!userMenu.value?.contains(document.activeElement)) {
          show.value = false;
        }
      }, 0);
      break;
  }
}

/* ---------- CATEGORIES MENU ---------- */
function toggleCategories() {
  showCategories.value = !showCategories.value;
  if (showCategories.value) {
    show.value = false;
    showNotifications.value = false;
    nextTick(() => {
      categoriesMenu.value?.querySelector("button")?.focus();
    });
  }
}

/* ---------- NOTIFICATIONS MENU ---------- */
function toggleNotifications() {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) {
    show.value = false;
    showCategories.value = false;
    nextTick(() => {
      const firstItem = notifMenu.value?.querySelector('[role="menuitem"]');
      firstItem?.focus();
    });
  }
}

/* Mark all as read — optimistic + rollback on failure */
async function markAllRead() {
  const previous = notifications.value.map((n) => ({ id: n.id, read: n.read }));
  notifications.value.forEach((n) => (n.read = true));

  try {
    const res = await fetch("/api/notifications/read-all", { method: "POST" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.error("Failed to mark all as read:", err);
    previous.forEach((p) => {
      const item = notifications.value.find((n) => n.id === p.id);
      if (item) item.read = p.read;
    });
  }
}

/* Open one notification — optimistic + navigate + sync */
async function openNotification(n) {
  n.read = true;
  showNotifications.value = false;
  if (n.link) router.push(n.link);

  try {
    const res = await fetch(`/api/notifications/${n.id}/read`, {
      method: "POST",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.error(`Failed to mark notification ${n.id} as read:`, err);
  }
}

function handleNotifKeydown(e) {
  const items = Array.from(
    notifMenu.value?.querySelectorAll('[role="menuitem"]') || []
  );
  if (!items.length) return;

  const currentIndex = items.indexOf(document.activeElement);

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
      break;
    case "ArrowUp":
      e.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
      break;
    case "Home":
      e.preventDefault();
      items[0]?.focus();
      break;
    case "End":
      e.preventDefault();
      items[items.length - 1]?.focus();
      break;
    case "Escape":
      e.preventDefault();
      showNotifications.value = false;
      notifBtn.value?.focus();
      break;
    case "Tab":
      setTimeout(() => {
        if (!notifMenu.value?.contains(document.activeElement)) {
          showNotifications.value = false;
        }
      }, 0);
      break;
  }
}

/* ---------- HEADER ACTIONS ---------- */
function getApp() {
  router.push("/download");
}
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
    radial-gradient(circle at 15% 0%, rgba(79, 70, 229, 0.22), transparent 35%),
    linear-gradient(135deg, #080b18, #11162b 55%, #090d1b);
  color: #f8fafc;
}

button, input {
  font: inherit;
}

button {
  cursor: pointer;
}

button:focus-visible, a:focus-visible, input:focus-visible {
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
  transition: color 0.25s ease, background 0.25s ease, transform 0.25s ease;
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
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  width: 255px;
  height: 42px;
  padding: 0 13px;
  padding-right: 34px;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 13px;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
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

.search-kbd {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 2px 6px;
  font-family: inherit;
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 5px;
  pointer-events: none;
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
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.uses > button:hover {
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(129, 140, 248, 0.55);
  transform: translateY(-1px);
}

.uses > button:active {
  transform: translateY(0);
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

/* ============ NOTIFICATIONS ============ */
.notif-wrap {
  position: relative;
  display: inline-flex;
}

.uses .notification {
  position: relative;
  width: 42px;
  min-height: 42px;
  padding: 0;
  color: #e2e8f0;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease;
}

.uses .notification:hover {
  color: #ffffff;
  background: rgba(129, 140, 248, 0.15);
}

.uses .notification.active {
  color: #ffffff;
  background: rgba(129, 140, 248, 0.22);
  border-color: rgba(129, 140, 248, 0.45);
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.18);
}

.notification-dot {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 8px;
  height: 8px;
  background: #f87171;
  border: 2px solid #11162b;
  border-radius: 50%;
  animation: pulseDot 1.8s ease-in-out infinite;
}

.notification-count {
  position: absolute;
  top: -3px;
  right: -3px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border: 1.5px solid #11162b;
  border-radius: 999px;
  line-height: 1;
}

@keyframes pulseDot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.6); }
  50% { box-shadow: 0 0 0 5px rgba(248, 113, 113, 0); }
}

/* Notification dropdown */
.notif-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 360px;
  max-height: 480px;
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  z-index: 200;
  transform-origin: top right;
  overflow: hidden;
}

.notif-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 16px 10px;
}

.notif-header-text h3 {
  color: #ffffff;
  font-size: 14px;
  font-weight: 750;
  letter-spacing: -0.2px;
}

.notif-header-text p {
  margin-top: 2px;
  color: #94a3b8;
  font-size: 11px;
}

.notif-mark-all {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  color: #a5b4fc;
  font-size: 11px;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.notif-mark-all:hover {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.3);
  border-color: rgba(129, 140, 248, 0.6);
}

.notif-empty {
  padding: 32px 20px;
  text-align: center;
}

.notif-empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 12px;
  color: #64748b;
  background: rgba(148, 163, 184, 0.1);
  border-radius: 50%;
}

.notif-empty p {
  color: #ffffff;
  font-size: 13px;
  font-weight: 650;
}

.notif-empty span {
  display: block;
  margin-top: 4px;
  color: #94a3b8;
  font-size: 11px;
}

.notif-list {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  padding: 4px 6px;
  max-height: 340px;
}

.notif-list::-webkit-scrollbar {
  width: 6px;
}

.notif-list::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 3px;
}

.notif-item {
  margin-bottom: 2px;
}

.notif-item-btn {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  width: 100%;
  padding: 11px 10px;
  color: #cbd5e1;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 10px;
  transition: background 0.2s ease;
}

.notif-item.unread .notif-item-btn {
  background: rgba(99, 102, 241, 0.08);
}

.notif-item-btn:hover,
.notif-item-btn:focus-visible {
  background: rgba(129, 140, 248, 0.18);
  outline: none;
}

.notif-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  color: #ffffff;
  border-radius: 10px;
}

.notif-icon-release { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
.notif-icon-recommend { background: linear-gradient(135deg, #ec4899, #f43f5e); }
.notif-icon-social { background: linear-gradient(135deg, #06b6d4, #0ea5e9); }
.notif-icon-system { background: linear-gradient(135deg, #f59e0b, #f97316); }

.notif-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1;
}

.notif-title {
  color: #ffffff;
  font-size: 12.5px;
  font-weight: 650;
  line-height: 1.3;
}

.notif-text {
  color: #94a3b8;
  font-size: 11.5px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notif-time {
  color: #64748b;
  font-size: 10.5px;
  font-weight: 500;
  margin-top: 2px;
}

.notif-unread-dot {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  margin-top: 6px;
  background: #818cf8;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(129, 140, 248, 0.6);
}

.notif-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 12px;
  color: #a5b4fc;
  font-size: 12px;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.08);
  border: none;
  border-top: 1px solid rgba(148, 163, 184, 0.12);
  transition: background 0.2s ease, color 0.2s ease;
}

.notif-footer:hover {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.18);
}

/* ============ USER BUTTON + DROPDOWN ============ */
.user-wrap {
  position: relative;
  display: inline-flex;
}

.uses .user-btn {
  position: relative;
  width: 43px;
  height: 43px;
  padding: 0;
  border-radius: 50%;
  color: #ffffff;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  border: 1px solid rgba(196, 181, 253, 0.35);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.uses .user-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
}

.uses .user-btn.active {
  box-shadow:
    0 0 0 3px rgba(129, 140, 248, 0.35),
    0 6px 20px rgba(99, 102, 241, 0.35);
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
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  z-index: 200;
  transform-origin: top right;
}

.user-menu-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 4px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(124, 58, 237, 0.18));
  border: 1px solid rgba(129, 140, 248, 0.25);
}

.user-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #9333ea);
  flex-shrink: 0;
}

.user-meta {
  min-width: 0;
}

.user-name {
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  color: #94a3b8;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.uses .user-menu .menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 40px;
  padding: 9px 11px;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 9px;
  transition: background 0.2s ease, color 0.2s ease;
}

.uses .user-menu .menu-item:hover,
.uses .user-menu .menu-item:focus-visible {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.85), rgba(124, 58, 237, 0.85));
  outline: none;
}

.uses .user-menu .menu-item svg {
  flex-shrink: 0;
  color: #a5b4fc;
}

.uses .user-menu .menu-item:hover svg,
.uses .user-menu .menu-item:focus-visible svg {
  color: #ffffff;
}

.menu-arrow {
  margin-left: auto;
  color: #64748b;
  font-size: 16px;
  line-height: 1;
  transition: color 0.2s ease, transform 0.2s ease;
}

.uses .user-menu .menu-item:hover .menu-arrow,
.uses .user-menu .menu-item:focus-visible .menu-arrow {
  color: #ffffff;
  transform: translateX(2px);
}

.menu-divider {
  height: 1px;
  margin: 4px 0;
  background: rgba(148, 163, 184, 0.16);
}

.uses .user-menu .menu-item.logout {
  color: #fca5a5;
}

.uses .user-menu .menu-item.logout svg {
  color: #fca5a5;
}

.uses .user-menu .menu-item.logout:hover,
.uses .user-menu .menu-item.logout:focus-visible {
  color: #ffffff;
  background: rgba(239, 68, 68, 0.2);
}

.uses .user-menu .menu-item.logout:hover svg,
.uses .user-menu .menu-item.logout:focus-visible svg {
  color: #ffffff;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

@keyframes dropdownEnter {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
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
  justify-content: flex-end;
  margin-bottom: 26px;
  z-index: 50;
}

.categories-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 16px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.2px;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.45);
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
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
  right: 0;
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
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.cat-item:hover {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.85), rgba(124, 58, 237, 0.85));
  transform: translateX(3px);
}

.cat-item svg {
  flex-shrink: 0;
  color: #a5b4fc;
}

.cat-item:hover svg {
  color: #ffffff;
}

/* ================= TRANSITIONS ================= */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* ================= SPINNER ================= */
.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ================= RESPONSIVE DESIGN ================= */
@media (max-width: 1200px) {
  .app-header { gap: 14px; padding: 14px 18px; }
  .logo a { font-size: 18px; }
  .route { gap: 2px; }
  .routers { gap: 6px; padding: 10px 9px; font-size: 13px; }
  .uses { gap: 6px; }
  .search-box { width: 205px; }
  .uses .get-app { padding: 10px; }
}

@media (max-width: 950px) {
  .app-header {
    flex-wrap: wrap;
    justify-content: space-between;
    border-radius: 20px;
  }
  .logo { margin-right: auto; }
  .route {
    order: 3;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 5px;
  }
  .uses { margin-left: auto; }
  .search-box { width: 220px; }
  .main-content { width: calc(100% - 36px); }
}

@media (max-width: 600px) {
  .app-header {
    width: calc(100% - 20px);
    margin: 10px auto;
    padding: 16px 12px;
    gap: 16px;
    border-radius: 18px;
  }
  .logo { justify-content: center; width: 100%; margin: 0; }
  .logo a { font-size: 21px; }
  .route { gap: 4px; }
  .routers { gap: 5px; padding: 9px 8px; font-size: 12px; }
  .routers svg { width: 15px; height: 15px; }
  .uses {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0;
    gap: 8px;
  }
  .search-box { width: 100%; flex: 1 1 100%; }
  .uses .notification, .uses .get-app, .user-wrap { flex: 0 0 auto; }
  .user-menu { top: calc(100% + 8px); right: 0; z-index: 300; }

  /* Notifications on mobile: full width */
  .notif-menu {
    position: fixed;
    top: 80px;
    left: 12px;
    right: 12px;
    width: auto;
    max-height: 70vh;
    z-index: 400;
  }

  .main-content { width: calc(100% - 28px); padding-top: 24px; }

  .categories-btn { width: 100%; justify-content: space-between; padding: 12px 14px; }
  .categories-menu { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
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
    radial-gradient(circle at 15% 0%, rgba(99, 102, 241, 0.16), transparent 40%),
    linear-gradient(180deg, #0b1022, #080b18);
  border-top: 1px solid rgba(129, 140, 248, 0.22);
  overflow: hidden;
}

.site-footer::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.6), rgba(192, 132, 252, 0.6), transparent);
}

.footer-container {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  padding-top: 60px;
}

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
    radial-gradient(circle at 85% 20%, rgba(192, 132, 252, 0.28), transparent 55%),
    linear-gradient(135deg, #1a2247, #121834);
  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 20px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.3);
}

.footer-cta::before {
  content: "";
  position: absolute;
  top: -60px; right: -60px;
  width: 180px; height: 180px;
  background: radial-gradient(circle, rgba(192, 132, 252, 0.22), transparent 70%);
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
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  white-space: nowrap;
}

.footer-cta-btn:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
  box-shadow: 0 12px 28px rgba(99, 102, 241, 0.45);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.footer-brand { max-width: 340px; }

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

.footer-logo span { color: #ffffff; }
.footer-logo .dot {
  background: linear-gradient(135deg, #818cf8, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.footer-tagline { color: #94a3b8; font-size: 13px; line-height: 1.75; }

.footer-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }

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

.footer-badge svg { color: #a5b4fc; }

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

.footer-col h4 svg { color: #a5b4fc; }

.footer-col ul { display: flex; flex-direction: column; gap: 11px; list-style: none; }

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

.footer-col li a svg { color: #818cf8; flex-shrink: 0; transition: color 0.2s ease; }
.footer-col li a:hover { color: #ffffff; transform: translateX(4px); }
.footer-col li a:hover svg { color: #c084fc; }

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
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.social-pill:hover {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.28), rgba(124, 58, 237, 0.28));
  border-color: rgba(129, 140, 248, 0.55);
  transform: translateY(-2px);
}

.social-pill svg { flex-shrink: 0; color: #a5b4fc; transition: color 0.25s ease; }
.social-pill:hover svg { color: #ffffff; }

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  padding-top: 26px;
  color: #94a3b8;
  font-size: 12px;
}

.footer-bottom .highlight { color: #c084fc; font-weight: 700; }

.footer-bottom-links { display: inline-flex; align-items: center; gap: 10px; }
.footer-bottom-links a { color: #94a3b8; text-decoration: none; transition: color 0.2s ease; }
.footer-bottom-links a:hover { color: #a5b4fc; }
.footer-bottom-links .sep { color: rgba(148, 163, 184, 0.4); }

@media (max-width: 950px) {
  .footer-cta { padding: 24px; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
  .footer-brand, .footer-follow { grid-column: 1 / -1; }
  .footer-brand { max-width: none; }
  .footer-social { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (max-width: 600px) {
  .footer-container { width: calc(100% - 32px); padding-top: 44px; }
  .footer-cta { padding: 20px; border-radius: 16px; gap: 16px; margin-bottom: 36px; }
  .footer-cta h3 { font-size: 18px; }
  .footer-cta-btn { width: 100%; justify-content: center; }
  .footer-grid { grid-template-columns: 1fr; gap: 28px; padding-bottom: 36px; }
  .footer-brand, .footer-follow { grid-column: auto; }
  .footer-social { grid-template-columns: 1fr 1fr; }
  .footer-bottom { flex-direction: column; text-align: center; }
}
</style>