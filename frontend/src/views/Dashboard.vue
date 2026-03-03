<template>
  <div class="dashboard-wrapper">

    <div class="bg-grid"></div>
    <div class="bg-glow"></div>

    <Navbar />

    <main class="main-content">

      <!-- Greeting -->
      <div class="greeting animate-in" style="animation-delay: 0s">
        <h1 class="greeting-title">{{ greetingText }} 💪</h1>
        <p class="greeting-sub">Jangan skip hari ini. Setiap kalori terhitung.</p>
      </div>

      <!-- Stats Row -->
      <div class="stats-row animate-in" style="animation-delay: 0.1s">

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(234,179,8,0.12);">
            <!-- Flame -->
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2.5-1.5-4.5-2.5-6 0 2-1 3.5-2.5 4.5C13 8 12 5 12 2z"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ totalCalories }}</span>
            <span class="stat-label">Kalori Hari Ini</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(34,197,94,0.12);">
            <!-- Timer -->
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="13" r="8"/>
              <path d="M12 9v4l2.5 2.5"/>
              <path d="M9 3h6"/>
              <path d="M12 3v2"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ totalDuration }}<small>min</small></span>
            <span class="stat-label">Total Durasi</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(96,165,250,0.12);">
            <!-- Activity -->
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ totalSessions }}</span>
            <span class="stat-label">Total Sesi</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(249,115,22,0.12);">
            <!-- Target crosshair -->
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ dailyTarget }}</span>
            <span class="stat-label">Target Harian</span>
          </div>
        </div>

      </div>

      <!-- Progress + Chart Row -->
      <div class="content-grid animate-in" style="animation-delay: 0.2s">

        <!-- Progress Card -->
        <div class="card progress-card">
          <div class="card-top-bar"></div>
          <div class="card-header-row">
            <h3 class="card-title">Target Harian</h3>
            <span class="progress-pct">{{ progressPercentage.toFixed(0) }}%</span>
          </div>

          <div class="circle-wrap">
            <svg class="circle-svg" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" class="circle-bg" />
              <circle
                cx="60" cy="60" r="50"
                class="circle-fill"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="strokeOffset"
              />
            </svg>
            <div class="circle-label">
              <span class="circle-kcal">{{ totalCalories }}</span>
              <span class="circle-unit">kcal</span>
            </div>
          </div>

          <div class="progress-bar-wrap">
            <div class="progress-bar-track">
              <div class="progress-bar-fill" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <div class="progress-bar-labels">
              <span>0</span>
              <span>{{ dailyTarget }} kcal</span>
            </div>
          </div>

          <div v-if="progressPercentage >= 100" class="goal-reached">
            🎉 Target Tercapai! Luar biasa!
          </div>
          <div v-else class="goal-remaining">
            Sisa <strong>{{ dailyTarget - totalCalories }} kcal</strong> lagi untuk target hari ini
          </div>
        </div>

        <!-- Chart Card -->
        <div class="card chart-card">
          <div class="card-top-bar"></div>
          <div class="card-header-row">
            <h3 class="card-title">Kalori Terbakar</h3>
            <span class="chart-badge">7 Sesi Terakhir</span>
          </div>

          <div v-if="loading" class="empty-chart">
            <div class="spinner"></div>
          </div>

          <div v-else-if="history.length === 0" class="empty-chart">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <p>Belum ada data workout.</p>
            <p class="empty-sub">Mulai sesi pertama kamu!</p>
          </div>

          <div v-else class="chart-container">
            <Line :data="chartData" :options="chartOptions" />
          </div>
        </div>

      </div>

      <!-- Quick Actions -->
      <div class="quick-actions animate-in" style="animation-delay: 0.3s">
        <h3 class="section-title">Quick Actions</h3>
        <div class="actions-row">

          <router-link to="/workout" class="action-btn primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4"/>
            </svg>
            <span>Mulai Workout</span>
          </router-link>

          <router-link to="/history" class="action-btn secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 8v4l3 3"/><path d="M3.05 11a9 9 0 1 1 .5 4"/><path d="M3 16v-5h5"/>
            </svg>
            <span>Lihat Riwayat</span>
          </router-link>

          <router-link to="/buku-acuan" class="action-btn secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span>Buku Acuan</span>
          </router-link>

          <router-link to="/predict" class="action-btn secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
            </svg>
            <span>Prediksi Kalori</span>
          </router-link>

        </div>
      </div>

    </main>
  </div>
</template>

<script>
import axios from "axios"
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  LineElement, CategoryScale, LinearScale, PointElement, Filler
} from "chart.js"
import Navbar from "../components/layout/navbar.vue"

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export default {
  components: { Line, Navbar },

  data() {
    return {
      totalCalories: 0,
      totalDuration: 0,
      totalSessions: 0,
      dailyTarget: 600,
      history: [],
      loading: true
    }
  },

  computed: {
    greetingText() {
      const h = new Date().getHours()
      if (h < 11) return "Selamat Pagi"
      if (h < 15) return "Selamat Siang"
      if (h < 18) return "Selamat Sore"
      return "Selamat Malam"
    },
    progressPercentage() {
      if (!this.dailyTarget) return 0
      return Math.min((this.totalCalories / this.dailyTarget) * 100, 100)
    },
    circumference() {
      return 2 * Math.PI * 50
    },
    strokeOffset() {
      return this.circumference - (this.progressPercentage / 100) * this.circumference
    },
    chartData() {
      const last7 = this.history.slice(-7)
      return {
        labels: last7.map((_, i) => `Sesi ${i + 1}`),
        datasets: [{
          label: "Kalori Terbakar",
          data: last7.map(h => h.calories),
          borderColor: "#eab308",
          backgroundColor: "rgba(234,179,8,0.08)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#eab308",
          pointBorderColor: "#000",
          pointBorderWidth: 2,
          pointRadius: 5
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
            backgroundColor: "#0d1117",
            borderColor: "rgba(234,179,8,0.3)",
            borderWidth: 1,
            titleColor: "#eab308",
            bodyColor: "#ffffff",
            callbacks: { label: ctx => ` ${ctx.parsed.y} kcal` }
          }
        },
        scales: {
          x: {
            ticks: { color: "rgba(255,255,255,0.4)", font: { size: 11 } },
            grid: { color: "rgba(255,255,255,0.04)" },
            border: { color: "rgba(255,255,255,0.08)" }
          },
          y: {
            ticks: { color: "rgba(255,255,255,0.4)", font: { size: 11 } },
            grid: { color: "rgba(255,255,255,0.04)" },
            border: { color: "rgba(255,255,255,0.08)" }
          }
        }
      }
    }
  },

  async mounted() {
    try {
      const [statsRes, historyRes] = await Promise.all([
        axios.get(`${API_URL}/api/history/stats`),
        axios.get(`${API_URL}/api/history`)
      ])
      this.totalCalories = statsRes.data.total_calories || 0
      this.dailyTarget   = statsRes.data.daily_target   || 600
      this.totalSessions = statsRes.data.total_sessions || 0
      this.history       = historyRes.data || []
      this.totalDuration = this.history.reduce((sum, h) => sum + (h.duration || 0), 0)
    } catch (err) {
      console.warn("Gagal fetch data:", err.message)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.dashboard-wrapper {
  font-family: 'Barlow', sans-serif;
  min-height: 100vh;
  background: #080a0f;
  color: #ffffff;
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
  position: fixed; top: -300px; right: -100px;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}

.main-content {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto;
  padding: 40px 40px 60px;
  display: flex; flex-direction: column; gap: 32px;
}

.greeting-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.6rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.04em; line-height: 1;
}
.greeting-sub { margin-top: 8px; font-size: 0.9rem; color: rgba(255,255,255,0.35); }

.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat-card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 20px;
  display: flex; align-items: center; gap: 16px;
  transition: border-color 0.2s, transform 0.2s;
}
.stat-card:hover { border-color: rgba(234,179,8,0.25); transform: translateY(-2px); }
.stat-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.stat-info { display: flex; flex-direction: column; gap: 2px; }
.stat-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.7rem; font-weight: 900; color: #fff; line-height: 1;
}
.stat-value small { font-size: 0.9rem; opacity: 0.6; margin-left: 2px; }
.stat-label {
  font-size: 0.72rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.35);
}

.content-grid { display: grid; grid-template-columns: 340px 1fr; gap: 20px; }

.card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; padding: 28px; position: relative; overflow: hidden;
}
.card-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent);
}
.card-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.card-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.6);
}

.progress-pct {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem; font-weight: 900; color: #eab308;
}
.circle-wrap { position: relative; width: 160px; height: 160px; margin: 0 auto 24px; }
.circle-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.circle-bg  { fill: none; stroke: rgba(255,255,255,0.06); stroke-width: 8; }
.circle-fill { fill: none; stroke: #eab308; stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset 1s ease; }
.circle-label { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.circle-kcal { font-family: 'Barlow Condensed', sans-serif; font-size: 2.2rem; font-weight: 900; color: #eab308; line-height: 1; }
.circle-unit { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); }

.progress-bar-wrap { margin-bottom: 16px; }
.progress-bar-track { width: 100%; height: 8px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden; margin-bottom: 8px; }
.progress-bar-fill { height: 100%; background: linear-gradient(90deg, #ca8a04, #eab308, #facc15); border-radius: 999px; transition: width 1s ease; }
.progress-bar-labels { display: flex; justify-content: space-between; font-size: 0.7rem; color: rgba(255,255,255,0.25); }

.goal-reached { text-align: center; font-size: 0.85rem; font-weight: 600; color: #22c55e; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2); border-radius: 10px; padding: 10px; }
.goal-remaining { text-align: center; font-size: 0.82rem; color: rgba(255,255,255,0.35); }
.goal-remaining strong { color: #eab308; }

.chart-badge {
  font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
  color: rgba(234,179,8,0.7); background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.2);
  padding: 4px 10px; border-radius: 999px;
}
.chart-container { height: 220px; }
.empty-chart { height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
.empty-chart p { color: rgba(255,255,255,0.3); font-size: 0.85rem; }
.empty-sub { font-size: 0.75rem !important; color: rgba(234,179,8,0.5) !important; }
.spinner { width: 36px; height: 36px; border: 3px solid rgba(234,179,8,0.15); border-top-color: #eab308; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.section-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.3); margin-bottom: 12px;
}
.actions-row { display: flex; gap: 12px; flex-wrap: wrap; }
.action-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 24px; border-radius: 12px;
  font-family: 'Barlow Condensed', sans-serif; font-size: 0.95rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em; text-decoration: none;
  transition: all 0.2s ease;
}
.action-btn.primary { background: #eab308; color: #000; }
.action-btn.primary:hover { background: #facc15; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(234,179,8,0.35); }
.action-btn.secondary { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.1); }
.action-btn.secondary:hover { border-color: rgba(234,179,8,0.35); color: #eab308; background: rgba(234,179,8,0.06); }

.animate-in { opacity: 0; transform: translateY(16px); animation: fadeUp 0.5s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 900px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .content-grid { grid-template-columns: 1fr; }
  .main-content { padding: 24px 20px 48px; }
}
@media (max-width: 600px) {
  .stats-row { grid-template-columns: 1fr 1fr; }
  .actions-row { flex-direction: column; }
}
</style>