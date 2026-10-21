<template>
  <div class="profile-settings-page">
    <!-- ================= PAGE HEADER ================= -->
    <div class="page-header">
      <div class="page-header-text">
        <h1>Profile Settings</h1>
        <p>Manage your account information, preferences, and security.</p>
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
        <nav class="settings-tabs" role="tablist" aria-label="Profile settings sections">
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

        <!-- Quick account summary -->
        <div class="sidebar-card">
          <p class="sidebar-card-title">Account Status</p>
          <div class="status-row">
            <span class="status-dot" :class="account.verified ? 'ok' : 'warn'"></span>
            <span>{{ account.verified ? "Verified" : "Not verified" }}</span>
          </div>
          <div class="status-row">
            <span class="status-dot ok"></span>
            <span>Member since {{ account.joinDate }}</span>
          </div>
          <div class="status-row">
            <span class="status-dot ok"></span>
            <span>{{ account.plan }} plan</span>
          </div>
        </div>
      </aside>

      <!-- ============ CONTENT PANELS ============ -->
      <section class="settings-content">
        <!-- ========== PROFILE TAB ========== -->
        <div
          v-if="activeTab === 'profile'"
          id="panel-profile"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-profile"
        >
          <div class="panel-header">
            <h2>Profile Information</h2>
            <p>Update your personal details and public profile.</p>
          </div>

          <!-- Avatar uploader -->
          <div class="avatar-section">
            <div class="avatar-preview">
              <img v-if="avatarPreview" :src="avatarPreview" alt="Avatar preview" />
              <UserRound v-else :size="44" />
              <span class="avatar-ring"></span>
            </div>

            <div class="avatar-actions">
              <label class="btn-secondary">
                <Upload :size="15" />
                <span>Upload new photo</span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  @change="onAvatarChange"
                />
              </label>
              <button
                v-if="avatarPreview"
                class="btn-ghost"
                @click="removeAvatar"
              >
                <Trash2 :size="15" />
                Remove
              </button>
              <p class="avatar-hint">JPG, PNG or GIF · Max 2MB · 400×400 recommended</p>
            </div>
          </div>

          <div class="divider"></div>

          <!-- Form -->
          <form class="settings-form" @submit.prevent="saveProfile">
            <div class="form-grid">
              <div class="form-field">
                <label for="fullname">Full name</label>
                <input
                  id="fullname"
                  v-model.trim="profile.fullName"
                  type="text"
                  placeholder="Your full name"
                  :class="{ error: errors.fullName }"
                  @input="clearError('fullName')"
                />
                <p v-if="errors.fullName" class="error-text">{{ errors.fullName }}</p>
              </div>

              <div class="form-field">
                <label for="username">Username</label>
                <input
                  id="username"
                  v-model.trim="profile.username"
                  type="text"
                  placeholder="Choose a username"
                  :class="{ error: errors.username }"
                  @input="clearError('username')"
                />
                <p v-if="errors.username" class="error-text">{{ errors.username }}</p>
              </div>

              <div class="form-field">
                <label for="email">Email address</label>
                <input
                  id="email"
                  v-model.trim="profile.email"
                  type="email"
                  placeholder="you@example.com"
                  :class="{ error: errors.email }"
                  @input="clearError('email')"
                />
                <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
                <p v-else-if="account.verified" class="field-hint verified-hint">
                  <BadgeCheck :size="14" /> Verified
                </p>
              </div>

              <div class="form-field">
                <label for="phone">Phone number</label>
                <input
                  id="phone"
                  v-model.trim="profile.phone"
                  type="tel"
                  placeholder="+250 7XX XXX XXX"
                />
              </div>

              <div class="form-field">
                <label for="country">Country</label>
                <select id="country" v-model="profile.country">
                  <option value="">Select country</option>
                  <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>

              <div class="form-field">
                <label for="language">Preferred language</label>
                <select id="language" v-model="profile.language">
                  <option value="en">English</option>
                  <option value="rw">Kinyarwanda</option>
                  <option value="fr">Français</option>
                  <option value="sw">Kiswahili</option>
                </select>
              </div>

              <div class="form-field full-width">
                <label for="bio">Bio</label>
                <textarea
                  id="bio"
                  v-model.trim="profile.bio"
                  rows="3"
                  maxlength="180"
                  placeholder="Tell others a little about yourself..."
                ></textarea>
                <p class="field-hint">{{ profile.bio.length }}/180 characters</p>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-ghost" @click="resetProfile">
                Cancel
              </button>
              <button type="submit" class="btn-primary" :disabled="savingProfile">
                <Loader2 v-if="savingProfile" :size="15" class="spin" />
                <Save v-else :size="15" />
                <span>{{ savingProfile ? "Saving..." : "Save changes" }}</span>
              </button>
            </div>
          </form>
        </div>

        <!-- ========== SECURITY TAB ========== -->
        <div
          v-if="activeTab === 'security'"
          id="panel-security"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-security"
        >
          <div class="panel-header">
            <h2>Security</h2>
            <p>Change your password and secure your account.</p>
          </div>

          <form class="settings-form" @submit.prevent="changePassword">
            <div class="form-grid">
              <div class="form-field full-width">
                <label for="current-password">Current password</label>
                <div class="password-wrap">
                  <input
                    id="current-password"
                    v-model="passwords.current"
                    :type="showCurrentPw ? 'text' : 'password'"
                    placeholder="Enter current password"
                    :class="{ error: errors.currentPassword }"
                    @input="clearError('currentPassword')"
                  />
                  <button
                    type="button"
                    class="pw-toggle"
                    @click="showCurrentPw = !showCurrentPw"
                    :aria-label="showCurrentPw ? 'Hide password' : 'Show password'"
                  >
                    <EyeOff v-if="showCurrentPw" :size="16" />
                    <Eye v-else :size="16" />
                  </button>
                </div>
                <p v-if="errors.currentPassword" class="error-text">{{ errors.currentPassword }}</p>
              </div>

              <div class="form-field">
                <label for="new-password">New password</label>
                <div class="password-wrap">
                  <input
                    id="new-password"
                    v-model="passwords.newPw"
                    :type="showNewPw ? 'text' : 'password'"
                    placeholder="At least 8 characters"
                    :class="{ error: errors.newPassword }"
                    @input="clearError('newPassword')"
                  />
                  <button
                    type="button"
                    class="pw-toggle"
                    @click="showNewPw = !showNewPw"
                    :aria-label="showNewPw ? 'Hide password' : 'Show password'"
                  >
                    <EyeOff v-if="showNewPw" :size="16" />
                    <Eye v-else :size="16" />
                  </button>
                </div>
                <p v-if="errors.newPassword" class="error-text">{{ errors.newPassword }}</p>
              </div>

              <div class="form-field">
                <label for="confirm-password">Confirm new password</label>
                <div class="password-wrap">
                  <input
                    id="confirm-password"
                    v-model="passwords.confirm"
                    :type="showConfirmPw ? 'text' : 'password'"
                    placeholder="Repeat new password"
                    :class="{ error: errors.confirmPassword }"
                    @input="clearError('confirmPassword')"
                  />
                  <button
                    type="button"
                    class="pw-toggle"
                    @click="showConfirmPw = !showConfirmPw"
                    :aria-label="showConfirmPw ? 'Hide password' : 'Show password'"
                  >
                    <EyeOff v-if="showConfirmPw" :size="16" />
                    <Eye v-else :size="16" />
                  </button>
                </div>
                <p v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</p>
              </div>
            </div>

            <!-- Password strength meter -->
            <div class="pw-strength">
              <div class="pw-strength-bar">
                <div
                  class="pw-strength-fill"
                  :style="{ width: pwStrength.percent + '%' }"
                  :class="pwStrength.level"
                ></div>
              </div>
              <p class="pw-strength-label" :class="pwStrength.level">
                {{ pwStrength.label }}
              </p>
            </div>

            <!-- Requirements -->
            <ul class="pw-reqs">
              <li :class="{ met: pwChecks.length }">
                <Check v-if="pwChecks.length" :size="14" />
                <X v-else :size="14" />
                At least 8 characters
              </li>
              <li :class="{ met: pwChecks.upper }">
                <Check v-if="pwChecks.upper" :size="14" />
                <X v-else :size="14" />
                One uppercase letter
              </li>
              <li :class="{ met: pwChecks.lower }">
                <Check v-if="pwChecks.lower" :size="14" />
                <X v-else :size="14" />
                One lowercase letter
              </li>
              <li :class="{ met: pwChecks.number }">
                <Check v-if="pwChecks.number" :size="14" />
                <X v-else :size="14" />
                One number
              </li>
              <li :class="{ met: pwChecks.symbol }">
                <Check v-if="pwChecks.symbol" :size="14" />
                <X v-else :size="14" />
                One special character
              </li>
            </ul>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="savingPassword">
                <Loader2 v-if="savingPassword" :size="15" class="spin" />
                <ShieldCheck v-else :size="15" />
                <span>{{ savingPassword ? "Updating..." : "Update password" }}</span>
              </button>
            </div>
          </form>

          <div class="divider"></div>

          <!-- Two-factor -->
          <div class="settings-row">
            <div>
              <h3>Two-factor authentication</h3>
              <p>Add an extra layer of security to your account.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: security.twoFactor }"
              @click="toggle2FA"
              :aria-pressed="security.twoFactor"
              aria-label="Toggle two-factor authentication"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Login alerts</h3>
              <p>Get notified when a new device signs in.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: security.loginAlerts }"
              @click="security.loginAlerts = !security.loginAlerts"
              :aria-pressed="security.loginAlerts"
              aria-label="Toggle login alerts"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>
        </div>

        <!-- ========== PREFERENCES TAB ========== -->
        <div
          v-if="activeTab === 'preferences'"
          id="panel-preferences"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-preferences"
        >
          <div class="panel-header">
            <h2>Preferences</h2>
            <p>Customize how Stream.Store looks and behaves for you.</p>
          </div>

          <div class="settings-row">
            <div>
              <h3>Autoplay next episode</h3>
              <p>Automatically play the next episode when one finishes.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: prefs.autoplay }"
              @click="prefs.autoplay = !prefs.autoplay"
              :aria-pressed="prefs.autoplay"
              aria-label="Toggle autoplay"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Autoplay previews</h3>
              <p>Play trailers while browsing titles.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: prefs.autoplayPreviews }"
              @click="prefs.autoplayPreviews = !prefs.autoplayPreviews"
              :aria-pressed="prefs.autoplayPreviews"
              aria-label="Toggle autoplay previews"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="settings-row">
            <div>
              <h3>Email notifications</h3>
              <p>New releases, recommendations and account updates.</p>
            </div>
            <button
              class="toggle-switch"
              :class="{ on: prefs.emailNotifications }"
              @click="prefs.emailNotifications = !prefs.emailNotifications"
              :aria-pressed="prefs.emailNotifications"
              aria-label="Toggle email notifications"
            >
              <span class="toggle-knob"></span>
            </button>
          </div>

          <div class="divider"></div>

          <div class="form-field">
            <label>Playback quality</label>
            <div class="radio-group">
              <label
                v-for="q in qualityOptions"
                :key="q.value"
                class="radio-pill"
                :class="{ active: prefs.quality === q.value }"
              >
                <input
                  type="radio"
                  :value="q.value"
                  v-model="prefs.quality"
                  hidden
                />
                <component :is="q.icon" :size="14" />
                <span>{{ q.label }}</span>
              </label>
            </div>
          </div>

          <div class="form-field">
            <label>Content maturity</label>
            <select v-model="prefs.maturity">
              <option value="all">Show all content</option>
              <option value="teen">Teen and below</option>
              <option value="kids">Kids only</option>
            </select>
          </div>
        </div>

        <!-- ========== NOTIFICATIONS TAB ========== -->
        <div
          v-if="activeTab === 'notifications'"
          id="panel-notifications"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-notifications"
        >
          <div class="panel-header">
            <h2>Notifications</h2>
            <p>Choose what we send you and how.</p>
          </div>

          <div class="notif-list">
            <div
              v-for="n in notificationOptions"
              :key="n.key"
              class="settings-row"
            >
              <div class="notif-info">
                <component :is="n.icon" :size="18" class="notif-icon" />
                <div>
                  <h3>{{ n.title }}</h3>
                  <p>{{ n.desc }}</p>
                </div>
              </div>
              <button
                class="toggle-switch"
                :class="{ on: notifications[n.key] }"
                @click="notifications[n.key] = !notifications[n.key]"
                :aria-pressed="notifications[n.key]"
                :aria-label="`Toggle ${n.title}`"
              >
                <span class="toggle-knob"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- ========== DANGER ZONE ========== -->
        <div
          v-if="activeTab === 'danger'"
          id="panel-danger"
          class="settings-panel"
          role="tabpanel"
          aria-labelledby="tab-danger"
        >
          <div class="panel-header">
            <h2>Danger Zone</h2>
            <p>Irreversible actions — proceed carefully.</p>
          </div>

          <div class="danger-card">
            <div>
              <h3><LogOut :size="16" /> Sign out everywhere</h3>
              <p>Log out of all devices except this one.</p>
            </div>
            <button class="btn-outline-danger" @click="signOutEverywhere">
              Sign out all
            </button>
          </div>

          <div class="danger-card">
            <div>
              <h3><Trash2 :size="16" /> Delete account</h3>
              <p>Permanently delete your account, watch history, and saved list.</p>
            </div>
            <button class="btn-danger" @click="showDeleteModal = true">
              Delete account
            </button>
          </div>
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

    <!-- ================= DELETE MODAL ================= -->
    <Transition name="fade">
      <div v-if="showDeleteModal" class="modal-backdrop" @click.self="showDeleteModal = false">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
          <div class="modal-icon danger">
            <AlertTriangle :size="24" />
          </div>
          <h3 id="delete-modal-title">Delete your account?</h3>
          <p>
            This will permanently delete your account, watch history, and saved list.
            This action cannot be undone.
          </p>
          <div class="modal-field">
            <label for="confirm-delete">
              Type <strong>DELETE</strong> to confirm
            </label>
            <input
              id="confirm-delete"
              v-model="deleteConfirmText"
              type="text"
              placeholder="DELETE"
              autocomplete="off"
            />
          </div>
          <div class="modal-actions">
            <button class="btn-ghost" @click="showDeleteModal = false">Cancel</button>
            <button
              class="btn-danger"
              :disabled="deleteConfirmText !== 'DELETE'"
              @click="deleteAccount"
            >
              Delete permanently
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  UserRound, Shield, Settings, Bell, AlertTriangle, LogOut, Trash2,
  Upload, Save, Loader2, Eye, EyeOff, Check, X, ChevronRight,
  ArrowLeft, BadgeCheck, CheckCircle2, AlertCircle, Info,
  ShieldCheck, MonitorPlay, Sparkles, Film, Mail, Smartphone,
  Megaphone, Heart
} from "lucide-vue-next";

const router = useRouter();

/* ---------- TABS ---------- */
const tabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "security", label: "Security", icon: Shield },
  { id: "preferences", label: "Preferences", icon: Settings },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];
const activeTab = ref("profile");

/* ---------- ACCOUNT ---------- */
const account = reactive({
  verified: true,
  joinDate: "Jan 2024",
  plan: "Free",
});

/* ---------- PROFILE FORM ---------- */
const profile = reactive({
  fullName: "Guest User",
  username: "guest_user",
  email: "guest@stream.store",
  phone: "",
  country: "Rwanda",
  language: "en",
  bio: "",
});
const errors = reactive({});
const savingProfile = ref(false);
const avatarPreview = ref(null);

const countries = [
  "Rwanda", "Uganda", "Kenya", "Tanzania", "Burundi",
  "DR Congo", "South Sudan", "Ethiopia", "Nigeria", "Ghana",
  "South Africa", "United States", "United Kingdom", "Canada",
  "France", "Germany", "Belgium", "Other",
];

/* ---------- SECURITY ---------- */
const passwords = reactive({ current: "", newPw: "", confirm: "" });
const showCurrentPw = ref(false);
const showNewPw = ref(false);
const showConfirmPw = ref(false);
const savingPassword = ref(false);

const security = reactive({
  twoFactor: false,
  loginAlerts: true,
});

const pwChecks = computed(() => {
  const p = passwords.newPw;
  return {
    length: p.length >= 8,
    upper: /[A-Z]/.test(p),
    lower: /[a-z]/.test(p),
    number: /[0-9]/.test(p),
    symbol: /[^A-Za-z0-9]/.test(p),
  };
});

const pwStrength = computed(() => {
  const c = pwChecks.value;
  const score = [c.length, c.upper, c.lower, c.number, c.symbol].filter(Boolean).length;
  const map = {
    0: { percent: 0, level: "empty", label: "" },
    1: { percent: 20, level: "weak", label: "Very weak" },
    2: { percent: 40, level: "weak", label: "Weak" },
    3: { percent: 60, level: "fair", label: "Fair" },
    4: { percent: 80, level: "good", label: "Good" },
    5: { percent: 100, level: "strong", label: "Strong" },
  };
  return map[score];
});

/* ---------- PREFERENCES ---------- */
const prefs = reactive({
  autoplay: true,
  autoplayPreviews: false,
  emailNotifications: true,
  quality: "auto",
  maturity: "all",
});

const qualityOptions = [
  { value: "auto", label: "Auto", icon: Sparkles },
  { value: "4k", label: "4K Ultra HD", icon: MonitorPlay },
  { value: "hd", label: "HD", icon: Film },
  { value: "sd", label: "SD (save data)", icon: Smartphone },
];

/* ---------- NOTIFICATIONS ---------- */
const notifications = reactive({
  newReleases: true,
  recommendations: true,
  accountUpdates: true,
  newsletter: false,
  promotions: false,
});

const notificationOptions = [
  { key: "newReleases", title: "New releases", desc: "Get notified when new movies or series drop.", icon: Film },
  { key: "recommendations", title: "Recommendations", desc: "Personalized picks based on what you watch.", icon: Heart },
  { key: "accountUpdates", title: "Account updates", desc: "Important security and billing alerts.", icon: ShieldCheck },
  { key: "newsletter", title: "Newsletter", desc: "Weekly highlights and trending titles.", icon: Mail },
  { key: "promotions", title: "Promotions", desc: "Special offers and partner deals.", icon: Megaphone },
];

/* ---------- DELETE MODAL ---------- */
const showDeleteModal = ref(false);
const deleteConfirmText = ref("");

/* ---------- TOAST ---------- */
const toast = reactive({ show: false, message: "", type: "success" });
let toastTimer = null;

function showToast(message, type = "success") {
  toast.show = true;
  toast.message = message;
  toast.type = type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.show = false), 3000);
}

/* ---------- AVATAR ---------- */
function onAvatarChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showToast("Please select an image file.", "error");
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    showToast("Image must be under 2MB.", "error");
    return;
  }
  const reader = new FileReader();
  reader.onload = (ev) => {
    avatarPreview.value = ev.target.result;
    showToast("Avatar updated. Don't forget to save.", "success");
  };
  reader.readAsDataURL(file);
  e.target.value = "";
}

function removeAvatar() {
  avatarPreview.value = null;
  showToast("Avatar removed.", "info");
}

/* ---------- VALIDATION ---------- */
function clearError(key) {
  delete errors[key];
}

function validateProfile() {
  Object.keys(errors).forEach((k) => delete errors[k]);

  if (!profile.fullName || profile.fullName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }
  if (!profile.username || profile.username.length < 3) {
    errors.username = "Username must be at least 3 characters.";
  } else if (!/^[a-zA-Z0-9_.]+$/.test(profile.username)) {
    errors.username = "Only letters, numbers, _ and . are allowed.";
  }
  if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    errors.email = "Enter a valid email address.";
  }
  return Object.keys(errors).length === 0;
}

/* ---------- SAVE PROFILE ---------- */
async function saveProfile() {
  if (!validateProfile()) {
    showToast("Please fix the highlighted fields.", "error");
    return;
  }
  savingProfile.value = true;
  await new Promise((r) => setTimeout(r, 800));
  savingProfile.value = false;
  showToast("Profile saved successfully.", "success");
}

function resetProfile() {
  profile.fullName = "Guest User";
  profile.username = "guest_user";
  profile.email = "guest@stream.store";
  profile.phone = "";
  profile.country = "Rwanda";
  profile.language = "en";
  profile.bio = "";
  Object.keys(errors).forEach((k) => delete errors[k]);
  showToast("Changes discarded.", "info");
}

/* ---------- CHANGE PASSWORD ---------- */
async function changePassword() {
  Object.keys(errors).forEach((k) => delete errors[k]);

  if (!passwords.current) {
    errors.currentPassword = "Enter your current password.";
  }
  if (!passwords.newPw || passwords.newPw.length < 8) {
    errors.newPassword = "Password must be at least 8 characters.";
  }
  if (passwords.newPw !== passwords.confirm) {
    errors.confirmPassword = "Passwords do not match.";
  }
  if (Object.keys(errors).length) {
    showToast("Please fix the password fields.", "error");
    return;
  }

  savingPassword.value = true;
  await new Promise((r) => setTimeout(r, 800));
  savingPassword.value = false;

  passwords.current = "";
  passwords.newPw = "";
  passwords.confirm = "";
  showToast("Password updated successfully.", "success");
}

/* ---------- 2FA ---------- */
function toggle2FA() {
  security.twoFactor = !security.twoFactor;
  showToast(
    security.twoFactor ? "Two-factor enabled." : "Two-factor disabled.",
    security.twoFactor ? "success" : "info"
  );
}

/* ---------- DANGER ---------- */
function signOutEverywhere() {
  if (window.confirm("Sign out of all other devices?")) {
    showToast("Signed out of all other devices.", "success");
  }
}

function deleteAccount() {
  if (deleteConfirmText.value !== "DELETE") return;
  showDeleteModal.value = false;
  showToast("Account deletion requested. You'll be redirected.", "error");
  setTimeout(() => router.push("/"), 1500);
}

/* ---------- INIT ---------- */
onMounted(() => {
  // Simulate loading avatar from backend
  // avatarPreview.value = "https://...";
});
</script>

<style scoped>
/* ================= LAYOUT ================= */
.profile-settings-page {
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

.status-dot.ok { background: #34d399; box-shadow: 0 0 8px rgba(52, 211, 153, 0.6); }
.status-dot.warn { background: #fbbf24; }

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

/* ================= AVATAR ================= */
.avatar-section {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.avatar-preview {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  color: #a5b4fc;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(147, 51, 234, 0.25));
  border: 2px solid rgba(129, 140, 248, 0.4);
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px dashed rgba(129, 140, 248, 0.3);
  pointer-events: none;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 200px;
}

.avatar-hint {
  color: #64748b;
  font-size: 11px;
}

/* ================= FORM ================= */
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field.full-width {
  grid-column: 1 / -1;
}

.form-field label {
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
}

.form-field input,
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

.form-field input.error,
.form-field textarea.error {
  border-color: #f87171;
  box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.1);
}

.form-field input::placeholder,
.form-field textarea::placeholder {
  color: #64748b;
}

.form-field textarea {
  resize: vertical;
  min-height: 80px;
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

.error-text {
  color: #fca5a5;
  font-size: 11px;
}

.field-hint {
  color: #64748b;
  font-size: 11px;
}

.verified-hint {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #34d399 !important;
}

.password-wrap {
  position: relative;
}

.password-wrap input {
  width: 100%;
  padding-right: 40px;
}

.pw-toggle {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #94a3b8;
  background: transparent;
  border: none;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;
}

.pw-toggle:hover {
  color: #ffffff;
  background: rgba(129, 140, 248, 0.15);
}

/* ================= BUTTONS ================= */
.btn-primary,
.btn-secondary,
.btn-ghost,
.btn-danger,
.btn-outline-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 18px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 11px;
  border: 1px solid transparent;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  white-space: nowrap;
  cursor: pointer;
}

.btn-primary {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.18);
  border-color: rgba(129, 140, 248, 0.45);
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(99, 102, 241, 0.3);
  border-color: rgba(129, 140, 248, 0.7);
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

.btn-danger:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(220, 38, 38, 0.45);
}

.btn-danger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

/* ================= DIVIDER ================= */
.divider {
  height: 1px;
  margin: 24px 0;
  background: rgba(148, 163, 184, 0.15);
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

.settings-row h3 svg {
  color: #a5b4fc;
}

.settings-row p {
  margin-top: 4px;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.5;
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

/* ================= PASSWORD STRENGTH ================= */
.pw-strength {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pw-strength-bar {
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.15);
  overflow: hidden;
}

.pw-strength-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease, background 0.3s ease;
}

.pw-strength-fill.empty { background: transparent; }
.pw-strength-fill.weak { background: linear-gradient(90deg, #ef4444, #f97316); }
.pw-strength-fill.fair { background: linear-gradient(90deg, #f97316, #fbbf24); }
.pw-strength-fill.good { background: linear-gradient(90deg, #fbbf24, #22d3ee); }
.pw-strength-fill.strong { background: linear-gradient(90deg, #22c55e, #34d399); }

.pw-strength-label {
  font-size: 11px;
  font-weight: 650;
  min-width: 70px;
  text-align: right;
}

.pw-strength-label.empty { color: #64748b; }
.pw-strength-label.weak { color: #fca5a5; }
.pw-strength-label.fair { color: #fbbf24; }
.pw-strength-label.good { color: #22d3ee; }
.pw-strength-label.strong { color: #34d399; }

.pw-reqs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 8px;
  list-style: none;
  padding: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 11px;
}

.pw-reqs li {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #94a3b8;
  font-size: 12px;
  transition: color 0.2s ease;
}

.pw-reqs li svg {
  color: #64748b;
  flex-shrink: 0;
}

.pw-reqs li.met {
  color: #34d399;
}

.pw-reqs li.met svg {
  color: #34d399;
}

/* ================= NOTIFICATIONS ================= */
.notif-list {
  display: flex;
  flex-direction: column;
}

.notif-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.notif-icon {
  flex-shrink: 0;
  padding: 8px;
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.15);
  border-radius: 10px;
  box-sizing: content-box;
}

/* ================= RADIO PILLS ================= */
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
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

/* ================= DANGER ZONE ================= */
.danger-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px;
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 14px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.danger-card h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 650;
}

.danger-card h3 svg {
  color: #fca5a5;
}

.danger-card p {
  margin-top: 5px;
  color: #94a3b8;
  font-size: 12px;
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
  max-width: 420px;
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

.modal-icon.danger {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
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
  margin-bottom: 18px;
}

.modal-field {
  margin-bottom: 18px;
}

.modal-field label {
  display: block;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}

.modal-field strong {
  color: #fca5a5;
}

.modal-field input {
  width: 100%;
  padding: 11px 13px;
  color: #ffffff;
  font-family: inherit;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.modal-field input:focus {
  border-color: #f87171;
  box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.12);
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
  .profile-settings-page {
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

  .form-grid {
    grid-template-columns: 1fr;
  }

  .avatar-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .avatar-actions {
    width: 100%;
  }

  .avatar-actions .btn-secondary,
  .avatar-actions .btn-ghost {
    width: 100%;
    justify-content: center;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }

  .settings-row {
    flex-wrap: wrap;
  }

  .danger-card {
    flex-direction: column;
    align-items: stretch;
  }

  .danger-card button {
    width: 100%;
  }

  .toast {
    bottom: 16px;
    left: 16px;
    right: 16px;
  }

  .pw-reqs {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>