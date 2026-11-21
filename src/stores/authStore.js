import { reactive, computed, watch } from "vue";
import { adminLogin } from "@/utils/adminContent.js";

const STORAGE_KEY = "stream_store_admin_session";
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7;

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw);

    if (
      session &&
      session.role === "admin" &&
      typeof session.expiresAt === "number" &&
      session.expiresAt > Date.now() &&
      typeof session.token === "string" &&
      session.token.length > 0
    ) {
      return session;
    }

    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch (error) {
    console.warn("[Stream.Store] Could not restore admin session:", error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

const state = reactive({
  user: loadSession(),
});

watch(
  () => state.user,
  (user) => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.warn("[Stream.Store] Session storage failed:", error);
    }
  },
  { deep: true }
);

const isLoggedIn = computed(() => {
  return Boolean(
    state.user &&
    state.user.role === "admin" &&
    state.user.expiresAt > Date.now() &&
    state.user.token
  );
});

const currentUser = computed(() => (
  isLoggedIn.value ? state.user : null
));

async function login(username, password) {
  const cleanUsername = String(username || "").trim();

  if (!cleanUsername || !password) {
    return {
      ok: false,
      error: "Enter your admin email and password.",
    };
  }

  try {
    const result = await adminLogin(cleanUsername, password);

    if (!result?.token) {
      return {
        ok: false,
        error: result?.error || "The server did not return an authentication token.",
      };
    }

    const now = Date.now();

    state.user = {
      username: result.user?.email || result.user?.username || cleanUsername,
      role: "admin",
      token: result.token,
      loginAt: now,
      expiresAt: now + SESSION_DURATION,
    };

    return {
      ok: true,
      user: state.user,
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Unable to connect to the server. Check that the backend is running.",
    };
  }
}

function logout() {
  state.user = null;

  return {
    ok: true,
    message: "Successfully logged out.",
  };
}

function checkSession() {
  if (!state.user) return false;

  if (
    !state.user.token ||
    !state.user.expiresAt ||
    state.user.expiresAt <= Date.now()
  ) {
    logout();
    return false;
  }

  return true;
}

function refreshSession() {
  if (!checkSession()) return false;

  state.user.expiresAt = Date.now() + SESSION_DURATION;
  return true;
}

export function useAuthStore() {
  return {
    state,
    isLoggedIn,
    currentUser,
    login,
    logout,
    checkSession,
    refreshSession,
  };
}