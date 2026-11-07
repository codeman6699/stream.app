<template>
  <div class="download-page">
    <button class="back-btn" @click="router.back()">
      <ArrowLeft :size="18" /> Back
    </button>

    <div v-if="!content" class="not-found">
      <AlertCircle :size="48" /><h2>Content not found</h2>
      <router-link to="/" class="btn-primary">Go Home</router-link>
    </div>

    <template v-else>
      <section class="dl-hero">
        <div class="dl-hero-bg"><img :src="content.image" alt="" /></div>
        <div class="dl-hero-content">
          <div class="poster"><img :src="content.image" :alt="content.title"></div>
          <div class="dl-info">
            <span class="dl-type" :class="content.type === 'Series' ? 'is-series' : 'is-movie'">{{ content.type }}</span>
            <h1>{{ content.title }}</h1>
            <div class="dl-meta">
              <span class="rating">★ {{ content.rating }}</span>
              <span class="dot"></span>
              <span>{{ content.year }}</span>
              <span class="dot"></span>
              <span>{{ content.quality }}</span>
              <span class="dot"></span>
              <span>{{ content.genre }}</span>
            </div>
            <p class="dl-desc">{{ content.info }}</p>
            <div class="dl-release">
              <Calendar :size="16" />
              <span>Released: <strong>{{ formatDate(content.released) }}</strong></span>
            </div>
          </div>
        </div>
      </section>

      <div class="dl-tabs">
        <button
          v-for="t in tabs" :key="t.id"
          class="dl-tab" :class="{ active: activeTab === t.id }"
          @click="activeTab = t.id"
        >
          <component :is="t.icon" :size="16" />{{ t.label }}
        </button>
      </div>

      <section v-if="activeTab === 'download'" class="dl-panel">
        <h2><Download :size="20" /> Download Options</h2>
        <p class="panel-sub">Choose your quality. Files hosted on third-party servers.</p>
        <div class="quality-grid">
          <div v-for="q in qualityOptions" :key="q.label" class="quality-card">
            <div class="q-icon"><MonitorPlay :size="22" /></div>
            <div class="q-info"><h3>{{ q.label }}</h3><p>{{ q.size }}</p></div>
            <a class="q-btn" :href="q.url" target="_blank" rel="noopener noreferrer">
              <Download :size="14" /> Download
            </a>
          </div>
        </div>
        <div class="dl-note">
          <Info :size="16" />
          <p>Link broken? <router-link to="/contact">Contact support</router-link>.</p>
        </div>
      </section>

      <section v-if="activeTab === 'share'" class="dl-panel">
        <h2><Share2 :size="20" /> Share This {{ content.type }}</h2>
        <p class="panel-sub">Share with friends.</p>
        <div class="share-grid">
          <a
            v-for="s in socials" :key="s.name"
            :href="s.build(shareUrl, content.title)"
            target="_blank" rel="noopener noreferrer"
            class="share-card" :style="{ '--brand': s.color }"
          >
            <component :is="s.icon" :size="22" /><span>{{ s.name }}</span>
          </a>
        </div>
        <div class="copy-row">
          <input :value="shareUrl" readonly class="copy-input" />
          <button class="copy-btn" @click="copy(shareUrl)">
            <Copy v-if="!copied" :size="16" />
            <Check v-else :size="16" />
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
      </section>

      <section v-if="activeTab === 'embed'" class="dl-panel">
        <h2><Code2 :size="20" /> Embed & Developer Access</h2>
        <p class="panel-sub">Use this code on your site.</p>
        <div class="code-block">
          <div class="code-head">
            <span><Code2 :size="14" /> iframe embed</span>
            <button class="copy-mini" @click="copy(embedCode)"><Copy :size="13" /> Copy</button>
          </div>
          <pre><code>{{ embedCode }}</code></pre>
        </div>
        <div class="code-block">
          <div class="code-head">
            <span><Link2 :size="14" /> Direct link</span>
            <button class="copy-mini" @click="copy(directLink)"><Copy :size="13" /> Copy</button>
          </div>
          <pre><code>{{ directLink }}</code></pre>
        </div>
      </section>
    </template>

    <Transition name="toast">
      <div v-if="toast.show" class="toast"><CheckCircle2 :size="18" /><span>{{ toast.msg }}</span></div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft, Download, Share2, Code2, Calendar, Info, MonitorPlay,
  Copy, Check, CheckCircle2, AlertCircle, Link2,
  MessageCircle, Send, Facebook, Twitter, Mail,
} from "lucide-vue-next";
import { findById } from "@/data/content.js";

const route = useRoute();
const router = useRouter();
const activeTab = ref(route.query.tab || "download");

watch(() => route.query.tab, (t) => { if (t) activeTab.value = t; });

const tabs = [
  { id: "download", label: "Download", icon: Download },
  { id: "share", label: "Share", icon: Share2 },
  { id: "embed", label: "Embed", icon: Code2 },
];

const content = computed(() => {
  const id = Number(route.params.id);
  const item = findById(id);
  if (!item) return null;
  const expected = item.type === "Series" ? "series" : "movie";
  if (route.params.type !== expected) return null;
  return item;
});

const qualityOptions = computed(() => {
  if (!content.value) return [];
  const base = content.value.downloadBase || "";
  return [
    { label: "4K Ultra HD", size: "~2.8 GB", url: `${base}-4k.mp4`, quality: "4K" },
    { label: "1080p Full HD", size: "~1.4 GB", url: `${base}-1080p.mp4`, quality: "1080p" },
    { label: "720p HD", size: "~750 MB", url: `${base}-720p.mp4`, quality: "720p" },
    { label: "480p SD", size: "~380 MB", url: `${base}-480p.mp4`, quality: "480p" },
  ];
});

const shareUrl = computed(() => `${window.location.origin}/watch/${content.value?.id}`);

const socials = [
  { name: "WhatsApp", icon: MessageCircle, color: "#25d366",
    build: (url, title) => `https://wa.me/?text=${encodeURIComponent(title + " — " + url)}` },
  { name: "Telegram", icon: Send, color: "#229ed9",
    build: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { name: "Facebook", icon: Facebook, color: "#1877f2",
    build: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { name: "X / Twitter", icon: Twitter, color: "#000000",
    build: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { name: "Email", icon: Mail, color: "#64748b",
    build: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}` },
];

const directLink = computed(() => `${window.location.origin}/watch/${content.value?.id}`);
const embedCode = computed(() =>
  `<iframe src="${window.location.origin}/embed/${route.params.type}/${content.value?.id}" ` +
  `width="100%" height="480" frameborder="0" allowfullscreen ` +
  `title="${content.value?.title}"></iframe>`
);

function formatDate(d) {
  if (!d) return "—";
  const dt = new Date(d);
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const copied = ref(false);
const toast = reactive({ show: false, msg: "" });
let toastTimer = null;

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    showToast("Copied!");
    setTimeout(() => (copied.value = false), 1800);
  } catch { showToast("Copy failed"); }
}

function showToast(msg) {
  toast.msg = msg;
  toast.show = true;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.show = false), 2200);
}
</script>

<style scoped>
.download-page {
  width: 100%; max-width: 1100px; margin: 0 auto;
  padding: 20px 0 60px; animation: fadeIn 0.35s ease-out;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.back-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 14px; margin-bottom: 20px;
  color: #cbd5e1; font-size: 13px; font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 10px;
}
.dl-hero {
  position: relative; overflow: hidden;
  margin-bottom: 26px; padding: 32px;
  background: linear-gradient(135deg, #141b35, #0d1224);
  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 22px;
}
.dl-hero-bg { position: absolute; inset: 0; opacity: 0.14; z-index: 0; }
.dl-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: blur(18px); }
.dl-hero-content {
  position: relative; z-index: 1;
  display: flex; gap: 28px; align-items: flex-end; flex-wrap: wrap;
}
.poster {
  width: 160px; height: 220px; border-radius: 14px;
  overflow: hidden; border: 1px solid rgba(129, 140, 248, 0.4);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}
.poster img { width: 100%; height: 100%; object-fit: cover; }
.dl-info { flex: 1; min-width: 240px; }
.dl-type {
  display: inline-flex; padding: 5px 11px; margin-bottom: 12px;
  font-size: 10px; font-weight: 750; letter-spacing: 1px;
  text-transform: uppercase; border-radius: 7px;
}
.dl-type.is-movie { color: #a7f3d0; background: rgba(16, 185, 129, 0.18); border: 1px solid rgba(52, 211, 153, 0.45); }
.dl-type.is-series { color: #fbcfe8; background: rgba(219, 39, 119, 0.18); border: 1px solid rgba(244, 114, 182, 0.45); }
.dl-info h1 {
  color: #fff; font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 850; letter-spacing: -1px; margin-bottom: 12px;
}
.dl-meta {
  display: flex; align-items: center; flex-wrap: wrap; gap: 10px;
  color: #cbd5e1; font-size: 13px; margin-bottom: 14px;
}
.rating { color: #fde68a; font-weight: 700; }
.dot { width: 4px; height: 4px; background: #64748b; border-radius: 50%; }
.dl-desc { color: #94a3b8; font-size: 14px; line-height: 1.7; margin-bottom: 14px; }
.dl-release {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 14px; color: #c7d2fe; font-size: 12px;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.25); border-radius: 10px;
}
.dl-release strong { color: #fff; }
.dl-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
.dl-tab {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px; color: #cbd5e1;
  font-size: 13px; font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 11px;
}
.dl-tab.active {
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-color: rgba(167, 139, 250, 0.5);
}
.dl-panel {
  padding: 28px;
  background: rgba(20, 27, 55, 0.72);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18px;
}
.dl-panel h2 {
  display: flex; align-items: center; gap: 10px;
  color: #fff; font-size: 18px; font-weight: 750; margin-bottom: 6px;
}
.panel-sub { color: #94a3b8; font-size: 13px; margin-bottom: 22px; }
.quality-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}
.quality-card {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 12px;
}
.q-icon {
  width: 42px; height: 42px; flex-shrink: 0;
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.15); border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.q-info { flex: 1; }
.q-info h3 { color: #fff; font-size: 13px; font-weight: 700; }
.q-info p { color: #94a3b8; font-size: 11px; }
.q-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; color: #fff; font-size: 12px; font-weight: 650;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: none; border-radius: 9px; text-decoration: none;
}
.dl-note {
  display: flex; align-items: flex-start; gap: 10px;
  margin-top: 22px; padding: 14px 16px;
  color: #94a3b8; font-size: 12.5px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(129, 140, 248, 0.2); border-radius: 11px;
}
.share-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px; margin-bottom: 22px;
}
.share-card {
  display: flex; align-items: center; justify-content: center; gap: 9px;
  padding: 14px; color: #e2e8f0;
  font-size: 13px; font-weight: 600; text-decoration: none;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px;
}
.share-card:hover {
  color: #fff; background: var(--brand, #6366f1);
  border-color: var(--brand, #6366f1);
}
.copy-row {
  display: flex; gap: 8px; padding: 8px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 11px;
}
.copy-input {
  flex: 1; min-width: 0; padding: 8px 10px;
  color: #e2e8f0; font-family: monospace; font-size: 12px;
  background: transparent; border: none; outline: none;
}
.copy-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 14px; color: #fff; font-size: 12px; font-weight: 650;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: none; border-radius: 8px;
}
.code-block {
  margin-bottom: 16px;
  background: #0a0614;
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: 12px; overflow: hidden;
}
.code-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; background: rgba(30, 27, 60, 0.8);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
}
.code-head span {
  display: inline-flex; align-items: center; gap: 6px;
  color: #a5b4fc; font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.6px;
}
.copy-mini {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 9px; color: #c7d2fe;
  font-size: 11px; font-weight: 600;
  background: rgba(99, 102, 241, 0.18);
  border: 1px solid rgba(129, 140, 248, 0.4); border-radius: 7px;
}
.code-block pre { padding: 16px; overflow-x: auto; margin: 0; }
.code-block code {
  font-family: 'Courier New', monospace;
  font-size: 12px; line-height: 1.6; color: #c4b5fd;
  white-space: pre-wrap; word-break: break-word;
}
.not-found {
  display: flex; flex-direction: column; align-items: center;
  gap: 14px; padding: 80px 20px;
  text-align: center; color: #94a3b8;
}
.not-found h2 { color: #fff; font-size: 22px; }
.not-found svg { color: #f59e0b; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; color: #fff; font-weight: 700;
  text-decoration: none;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-radius: 11px;
}
.toast {
  position: fixed; bottom: 24px; right: 24px; z-index: 999;
  display: flex; align-items: center; gap: 10px;
  padding: 13px 18px; color: #fff;
  font-size: 13px; font-weight: 600;
  background: rgba(16, 185, 129, 0.95);
  border: 1px solid rgba(52, 211, 153, 0.6); border-radius: 12px;
}
.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px); }
@media (max-width: 650px) {
  .dl-hero { padding: 22px; }
  .dl-hero-content { flex-direction: column; align-items: flex-start; }
  .poster { width: 120px; height: 170px; }
  .dl-panel { padding: 20px; }
  .share-grid { grid-template-columns: 1fr 1fr; }
  .toast { left: 16px; right: 16px; bottom: 16px; }
}
</style>