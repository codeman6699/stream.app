import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  fetchPopularMovies,
  fetchPopularSeries,
  fetchTrendingMovies,
  fetchNowPlayingMovies,
} from '@/services/tmdb'

export const useContentStore = defineStore('content', () => {
  const movies = ref([])
  const series = ref([])
  const trending = ref([])
  const nowPlaying = ref([])
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref(null)

  async function loadContent() {
    if (loaded.value || loading.value) return
    loading.value = true
    error.value = null
    try {
      const [popMovies, popSeries, trendMovies, nowMovies] = await Promise.all([
        fetchPopularMovies(1),
        fetchPopularSeries(1),
        fetchTrendingMovies(1),
        fetchNowPlayingMovies(1),
      ])
      movies.value = popMovies
      series.value = popSeries
      trending.value = trendMovies
      nowPlaying.value = nowMovies
      loaded.value = true
    } catch (e) {
      error.value = e.message
      console.error('TMDB load failed:', e)
    } finally {
      loading.value = false
    }
  }

  // Compatible with your original HomeView.vue's usage of `state.movies[4]` etc.
  const state = computed(() => ({
    movies: movies.value,
    series: series.value,
  }))

  // Compatible with your original `stats` usage
  const stats = computed(() => ({
    totalMovies: movies.value.length,
    totalSeries: series.value.length,
  }))

  // Compatible with your original BrowseView.vue's `allContent`
  const allContent = computed(() => [...movies.value, ...series.value])

  return {
    movies, series, trending, nowPlaying,
    loading, loaded, error,
    loadContent,
    state, stats, allContent,
  }
})