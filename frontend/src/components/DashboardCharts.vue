<template>
  <div class="charts-row animate-in" :style="{ animationDelay: '0.16s' }">

    <!-- Main Chart -->
    <div class="card chart-card">
      <div class="card-top-bar"></div>
      <div class="card-header-row">
        <div>
          <h3 class="card-title">{{ chartLabel }}</h3>
          <p class="card-subtitle">Batang kuning = kalori terbakar · Garis biru = durasi latihan</p>
        </div>
        <div class="legend-inline">
          <span class="li-dot" style="background:#eab308"></span>
          <span class="li-text">Kalori (kcal)</span>
          <span class="li-dot" style="background:#60a5fa; margin-left:12px"></span>
          <span class="li-text">Durasi (mnt)</span>
        </div>
      </div>
      <div v-if="isEmpty" class="empty-chart">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        <p>Belum ada data untuk periode ini. Coba tab lain atau tambah sesi baru.</p>
      </div>
      <div v-else class="chart-wrap">
        <canvas ref="mainCanvas"></canvas>
      </div>
    </div>

    <!-- Donut Chart -->
    <div class="card donut-card">
      <div class="card-top-bar"></div>
      <h3 class="card-title" style="margin-bottom:4px">Muscle Group</h3>
      <p class="card-subtitle" style="margin-bottom:16px">Porsi tiap area yang dilatih</p>
      <div v-if="muscleData.length === 0" class="empty-chart">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
        <p>Belum ada data periode ini.</p>
      </div>
      <template v-else>
        <div class="donut-wrap">
          <canvas ref="donutCanvas"></canvas>
          <div class="donut-center">
            <span class="dc-val">{{ totalSessions }}</span>
            <span class="dc-lbl">Total Sesi</span>
          </div>
        </div>
        <div class="donut-legend">
          <div v-for="m in muscleData" :key="m.name" class="dl-item">
            <div class="dl-left">
              <span class="dl-dot" :style="{ background: m.color }"></span>
              <span class="dl-name">{{ m.name }}</span>
            </div>
            <div class="dl-right">
              <span class="dl-count">{{ m.count }}×</span>
              <span class="dl-bar-wrap">
                <span class="dl-bar-fill" :style="{ width: m.pct + '%', background: m.color }"></span>
              </span>
              <span class="dl-val">{{ m.pct }}%</span>
            </div>
          </div>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, LineElement,
  CategoryScale, LinearScale, PointElement,
  ArcElement, Filler,
  DoughnutController,
  BarController,
  LineController
} from 'chart.js'

ChartJS.register(
  Title, Tooltip, Legend,
  BarElement, LineElement,
  CategoryScale, LinearScale, PointElement,
  ArcElement, Filler,
  DoughnutController,
  BarController,
  LineController
)

export default {
  name: 'DashboardCharts',
  props: {
    chartLabel:   { type: String,  default: '' },
    chartData:    { type: Object,  default: () => ({ labels: [], calories: [], duration: [] }) },
    muscleData:   { type: Array,   default: () => [] },
    totalSessions:{ type: Number,  default: 0 },
  },
  data() {
    return {
      mainChartInstance : null,
      donutChartInstance: null,
    }
  },
  computed: {
    isEmpty() {
      return !this.chartData.labels?.length || this.chartData.calories?.every(v => v === 0)
    },
  },
  watch: {
    chartData:  { deep: true, handler() { this.$nextTick(() => this.renderMain())  } },
    muscleData: { deep: true, handler() { this.$nextTick(() => this.renderDonut()) } },
  },
  mounted() {
    this.$nextTick(() => { this.renderMain(); this.renderDonut() })
  },
  beforeUnmount() {
    this.mainChartInstance?.destroy()
    this.donutChartInstance?.destroy()
  },
  methods: {
    renderMain() {
      const canvas = this.$refs.mainCanvas
      if (!canvas) return
      this.mainChartInstance?.destroy()
      const d = this.chartData
      this.mainChartInstance = new ChartJS(canvas, {
        data: {
          labels: d.labels,
          datasets: [
            {
              type: 'bar', label: 'Kalori (kcal)', data: d.calories, yAxisID: 'y',
              backgroundColor: d.calories.map(v => v > 0 ? 'rgba(234,179,8,0.22)' : 'rgba(255,255,255,0.03)'),
              borderColor    : d.calories.map(v => v > 0 ? '#eab308' : 'transparent'),
              borderWidth: 1, borderRadius: 7,
              hoverBackgroundColor: 'rgba(234,179,8,0.38)',
            },
            {
              type: 'line', label: 'Durasi (mnt)', data: d.duration, yAxisID: 'y2',
              borderColor: '#60a5fa', backgroundColor: 'rgba(96,165,250,0.08)',
              borderWidth: 2.5, pointBackgroundColor: '#60a5fa',
              pointRadius: 4, pointHoverRadius: 6, tension: 0.45, fill: false,
            },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          animation: { duration: 600, easing: 'easeOutQuart' },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#111827',
              borderColor: 'rgba(234,179,8,0.3)', borderWidth: 1,
              titleColor: '#eab308', bodyColor: '#d1d5db',
              padding: 12, cornerRadius: 10,
              callbacks: {
                label: ctx => ctx.datasetIndex === 0
                  ? `  Kalori: ${ctx.parsed.y} kcal`
                  : `  Durasi: ${ctx.parsed.y} mnt`,
              },
            },
          },
          scales: {
            x: {
              grid: { color: 'rgba(255,255,255,0.04)' },
              ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 11, family: 'Barlow, sans-serif' } },
              border: { color: 'rgba(255,255,255,0.07)' },
            },
            y: {
              position: 'left',
              grid: { color: 'rgba(255,255,255,0.04)' },
              ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 11 }, callback: v => v + ' kcal' },
              border: { color: 'rgba(255,255,255,0.07)' },
            },
            y2: {
              position: 'right',
              grid: { display: false },
              ticks: { color: 'rgba(96,165,250,0.6)', font: { size: 11 }, callback: v => v + ' mnt' },
              border: { color: 'rgba(255,255,255,0.07)' },
            },
          },
        },
      })
    },

    renderDonut() {
      const canvas = this.$refs.donutCanvas
      if (!canvas || !this.muscleData.length) return
      this.donutChartInstance?.destroy()
      this.donutChartInstance = new ChartJS(canvas, {
        type: 'doughnut',
        data: {
          labels: this.muscleData.map(m => m.name),
          datasets: [{
            data: this.muscleData.map(m => m.pct),
            backgroundColor: this.muscleData.map(m => m.color),
            borderWidth: 0,
            hoverOffset: 6,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          cutout: '70%',
          animation: { duration: 700, easing: 'easeOutQuart' },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#111827',
              borderColor: 'rgba(234,179,8,0.3)', borderWidth: 1,
              titleColor: '#eab308', bodyColor: '#d1d5db',
              padding: 12, cornerRadius: 10,
              callbacks: {
                label: ctx => `  ${ctx.label}: ${ctx.parsed}% (${this.muscleData[ctx.dataIndex]?.count} sesi)`,
              },
            },
          },
        },
      })
    },
  },
}
</script>

<style scoped>
.charts-row { display: grid; grid-template-columns: 1fr 310px; gap: 20px; }

.card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; padding: 26px; position: relative; overflow: hidden;
}
.card-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent);
}
.card-header-row {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 20px; gap: 12px; flex-wrap: wrap;
}
.card-title    { font-family: 'Barlow Condensed', sans-serif; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.5); }
.card-subtitle { font-size: 0.7rem; color: rgba(255,255,255,0.22); margin-top: 4px; }

.legend-inline { display: flex; align-items: center; gap: 6px; font-size: 0.68rem; color: rgba(255,255,255,0.3); flex-shrink: 0; }
.li-dot { width: 10px; height: 10px; border-radius: 3px; }

.chart-wrap { position: relative; width: 100%; height: 260px; }

.empty-chart {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; height: 200px; color: rgba(255,255,255,0.2); font-size: 0.82rem;
  text-align: center; padding: 0 24px;
}

/* Donut */
.donut-wrap { position: relative; width: 100%; height: 180px; }
.donut-center {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; pointer-events: none;
}
.dc-val { font-family: 'Barlow Condensed', sans-serif; font-size: 2.2rem; font-weight: 900; color: #eab308; line-height: 1; }
.dc-lbl { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.25); margin-top: 2px; }

.donut-legend { display: flex; flex-direction: column; gap: 9px; margin-top: 16px; }
.dl-item { display: flex; align-items: center; justify-content: space-between; font-size: 0.73rem; }
.dl-left { display: flex; align-items: center; gap: 8px; }
.dl-dot  { width: 9px; height: 9px; border-radius: 2px; flex-shrink: 0; }
.dl-name { color: rgba(255,255,255,0.45); }
.dl-right { display: flex; align-items: center; gap: 8px; }
.dl-count { font-size: 0.62rem; color: rgba(255,255,255,0.2); min-width: 20px; text-align: right; }
.dl-bar-wrap { width: 48px; height: 4px; background: rgba(255,255,255,0.07); border-radius: 999px; overflow: hidden; }
.dl-bar-fill { display: block; height: 100%; border-radius: 999px; transition: width 0.6s ease; }
.dl-val { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 0.88rem; min-width: 32px; text-align: right; }

.animate-in { opacity: 0; transform: translateY(14px); animation: fadeUp 0.5s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1100px) { .charts-row { grid-template-columns: 1fr; } }
</style>