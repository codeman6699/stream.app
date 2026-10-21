<template>
  <div class="get-app-page">
    <!-- Ambient Background -->
    <div class="ambient-glow"></div>

    <!-- ================= HERO ================= -->
    <section class="hero">
      <div class="hero-badge">
        <Sparkles :size="14" />
        <span>OFFICIAL APP</span>
      </div>

      <h1 class="hero-title">
        Stream.Store on <span class="gradient-text">every screen</span>.
      </h1>

      <p class="hero-subtitle">
        Download the app for faster streaming, offline downloads, and a
        distraction-free cinema experience — free, forever.
      </p>

      <div class="hero-actions">
        <button
          class="store-btn"
          @click="selectPlatform('android')"
          :class="{ active: platform === 'android' }"
        >
          <Smartphone :size="22" />
          <div class="store-btn-text">
            <span class="store-btn-label">Download for</span>
            <span class="store-btn-name">Android</span>
          </div>
        </button>

        <button
          class="store-btn"
          @click="selectPlatform('ios')"
          :class="{ active: platform === 'ios' }"
        >
          <Apple :size="22" />
          <div class="store-btn-text">
            <span class="store-btn-label">Download for</span>
            <span class="store-btn-name">iOS</span>
          </div>
        </button>

        <button
          class="store-btn"
          @click="selectPlatform('tv')"
          :class="{ active: platform === 'tv' }"
        >
          <Tv :size="22" />
          <div class="store-btn-text">
            <span class="store-btn-label">Install on</span>
            <span class="store-btn-name">Smart TV</span>
          </div>
        </button>
      </div>

      <div class="hero-meta">
        <span class="meta-pill">
          <Check :size="12" /> 100% Free
        </span>
        <span class="meta-pill">
          <Star :size="12" /> 4.8/5 rating
        </span>
        <span class="meta-pill">
          <Download :size="12" /> 500K+ downloads
        </span>
        <span class="meta-pill">
          <ShieldCheck :size="12" /> Virus-free
        </span>
      </div>
    </section>

    <!-- ================= PHONE MOCKUP + QR ================= -->
    <section class="showcase">
      <!-- Phone mockup -->
      <div class="phone-mockup" aria-hidden="true">
        <div class="phone-notch"></div>
        <div class="phone-screen">
          <div class="phone-header">
            <Clapperboard :size="18" class="phone-logo" />
            <span class="phone-title">Stream.Store</span>
          </div>

          <div class="phone-hero">
            <div class="phone-hero-shimmer"></div>
            <span class="phone-hero-play">
              <Play :size="20" fill="currentColor" />
            </span>
          </div>

          <div class="phone-row">
            <div class="phone-card"></div>
            <div class="phone-card"></div>
            <div class="phone-card"></div>
          </div>

          <div class="phone-row">
            <div class="phone-card small"></div>
            <div class="phone-card small"></div>
          </div>

          <div class="phone-tabbar">
            <House :size="14" />
            <Clapperboard :size="14" />
            <Bookmark :size="14" />
            <UserRound :size="14" />
          </div>
        </div>
      </div>

      <!-- QR + instructions -->
      <div class="qr-panel">
        <div class="qr-card">
          <div class="qr-svg" v-html="qrSvg"></div>
          <p class="qr-label">Scan to download</p>
        </div>

        <div class="qr-instructions">
          <h3>
            <QrCode :size="18" />
            Scan with your phone
          </h3>
          <ol>
            <li>Open the camera app on your phone.</li>
            <li>Point it at the QR code on the left.</li>
            <li>Tap the link that appears to install the app.</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ================= FEATURES ================= -->
    <section class="features">
      <div class="section-header">
        <h2>Why download the app?</h2>
        <p>Everything you love about Stream.Store — but faster and offline-ready.</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon"><Download :size="20" /></div>
          <h3>Offline downloads</h3>
          <p>Save movies and episodes to watch without internet — perfect for travel.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><Zap :size="20" /></div>
          <h3>Lightning fast</h3>
          <p>Native performance, instant search, and smooth playback at 60fps.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><Bell :size="20" /></div>
          <h3>Smart notifications</h3>
          <p>Get alerts the moment your favorite series drops a new episode.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><MonitorPlay :size="20" /></div>
          <h3>4K Ultra HD</h3>
          <p>Experience every frame in stunning clarity on supported devices.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><ShieldCheck :size="20" /></div>
          <h3>Safe & private</h3>
          <p>No ads, no trackers, no nonsense. Your data stays yours.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><Tv :size="20" /></div>
          <h3>Cast anywhere</h3>
          <p>Stream to Chromecast, Apple TV, or any smart TV in one tap.</p>
        </div>
      </div>
    </section>

    <!-- ================= PLATFORM MATRIX ================= -->
    <section class="platforms">
      <div class="section-header">
        <h2>Available on all your devices</h2>
        <p>Pick a platform to see the install requirements.</p>
      </div>

      <div class="platform-tabs" role="tablist">
        <button
          v-for="p in platforms"
          :key="p.id"
          class="platform-tab"
          :class="{ active: platform === p.id }"
          role="tab"
          :aria-selected="platform === p.id"
          @click="selectPlatform(p.id)"
        >
          <component :is="p.icon" :size="16" />
          <span>{{ p.label }}</span>
        </button>
      </div>

      <div class="platform-detail">
        <div class="platform-info">
          <div class="platform-info-icon">
            <component :is="currentPlatform.icon" :size="28" />
          </div>
          <div>
            <h3>{{ currentPlatform.label }}</h3>
            <p>{{ currentPlatform.description }}</p>
          </div>
        </div>

        <ul class="platform-reqs">
          <li v-for="(req, i) in currentPlatform.requirements" :key="i">
            <Check :size="14" />
            <span>{{ req }}</span>
          </li>
        </ul>

        <button class="btn-primary big" @click="downloadNow">
          <Download :size="16" />
          <span>Download for {{ currentPlatform.label }}</span>
        </button>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="faq">
      <div class="section-header">
        <h2>Frequently asked</h2>
        <p>Quick answers before you hit download.</p>
      </div>

      <div class="faq-list">
        <details
          v-for="(item, i) in faqs"
          :key="i"
          class="faq-item"
        >
          <summary>
            <span>{{ item.q }}</span>
            <ChevronDown :size="16" class="faq-chev" />
          </summary>
          <p>{{ item.a }}</p>
        </details>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="cta">
      <div class="cta-card">
        <div class="cta-text">
          <h2>Ready to start watching?</h2>
          <p>Join 500,000+ fans already using the Stream.Store app.</p>
        </div>
        <button class="btn-primary big" @click="downloadNow">
          <Download :size="18" />
          <span>Get the app free</span>
        </button>
      </div>
    </section>

    <!-- ================= TOAST ================= -->
    <Transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <CheckCircle2 v-if="toast.type === 'success'" :size="18" />
        <AlertCircle v-else-if="toast.type === 'error'" :size="18" />
        <Info v-else :size="18" />
        <span>{{ toast.message }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  Sparkles, Smartphone, Tv, Apple, Download, Check, Star,
  ShieldCheck, Clapperboard, Play, House, Bookmark, UserRound,
  QrCode, Zap, Bell, MonitorPlay, ChevronDown, CheckCircle2,
  AlertCircle, Info
} from "lucide-vue-next";

/* ---------- PLATFORMS ---------- */
const platforms = [
  {
    id: "android",
    label: "Android",
    icon: Smartphone,
    description: "Compatible with Android 8.0 and above. Direct APK download.",
    requirements: [
      "Android 8.0 (Oreo) or higher",
      "100 MB free storage",
      "Internet connection for first launch",
    ],
    link: "https://play.google.com/store/apps",
  },
  {
    id: "ios",
    label: "iOS",
    icon: Apple,
    description: "Available on iPhone and iPad via the App Store.",
    requirements: [
      "iOS 14.0 or higher",
      "150 MB free storage",
      "Apple ID signed in",
    ],
    link: "https://apps.apple.com",
  },
  {
    id: "tv",
    label: "Smart TV",
    icon: Tv,
    description: "Available on Android TV, Fire TV, and Samsung Tizen.",
    requirements: [
      "Android TV 9.0+ / Tizen 5.0+",
      "Wi-Fi or Ethernet",
      "Remote with navigation keys",
    ],
    link: "https://play.google.com/store/apps",
  },
  {
    id: "web",
    label: "Web App",
    icon: MonitorPlay,
    description: "Add Stream.Store to your home screen as a PWA — no install required.",
    requirements: [
      "Chrome, Edge, or Safari",
      "JavaScript enabled",
      "No install — instant access",
    ],
    link: "/",
  },
];

const platform = ref("android");

const currentPlatform = computed(() =>
  platforms.find((p) => p.id === platform.value) || platforms[0]
);

function selectPlatform(id) {
  platform.value = id;
  // Smooth scroll to the platform detail section
  const el = document.querySelector(".platforms");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- SIMULATED QR CODE ---------- */
// A lightweight SVG "QR-like" pattern — replace with a real QR generator
// (e.g. `qrcode` npm package) when wiring to a real download URL.
const qrSvg = `
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <rect width="120" height="120" fill="#ffffff"/>
  <rect x="6" y="6" width="24" height="24" fill="#0b1022"/>
  <rect x="10" y="10" width="16" height="16" fill="#ffffff"/>
  <rect x="14" y="14" width="8" height="8" fill="#0b1022"/>
  <rect x="90" y="6" width="24" height="24" fill="#0b1022"/>
  <rect x="94" y="10" width="16" height="16" fill="#ffffff"/>
  <rect x="98" y="14" width="8" height="8" fill="#0b1022"/>
  <rect x="6" y="90" width="24" height="24" fill="#0b1022"/>
  <rect x="10" y="94" width="16" height="16" fill="#ffffff"/>
  <rect x="14" y="98" width="8" height="8" fill="#0b1022"/>
  <g fill="#0b1022">
    <rect x="40" y="8" width="6" height="6"/><rect x="52" y="8" width="6" height="6"/>
    <rect x="64" y="8" width="6" height="6"/><rect x="76" y="8" width="6" height="6"/>
    <rect x="40" y="20" width="6" height="6"/><rect x="64" y="20" width="6" height="6"/>
    <rect x="76" y="20" width="6" height="6"/>
    <rect x="40" y="32" width="6" height="6"/><rect x="52" y="32" width="6" height="6"/>
    <rect x="64" y="32" width="6" height="6"/>
    <rect x="8" y="40" width="6" height="6"/><rect x="20" y="40" width="6" height="6"/>
    <rect x="32" y="40" width="6" height="6"/><rect x="44" y="40" width="6" height="6"/>
    <rect x="56" y="40" width="6" height="6"/><rect x="68" y="40" width="6" height="6"/>
    <rect x="80" y="40" width="6" height="6"/><rect x="92" y="40" width="6" height="6"/>
    <rect x="104" y="40" width="6" height="6"/>
    <rect x="14" y="52" width="6" height="6"/><rect x="32" y="52" width="6" height="6"/>
    <rect x="50" y="52" width="6" height="6"/><rect x="68" y="52" width="6" height="6"/>
    <rect x="86" y="52" width="6" height="6"/><rect x="104" y="52" width="6" height="6"/>
    <rect x="8" y="64" width="6" height="6"/><rect x="20" y="64" width="6" height="6"/>
    <rect x="38" y="64" width="6" height="6"/><rect x="56" y="64" width="6" height="6"/>
    <rect x="74" y="64" width="6" height="6"/><rect x="92" y="64" width="6" height="6"/>
    <rect x="104" y="64" width="6" height="6"/>
    <rect x="14" y="76" width="6" height="6"/><rect x="44" y="76" width="6" height="6"/>
    <rect x="62" y="76" width="6" height="6"/><rect x="80" y="76" width="6" height="6"/>
    <rect x="98" y="76" width="6" height="6"/>
    <rect x="40" y="88" width="6" height="6"/><rect x="58" y="88" width="6" height="6"/>
    <rect x="76" y="88" width="6" height="6"/><rect x="94" y="88" width="6" height="6"/>
    <rect x="40" y="100" width="6" height="6"/><rect x="52" y="100" width="6" height="6"/>
    <rect x="70" y="100" width="6" height="6"/><rect x="88" y="100" width="6" height="6"/>
    <rect x="104" y="100" width="6" height="6"/>
  </g>
</svg>
`;

/* ---------- FAQS ---------- */
const faqs = [
  {
    q: "Is the app really free?",
    a: "Yes — Stream.Store is 100% free forever. No subscriptions, no hidden fees, no credit card required. Just download and start watching.",
  },
  {
    q: "Do I need an account to use the app?",
    a: "You can browse anonymously, but creating a free account lets you save titles to My List, sync your watch history, and get personalized recommendations across devices.",
  },
  {
    q: "Can I watch offline?",
    a: "Yes! Download any movie or episode from the app and watch it without internet. Downloads are stored locally on your device and can be removed anytime.",
  },
  {
    q: "Which devices are supported?",
    a: "Android (8.0+), iOS (14+), Android TV, Fire TV, Samsung Tizen, and any modern browser via our progressive web app. Chromecast and Apple AirPlay are both supported.",
  },
  {
    q: "How much data does streaming use?",
    a: "Around 1 GB per hour in HD, or 3 GB per hour in 4K. You can lower the quality in Settings → Data Usage to save mobile data.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. We don't sell your data, don't show third-party ads, and encrypt all traffic. You can delete your account and all associated data at any time.",
  },
];

/* ---------- TOAST ---------- */
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
function downloadNow() {
  const p = currentPlatform.value;

  // Web app — no download, just navigate home as PWA prompt
  if (p.id === "web") {
    showToast("Add Stream.Store to your home screen for app-like access.", "info");
    return;
  }

  // Simulate opening the store / APK
  showToast(`Opening ${p.label} store…`, "success");

  // In production, replace this with:
  //   window.open(p.link, "_blank");
  // or trigger an APK download for Android.
  setTimeout(() => {
    // Comment out the line below when wiring a real store link
    // window.open(p.link, "_blank", "noopener,noreferrer");
  }, 600);
}
</script>

<style scoped>
/* ==========================================================================
   BASE
   ========================================================================== */

.get-app-page {
  --bg-base: #080b18;
  --bg-panel: rgba(20, 27, 55, 0.72);
  --bg-panel-hover: rgba(30, 40, 70, 0.8);
  --bg-input: rgba(255, 255, 255, 0.045);

  --text-main: #f8fafc;
  --text-muted: #94a3b8;

  --border-light: rgba(148, 163, 184, 0.2);
  --accent-color: #6366f1;
  --accent-glow: 0 0 24px rgba(99, 102, 241, 0.35);

  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 0 80px;
  color: var(--text-main);
  position: relative;
}

.ambient-glow {
  position: fixed;
  top: -20vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  height: 80vh;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 60%);
  opacity: 0.5;
  pointer-events: none;
  z-index: -1;
  filter: blur(100px);
}

/* ==========================================================================
   HERO
   ========================================================================== */

.hero {
  text-align: center;
  padding: 20px 0 60px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  padding: 6px 14px;
  color: #c7d2fe;
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 999px;
}

.hero-title {
  font-size: clamp(30px, 5vw, 52px);
  font-weight: 850;
  letter-spacing: -1.2px;
  line-height: 1.1;
  color: #ffffff;
  max-width: 780px;
  margin: 0 auto;
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  margin: 20px auto 0;
  max-width: 560px;
  color: var(--text-muted);
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 36px;
}

.store-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: var(--text-main);
  background: var(--bg-input);
  border: 1.5px solid var(--border-light);
  border-radius: 14px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.store-btn:hover {
  background: var(--bg-panel-hover);
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.store-btn.active {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(147, 51, 234, 0.25));
  border-color: #818cf8;
  box-shadow: var(--accent-glow);
}

.store-btn svg {
  color: #a5b4fc;
  flex-shrink: 0;
}

.store-btn.active svg {
  color: #ffffff;
}

.store-btn-text {
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 1.2;
}

.store-btn-label {
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.store-btn-name {
  color: var(--text-main);
  font-size: 15px;
  font-weight: 750;
}

.store-btn.active .store-btn-label {
  color: #c7d2fe;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 32px;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: 999px;
}

.meta-pill svg {
  color: #34d399;
}

/* ==========================================================================
   SHOWCASE (PHONE + QR)
   ========================================================================== */

.showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 60px 0;
}

/* Phone mockup */
.phone-mockup {
  position: relative;
  width: 260px;
  height: 520px;
  margin: 0 auto;
  padding: 14px;
  background: linear-gradient(135deg, #1a1f3a, #0b0f1e);
  border: 2px solid rgba(129, 140, 248, 0.35);
  border-radius: 40px;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.6),
    0 0 60px rgba(99, 102, 241, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.phone-notch {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 22px;
  background: #0b0f1e;
  border-radius: 0 0 14px 14px;
  z-index: 2;
}

.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 32px 14px 14px;
  background: radial-gradient(circle at 20% 0%, rgba(99, 102, 241, 0.15), transparent 50%), #0b1022;
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.phone-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 4px;
}

.phone-logo {
  color: #a5b4fc;
}

.phone-title {
  color: #ffffff;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: -0.3px;
}

.phone-hero {
  position: relative;
  height: 110px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-hero-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.phone-hero-play {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.35);
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  backdrop-filter: blur(8px);
}

.phone-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.phone-card {
  height: 60px;
  background: linear-gradient(135deg, rgba(129, 140, 248, 0.25), rgba(147, 51, 234, 0.25));
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 8px;
}

.phone-row:last-of-type .phone-card {
  grid-column: span 1;
}

.phone-card.small {
  height: 50px;
  grid-column: span 1.5;
}

.phone-row:last-of-type {
  grid-template-columns: 1fr 1fr;
}

.phone-tabbar {
  margin-top: auto;
  display: flex;
  justify-content: space-around;
  padding: 10px 6px;
  color: var(--text-muted);
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 12px;
}

/* QR panel */
.qr-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.qr-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: var(--bg-panel);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
}

.qr-svg {
  width: 160px;
  height: 160px;
  padding: 10px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.qr-svg svg {
  width: 100%;
  height: 100%;
  display: block;
}

.qr-label {
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.qr-instructions {
  padding: 20px 22px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: 16px;
}

.qr-instructions h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--text-main);
  font-size: 14px;
  font-weight: 700;
}

.qr-instructions h3 svg {
  color: #a5b4fc;
}

.qr-instructions ol {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 18px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.5;
}

.qr-instructions li::marker {
  color: #a5b4fc;
  font-weight: 700;
}

/* ==========================================================================
   SECTIONS
   ========================================================================== */

.section-header {
  text-align: center;
  margin-bottom: 36px;
}

.section-header h2 {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 800;
  letter-spacing: -0.6px;
  color: #ffffff;
}

.section-header p {
  margin-top: 8px;
  color: var(--text-muted);
  font-size: 14px;
}

/* FEATURES */
.features {
  padding: 40px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.feature-card {
  padding: 22px;
  background: var(--bg-panel);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  transition: all 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  border-color: rgba(129, 140, 248, 0.55);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3), var(--accent-glow);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 14px;
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 12px;
}

.feature-card h3 {
  margin-bottom: 6px;
  color: var(--text-main);
  font-size: 15px;
  font-weight: 700;
}

.feature-card p {
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
}

/* PLATFORMS */
.platforms {
  padding: 40px 0;
}

.platform-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 26px;
}

.platform-tab {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 16px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 600;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: 999px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.platform-tab:hover {
  color: var(--text-main);
  border-color: var(--accent-color);
}

.platform-tab.active {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-color: transparent;
  box-shadow: var(--accent-glow);
}

.platform-tab.active svg {
  color: #ffffff;
}

.platform-detail {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 26px;
  background: var(--bg-panel);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

.platform-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.platform-info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 16px;
  flex-shrink: 0;
}

.platform-info h3 {
  color: var(--text-main);
  font-size: 17px;
  font-weight: 750;
  margin-bottom: 4px;
}

.platform-info p {
  color: var(--text-muted);
  font-size: 13px;
}

.platform-reqs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 18px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  list-style: none;
}

.platform-reqs li {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--text-muted);
  font-size: 13px;
}

.platform-reqs li svg {
  color: #34d399;
  flex-shrink: 0;
}

/* FAQ */
.faq {
  padding: 40px 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 780px;
  margin: 0 auto;
}

.faq-item {
  background: var(--bg-panel);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.faq-item[open] {
  border-color: rgba(129, 140, 248, 0.5);
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  color: var(--text-main);
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-chev {
  color: var(--text-muted);
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

.faq-item[open] .faq-chev {
  transform: rotate(180deg);
  color: #a5b4fc;
}

.faq-item p {
  padding: 0 20px 18px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.65;
}

/* CTA */
.cta {
  padding: 40px 0 0;
}

.cta-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding: 32px;
  background:
    radial-gradient(circle at 85% 20%, rgba(192, 132, 252, 0.3), transparent 55%),
    linear-gradient(135deg, #1a2247, #121834);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.cta-text h2 {
  color: #ffffff;
  font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.cta-text p {
  margin-top: 6px;
  color: #cbd5e1;
  font-size: 14px;
}

/* ==========================================================================
   BUTTONS
   ========================================================================== */

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: 1px solid rgba(167, 139, 250, 0.4);
  border-radius: 12px;
  box-shadow: 0 8px 22px rgba(99, 102, 241, 0.32);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-primary:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #818cf8, #8b5cf6);
  box-shadow: 0 12px 28px rgba(99, 102, 241, 0.45);
}

.btn-primary.big {
  padding: 14px 26px;
  font-size: 14px;
}

/* ==========================================================================
   TOAST
   ========================================================================== */

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

.toast.success { background: rgba(16, 185, 129, 0.95); border: 1px solid rgba(52, 211, 153, 0.6); }
.toast.error { background: rgba(239, 68, 68, 0.95); border: 1px solid rgba(248, 113, 113, 0.6); }
.toast.info { background: rgba(59, 130, 246, 0.95); border: 1px solid rgba(96, 165, 250, 0.6); }

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* ==========================================================================
   RESPONSIVE
   ========================================================================== */

@media (max-width: 900px) {
  .showcase {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .phone-mockup {
    width: 220px;
    height: 440px;
  }

  .phone-hero {
    height: 90px;
  }

  .phone-card {
    height: 50px;
  }

  .phone-card.small {
    height: 40px;
  }

  .platform-detail {
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .get-app-page {
    padding: 20px 0 60px;
  }

  .hero {
    padding: 10px 0 40px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .store-btn {
    justify-content: center;
  }

  .phone-mockup {
    width: 200px;
    height: 400px;
  }

  .qr-svg {
    width: 130px;
    height: 130px;
  }

  .section-header {
    margin-bottom: 24px;
  }

  .features,
  .platforms,
  .faq {
    padding: 30px 0;
  }

  .cta-card {
    padding: 22px;
    text-align: center;
    justify-content: center;
  }

  .cta-card .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .toast {
    bottom: 16px;
    left: 16px;
    right: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>