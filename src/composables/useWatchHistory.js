import { ref, watch } from "vue";

const STORAGE_KEY = "stream_store_watch_history";
const MAX_ITEMS = 100;

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

const history = ref(loadHistory());

watch(
  history,
  (val) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(val)); }
    catch { /* ignore */ }
  },
  { deep: true }
);

export function saveProgress(opts) {
  const key = `${opts.type}-${opts.contentId}-${opts.season || 0}-${opts.episode || 0}-${opts.part || 0}`;
  const idx = history.value.findIndex((h) => h.key === key);
  const entry = {
    key, contentId: opts.contentId, type: opts.type,
    title: opts.title, image: opts.image,
    season: opts.season || null, episode: opts.episode || null, part: opts.part || null,
    progress: Math.max(0, Math.min(1, opts.progress || 0)),
    updatedAt: Date.now(),
  };
  if (idx >= 0) history.value[idx] = entry;
  else history.value.unshift(entry);
  if (history.value.length > MAX_ITEMS) history.value = history.value.slice(0, MAX_ITEMS);
}

export function getProgress(contentId, type, season, episode, part) {
  const key = `${type}-${contentId}-${season || 0}-${episode || 0}-${part || 0}`;
  const found = history.value.find((h) => h.key === key);
  return found ? found.progress : 0;
}

export function clearHistory() { history.value = []; }

export function useWatchHistory() {
  return { history, saveProgress, getProgress, clearHistory };
}