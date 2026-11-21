
<template>
  <section class="settings-page">

    <div class="page-heading">
      <h2>Admin Settings</h2>
      <p>Review your administrator session and account controls.</p>
    </div>

    <div class="settings-card">
      <div class="card-heading">
        <div class="heading-icon">
          <ShieldCheck :size="21" />
        </div>
        <div>
          <h3>Administrator Account</h3>
          <p>Your current admin session information.</p>
        </div>
      </div>

      <div class="setting-row">
        <span>Username</span>
        <strong>{{ username }}</strong>
      </div>

      <div class="setting-row">
        <span>Role</span>
        <strong>Administrator</strong>
      </div>

      <div class="setting-row">
        <span>Session status</span>
        <strong class="active">Authenticated</strong>
      </div>

      <div class="setting-row">
        <span>Session expires</span>
        <strong>{{ expiry }}</strong>
      </div>
    </div>

    <div class="settings-card danger-card">
      <div class="card-heading">
        <div class="heading-icon danger-icon">
          <LogOut :size="21" />
        </div>
        <div>
          <h3>Sign out</h3>
          <p>End your administrator session on this browser.</p>
        </div>
      </div>

      <button class="logout-button" @click="logout">
        <LogOut :size="17" />
        Logout from Admin Panel
      </button>
    </div>

  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";

import {
  ShieldCheck,
  LogOut,
} from "lucide-vue-next";

const router = useRouter();
const authStore = useAuthStore();

const user = computed(
  () => authStore.currentUser?.value || authStore.state?.user || null
);

const username = computed(
  () => user.value?.username || "Administrator"
);

const expiry = computed(() => {
  if (!user.value?.expiresAt) return "Not available";

  return new Date(user.value.expiresAt).toLocaleString();
});

function logout() {
  const confirmed = window.confirm(
    "Are you sure you want to log out?"
  );

  if (!confirmed) return;

  authStore.logout();
  router.replace({ name: "AdminLogin" });
}
</script>

<style scoped>
.settings-page {
  display: grid;
  gap: 22px;
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

.settings-card {
  max-width: 760px;
  padding: 23px;
  background: #141d32;
  border: 1px solid #293650;
  border-radius: 13px;
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}

.heading-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  color: #a5b4fc;
  background: #292d55;
  border-radius: 11px;
}

.card-heading h3 {
  color: white;
  font-size: 14px;
}

.card-heading p {
  margin-top: 5px;
  color: #8490a8;
  font-size: 11px;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 15px 0;
  border-top: 1px solid #293650;
  font-size: 12px;
}

.setting-row span {
  color: #8490a8;
}

.setting-row strong {
  color: #e2e8f0;
  text-align: right;
}

.setting-row .active {
  color: #6ee7b7;
}

.danger-card {
  border-color: #593343;
}

.danger-icon {
  color: #fca5a5;
  background: #47252e;
}

.logout-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 15px;
  color: #fecaca;
  background: #47252e;
  border: 1px solid #75404e;
  border-radius: 8px;
  font-size: 12px;
}
</style>
