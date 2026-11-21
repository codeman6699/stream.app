import axios from "axios";

const API_URL = (process.env.VUE_APP_API_URL || "http://localhost:5000").replace(/\/+$/, "");
const SESSION_KEY = "stream_store_admin_session";
const api = axios.create({ baseURL: `${API_URL}/api`, timeout: 60000 });

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

export function normalizeContent(item) {
  const image = absoluteUrl(item.image || item.poster || item.imageUrl);
  const videoUrl = absoluteUrl(item.videoUrl || item.video_url);
  return {
    ...item,
    id: Number(item.id),
    type: item.type === "Series" ? "Series" : "Movie",
    title: item.title || "Untitled",
    genre: item.genre || "",
    year: item.year || "",
    released: item.released ? String(item.released).slice(0, 10) : "",
    rating: Number(item.rating || 0),
    quality: item.quality || "HD",
    info: item.info || item.description || "",
    description: item.description || item.info || "",
    image,
    poster: image,
    videoUrl,
    downloadBase: item.downloadBase || item.download_base || "",
    featured: Boolean(item.featured),
    trending: Boolean(item.trending),
    seasons: Array.isArray(item.seasons) ? item.seasons : [],
    episodes: Number(item.episodes || 0),
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

// Builds FormData with only the fields the backend actually needs
function toFormData(values) {
  if (values instanceof FormData) return values;
  const formData = new FormData();

  // Text fields the backend reads
  if (values.type) formData.append("type", values.type);
  if (values.title) formData.append("title", values.title);
  if (values.genre) formData.append("genre", values.genre);
  if (values.year) formData.append("year", String(values.year));
  if (values.released) formData.append("released", String(values.released).slice(0, 10));
  if (values.rating !== undefined && values.rating !== "") formData.append("rating", String(values.rating));
  if (values.quality) formData.append("quality", values.quality);
  if (values.info || values.description) formData.append("info", values.info || values.description);
  if (values.downloadBase) formData.append("downloadBase", values.downloadBase);
  if (values.poster) formData.append("imageUrl", values.poster);
  if (values.videoUrl) formData.append("videoUrl", values.videoUrl);

  // Files
  if (values.posterFile instanceof File) formData.append("poster", values.posterFile);
  if (values.videoFile instanceof File) formData.append("video", values.videoFile);

  return formData;
}

function multipartConfig() {
  const cfg = adminConfig();
  return { ...cfg, headers: { ...cfg.headers, "Content-Type": "multipart/form-data" } };
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