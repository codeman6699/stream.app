<template>
  <div class="download-page">
    <button class="back-btn" @click="router.back()">
      <ArrowLeft :size="18" />
      Back
    </button>

    <div v-if="loading" class="not-found">
      <p>Loading content...</p>
    </div>

    <div v-else-if="!content" class="not-found">
      <AlertCircle :size="48" />
      <h2>Content not found</h2>
      <router-link to="/" class="btn-primary">Go Home</router-link>
    </div>

    <template v-else>
      <section class="dl-hero">
        <div class="dl-hero-bg">
          <img :src="content.image" alt="">
        </div>

        <div class="dl-hero-content">
          <div class="poster">
            <img :src="content.image" :alt="content.title">
          </div>

          <div class="dl-info">
            <span
              class="dl-type"
              :class="content.type === 'Series' ? 'is-series' : 'is-movie'"
            >
              {{ content.type }}
            </span>

            <h1>{{ content.title }}</h1>

            <div class="dl-meta">
              <span class="rating">★ {{ content.rating || "—" }}</span>
              <span class="dot"></span>
              <span>{{ content.year || "—" }}</span>
              <span class="dot"></span>
              <span>{{ content.quality }}</span>
              <span class="dot"></span>
              <span>{{ content.genre || "—" }}</span>
            </div>

            <p class="dl-desc">{{ content.info }}</p>

            <div class="dl-release">
              <Calendar :size="16" />
              <span>
                Released:
                <strong>{{ formatDate(content.released) }}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div class="dl-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="dl-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <component :is="tab.icon" :size="16" />
          {{ tab.label }}
        </button>
      </div>

      <section v-if="activeTab === 'download'" class="dl-panel">
        <h2><Download :size="20" /> Download Options</h2>

        <p class="panel-sub">
          These are the actual video files or URLs saved for this content.
        </p>

        <div v-if="downloadOptions.length" class="quality-grid">
          <div
            v-for="option in downloadOptions"
            :key="option.key"
            class="quality-card"
          >
            <div class="q-icon">
              <MonitorPlay :size="22" />
            </div>

            <div class="q-info">
              <h3>{{ option.label }}</h3>
              <p>{{ option.detail }}</p>
            </div>

            <a
              class="q-btn"
              :href="option.url"
              target="_blank"
              rel="noopener noreferrer"
              :download="option.downloadName"
            >
              <Download :size="14" />
              Open file
            </a>
          </div>
        </div>

        <div v-else class="empty-download">
          <AlertCircle :size="24" />
          <p>No downloadable video has been added for this content yet.</p>
        </div>

        <div class="dl-note">
          <Info :size="16" />
          <p>
            Only download content that you own or have permission to download.
            Link broken?
            <router-link to="/contact">Contact support</router-link>.
          </p>
        </div>
      </section>

      <section v-if="activeTab === 'share'" class="dl-panel">
        <h2><Share2 :size="20" /> Share This {{ content.type }}</h2>
        <p class="panel-sub">Share this title with friends.</p>

        <div class="share-grid">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.build(shareUrl, content.title)"
            target="_blank"
            rel="noopener noreferrer"
            class="share-card"
            :style="{ '--brand': social.color }"
          >
            <component :is="social.icon" :size="22" />
            <span>{{ social.name }}</span>
          </a>
        </div>

        <div class="copy-row">
          <input :value="shareUrl" readonly class="copy-input">
          <button class="copy-btn" @click="copy(shareUrl)">
            <Copy v-if="!copied" :size="16" />
            <Check v-else :size="16" />
            {{ copied ? "Copied!" : "Copy" }}
          </button>
        </div>
      </section>

      <section v-if="activeTab === 'embed'" class="dl-panel">
        <h2><Code2 :size="20" /> Embed & Developer Access</h2>
        <p class="panel-sub">Use this embed code on a website you control.</p>

        <div class="code-block">
          <div class="code-head">
            <span><Code2 :size="14" /> iframe embed</span>
            <button class="copy-mini" @click="copy(embedCode)">
              <Copy :size="13" /> Copy
            </button>
          </div>
          <pre><code>{{ embedCode }}</code></pre>
        </div>

        <div class="code-block">
          <div class="code-head">
            <span><Link2 :size="14" /> Direct link</span>
            <button class="copy-mini" @click="copy(directLink)">
              <Copy :size="13" /> Copy
            </button>
          </div>
          <pre><code>{{ directLink }}</code></pre>
        </div>
      </section>
    </template>

    <Transition name="toast">
      <div v-if="toast.show" class="toast">
        <CheckCircle2 :size="18" />
        <span>{{ toast.msg }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  ArrowLeft,
  Download,
  Share2,
  Code2,
  Calendar,
  Info,
  MonitorPlay,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Link2,
  MessageCircle,
  Send,
  Facebook,
  Twitter,
  Mail,
} from "lucide-vue-next";

import { getPublicContent } from "@/utils/adminContent.js";

const route = useRoute();
const router = useRouter();

const allContent = ref([]);
const loading = ref(true);
const activeTab = ref(
  ["download", "share", "embed"].includes(route.query.tab)
    ? route.query.tab
    : "download"
);

const content = computed(() => {
  const item = allContent.value.find(
    (entry) => Number(entry.id) === Number(route.params.id)
  );

  if (!item) return null;

  const expectedType = item.type === "Series" ? "series" : "movie";

  if (route.params.type !== expectedType) return null;

  return item;
});

const tabs = [
  { id: "download", label: "Download", icon: Download },
  { id: "share", label: "Share", icon: Share2 },
  { id: "embed", label: "Embed", icon: Code2 },
];

const downloadOptions = computed(() => {
  if (!content.value) return [];

  if (content.value.type === "Movie") {
    return [
      ...(content.value.videoUrl ? [{
        key: `movie-${content.value.id}`,
        label: `${content.value.quality || "Video"} Movie`,
        detail: "Uploaded movie video",
        url: content.value.videoUrl,
        downloadName: `${content.value.title}.mp4`,
      }] : []),
      ...(content.value.downloadBase ? [{
        key: `download-${content.value.id}`,
        label: "Authorized download",
        detail: "Administrator-provided download link",
        url: content.value.downloadBase,
        downloadName: "",
      }] : []),
    ];
  }

  return content.value.seasons.flatMap((season) =>
    season.episodes
      .filter((episode) => episode.videoUrl || episode.sourceUrl)
      .map((episode) => ({
        key: `${content.value.id}-${season.season}-${episode.ep}`,
        label: `Season ${season.season} • Episode ${episode.ep}`,
        detail: episode.title || "Series episode",
        url: episode.videoUrl || episode.sourceUrl,
        downloadName: `${content.value.title}-S${season.season}-E${episode.ep}.mp4`,
      }))
  );
});

const shareUrl = computed(() => (
  content.value
    ? `${window.location.origin}/watch/${content.value.id}`
    : ""
));

const directLink = computed(() => shareUrl.value);

const embedCode = computed(() => {
  if (!content.value) return "";

  const type = content.value.type === "Series" ? "series" : "movie";
  const src = `${window.location.origin}/embed/${type}/${content.value.id}`;

  return `<iframe src="${src}" width="100%" height="480" frameborder="0" allowfullscreen title="${content.value.title}"></iframe>`;
});

const socials = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "#25d366",
    build: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
  },
  {
    name: "Telegram",
    icon: Send,
    color: "#229ed9",
    build: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "#1877f2",
    build: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "X / Twitter",
    icon: Twitter,
    color: "#000000",
    build: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "Email",
    icon: Mail,
    color: "#64748b",
    build: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
];

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const copied = ref(false);
const toast = reactive({ show: false, msg: "" });
let toastTimer = null;
let copiedTimer = null;

async function copy(value) {
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    copied.value = true;
    showToast("Copied!");
    clearTimeout(copiedTimer);

    copiedTimer = window.setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch {
    showToast("Copy failed. Please copy the text manually.");
  }
}

function showToast(message) {
  toast.msg = message;
  toast.show = true;

  clearTimeout(toastTimer);

  toastTimer = window.setTimeout(() => {
    toast.show = false;
  }, 2200);
}

async function loadContent() {
  loading.value = true;

  try {
    allContent.value = await getPublicContent();
  } catch (error) {
    console.error("Unable to load download content:", error);
    allContent.value = [];
    showToast("Unable to load content from the server.");
  } finally {
    loading.value = false;
  }
}

watch(
  () => route.query.tab,
  (value) => {
    if (["download", "share", "embed"].includes(value)) {
      activeTab.value = value;
    }
  }
);

onMounted(loadContent);

onBeforeUnmount(() => {
  clearTimeout(toastTimer);
  clearTimeout(copiedTimer);
});
</script>