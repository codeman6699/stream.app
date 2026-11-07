import { reactive, computed, watch } from "vue";
import { movies as seedMovies, series as seedSeries } from "@/data/content.js";

const STORAGE_KEY = "stream_store_content_v1";
const VERSION = 1;

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== VERSION) return null;
    return parsed;
  } catch { return null; }
}

function seed() {
  return {
    version: VERSION,
    movies: seedMovies.map((m) => ({ ...m })),
    series: seedSeries.map((s) => ({ ...s })),
    lastUpdated: Date.now(),
  };
}

const stored = load() || seed();

const state = reactive({
  movies: stored.movies,
  series: stored.series,
  lastUpdated: stored.lastUpdated,
});

watch(
  () => [state.movies, state.series],
  () => {
    state.lastUpdated = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: VERSION, movies: state.movies,
        series: state.series, lastUpdated: state.lastUpdated,
      }));
    } catch (e) { console.warn("Persist failed:", e); }
  },
  { deep: true }
);

const allContent = computed(() => [...state.movies, ...state.series]);

const stats = computed(() => {
  const totalEpisodes = state.series.reduce(
    (sum, s) => sum + (s.seasons?.reduce((a, sn) => a + (sn.episodes?.length || 0), 0) || 0), 0
  );
  const totalParts = state.movies.reduce((sum, m) => sum + (m.parts?.length || 0), 0);
  const genres = [...new Set(allContent.value.map((c) => c.genre).filter(Boolean))];
  return {
    totalMovies: state.movies.length,
    totalSeries: state.series.length,
    totalContent: state.movies.length + state.series.length,
    totalEpisodes, totalParts,
    totalGenres: genres.length, genres,
  };
});

function findById(id) {
  const nid = Number(id);
  return allContent.value.find((c) => c.id === nid) || null;
}

function generateId() {
  const maxMovie = state.movies.reduce((m, x) => Math.max(m, x.id), 0);
  const maxSeries = state.series.reduce((m, x) => Math.max(m, x.id), 0);
  return Math.max(maxMovie, maxSeries, 0) + 1;
}

function addContent(item) {
  if (!item || !item.type) throw new Error("Missing type");
  const newItem = {
    ...item,
    id: item.id || generateId(),
    rating: Number(item.rating) || 0,
    year: Number(item.year) || new Date().getFullYear(),
  };
  if (newItem.type === "Series") {
    newItem.seasons = newItem.seasons || [];
    state.series.unshift(newItem);
  } else {
    newItem.parts = newItem.parts || null;
    state.movies.unshift(newItem);
  }
  return newItem;
}

function updateContent(id, patch) {
  const nid = Number(id);
  const mi = state.movies.findIndex((x) => x.id === nid);
  if (mi >= 0) { state.movies[mi] = { ...state.movies[mi], ...patch, id: nid }; return state.movies[mi]; }
  const si = state.series.findIndex((x) => x.id === nid);
  if (si >= 0) { state.series[si] = { ...state.series[si], ...patch, id: nid }; return state.series[si]; }
  throw new Error("Content not found");
}

function deleteContent(id) {
  const nid = Number(id);
  state.movies = state.movies.filter((x) => x.id !== nid);
  state.series = state.series.filter((x) => x.id !== nid);
}

function duplicateContent(id) {
  const item = findById(id);
  if (!item) return null;
  const copy = JSON.parse(JSON.stringify(item));
  copy.id = generateId();
  copy.title = copy.title + " (Copy)";
  return addContent(copy);
}

function resetToSeed() {
  const s = seed();
  state.movies = s.movies;
  state.series = s.series;
  state.lastUpdated = s.lastUpdated;
}

function clearAll() {
  state.movies = [];
  state.series = [];
  state.lastUpdated = Date.now();
}

export function useContentStore() {
  return {
    state, allContent, stats, findById, generateId,
    addContent, updateContent, deleteContent, duplicateContent,
    resetToSeed, clearAll,
  };
}