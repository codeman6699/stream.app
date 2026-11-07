import { reactive, computed, watch } from "vue";

const STORAGE_KEY = "stream_store_admin_session";
const ADMIN_CREDENTIALS = { username: "admin", password: "admin123" };

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s.expiresAt && s.expiresAt > Date.now()) return s;
    return null;
  } catch { return null; }
}

const state = reactive({ user: loadSession() });

watch(
  () => state.user,
  (u) => {
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  },
  { deep: true }
);

const isLoggedIn = computed(() => !!state.user);

function login(username, password) {
  if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    state.user = {
      username, role: "admin",
      loginAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };
    return { ok: true };
  }
  return { ok: false, error: "Invalid credentials" };
}

function logout() { state.user = null; }

export function useAuthStore() {
  return { state, isLoggedIn, login, logout };
}