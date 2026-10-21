import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "Home", component: HomeView },
  { path: "/movies", component: () => import("@/views/MoviesView.vue") },
  { path: "/series", component: () => import("@/views/SeriesView.vue") },
  { path: "/mylist", component: () => import("@/views/MyListView.vue") },
  { path: "/browse", component: () => import("@/views/BrowseView.vue") },
  { path: "/watch/:id", component: () => import("@/views/WatchView.vue") },
  { path: "/about", component: () => import("@/views/AboutUs.vue")},
  { path: "/contact", component: () => import("@/views/ContactUs.vue")},
  { path: "/privacy", component: () => import("@/views/PrivacyPolicy.vue")},
  { path: "/terms", component: () => import("@/views/TermsView.vue")},
  { path: "/disclaimer", component: () => import("@/views/DisclaimerView.vue")},
  { path: "/howwork", component: () => import("@/views/HowWork.vue")},
  { path: "/profile", component: () => import("@/views/ProfileSettings.vue")},
  { path: "/settings", component: () => import("@/views/AppSettings.vue")},
  { path: "/download", name: "GetApp", component: () => import("@/views/GetApp.vue") },
  { path: "/login", component: () => import("@/views/LoginView.vue")},
  { path: "/notifications", component: () => import("@/views/NotificationsView.vue")}
];

export default createRouter({
  history: createWebHistory(),
  routes,
});