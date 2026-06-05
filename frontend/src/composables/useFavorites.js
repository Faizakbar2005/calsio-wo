// composables/useFavorites.js
// Favorit gerakan — data disimpan di backend /api/favorites
// Usage: const { favorites, isFavorite, toggleFavorite, loading } = useFavorites()

import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Cache global agar tidak re-fetch tiap komponen mount
const _favorites = ref([])   // array of exercise_name strings
const _loaded    = ref(false)

export function useFavorites() {
  const loading = ref(false)
  const error   = ref(null)

  async function fetchFavorites() {
    if (_loaded.value) return
    loading.value = true
    try {
      const res = await axios.get(`${API_URL}/api/favorites`)
      _favorites.value = (res.data || []).map(f => f.exercise_name)
      _loaded.value = true
    } catch (err) {
      console.warn('Gagal fetch favorites:', err.message)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function isFavorite(exerciseName) {
    return _favorites.value.includes(exerciseName)
  }

  async function toggleFavorite(exerciseName) {
    const wasFav = isFavorite(exerciseName)
    // Optimistic update
    if (wasFav) {
      _favorites.value = _favorites.value.filter(n => n !== exerciseName)
    } else {
      _favorites.value = [..._favorites.value, exerciseName]
    }

    try {
      if (wasFav) {
        await axios.delete(`${API_URL}/api/favorites/${encodeURIComponent(exerciseName)}`)
      } else {
        await axios.post(`${API_URL}/api/favorites`, { exercise_name: exerciseName })
      }
    } catch (err) {
      // Revert on failure
      if (wasFav) {
        _favorites.value = [..._favorites.value, exerciseName]
      } else {
        _favorites.value = _favorites.value.filter(n => n !== exerciseName)
      }
      console.error('Gagal toggle favorite:', err.message)
      error.value = err.message
    }
  }

  onMounted(() => { fetchFavorites() })

  return {
    favorites : _favorites,
    loading,
    error,
    isFavorite,
    toggleFavorite,
    fetchFavorites,
  }
}