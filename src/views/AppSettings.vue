<template>
  <div class="app-settings-page">
    <!-- ================= PAGE HEADER ================= -->
    <div class="page-header">
      <div class="page-header-text">
        <h1>App Settings</h1>
        <p>Customize how Stream.Store works for you across all your devices.</p>
      </div>

      <button class="back-btn" @click="$router.back()">
        <ArrowLeft :size="16" />
        <span>Back</span>
      </button>
    </div>

    <!-- ================= LAYOUT ================= -->
    <div class="settings-layout">
      <!-- ============ SIDEBAR TABS ============ -->
      <aside class="settings-sidebar">
        <nav class="settings-tabs" role="tablist" aria-label="App settings sections">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="settings-tab"
            :class="{ active: activeTab === tab.id }"
            role="tab"
            :aria-selected="activeTab === tab.id"
            :aria-controls="`panel-${tab.id}`"
            :id="`tab-${tab.id}`"
            @click="activeTab = tab.id"
          >
            <component :is="tab.icon" :size="17" />
            <span>{{ tab.label }}</span>
            <ChevronRight :size="14" class="tab-arrow" aria-hidden="true" />
          </button>
        </nav>

        <div class="sidebar-card">
          <p class="sidebar-card-title">App Info</p>
          <div class="status-row">
            <span class="status-dot ok"></span>
            <span>Version {{ app.version }}</span>
          </div>
          <div class="status-row">
            <span class="status-dot ok"></span>
            <span>{{ app.platform }}</span>
          </div>
          <div class="status-row">
            <span class="status-dot ok"></span>
            <span>Last updated {{ app.lastUpdate }}</span>
          </div>
        </div>
      </aside>

      <!-- ============ CONTENT PANELS ============ -->
      <section class="settings-content">
        <!-- ========== APPEARANCE ========== -->
        <div
          v-if="activeTab === 'appearance'"
          id="panel-appearance"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-appearance"
        >
          <div class="panel-header">
            <h2>Appearance</h2>
            <p>Personalize how Stream.Store looks.</p>
          </div>

          <!-- Theme picker -->
          <div class="form-field">
            <label>Theme</label>
            <div class="theme-grid" role="radiogroup" aria-label="Theme">
              <button
                v-for="t in themes"
                :key="t.value"
                class="theme-card"
                :class="{ active: appearance.theme === t.value }"
                role="radio"
                :aria-checked="appearance.theme === t.value"
                @click="appearance.theme = t.value"
              >
                <span class="theme-preview" :class="`theme-${t.value}`">
                  <span class="theme-bar"></span>
                  <span class="theme-bar short"></span>
                  <span class="theme-dot"></span>
                </span>
                <span class="theme-label">
                  <component :is="t.icon" :size="14" />
                  {{ t.label }}
                </span>
              </button>
            </div>
          </div>

          <!-- Accent color -->
          <div class="form-field">
            <label>Accent color</label>
            <div class="color-row" role="radiogroup" aria-label="Accent color">
              <button
                v-for="c in accentColors"
                :key="c.value"
                class="color-swatch"
                :class="{ active: appearance.accent === c.value }"
                :style="{ background: c.value }"
                :aria-label="c.name"
                :aria-checked="appearance.accent === c.value"
                role="radio"
                @click="appearance.accent = c.value"
              >
                <Check v-if="appearance.accent === c.value" :size="14" />
              </button>
            </div>
          </div>

          <div class="divider"></div>

          <div class="settings-row">
            <div>
              <h3>Reduce motion</h3>
              <p>Minimize animations throughout the app.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: appearance.reduceMotion }"
              @click="appearance.reduceMotion = !appearance.reduceMotion"
              :aria-pressed="appearance.reduceMotion"
              aria-label="Toggle reduce motion"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Compact layout</h3>
              <p>Show more items per row on large screens.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: appearance.compact }"
              @click="appearance.compact = !appearance.compact"
              :aria-pressed="appearance.compact"
              aria-label="Toggle compact layout"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Show subtitles by default</h3>
              <p>Auto-enable subtitles when playback starts.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: appearance.subtitles }"
              @click="appearance.subtitles = !appearance.subtitles"
              :aria-pressed="appearance.subtitles"
              aria-label="Toggle subtitles"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>
        </div>

        <!-- ========== PLAYBACK ========== -->
        <div
          v-if="activeTab === 'playback'"
          id="panel-playback"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-playback"
        >
          <div class="panel-header">
            <h2>Playback</h2>
            <p>Control how videos stream and play.</p>
          </div>

          <!-- Video quality -->
          <div class="form-field">
            <label>Video quality</label>
            <div class="radio-group" role="radiogroup" aria-label="Video quality">
              <label
                v-for="q in qualityOptions"
                :key="q.value"
                class="radio-pill"
                :class="{ active: playback.quality === q.value }"
              >
                <input
                  type="radio"
                  :value="q.value"
                  v-model="playback.quality"
                  hidden
                />
                <component :is="q.icon" :size="14" />
                <span>{{ q.label }}</span>
              </label>
            </div>
            <p class="field-hint">
              <Wifi :size="12" /> Auto adapts to your connection speed.
            </p>
          </div>

          <!-- Audio -->
          <div class="form-field">
            <label for="audio-lang">Preferred audio language</label>
            <select id="audio-lang" v-model="playback.audioLanguage">
              <option value="en">English</option>
              <option value="rw">Kinyarwanda</option>
              <option value="fr">Français</option>
              <option value="sw">Kiswahili</option>
              <option value="original">Original audio</option>
            </select>
          </div>

          <!-- Subtitle language -->
          <div class="form-field">
            <label for="sub-lang">Preferred subtitle language</label>
            <select id="sub-lang" v-model="playback.subtitleLanguage">
              <option value="none">None</option>
              <option value="en">English</option>
              <option value="rw">Kinyarwanda</option>
              <option value="fr">Français</option>
              <option value="sw">Kiswahili</option>
            </select>
          </div>

          <div class="divider"></div>

          <div class="settings-row">
            <div>
              <h3>Autoplay next episode</h3>
              <p>Start the next episode automatically after one ends.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: playback.autoplay }"
              @click="playback.autoplay = !playback.autoplay"
              :aria-pressed="playback.autoplay"
              aria-label="Toggle autoplay next episode"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Autoplay previews</h3>
              <p>Play trailers while browsing.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: playback.autoplayPreviews }"
              @click="playback.autoplayPreviews = !playback.autoplayPreviews"
              :aria-pressed="playback.autoplayPreviews"
              aria-label="Toggle autoplay previews"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Skip intro</h3>
              <p>Automatically skip intros when available.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: playback.skipIntro }"
              @click="playback.skipIntro = !playback.skipIntro"
              :aria-pressed="playback.skipIntro"
              aria-label="Toggle skip intro"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="divider"></div>

          <!-- Playback speed -->
          <div class="form-field">
            <label>Default playback speed</label>
            <div class="speed-row" role="radiogroup" aria-label="Playback speed">
              <button
                v-for="s in speeds"
                :key="s"
                class="speed-chip"
                :class="{ active: playback.speed === s }"
                role="radio"
                :aria-checked="playback.speed === s"
                @click="playback.speed = s"
              >
                {{ s }}×
              </button>
            </div>
          </div>
        </div>

        <!-- ========== LANGUAGE ========== -->
        <div
          v-if="activeTab === 'language'"
          id="panel-language"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-language"
        >
          <div class="panel-header">
            <h2>Language &amp; Region</h2>
            <p>Choose your interface language and region.</p>
          </div>

          <div class="form-field">
            <label for="ui-lang">App language</label>
            <select id="ui-lang" v-model="language.ui">
              <option value="en">English</option>
              <option value="rw">Kinyarwanda</option>
              <option value="fr">Français</option>
              <option value="sw">Kiswahili</option>
            </select>
          </div>

          <div class="form-field">
            <label for="region">Region</label>
            <select id="region" v-model="language.region">
              <option value="rw">Rwanda</option>
              <option value="ug">Uganda</option>
              <option value="ke">Kenya</option>
              <option value="tz">Tanzania</option>
              <option value="bi">Burundi</option>
              <option value="cd">DR Congo</option>
              <option value="other">Other</option>
            </select>
            <p class="field-hint">
              <Globe :size="12" /> Region affects available content and release dates.
            </p>
          </div>

          <div class="form-field">
            <label for="time-format">Time format</label>
            <select id="time-format" v-model="language.timeFormat">
              <option value="12">12-hour (1:30 PM)</option>
              <option value="24">24-hour (13:30)</option>
            </select>
          </div>

          <div class="form-field">
            <label for="date-format">Date format</label>
            <select id="date-format" v-model="language.dateFormat">
              <option value="dmy">DD/MM/YYYY</option>
              <option value="mdy">MM/DD/YYYY</option>
              <option value="ymd">YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        <!-- ========== DATA USAGE ========== -->
        <div
          v-if="activeTab === 'data'"
          id="panel-data"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-data"
        >
          <div class="panel-header">
            <h2>Data Usage</h2>
            <p>Control downloads and streaming data.</p>
          </div>

          <div class="settings-row">
            <div>
              <h3>Stream only on Wi-Fi</h3>
              <p>Save mobile data by streaming only on Wi-Fi.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: dataUsage.wifiOnly }"
              @click="dataUsage.wifiOnly = !dataUsage.wifiOnly"
              :aria-pressed="dataUsage.wifiOnly"
              aria-label="Toggle stream on Wi-Fi only"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Download on Wi-Fi only</h3>
              <p>Prevent downloads from using mobile data.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: dataUsage.downloadWifiOnly }"
              @click="dataUsage.downloadWifiOnly = !dataUsage.downloadWifiOnly"
              :aria-pressed="dataUsage.downloadWifiOnly"
              aria-label="Toggle download on Wi-Fi only"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="divider"></div>

          <div class="form-field">
            <label for="download-quality">Download quality</label>
            <select id="download-quality" v-model="dataUsage.downloadQuality">
              <option value="standard">Standard (uses less storage)</option>
              <option value="high">High (recommended)</option>
              <option value="4k">4K Ultra HD (large files)</option>
            </select>
          </div>

          <!-- Storage usage -->
          <div class="storage-card">
            <div class="storage-head">
              <span class="storage-icon"><HardDrive :size="18" /></span>
              <div>
                <p class="storage-title">Storage used</p>
                <p class="storage-sub">{{ dataUsage.usedGB }} GB of {{ dataUsage.totalGB }} GB</p>
              </div>
              <button class="btn-ghost" @click="clearCache">
                <Trash2 :size="14" />
                Clear cache
              </button>
            </div>
            <div class="storage-bar">
              <div
                class="storage-fill"
                :style="{ width: storagePercent + '%' }"
              ></div>
            </div>
            <p class="storage-hint">
              {{ dataUsage.downloads }} downloads · {{ dataUsage.cacheMB }} MB cache
            </p>
          </div>
        </div>

        <!-- ========== ACCESSIBILITY ========== -->
        <div
          v-if="activeTab === 'accessibility'"
          id="panel-accessibility"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-accessibility"
        >
          <div class="panel-header">
            <h2>Accessibility</h2>
            <p>Make Stream.Store easier to use.</p>
          </div>

          <div class="settings-row">
            <div>
              <h3>High contrast</h3>
              <p>Increase contrast for better readability.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: accessibility.highContrast }"
              @click="accessibility.highContrast = !accessibility.highContrast"
              :aria-pressed="accessibility.highContrast"
              aria-label="Toggle high contrast"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Larger text</h3>
              <p>Increase the base font size across the app.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: accessibility.largerText }"
              @click="accessibility.largerText = !accessibility.largerText"
              :aria-pressed="accessibility.largerText"
              aria-label="Toggle larger text"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Screen reader hints</h3>
              <p>Add extra descriptions for assistive tech.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: accessibility.screenReaderHints }"
              @click="accessibility.screenReaderHints = !accessibility.screenReaderHints"
              :aria-pressed="accessibility.screenReaderHints"
              aria-label="Toggle screen reader hints"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Keyboard shortcuts</h3>
              <p>Enable hotkeys like <kbd>/</kbd> to focus search.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: accessibility.keyboardShortcuts }"
              @click="accessibility.keyboardShortcuts = !accessibility.keyboardShortcuts"
              :aria-pressed="accessibility.keyboardShortcuts"
              aria-label="Toggle keyboard shortcuts"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="divider"></div>

          <div class="form-field">
            <label for="text-size">Text size</label>
            <div class="slider-wrap">
              <span class="slider-label">A</span>
              <input
                id="text-size"
                type="range"
                min="80"
                max="140"
                step="10"
                v-model.number="accessibility.textSize"
              />
              <span class="slider-label large">A</span>
              <span class="slider-value">{{ accessibility.textSize }}%</span>
            </div>
          </div>
        </div>

        <!-- ========== ABOUT ========== -->
        <div
          v-if="activeTab === 'about'"
          id="panel-about"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-about"
        >
          <div class="panel-header">
            <h2>About App</h2>
            <p>Version info and support links.</p>
          </div>

          <div class="about-card">
            <div class="about-logo">
              <Clapperboard :size="28" :stroke-width="2.2" />
            </div>
            <div class="about-info">
              <h3>Stream.Store</h3>
              <p>Version {{ app.version }} · {{ app.platform }}</p>
              <p class="about-tagline">Agasobanuye movies &amp; series — free, forever.</p>
            </div>
          </div>

          <div class="about-links">
            <a class="about-link" href="/about" target="_self">
              <Info :size="16" />
              <span>About Stream.Store</span>
              <ChevronRight :size="14" class="link-arrow" />
            </a>
            <a class="about-link" href="/terms" target="_self">
              <FileText :size="16" />
              <span>Terms of Service</span>
              <ChevronRight :size="14" class="link-arrow" />
            </a>
            <a class="about-link" href="/privacy" target="_self">
              <Shield :size="16" />
              <span>Privacy Policy</span>
              <ChevronRight :size="14" class="link-arrow" />
            </a>
            <a class="about-link" href="/howwork" target="_self">
              <HelpCircle :size="16" />
              <span>How It Works</span>
              <ChevronRight :size="14" class="link-arrow" />
            </a>
            <a class="about-link" href="/contact" target="_self">
              <Mail :size="16" />
              <span>Contact Support</span>
              <ChevronRight :size="14" class="link-arrow" />
            </a>
          </div>

          <div class="divider"></div>

          <div class="settings-row">
            <div>
              <h3>Auto-update</h3>
              <p>Keep the app up to date automatically.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: about.autoUpdate }"
              @click="about.autoUpdate = !about.autoUpdate"
              :aria-pressed="about.autoUpdate"
              aria-label="Toggle auto-update"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="form-actions">
            <button class="btn-ghost" @click="checkUpdates">
              <RefreshCw :size="14" :class="{ spin: checkingUpdate }" />
              {{ checkingUpdate ? "Checking..." : "Check for updates" }}
            </button>
          </div>
        </div>

        <!-- ========== RESET ========== -->
        <div class="settings-panel reset-panel">
          <div class="reset-info">
            <span class="reset-icon"><RotateCcw :size="18" /></span>
            <div>
              <h3>Reset all settings</h3>
              <p>Restore every option on this page to its default value.</p>
            </div>
          </div>
          <button class="btn-outline-danger" @click="showResetModal = true">
            Reset defaults
          </button>
        </div>
      </section>
    </div>

    <!-- ================= TOAST ================= -->
    <Transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <CheckCircle2 v-if="toast.type === 'success'" :size="18" />
        <AlertCircle v-else-if="toast.type === 'error'" :size="18" />
        <Info v-else :size="18" />
        <span>{{ toast.message }}</span>
      </div>
    </Transition>

    <!-- ================= RESET MODAL ================= -->
    <Transition name="fade">
      <div v-if="showResetModal" class="modal-backdrop" @click.self="showResetModal = false">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="reset-title">
          <div class="modal-icon warn">
            <RotateCcw :size="24" />
          </div>
          <h3 id="reset-title">Reset all settings?</h3>
          <p>This will restore every app setting to its default value. Your account and watch history won't be affected.</p>
          <div class="modal-actions">
            <button class="btn-ghost" @click="showResetModal = false">Cancel</button>
            <button class="btn-danger" @click="resetAllSettings">Reset defaults</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  Palette, PlayCircle, Globe, HardDrive, Accessibility, Info,
  ArrowLeft, ChevronRight, Check, Wifi, Sun, Moon, Monitor,
  Sparkles, Film, Smartphone, Trash2, RotateCcw, RefreshCw,
  CheckCircle2, AlertCircle, FileText, Shield, HelpCircle, Mail,
  Clapperboard
} from "lucide-vue-next";

/* ---------- TABS ---------- */
const tabs = [
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "playback", label: "Playback", icon: PlayCircle },
  { id: "language", label: "Language", icon: Globe },
  { id: "data", label: "Data Usage", icon: HardDrive },
  { id: "accessibility", label: "Accessibility", icon: Accessibility },
  { id: "about", label: "About", icon: Info },
];
const activeTab = ref("appearance");

/* ---------- APP META ---------- */
const app = reactive({
  version: "2.4.1",
  platform: "Web",
  lastUpdate: "Oct 2024",
});

/* ---------- APPEARANCE ---------- */
const appearance = reactive({
  theme: "dark",
  accent: "#6366f1",
  reduceMotion: false,
  compact: false,
  subtitles: true,
});

const themes = [
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
  { value: "auto", label: "Auto", icon: Monitor },
];

const accentColors = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#f43f5e" },
];

/* ---------- PLAYBACK ---------- */
const playback = reactive({
  quality: "auto",
  audioLanguage: "original",
  subtitleLanguage: "en",
  autoplay: true,
  autoplayPreviews: false,
  skipIntro: true,
  speed: 1,
});

const qualityOptions = [
  { value: "auto", label: "Auto", icon: Sparkles },
  { value: "4k", label: "4K Ultra HD", icon: Monitor },
  { value: "hd", label: "HD", icon: Film },
  { value: "sd", label: "SD (save data)", icon: Smartphone },
];

const speeds = [0.75, 1, 1.25, 1.5, 2];

/* ---------- LANGUAGE ---------- */
const language = reactive({
  ui: "en",
  region: "rw",
  timeFormat: "24",
  dateFormat: "dmy",
});

/* ---------- DATA USAGE ---------- */
const dataUsage = reactive({
  wifiOnly: false,
  downloadWifiOnly: true,
  downloadQuality: "high",
  usedGB: 6.4,
  totalGB: 32,
  downloads: 12,
  cacheMB: 480,
});

const storagePercent = computed(() =>
  Math.min(100, Math.round((dataUsage.usedGB / dataUsage.totalGB) * 100))
);

/* ---------- ACCESSIBILITY ---------- */
const accessibility = reactive({
  highContrast: false,
  largerText: false,
  screenReaderHints: false,
  keyboardShortcuts: true,
  textSize: 100,
});

/* ---------- ABOUT ---------- */
const about = reactive({
  autoUpdate: true,
});

const checkingUpdate = ref(false);

/* ---------- MODAL / TOAST ---------- */
const showResetModal = ref(false);
const toast = reactive({ show: false, message: "", type: "success" });
let toastTimer = null;

function showToast(message, type = "success") {
  toast.show = true;
  toast.message = message;
  toast.type = type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.show = false), 2800);
}

/* ---------- ACTIONS ---------- */
function clearCache() {
  dataUsage.cacheMB = 0;
  showToast("Cache cleared.", "success");
}

function checkUpdates() {
  checkingUpdate.value = true;
  setTimeout(() => {
    checkingUpdate.value = false;
    showToast("You're on the latest version.", "success");
  }, 1200);
}

function resetAllSettings() {
  appearance.theme = "dark";
  appearance.accent = "#6366f1";
  appearance.reduceMotion = false;
  appearance.compact = false;
  appearance.subtitles = true;

  playback.quality = "auto";
  playback.audioLanguage = "original";
  playback.subtitleLanguage = "en";
  playback.autoplay = true;
  playback.autoplayPreviews = false;
  playback.skipIntro = true;
  playback.speed = 1;

  language.ui = "en";
  language.region = "rw";
  language.timeFormat = "24";
  language.dateFormat = "dmy";

  dataUsage.wifiOnly = false;
  dataUsage.downloadWifiOnly = true;
  dataUsage.downloadQuality = "high";

  accessibility.highContrast = false;
  accessibility.largerText = false;
  accessibility.screenReaderHints = false;
  accessibility.keyboardShortcuts = true;
  accessibility.textSize = 100;

  about.autoUpdate = true;

  showResetModal.value = false;
  showToast("All settings reset to defaults.", "success");
}
</script>

<style scoped>
/* ================= LAYOUT ================= */
.app-settings-page {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 0 60px;
  color: #f8fafc;
}

/* ================= PAGE HEADER ================= */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.page-header-text h1 {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  letter-spacing: -0.6px;
  color: #ffffff;
}

.page-header-text p {
  margin-top: 6px;
  color: #94a3b8;
  font-size: 14px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 11px;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.back-btn:hover {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(129, 140, 248, 0.55);
}

/* ================= LAYOUT GRID ================= */
.settings-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 28px;
  align-items: start;
}

/* ================= SIDEBAR ================= */
.settings-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 100px;
}

.settings-tabs {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: rgba(20, 27, 55, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}

.settings-tab {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 11px 12px;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 10px;
  transition: background 0.2s ease, color 0.2s ease;
}

.settings-tab:hover {
  color: #ffffff;
  background: rgba(129, 140, 248, 0.12);
}

.settings-tab.active {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  box-shadow: 0 5px 18px rgba(99, 102, 241, 0.3);
}

.settings-tab svg {
  flex-shrink: 0;
  color: #a5b4fc;
}

.settings-tab.active svg {
  color: #ffffff;
}

.tab-arrow {
  margin-left: auto;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.settings-tab.active .tab-arrow,
.settings-tab:hover .tab-arrow {
  opacity: 1;
}

.settings-tab.active .tab-arrow {
  transform: translateX(2px);
}

/* Sidebar card */
.sidebar-card {
  padding: 16px;
  background: rgba(20, 27, 55, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.sidebar-card-title {
  margin-bottom: 12px;
  color: #94a3b8;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px 0;
  color: #cbd5e1;
  font-size: 12px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.ok {
  background: #34d399;
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.6);
}

/* ================= CONTENT ================= */
.settings-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-panel {
  padding: 28px;
  background: rgba(20, 27, 55, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  animation: panelIn 0.3s ease-out;
}

@keyframes panelIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.panel-header {
  margin-bottom: 24px;
}

.panel-header h2 {
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.4px;
  color: #ffffff;
}

.panel-header p {
  margin-top: 5px;
  color: #94a3b8;
  font-size: 13px;
}

/* ================= THEME PICKER ================= */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
}

.theme-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(148, 163, 184, 0.2);
  border-radius: 14px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
}

.theme-card:hover {
  border-color: rgba(129, 140, 248, 0.55);
  transform: translateY(-2px);
}

.theme-card.active {
  border-color: #818cf8;
  background: rgba(99, 102, 241, 0.12);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.18);
}

.theme-preview {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 70px;
  padding: 10px;
  border-radius: 9px;
  overflow: hidden;
}

.theme-preview.theme-dark {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border: 1px solid rgba(148, 163, 184, 0.25);
}

.theme-preview.theme-light {
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  border: 1px solid rgba(148, 163, 184, 0.35);
}

.theme-preview.theme-auto {
  background: linear-gradient(135deg, #0f172a 0%, #0f172a 50%, #f1f5f9 50%, #f1f5f9 100%);
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.theme-bar {
  height: 7px;
  width: 60%;
  border-radius: 3px;
  background: rgba(129, 140, 248, 0.7);
}

.theme-bar.short {
  width: 40%;
  background: rgba(148, 163, 184, 0.4);
}

.theme-dot {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #9333ea);
}

.theme-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
}

.theme-card.active .theme-label {
  color: #ffffff;
}

/* ================= ACCENT COLORS ================= */
.color-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}

.color-swatch {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid transparent;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.color-swatch:hover {
  transform: scale(1.1);
}

.color-swatch.active {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

/* ================= FORM ================= */
.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.form-field label {
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
}

.form-field input[type="text"],
.form-field input[type="number"],
.form-field select,
.form-field textarea {
  padding: 11px 13px;
  color: #ffffff;
  font-family: inherit;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 11px;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  background: rgba(255, 255, 255, 0.07);
  border-color: #818cf8;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

.form-field select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 13px center;
  padding-right: 34px;
}

.form-field option {
  color: #0f172a;
  background: #f8fafc;
}

.field-hint {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #64748b;
  font-size: 11px;
}

/* ================= RADIO PILLS ================= */
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.radio-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 14px;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.radio-pill:hover {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(129, 140, 248, 0.5);
}

.radio-pill.active {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-color: rgba(167, 139, 250, 0.6);
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
}

.radio-pill svg {
  color: #a5b4fc;
}

.radio-pill.active svg {
  color: #ffffff;
}

/* ================= SPEED CHIPS ================= */
.speed-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.speed-chip {
  min-width: 52px;
  padding: 9px 14px;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 9px;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.speed-chip:hover {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(129, 140, 248, 0.5);
}

.speed-chip.active {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-color: rgba(167, 139, 250, 0.6);
}

/* ================= SETTINGS ROW ================= */
.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.settings-row:last-child {
  border-bottom: none;
}

.settings-row h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 650;
}

.settings-row p {
  margin-top: 4px;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.5;
}

.settings-row kbd {
  padding: 1px 6px;
  color: #cbd5e1;
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  background: rgba(148, 163, 184, 0.15);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 5px;
}

/* ================= DIVIDER ================= */
.divider {
  height: 1px;
  margin: 20px 0;
  background: rgba(148, 163, 184, 0.15);
}

/* ================= TOGGLE ================= */
.toggle-switch {
  position: relative;
  width: 46px;
  height: 26px;
  flex-shrink: 0;
  padding: 0;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.25);
  border: 1px solid rgba(148, 163, 184, 0.3);
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.toggle-switch.on {
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-color: rgba(167, 139, 250, 0.6);
  box-shadow: 0 0 14px rgba(99, 102, 241, 0.4);
}

.toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-switch.on .toggle-knob {
  transform: translateX(20px);
}

/* ================= STORAGE CARD ================= */
.storage-card {
  margin-top: 8px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 14px;
}

.storage-head {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.storage-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.15);
  border-radius: 10px;
  flex-shrink: 0;
}

.storage-title {
  color: #ffffff;
  font-size: 13px;
  font-weight: 650;
}

.storage-sub {
  color: #94a3b8;
  font-size: 11px;
  margin-top: 2px;
}

.storage-head .btn-ghost {
  margin-left: auto;
}

.storage-bar {
  height: 8px;
  margin-top: 14px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.15);
  overflow: hidden;
}

.storage-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #6366f1, #c084fc);
  transition: width 0.4s ease;
}

.storage-hint {
  margin-top: 10px;
  color: #64748b;
  font-size: 11px;
}

/* ================= SLIDER ================= */
.slider-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider-label {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 700;
}

.slider-label.large {
  font-size: 16px;
}

.slider-value {
  margin-left: auto;
  min-width: 44px;
  text-align: right;
  color: #a5b4fc;
  font-size: 12px;
  font-weight: 700;
}

input[type="range"] {
  flex: 1;
  height: 6px;
  appearance: none;
  background: rgba(148, 163, 184, 0.2);
  border-radius: 999px;
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.5);
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.5);
  cursor: pointer;
}

/* ================= ABOUT ================= */
.about-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(147, 51, 234, 0.14));
  border: 1px solid rgba(129, 140, 248, 0.28);
  border-radius: 16px;
  margin-bottom: 20px;
}

.about-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  color: #a5b4fc;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 16px;
  flex-shrink: 0;
}

.about-info h3 {
  color: #ffffff;
  font-size: 16px;
  font-weight: 750;
}

.about-info p {
  color: #cbd5e1;
  font-size: 12px;
  margin-top: 2px;
}

.about-tagline {
  color: #94a3b8 !important;
  font-style: italic;
}

.about-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.about-link {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px 14px;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 11px;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.about-link:hover {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(129, 140, 248, 0.5);
  transform: translateX(3px);
}

.about-link svg {
  color: #a5b4fc;
  flex-shrink: 0;
}

.link-arrow {
  margin-left: auto;
  color: #64748b !important;
}

.about-link:hover .link-arrow {
  color: #ffffff !important;
}

/* ================= RESET PANEL ================= */
.reset-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  border-color: rgba(239, 68, 68, 0.25);
  background: rgba(239, 68, 68, 0.04);
}

.reset-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.reset-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.15);
  border-radius: 10px;
  flex-shrink: 0;
}

.reset-info h3 {
  color: #ffffff;
  font-size: 14px;
  font-weight: 650;
}

.reset-info p {
  color: #94a3b8;
  font-size: 12px;
  margin-top: 3px;
}

/* ================= BUTTONS ================= */
.btn-primary,
.btn-ghost,
.btn-danger,
.btn-outline-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
  white-space: nowrap;
  cursor: pointer;
}

.btn-ghost {
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(148, 163, 184, 0.2);
}

.btn-ghost:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(148, 163, 184, 0.35);
}

.btn-danger {
  color: #ffffff;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  box-shadow: 0 6px 18px rgba(220, 38, 38, 0.3);
}

.btn-danger:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(220, 38, 38, 0.45);
}

.btn-outline-danger {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.4);
}

.btn-outline-danger:hover {
  color: #ffffff;
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(239, 68, 68, 0.7);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 8px;
}

/* ================= TOAST ================= */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 18px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
}

.toast.success {
  background: rgba(16, 185, 129, 0.95);
  border: 1px solid rgba(52, 211, 153, 0.6);
}

.toast.error {
  background: rgba(239, 68, 68, 0.95);
  border: 1px solid rgba(248, 113, 113, 0.6);
}

.toast.info {
  background: rgba(59, 130, 246, 0.95);
  border: 1px solid rgba(96, 165, 250, 0.6);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* ================= MODAL ================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
}

.modal {
  width: 100%;
  max-width: 400px;
  padding: 26px;
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 18px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  animation: modalIn 0.25s ease-out;
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.94) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  margin-bottom: 14px;
  border-radius: 14px;
}

.modal-icon.warn {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.15);
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.modal h3 {
  color: #ffffff;
  font-size: 18px;
  font-weight: 750;
  margin-bottom: 8px;
}

.modal p {
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ================= SPINNER ================= */
.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ================= RESPONSIVE ================= */
@media (max-width: 900px) {
  .settings-layout {
    grid-template-columns: 1fr;
  }

  .settings-sidebar {
    position: static;
  }

  .settings-tabs {
    flex-direction: row;
    overflow-x: auto;
    padding: 6px;
    scrollbar-width: none;
  }

  .settings-tabs::-webkit-scrollbar {
    display: none;
  }

  .settings-tab {
    width: auto;
    flex-shrink: 0;
    padding: 10px 14px;
    white-space: nowrap;
  }

  .tab-arrow {
    display: none;
  }

  .sidebar-card {
    display: none;
  }
}

@media (max-width: 600px) {
  .app-settings-page {
    padding: 10px 0 40px;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .back-btn span {
    display: none;
  }

  .back-btn {
    padding: 10px;
  }

  .settings-panel {
    padding: 20px;
    border-radius: 16px;
  }

  .theme-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .settings-row {
    flex-wrap: wrap;
  }

  .settings-row > div {
    flex: 1 1 100%;
  }

  .storage-head {
    flex-wrap: wrap;
  }

  .storage-head .btn-ghost {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }

  .reset-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .reset-panel .btn-outline-danger {
    width: 100%;
  }

  .toast {
    bottom: 16px;
    left: 16px;
    right: 16px;
  }

  .modal-actions {
    flex-direction: column-reverse;
  }

  .modal-actions button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>