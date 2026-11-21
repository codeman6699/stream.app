
<template>
  <section class="dashboard">

    <div class="welcome">
      <div>
        <h2>Welcome to your Admin Dashboard</h2>
        <p>Monitor and manage your Stream.Store platform. <span v-if="loadError">{{ loadError }}</span></p>
      </div>
      <router-link :to="{ name: 'AdminContentNew' }" class="primary-btn">
        <Plus :size="17" />
        Add Content
      </router-link>
    </div>

    <div class="stats-grid">
      <article class="stat-card">
        <div class="stat-icon purple"><Film :size="22" /></div>
        <div>
          <span>Total Content</span>
          <strong>{{ content.length }}</strong>
        </div>
      </article>

      <article class="stat-card">
        <div class="stat-icon blue"><Clapperboard :size="22" /></div>
        <div>
          <span>Movies</span>
          <strong>{{ movies }}</strong>
        </div>
      </article>

      <article class="stat-card">
        <div class="stat-icon green"><Tv :size="22" /></div>
        <div>
          <span>Series</span>
          <strong>{{ series }}</strong>
        </div>
      </article>

      <article class="stat-card">
        <div class="stat-icon orange"><ShieldCheck :size="22" /></div>
        <div>
          <span>Admin Status</span>
          <strong class="active-status">Active</strong>
        </div>
      </article>
    </div>

    <div class="section-heading">
      <div>
        <h3>Recently Added Content</h3>
        <p>Your latest content records</p>
      </div>

      <router-link :to="{ name: 'AdminContent' }" class="text-link">
        View all <ArrowRight :size="15" />
      </router-link>
    </div>

    <div class="table-card">
      <div v-if="recentContent.length" class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Year</th>
              <th>Quality</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in recentContent" :key="item.id">
              <td class="title-cell">
                <img
                  v-if="item.poster"
                  :src="item.poster"
                  :alt="item.title"
                />
                <div v-else class="poster-placeholder">
                  <Film :size="17" />
                </div>
                {{ item.title }}
              </td>
              <td>{{ item.type }}</td>
              <td>{{ item.year || "—" }}</td>
              <td><span class="quality">{{ item.quality }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="empty-state">
        <Film :size="34" />
        <h3>No content added yet</h3>
        <p>Start by adding your first movie or series.</p>
        <router-link :to="{ name: 'AdminContentNew' }" class="primary-btn">
          Add your first content
        </router-link>
      </div>
    </div>

  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { getAdminContent } from "@/utils/adminContent.js";

import {
  Plus,
  Film,
  Clapperboard,
  Tv,
  ShieldCheck,
  ArrowRight,
} from "lucide-vue-next";

const content = ref([]);

const movies = computed(
  () => content.value.filter((item) => item.type === "Movie").length
);

const series = computed(
  () => content.value.filter((item) => item.type === "Series").length
);

const recentContent = computed(
  () => content.value.slice(0, 5)
);

async function loadContent() {
  try {
    content.value = await getAdminContent();
    loadError.value = "";
  } catch (error) {
    loadError.value = error.response?.data?.error || "Unable to load dashboard data.";
  }
}

const loadError = ref("");

onMounted(() => {
  loadContent();
  window.addEventListener("stream-store-content-updated", loadContent);
});

onBeforeUnmount(() => {
  window.removeEventListener("stream-store-content-updated", loadContent);
});
</script>

<style scoped>
.dashboard {
  display: grid;
  gap: 28px;
}

.welcome,
.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.welcome h2 {
  color: white;
  font-size: 21px;
}

.welcome p,
.section-heading p {
  color: #8793aa;
  font-size: 12px;
  margin-top: 7px;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 15px;
  color: white;
  background: #536fe0;
  border: 0;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  background: #141d32;
  border: 1px solid #293650;
  border-radius: 13px;
}

.stat-icon {
  width: 45px;
  height: 45px;
  display: grid;
  place-items: center;
  border-radius: 12px;
}

.purple { color: #c4b5fd; background: #33265c; }
.blue { color: #93c5fd; background: #1d365b; }
.green { color: #86efac; background: #174438; }
.orange { color: #fdba74; background: #54351f; }

.stat-card span {
  display: block;
  color: #9aa7bd;
  font-size: 11px;
}

.stat-card strong {
  display: block;
  margin-top: 6px;
  color: white;
  font-size: 23px;
}

.stat-card .active-status {
  color: #6ee7b7;
  font-size: 16px;
}

.section-heading h3 {
  color: white;
  font-size: 16px;
}

.text-link {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #a5b4fc;
  font-size: 12px;
  text-decoration: none;
}

.table-card {
  overflow: hidden;
  background: #141d32;
  border: 1px solid #293650;
  border-radius: 13px;
}

.table-scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 15px 17px;
  border-bottom: 1px solid #293650;
  font-size: 12px;
}

th {
  color: #8996ae;
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

.empty-state {
  padding: 50px 20px;
  display: grid;
  justify-items: center;
  gap: 12px;
  color: #8490a8;
  text-align: center;
}

.empty-state h3 {
  color: white;
  font-size: 16px;
}

.empty-state p {
  font-size: 12px;
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .welcome {
    align-items: flex-start;
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
