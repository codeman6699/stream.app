
<template>
  <div class="admin-layout">
    <aside class="sidebar" :class="{ collapsed: mobileMenu }">
      <div class="sidebar-brand">
        <div class="brand-icon">
          <Clapperboard :size="23" />
        </div>
        <div>
          <h2>Stream<span>.</span>Store</h2>
          <small>ADMIN PANEL</small>
        </div>
      </div>

      <div class="sidebar-label">MAIN MENU</div>

      <nav class="sidebar-nav">
        <router-link :to="{ name: 'AdminDashboard' }" class="nav-link">
          <LayoutDashboard :size="19" />
          <span>Dashboard</span>
        </router-link>

        <router-link :to="{ name: 'AdminContent' }" class="nav-link">
          <Film :size="19" />
          <span>Manage Content</span>
        </router-link>

        <router-link :to="{ name: 'AdminContentNew' }" class="nav-link">
          <PlusCircle :size="19" />
          <span>Add Content</span>
        </router-link>

        <router-link :to="{ name: 'AdminSettings' }" class="nav-link">
          <Settings :size="19" />
          <span>Settings</span>
        </router-link>
      </nav>

      <div class="sidebar-bottom">
        <div class="admin-profile">
          <div class="profile-avatar">
            <ShieldCheck :size="19" />
          </div>
          <div class="profile-details">
            <strong>{{ username }}</strong>
            <small>Administrator</small>
          </div>
        </div>

        <button class="logout-btn" @click="handleLogout">
          <LogOut :size="18" />
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <div class="admin-main">
      <header class="admin-topbar">
        <div class="topbar-left">
          <button
            class="mobile-toggle"
            @click="mobileMenu = !mobileMenu"
            aria-label="Toggle sidebar"
          >
            <Menu :size="21" />
          </button>

          <div>
            <h1>{{ pageTitle }}</h1>
            <p>Manage your Stream.Store platform</p>
          </div>
        </div>

        <div class="topbar-right">
          <span class="admin-status">
            <span class="status-dot"></span>
            Admin active
          </span>

          <router-link to="/home" class="view-site">
            <ExternalLink :size="16" />
            View website
          </router-link>
        </div>
      </header>

      <main class="admin-content">
        <router-view />
      </main>

      <footer class="admin-footer">
        Stream.Store Admin Panel · {{ currentYear }}
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";

import {
  Clapperboard,
  LayoutDashboard,
  Film,
  PlusCircle,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  ExternalLink,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const mobileMenu = ref(false);
const currentYear = new Date().getFullYear();

const username = computed(
  () => authStore.currentUser?.value?.username
    || authStore.state?.user?.username
    || "Administrator"
);

const pageTitles = {
  AdminDashboard: "Dashboard",
  AdminContent: "Manage Content",
  AdminContentNew: "Add New Content",
  AdminContentEdit: "Edit Content",
  AdminSettings: "Admin Settings",
};

const pageTitle = computed(
  () => pageTitles[route.name] || "Admin Panel"
);

function handleLogout() {
  authStore.logout();
  router.replace({ name: "AdminLogin" });
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: flex;
  color: #e5e7eb;
  background: #090d18;
}

.sidebar {
  width: 255px;
  min-height: 100vh;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background: #101629;
  border-right: 1px solid #263149;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px 28px;
}

.brand-icon {
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  color: white;
  background: linear-gradient(135deg, #4f70e8, #9333ea);
  border-radius: 12px;
}

.sidebar-brand h2 {
  font-size: 17px;
  color: white;
}

.sidebar-brand h2 span {
  color: #818cf8;
}

.sidebar-brand small {
  color: #8490a8;
  font-size: 10px;
  letter-spacing: 1.5px;
}

.sidebar-label {
  padding: 12px 10px;
  color: #77839c;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.sidebar-nav {
  display: grid;
  gap: 7px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px;
  color: #aeb9cd;
  text-decoration: none;
  font-size: 13px;
  border-radius: 10px;
  transition: 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: white;
  background: linear-gradient(110deg, #3e5ed4, #7041c8);
}

.sidebar-bottom {
  margin-top: auto;
  padding-top: 25px;
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 5px;
  border-top: 1px solid #29334a;
}

.profile-avatar {
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  color: white;
  background: #394b91;
  border-radius: 50%;
}

.profile-details {
  display: grid;
  gap: 3px;
}

.profile-details strong {
  font-size: 12px;
  color: white;
}

.profile-details small {
  font-size: 10px;
  color: #8490a8;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  color: #fca5a5;
  background: #291b2b;
  border: 1px solid #4b293b;
  border-radius: 10px;
}

.admin-main {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.admin-topbar {
  min-height: 82px;
  padding: 16px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  background: #101629;
  border-bottom: 1px solid #263149;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-topbar h1 {
  font-size: 19px;
  color: white;
}

.admin-topbar p {
  margin-top: 4px;
  color: #8490a8;
  font-size: 11px;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 18px;
}

.admin-status {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #a7f3d0;
  font-size: 11px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #34d399;
  border-radius: 50%;
}

.view-site {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #c7d2fe;
  font-size: 12px;
  text-decoration: none;
}

.admin-content {
  width: 100%;
  flex: 1;
  padding: 28px;
}

.admin-footer {
  padding: 16px 28px;
  color: #75819a;
  font-size: 11px;
  border-top: 1px solid #263149;
}

.mobile-toggle {
  display: none;
  color: white;
  background: transparent;
  border: 0;
}

@media (max-width: 760px) {
  .sidebar {
    width: 210px;
  }

  .admin-topbar {
    padding: 14px;
  }

  .admin-content {
    padding: 16px;
  }

  .topbar-right {
    gap: 10px;
  }
}

@media (max-width: 560px) {
  .sidebar {
    position: fixed;
    z-index: 500;
    left: -260px;
    transition: left 0.25s;
  }

  .sidebar.collapsed {
    left: 0;
  }

  .mobile-toggle {
    display: block;
  }

  .admin-status {
    display: none;
  }

  .admin-topbar h1 {
    font-size: 16px;
  }
}
</style>
