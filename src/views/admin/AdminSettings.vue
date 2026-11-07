<template>
  <div class="settings-page">
    <div class="page-head">
      <h1>Settings</h1>
      <p>Manage store data, view statistics, and reset the library.</p>
    </div>

    <section class="panel">
      <h2 class="panel-title"><Info :size="18" /> Store Information</h2>
      <div class="info-grid">
        <div class="info-row"><span>Total content</span><strong>{{ stats.totalContent }}</strong></div>
        <div class="info-row"><span>Total movies</span><strong>{{ stats.totalMovies }}</strong></div>
        <div class="info-row"><span>Total series</span><strong>{{ stats.totalSeries }}</strong></div>
        <div class="info-row"><span>Total episodes</span><strong>{{ stats.totalEpisodes }}</strong></div>
        <div class="info-row"><span>Multi-part movies</span><strong>{{ stats.totalParts }}</strong></div>
        <div class="info-row"><span>Storage version</span><strong>v1</strong></div>
        <div class="info-row"><span>Last updated</span><strong>{{ lastUpdatedText }}</strong></div>
        <div class="info-row"><span>Storage size</span><strong>{{ storageSize }}</strong></div>
      </div>
      <div class="usage-wrap">
        <div class="usage-bar">
          <div class="usage-fill" :style="{ width: usagePercent + '%' }" :class="usageClass"></div>
        </div>
        <p class="usage-hint">
          {{ usagePercent.toFixed(1) }}% used ({{ storageSize }} of ~5 MB browser limit)
        </p>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title"><Download :size="18" /> Backup & Restore</h2>
      <p class="panel-sub">Export your library to JSON for backup, or restore from a previous export.</p>
      <div class="action-row">
        <button class="btn-primary" @click="exportJSON"><Download :size="14" /> Export JSON</button>
        <label class="btn-ghost">
          <Upload :size="14" /> Import JSON
          <input type="file" accept="application/json" hidden @change="importJSON" />
        </label>
        <button class="btn-ghost" @click="copyToClipboard"><Copy :size="14" /> Copy to Clipboard</button>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title"><RotateCcw :size="18" /> Reset Library</h2>
      <p class="panel-sub">These actions affect all content. Use with caution.</p>
      <div class="action-row">
        <button class="btn-ghost" @click="askResetSeed"><RefreshCw :size="14" /> Restore Seed Content</button>
        <button class="btn-danger" @click="askClearAll"><Trash2 :size="14" /> Delete All Content</button>
      </div>
    </section>

    <Transition name="fade">
      <div v-if="modal" class="modal-backdrop" @click.self="modal = null">
        <div class="modal">
          <div class="modal-icon"><AlertTriangle :size="24" /></div>
          <h3>{{ modal.title }}</h3>
          <p>{{ modal.message }}</p>
          <div class="modal-actions">
            <button class="btn-ghost" @click="modal = null">Cancel</button>
            <button :class="modal.type === 'danger' ? 'btn-danger' : 'btn-primary'" @click="modal.action">
              {{ modal.confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="toast">
      <div v-if="toast" class="toast"><CheckCircle2 :size="16" /> {{ toast }}</div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Info, Download, Upload, Copy, RotateCcw, RefreshCw, Trash2,
  AlertTriangle, CheckCircle2,
} from "lucide-vue-next";
import { useContentStore } from "@/stores/contentStore.js";

const { state, stats, resetToSeed, clearAll } = useContentStore();

const modal = ref(null);
const toast = ref("");
let toastTimer = null;

const lastUpdatedText = computed(() => {
  if (!state.lastUpdated) return "—";
  return new Date(state.lastUpdated).toLocaleString();
});

const storageBytes = computed(() => {
  try {
    const raw = localStorage.getItem("stream_store_content_v1");
    return raw ? raw.length : 0;
  } catch { return 0; }
});

const storageSize = computed(() => {
  const bytes = storageBytes.value;
  if (bytes === 0) return "0 KB";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
});

const usagePercent = computed(() => {
  const max = 5 * 1024 * 1024;
  return Math.min(100, (storageBytes.value / max) * 100);
});

const usageClass = computed(() => {
  if (usagePercent.value >= 90) return "danger";
  if (usagePercent.value >= 70) return "warn";
  return "ok";
});

function exportJSON() {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    movies: state.movies,
    series: state.series,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `stream-store-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Library exported");
}

function importJSON(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!data.movies || !data.series) { showToast("Invalid file"); return; }
      state.movies = data.movies;
      state.series = data.series;
      showToast("Library imported");
    } catch { showToast("Parse error"); }
  };
  reader.readAsText(file);
  e.target.value = "";
}

async function copyToClipboard() {
  try {
    const data = { version: 1, movies: state.movies, series: state.series };
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    showToast("Copied");
  } catch { showToast("Copy failed"); }
}

function askResetSeed() {
  modal.value = {
    type: "warn", title: "Restore seed content?",
    message: "This replaces your current library with the original seed.",
    confirmText: "Restore",
    action: () => { resetToSeed(); modal.value = null; showToast("Restored"); },
  };
}

function askClearAll() {
  modal.value = {
    type: "danger", title: "Delete all content?",
    message: "This removes all movies and series.",
    confirmText: "Delete Everything",
    action: () => { clearAll(); modal.value = null; showToast("All deleted"); },
  };
}

function showToast(msg) {
  toast.value = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.value = ""), 2500);
}
</script>

<style scoped>
.settings-page { display: flex; flex-direction: column; gap: 18px; max-width: 900px; }
.page-head h1 { color: #fff; font-size: 24px; font-weight: 800; }
.page-head p { color: #94a3b8; font-size: 12.5px; margin-top: 3px; }
.panel {
  padding: 22px;
  background: rgba(20, 27, 55, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 14px;
}
.panel-title {
  display: flex; align-items: center; gap: 8px;
  color: #fff; font-size: 15px; font-weight: 750; margin-bottom: 12px;
}
.panel-title svg { color: #a5b4fc; }
.panel-sub { color: #94a3b8; font-size: 12.5px; margin-bottom: 14px; line-height: 1.6; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.info-row {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; padding: 9px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.12); border-radius: 9px;
  font-size: 12.5px;
}
.info-row span { color: #94a3b8; }
.info-row strong { color: #fff; font-weight: 700; }
.usage-wrap { margin-top: 16px; }
.usage-bar {
  height: 8px;
  background: rgba(148, 163, 184, 0.15);
  border-radius: 999px;
  overflow: hidden;
}
.usage-fill {
  height: 100%;
  transition: width 0.3s ease, background 0.3s ease;
  border-radius: 999px;
}
.usage-fill.ok { background: linear-gradient(90deg, #22c55e, #34d399); }
.usage-fill.warn { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
.usage-fill.danger { background: linear-gradient(90deg, #dc2626, #f87171); }
.usage-hint { margin-top: 8px; color: #64748b; font-size: 11px; }
.action-row { display: flex; flex-wrap: wrap; gap: 10px; }
.btn-primary, .btn-ghost, .btn-danger {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 10px 16px; font-size: 12.5px; font-weight: 700;
  border-radius: 10px; border: 1px solid transparent; cursor: pointer;
}
.btn-primary { color: #fff; background: linear-gradient(135deg, #6366f1, #7c3aed); }
.btn-ghost {
  color: #cbd5e1; background: rgba(255, 255, 255, 0.05);
  border-color: rgba(148, 163, 184, 0.2);
}
.btn-danger { color: #fff; background: linear-gradient(135deg, #dc2626, #b91c1c); }
.modal-backdrop {
  position: fixed; inset: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px; background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
}
.modal {
  width: 100%; max-width: 420px; padding: 24px;
  background: rgba(15, 23, 42, 0.98);
  border-radius: 16px;
}
.modal-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; margin-bottom: 12px;
  border-radius: 12px;
  color: #fbbf24; background: rgba(251, 191, 36, 0.15);
}
.modal h3 { color: #fff; font-size: 17px; font-weight: 750; margin-bottom: 8px; }
.modal p { color: #94a3b8; font-size: 13px; margin-bottom: 20px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 9px; }
.toast {
  position: fixed; bottom: 24px; right: 24px; z-index: 1100;
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px; color: #fff;
  font-size: 12.5px; font-weight: 600;
  background: rgba(16, 185, 129, 0.95);
  border: 1px solid rgba(52, 211, 153, 0.6); border-radius: 10px;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(16px); }
@media (max-width: 600px) {
  .info-grid { grid-template-columns: 1fr; }
}
</style>