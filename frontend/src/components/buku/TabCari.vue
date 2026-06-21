<template>
  <div class="tab-cari">

    <!-- Search Box -->
    <div class="search-hero">
      <div class="search-box" :class="{ focused: isFocused, loading: isSearching }">
        <span class="search-icon-left">🔍</span>
        <input
          ref="searchInput"
          v-model="query"
          @keyup.enter="doSearch"
          @focus="isFocused = true"
          @blur="isFocused = false"
          placeholder="Cari gerakan, otot, nutrisi, MET..."
          class="search-input"
          :disabled="isSearching"
        />
        <button v-if="query" @click="clearSearch" class="btn-clear">✕</button>
        <button
          @click="doSearch"
          :disabled="!query.trim() || isSearching"
          class="btn-search"
        >
          <span v-if="isSearching" class="btn-spinner"></span>
          <span v-else>Cari</span>
        </button>
      </div>

      <!-- Suggestions -->
      <div class="suggestions" v-if="!hasSearched">
        <span class="sug-label">Coba cari:</span>
        <button
          v-for="sug in suggestions"
          :key="sug"
          @click="quickSearch(sug)"
          class="sug-chip"
        >{{ sug }}</button>
      </div>
    </div>

    <!-- Idle -->
    <div v-if="!hasSearched && !isSearching" class="idle-state">
      <div class="idle-icon">📖</div>
      <p class="idle-title">Tanya apapun tentang workout & nutrisi</p>
      <p class="idle-sub">Cari gerakan, cara latihan, tips nutrisi, atau kalori yang terbakar</p>
    </div>

    <!-- Loading -->
    <div v-else-if="isSearching" class="searching-state">
      <div class="search-anim">
        <div class="search-ring"></div>
        <div class="search-ring" style="animation-delay:0.15s"></div>
        <div class="search-ring" style="animation-delay:0.3s"></div>
      </div>
      <p class="searching-label">Mencari informasi yang relevan...</p>
    </div>

    <!-- Results -->
    <div v-else-if="hasSearched" class="results-wrap">

      <!-- Summary Card -->
      <div class="summary-card" :class="{ error: summaryError, fallback: summarySource === 'fallback' }">
        <div class="summary-top-bar"></div>
        <div class="summary-header">
          <div class="summary-badge" :class="summarySource">
            <span>{{ summarySource === 'ai' ? '✨' : '📋' }}</span>
            {{ summarySource === 'ai' ? 'AI Summary' : 'Quick Summary' }}
          </div>
          <span class="summary-query">{{ lastQuery }}</span>
        </div>

        <div v-if="summaryError" class="summary-error">
          <span>⚠️</span>
          <p>{{ summaryError }}</p>
        </div>

        <div v-else-if="summary" class="summary-text" v-html="formattedSummary"></div>

        <div v-else class="summary-empty">
          <div class="mini-spinner"></div>
          <p>Merangkum jawaban...</p>
        </div>

        <div class="summary-footer">
          <span class="src-count">{{ results.length }} dokumen ditemukan</span>
          <span class="src-types">{{ sourceTypes }}</span>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="results.length === 0" class="no-results">
        <div style="font-size:2.5rem;opacity:0.2">🔍</div>
        <p>Tidak ada hasil untuk "<strong>{{ lastQuery }}</strong>"</p>
        <p class="no-results-sub">Coba kata kunci lain seperti nama gerakan, muscle group, atau topik nutrisi</p>
      </div>

      <!-- Result Cards -->
      <div v-else>
        <p class="results-label">Dokumen Relevan</p>
        <div class="results-grid">
          <div
            v-for="(result, idx) in results"
            :key="result.id"
            class="result-card"
            :style="{ animationDelay: (idx * 0.06) + 's' }"
          >
            <div class="score-bar" :style="{ width: (result.score / results[0].score * 100) + '%', background: result.color }"></div>
            <div class="result-card-inner">
              <div class="result-header">
                <div class="result-icon" :style="{ color: result.color }">
                  <span v-if="result.svgIcon" v-html="result.svgIcon" class="result-svg"></span>
                  <span v-else class="result-svg-fallback">{{ typeEmoji(result.type) }}</span>
                </div>
                <div class="result-meta">
                  <div class="result-type-badge" :style="typeBadgeStyle(result.type)">{{ typeLabel(result.type) }}</div>
                  <h3 class="result-title">{{ result.title }}</h3>
                </div>
                <div class="result-score">{{ (result.score * 100).toFixed(0) }}%</div>
              </div>
              <div class="result-tags">
                <span v-for="tag in result.tags" :key="tag" class="result-tag">{{ tag }}</span>
              </div>
              <p class="result-snippet">{{ getSnippet(result) }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { search, formatForLLM, buildFallbackSummary } from '../../services/irService.js'

const API_URL        = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`
export default {
  name: 'TabCari',

  data() {
    return {
      query       : '',
      lastQuery   : '',
      results     : [],
      summary     : '',
      summaryError: '',
      summarySource: 'ai',   // 'ai' | 'fallback'
      isSearching : false,
      hasSearched : false,
      isFocused   : false,
      useBackend: false,

      suggestions: [
        'Cara push up yang benar',
        'Kalori saya hari ini',
        'Otot dada latihannya apa',
        'Jenis latihan yang telah saya lakukan minggu ini apa?',
        'Latihan tanpa alat'
      ]
    }
  },

  mounted() {
  // Cek token dengan kedua key yang umum dipakai
  const token = localStorage.getItem('calsio_token') || localStorage.getItem('access_token')
  this.useBackend = !!token
},

  computed: {
    sourceTypes() {
      const types = [...new Set(this.results.map(r => this.typeLabel(r.type)))]
      return types.join(', ')
    },

    // Render newline sebagai <br> dan bullet • sebagai list item
    formattedSummary() {
      if (!this.summary) return ''
      return this.summary
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n(\d+\.\s)/g, '<br><strong>$1</strong>')
        .replace(/\n/g, '<br>')
    }
  },

  methods: {
// ── Ganti doSearch() ─────────────────────────────────
async doSearch() {
  const q = this.query.trim()
  if (!q || this.isSearching) return

  this.isSearching   = true
  this.hasSearched   = false
  this.summary       = ''
  this.summaryError  = ''
  this.summarySource = 'ai'
  this.lastQuery     = q

  try {
    if (this.useBackend) {
      await this.doBackendSearch(q)
    } else {
      // Fallback frontend-only (user belum login)
      const searchResults = search(q, 5)
      this.results     = searchResults
      this.hasSearched = true
      this.isSearching = false

      if (searchResults.length > 0) {
        await this.generateAnswer(searchResults, q)
      } else {
        this.summary       = `Tidak ditemukan informasi untuk "${q}".`
        this.summarySource = 'fallback'
      }
    }
  } catch (err) {
    console.error('Search error:', err)
    this.isSearching  = false
    this.hasSearched  = true
    this.summaryError = 'Terjadi kesalahan saat mencari. Coba lagi.'
  }
},

// ── Tambah doBackendSearch() ──────────────────────────
async doBackendSearch(q) {
  try {
    const token = localStorage.getItem('calsio_token') || localStorage.getItem('access_token')

    const response = await fetch(`${API_URL}/api/rag/chat`, {
      method : 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query: q })
    })

    this.isSearching = false
    this.hasSearched = true

    if (!response.ok) {
      // 401 = tidak login, fallback ke frontend-only
      if (response.status === 401) {
        this.useBackend = false
        const searchResults = search(q, 5)
        this.results = searchResults
        await this.generateAnswer(searchResults, q)
        return
      }
      throw new Error(`Backend error ${response.status}`)
    }

    const data = await response.json()

    // Tampilkan source cards jika ada
    this.results = (data.sources || []).map(s => ({
      id     : s.id,
      type   : s.type,
      title  : s.title,
      score  : s.score / 100,
      color  : this.typeColor(s.type),
      tags   : [this.typeLabel(s.type)],
      svgIcon: null,
      raw    : {},
    }))

    this.summary       = data.answer || 'Tidak ada jawaban.'
    this.summarySource = 'ai'

  } catch (err) {
    console.warn('Backend error, fallback ke frontend:', err)
    this.isSearching = false
    this.hasSearched = true

    const searchResults = search(q, 5)
    this.results = searchResults
    await this.generateAnswer(searchResults, q)
  }
},

// ── Tambah helper typeColor() ─────────────────────────
typeColor(type) {
  return {
    exercise: '#eab308',
    muscle  : '#60a5fa',
    nutrisi : '#22c55e',
    makro   : '#22c55e',
    met     : '#a78bfa',
  }[type] || 'rgba(255,255,255,0.3)'
},

    async generateAnswer(results, query) {
      // Coba Gemini dulu, fallback kalau gagal
      if (GEMINI_API_KEY) {
        const ok = await this.callGemini(results, query)
        if (ok) return
      }
      // Fallback ke summary lokal dari irService
      this.summary      = buildFallbackSummary(results, query)
      this.summarySource = 'fallback'
    },

    async callGemini(results, query) {
      try {
        const prompt = formatForLLM(results, query)

        const response = await fetch(GEMINI_URL, {
          method : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify({
            contents        : [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 600 }
          })
        })

        // Rate limit / quota habis
        if (response.status === 429 || response.status === 503) {
          console.warn('Gemini quota/rate limit, pakai fallback')
          return false
        }

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}))
          const msg     = errData.error?.message || ''
          if (msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('exceeded')) {
            return false
          }
          console.warn('Gemini error:', msg)
          return false
        }

        const data   = await response.json()
        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text

        if (!answer) return false

        this.summary      = answer.trim()
        this.summarySource = 'ai'
        return true

      } catch (err) {
        console.warn('Gemini fetch error:', err)
        return false
      }
    },

    quickSearch(sug) {
      this.query = sug
      this.$nextTick(() => this.doSearch())
    },

    clearSearch() {
      this.query       = ''
      this.hasSearched = false
      this.results     = []
      this.summary     = ''
      this.summaryError = ''
      this.$refs.searchInput.focus()
    },

getSnippet(result) {
  const raw = result.raw
  if (!raw) return result.title || ''
  if (result.type === 'exercise') return raw.desc || ''
  if (result.type === 'muscle')   return raw.desc || ''
  if (result.type === 'nutrisi')  return raw.items?.slice(0, 2).join(' • ') || ''
  if (result.type === 'makro')    return raw.desc || ''
  if (result.type === 'met')      return `MET ${raw.met} • ${raw.category} • Intensitas ${raw.intensity} • ±${Math.round(raw.met * 70 * 0.5)} kcal/30 mnt (70kg)`
  return ''
},

    typeEmoji(type) {
      return { exercise: '🏋️', muscle: '💪', nutrisi: '🥗', makro: '🍽️', met: '📊' }[type] || '📄'
    },

    typeLabel(type) {
      return {
        exercise: 'Gerakan',
        muscle  : 'Muscle Group',
        nutrisi : 'Nutrisi',
        makro   : 'Makronutrien',
        met     : 'Tabel MET'
      }[type] || type
    },

    typeBadgeStyle(type) {
      const bg   = { exercise: 'rgba(234,179,8,0.15)', muscle: 'rgba(96,165,250,0.15)', nutrisi: 'rgba(34,197,94,0.15)', makro: 'rgba(34,197,94,0.15)', met: 'rgba(168,139,250,0.15)' }
      const text = { exercise: '#eab308', muscle: '#60a5fa', nutrisi: '#22c55e', makro: '#22c55e', met: '#a78bfa' }
      return { background: bg[type] || 'rgba(255,255,255,0.08)', color: text[type] || 'rgba(255,255,255,0.5)' }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

.tab-cari { display: flex; flex-direction: column; gap: 24px; }

/* Search Hero */
.search-hero { display: flex; flex-direction: column; gap: 14px; }
.search-box {
  display: flex; align-items: center;
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px; overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-box.focused { border-color: rgba(234,179,8,0.5); box-shadow: 0 0 0 3px rgba(234,179,8,0.08); }
.search-box.loading { border-color: rgba(234,179,8,0.3); }
.search-icon-left { padding: 0 14px; font-size: 1rem; opacity: 0.4; flex-shrink: 0; }
.search-input {
  flex: 1; padding: 16px 8px;
  background: transparent; border: none; outline: none;
  color: #fff; font-family: 'Barlow', sans-serif; font-size: 1rem;
}
.search-input::placeholder { color: rgba(255,255,255,0.2); }
.search-input:disabled { opacity: 0.5; }
.btn-clear {
  padding: 0 12px; background: transparent; border: none;
  color: rgba(255,255,255,0.25); font-size: 0.8rem; cursor: pointer;
  transition: color 0.2s;
}
.btn-clear:hover { color: rgba(255,255,255,0.6); }
.btn-search {
  padding: 0 24px; height: 54px;
  background: #eab308; border: none;
  color: #000; font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.95rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.08em;
  cursor: pointer; transition: background 0.2s;
  display: flex; align-items: center; gap: 8px; flex-shrink: 0;
}
.btn-search:hover:not(:disabled) { background: #facc15; }
.btn-search:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(0,0,0,0.3);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

/* Suggestions */
.suggestions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.sug-label { font-size: 0.72rem; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.08em; flex-shrink: 0; }
.sug-chip {
  padding: 5px 12px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px; color: rgba(255,255,255,0.4);
  font-size: 0.78rem; font-weight: 500; cursor: pointer; transition: all 0.2s;
}
.sug-chip:hover { background: rgba(234,179,8,0.08); border-color: rgba(234,179,8,0.3); color: #eab308; }

/* Idle */
.idle-state {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 80px 20px; text-align: center;
}
.idle-icon { font-size: 3.5rem; opacity: 0.15; }
.idle-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.3); }
.idle-sub { font-size: 0.82rem; color: rgba(255,255,255,0.2); max-width: 400px; line-height: 1.6; }

/* Searching */
.searching-state { display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 80px 20px; }
.search-anim { display: flex; gap: 8px; }
.search-ring {
  width: 12px; height: 12px;
  background: #eab308; border-radius: 50%;
  animation: pulse-dot 0.9s ease-in-out infinite;
}
@keyframes pulse-dot { 0%, 100% { transform: scale(0.5); opacity: 0.3; } 50% { transform: scale(1); opacity: 1; } }
.searching-label { font-size: 0.85rem; color: rgba(255,255,255,0.35); }

/* Results */
.results-wrap { display: flex; flex-direction: column; gap: 20px; }

/* Summary Card */
.summary-card {
  background: #0d1117;
  border: 1px solid rgba(234,179,8,0.2);
  border-radius: 18px; padding: 24px;
  position: relative; overflow: hidden;
  box-shadow: 0 0 40px rgba(234,179,8,0.05);
}
.summary-card.error    { border-color: rgba(239,68,68,0.2); }
.summary-card.fallback { border-color: rgba(96,165,250,0.2); }
.summary-card.fallback .summary-top-bar { background: linear-gradient(90deg, transparent, #60a5fa, transparent); }
.summary-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, #eab308, transparent);
}
.summary-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; gap: 12px; }
.summary-badge {
  display: flex; align-items: center; gap: 6px;
  background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.25);
  border-radius: 999px; padding: 5px 12px;
  font-size: 0.72rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em; color: #eab308;
  flex-shrink: 0;
}
.summary-badge.fallback { background: rgba(96,165,250,0.1); border-color: rgba(96,165,250,0.25); color: #60a5fa; }
.summary-query { font-size: 0.82rem; color: rgba(255,255,255,0.3); font-style: italic; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.summary-text {
  font-size: 0.92rem; color: rgba(255,255,255,0.75);
  line-height: 1.8;
  border-left: 3px solid rgba(234,179,8,0.4);
  padding-left: 16px;
}
.summary-error { display: flex; gap: 10px; align-items: flex-start; font-size: 0.85rem; color: #fca5a5; line-height: 1.6; }
.summary-empty { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.3); font-size: 0.82rem; }
.mini-spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(234,179,8,0.2);
  border-top-color: #eab308;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.summary-footer {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 16px; padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.src-count { font-size: 0.72rem; color: rgba(255,255,255,0.25); }
.src-types { font-size: 0.72rem; color: rgba(234,179,8,0.5); }

/* No results */
.no-results { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 60px; text-align: center; color: rgba(255,255,255,0.35); font-size: 0.88rem; }
.no-results strong { color: rgba(255,255,255,0.6); }
.no-results-sub { font-size: 0.78rem; color: rgba(255,255,255,0.2); }

/* Result cards */
.results-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.25); margin-bottom: 10px; }
.results-grid { display: flex; flex-direction: column; gap: 10px; }
.result-card {
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;
  animation: slideIn 0.3s ease both;
  opacity: 0;
}
.result-card:hover { border-color: rgba(255,255,255,0.15); transform: translateX(4px); }
@keyframes slideIn { to { opacity: 1; } }
.score-bar { height: 3px; opacity: 0.6; transition: width 0.5s ease; }
.result-card-inner { padding: 16px 18px; }
.result-header { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 10px; }
.result-icon { width: 44px; height: 44px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.result-svg { display: flex; align-items: center; justify-content: center; opacity: 0.7; }
.result-svg :deep(svg) { width: 32px; height: 32px; }
.result-svg-fallback { font-size: 1.5rem; line-height: 1; }
.result-meta { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.result-type-badge { display: inline-block; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 8px; border-radius: 4px; align-self: flex-start; }
.result-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.05rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #fff; }
.result-score { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 800; color: rgba(255,255,255,0.2); flex-shrink: 0; }
.result-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
.result-tag { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.35); }
.result-snippet { font-size: 0.82rem; color: rgba(255,255,255,0.45); line-height: 1.6; }

@keyframes spin { to { transform: rotate(360deg); } }
</style>