<template>
  <div class="admin-shell">
    <aside class="admin-sidebar" :class="{ collapsed: isCollapsed }">
      <div class="sidebar-brand">
        <div class="brand-icon"><Clapperboard :size="22" :stroke-width="2.2" /></div>
        <span v-if="!isCollapsed" class="brand-text">
          Stream<span class="dot">.</span>Store
          <small style="position: absolute; margin-top: 27px;">Admin</small>
        </span>
      </div>
      <nav class="sidebar-nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          <component :is="item.icon" :size="19" />
          <span v-if="!isCollapsed">{{ item.label }}</span>
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <button class="collapse-btn" @click="isCollapsed = !isCollapsed">
          <ChevronLeft v-if="!isCollapsed" :size="18" />
          <ChevronRight v-else :size="18" />
          <span v-if="!isCollapsed">Collapse</span>
        </button>
      </div>
    </aside>

    <div class="admin-main">
      <header class="admin-topbar">
        <div class="topbar-left">
          <div class="breadcrumb">
            <span class="bc-root">Admin</span>
            <ChevronRight :size="14" />
            <span class="bc-current">{{ currentTitle }}</span>
          </div>
        </div>
        <div class="topbar-right">
          <a href="/home" target="_blank" class="topbar-link">
            <ExternalLink :size="15" /><span>View Site</span>
          </a>
          <button class="user-btn" @click.stop="showUserMenu = !showUserMenu">
            <UserRound :size="17" />
            <span>{{ user?.username || "Admin" }}</span>
            <ChevronDown :size="14" />
          </button>
          <Transition name="fade">
            <div v-if="showUserMenu" class="user-menu" @click.stop>
              <div class="user-menu-head">
                <p class="name">{{ user?.username }}</p>
                <p class="role">{{ user?.role }}</p>
              </div>
              <div class="menu-divider"></div>
              <button class="menu-item" @click="doLogout">
                <LogOut :size="15" /> Logout
              </button>
            </div>
          </Transition>
        </div>
      </header>
      <main class="admin-content"><router-view /></main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Clapperboard, LayoutDashboard, Film, Settings,
  ChevronLeft, ChevronRight, ExternalLink,
  UserRound, ChevronDown, LogOut,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/authStore.js";

const route = useRoute();
const router = useRouter();
const { state: authState, logout } = useAuthStore();

const isCollapsed = ref(false);
const showUserMenu = ref(false);
const user = computed(() => authState.user);

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/content", label: "Content", icon: Film },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

function isActive(path) {
  if (path === "/admin") return route.path === "/admin";
  return route.path.startsWith(path);
}

const currentTitle = computed(
  () => navItems.find((n) => isActive(n.path))?.label || "Dashboard"
);

function doLogout() {
  showUserMenu.value = false;
  logout();
  router.push("/admin/login");
}

onMounted(() => {
  document.addEventListener("click", () => {
    showUserMenu.value = false;
  });
});
</script>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #080b18;
  color: #f8fafc;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.admin-sidebar {
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: rgba(20, 27, 55, 0.85);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(148, 163, 184, 0.2);
  transition: width 0.25s ease;
  position: sticky;
  top: 0;
  height: 100vh;
}
.admin-sidebar.collapsed { width: 78px; }
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 18px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}
.brand-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.brand-text {
  display: flex;
  flex-direction: row;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
}
.brand-text .dot { color: #c084fc; }
.brand-text small {
  color: #94a3b8;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 2px;
}
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 14px 10px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 13px;
  color: #cbd5e1;
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.2s ease;
}
.nav-item:hover {
  color: #fff;
  background: rgba(129, 140, 248, 0.12);
}
.nav-item.active {
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  box-shadow: 0 5px 16px rgba(99, 102, 241, 0.3);
}
.sidebar-footer {
  padding: 14px;
  border-top: 1px solid rgba(148, 163, 184, 0.15);
}
.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 9px 12px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 9px;
  transition: all 0.2s ease;
}
.collapse-btn:hover {
  color: #fff;
  background: rgba(99, 102, 241, 0.15);
}
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.admin-topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 64px;
  padding: 0 24px;
  background: rgba(20, 27, 55, 0.72);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 13px;
}
.bc-root { color: #64748b; }
.bc-current { color: #fff; font-weight: 600; }
.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.topbar-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 13px;
  color: #a5b4fc;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 9px;
}
.topbar-link:hover {
  color: #fff;
  background: rgba(99, 102, 241, 0.25);
}
.user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: #e2e8f0;
  font-size: 12.5px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 10px;
}
.user-menu {
  position: absolute;
  top: 60px;
  right: 20px;
  z-index: 100;
  width: 190px;
  padding: 8px;
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 12px;
}
.user-menu-head { padding: 8px 10px; }
.user-menu-head .name {
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}
.user-menu-head .role {
  color: #94a3b8;
  font-size: 11px;
  text-transform: capitalize;
}
.menu-divider {
  height: 1px;
  background: rgba(148, 163, 184, 0.16);
  margin: 6px 0;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 9px 10px;
  color: #fca5a5;
  font-size: 12.5px;
  font-weight: 600;
  background: transparent;
  border: none;
  border-radius: 8px;
}
.menu-item:hover {
  color: #fff;
  background: rgba(239, 68, 68, 0.2);
}
.admin-content {
  flex: 1;
  padding: 28px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>