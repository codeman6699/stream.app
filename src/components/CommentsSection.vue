<template>
  <section class="comments-section">
    <div class="comments-header">
      <h2>
        <MessageSquare :size="20" />
        Comments
        <span class="count-badge">{{ comments.length }}</span>
      </h2>
    </div>

    <form class="comment-form" @submit.prevent="submitComment">
      <div class="form-avatar"><UserRound :size="18" /></div>
      <div class="form-body">
        <textarea
          v-model.trim="newComment"
          placeholder="Share your thoughts about this title..."
          rows="3"
          maxlength="500"
          @keydown.ctrl.enter="submitComment"
        ></textarea>
        <div class="form-row">
          <span class="char-count">{{ newComment.length }}/500</span>
          <button type="submit" class="submit-btn" :disabled="!newComment || submitting">
            <Send v-if="!submitting" :size="14" />
            <Loader2 v-else :size="14" class="spin" />
            {{ submitting ? "Posting..." : "Post Comment" }}
          </button>
        </div>
      </div>
    </form>

    <div v-if="comments.length === 0" class="empty-comments">
      <MessageCircle :size="32" />
      <p>No comments yet. Be the first!</p>
    </div>

    <ul v-else class="comments-list">
      <li v-for="c in sortedComments" :key="c.id" class="comment-item">
        <div class="comment-avatar"><UserRound :size="18" /></div>
        <div class="comment-body">
          <div class="comment-head">
            <strong>{{ c.author }}</strong>
            <span class="comment-time">{{ timeAgo(c.createdAt) }}</span>
          </div>
          <p class="comment-text">{{ c.text }}</p>
          <div class="comment-actions">
            <button class="act-btn" :class="{ active: c.liked }" @click="toggleLike(c)">
              <ThumbsUp :size="13" /> {{ c.likes || 0 }}
            </button>
            <button class="act-btn" @click="toggleReply(c.id)">
              <Reply :size="13" /> Reply
            </button>
            <button v-if="c.author === userName" class="act-btn delete" @click="deleteComment(c.id)">
              <Trash2 :size="13" />
            </button>
          </div>
          <ul v-if="c.replies?.length" class="replies-list">
            <li v-for="r in c.replies" :key="r.id" class="reply-item">
              <div class="comment-avatar small"><UserRound :size="14" /></div>
              <div class="comment-body">
                <div class="comment-head">
                  <strong>{{ r.author }}</strong>
                  <span class="comment-time">{{ timeAgo(r.createdAt) }}</span>
                </div>
                <p class="comment-text">{{ r.text }}</p>
              </div>
            </li>
          </ul>
          <form v-if="replyingTo === c.id" class="reply-form" @submit.prevent="submitReply(c.id)">
            <input v-model.trim="replyText" type="text" placeholder="Write a reply..." maxlength="300" />
            <button type="submit" :disabled="!replyText"><Send :size="13" /></button>
            <button type="button" class="cancel" @click="toggleReply(c.id)"><X :size="13" /></button>
          </form>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, computed, watch } from "vue";
import {
  MessageSquare, MessageCircle, UserRound, Send, Loader2,
  ThumbsUp, Reply, Trash2, X,
} from "lucide-vue-next";

const props = defineProps({ contentId: { type: Number, required: true } });
const STORAGE_KEY = `stream_store_comments_${props.contentId}`;
const userName = "Guest User";

const comments = ref(loadComments());
const newComment = ref("");
const replyText = ref("");
const replyingTo = ref(null);
const submitting = ref(false);

function loadComments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments.value));
  } catch { /* ignore */ }
}

watch(comments, persist, { deep: true });

const sortedComments = computed(() =>
  [...comments.value].sort((a, b) => b.createdAt - a.createdAt)
);

function submitComment() {
  if (!newComment.value) return;
  submitting.value = true;
  setTimeout(() => {
    comments.value.unshift({
      id: Date.now(),
      author: userName,
      text: newComment.value,
      createdAt: Date.now(),
      likes: 0,
      liked: false,
      replies: [],
    });
    newComment.value = "";
    submitting.value = false;
  }, 300);
}

function toggleLike(c) {
  c.liked = !c.liked;
  c.likes = (c.likes || 0) + (c.liked ? 1 : -1);
}

function toggleReply(id) {
  replyingTo.value = replyingTo.value === id ? null : id;
  replyText.value = "";
}

function submitReply(parentId) {
  if (!replyText.value) return;
  const parent = comments.value.find((c) => c.id === parentId);
  if (!parent) return;
  parent.replies = parent.replies || [];
  parent.replies.push({
    id: Date.now(),
    author: userName,
    text: replyText.value,
    createdAt: Date.now(),
  });
  replyText.value = "";
  replyingTo.value = null;
}

function deleteComment(id) {
  if (!confirm("Delete this comment?")) return;
  comments.value = comments.value.filter((c) => c.id !== id);
}

function timeAgo(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "Just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day > 1 ? "s" : ""} ago`;
  return `${Math.floor(day / 7)} wk ago`;
}
</script>

<style scoped>
.comments-section {
  margin-top: 48px;
  padding: 28px;
  background: rgba(20, 27, 55, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18px;
}
.comments-header h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: 750;
  margin-bottom: 20px;
}
.count-badge {
  display: inline-flex;
  padding: 2px 9px;
  color: #c7d2fe;
  font-size: 11px;
  font-weight: 700;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(129, 140, 248, 0.4);
  border-radius: 999px;
}
.comment-form {
  display: flex;
  gap: 12px;
  margin-bottom: 26px;
}
.form-avatar,
.comment-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  color: #a5b4fc;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(147, 51, 234, 0.2));
  border: 1px solid rgba(129, 140, 248, 0.35);
  border-radius: 50%;
}
.comment-avatar.small {
  width: 30px;
  height: 30px;
}
.form-body {
  flex: 1;
  min-width: 0;
}
.form-body textarea {
  width: 100%;
  padding: 11px 14px;
  color: #fff;
  font-family: inherit;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 11px;
  outline: none;
  resize: vertical;
}
.form-body textarea:focus {
  border-color: #818cf8;
}
.form-body textarea::placeholder {
  color: #64748b;
}
.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}
.char-count {
  color: #64748b;
  font-size: 11px;
}
.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  color: #fff;
  font-size: 12px;
  font-weight: 650;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: none;
  border-radius: 9px;
  transition: all 0.2s ease;
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}
.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.empty-comments {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 20px;
  color: #64748b;
  text-align: center;
  font-size: 13px;
}
.comments-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.comment-item {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 12px;
}
.comment-body {
  flex: 1;
  min-width: 0;
}
.comment-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.comment-head strong {
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}
.comment-time {
  color: #64748b;
  font-size: 11px;
}
.comment-text {
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.65;
  margin-bottom: 10px;
  word-break: break-word;
  white-space: pre-wrap;
}
.comment-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.act-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 600;
  background: transparent;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 7px;
  transition: all 0.2s ease;
}
.act-btn:hover {
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.12);
}
.act-btn.active {
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.18);
}
.act-btn.delete {
  color: #fca5a5;
}
.act-btn.delete:hover {
  color: #fff;
  background: rgba(239, 68, 68, 0.2);
}
.replies-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
  padding-left: 4px;
  border-left: 2px solid rgba(129, 140, 248, 0.2);
}
.reply-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 9px;
}
.reply-form {
  display: flex;
  gap: 6px;
  margin-top: 10px;
}
.reply-form input {
  flex: 1;
  padding: 8px 11px;
  color: #fff;
  font-family: inherit;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  outline: none;
}
.reply-form input:focus {
  border-color: #818cf8;
}
.reply-form input::placeholder {
  color: #64748b;
}
.reply-form button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #7c3aed);
  border: none;
  border-radius: 7px;
}
.reply-form button.cancel {
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.2);
}
.spin {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>