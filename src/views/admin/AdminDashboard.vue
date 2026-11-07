<template>
  <div class="dash-page">
    <div class="page-head">
      <div>
        <h1>Dashboard</h1>
        <p>Overview of your content library.</p>
      </div>
      <router-link to="/admin/content/new" class="btn-primary">
        <Plus :size="16" /> Add Content
      </router-link>
    </div>

    <div class="stats-grid">
      <div v-for="s in statCards" :key="s.label" class="stat-card">
        <div class="stat-icon" :style="{ background: s.bg }">
          <component :is="s.icon" :size="22" />
        </div>
        <div>
          <p class="stat-value">{{ s.value }}</p>
          <p class="stat-label">{{ s.label }}</p>
        </div>
      </div>
    </div>

    <div class="dash-grid">
      <section class="panel">
        <h2 class="panel-title"><Zap :size="18" /> Quick Actions</h2>
        <div class="quick-actions">
          <router-link to="/admin/content/new?type=Movie" class="qa-card">
            <Film :size="20" />
            <div><p>New Movie</p><small>Upload a movie</small></div>
          </router-link>
          <router-link to="/admin/content/new?type=Series" class="qa-card">
            <Tv :size="20" />
            <div><p>New Series</p><small>Add a series</small></div>
          </router-link>
          <router-link to="/admin/content" class="qa-card">
            <Library :size="20" />
            <div><p>Manage Library</p><small>{{ stats.totalContent }} items</small></div>
          </router-link>
          <router-link to="/admin/settings" class="qa-card">
            <Settings :size="20" />
            <div><p>Settings</p><small>Backup & restore</small></div>
          </router-link>
        </div>
      </section>

      <section class="panel">
        <h2 class="panel-title"><Clock :size="18" /> Recently Added</h2>
        <div v-if="recent.length === 0" class="empty-recent">
          No content yet. <router-link to="/admin/content/new">Add one</router-link>.
        </div>
        <ul v-else class="recent-list">
          <li v-for="c in recent" :key="c.id" class="recent-item">
            <img :src="c.image" :alt="c.title" />
            <div class="ri-info">
              <p>{{ c.title }}</p>
              <small>
                <span :class="['tag', c.type === 'Series' ? 'is-series' : 'is-movie']">{{ c.type }}</span>
                {{ c.year }} • {{ c.genre }}
              </small>
            </div>
            <router-link :to="`/admin/content/${c.id}/edit`" class="ri-edit">
              <Edit3 :size="14" />
            </router-link>
          </li>
        </ul>
      </section>
    </div>

    <section class="panel">
      <h2 class="panel-title"><Tags :size="18" /> Genres in Library</h2>
      <div class="genre-chips">
        <span v-for="g in stats.genres" :key="g" class="genre-chip">{{ g }}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  Plus, Film, Tv, Library, Settings, Zap, Clock, Edit3, Tags,
  Clapperboard, ListVideo, Layers,
} from "lucide-vue-next";
import { useContentStore } from "@/stores/contentStore.js";

const { stats, allContent } = useContentStore();

const statCards = computed(() => [
  { label: "Movies", value: stats.value.totalMovies, icon: Film, bg: "linear-gradient(135deg,#10b981,#059669)" },
  { label: "Series", value: stats.value.totalSeries, icon: Tv, bg: "linear-gradient(135deg,#db2777,#be185d)" },
  { label: "Episodes", value: stats.value.totalEpisodes, icon: ListVideo, bg: "linear-gradient(135deg,#6366f1,#7c3aed)" },
  { label: "Multi-part", value: stats.value.totalParts, icon: Layers, bg: "linear-gradient(135deg,#f59e0b,#d97706)" },
  { label: "Total Content", value: stats.value.totalContent, icon: Clapperboard, bg: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
  { label: "Genres", value: stats.value.totalGenres, icon: Tags, bg: "linear-gradient(135deg,#06b6d4,#0891b2)" },
]);

const recent = computed(() => [...allContent.value].slice(0, 5));
</script>

<style scoped>
.dash-page { display: flex; flex-direction: column; gap: 26px; }
.page-head {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; flex-wrap: wrap;
}
.page-head h1 { color: #fff; font-size: 26px; font-weight: 800; }
.page-head p { color: #94a3b8; font-size: 13px; margin-top: 4px; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 11px 18px; color: #fff; font-size: 13px; font-weight: 700;
  text-decoration: none;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-radius: 11px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 14px;
}
.stat-card {
  display: flex; align-items: center; gap: 14px;
  padding: 18px;
  background: rgba(20, 27, 55, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 14px;
}
.stat-icon {
  display: flex; align-items: center; justify-content: center;
  width: 46px; height: 46px; flex-shrink: 0;
  color: #fff; border-radius: 12px;
}
.stat-value { color: #fff; font-size: 22px; font-weight: 800; }
.stat-label { color: #94a3b8; font-size: 11px; font-weight: 600; margin-top: 2px; }
.dash-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
}
.panel {
  padding: 22px;
  background: rgba(20, 27, 55, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 16px;
}
.panel-title {
  display: flex; align-items: center; gap: 8px;
  color: #fff; font-size: 15px; font-weight: 750; margin-bottom: 16px;
}
.panel-title svg { color: #a5b4fc; }
.quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.qa-card {
  display: flex; align-items: center; gap: 11px;
  padding: 13px; color: #e2e8f0; text-decoration: none;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 11px;
  transition: all 0.2s ease;
}
.qa-card:hover {
  color: #fff; background: rgba(99, 102, 241, 0.15);
  border-color: rgba(129, 140, 248, 0.4);
}
.qa-card svg { color: #a5b4fc; flex-shrink: 0; }
.qa-card p { font-size: 13px; font-weight: 700; }
.qa-card small { color: #94a3b8; font-size: 10.5px; }
.recent-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.recent-item {
  display: flex; align-items: center; gap: 11px; padding: 9px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.12); border-radius: 10px;
}
.recent-item img {
  width: 48px; height: 40px; object-fit: cover;
  border-radius: 7px; flex-shrink: 0;
}
.ri-info { flex: 1; min-width: 0; }
.ri-info p {
  color: #fff; font-size: 12.5px; font-weight: 650;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.ri-info small {
  display: flex; align-items: center; gap: 6px;
  color: #94a3b8; font-size: 10.5px; margin-top: 3px;
}
.tag { padding: 1px 6px; font-size: 9px; font-weight: 700; text-transform: uppercase; border-radius: 4px; }
.tag.is-movie { color: #a7f3d0; background: rgba(16, 185, 129, 0.18); }
.tag.is-series { color: #fbcfe8; background: rgba(219, 39, 119, 0.18); }
.ri-edit {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; color: #a5b4fc;
  background: rgba(99, 102, 241, 0.15); border-radius: 7px;
  text-decoration: none;
}
.ri-edit:hover { color: #fff; background: rgba(99, 102, 241, 0.3); }
.empty-recent {
  padding: 24px 12px; color: #94a3b8; font-size: 12.5px; text-align: center;
}
.empty-recent a { color: #a5b4fc; font-weight: 600; }
.genre-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.genre-chip {
  padding: 6px 12px; color: #c7d2fe; font-size: 12px; font-weight: 600;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.3); border-radius: 999px;
}
@media (max-width: 900px) {
  .dash-grid { grid-template-columns: 1fr; }
  .quick-actions { grid-template-columns: 1fr; }
}
</style>