
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/index.js";

import { useContentStore } from "@/stores/contentStore.js";

// --------------------------------------------------
// CREATE APPLICATION
// --------------------------------------------------

const app = createApp(App);

// --------------------------------------------------
// INITIALIZE PINIA
// --------------------------------------------------

const pinia = createPinia();

app.use(pinia);

// --------------------------------------------------
// REGISTER ROUTER
// --------------------------------------------------

app.use(router);

// --------------------------------------------------
// MOUNT APPLICATION
// --------------------------------------------------

app.mount("#app");

// --------------------------------------------------
// BACKGROUND CONTENT HYDRATION
// --------------------------------------------------

async function hydrateContent() {
  try {
    // Access content store after Pinia initialization
    const store = useContentStore(pinia);

    console.info(
      "[Stream.Store] Starting background hydration..."
    );

    // STEP 1: TMDB MOVIE AND SERIES DATA
    try {
      await store.hydrateTmdb();

      console.info(
        "[Stream.Store] TMDB hydration completed."
      );
    } catch (error) {
      console.warn(
        "[Stream.Store] TMDB hydration failed:",
        error
      );
    }

    // STEP 2: YOUTUBE TRAILERS
    try {
      await store.hydrateTrailers();

      console.info(
        "[Stream.Store] Trailer hydration completed."
      );
    } catch (error) {
      console.warn(
        "[Stream.Store] Trailer hydration failed:",
        error
      );
    }

    console.info(
      "[Stream.Store] All background tasks completed."
    );

  } catch (error) {
    console.error(
      "[Stream.Store] Background hydration error:",
      error
    );
  }
}

// Run hydration without blocking the interface
void hydrateContent();
