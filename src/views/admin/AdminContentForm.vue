<template>
  <section class="form-page">

    <div class="page-heading">
      <div>
        <h2>{{ isEditing ? "Edit Content" : "Add New Content" }}</h2>
        <p>
          {{ isEditing
            ? "Update the information for this title."
            : "Add a movie or series to your content collection."
          }}
        </p>
      </div>

      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="16" />
        Back to content
      </button>
    </div>

    <form class="content-form" @submit.prevent="saveContent">

      <div class="form-grid">

        <div class="field full">
          <label for="title">Content title *</label>
          <input
            id="title"
            v-model.trim="form.title"
            required
            maxlength="150"
            placeholder="Enter movie or series title"
          />
        </div>

        <div class="field">
          <label for="type">Content type *</label>
          <select id="type" v-model="form.type" required>
            <option value="Movie">Movie</option>
            <option value="Series">Series</option>
          </select>
        </div>

        <div class="field">
          <label for="year">Release year</label>
          <input
            id="year"
            v-model.number="form.year"
            type="number"
            min="1888"
            :max="new Date().getFullYear() + 5"
            placeholder="2026"
          />
        </div>

        <div class="field">
          <label for="genre">Genre</label>
          <input
            id="genre"
            v-model.trim="form.genre"
            placeholder="Action, Drama, Comedy..."
          />
        </div>

        <div class="field">
          <label for="quality">Video quality *</label>
          <select id="quality" v-model="form.quality" required>
            <option>HD</option>
            <option>Full HD</option>
            <option>4K</option>
            <option>1080p</option>
            <option>720p</option>
            <option>480p</option>
          </select>
        </div>

        <div class="field">
          <label for="releaseDate">Release date</label>
          <input id="releaseDate" v-model="form.released" type="date" />
        </div>

        <div class="field">
          <label for="rating">Rating (0–10)</label>
          <input id="rating" v-model.number="form.rating" type="number" min="0" max="10" step="0.1" />
        </div>

        <div class="field full">
          <label for="poster">Poster image URL</label>
          <input
            id="poster"
            v-model.trim="form.poster"
            type="url"
            placeholder="https://example.com/poster.jpg"
          />
        </div>

        <div class="field full">
          <label for="posterFile">Or upload a poster (JPG, PNG, WebP, AVIF)</label>
          <input id="posterFile" type="file" accept="image/jpeg,image/png,image/webp,image/avif" @change="form.posterFile = $event.target.files?.[0] || null" />
          <small v-if="form.posterFile">Selected: {{ form.posterFile.name }}</small>
        </div>

        <div class="field full">
          <label for="videoUrl">Video or streaming URL</label>
          <input
            id="videoUrl"
            v-model.trim="form.videoUrl"
            type="url"
            placeholder="https://example.com/video"
          />
        </div>

        <div v-if="form.type === 'Movie'" class="field full">
          <label for="videoFile">Or upload a movie video (MP4, WebM, Ogg, MOV)</label>
          <input id="videoFile" type="file" accept="video/mp4,video/webm,video/ogg,video/quicktime" @change="form.videoFile = $event.target.files?.[0] || null" />
          <small v-if="form.videoFile">Selected: {{ form.videoFile.name }}</small>
        </div>

        <div class="field full">
          <label for="downloadBase">Optional authorized download URL</label>
          <input id="downloadBase" v-model.trim="form.downloadBase" type="url" placeholder="https://example.com/download" />
        </div>

        <div v-if="form.type === 'Series'" class="field full episode-editor">
          <div class="episode-heading">
            <div><label>Seasons and episodes</label><small>Episodes are sorted by season and episode number.</small></div>
            <div class="episode-actions">
              <button type="button" class="add-episode" @click="addSeason">Add season</button>
              <button type="button" class="add-episode" @click="addEpisode">Add episode</button>
            </div>
          </div>
          <div v-for="(episode, index) in form.episodes" :key="episode.clientId" class="episode-row">
            <div class="episode-fields">
              <label>Season<input v-model.number="episode.season" type="number" min="1" required /></label>
              <label>Episode #<input v-model.number="episode.ep" type="number" min="1" required /></label>
              <label class="episode-title">Title<input v-model.trim="episode.title" maxlength="150" required /></label>
              <label>Duration<input v-model.trim="episode.duration" placeholder="45 min" /></label>
              <label class="episode-title">Video URL<input v-model.trim="episode.videoUrl" type="url" placeholder="https://…" /></label>
              <label class="episode-title">Video file<input type="file" accept="video/mp4,video/webm,video/ogg,video/quicktime" @change="episode.videoFile = $event.target.files?.[0] || null" /></label>
              <label class="episode-title">Description<textarea v-model.trim="episode.description" rows="2" /></label>
            </div>
            <button type="button" class="remove-episode" @click="removeEpisode(index)">Remove episode</button>
          </div>
          <p v-if="!form.episodes.length" class="episode-empty">Add one or more episodes to make the series playable.</p>
        </div>

        <div class="field full flags">
          <label><input v-model="form.featured" type="checkbox" /> Featured content</label>
          <label><input v-model="form.trending" type="checkbox" /> Trending content</label>
        </div>

        <div class="field full">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model.trim="form.description"
            rows="5"
            maxlength="2000"
            placeholder="Write a short description..."
          ></textarea>
        </div>

      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="form-actions">
        <button type="button" class="cancel-btn" @click="goBack">
          Cancel
        </button>

        <button type="submit" class="save-btn" :disabled="saving">
          <Save :size="17" />
          {{ saving ? "Saving..." : isEditing ? "Update Content" : "Save Content" }}
        </button>
      </div>

    </form>

  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  addAdminContent,
  getAdminContentById,
  updateAdminContent,
} from "@/utils/adminContent.js";

import {
  ArrowLeft,
  Save,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const saving = ref(false);
const error = ref("");

const isEditing = computed(() => Boolean(route.params.id));

const form = reactive({
  title: "",
  type: "Movie",
  year: new Date().getFullYear(),
  genre: "",
  quality: "HD",
  poster: "",
  posterFile: null,
  videoUrl: "",
  videoFile: null,
  downloadBase: "",
  released: "",
  rating: 0,
  featured: false,
  trending: false,
  episodes: [],
  description: "",
});

let episodeKey = 0;
function makeEpisode(episode = {}) {
  return {
    clientId: `episode-${episodeKey++}`,
    season: Number(episode.season || 1),
    ep: Number(episode.ep || 1),
    title: episode.title || "",
    description: episode.description || "",
    duration: episode.duration || "",
    videoUrl: episode.videoUrl || "",
    videoFile: null,
  };
}
function addEpisode() {
  const season = Math.max(1, ...form.episodes.map((episode) => Number(episode.season) || 1));
  form.episodes.push(makeEpisode({ season, ep: form.episodes.filter((episode) => Number(episode.season) === season).length + 1 }));
}
function addSeason() {
  const season = Math.max(0, ...form.episodes.map((episode) => Number(episode.season) || 0)) + 1;
  form.episodes.push(makeEpisode({ season, ep: 1 }));
}
function removeEpisode(index) {
  form.episodes.splice(index, 1);
}

async function loadExistingContent() {
  if (!isEditing.value) return;

  try {
    const item = await getAdminContentById(route.params.id);
    Object.assign(form, {
      title: item.title || "",
      type: item.type || "Movie",
      year: item.year || "",
      genre: item.genre || "",
      quality: item.quality || "HD",
      poster: item.poster || "",
      posterFile: null,
      videoUrl: item.videoUrl || "",
      videoFile: null,
      downloadBase: item.downloadBase || "",
      released: item.released ? String(item.released).slice(0, 10) : "",
      rating: item.rating || 0,
      featured: item.featured,
      trending: item.trending,
      episodes: item.seasons.flatMap((season) => season.episodes.map((episode) => makeEpisode({ ...episode, season: season.season }))),
      description: item.description || "",
    });
  } catch (loadError) {
    error.value = loadError.response?.data?.error || "Unable to load this content from the server.";
    router.replace({ name: "AdminContent" });
  }
}

async function saveContent() {
  error.value = "";

  if (!form.title.trim()) {
    error.value = "Please enter a content title.";
    return;
  }

  saving.value = true;

  try {
    const payload = {
      title: form.title,
      type: form.type,
      year: form.year,
      genre: form.genre,
      quality: form.quality,
      released: form.released || "",
      rating: form.rating,
      info: form.description,
      description: form.description,
      downloadBase: form.downloadBase,
      poster: form.poster,
      posterFile: form.posterFile,
      videoUrl: form.videoUrl,
      videoFile: form.videoFile,
    };

    if (isEditing.value) {
      await updateAdminContent(route.params.id, payload);
    } else {
      await addAdminContent(payload);
    }

    router.push({ name: "AdminContent" });
  } catch (err) {
    console.error("Content save failed:", err);
    error.value =
      err.response?.data?.error ||
      err.message ||
      "Unable to save content. Please try again.";
  } finally {
    saving.value = false;
  }
}

function goBack() {
  router.push({ name: "AdminContent" });
}

onMounted(loadExistingContent);
</script>

<style scoped>
.form-page {
  display: grid;
  gap: 24px;
}

.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.page-heading h2 {
  color: white;
  font-size: 21px;
}

.page-heading p {
  margin-top: 6px;
  color: #8793aa;
  font-size: 12px;
}

.back-btn,
.cancel-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 13px;
  color: #cbd5e1;
  background: #202c43;
  border: 1px solid #35425b;
  border-radius: 8px;
  font-size: 12px;
}

.content-form {
  max-width: 850px;
  padding: 25px;
  background: #141d32;
  border: 1px solid #293650;
  border-radius: 13px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.field {
  display: grid;
  gap: 8px;
}

.field.full {
  grid-column: 1 / -1;
}

.field label {
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 12px;
  color: white;
  background: #0c1426;
  border: 1px solid #35425b;
  border-radius: 8px;
  outline: none;
  font-size: 12px;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

.field input::placeholder,
.field textarea::placeholder {
  color: #78859d;
}

.field select option {
  background: #101629;
}

.field textarea {
  resize: vertical;
  line-height: 1.6;
}

.field small,
.episode-empty {
  color: #8793aa;
  font-size: 11px;
}

.episode-heading,
.episode-fields,
.flags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.episode-heading {
  justify-content: space-between;
}

.episode-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.episode-heading > div,
.episode-fields label {
  display: grid;
  gap: 7px;
}

.episode-row {
  display: grid;
  gap: 12px;
  padding: 14px;
  background: #0c1426;
  border: 1px solid #35425b;
  border-radius: 9px;
}

.episode-fields > label {
  flex: 1 1 130px;
  color: #cbd5e1;
  font-size: 11px;
}

.episode-fields > .episode-title {
  flex-basis: 240px;
}

.episode-fields input,
.episode-fields textarea {
  width: 100%;
  padding: 9px;
  color: white;
  background: #141d32;
  border: 1px solid #35425b;
  border-radius: 7px;
}

.add-episode,
.remove-episode {
  justify-self: start;
  padding: 9px 12px;
  color: white;
  background: #1d365b;
  border: 1px solid #31517d;
  border-radius: 7px;
  cursor: pointer;
}

.remove-episode {
  color: #fecaca;
  background: #47252e;
  border-color: #653441;
}

.flags label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  font-size: 12px;
}

.flags input {
  width: auto;
  accent-color: #2f70d1;
}

.error-message {
  margin-top: 15px;
  padding: 12px;
  color: #fecaca;
  background: #40232c;
  border: 1px solid #733747;
  border-radius: 8px;
  font-size: 12px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #293650;
}

.save-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 17px;
  color: white;
  background: #536fe0;
  border: 0;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .page-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .content-form {
    padding: 16px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .field.full {
    grid-column: auto;
  }
}
</style>