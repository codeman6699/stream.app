import axios from "axios";

const API_URL = (process.env.VUE_APP_API_URL || "http://localhost:5000").replace(/\/+$/, "");
const SESSION_KEY = "stream_store_admin_session";
const api = axios.create({ baseURL: `${API_URL}/api`, timeout: 30000 });

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}
function adminConfig() {
  const token = getSession()?.token || "";
  return { headers: token ? { Authorization: `Bearer ${token}` } : {} };
}
function absoluteUrl(value) {
  if (!value) return "";
  const url = String(value).trim();
  if (/^(https?:|blob:|data:)/i.test(url)) return url;
  return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
function normalizeEpisode(episode, seasonNumber) {
  const videoUrl = absoluteUrl(episode.videoUrl || episode.sourceUrl || episode.video_url);
  return {
    ...episode,
    id: Number(episode.id) || undefined,
    ep: Number(episode.ep ?? episode.episode_number ?? episode.episodeNumber ?? 1),
    season: Number(episode.season ?? episode.season_number ?? seasonNumber ?? 1),
    title: episode.title || "Episode",
    description: episode.description || "",
    duration: episode.duration || "",
    videoUrl,
    sourceUrl: videoUrl,
  };
}
export function normalizeContent(item) {
  const seasons = Array.isArray(item.seasons)
    ? item.seasons.map((season) => ({
      ...season,
      season: Number(season.season ?? season.season_number ?? 1),
      episodes: (season.episodes || []).map((episode) => normalizeEpisode(episode, season.season)).sort((a, b) => a.ep - b.ep),
    })).sort((a, b) => a.season - b.season)
    : [];
  const episodeCount = seasons.reduce((total, season) => total + season.episodes.length, 0);
  const image = absoluteUrl(item.image || item.poster || item.posterUrl || item.imageUrl);
  const videoUrl = absoluteUrl(item.videoUrl || item.video_url || item.sourceUrl);
  return {
    ...item,
    id: Number(item.id),
    type: item.type === "Series" ? "Series" : "Movie",
    title: item.title || "Untitled",
    genre: item.genre || "",
    year: item.year || "",
    rating: Number(item.rating || 0),
    quality: item.quality || "HD",
    info: item.info || item.description || "",
    description: item.description || item.info || "",
    image,
    poster: image,
    videoUrl,
    sourceUrl: videoUrl,
    downloadBase: item.downloadBase || item.download_base || "",
    featured: Boolean(item.featured),
    trending: Boolean(item.trending),
    seasons,
    episodes: Number(item.episodes || episodeCount || 0),
  };
}
function extractRows(data) {
  const rows = Array.isArray(data) ? data : data?.content || [];
  return rows.map(normalizeContent);
}

export async function adminLogin(username, password) {
  const { data } = await api.post("/admin/login", { email: username, username, password });
  return data;
}
export async function getPublicContent() {
  const { data } = await api.get("/content");
  return extractRows(data);
}
export async function getPublicContentById(id) {
  const { data } = await api.get(`/content/${encodeURIComponent(id)}`);
  return normalizeContent(data);
}
export async function getAdminContent() {
  const { data } = await api.get("/content", adminConfig());
  return extractRows(data);
}
export async function getAdminContentById(id) {
  const { data } = await api.get(`/content/${encodeURIComponent(id)}`, adminConfig());
  return normalizeContent(data);
}
function toFormData(values) {
  if (values instanceof FormData) return values;
  const formData = new FormData();
  const episodes = Array.isArray(values?.episodes) ? values.episodes : [];
  let videoIndex = 0;
  const metadata = episodes.map((episode) => {
    const { videoFile, ...item } = episode;
    if (videoFile instanceof File) {
      item.videoUploadIndex = videoIndex++;
      formData.append("episodeVideos", videoFile);
    }
    return item;
  });
  Object.entries(values || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || key === "episodes") return;
    if (key === "posterFile" && value instanceof File) formData.append("poster", value);
    else if (key === "videoFile" && value instanceof File) formData.append("video", value);
    else if (value instanceof File) formData.append(key, value);
    else if (Array.isArray(value) || typeof value === "object") formData.append(key, JSON.stringify(value));
    else formData.append(key, String(value));
  });
  if (Array.isArray(values?.episodes)) formData.append("episodes", JSON.stringify(metadata));
  return formData;
}
function multipartConfig() {
  return { ...adminConfig(), headers: { ...adminConfig().headers, "Content-Type": "multipart/form-data" } };
}
export async function addAdminContent(content) {
  const { data } = await api.post("/content", toFormData(content), multipartConfig());
  window.dispatchEvent(new CustomEvent("stream-store-content-updated"));
  return data;
}
export async function updateAdminContent(id, content) {
  const { data } = await api.put(`/content/${encodeURIComponent(id)}`, toFormData(content), multipartConfig());
  window.dispatchEvent(new CustomEvent("stream-store-content-updated"));
  return data;
}
export async function deleteAdminContent(id) {
  const { data } = await api.delete(`/content/${encodeURIComponent(id)}`, adminConfig());
  window.dispatchEvent(new CustomEvent("stream-store-content-updated"));
  return data;
}
export function getApiBaseUrl() { return API_URL; }
export default api;
