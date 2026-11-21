<template>
  <div class="notifications-page">
    <!-- Header -->
    <div class="page-header">
      <h1>
        <i class="fas fa-bell"></i> Notifications
        <span class="badge-new" :class="{ 'all-read': unreadCount === 0 }">
          {{ unreadCount === 0 ? 'All read' : `${unreadCount} new` }}
        </span>
      </h1>
      <button
        class="mark-all-btn"
        :disabled="unreadCount === 0"
        @click="markAllAsRead"
      >
        <i class="far fa-check-circle"></i> Mark all as read
      </button>
    </div>

    <!-- Notification list -->
    <div v-if="notifications.length" class="notification-list">
      <div
        v-for="notif in notifications"
        :key="notif.id"
        class="notification-item"
        :class="{ unread: !notif.read }"
        @click="markAsRead(notif)"
      >
        <div class="notif-icon" :class="notif.type">
          <i :class="iconFor(notif.type)"></i>
        </div>
        <div class="notif-content">
          <div class="notif-title">
            <h3>{{ notif.title }}</h3>
            <span class="notif-time">
              <i class="far fa-clock"></i> {{ notif.time }}
            </span>
          </div>
          <p class="notif-desc">{{ notif.description }}</p>
          <div class="notif-meta">
            <span>
              <i :class="notif.metaIcon"></i> {{ notif.meta }}
            </span>
            <span v-if="!notif.read" class="unread-dot"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="empty-state">
      <i class="far fa-bell-slash"></i>
      <p>No notifications right now</p>
    </div>

    <!-- Footer -->
    <div class="footer-note">
      <i class="fas fa-sync-alt"></i> Last synced just now
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const notifications = ref([
  {
    id: 1,
    type: 'message',
    title: 'New message from Sarah',
    description:
      'Hey! I just shared the project files. Let me know if you need anything else.',
    time: '2 min ago',
    meta: 'Product team',
    metaIcon: 'fas fa-user-circle',
    read: false,
  },
  {
    id: 2,
    type: 'alert',
    title: 'Storage almost full',
    description:
      "You've used 92% of your storage. Consider removing unused files or upgrading your plan.",
    time: '28 min ago',
    meta: 'System',
    metaIcon: 'fas fa-database',
    read: false,
  },
  {
    id: 3,
    type: 'system',
    title: 'New pull request',
    description:
      'Alex opened PR #124: "Update dependencies and fix lint errors" in main repository.',
    time: '1 hour ago',
    meta: 'GitHub',
    metaIcon: 'fas fa-code',
    read: false,
  },
  {
    id: 4,
    type: 'success',
    title: 'Payment confirmed',
    description:
      'Your invoice #INV-2025-06 has been paid. Thank you for your business!',
    time: '3 hours ago',
    meta: 'Billing',
    metaIcon: 'fas fa-credit-card',
    read: true,
  },
  {
    id: 5,
    type: 'message',
    title: 'Weekly digest',
    description:
      "Here's what happened in your workspace this week: 12 tasks completed, 3 new members.",
    time: '1 day ago',
    meta: 'Activity',
    metaIcon: 'fas fa-chart-simple',
    read: true,
  },
  {
    id: 6,
    type: 'default',
    title: 'Reminder: design review',
    description:
      "Don't forget the design review meeting tomorrow at 10:00 AM with the product team.",
    time: '2 days ago',
    meta: 'Calendar',
    metaIcon: 'fas fa-calendar',
    read: true,
  },
]);

const unreadCount = computed(
  () => notifications.value.filter((n) => !n.read).length
);

const iconFor = (type) => {
  const map = {
    message: 'fas fa-comment-dots',
    alert: 'fas fa-exclamation-triangle',
    system: 'fas fa-code-branch',
    success: 'fas fa-check-circle',
    default: 'fas fa-calendar-check',
  };
  return map[type] || 'fas fa-bell';
};

const markAsRead = (notif) => {
  notif.read = true;
};

const markAllAsRead = () => {
  notifications.value.forEach((n) => (n.read = true));
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.notifications-page {
  max-width: 750px;
  width: 100%;
  margin: 2rem auto;
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.02);
  padding: 2rem 1.8rem 2.2rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue',
    sans-serif;
}

/* Header */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.8rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.page-header h1 {
  font-size: 1.9rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #0b1b2f;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-header h1 i {
  color: #2d6cdf;
  font-size: 1.8rem;
}

.badge-new {
  background: #eef3ff;
  color: #1e5bd7;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 40px;
  border: 1px solid #d0e0ff;
  transition: all 0.2s;
}

.badge-new.all-read {
  background: #edf1f9;
  color: #4b5e71;
  border-color: #dae2ef;
}

.mark-all-btn {
  background: transparent;
  border: 1px solid transparent;
  color: #2d6cdf;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 0.9rem;
  border-radius: 40px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.mark-all-btn:hover:not(:disabled) {
  background: #eef3ff;
  border-color: #cddfff;
}

.mark-all-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

/* List */
.notification-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1rem 1rem 1.1rem;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #edf1f9;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;
}

.notification-item:hover {
  background: #fafcff;
  border-color: #d9e3f5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
}

.notification-item.unread {
  background: #f8fbff;
  border-left: 4px solid #2d6cdf;
  border-radius: 20px 12px 12px 20px;
  border-color: #e3ecfc;
  border-left-color: #2d6cdf;
}

.notification-item.unread:hover {
  background: #f2f8ff;
}

/* Icons */
.notif-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  background: #eef3fe;
  color: #1e5bd7;
}

.notif-icon.alert {
  background: #ffeeed;
  color: #c2412c;
}

.notif-icon.message {
  background: #e6f7f0;
  color: #0e7b5e;
}

.notif-icon.system {
  background: #f0eefb;
  color: #5e4bc4;
}

/* Content */
.notif-content {
  flex: 1;
  min-width: 0;
  padding-top: 0.1rem;
}

.notif-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.notif-title h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #0f1e33;
  letter-spacing: -0.01em;
}

.notif-time {
  font-size: 0.75rem;
  color: #7a8b9f;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
}

.notif-time i {
  font-size: 0.65rem;
  color: #9aaab9;
}

.notif-desc {
  font-size: 0.87rem;
  color: #4b5e71;
  line-height: 1.45;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.notif-meta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.78rem;
  color: #7a8b9f;
  margin-top: 0.2rem;
}

.notif-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.notif-meta i {
  font-size: 0.7rem;
  color: #9aaab9;
}

.unread-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  background: #2d6cdf;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 2.5rem 1rem;
  color: #8a9aad;
  font-size: 0.95rem;
}

.empty-state i {
  font-size: 2.5rem;
  color: #cbd7e6;
  margin-bottom: 1rem;
}

/* Footer */
.footer-note {
  margin-top: 1.8rem;
  text-align: center;
  font-size: 0.8rem;
  color: #a0b1c4;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
}

.footer-note i {
  font-size: 0.75rem;
}

/* Responsive */
@media (max-width: 480px) {
  .notifications-page {
    padding: 1.5rem 1rem;
    border-radius: 22px;
    margin: 1rem auto;
  }

  .page-header h1 {
    font-size: 1.55rem;
  }

  .page-header h1 i {
    font-size: 1.5rem;
  }

  .notification-item {
    padding: 0.9rem;
    gap: 0.8rem;
  }

  .notif-icon {
    width: 40px;
    height: 40px;
    font-size: 1.15rem;
  }

  .notif-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
  }

  .notif-time {
    font-size: 0.7rem;
  }
}
</style>