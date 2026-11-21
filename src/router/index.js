
import {
  createRouter,
  createWebHistory,
} from "vue-router";

import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/authStore.js";

// --------------------------------------------------
// APPLICATION ROUTES
// --------------------------------------------------

const routes = [
  // --------------------------------------------------
  // HOME
  // --------------------------------------------------

  {
    path: "/",
    redirect: "/home",
  },

  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Home | Stream.Store",
    },
  },

  // --------------------------------------------------
  // MOVIES AND SERIES
  // --------------------------------------------------

  {
    path: "/movies",
    name: "Movies",
    component: () => import("@/views/MoviesView.vue"),
    meta: {
      title: "Movies | Stream.Store",
    },
  },

  {
    path: "/series",
    name: "Series",
    component: () => import("@/views/SeriesView.vue"),
    meta: {
      title: "Series | Stream.Store",
    },
  },

  {
    path: "/mylist",
    name: "MyList",
    component: () => import("@/views/MyListView.vue"),
    meta: {
      title: "My List | Stream.Store",
    },
  },

  {
    path: "/browse",
    name: "Browse",
    component: () => import("@/views/BrowseView.vue"),
    meta: {
      title: "Browse | Stream.Store",
    },
  },

  // --------------------------------------------------
  // WATCH AND DOWNLOAD
  // --------------------------------------------------

  {
    path: "/watch/:id",
    name: "Watch",
    component: () => import("@/views/WatchView.vue"),
    props: true,
    meta: {
      title: "Watch | Stream.Store",
    },
  },

  {
    path: "/download/:type/:id",
    name: "DownloadContent",
    component: () => import("@/views/DownloadView.vue"),
    props: true,
    meta: {
      title: "Download | Stream.Store",
    },
  },

  {
    path: "/embed/:type/:id",
    name: "Embed",
    component: () => import("@/views/EmbedView.vue"),
    props: true,
    meta: {
      title: "Player | Stream.Store",
    },
  },

  // --------------------------------------------------
  // INFORMATION PAGES
  // --------------------------------------------------

  {
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutUs.vue"),
    meta: {
      title: "About Us | Stream.Store",
    },
  },

  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/ContactUs.vue"),
    meta: {
      title: "Contact | Stream.Store",
    },
  },

  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("@/views/PrivacyPolicy.vue"),
    meta: {
      title: "Privacy Policy | Stream.Store",
    },
  },

  {
    path: "/terms",
    name: "Terms",
    component: () => import("@/views/TermsView.vue"),
    meta: {
      title: "Terms | Stream.Store",
    },
  },

  {
    path: "/disclaimer",
    name: "Disclaimer",
    component: () => import("@/views/DisclaimerView.vue"),
    meta: {
      title: "Disclaimer | Stream.Store",
    },
  },

  {
    path: "/howwork",
    name: "HowWork",
    component: () => import("@/views/HowWork.vue"),
    meta: {
      title: "How It Works | Stream.Store",
    },
  },

  // --------------------------------------------------
  // APPLICATION SETTINGS
  // --------------------------------------------------

  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/AppSettings.vue"),
    meta: {
      title: "App Settings | Stream.Store",
    },
  },

  {
    path: "/download",
    name: "GetApp",
    component: () => import("@/views/GetApp.vue"),
    meta: {
      title: "Get App | Stream.Store",
    },
  },

  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("@/views/NotificationsView.vue"),
    meta: {
      title: "Notifications | Stream.Store",
    },
  },

  // ==================================================
  // ADMIN LOGIN
  // ==================================================

  {
    path: "/admin/login",
    name: "AdminLogin",

    component: () =>
      import("@/views/admin/AdminLogin.vue"),

    meta: {
      adminPublic: true,
      title: "Admin Login | Stream.Store",
    },
  },

  // ==================================================
  // PROTECTED ADMIN PANEL
  // ==================================================

  {
    path: "/admin",

    component: () =>
      import("@/layouts/AdminLayout.vue"),

    meta: {
      requiresAdmin: true,
      title: "Admin Panel | Stream.Store",
    },

    children: [

      // ----------------------------------------------
      // ADMIN DASHBOARD
      // ----------------------------------------------

      {
        path: "",
        name: "AdminDashboard",

        component: () =>
          import("@/views/admin/AdminDashboard.vue"),

        meta: {
          title: "Dashboard | Stream.Store Admin",
        },
      },

      // ----------------------------------------------
      // MANAGE CONTENT
      // ----------------------------------------------

      {
        path: "content",
        name: "AdminContent",

        component: () =>
          import("@/views/admin/AdminContent.vue"),

        meta: {
          title: "Manage Content | Stream.Store Admin",
        },
      },

      // ----------------------------------------------
      // ADD NEW CONTENT
      // ----------------------------------------------

      {
        path: "content/new",
        name: "AdminContentNew",

        component: () =>
          import("@/views/admin/AdminContentForm.vue"),

        meta: {
          title: "Add Content | Stream.Store Admin",
        },
      },

      // ----------------------------------------------
      // EDIT EXISTING CONTENT
      // ----------------------------------------------

      {
        path: "content/:id/edit",
        name: "AdminContentEdit",

        component: () =>
          import("@/views/admin/AdminContentForm.vue"),

        props: true,

        meta: {
          title: "Edit Content | Stream.Store Admin",
        },
      },

      // ----------------------------------------------
      // ADMIN SETTINGS
      // ----------------------------------------------

      {
        path: "settings",
        name: "AdminSettings",

        component: () =>
          import("@/views/admin/AdminSettings.vue"),

        meta: {
          title: "Admin Settings | Stream.Store Admin",
        },
      },

      // ----------------------------------------------
      // UNKNOWN ADMIN PAGE
      // ----------------------------------------------

      {
        path: ":pathMatch(.*)*",
        redirect: {
          name: "AdminDashboard",
        },
      },
    ],
  },

  // ==================================================
  // PAGE NOT FOUND
  // ==================================================

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",

    component: () =>
      import("@/views/NotFoundView.vue"),

    meta: {
      title: "Page Not Found | Stream.Store",
    },
  },
];

// --------------------------------------------------
// CREATE ROUTER
// --------------------------------------------------

const router = createRouter({
  history: createWebHistory(),

  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

// ==================================================
// ADMIN AUTHENTICATION GUARD
// ==================================================

router.beforeEach((to) => {
  const authStore = useAuthStore();

  // Check and validate admin session
  const loggedIn = authStore.checkSession();

  // Check whether the destination belongs to admin
  const requiresAdmin = to.matched.some(
    (record) => record.meta.requiresAdmin === true
  );

  // ----------------------------------------------
  // PROTECT ADMIN PAGES
  // ----------------------------------------------

  if (requiresAdmin && !loggedIn) {
    return {
      name: "AdminLogin",

      query: {
        redirect: to.fullPath,
      },

      replace: true,
    };
  }

  // ----------------------------------------------
  // PREVENT AUTHENTICATED ADMIN FROM LOGIN PAGE
  // ----------------------------------------------

  if (to.meta.adminPublic && loggedIn) {
    return {
      name: "AdminDashboard",
      replace: true,
    };
  }

  // Allow navigation
  return true;
});

// ==================================================
// UPDATE BROWSER PAGE TITLE
// ==================================================

router.afterEach((to) => {
  document.title =
    to.meta.title || "Stream.Store";
});

// --------------------------------------------------
// EXPORT ROUTER
// --------------------------------------------------

export default router;
