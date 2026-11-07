<template>
  <div class="content-page">
    <div class="page-head">
      <div>
        <h1>Content Library</h1>
        <p>{{ filtered.length }} {{ filtered.length === 1 ? 'item' : 'items' }} shown</p>
      </div>
      <router-link to="/admin/content/new" class="btn-primary">
        <Plus :size="16" /> Add Content
      </router-link>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <Search :size="16" />
        <input v-model.trim="search" type="search" placeholder="Search by title, genre..." />
        <button v-if="search" @click="search = ''" class="clear-btn">
          <X :size="13" />
        </button>
      </div>
      <div class="filter-chips">
        <button
          v-for="f in typeFilters"
          :key="f.value"
          class="chip"
          :class="{ active: typeFilter === f.value }"
          @click="typeFilter = f.value"
        >
          <component :is="f.icon" :size="13" />{{ f.label }}
        </button>
      </div>
      <select v-model="sortBy" class="sort-select">
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title-asc">Title A → Z</option>
        <option value="title-desc">Title Z → A</option>
        <option value="rating">Highest rated</option>
      </select>
    </div>

    <div class="table-wrap">
      <table class="content-table">
        <thead>
          <tr>
            <th>Content</th>
            <th>Type</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Structure</th>
            <th>Media</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginated" :key="item.id">
            <td>
              <div class="cell-content">
                <img :src="item.image || PLACEHOLDER" :alt="item.title" />
                <div class="cell-info">
                  <p>{{ item.title }}</p>
                  <small>{{ item.info }}</small>
                </div>
              </div>
            </td>
            <td>
              <span class="type-tag" :class="item.type === 'Series' ? 'is-series' : 'is-movie'">
                {{ item.type }}
              </span>
            </td>
            <td class="muted">{{ item.genre }}</td>
            <td class="muted">{{ item.year }}</td>
            <td><span class="rating-badge">★ {{ item.rating }}</span></td>
            <td class="muted small">
              <template v-if="item.type === 'Series'">
                {{ item.seasons?.length || 0 }} season(s) · {{ totalEpisodes(item) }} ep
              </template>
              <template v-else-if="item.parts">{{ item.parts.length }} parts</template>
              <template v-else>Single</template>
            </td>
            <td class="muted small">
              <span class="media-dot" :class="mediaBadge(item)"></span>
              {{ mediaLabel(item) }}
            </td>
            <td class="text-right">
              <div class="row-actions">
                <router-link :to="`/admin/content/${item.id}/edit`" class="icon-btn edit">
                  <Edit3 :size="14" />
                </router-link>
                <button class="icon-btn duplicate" @click="duplicate(item)">
                  <Copy :size="14" />
                </button>
                <button class="icon-btn danger" @click="askDelete(item)">
                  <Trash2 :size="14" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="paginated.length === 0">
            <td colspan="8">
              <div class="empty-row">
                <Film :size="36" />
                <p>No content matches your filters.</p>
                <button class="btn-ghost-sm" @click="resetFilters">Reset filters</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button :disabled="page === 1" @click="page--" class="pg-btn">
        <ChevronLeft :size="16" />
      </button>
      <button
        v-for="p in totalPages" :key="p"
        class="pg-btn" :class="{ active: page === p }"
        @click="page = p"
      >{{ p }}</button>
      <button :disabled="page === totalPages" @click="page++" class="pg-btn">
        <ChevronRight :size="16" />
      </button>
    </div>

    <Transition name="fade">
      <div v-if="deleteTarget" class="modal-backdrop" @click.self="deleteTarget = null">
        <div class="modal">
          <div class="modal-icon warn"><AlertTriangle :size="24" /></div>
          <h3>Delete "{{ deleteTarget.title }}"?</h3>
          <p>This cannot be undone.</p>
          <div class="modal-actions">
            <button class="btn-ghost" @click="deleteTarget = null">Cancel</button>
            <button class="btn-danger" @click="confirmDelete">Delete</button>
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
import { ref, computed, watch } from "vue";
import {
  Plus, Search, X, Film, Tv, Library, Edit3, Copy, Trash2,
  ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2,
} from "lucide-vue-next";
import { useContentStore } from "@/stores/contentStore.js";

const PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3QgZmlsbD0iIzFmMjkzNyIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzY0NzQ4YiIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";

const { allContent, deleteContent, duplicateContent } = useContentStore();

const search = ref("");
const typeFilter = ref("all");
const sortBy = ref("newest");
const page = ref(1);
const perPage = 8;
const deleteTarget = ref(null);
const toast = ref("");
let toastTimer = null;

const typeFilters = [
  { value: "all", label: "All", icon: Library },
  { value: "Movie", label: "Movies", icon: Film },
  { value: "Series", label: "Series", icon: Tv },
];

function totalEpisodes(s) {
  return (s.seasons || []).reduce((a, sn) => a + (sn.episodes?.length || 0), 0);
}

function isDataUrl(url) {
  return typeof url === "string" && url.startsWith("data:");
}

function mediaLabel(item) {
  const hasMain = isDataUrl(item.videoUrl) || (item.videoUrl && item.videoUrl.startsWith("http"));
  const partsWithVideo = (item.parts || []).filter((p) => p.videoUrl).length;
  const epsWithVideo = (item.seasons || []).reduce(
    (n, s) => n + (s.episodes || []).filter((e) => e.videoUrl).length, 0
  );

  if (item.type === "Series") {
    const total = totalEpisodes(item);
    if (epsWithVideo === 0) return "No video";
    if (epsWithVideo === total) return `${total} videos`;
    return `${epsWithVideo}/${total} videos`;
  }
  if (item.parts && item.parts.length > 0) {
    if (partsWithVideo === 0) return "No video";
    if (partsWithVideo === item.parts.length) return `${partsWithVideo} parts`;
    return `${partsWithVideo}/${item.parts.length} parts`;
  }
  return hasMain ? "1 video" : "No video";
}

function mediaBadge(item) {
  const label = mediaLabel(item);
  if (label.startsWith("No")) return "is-missing";
  if (label.includes("/")) return "is-partial";
  return "is-ok";
}

const filtered = computed(() => {
  let list = [...allContent.value];
  if (search.value) {
    const q = search.value.toLowerCase();
    list = list.filter((c) =>
      c.title.toLowerCase().includes(q) || (c.genre || "").toLowerCase().includes(q)
    );
  }
  if (typeFilter.value !== "all") list = list.filter((c) => c.type === typeFilter.value);
  switch (sortBy.value) {
    case "newest": list.sort((a, b) => b.id - a.id); break;
    case "oldest": list.sort((a, b) => a.id - b.id); break;
    case "title-asc": list.sort((a, b) => a.title.localeCompare(b.title)); break;
    case "title-desc": list.sort((a, b) => b.title.localeCompare(a.title)); break;
    case "rating": list.sort((a, b) => b.rating - a.rating); break;
  }
  return list;
});

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)));
const paginated = computed(() =>
  filtered.value.slice((page.value - 1) * perPage, page.value * perPage)
);

watch([search, typeFilter, sortBy], () => { page.value = 1; });

function resetFilters() {
  search.value = "";
  typeFilter.value = "all";
  sortBy.value = "newest";
  page.value = 1;
}
function askDelete(item) { deleteTarget.value = item; }
function confirmDelete() {
  if (!deleteTarget.value) return;
  deleteContent(deleteTarget.value.id);
  showToast(`Deleted "${deleteTarget.value.title}"`);
  deleteTarget.value = null;
}
function duplicate(item) {
  const copy = duplicateContent(item.id);
  if (copy) showToast(`Duplicated to "${copy.title}"`);
}
function showToast(msg) {
  toast.value = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.value = ""), 2500);
}
</script>

<style scoped>
.content-page { display: flex; flex-direction: column; gap: 20px; }
.page-head {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; flex-wrap: wrap;
}
.page-head h1 { color: #fff; font-size: 24px; font-weight: 800; }
.page-head p { color: #94a3b8; font-size: 12.5px; margin-top: 3px; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 10px 16px; color: #fff; font-size: 13px; font-weight: 700;
  text-decoration: none;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-radius: 10px;
}
.toolbar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.search-box {
  position: relative; display: flex; align-items: center; gap: 8px;
  flex: 1 1 220px; min-width: 200px; height: 40px;
  padding: 0 12px; color: #94a3b8;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 10px;
}
.search-box input {
  flex: 1; min-width: 0; height: 100%;
  color: #fff; font-family: inherit; font-size: 12.5px;
  background: transparent; border: none; outline: none;
}
.filter-chips { display: flex; gap: 6px; }
.chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 8px 12px; color: #cbd5e1;
  font-size: 12px; font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 8px;
}
.chip.active {
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-color: transparent;
}
.sort-select {
  padding: 8px 12px; color: #e2e8f0; font-family: inherit;
  font-size: 12px; font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 8px;
}
.sort-select option { color: #0f172a; background: #f8fafc; }
.table-wrap {
  overflow-x: auto;
  background: rgba(20, 27, 55, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 14px;
}
.content-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.content-table thead { background: rgba(15, 23, 42, 0.5); }
.content-table th {
  padding: 13px 14px; color: #94a3b8;
  font-size: 11px; font-weight: 700;
  text-align: left; text-transform: uppercase;
  letter-spacing: 0.6px; white-space: nowrap;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}
.content-table td {
  padding: 12px 14px; color: #e2e8f0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
  vertical-align: middle;
}
.content-table tbody tr:hover { background: rgba(99, 102, 241, 0.05); }
.cell-content { display: flex; align-items: center; gap: 11px; min-width: 220px; }
.cell-content img {
  width: 52px; height: 42px; object-fit: cover;
  border-radius: 7px; flex-shrink: 0;
  background: #11162b;
}
.cell-info { min-width: 0; }
.cell-info p {
  color: #fff; font-size: 13px; font-weight: 650;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 240px;
}
.cell-info small {
  display: block; color: #94a3b8; font-size: 10.5px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 240px; margin-top: 2px;
}
.type-tag {
  display: inline-flex; padding: 3px 8px;
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  border-radius: 5px;
}
.type-tag.is-movie { color: #a7f3d0; background: rgba(16, 185, 129, 0.18); }
.type-tag.is-series { color: #fbcfe8; background: rgba(219, 39, 119, 0.18); }
.muted { color: #94a3b8 !important; }
.small { font-size: 11.5px; }
.text-right { text-align: right; }
.rating-badge { color: #fde68a; font-size: 12px; font-weight: 700; }

.media-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
}
.media-dot.is-ok { background: #34d399; box-shadow: 0 0 8px rgba(52, 211, 153, 0.6); }
.media-dot.is-partial { background: #fbbf24; }
.media-dot.is-missing { background: #f87171; }

.row-actions { display: inline-flex; gap: 5px; justify-content: flex-end; }
.icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; color: #cbd5e1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 7px;
  text-decoration: none;
}
.icon-btn:hover { color: #fff; }
.icon-btn.danger { color: #fca5a5; }
.icon-btn.danger:hover { background: rgba(239, 68, 68, 0.25); }
.empty-row {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 44px 20px; color: #94a3b8; font-size: 13px;
}
.btn-ghost-sm {
  padding: 7px 13px; color: #a5b4fc; font-size: 12px; font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.3); border-radius: 8px;
}
.pagination {
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.pg-btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 34px; height: 34px; padding: 0 9px;
  color: #cbd5e1; font-size: 12px; font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 8px;
}
.pg-btn.active {
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-color: transparent;
}
.modal-backdrop {
  position: fixed; inset: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px; background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
}
.modal {
  width: 100%; max-width: 420px; padding: 24px;
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 16px;
}
.modal-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; margin-bottom: 12px; border-radius: 12px;
}
.modal-icon.warn { color: #fbbf24; background: rgba(251, 191, 36, 0.15); }
.modal h3 { color: #fff; font-size: 17px; font-weight: 750; margin-bottom: 8px; }
.modal p { color: #94a3b8; font-size: 13px; margin-bottom: 20px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 9px; }
.btn-ghost, .btn-danger {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 16px; font-size: 12.5px; font-weight: 650;
  border-radius: 9px; border: 1px solid transparent;
}
.btn-ghost {
  color: #cbd5e1; background: rgba(255, 255, 255, 0.05);
  border-color: rgba(148, 163, 184, 0.2);
}
.btn-danger {
  color: #fff;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
}
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
</style>