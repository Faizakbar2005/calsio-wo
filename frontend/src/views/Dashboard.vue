<template>
  <div class="dashboard-wrapper">
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>
    <Navbar />

    <!-- Toast Notification -->
    <transition name="toast">
      <div v-if="toast.show" class="toast" :class="'toast-' + toast.type">
        <span v-html="toast.icon"></span>
        <span>{{ toast.message }}</span>
      </div>
    </transition>

    <main class="main-content">

      <!-- Greeting -->
      <DashboardGreeting class="animate-in" />

      <!-- Tab Bar -->
      <div class="tab-bar animate-in" style="animation-delay:0.05s">
        <button
          v-for="t in tabs" :key="t.value"
          @click="activeTab = t.value"
          :class="['tab-btn', activeTab === t.value ? 'active' : '']"
        >
          <span class="tab-icon" v-html="t.icon"></span>
          {{ t.label }}
          <span class="tab-desc">{{ t.desc }}</span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="spinner-wrap">
          <div class="spinner"></div>
          <div class="spinner-inner"></div>
        </div>
        <p>Memuat data sesi latihan kamu...</p>
      </div>

      <template v-else>

        <!-- Empty State -->
        <div v-if="allHistory.length === 0" class="empty-state animate-in">
          <div class="empty-icon">🏋️</div>
          <h3>Belum ada sesi latihan</h3>
          <p>Mulai workout pertamamu, lalu simpan ke riwayat — data akan langsung muncul di sini.</p>
          <a href="/workout" class="btn-goto-workout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Mulai Workout Sekarang
          </a>
        </div>

        <template v-else>
          <!-- Metrics (banner + cards) -->
          <DashboardMetrics
            :today-calories="todayCalories"
            :target-per-session="targetPerSession"
            :total-calories="totalCalories"
            :total-duration="totalDuration"
            :total-sessions="totalSessions"
            :avg-calories="avgCalories"
            :active-tab="activeTab"
          />

          <!-- Charts -->
          <DashboardCharts
            :chart-label="currentChartLabel"
            :chart-data="currentChartData"
            :muscle-data="muscleData"
            :total-sessions="totalSessions"
          />

          <!-- Bottom: Progress + Table + Streak -->
          <DashboardBottom
            :muscle-progress="muscleProgress"
            :recent-history="recentHistory"
            :streak-data="streakData"
            :streak-count="streakCount"
            :target-per-session="targetPerSession"
          />
        </template>
      </template>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar           from '../components/layout/navbar.vue'
import DashboardGreeting from '../components/DashboardGreeting.vue'
import DashboardMetrics  from '../components/DashboardMetrics.vue'
import DashboardCharts   from '../components/DashboardCharts.vue'
import DashboardBottom   from '../components/DashboardBottom.vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const MUSCLE_COLORS = {
  'Dada'    : '#eab308', 'Kaki'    : '#3b82f6', 'Punggung': '#22c55e',
  'Kardio'  : '#14b8a6', 'Bisep'   : '#a855f7', 'Trisep'  : '#f97316',
  'Deltoid' : '#ec4899', 'Perut'   : '#06b6d4', 'Bokong'  : '#84cc16',
}

const ICONS = {
  day:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  week:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  month: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>`,
  checkCircle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
}

export default {
  name: 'Dashboard',
  components: { Navbar, DashboardGreeting, DashboardMetrics, DashboardCharts, DashboardBottom },

  data() {
    return {
      loading         : true,
      activeTab       : 'daily',
      allHistory      : [],
      stats           : {},
      userProfile     : null,
      targetPerSession: 500,
      lastHistoryCount: 0,  // untuk deteksi sesi baru
      pollTimer       : null,
      tabs: [
        { value: 'daily',   label: 'Harian',   desc: 'Hari ini', icon: ICONS.day   },
        { value: 'weekly',  label: 'Mingguan',  desc: '7 hari',   icon: ICONS.week  },
        { value: 'monthly', label: 'Bulanan',   desc: 'Bulan ini',icon: ICONS.month },
      ],
      toast: { show: false, message: '', type: 'success', icon: '', _timer: null },
    }
  },

  computed: {
    // ── Filter berdasarkan tab ──
    filteredHistory() {
      const now = new Date()
      return this.allHistory.filter(h => {
        const d = new Date(h.created_at || h.createdAt)
        if (this.activeTab === 'daily')
          return d.toDateString() === now.toDateString()
        if (this.activeTab === 'weekly') {
          const w = new Date(now); w.setDate(now.getDate() - 7)
          return d >= w
        }
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      })
    },
    todayCalories() {
      const now = new Date()
      return Math.round(
        this.allHistory
          .filter(h => new Date(h.created_at || h.createdAt).toDateString() === now.toDateString())
          .reduce((s, h) => s + (h.calories || 0), 0)
      )
    },
    totalCalories() { return Math.round(this.filteredHistory.reduce((s, h) => s + (h.calories || 0), 0)) },
    totalDuration()  { return this.filteredHistory.reduce((s, h) => s + (h.duration || 0), 0) },
    totalSessions()  { return this.filteredHistory.length },
    avgCalories()    { return this.totalSessions ? Math.round(this.totalCalories / this.totalSessions) : 0 },

    currentChartLabel() {
      return { daily: 'Kalori & Durasi — 7 Hari Terakhir', weekly: 'Kalori & Durasi — 4 Minggu Terakhir', monthly: 'Kalori & Durasi — 6 Bulan Terakhir' }[this.activeTab]
    },

    currentChartData() {
      const now = new Date()
      if (this.activeTab === 'daily') {
        const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(now); d.setDate(now.getDate() - (6 - i)); return d })
        return {
          labels  : days.map(d => d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })),
          calories: days.map(d => Math.round(this.allHistory.filter(h => new Date(h.created_at || h.createdAt).toDateString() === d.toDateString()).reduce((s, h) => s + (h.calories || 0), 0))),
          duration: days.map(d => this.allHistory.filter(h => new Date(h.created_at || h.createdAt).toDateString() === d.toDateString()).reduce((s, h) => s + (h.duration || 0), 0)),
        }
      }
      if (this.activeTab === 'weekly') {
        const weeks = Array.from({ length: 4 }, (_, i) => {
          const end = new Date(now); end.setDate(now.getDate() - i * 7)
          const start = new Date(end); start.setDate(end.getDate() - 6)
          return { start, end }
        }).reverse()
        return {
          labels  : weeks.map((_, i) => `Minggu ${i + 1}`),
          calories: weeks.map(w => Math.round(this.allHistory.filter(h => { const d = new Date(h.created_at || h.createdAt); return d >= w.start && d <= w.end }).reduce((s, h) => s + (h.calories || 0), 0))),
          duration: weeks.map(w => this.allHistory.filter(h => { const d = new Date(h.created_at || h.createdAt); return d >= w.start && d <= w.end }).reduce((s, h) => s + (h.duration || 0), 0)),
        }
      }
      const months = Array.from({ length: 6 }, (_, i) => new Date(now.getFullYear(), now.getMonth() - (5 - i), 1))
      return {
        labels  : months.map(d => d.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })),
        calories: months.map(d => Math.round(this.allHistory.filter(h => { const hd = new Date(h.created_at || h.createdAt); return hd.getMonth() === d.getMonth() && hd.getFullYear() === d.getFullYear() }).reduce((s, h) => s + (h.calories || 0), 0))),
        duration: months.map(d => this.allHistory.filter(h => { const hd = new Date(h.created_at || h.createdAt); return hd.getMonth() === d.getMonth() && hd.getFullYear() === d.getFullYear() }).reduce((s, h) => s + (h.duration || 0), 0)),
      }
    },

    muscleData() {
      const counts = {}
      this.filteredHistory.forEach(h => {
        const key = h.muscle_group || h.workout_type || 'Lainnya'
        counts[key] = (counts[key] || 0) + 1
      })
      const total = Object.values(counts).reduce((s, v) => s + v, 0)
      if (!total) return []
      return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({
        name, count, pct: Math.round(count / total * 100), color: MUSCLE_COLORS[name] || '#888',
      }))
    },

    muscleProgress() {
      const map = {}
      this.filteredHistory.forEach(h => {
        const key = h.muscle_group || h.workout_type || 'Lainnya'
        map[key] = (map[key] || 0) + (h.calories || 0)
      })
      return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, calories]) => ({
        name, calories: Math.round(calories), color: MUSCLE_COLORS[name] || '#888',
      }))
    },

    recentHistory() {
      return [...this.allHistory]
        .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt))
        .slice(0, 6)
    },

    streakData() {
      const now = new Date()
      return Array.from({ length: 14 }, (_, i) => {
        const d = new Date(now); d.setDate(now.getDate() - (13 - i))
        return {
          isToday : i === 13,
          hit     : this.allHistory.some(h => new Date(h.created_at || h.createdAt).toDateString() === d.toDateString()),
          dayLabel: d.toLocaleDateString('id-ID', { weekday: 'narrow' }),
          dateNum : d.getDate(),
          dateStr : d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        }
      })
    },

    streakCount() {
      let count = 0
      for (let i = this.streakData.length - 2; i >= 0; i--) {
        if (this.streakData[i].hit) count++
        else break
      }
      return count
    },
  },

  async mounted() {
    await this.fetchData()
    this.startPolling()   // ← auto-refresh setiap 15 detik
  },

  beforeUnmount() {
    this.stopPolling()
  },

  methods: {
    // ── Data Fetching ──
    async fetchData(silent = false) {
      if (!silent) this.loading = true
      try {
        const [histRes, statsRes, userRes] = await Promise.allSettled([
          axios.get(`${API_URL}/api/history`),
          axios.get(`${API_URL}/api/history/stats`),
          axios.get(`${API_URL}/api/users`),
        ])
        if (histRes.status === 'fulfilled') {
          const newData = histRes.value.data || []
          // Tandai baris baru untuk animasi flash di tabel
          if (silent && newData.length > this.lastHistoryCount) {
            const added = newData.length - this.lastHistoryCount
            newData.slice(0, added).forEach(h => { h._isNew = true; setTimeout(() => { delete h._isNew }, 2000) })
            this.showToast(`🎉 ${added} sesi baru berhasil disimpan!`, 'success')
          }
          this.lastHistoryCount = newData.length
          this.allHistory = newData
        }
        if (statsRes.status === 'fulfilled') {
          this.stats = statsRes.value.data || {}
          if (this.stats.daily_target) this.targetPerSession = this.stats.daily_target
        }
        if (userRes.status === 'fulfilled') {
          this.userProfile = userRes.value.data
          if (this.userProfile?.daily_target_calories) this.targetPerSession = this.userProfile.daily_target_calories
        }
      } catch (err) {
        console.warn('Fetch error:', err.message)
      } finally {
        this.loading = false
      }
    },

    // ── Polling: cek sesi baru setiap 15 detik ──
    startPolling() {
      this.pollTimer = setInterval(() => {
        this.fetchData(true)   // silent = true → tidak tampilkan loading spinner
      }, 15000)
    },
    stopPolling() {
      if (this.pollTimer) clearInterval(this.pollTimer)
    },

    // ── Toast ──
    showToast(message, type = 'success') {
      if (this.toast._timer) clearTimeout(this.toast._timer)
      this.toast = {
        show   : true,
        message,
        type,
        icon   : type === 'success' ? ICONS.checkCircle : ICONS.info,
        _timer : setTimeout(() => { this.toast.show = false }, 3500),
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.dashboard-wrapper {
  font-family: 'Barlow', sans-serif;
  min-height: 100vh; background: #080a0f; color: #fff;
  position: relative; overflow-x: hidden;
}
.bg-grid {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(234,179,8,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(234,179,8,0.03) 1px, transparent 1px);
  background-size: 40px 40px; pointer-events: none; z-index: 0;
}
.bg-glow {
  position: fixed; top: -200px; right: -100px; width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}
.main-content {
  position: relative; z-index: 1; max-width: 1280px; margin: 0 auto;
  padding: 40px 40px 80px; display: flex; flex-direction: column; gap: 22px;
}

/* ── Toast ── */
.toast {
  position: fixed; top: 24px; right: 24px; z-index: 9999;
  display: flex; align-items: center; gap: 10px;
  padding: 13px 20px; border-radius: 12px;
  font-size: 0.85rem; font-weight: 600;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.toast-success {
  background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.35); color: #22c55e;
}
.toast-info {
  background: rgba(96,165,250,0.12); border: 1px solid rgba(96,165,250,0.35); color: #60a5fa;
}
.toast-enter-active, .toast-leave-active { transition: all 0.35s cubic-bezier(.4,0,.2,1); }
.toast-enter-from { opacity: 0; transform: translateX(40px); }
.toast-leave-to   { opacity: 0; transform: translateX(40px); }

/* ── Tab Bar ── */
.tab-bar {
  display: flex; gap: 4px; background: rgba(255,255,255,0.04); padding: 4px;
  border-radius: 14px; width: fit-content; border: 1px solid rgba(255,255,255,0.07);
}
.tab-btn {
  padding: 8px 20px;
  font-family: 'Barlow Condensed', sans-serif; font-size: 0.88rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  background: transparent; border: none; color: rgba(255,255,255,0.35);
  border-radius: 10px; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; gap: 7px;
}
.tab-icon { display: flex; align-items: center; opacity: 0.6; }
.tab-desc { font-size: 0.62rem; font-weight: 400; text-transform: none; letter-spacing: 0; color: rgba(255,255,255,0.22); }
.tab-btn:hover  { color: rgba(255,255,255,0.6); }
.tab-btn.active { background: rgba(234,179,8,0.14); color: #eab308; border: 1px solid rgba(234,179,8,0.3); }
.tab-btn.active .tab-icon { opacity: 1; }
.tab-btn.active .tab-desc { color: rgba(234,179,8,0.45); }

/* ── Loading ── */
.loading-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 18px; min-height: 320px; color: rgba(255,255,255,0.3);
}
.spinner-wrap { position: relative; width: 48px; height: 48px; }
.spinner {
  position: absolute; inset: 0;
  border: 3px solid rgba(234,179,8,0.12); border-top-color: #eab308;
  border-radius: 50%; animation: spin 0.9s linear infinite;
}
.spinner-inner {
  position: absolute; inset: 8px;
  border: 2px solid rgba(234,179,8,0.08); border-bottom-color: rgba(234,179,8,0.5);
  border-radius: 50%; animation: spin 0.6s linear infinite reverse;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Empty State ── */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 14px; min-height: 340px; text-align: center;
  background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.09);
  border-radius: 20px; padding: 48px;
}
.empty-icon { font-size: 3.5rem; filter: grayscale(0.3); }
.empty-state h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 1.5rem; font-weight: 700; color: rgba(255,255,255,0.4); }
.empty-state p  { font-size: 0.86rem; color: rgba(255,255,255,0.25); max-width: 360px; }
.btn-goto-workout {
  margin-top: 8px; padding: 12px 26px;
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.4);
  border-radius: 12px; color: #eab308;
  font-family: 'Barlow Condensed', sans-serif; font-size: 0.95rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em; text-decoration: none;
  transition: all 0.2s;
}
.btn-goto-workout:hover { background: rgba(234,179,8,0.18); transform: translateY(-1px); }

.animate-in { opacity: 0; transform: translateY(14px); animation: fadeUp 0.5s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) { .main-content { padding: 24px 16px 60px; } }
</style>