<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-logo">
        <div class="logo-icon">
          <Clapperboard :size="27" />
        </div>
        <h1>Stream<span>.</span>Store</h1>
        <p>ADMINISTRATION PORTAL</p>
      </div>

      <div class="login-heading">
        <h2>Welcome Back</h2>
        <p>Sign in to access your admin dashboard.</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="field">
          <label for="username">Admin Email</label>
          <div class="input-wrap">
            <UserRound :size="18" />
            <input
              id="username"
              v-model.trim="username"
              type="email"
              placeholder="Enter admin email"
              autocomplete="username"
              required
            />
          </div>
        </div>

        <div class="field">
          <label for="password">Password</label>
          <div class="input-wrap">
            <Lock :size="18" />
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter admin password"
              autocomplete="current-password"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <EyeOff v-if="showPassword" :size="17" />
              <Eye v-else :size="17" />
            </button>
          </div>
        </div>

        <p v-if="error" class="error-message">
          <AlertCircle :size="16" />
          {{ error }}
        </p>

        <button class="login-button" type="submit" :disabled="loading">
          <LogIn :size="18" />
          {{ loading ? "Signing in..." : "Sign In to Dashboard" }}
        </button>
      </form>

      <router-link to="/home" class="back-home">
        <ArrowLeft :size="15" />
        Back to Stream.Store
      </router-link>

      <div class="security-note">
        <ShieldCheck :size="15" />
        Protected administrator access
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";

import {
  Clapperboard,
  UserRound,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const error = ref("");

async function handleLogin() {
  error.value = "";

  if (!username.value.trim() || !password.value) {
    error.value = "Please enter your admin email and password.";
    return;
  }

  loading.value = true;

  try {
    const result = await authStore.login(
      username.value,
      password.value
    );

    if (!result.ok) {
      error.value = result.error || "Invalid email or password.";
      return;
    }

    const requestedPath = route.query.redirect;

    const destination =
      typeof requestedPath === "string" &&
      requestedPath.startsWith("/admin") &&
      !requestedPath.startsWith("//")
        ? requestedPath
        : "/admin";

    await router.replace(destination);
  } catch (err) {
    console.error("Admin login failed:", err);
    error.value = "Unable to sign in. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  padding: 25px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 20% 10%, rgba(99, 102, 241, 0.2), transparent 35%),
    radial-gradient(circle at 90% 90%, rgba(124, 58, 237, 0.16), transparent 35%),
    #090d18;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 35px;
  background: rgba(20, 29, 50, 0.96);
  border: 1px solid #35415e;
  border-radius: 19px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
}

.login-logo {
  display: grid;
  justify-items: center;
  text-align: center;
  margin-bottom: 30px;
}

.logo-icon {
  width: 55px;
  height: 55px;
  display: grid;
  place-items: center;
  color: white;
  background: linear-gradient(135deg, #536fe0, #9333ea);
  border-radius: 15px;
  margin-bottom: 12px;
}

.login-logo h1 {
  color: white;
  font-size: 23px;
}

.login-logo h1 span {
  color: #a78bfa;
}

.login-logo p {
  margin-top: 5px;
  color: #8996ae;
  font-size: 10px;
  letter-spacing: 2px;
}

.login-heading {
  margin-bottom: 24px;
}

.login-heading h2 {
  color: white;
  font-size: 21px;
}

.login-heading p {
  margin-top: 6px;
  color: #8996ae;
  font-size: 12px;
}

.field {
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
}

.field label {
  color: #dbe4f3;
  font-size: 12px;
  font-weight: 600;
}

.input-wrap {
  height: 46px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  color: #8490a8;
  background: #0b1325;
  border: 1px solid #35425b;
  border-radius: 9px;
}

.input-wrap:focus-within {
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

.input-wrap input {
  width: 100%;
  height: 100%;
  min-width: 0;
  color: white;
  background: transparent;
  border: 0;
  outline: none;
  font-size: 12px;
}

.input-wrap input::placeholder {
  color: #71809a;
}

.toggle-password {
  display: grid;
  place-items: center;
  padding: 4px;
  color: #8996ae;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
  padding: 11px;
  color: #fecaca;
  background: #47252e;
  border: 1px solid #75404e;
  border-radius: 8px;
  font-size: 11px;
}

.login-button {
  width: 100%;
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 20px;
  color: white;
  background: linear-gradient(110deg, #536fe0, #7848d0);
  border: 0;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-home {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  margin-top: 23px;
  color: #a5b4fc;
  font-size: 12px;
  text-decoration: none;
}

.security-note {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  margin-top: 25px;
  padding-top: 17px;
  color: #8490a8;
  font-size: 10px;
  border-top: 1px solid #293650;
}

.security-note svg {
  color: #6ee7b7;
}

@media (max-width: 480px) {
  .login-card {
    padding: 25px 20px;
  }
}
</style>