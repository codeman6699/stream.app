<template>
  <div class="form-page">
    <div class="page-head">
      <button class="back-link" @click="router.push('/admin/content')">
        <ArrowLeft :size="15" /> Back
      </button>
      <h1>{{ isEdit ? "Edit Content" : "Add Content" }}</h1>
      <p>{{ isEdit ? `Editing #${form.id}` : "Create a new movie or series entry." }}</p>
    </div>

    <form class="edit-form" @submit.prevent="save">
      <!-- TYPE -->
      <div class="field">
        <label class="field-label">Content Type</label>
        <div class="type-toggle">
          <button
            type="button" class="type-btn"
            :class="{ active: form.type === 'Movie' }"
            @click="form.type = 'Movie'"
          ><Film :size="15" /> Movie</button>
          <button
            type="button" class="type-btn"
            :class="{ active: form.type === 'Series' }"
            @click="form.type = 'Series'"
          ><Tv :size="15" /> Series</button>
        </div>
      </div>

      <!-- BASIC INFO -->
      <section class="form-section">
        <h2 class="section-title">Basic Information</h2>
        <div class="grid-2">
          <div class="field">
            <label>Title *</label>
            <input v-model.trim="form.title" type="text" required />
          </div>
          <div class="field">
            <label>Genre</label>
            <input v-model.trim="form.genre" type="text" placeholder="Action, Drama…" />
          </div>
          <div class="field">
            <label>Year</label>
            <input v-model.number="form.year" type="number" min="1900" max="2100" />
          </div>
          <div class="field">
            <label>Release date</label>
            <input v-model="form.released" type="date" />
          </div>
          <div class="field">
            <label>Rating (0–10)</label>
            <input v-model.number="form.rating" type="number" step="0.1" min="0" max="10" />
          </div>
          <div class="field">
            <label>Quality</label>
            <select v-model="form.quality">
              <option value="HD">HD</option>
              <option value="4K">4K</option>
              <option value="SD">SD</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label>Short description</label>
          <input v-model.trim="form.info" type="text" placeholder="Action • 2026 • …" />
        </div>
        <div class="field">
          <label>Download base URL</label>
          <input v-model.trim="form.downloadBase" type="text" placeholder="https://cdn.example.com/my-movie" />
          <p class="hint">Admin appends <code>-4k.mp4</code>, <code>-1080p.mp4</code>, etc.</p>
        </div>
      </section>

      <!-- POSTER: upload from PC or paste URL -->
      <section class="form-section">
        <h2 class="section-title">Poster Image</h2>
        <div class="upload-row">
          <label class="upload-btn">
            <Upload :size="14" /> Upload from PC
            <input type="file" accept="image/*" hidden @change="onPosterFile" />
          </label>
          <span class="upload-or">or</span>
          <input
            v-model.trim="form.image"
            type="text"
            class="upload-url"
            placeholder="https://… or paste image URL"
          />
        </div>
        <p v-if="posterError" class="error-text">{{ posterError }}</p>
        <div v-if="form.image" class="poster-preview">
          <img :src="form.image" alt="Poster preview" />
          <button type="button" class="remove-poster" @click="form.image = ''">
            <X :size="13" />
          </button>
        </div>
        <p class="hint">Recommended: under 1 MB. Larger images may fail to save in browser storage.</p>
      </section>

      <!-- MOVIE: video + parts -->
      <section v-if="form.type === 'Movie'" class="form-section">
        <h2 class="section-title">Video & Parts</h2>

        <!-- Main video -->
        <div class="field">
          <label>Main video</label>
          <div class="upload-row">
            <label class="upload-btn">
              <Upload :size="14" /> Upload video
              <input type="file" accept="video/*" hidden @change="onMainVideoFile" />
            </label>
            <span class="upload-or">or</span>
            <input
              v-model.trim="form.videoUrl"
              type="text"
              class="upload-url"
              placeholder="https://…mp4"
            />
          </div>
          <p v-if="videoError" class="error-text">{{ videoError }}</p>
          <p v-if="form.videoUrl" class="hint small">
            ✅ Source set ({{ form.videoUrl.startsWith('data:') ? 'uploaded file' : 'external URL' }})
          </p>
        </div>

        <!-- Parts -->
        <div class="parts-header">
          <label class="field-label">Multi-part?</label>
          <button type="button" class="btn-ghost-sm" @click="addPart">
            <Plus :size="13" /> Add Part
          </button>
        </div>

        <div v-if="form.parts?.length" class="parts-list">
          <div v-for="(p, i) in form.parts" :key="i" class="part-row">
            <span class="part-num">P{{ i + 1 }}</span>
            <input v-model.trim="p.title" type="text" placeholder="Part title" />
            <input v-model.trim="p.duration" type="text" placeholder="1h 20m" class="small-input" />
            <div class="upload-row inline">
              <label class="upload-btn sm">
                <Upload :size="12" /> File
                <input type="file" accept="video/*" hidden @change="(e) => onPartVideoFile(e, i)" />
              </label>
              <input
                v-model.trim="p.videoUrl"
                type="text"
                class="upload-url sm"
                placeholder="Video URL"
              />
            </div>
            <button type="button" class="icon-btn danger" @click="removePart(i)">
              <Trash2 :size="13" />
            </button>
          </div>
        </div>
        <div v-else class="empty-hint">No parts. Movie will be single-part.</div>
      </section>

      <!-- SERIES: seasons + episodes -->
      <section v-if="form.type === 'Series'" class="form-section">
        <h2 class="section-title">Seasons & Episodes</h2>
        <div class="seasons-header">
          <span class="field-label">{{ form.seasons?.length || 0 }} season(s)</span>
          <button type="button" class="btn-ghost-sm" @click="addSeason">
            <Plus :size="13" /> Add Season
          </button>
        </div>

        <div v-for="(season, si) in form.seasons" :key="si" class="season-block">
          <div class="season-head">
            <div class="season-title">
              <strong>Season {{ season.season }}</strong>
              <span class="ep-count">{{ season.episodes?.length || 0 }} episodes</span>
            </div>
            <div class="season-actions">
              <button type="button" class="btn-ghost-sm" @click="addEpisode(si)">
                <Plus :size="13" /> Episode
              </button>
              <button type="button" class="icon-btn danger" @click="removeSeason(si)">
                <Trash2 :size="13" />
              </button>
            </div>
          </div>

          <div v-if="season.episodes?.length" class="episodes-list-form">
            <div v-for="(ep, ei) in season.episodes" :key="ei" class="ep-row">
              <span class="ep-num">E{{ ep.ep }}</span>
              <input v-model.trim="ep.title" type="text" placeholder="Episode title" />
              <input v-model.trim="ep.duration" type="text" placeholder="45m" class="small-input" />
              <div class="upload-row inline">
                <label class="upload-btn sm">
                  <Upload :size="12" /> File
                  <input
                    type="file"
                    accept="video/*"
                    hidden
                    @change="(e) => onEpisodeVideoFile(e, si, ei)"
                  />
                </label>
                <input
                  v-model.trim="ep.videoUrl"
                  type="text"
                  class="upload-url sm"
                  placeholder="Video URL"
                />
              </div>
              <button type="button" class="icon-btn danger" @click="removeEpisode(si, ei)">
                <Trash2 :size="13" />
              </button>
            </div>
          </div>
          <div v-else class="empty-hint">No episodes yet.</div>
        </div>
      </section>

      <div class="form-actions">
        <button type="button" class="btn-ghost" @click="cancel">Cancel</button>
        <button type="submit" class="btn-primary" :disabled="saving">
          <Loader2 v-if="saving" :size="14" class="spin" />
          <Save v-else :size="14" />
          {{ saving ? "Saving…" : (isEdit ? "Save changes" : "Create content") }}
        </button>
      </div>
    </form>

    <Transition name="toast">
      <div v-if="toast" class="toast">
        <CheckCircle2 :size="16" /> {{ toast }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft, Film, Tv, Plus, Trash2, Save, Loader2,
  CheckCircle2, Upload, X,
} from "lucide-vue-next";
import { useContentStore } from "@/stores/contentStore.js";

const route = useRoute();
const router = useRouter();
const { findById, addContent, updateContent, generateId } = useContentStore();

const isEdit = computed(() => !!route.params.id && route.params.id !== "new");
const saving = ref(false);
const toast = ref("");
const posterError = ref("");
const videoError = ref("");
let toastTimer = null;

const IMAGE_MAX_BYTES = 1.5 * 1024 * 1024;   // 1.5 MB
const VIDEO_MAX_BYTES = 4 * 1024 * 1024;     // 4 MB

const form = reactive({
  id: null,
  type: "Movie",
  title: "",
  genre: "",
  year: new Date().getFullYear(),
  released: "",
  rating: 7.0,
  quality: "HD",
  info: "",
  image: "",
  videoUrl: "",
  downloadBase: "",
  parts: [],
  seasons: [],
});

onMounted(() => {
  if (isEdit.value) {
    const existing = findById(route.params.id);
    if (existing) {
      Object.assign(form, JSON.parse(JSON.stringify(existing)));
      if (!form.parts) form.parts = [];
      if (!form.seasons) form.seasons = [];
    }
  } else if (route.query.type === "Series") {
    form.type = "Series";
  }
});

/* ============ FILE UPLOADS (local PC) ============ */
function readFileAsDataURL(file, maxBytes) {
  return new Promise((resolve, reject) => {
    if (file.size > maxBytes) {
      reject(new Error(`File too large (${(file.size / 1024 / 1024).toFixed(2)} MB). Max ${(maxBytes / 1024 / 1024).toFixed(1)} MB.`));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function onPosterFile(e) {
  const file = e.target.files?.[0];
  e.target.value = "";
  if (!file) return;
  posterError.value = "";
  try {
    const dataUrl = await readFileAsDataURL(file, IMAGE_MAX_BYTES);
    form.image = dataUrl;
  } catch (err) {
    posterError.value = err.message;
  }
}

async function onMainVideoFile(e) {
  const file = e.target.files?.[0];
  e.target.value = "";
  if (!file) return;
  videoError.value = "";
  try {
    const dataUrl = await readFileAsDataURL(file, VIDEO_MAX_BYTES);
    form.videoUrl = dataUrl;
  } catch (err) {
    videoError.value = err.message + " Use a URL instead for larger files.";
  }
}

async function onPartVideoFile(e, partIndex) {
  const file = e.target.files?.[0];
  e.target.value = "";
  if (!file) return;
  try {
    const dataUrl = await readFileAsDataURL(file, VIDEO_MAX_BYTES);
    form.parts[partIndex].videoUrl = dataUrl;
  } catch (err) {
    showToast(err.message);
  }
}

async function onEpisodeVideoFile(e, si, ei) {
  const file = e.target.files?.[0];
  e.target.value = "";
  if (!file) return;
  try {
    const dataUrl = await readFileAsDataURL(file, VIDEO_MAX_BYTES);
    form.seasons[si].episodes[ei].videoUrl = dataUrl;
  } catch (err) {
    showToast(err.message);
  }
}

/* ============ PARTS ============ */
function addPart() {
  form.parts.push({
    part: form.parts.length + 1,
    title: "",
    duration: "",
    quality: form.quality,
    videoUrl: "",
  });
}
function removePart(i) {
  form.parts.splice(i, 1);
  form.parts.forEach((p, idx) => (p.part = idx + 1));
}

/* ============ SEASONS ============ */
function addSeason() {
  form.seasons.push({
    season: form.seasons.length + 1,
    episodes: [],
  });
}
function removeSeason(i) {
  if (!confirm("Remove this season?")) return;
  form.seasons.splice(i, 1);
  form.seasons.forEach((s, idx) => (s.season = idx + 1));
}
function addEpisode(si) {
  const s = form.seasons[si];
  if (!s.episodes) s.episodes = [];
  s.episodes.push({
    ep: s.episodes.length + 1,
    title: "",
    duration: "",
    videoUrl: "",
  });
}
function removeEpisode(si, ei) {
  const s = form.seasons[si];
  s.episodes.splice(ei, 1);
  s.episodes.forEach((e, idx) => (e.ep = idx + 1));
}

/* ============ SAVE ============ */
async function save() {
  if (!form.title.trim()) {
    showToast("Title is required");
    return;
  }
  saving.value = true;
  await new Promise((r) => setTimeout(r, 300));

  const payload = JSON.parse(JSON.stringify(form));
  if (payload.type === "Movie") {
    if (!payload.parts || payload.parts.length === 0) payload.parts = null;
  } else {
    delete payload.parts;
  }

  try {
    if (isEdit.value) {
      updateContent(route.params.id, payload);
      showToast("Content updated");
    } else {
      payload.id = generateId();
      addContent(payload);
      showToast("Content created");
    }
    setTimeout(() => router.push("/admin/content"), 500);
  } catch (e) {
    showToast("Error: " + e.message);
  } finally {
    saving.value = false;
  }
}

function cancel() {
  router.push("/admin/content");
}
function showToast(msg) {
  toast.value = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.value = ""), 2800);
}
</script>

<style scoped>
.form-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1000px;
}
.page-head h1 {
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  margin-top: 6px;
}
.page-head p {
  color: #94a3b8;
  font-size: 12.5px;
  margin-top: 3px;
}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 600;
  background: transparent;
  border: none;
}
.back-link:hover { color: #a5b4fc; }

.edit-form { display: flex; flex-direction: column; gap: 18px; }

.form-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
  background: rgba(20, 27, 55, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
}
.section-title {
  color: #fff;
  font-size: 15px;
  font-weight: 750;
  margin-bottom: 4px;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field { display: flex; flex-direction: column; gap: 6px; }
.field label,
.field-label {
  color: #cbd5e1;
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.field input,
.field select {
  padding: 10px 13px;
  color: #fff;
  font-family: inherit;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 10px;
  outline: none;
}
.field input:focus,
.field select:focus {
  background: rgba(255, 255, 255, 0.07);
  border-color: #818cf8;
}
.field select option { color: #0f172a; background: #f8fafc; }

.hint {
  color: #64748b;
  font-size: 11px;
  margin-top: 2px;
}
.hint.small { font-size: 11px; }
.hint code {
  padding: 1px 5px;
  color: #c7d2fe;
  font-family: monospace;
  background: rgba(99, 102, 241, 0.15);
  border-radius: 4px;
}
.error-text {
  color: #fca5a5;
  font-size: 11.5px;
  margin-top: 4px;
}

/* ========== UPLOAD ROWS ========== */
.upload-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.upload-row.inline {
  flex: 1;
  min-width: 200px;
}
.upload-or {
  color: #64748b;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 650;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.4);
  border-radius: 9px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.upload-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);
}
.upload-btn.sm {
  padding: 6px 10px;
  font-size: 11px;
  border-radius: 7px;
}
.upload-url {
  flex: 1;
  min-width: 150px;
  padding: 9px 13px;
  color: #ffffff;
  font-family: inherit;
  font-size: 12.5px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 9px;
  outline: none;
}
.upload-url:focus {
  background: rgba(255, 255, 255, 0.07);
  border-color: #818cf8;
}
.upload-url::placeholder { color: #64748b; }
.upload-url.sm {
  padding: 7px 10px;
  font-size: 11.5px;
  border-radius: 7px;
}

/* ========== POSTER PREVIEW ========== */
.poster-preview {
  position: relative;
  width: 120px;
  height: 160px;
  margin-top: 6px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(129, 140, 248, 0.35);
}
.poster-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.remove-poster {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(239, 68, 68, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.remove-poster:hover { background: rgba(239, 68, 68, 1); }

/* ========== TYPE TOGGLE ========== */
.type-toggle {
  display: inline-flex;
  padding: 4px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 10px;
  gap: 3px;
}
.type-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  color: #cbd5e1;
  font-size: 12.5px;
  font-weight: 600;
  background: transparent;
  border: none;
  border-radius: 8px;
}
.type-btn.active {
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
}

/* ========== PARTS & EPISODES ========== */
.parts-header,
.seasons-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}
.btn-ghost-sm {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  color: #a5b4fc;
  font-size: 11.5px;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 8px;
  cursor: pointer;
}
.btn-ghost-sm:hover {
  color: #fff;
  background: rgba(99, 102, 241, 0.25);
}
.parts-list,
.episodes-list-form {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.part-row,
.ep-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 9px;
  flex-wrap: wrap;
}
.part-num,
.ep-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  color: #c7d2fe;
  font-size: 11px;
  font-weight: 800;
  background: rgba(99, 102, 241, 0.18);
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 8px;
}
.part-row > input[type="text"],
.ep-row > input[type="text"] {
  flex: 1;
  min-width: 100px;
  padding: 8px 11px;
  color: #fff;
  font-family: inherit;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 7px;
  outline: none;
}
.small-input {
  max-width: 90px;
  flex: 0 1 90px !important;
}
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 7px;
  cursor: pointer;
}
.icon-btn.danger { color: #fca5a5; }
.icon-btn.danger:hover {
  color: #fff;
  background: rgba(239, 68, 68, 0.25);
}

.season-block {
  padding: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 11px;
}
.season-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.season-title {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #fff;
  font-size: 13px;
}
.ep-count {
  padding: 2px 8px;
  color: #94a3b8;
  font-size: 10.5px;
  font-weight: 600;
  background: rgba(148, 163, 184, 0.1);
  border-radius: 6px;
}
.season-actions {
  display: flex;
  gap: 6px;
}
.empty-hint {
  padding: 18px 12px;
  color: #64748b;
  font-size: 12px;
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(148, 163, 184, 0.2);
  border-radius: 9px;
}

/* ========== ACTIONS ========== */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 6px;
}
.btn-primary,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 11px 22px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
}
.btn-ghost {
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(148, 163, 184, 0.2);
}
.btn-ghost:hover { color: #fff; background: rgba(255, 255, 255, 0.1); }
.btn-primary {
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 26px rgba(99, 102, 241, 0.45);
}
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

.spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1100;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  color: #fff;
  font-size: 12.5px;
  font-weight: 600;
  background: rgba(16, 185, 129, 0.95);
  border: 1px solid rgba(52, 211, 153, 0.6);
  border-radius: 10px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

@media (max-width: 700px) {
  .grid-2 { grid-template-columns: 1fr; }
  .form-section { padding: 16px; }
  .upload-row { flex-direction: column; align-items: stretch; }
  .upload-btn { width: 100%; justify-content: center; }
  .upload-url { width: 100%; }
}
</style>