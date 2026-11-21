<template>
  <div class="mylist-page">
    <section class="page-header">
      <div class="header-content">
        <h1>
          <Bookmark :size="28" class="header-icon" />
          My List
        </h1>
        <p>Your saved movies and series, ready to watch anytime.</p>
      </div>

      <div class="header-stats" v-if="savedItems.length > 0">
        <span class="stat-pill">
          <Clapperboard :size="14" />
          {{ savedItems.length }} Saved
        </span>

        <button class="clear-btn" @click="clearList">
          <Trash2 :size="14" />
          Clear All
        </button>
      </div>
    </section>

    <div v-if="loading" class="empty-state">
      <p>Loading your list...</p>
    </div>

    <div v-else-if="error" class="empty-state">
      <AlertCircle :size="35" />
      <h2>Unable to load your list</h2>
      <p>{{ error }}</p>
      <button class="btn-primary" @click="loadContent">
        Try Again
      </button>
    </div>

    <div v-else-if="savedItems.length === 0" class="empty-state">
      <div class="empty-icon-wrap">
        <Bookmark :size="48" />
      </div>

      <h2>Your list is empty</h2>
      <p>
        Movies and series you save will appear here.
        Start browsing and build your watchlist!
      </p>

      <div class="empty-actions">
        <router-link to="/movies" class="btn-primary">
          <Compass :size="18" />
          Browse Movies
        </router-link>

        <router-link to="/series" class="btn-secondary">
          <Tv :size="18" />
          Browse Series
        </router-link>
      </div>
    </div>

    <div v-else class="cards">
      <div class="card" v-for="card in savedItems" :key="card.id">
        <img
          v-if="card.image"
          :src="card.image"
          :alt="card.title"
          loading="lazy"
        >

        <div v-else class="poster-placeholder">
          <Clapperboard :size="30" />
        </div>

        <span class="card-rating">★ {{ card.rating || "—" }}</span>
        <span class="card-quality">{{ card.quality || "HD" }}</span>

        <button
          class="remove-btn"
          @click="removeItem(card.id)"
          aria-label="Remove from list"
          title="Remove from list"
        >
          <X :size="16" />
        </button>

        <div class="collection">
          <p>{{ card.title }}</p>

          <div class="card-tags">
            <span
              class="card-type"
              :class="card.type === 'Series' ? 'is-series' : 'is-movie'"
            >
              {{ card.type }}
            </span>

            <span
              v-if="card.type === 'Series' && card.episodes"
              class="card-episodes"
            >
              {{ card.episodes }} Episodes
            </span>
          </div>

          <small>{{ card.info }}</small>

          <button @click="watchCard(card)">
            <Play :size="14" fill="currentColor" />
            {{ card.type === "Series" ? "Watch Series" : "Watch Movie" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  Bookmark,
  Trash2,
  Compass,
  Tv,
  Play,
  X,
  Clapperboard,
  AlertCircle,
} from "lucide-vue-next";

import { getPublicContent } from "@/utils/adminContent.js";

const router = useRouter();

const STORAGE_KEY = "stream_store_my_list";

const allContent = ref([]);
const savedIds = ref([]);
const loading = ref(true);
const error = ref("");

const savedItems = computed(() => {
  const savedSet = new Set(savedIds.value.map(Number));

  return allContent.value.filter((item) => (
    savedSet.has(Number(item.id))
  ));
});

function readSavedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");

    savedIds.value = Array.isArray(parsed)
      ? [...new Set(parsed.map(Number).filter(Number.isFinite))]
      : [];
  } catch {
    savedIds.value = [];
    localStorage.removeItem(STORAGE_KEY);
  }
}

function persistSavedIds() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(savedIds.value)
  );
}

async function loadContent() {
  loading.value = true;
  error.value = "";

  try {
    allContent.value = await getPublicContent();

    const availableIds = new Set(
      allContent.value.map((item) => Number(item.id))
    );

    savedIds.value = savedIds.value.filter((id) => (
      availableIds.has(Number(id))
    ));

    persistSavedIds();
  } catch (err) {
    console.error("Unable to load My List:", err);
    error.value =
      err.response?.data?.error ||
      "Unable to connect to the content server.";
  } finally {
    loading.value = false;
  }
}

function watchCard(card) {
  router.push(`/watch/${card.id}`);
}

function removeItem(id) {
  savedIds.value = savedIds.value.filter(
    (savedId) => Number(savedId) !== Number(id)
  );

  persistSavedIds();
}

function clearList() {
  if (!window.confirm("Are you sure you want to clear your entire list?")) {
    return;
  }

  savedIds.value = [];
  persistSavedIds();
}

onMounted(() => {
  readSavedIds();
  loadContent();
});
</script>