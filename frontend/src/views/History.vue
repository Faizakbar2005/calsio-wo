<template>
  <div class="history-wrapper">
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>

    <Navbar />

    <main class="main-content">

      <!-- Header -->
      <div class="page-header animate-in" style="animation-delay:0s">
        <div>
          <h1 class="page-title">📋 Riwayat Workout</h1>
          <p class="page-sub">Semua sesi latihan yang sudah kamu selesaikan</p>
        </div>
        <button @click="refreshData" class="btn-refresh" :class="{ spinning: loading }">
          ↻ Refresh
        </button>
      </div>

      <!-- Summary Stats -->
      <div class="stats-row animate-in" style="animation-delay:0.08s">

        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(234,179,8,0.12);color:#eab308">🔥</div>
          <div class="stat-info">
            <span class="stat-value">{{ totalCalories.toLocaleString() }}</span>
            <span class="stat-label">Total Kalori</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(34,197,94,0.12);color:#22c55e">📅</div>
          <div class="stat-info">
            <span class="stat-value">{{ totalSessions }}</span>
            <span class="stat-label">Total Sesi</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(96,165,250,0.12);color:#60a5fa">⏱</div>
          <div class="stat-info">
            <span class="stat-value">{{ totalDuration }}<small>min</small></span>
            <span class="stat-label">Total Durasi</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:rgba(168,139,250,0.12);color:#a78bfa">📈</div>
          <div class="stat-info">
            <span class="stat-value">{{ avgCalories }}</span>
            <span class="stat-label">Rata-rata Kalori</span>
          </div>
        </div>

      </div>

      <!-- Chart + Filter Row -->
      <div class="content-grid animate-in" style="animation-delay:0.15s">

        <!-- Chart Card -->
        <div class="card chart-card">
          <div class="card-top-bar"></div>
          <div class="card-header-row">
            <h3 class="card-title">Tren Kalori Terbakar</h3>
            <div class="chart-range-tabs">
              <button
                v-for="r in ranges"
                :key="r.val"
                @click="chartRange = r.val"
                :class="['range-btn', chartRange === r.val ? 'active' : '']"
              >{{ r.label }}</button>
            </div>
          </div>

          <div v-if="loading" class="chart-loading">
            <div class="spinner"></div>
          </div>

          <div v-else-if="history.length === 0" class="chart-empty">
            <div style="font-size:2.5rem;opacity:0.2">📊</div>
            <p>Belum ada data</p>
          </div>

          <div v-else class="chart-wrap">
            <Bar :data="chartData" :options="chartOptions" />
          </div>
        </div>

        <!-- Best Session Card -->
        <div class="card best-card">
          <div class="card-top-bar" style="background:linear-gradient(90deg,transparent,rgba(234,179,8,0.8),transparent)"></div>
          <h3 class="card-title">🏆 Sesi Terbaik</h3>

          <div v-if="bestSession" class="best-content">
            <div class="best-kcal">
              <span class="best-num">{{ bestSession.calories }}</span>
              <span class="best-unit">kcal</span>
            </div>
            <div class="best-meta">
              <div class="best-meta-item">
                <span class="bm-label">Durasi</span>
                <span class="bm-val">{{ bestSession.duration }} menit</span>
              </div>
              <div class="best-meta-item">
                <span class="bm-label">Tanggal</span>
                <span class="bm-val">{{ formatDate(bestSession.createdAt) }}</span>
              </div>
            </div>
            <div class="best-badge">Rekor Terbaikmu 🔥</div>
          </div>

          <div v-else class="chart-empty">
            <p style="color:rgba(255,255,255,0.25);font-size:0.85rem">Belum ada sesi</p>
          </div>

          <!-- Weekly Progress -->
          <div class="weekly-section" v-if="weeklyCalories > 0">
            <div class="card-header-row" style="margin-bottom:12px">
              <span class="card-title" style="font-size:0.8rem">Minggu Ini</span>
              <span class="weekly-val">{{ weeklyCalories }} kcal</span>
            </div>
            <div class="weekly-bar-track">
              <div class="weekly-bar-fill" :style="{ width: Math.min(weeklyCalories / weeklyTarget * 100, 100) + '%' }"></div>
            </div>
            <div class="weekly-labels">
              <span>0</span>
              <span>Target {{ weeklyTarget }} kcal</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Session List -->
      <div class="sessions-section animate-in" style="animation-delay:0.22s">
        <div class="sessions-header">
          <h3 class="card-title" style="color:rgba(255,255,255,0.6)">Semua Sesi</h3>
          <div class="sort-row">
            <span class="sort-label">Urutkan:</span>
            <button
              v-for="s in sortOptions"
              :key="s.val"
              @click="sortBy = s.val"
              :class="['sort-btn', sortBy === s.val ? 'active' : '']"
            >{{ s.label }}</button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="sessions-loading">
          <div class="spinner"></div>
          <p>Memuat riwayat...</p>
        </div>

        <!-- Empty -->
        <div v-else-if="sortedHistory.length === 0" class="sessions-empty">
          <div class="empty-icon">🏃</div>
          <p>Belum ada sesi workout</p>
          <p class="empty-sub">Mulai latihan pertamamu sekarang!</p>
          <router-link to="/workout" class="btn-start">Mulai Workout 🔥</router-link>
        </div>

        <!-- List -->
        <div v-else class="session-list">
          <div
            v-for="(session, idx) in sortedHistory"
            :key="session.id || idx"
            class="session-item"
            :style="{ animationDelay: (idx * 0.04) + 's' }"
          >
            <!-- Left: rank / index -->
            <div class="session-rank" :class="idx === 0 && sortBy === 'calories' ? 'gold' : ''">
              {{ idx === 0 && sortBy === 'calories' ? '🏆' : `#${idx + 1}` }}
            </div>

            <!-- Center: info -->
            <div class="session-info">
              <div class="session-date">{{ formatDate(session.createdAt) }}</div>
              <div class="session-duration">⏱ {{ session.duration || '—' }} menit</div>
            </div>

            <!-- Right: calories -->
            <div class="session-right">
              <span class="session-cal">{{ session.calories }}</span>
              <span class="session-cal-unit">kcal</span>
              <div class="session-bar-wrap">
                <div
                  class="session-bar"
                  :style="{ width: (session.calories / maxCalories * 100) + '%' }"
                ></div>
              </div>
            </div>

            <!-- Delete -->
            <button
              @click="deleteSession(session.id, idx)"
              class="btn-delete"
              title="Hapus sesi"
            >✕</button>

          </div>
        </div>

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

export default {
  name: 'History',
  components: { Bar, Navbar },

  data() {
    return {
      history: [],
      loading: true,
      chartRange: 7,
      sortBy: 'date',
      weeklyTarget: 3000,

      ranges: [
        { label: '7 Sesi', val: 7 },
        { label: '14 Sesi', val: 14 },
        { label: 'Semua', val: 999 },
      ],
      sortOptions: [
        { label: 'Terbaru', val: 'date' },
        { label: 'Kalori ↓', val: 'calories' },
        { label: 'Durasi ↓', val: 'duration' },
      ]
    }
  },

  computed: {
    totalCalories() {
      return this.history.reduce((s, h) => s + (h.calories || 0), 0)
    },
    totalSessions() {
      return this.history.length
    },
    totalDuration() {
      return this.history.reduce((s, h) => s + (h.duration || 0), 0)
    },
    avgCalories() {
      if (!this.history.length) return 0
      return Math.round(this.totalCalories / this.history.length)
    },
    maxCalories() {
      return Math.max(...this.history.map(h => h.calories || 0), 1)
    },
    bestSession() {
      if (!this.history.length) return null
      return [...this.history].sort((a, b) => (b.calories || 0) - (a.calories || 0))[0]
    },
    weeklyCalories() {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return this.history
        .filter(h => new Date(h.createdAt) >= oneWeekAgo)
        .reduce((s, h) => s + (h.calories || 0), 0)
    },
    sortedHistory() {
      const list = [...this.history]
      if (this.sortBy === 'calories') return list.sort((a, b) => (b.calories || 0) - (a.calories || 0))
      if (this.sortBy === 'duration') return list.sort((a, b) => (b.duration || 0) - (a.duration || 0))
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
    chartData() {
      const slice = [...this.history]
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .slice(-this.chartRange)

      return {
        labels: slice.map((_, i) => `Sesi ${i + 1}`),
        datasets: [{
          label: 'Kalori',
          data: slice.map(h => h.calories || 0),
          backgroundColor: slice.map((h, i) =>
            i === slice.length - 1 ? '#eab308' : 'rgba(234,179,8,0.25)'
          ),
          borderColor: slice.map((h, i) =>
            i === slice.length - 1 ? '#facc15' : 'rgba(234,179,8,0.5)'
          ),
          borderWidth: 1,
          borderRadius: 6,
        }]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0d1117',
            borderColor: 'rgba(234,179,8,0.3)',
            borderWidth: 1,
            titleColor: '#eab308',
            bodyColor: '#fff',
            callbacks: { label: ctx => ` ${ctx.parsed.y} kcal` }
          }
        },
        scales: {
          x: {
            ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 11 } },
            grid: { display: false },
            border: { color: 'rgba(255,255,255,0.07)' }
          },
          y: {
            ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 11 } },
            grid: { color: 'rgba(255,255,255,0.04)' },
            border: { color: 'rgba(255,255,255,0.07)' }
          }
        }
      }
    }
  },

  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '—'
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    },
    async fetchHistory() {
      this.loading = true
      try {
        const res = await axios.get(`${API_URL}/api/history`)
        this.history = res.data || []
      } catch (err) {
        console.warn('Gagal fetch history:', err.message)
      } finally {
        this.loading = false
      }
    },
    async refreshData() {
      await this.fetchHistory()
    },
    async deleteSession(id, idx) {
      if (!confirm('Hapus sesi ini?')) return
      try {
        if (id) {
          await axios.delete(`${API_URL}/api/history/${id}`)
        }
        this.history.splice(
          this.history.findIndex((_, i) => i === idx), 1
        )
      } catch (err) {
        console.warn('Gagal hapus:', err.message)
        // Tetap hapus dari UI meski API gagal
        this.history.splice(idx, 1)
      }
    }
  },

  mounted() {
    this.fetchHistory()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.history-wrapper {
  font-family: 'Barlow', sans-serif;
  min-height: 100vh;
  background: #080a0f;
  color: #fff;
  position: relative;
  overflow-x: hidden;
}

.bg-grid {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(234,179,8,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(234,179,8,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none; z-index: 0;
}
.bg-glow {
  position: fixed; bottom: -200px; left: -100px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}

/* Main */
.main-content {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto;
  padding: 40px 40px 80px;
  display: flex; flex-direction: column; gap: 28px;
}

/* Header */
.page-header { display: flex; align-items: flex-end; justify-content: space-between; }
.page-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.6rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.04em; line-height: 1;
}
.page-sub { margin-top: 8px; font-size: 0.9rem; color: rgba(255,255,255,0.35); }

.btn-refresh {
  padding: 10px 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  color: rgba(255,255,255,0.5);
  font-family: 'Barlow', sans-serif;
  font-size: 0.85rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  display: inline-block;
}
.btn-refresh:hover { border-color: rgba(234,179,8,0.3); color: #eab308; }
.btn-refresh.spinning { animation: spin 0.8s linear infinite; }

/* Stats */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.stat-card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 18px;
  display: flex; align-items: center; gap: 14px;
  transition: border-color 0.2s, transform 0.2s;
}
.stat-card:hover { border-color: rgba(234,179,8,0.2); transform: translateY(-2px); }
.stat-icon {
  width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
}
.stat-info { display: flex; flex-direction: column; gap: 2px; }
.stat-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.6rem; font-weight: 900; color: #fff; line-height: 1;
}
.stat-value small { font-size: 0.85rem; opacity: 0.5; margin-left: 2px; }
.stat-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.35); }

/* Content Grid */
.content-grid { display: grid; grid-template-columns: 1fr 320px; gap: 16px; }

/* Cards */
.card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; padding: 24px; position: relative; overflow: hidden;
}
.card-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent);
}
.card-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.card-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.95rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5);
}

/* Chart */
.chart-range-tabs { display: flex; gap: 4px; }
.range-btn {
  padding: 5px 12px;
  background: transparent; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px; color: rgba(255,255,255,0.35);
  font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;
  cursor: pointer; transition: all 0.2s;
}
.range-btn:hover { color: rgba(255,255,255,0.6); }
.range-btn.active { background: rgba(234,179,8,0.12); border-color: rgba(234,179,8,0.4); color: #eab308; }
.chart-wrap { height: 220px; }
.chart-loading, .chart-empty {
  height: 220px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 10px;
  color: rgba(255,255,255,0.25); font-size: 0.85rem;
}

/* Best Session */
.best-content { display: flex; flex-direction: column; gap: 16px; }
.best-kcal { display: flex; align-items: baseline; gap: 8px; }
.best-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 3.5rem; font-weight: 900; color: #eab308; line-height: 1;
}
.best-unit { font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; color: rgba(255,255,255,0.4); }

.best-meta { display: flex; flex-direction: column; gap: 8px; }
.best-meta-item { display: flex; justify-content: space-between; align-items: center; }
.bm-label { font-size: 0.72rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.08em; }
.bm-val { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 700; color: rgba(255,255,255,0.7); }

.best-badge {
  display: inline-block;
  background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.3);
  border-radius: 999px; padding: 6px 14px;
  font-size: 0.75rem; font-weight: 700; color: #eab308;
  text-transform: uppercase; letter-spacing: 0.06em;
  text-align: center;
}

.weekly-section { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.06); }
.weekly-val { font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 800; color: #eab308; }
.weekly-bar-track { height: 8px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden; margin-bottom: 6px; }
.weekly-bar-fill { height: 100%; background: linear-gradient(90deg, #ca8a04, #eab308); border-radius: 999px; transition: width 0.8s ease; }
.weekly-labels { display: flex; justify-content: space-between; font-size: 0.68rem; color: rgba(255,255,255,0.25); }

/* Sessions */
.sessions-section { display: flex; flex-direction: column; gap: 14px; }
.sessions-header { display: flex; align-items: center; justify-content: space-between; }

.sort-row { display: flex; align-items: center; gap: 6px; }
.sort-label { font-size: 0.72rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.08em; }
.sort-btn {
  padding: 5px 12px;
  background: transparent; border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px; color: rgba(255,255,255,0.3);
  font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;
  cursor: pointer; transition: all 0.2s;
}
.sort-btn:hover { color: rgba(255,255,255,0.6); }
.sort-btn.active { background: rgba(234,179,8,0.1); border-color: rgba(234,179,8,0.35); color: #eab308; }

.sessions-loading { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 60px; color: rgba(255,255,255,0.3); font-size: 0.85rem; }

.sessions-empty {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 80px 20px; text-align: center;
}
.empty-icon { font-size: 3rem; opacity: 0.2; }
.sessions-empty p { color: rgba(255,255,255,0.3); font-size: 0.9rem; }
.empty-sub { font-size: 0.78rem !important; color: rgba(255,255,255,0.18) !important; }
.btn-start {
  margin-top: 8px; padding: 12px 28px;
  background: #eab308; border-radius: 10px;
  color: #000; font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.95rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.06em;
  text-decoration: none; transition: all 0.2s;
}
.btn-start:hover { background: #facc15; transform: translateY(-2px); }

/* Session list items */
.session-list { display: flex; flex-direction: column; gap: 8px; }
.session-item {
  display: flex; align-items: center; gap: 16px;
  background: #0d1117; border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px; padding: 16px 20px;
  transition: border-color 0.2s, transform 0.2s;
  animation: slideIn 0.3s ease forwards;
  opacity: 0;
}
.session-item:hover { border-color: rgba(234,179,8,0.2); transform: translateX(4px); }

@keyframes slideIn { to { opacity: 1; } }

.session-rank {
  width: 36px; flex-shrink: 0; text-align: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem; font-weight: 800;
  color: rgba(255,255,255,0.2);
}
.session-rank.gold { font-size: 1.3rem; }

.session-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.session-date {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.95rem; font-weight: 700; color: rgba(255,255,255,0.7);
  text-transform: uppercase; letter-spacing: 0.04em;
}
.session-duration { font-size: 0.75rem; color: rgba(255,255,255,0.3); }

.session-right { display: flex; align-items: baseline; gap: 4px; flex-direction: column; align-items: flex-end; min-width: 120px; }
.session-cal {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem; font-weight: 900; color: #eab308; line-height: 1;
}
.session-cal-unit { font-size: 0.72rem; color: rgba(255,255,255,0.35); }
.session-bar-wrap { width: 100px; height: 4px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden; margin-top: 4px; }
.session-bar { height: 100%; background: linear-gradient(90deg, rgba(234,179,8,0.4), #eab308); border-radius: 999px; }

.btn-delete {
  width: 28px; height: 28px; flex-shrink: 0;
  background: transparent; border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px; color: rgba(255,255,255,0.2);
  font-size: 0.7rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.btn-delete:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.3); color: #ef4444; }

/* Spinner */
.spinner {
  width: 36px; height: 36px;
  border: 3px solid rgba(234,179,8,0.15);
  border-top-color: #eab308;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Animation */
.animate-in { opacity: 0; transform: translateY(16px); animation: fadeUp 0.45s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

/* Responsive */
@media (max-width: 900px) {
  .content-grid { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .main-content { padding: 24px 20px 60px; }
  .page-header { flex-direction: column; align-items: flex-start; gap: 12px; }
}
@media (max-width: 480px) {
  .stats-row { grid-template-columns: 1fr 1fr; }
  .session-item { flex-wrap: wrap; }
  .session-bar-wrap { width: 70px; }
}
</style>