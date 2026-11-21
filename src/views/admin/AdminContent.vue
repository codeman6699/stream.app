
<template>
  <section class="content-page">

    <div class="page-heading">
      <div>
        <h2>Manage Content</h2>
        <p>View, update and remove movies and series.</p>
      </div>

      <router-link :to="{ name: 'AdminContentNew' }" class="add-btn">
        <Plus :size="17" />
        Add New Content
      </router-link>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <Search :size="17" />
        <input
          v-model="search"
          type="search"
          placeholder="Search by title or genre..."
        />
      </div>

      <select v-model="filterType">
        <option value="All">All content</option>
        <option value="Movie">Movies</option>
        <option value="Series">Series</option>
      </select>
    </div>

    <p v-if="loading" class="table-footer">Loading content from the database…</p>
    <p v-if="loadError" class="error-message">{{ loadError }}</p>

    <div class="content-table">
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Content</th>
              <th>Type</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Quality</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in filteredContent" :key="item.id">
              <td class="title-cell">
                <img
                  v-if="item.poster"
                  :src="item.poster"
                  :alt="item.title"
                />
                <div v-else class="poster-placeholder">
                  <Film :size="17" />
                </div>
                <span>{{ item.title }}</span>
              </td>

              <td>{{ item.type }}</td>
              <td>{{ item.year || "—" }}</td>
              <td>{{ item.genre || "—" }}</td>
              <td>
                <span class="quality">{{ item.quality }}</span>
                <span v-if="item.featured" class="quality">Featured</span>
                <span v-if="item.trending" class="quality">Trending</span>
              </td>

              <td>
                <div class="actions">
                  <button
                    class="edit-btn"
                    title="Edit content"
                    @click="editContent(item.id)"
                  >
                    <Pencil :size="16" />
                  </button>

                  <button
                    class="delete-btn"
                    title="Delete content"
                    @click="removeContent(item)"
                  >
                    <Trash2 :size="16" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!filteredContent.length">
              <td colspan="6" class="empty">
                <Film :size="28" />
                <strong>No content found</strong>
                <span>Try another search or add new content.</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        Showing {{ filteredContent.length }} of {{ content.length }} records
      </div>
    </div>

  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

import {
  getAdminContent,
  deleteAdminContent,
} from "@/utils/adminContent.js";

import {
  Plus,
  Search,
  Film,
  Pencil,
  Trash2,
} from "lucide-vue-next";

const router = useRouter();

const content = ref([]);
const search = ref("");
const filterType = ref("All");
const loading = ref(false);
const loadError = ref("");

const filteredContent = computed(() => {
  const query = search.value.trim().toLowerCase();

  return content.value.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      (item.genre || "").toLowerCase().includes(query);

    const matchesType =
      filterType.value === "All" ||
      item.type === filterType.value;

    return matchesSearch && matchesType;
  });
});

async function loadContent() {
  loading.value = true;
  loadError.value = "";
  try {
    content.value = await getAdminContent();
  } catch (error) {
    loadError.value = error.response?.data?.error || "Unable to load content from the server.";
  } finally {
    loading.value = false;
  }
}

function editContent(id) {
  router.push({
    name: "AdminContentEdit",
    params: { id },
  });
}

async function removeContent(item) {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${item.title}"?`
  );

  if (!confirmed) return;

  try {
    await deleteAdminContent(item.id);
    await loadContent();
  } catch (error) {
    window.alert(error.response?.data?.error || "Unable to delete content.");
  }
}

onMounted(() => {
  loadContent();
  window.addEventListener("stream-store-content-updated", loadContent);
});

onBeforeUnmount(() => {
  window.removeEventListener("stream-store-content-updated", loadContent);
});
</script>

<style scoped>
.content-page {
  display: grid;
  gap: 23px;
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
  color: #8793aa;
  margin-top: 6px;
  font-size: 12px;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 15px;
  color: white;
  background: #536fe0;
  border-radius: 9px;
  font-size: 12px;
  text-decoration: none;
}

.toolbar {
  display: flex;
  gap: 12px;
}

.search-box {
  max-width: 400px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 13px;
  color: #8490a8;
  background: #141d32;
  border: 1px solid #293650;
  border-radius: 9px;
}

.search-box input {
  width: 100%;
  height: 42px;
  color: white;
  background: transparent;
  border: 0;
  outline: none;
  font-size: 12px;
}

.search-box input::placeholder {
  color: #8490a8;
}

.toolbar select {
  min-width: 140px;
  padding: 0 12px;
  color: #dbe4f3;
  background: #141d32;
  border: 1px solid #293650;
  border-radius: 9px;
}

.content-table {
  overflow: hidden;
  background: #141d32;
  border: 1px solid #293650;
  border-radius: 12px;
}

.table-scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 750px;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 14px;
  border-bottom: 1px solid #293650;
  font-size: 12px;
}

th {
  color: #8490a8;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

td {
  color: #d1d9e8;
}

.title-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
  font-weight: 600;
}

.title-cell img,
.poster-placeholder {
  width: 35px;
  height: 45px;
  object-fit: cover;
  border-radius: 5px;
}

.poster-placeholder {
  display: grid;
  place-items: center;
  color: #a5b4fc;
  background: #273451;
}

.quality {
  padding: 5px 8px;
  color: #a5b4fc;
  background: #292d55;
  border-radius: 5px;
  font-size: 10px;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  width: 33px;
  height: 33px;
  display: grid;
  place-items: center;
  border-radius: 7px;
}

.edit-btn {
  color: #93c5fd;
  background: #1d365b;
  border: 1px solid #31517d;
}

.delete-btn {
  color: #fca5a5;
  background: #47252e;
  border: 1px solid #653441;
}

.empty {
  height: 170px;
  text-align: center;
  color: #8490a8;
}

.empty strong,
.empty span {
  display: block;
  margin-top: 8px;
}

.empty strong {
  color: white;
}

.table-footer {
  padding: 14px;
  color: #8490a8;
  font-size: 11px;
}

@media (max-width: 600px) {
  .page-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .toolbar {
    flex-direction: column;
  }

  .search-box {
    max-width: none;
  }

  .toolbar select {
    min-height: 42px;
  }
}
</style>
