<template>
  <div class="history-wrapper">
    <div class="bg-grid"></div>
    <Navbar />

    <main class="main-content">

      <!-- Page Header -->
      <div class="page-header animate-in">
        <div class="header-left">
          <div class="page-eyebrow">Laporan Aktivitas</div>
          <h1 class="page-title">Riwayat Workout</h1>
          <p class="page-sub">Semua sesi latihan yang telah kamu simpan</p>
        </div>
        <button @click="refreshData" class="btn-refresh" :class="{ spinning: loading }">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          Refresh
        </button>
      </div>

      <!-- Stats Strip -->
      <div class="stats-strip animate-in" style="animation-delay:0.06s">
        <div class="stat-item">
          <span class="stat-num">{{ totalSessions }}</span>
          <span class="stat-desc">Total Sesi</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num">{{ totalCalories.toLocaleString() }}</span>
          <span class="stat-desc">Total Kalori (kcal)</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num">{{ totalDuration }}<small>mnt</small></span>
          <span class="stat-desc">Total Durasi</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-num stat-num--accent">{{ avgCalories }}</span>
          <span class="stat-desc">Rata-rata / Sesi</span>
        </div>
      </div>

      <!-- Filter + Sort Bar -->
      <div class="filter-bar animate-in" style="animation-delay:0.1s">
        <div class="filter-tabs">
          <button
            v-for="f in filterOptions" :key="f.val"
            @click="filterBy = f.val"
            :class="['filter-tab', filterBy === f.val ? 'active' : '']"
          >
            {{ f.label }}
            <span class="filter-count" v-if="getFilterCount(f.val) > 0">{{ getFilterCount(f.val) }}</span>
          </button>
        </div>
        <div class="sort-group">
          <span class="sort-label">Urutkan</span>
          <div class="sort-tabs">
            <button v-for="s in sortOptions" :key="s.val"
              @click="sortBy = s.val"
              :class="['sort-tab', sortBy === s.val ? 'active' : '']">
              {{ s.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Two-col layout -->
      <div class="layout-grid animate-in" style="animation-delay:0.14s">

        <!-- LEFT: Session list -->
        <section class="panel panel--list">

          <div class="panel-header">
            <div class="panel-title-group">
              <h2 class="panel-title">{{ currentFilterLabel }}</h2>
              <span class="session-count">{{ filteredSortedHistory.length }} sesi</span>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="state-box">
            <div class="spinner"></div>
            <p>Memuat data...</p>
          </div>

          <!-- Empty -->
          <div v-else-if="filteredSortedHistory.length === 0" class="state-box">
            <div class="empty-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.25">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
              </svg>
            </div>
            <p class="empty-title">Tidak ada sesi untuk periode ini</p>
            <p class="empty-sub">Coba pilih filter lain atau mulai workout baru</p>
            <router-link to="/workout" class="btn-cta">Mulai Workout →</router-link>
          </div>

          <!-- Session Cards -->
          <div v-else class="session-list">

            <!-- Group by date -->
            <template v-for="group in groupedHistory" :key="group.dateKey">
              <div class="date-group-header">
                <span class="dg-label">{{ group.dateLabel }}</span>
                <span class="dg-line"></span>
                <span class="dg-total">{{ group.totalCalories }} kcal</span>
              </div>

              <div
                v-for="(session, idx) in group.sessions"
                :key="session.id || idx"
                class="session-card"
                :class="{ 'card--best': session.calories === maxCalories }"
                :style="{ animationDelay: (idx * 0.04) + 's' }"
              >
                <!-- Left: number + type icon -->
                <div class="sc-left">
                  <div class="sc-type-icon" :style="{ background: workoutTypeColor(session.workout_type) + '18', borderColor: workoutTypeColor(session.workout_type) + '40' }">
                    <span v-html="workoutTypeIcon(session.workout_type)"></span>
                  </div>
                </div>

                <!-- Center: main info -->
                <div class="sc-center">
                  <div class="sc-top">
                    <span class="sc-exercise">{{ session.exercise_name || 'Sesi Latihan' }}</span>
                    <span v-if="session.calories === maxCalories" class="sc-best-badge">★ Terbaik</span>
                  </div>
                  <div class="sc-meta">
                    <span class="sc-muscle" v-if="session.muscle_group">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 4v16M18 4v16M6 12h12"/></svg>
                      {{ session.muscle_group }}
                    </span>
                    <span class="sc-type" v-if="session.workout_type" :style="{ color: workoutTypeColor(session.workout_type) }">
                      {{ session.workout_type }}
                    </span>
                    <span class="sc-time">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      {{ formatTime(session.createdAt) }}
                    </span>
                  </div>
                  <!-- Progress bar -->
                  <div class="sc-bar-wrap">
                    <div class="sc-bar-track">
                      <div class="sc-bar-fill"
                        :style="{
                          width: Math.round((session.calories || 0) / maxCalories * 100) + '%',
                          background: workoutTypeColor(session.workout_type)
                        }"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Right: stats -->
                <div class="sc-right">
                  <div class="sc-stat">
                    <span class="sc-cal">{{ Math.round(session.calories || 0).toLocaleString() }}</span>
                    <span class="sc-cal-unit">kcal</span>
                  </div>
                  <div class="sc-dur" v-if="session.duration">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 3h6"/><path d="M12 3v2"/></svg>
                    {{ session.duration }} mnt
                  </div>
                  <button @click="deleteSession(session.id, session)" class="btn-del" title="Hapus sesi">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                </div>

              </div>
            </template>

          </div>
        </section>

        <!-- RIGHT: Sidebar -->
        <aside class="sidebar">

          <!-- Best Session -->
          <div class="sidebar-card card--best" v-if="bestSession">
            <div class="card-label">🏆 Sesi Terbaik</div>
            <div class="best-row">
              <span class="best-cal">{{ Math.round(bestSession.calories) }}</span>
              <span class="best-unit">kcal</span>
            </div>
            <div class="best-detail">
              <div class="best-detail-item">
                <span class="detail-key">Gerakan</span>
                <span class="detail-val">{{ bestSession.exercise_name || '—' }}</span>
              </div>
              <div class="best-detail-item">
                <span class="detail-key">Tanggal</span>
                <span class="detail-val">{{ formatDateShort(bestSession.createdAt) }}</span>
              </div>
              <div class="best-detail-item">
                <span class="detail-key">Durasi</span>
                <span class="detail-val">{{ bestSession.duration || '—' }} mnt</span>
              </div>
              <div class="best-detail-item" v-if="bestSession.muscle_group">
                <span class="detail-key">Otot</span>
                <span class="detail-val">{{ bestSession.muscle_group }}</span>
              </div>
            </div>
          </div>

          <!-- Today Summary -->
          <div class="sidebar-card card--today">
            <div class="card-label">📅 Hari Ini</div>
            <div class="today-row">
              <div class="today-stat">
                <span class="today-num">{{ todayCalories.toLocaleString() }}</span>
                <span class="today-unit">kcal</span>
              </div>
              <div class="today-sep"></div>
              <div class="today-stat">
                <span class="today-num">{{ todaySessions }}</span>
                <span class="today-unit">sesi</span>
              </div>
              <div class="today-sep"></div>
              <div class="today-stat">
                <span class="today-num">{{ todayDuration }}</span>
                <span class="today-unit">mnt</span>
              </div>
            </div>
            <div v-if="todaySessions === 0" class="today-empty">Belum ada sesi hari ini 💪</div>
          </div>

          <!-- Weekly Progress -->
          <div class="sidebar-card">
            <div class="card-label">📊 Minggu Ini</div>
            <div class="weekly-num">{{ weeklyCalories.toLocaleString() }} <span class="weekly-unit">kcal</span></div>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: Math.min(Math.round(weeklyCalories / weeklyTarget * 100), 100) + '%' }"></div>
            </div>
            <div class="progress-labels">
              <span class="pct-label">{{ Math.min(Math.round(weeklyCalories / weeklyTarget * 100), 100) }}% tercapai</span>
              <span class="target-label">Target {{ weeklyTarget.toLocaleString() }} kcal</span>
            </div>
            <div class="weekly-sessions-row">
              <div v-for="day in weekDays" :key="day.label" class="wd-item">
                <div class="wd-bar-wrap">
                  <div class="wd-bar" :style="{ height: day.height + 'px', background: day.isToday ? '#eab308' : day.calories > 0 ? 'rgba(234,179,8,0.4)' : 'rgba(255,255,255,0.06)' }"></div>
                </div>
                <span class="wd-label" :class="{ 'wd-today': day.isToday }">{{ day.label }}</span>
              </div>
            </div>
          </div>

          <!-- Chart -->
          <div class="sidebar-card card--chart" v-if="history.length > 0">
            <div class="card-header-row">
              <div class="card-label" style="margin-bottom:0">📈 Tren Kalori</div>
              <div class="range-tabs">
                <button v-for="r in ranges" :key="r.val"
                  @click="chartRange = r.val"
                  :class="['range-tab', chartRange === r.val ? 'active' : '']">
                  {{ r.label }}
                </button>
              </div>
            </div>
            <div class="chart-area">
              <Bar :data="chartData" :options="chartOptions" />
            </div>
          </div>

        </aside>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios"
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from "chart.js"
import Navbar from "../components/layout/navbar.vue"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const TYPE_COLORS = {
  Strength: '#60a5fa',
  Cardio  : '#34d399',
  HIIT    : '#f87171',
  Yoga    : '#a78bfa',
}

const TYPE_ICONS = {
  Strength: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12"/></svg>`,
  Cardio  : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  HIIT    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
}

export default {
  name: 'History',
  components: { Bar, Navbar },

  data() {
    return {
      history     : [],
      loading     : true,
      chartRange  : 7,
      sortBy      : 'date',
      filterBy    : 'all',
      weeklyTarget: 3000,

      filterOptions: [
        { val: 'all',       label: 'Semua'     },
        { val: 'today',     label: 'Hari Ini'  },
        { val: 'yesterday', label: 'Kemarin'   },
        { val: 'week',      label: 'Minggu Ini'},
        { val: 'month',     label: 'Bulan Ini' },
      ],
      ranges: [
        { label: '7',   val: 7   },
        { label: '14',  val: 14  },
        { label: 'All', val: 999 },
      ],
      sortOptions: [
        { label: 'Terbaru',  val: 'date'     },
        { label: 'Kalori',   val: 'calories' },
        { label: 'Durasi',   val: 'duration' },
      ],
    }
  },

  computed: {
    // ── Totals ──────────────────────────────────────────
    totalCalories() { return Math.round(this.history.reduce((s, h) => s + (h.calories || 0), 0)) },
    totalSessions()  { return this.history.length },
    totalDuration()  { return this.history.reduce((s, h) => s + (h.duration || 0), 0) },
    avgCalories()    { return this.totalSessions ? Math.round(this.totalCalories / this.totalSessions) : 0 },
    maxCalories()    { return Math.max(...this.history.map(h => h.calories || 0), 1) },

    bestSession() {
      if (!this.history.length) return null
      return [...this.history].sort((a, b) => (b.calories || 0) - (a.calories || 0))[0]
    },

    // ── Today stats ─────────────────────────────────────
    todayCalories() {
      const today = new Date().toDateString()
      return Math.round(this.history.filter(h => new Date(h.createdAt).toDateString() === today).reduce((s, h) => s + (h.calories || 0), 0))
    },
    todaySessions() {
      const today = new Date().toDateString()
      return this.history.filter(h => new Date(h.createdAt).toDateString() === today).length
    },
    todayDuration() {
      const today = new Date().toDateString()
      return this.history.filter(h => new Date(h.createdAt).toDateString() === today).reduce((s, h) => s + (h.duration || 0), 0)
    },

    // ── Weekly ───────────────────────────────────────────
    weeklyCalories() {
      const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return Math.round(this.history.filter(h => new Date(h.createdAt) >= oneWeekAgo).reduce((s, h) => s + (h.calories || 0), 0))
    },

    weekDays() {
      const now = new Date()
      const days = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']
      const result = []
      const maxCal = Math.max(...Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now); d.setDate(now.getDate() - (6 - i))
        return this.history.filter(h => new Date(h.createdAt).toDateString() === d.toDateString()).reduce((s, h) => s + (h.calories || 0), 0)
      }), 1)

      for (let i = 6; i >= 0; i--) {
        const d = new Date(now); d.setDate(now.getDate() - i)
        const cal = this.history.filter(h => new Date(h.createdAt).toDateString() === d.toDateString()).reduce((s, h) => s + (h.calories || 0), 0)
        result.push({
          label  : days[d.getDay()],
          calories: cal,
          height : Math.max(Math.round(cal / maxCal * 36), cal > 0 ? 4 : 2),
          isToday: i === 0,
        })
      }
      return result
    },

    // ── Filter ───────────────────────────────────────────
    filteredHistory() {
      const now   = new Date()
      const today = now.toDateString()

      const yesterday = new Date(now)
      yesterday.setDate(now.getDate() - 1)

      const weekAgo = new Date(now)
      weekAgo.setDate(now.getDate() - 7)

      return this.history.filter(h => {
        const d = new Date(h.createdAt)
        if (this.filterBy === 'today')     return d.toDateString() === today
        if (this.filterBy === 'yesterday') return d.toDateString() === yesterday.toDateString()
        if (this.filterBy === 'week')      return d >= weekAgo
        if (this.filterBy === 'month')     return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        return true
      })
    },

    filteredSortedHistory() {
      const list = [...this.filteredHistory]
      if (this.sortBy === 'calories') return list.sort((a, b) => (b.calories || 0) - (a.calories || 0))
      if (this.sortBy === 'duration') return list.sort((a, b) => (b.duration || 0) - (a.duration || 0))
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },

    // ── Group by date ────────────────────────────────────
    groupedHistory() {
      const groups = {}
      this.filteredSortedHistory.forEach(s => {
        const d    = new Date(s.createdAt)
        const key  = d.toDateString()
        if (!groups[key]) groups[key] = { dateKey: key, date: d, sessions: [], totalCalories: 0 }
        groups[key].sessions.push(s)
        groups[key].totalCalories += Math.round(s.calories || 0)
      })

      const now       = new Date()
      const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1)

      return Object.values(groups).map(g => ({
        ...g,
        totalCalories: Math.round(g.totalCalories),
        dateLabel: g.date.toDateString() === now.toDateString()
          ? 'Hari Ini'
          : g.date.toDateString() === yesterday.toDateString()
          ? 'Kemarin'
          : g.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      }))
    },

    currentFilterLabel() {
      return this.filterOptions.find(f => f.val === this.filterBy)?.label || 'Semua'
    },

    // ── Chart ────────────────────────────────────────────
    chartData() {
      const slice = [...this.history]
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .slice(-this.chartRange)
      return {
        labels: slice.map(h => new Date(h.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })),
        datasets: [{
          label: 'Kalori',
          data : slice.map(h => Math.round(h.calories || 0)),
          backgroundColor: slice.map((_, i) =>
            i === slice.length - 1 ? 'rgba(234,179,8,0.9)' : 'rgba(234,179,8,0.2)'
          ),
          borderColor : 'rgba(234,179,8,0.6)',
          borderWidth : 1,
          borderRadius: 4,
        }]
      }
    },

    chartOptions() {
      return {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0d1117',
            borderColor    : 'rgba(234,179,8,0.25)',
            borderWidth    : 1,
            titleColor     : '#eab308',
            bodyColor      : 'rgba(255,255,255,0.7)',
            callbacks: { label: ctx => ` ${ctx.parsed.y} kcal` }
          }
        },
        scales: {
          x: { ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 } }, grid: { display: false }, border: { color: 'rgba(255,255,255,0.06)' } },
          y: { ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { color: 'rgba(255,255,255,0.06)' } }
        }
      }
    },
  },

  methods: {
    workoutTypeColor(type) { return TYPE_COLORS[type] || '#eab308' },
    workoutTypeIcon(type)  { return TYPE_ICONS[type]  || TYPE_ICONS.Strength },

    getFilterCount(val) {
      const now       = new Date()
      const today     = now.toDateString()
      const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1)
      const weekAgo   = new Date(now); weekAgo.setDate(now.getDate() - 7)

      return this.history.filter(h => {
        const d = new Date(h.createdAt)
        if (val === 'today')     return d.toDateString() === today
        if (val === 'yesterday') return d.toDateString() === yesterday.toDateString()
        if (val === 'week')      return d >= weekAgo
        if (val === 'month')     return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        return false
      }).length
    },

    formatDate(d)      { if (!d) return '—'; return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) },
    formatDateShort(d) { if (!d) return '—'; return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) },
    formatTime(d)      { if (!d) return ''; return new Date(d).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) },

    async fetchHistory() {
      this.loading = true
      try {
        const res  = await axios.get(`${API_URL}/api/history`)
        this.history = res.data || []
      } catch (err) {
        console.warn('Gagal fetch history:', err.message)
      } finally {
        this.loading = false
      }
    },

    async refreshData() { await this.fetchHistory() },

    async deleteSession(id, session) {
      if (!confirm(`Hapus sesi "${session.exercise_name || 'ini'}"?`)) return
      try {
        if (id) await axios.delete(`${API_URL}/api/history/${id}`)
        this.history = this.history.filter(h => h.id !== id)
      } catch (err) {
        console.error('Gagal hapus:', err.message)
      }
    },
  },

  mounted() { this.fetchHistory() },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.history-wrapper { font-family: 'Barlow', sans-serif; min-height: 100vh; background: #080a0f; color: #fff; position: relative; overflow-x: hidden; }
.bg-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(234,179,8,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.025) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; z-index: 0; }
.main-content { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 48px 48px 100px; display: flex; flex-direction: column; gap: 20px; }
.animate-in { opacity: 0; transform: translateY(12px); animation: fadeUp 0.4s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

/* ── Header ── */
.page-header { display: flex; align-items: flex-end; justify-content: space-between; }
.page-eyebrow { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #eab308; margin-bottom: 6px; }
.page-title { font-family: 'Barlow Condensed', sans-serif; font-size: 2.8rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.03em; line-height: 1; }
.page-sub { margin-top: 6px; font-size: 0.83rem; color: rgba(255,255,255,0.3); }
.btn-refresh { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; background: transparent; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: rgba(255,255,255,0.4); font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s; }
.btn-refresh:hover { border-color: rgba(234,179,8,0.3); color: #eab308; }
.btn-refresh.spinning svg { animation: spin 0.7s linear infinite; }

/* ── Stats Strip ── */
.stats-strip { display: flex; align-items: center; background: #0d1117; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 0 32px; overflow: hidden; }
.stat-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 20px 16px; }
.stat-num { font-family: 'Barlow Condensed', sans-serif; font-size: 2rem; font-weight: 900; line-height: 1; color: #fff; }
.stat-num small { font-size: 1rem; opacity: 0.5; margin-left: 2px; }
.stat-num--accent { color: #eab308; }
.stat-desc { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); }
.stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.07); flex-shrink: 0; }

/* ── Filter Bar ── */
.filter-bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.filter-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
.filter-tab { display: flex; align-items: center; gap: 6px; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 999px; color: rgba(255,255,255,0.4); font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.filter-tab:hover { border-color: rgba(234,179,8,0.3); color: rgba(255,255,255,0.7); }
.filter-tab.active { background: rgba(234,179,8,0.12); border-color: rgba(234,179,8,0.4); color: #eab308; }
.filter-count { background: rgba(234,179,8,0.15); color: #eab308; font-size: 0.62rem; font-weight: 700; padding: 1px 6px; border-radius: 999px; }
.filter-tab:not(.active) .filter-count { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.3); }
.sort-group { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.sort-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); }
.sort-tabs { display: flex; gap: 3px; }
.sort-tab { padding: 6px 12px; background: transparent; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; color: rgba(255,255,255,0.3); font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: all 0.18s; }
.sort-tab:hover { color: rgba(255,255,255,0.6); }
.sort-tab.active { background: rgba(234,179,8,0.1); border-color: rgba(234,179,8,0.35); color: #eab308; }

/* ── Layout Grid ── */
.layout-grid { display: grid; grid-template-columns: 1fr 300px; gap: 20px; align-items: start; }

/* ── Panel ── */
.panel { background: #0d1117; border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; overflow: hidden; }
.panel-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px 14px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.panel-title-group { display: flex; align-items: baseline; gap: 10px; }
.panel-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.6); }
.session-count { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 999px; }

/* ── Date Group ── */
.date-group-header { display: flex; align-items: center; gap: 12px; padding: 12px 20px 8px; }
.dg-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); white-space: nowrap; }
.dg-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
.dg-total { font-family: 'Barlow Condensed', sans-serif; font-size: 0.85rem; font-weight: 700; color: rgba(234,179,8,0.6); white-space: nowrap; }

/* ── Session Card ── */
.session-list { padding: 0 12px 12px; display: flex; flex-direction: column; gap: 6px; }
.session-card { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; transition: all 0.2s; animation: rowIn 0.3s ease forwards; opacity: 0; }
@keyframes rowIn { to { opacity: 1; } }
.session-card:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1); transform: translateX(2px); }
.session-card.card--best { border-color: rgba(234,179,8,0.25); background: rgba(234,179,8,0.04); }

.sc-left { flex-shrink: 0; }
.sc-type-icon { width: 38px; height: 38px; border-radius: 10px; border: 1px solid; display: flex; align-items: center; justify-content: center; }

.sc-center { flex: 1; min-width: 0; }
.sc-top { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.sc-exercise { font-size: 0.88rem; font-weight: 700; color: rgba(255,255,255,0.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sc-best-badge { flex-shrink: 0; font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #eab308; background: rgba(234,179,8,0.12); border: 1px solid rgba(234,179,8,0.25); padding: 2px 7px; border-radius: 999px; }
.sc-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
.sc-muscle { display: flex; align-items: center; gap: 4px; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.35); }
.sc-type { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
.sc-time { display: flex; align-items: center; gap: 4px; font-size: 0.65rem; color: rgba(255,255,255,0.2); margin-left: auto; }
.sc-bar-wrap { display: flex; align-items: center; gap: 8px; }
.sc-bar-track { flex: 1; height: 3px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden; }
.sc-bar-fill { height: 100%; border-radius: 999px; transition: width 0.6s ease; opacity: 0.7; }

.sc-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
.sc-stat { display: flex; align-items: baseline; gap: 3px; }
.sc-cal { font-family: 'Barlow Condensed', sans-serif; font-size: 1.4rem; font-weight: 900; color: #eab308; line-height: 1; }
.sc-cal-unit { font-size: 0.62rem; color: rgba(255,255,255,0.3); }
.sc-dur { display: flex; align-items: center; gap: 3px; font-size: 0.65rem; color: rgba(255,255,255,0.25); }
.btn-del { width: 26px; height: 26px; background: transparent; border: 1px solid rgba(255,255,255,0.07); border-radius: 6px; color: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.18s; margin-top: 2px; }
.btn-del:hover { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.3); color: #ef4444; }

/* ── State boxes ── */
.state-box { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 64px 20px; color: rgba(255,255,255,0.25); }
.empty-title { font-size: 0.95rem; font-weight: 600; color: rgba(255,255,255,0.35); }
.empty-sub { font-size: 0.78rem; }
.btn-cta { margin-top: 8px; padding: 10px 24px; background: #eab308; border-radius: 8px; color: #000; font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.06em; text-decoration: none; transition: all 0.2s; }
.btn-cta:hover { background: #facc15; }

/* ── Sidebar ── */
.sidebar { display: flex; flex-direction: column; gap: 14px; }
.sidebar-card { background: #0d1117; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 18px 20px; }
.card-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.3); margin-bottom: 12px; }

/* Best */
.card--best { border-color: rgba(234,179,8,0.15); }
.best-row { display: flex; align-items: baseline; gap: 6px; margin-bottom: 14px; }
.best-cal { font-family: 'Barlow Condensed', sans-serif; font-size: 2.8rem; font-weight: 900; color: #eab308; line-height: 1; }
.best-unit { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.3); }
.best-detail { display: flex; flex-direction: column; gap: 8px; }
.best-detail-item { display: flex; justify-content: space-between; align-items: center; }
.detail-key { font-size: 0.68rem; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.08em; }
.detail-val { font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.6); max-width: 140px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Today */
.card--today { border-color: rgba(96,165,250,0.12); }
.today-row { display: flex; align-items: center; margin-bottom: 6px; }
.today-stat { flex: 1; text-align: center; }
.today-num { display: block; font-family: 'Barlow Condensed', sans-serif; font-size: 1.5rem; font-weight: 900; color: #fff; line-height: 1; }
.today-unit { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.25); }
.today-sep { width: 1px; height: 32px; background: rgba(255,255,255,0.07); }
.today-empty { font-size: 0.75rem; color: rgba(255,255,255,0.2); text-align: center; margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); }

/* Weekly */
.weekly-num { font-family: 'Barlow Condensed', sans-serif; font-size: 1.7rem; font-weight: 900; color: #fff; margin-bottom: 12px; line-height: 1; }
.weekly-unit { font-size: 0.9rem; color: rgba(255,255,255,0.3); }
.progress-track { height: 5px; background: rgba(255,255,255,0.07); border-radius: 999px; overflow: hidden; margin-bottom: 6px; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #ca8a04, #eab308); border-radius: 999px; transition: width 0.8s ease; }
.progress-labels { display: flex; justify-content: space-between; font-size: 0.62rem; color: rgba(255,255,255,0.25); margin-bottom: 14px; }
.weekly-sessions-row { display: flex; gap: 4px; align-items: flex-end; }
.wd-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.wd-bar-wrap { height: 40px; display: flex; align-items: flex-end; }
.wd-bar { width: 100%; min-height: 2px; border-radius: 3px 3px 0 0; transition: height 0.4s ease; }
.wd-label { font-size: 0.55rem; font-weight: 700; text-transform: uppercase; color: rgba(255,255,255,0.2); }
.wd-today { color: #eab308; }

/* Chart */
.card--chart .card-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.range-tabs { display: flex; gap: 3px; }
.range-tab { padding: 4px 9px; background: transparent; border: 1px solid rgba(255,255,255,0.08); border-radius: 5px; color: rgba(255,255,255,0.3); font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: all 0.18s; }
.range-tab:hover { color: rgba(255,255,255,0.6); }
.range-tab.active { background: rgba(234,179,8,0.1); border-color: rgba(234,179,8,0.35); color: #eab308; }
.chart-area { height: 180px; }

/* Shared */
.spinner { width: 32px; height: 32px; border: 2.5px solid rgba(234,179,8,0.15); border-top-color: #eab308; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Responsive */
@media (max-width: 1024px) { .layout-grid { grid-template-columns: 1fr; } .sidebar { display: grid; grid-template-columns: repeat(2, 1fr); } .card--chart { grid-column: 1 / -1; } }
@media (max-width: 768px) { .main-content { padding: 28px 16px 60px; } .stats-strip { flex-wrap: wrap; padding: 0 16px; } .stat-divider { display: none; } .stat-item { flex: 1 1 40%; border-bottom: 1px solid rgba(255,255,255,0.05); } .filter-bar { flex-direction: column; align-items: flex-start; } }
@media (max-width: 520px) { .sidebar { grid-template-columns: 1fr; } }
</style>