import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/authStore.js";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "Home", component: HomeView },
  { path: "/movies", component: () => import("@/views/MoviesView.vue") },
  { path: "/series", component: () => import("@/views/SeriesView.vue") },
  { path: "/mylist", component: () => import("@/views/MyListView.vue") },
  { path: "/browse", component: () => import("@/views/BrowseView.vue") },
  { path: "/watch/:id", component: () => import("@/views/WatchView.vue") },
  { path: "/download/:type/:id", component: () => import("@/views/DownloadView.vue") },
  { path: "/embed/:type/:id", component: () => import("@/views/EmbedView.vue") },
  { path: "/about", component: () => import("@/views/AboutUs.vue") },
  { path: "/contact", component: () => import("@/views/ContactUs.vue") },
  { path: "/privacy", component: () => import("@/views/PrivacyPolicy.vue") },
  { path: "/terms", component: () => import("@/views/TermsView.vue") },
  { path: "/disclaimer", component: () => import("@/views/DisclaimerView.vue") },
  { path: "/howwork", component: () => import("@/views/HowWork.vue") },
  { path: "/profile", component: () => import("@/views/ProfileSettings.vue") },
  { path: "/settings", component: () => import("@/views/AppSettings.vue") },
  { path: "/download", name: "GetApp", component: () => import("@/views/GetApp.vue") },
  { path: "/login", component: () => import("@/views/LoginView.vue") },
  { path: "/notifications", component: () => import("@/views/NotificationsView.vue") },
  {
    path: "/admin/login",
    component: () => import("@/views/admin/AdminLogin.vue"),
    meta: { adminPublic: true },
  },
  {
    path: "/admin",
    component: () => import("@/layouts/AdminLayout.vue"),
    meta: { requiresAdmin: true },
    children: [
      { path: "", component: () => import("@/views/admin/AdminDashboard.vue") },
      { path: "content", component: () => import("@/views/admin/AdminContent.vue") },
      { path: "content/new", component: () => import("@/views/admin/AdminContentForm.vue") },
      { path: "content/:id/edit", component: () => import("@/views/admin/AdminContentForm.vue") },
      { path: "settings", component: () => import("@/views/admin/AdminSettings.vue") },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuthStore();
  if (to.meta.requiresAdmin && !isLoggedIn.value) {
    return next({ path: "/admin/login", query: { redirect: to.fullPath } });
  }
  if (to.meta.adminPublic && isLoggedIn.value) return next("/admin");
  next();
});

export default router;