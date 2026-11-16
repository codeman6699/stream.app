import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { useContentStore } from "@/stores/contentStore.js";

const app = createApp(App);
app.use(router);
app.mount("#app");

// ── Background data hydration ──────────────────────────────────
// Runs AFTER mount so the UI renders instantly with seed images.
// Each step is throttled internally to respect API quotas.
// Safe to re-run — both skip items that are already enriched.

const store = useContentStore();

(async () => {
  try {
    // 1. TMDB first — real posters, backdrops, overviews, ratings.
    await store.hydrateTmdb();

    // 2. YouTube trailers second — only for items still missing one.
    await store.hydrateTrailers();
  } catch (err) {
    console.warn("[Stream.Store] Background hydration failed:", err);
  }
})();