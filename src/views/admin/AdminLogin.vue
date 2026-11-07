<template>
  <div class="admin-login">
    <div class="login-card">
      <div class="brand">
        <div class="brand-icon"><Clapperboard :size="28" :stroke-width="2.2" /></div>
        <h1>Stream<span class="dot">.</span>Store</h1>
        <p>Admin Panel</p>
      </div>

      <form @submit.prevent="submit">
        <div class="field">
          <label>Username</label>
          <div class="input-wrap">
            <UserRound :size="16" />
            <input v-model.trim="username" type="text" placeholder="admin" required />
          </div>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="input-wrap">
            <Lock :size="16" />
            <input
              v-model="password"
              :type="showPw ? 'text' : 'password'"
              placeholder="••••••••"
              required
            />
            <button type="button" class="pw-toggle" @click="showPw = !showPw">
              <EyeOff v-if="showPw" :size="15" />
              <Eye v-else :size="15" />
            </button>
          </div>
        </div>
        <p v-if="error" class="error"><AlertCircle :size="14" /> {{ error }}</p>
        <button type="submit" class="submit-btn" :disabled="loading">
          <Loader2 v-if="loading" :size="15" class="spin" />
          <LogIn v-else :size="15" />
          {{ loading ? "Signing in..." : "Sign in" }}
        </button>
      </form>

      <div class="hint">
        <Info :size="14" />
        <span>Demo: <code>admin</code> / <code>admin123</code></span>
      </div>
      <a href="/home" class="back-link"><ArrowLeft :size="14" /> Back to site</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Clapperboard, UserRound, Lock, Eye, EyeOff, LogIn,
  Loader2, AlertCircle, Info, ArrowLeft,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/authStore.js";

const router = useRouter();
const { login } = useAuthStore();
const username = ref("");
const password = ref("");
const showPw = ref(false);
const loading = ref(false);
const error = ref("");

async function submit() {
  error.value = "";
  loading.value = true;
  await new Promise((r) => setTimeout(r, 400));
  const r = login(username.value, password.value);
  loading.value = false;
  if (r.ok) router.push("/admin");
  else error.value = r.error;
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 20px;
  background:
    radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.25), transparent 45%),
    radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.2), transparent 45%),
    #080b18;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.login-card {
  width: 100%; max-width: 400px; padding: 36px 30px;
  background: rgba(20, 27, 55, 0.72);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 22px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
}
.brand { text-align: center; margin-bottom: 28px; }
.brand-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 58px; height: 58px; margin-bottom: 12px;
  color: #fff; background: linear-gradient(135deg, #6366f1, #7c3aed);
  border-radius: 16px;
}
.brand h1 { color: #fff; font-size: 22px; font-weight: 800; }
.brand h1 .dot { color: #c084fc; }
.brand p {
  color: #94a3b8; font-size: 11px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px;
}
form { display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { color: #cbd5e1; font-size: 12px; font-weight: 600; }
.input-wrap {
  position: relative; display: flex; align-items: center; gap: 10px;
  padding: 0 13px; height: 44px; color: #94a3b8;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 11px;
}
.input-wrap:focus-within { border-color: #818cf8; }
.input-wrap input {
  flex: 1; min-width: 0; height: 100%;
  color: #fff; font-family: inherit; font-size: 13px;
  background: transparent; border: none; outline: none;
}
.input-wrap input::placeholder { color: #64748b; }
.pw-toggle {
  width: 28px; height: 28px; color: #94a3b8;
  background: transparent; border: none; border-radius: 7px;
}
.error {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 12px; color: #fca5a5; font-size: 12px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px;
}
.submit-btn {
  display: flex; align-items: center; justify-content: center;
  gap: 8px; height: 46px; margin-top: 4px;
  color: #fff; font-size: 13px; font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: none; border-radius: 11px;
}
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.hint {
  display: flex; align-items: flex-start; gap: 8px;
  margin-top: 18px; padding: 10px 12px;
  color: #94a3b8; font-size: 11.5px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(129, 140, 248, 0.2); border-radius: 9px;
}
.hint svg { color: #a5b4fc; }
.hint code {
  padding: 1px 5px; color: #c7d2fe;
  background: rgba(99, 102, 241, 0.15); border-radius: 4px;
  font-family: monospace;
}
.back-link {
  display: flex; align-items: center; justify-content: center;
  gap: 6px; margin-top: 20px; color: #64748b;
  font-size: 12px; font-weight: 600; text-decoration: none;
}
.back-link:hover { color: #a5b4fc; }
</style>