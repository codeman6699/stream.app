// src/stores/myListStore.js
import { ref, watch } from "vue";

const KEY = "stream_store_my_list_v1";

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

const ids = ref(load());

watch(ids, (v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)); }
  catch { /* quota */ }
}, { deep: true });

export function useMyList() {
  const has = (id) => ids.value.includes(Number(id));
  const add = (id) => { if (!has(id)) ids.value.push(Number(id)); };
  const remove = (id) => { ids.value = ids.value.filter((x) => x !== Number(id)); };
  const clear = () => { ids.value = []; };
  return { ids, has, add, remove, clear };
}