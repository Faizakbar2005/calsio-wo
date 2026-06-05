<template>
  <div>
    <!-- Target Banner -->
    <div class="target-banner animate-in" :style="{ animationDelay: '0.08s' }">
      <div class="tb-left">
        <div class="tb-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        <div>
          <div class="tb-title">Target Kalori Harian</div>
          <div class="tb-sub">
            {{ targetPerSession }} kcal per sesi · Hari ini:
            <strong :class="todayCalories >= targetPerSession ? 'text-green' : 'text-amber'">
              {{ todayCalories }} kcal
            </strong>
          </div>
        </div>
      </div>
      <div class="tb-right">
        <div class="tb-progress-wrap">
          <div class="tb-bar">
            <div class="tb-fill" :style="{ width: pct + '%' }">
              <div class="tb-shimmer"></div>
            </div>
          </div>
          <span class="tb-pct">{{ pct }}%</span>
        </div>
        <div class="tb-status" :class="todayCalories >= targetPerSession ? 'status-ok' : 'status-pending'">
          <span v-if="todayCalories >= targetPerSession">✓ Target tercapai!</span>
          <span v-else>Kurang {{ targetPerSession - todayCalories }} kcal</span>
        </div>
      </div>
    </div>

    <!-- Metric Cards -->
    <div class="metrics-grid animate-in" :style="{ animationDelay: '0.12s' }">
      <div
        v-for="(m, i) in metrics"
        :key="m.label"
        class="metric-card"
        :style="{ animationDelay: (0.12 + i * 0.04) + 's' }"
      >
        <div class="mc-top">
          <div class="mc-icon" :style="{ background: m.iconBg, borderColor: m.iconBorder }">
            <span v-html="m.icon"></span>
          </div>
          <div class="mc-trend" :class="m.up === true ? 'trend-up' : m.up === false ? 'trend-down' : 'trend-neu'">
            <span v-html="m.up === true ? arrowUp : m.up === false ? arrowDown : dashIcon"></span>
            <span class="trend-label">{{ m.delta }}</span>
          </div>
        </div>
        <div class="mc-body">
          <span class="mc-label">{{ m.label }}</span>
          <span class="mc-value">
            {{ m.value.toLocaleString('id-ID') }}
            <small>{{ m.unit }}</small>
          </span>
          <span class="mc-hint">{{ m.hint }}</span>
        </div>
        <!-- Mini decorative bar -->
        <div class="mc-deco-bar" :style="{ background: m.accentColor }"></div>
      </div>
    </div>
  </div>
</template>

<script>
const arrowUp = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`
const arrowDown = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`
const dashIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`

const ICONS = {
  fire: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2.5-1.5-4.5-2.5-6 0 2-1 3.5-2.5 4.5C13 8 12 5 12 2z"/></svg>`,
  clock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  zap: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  target: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
}

export default {
  name: 'DashboardMetrics',
  props: {
    todayCalories:    { type: Number, default: 0 },
    targetPerSession: { type: Number, default: 500 },
    totalCalories:    { type: Number, default: 0 },
    totalDuration:    { type: Number, default: 0 },
    totalSessions:    { type: Number, default: 0 },
    avgCalories:      { type: Number, default: 0 },
    activeTab:        { type: String, default: 'daily' },
  },
  data() {
    return { arrowUp, arrowDown, dashIcon }
  },
  computed: {
    pct() {
      return Math.min(Math.round(this.todayCalories / this.targetPerSession * 100), 100)
    },
    metrics() {
      const labelMap = {
        daily  : ['Kalori Hari Ini',    'Durasi Hari Ini',  'Sesi Hari Ini',   'Rata-rata/Sesi'],
        weekly : ['Kalori Minggu Ini',  'Total Durasi',     'Total Sesi',      'Rata-rata/Sesi'],
        monthly: ['Kalori Bulan Ini',   'Total Durasi',     'Total Sesi',      'Rata-rata/Sesi'],
      }
      const hintMap = {
        daily  : ['Target: ' + this.targetPerSession + ' kcal/hari', 'Waktu aktif berlatih', 'Sesi hari ini',     'Efisiensi/sesi'],
        weekly : ['Akumulasi 7 hari',                                 'Total waktu aktif',    'Sesi minggu ini',   'Efisiensi/sesi'],
        monthly: ['Akumulasi bulan ini',                              'Total waktu aktif',    'Sesi bulan ini',    'Efisiensi/sesi'],
      }
      const tab    = this.activeTab
      const labels = labelMap[tab]
      const hints  = hintMap[tab]
      return [
        {
          label: labels[0], value: this.totalCalories, unit: 'kcal',
          hint: hints[0],
          delta: this.totalCalories >= this.targetPerSession ? '✓ Target tercapai' : `−${this.targetPerSession - this.totalCalories} kcal`,
          up: this.totalCalories >= this.targetPerSession ? true : null,
          icon: ICONS.fire,
          iconBg: 'rgba(234,179,8,0.1)', iconBorder: 'rgba(234,179,8,0.25)', accentColor: '#eab308',
        },
        {
          label: labels[1], value: this.totalDuration, unit: 'mnt',
          hint: hints[1],
          delta: `${this.totalSessions} sesi tersimpan`,
          up: null,
          icon: ICONS.clock,
          iconBg: 'rgba(34,197,94,0.1)', iconBorder: 'rgba(34,197,94,0.25)', accentColor: '#22c55e',
        },
        {
          label: labels[2], value: this.totalSessions, unit: 'sesi',
          hint: hints[2],
          delta: this.totalSessions > 0 ? 'Ada aktivitas 💪' : 'Belum ada sesi',
          up: this.totalSessions > 0 ? true : null,
          icon: ICONS.zap,
          iconBg: 'rgba(96,165,250,0.1)', iconBorder: 'rgba(96,165,250,0.25)', accentColor: '#60a5fa',
        },
        {
          label: labels[3], value: this.avgCalories, unit: 'kcal',
          hint: hints[3],
          delta: this.avgCalories >= this.targetPerSession ? '≥ target/sesi' : `< target (${this.targetPerSession})`,
          up: this.avgCalories >= this.targetPerSession,
          icon: ICONS.target,
          iconBg: 'rgba(249,115,22,0.1)', iconBorder: 'rgba(249,115,22,0.25)', accentColor: '#f97316',
        },
      ]
    },
  },
}
</script>

<style scoped>
/* ── Target Banner ── */
.target-banner {
  display: flex; align-items: center; justify-content: space-between;
  gap: 20px; flex-wrap: wrap;
  background: rgba(234,179,8,0.05);
  border: 1px solid rgba(234,179,8,0.18);
  border-radius: 16px; padding: 18px 24px;
  margin-bottom: 16px;
  position: relative; overflow: hidden;
}
.target-banner::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent);
}
.tb-left  { display: flex; align-items: center; gap: 14px; }
.tb-icon-wrap {
  width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
  background: rgba(234,179,8,0.12); border: 1px solid rgba(234,179,8,0.25);
  display: flex; align-items: center; justify-content: center; color: #eab308;
}
.tb-title { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
.tb-sub   { font-size: 0.85rem; color: rgba(255,255,255,0.45); }
.tb-sub strong { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; }
.text-green { color: #22c55e !important; }
.text-amber { color: #eab308 !important; }

.tb-right { display: flex; flex-direction: column; gap: 8px; min-width: 220px; }
.tb-progress-wrap { display: flex; align-items: center; gap: 12px; }
.tb-bar { flex: 1; height: 8px; background: rgba(255,255,255,0.07); border-radius: 999px; overflow: hidden; position: relative; }
.tb-fill {
  height: 100%; background: linear-gradient(90deg, #ca8a04, #eab308, #facc15);
  border-radius: 999px; transition: width 0.8s cubic-bezier(.4,0,.2,1);
  position: relative; overflow: hidden;
}
.tb-shimmer {
  position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 2s infinite;
}
@keyframes shimmer { to { left: 200%; } }
.tb-pct { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 700; color: #eab308; min-width: 42px; text-align: right; }
.tb-status { font-size: 0.7rem; font-weight: 600; text-align: right; }
.status-ok      { color: #22c55e; }
.status-pending { color: rgba(234,179,8,0.6); }

/* ── Metrics Grid ── */
.metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.metric-card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 20px 20px 16px;
  display: flex; flex-direction: column; gap: 12px;
  position: relative; overflow: hidden;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  cursor: default;
}
.metric-card:hover {
  border-color: rgba(234,179,8,0.2);
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(0,0,0,0.35);
}
.mc-deco-bar {
  position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  opacity: 0.35; transition: opacity 0.25s;
}
.metric-card:hover .mc-deco-bar { opacity: 0.7; }

.mc-top { display: flex; align-items: flex-start; justify-content: space-between; }
.mc-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid; color: rgba(255,255,255,0.7);
  flex-shrink: 0;
}
.mc-trend {
  display: flex; align-items: center; gap: 4px;
  font-size: 0.65rem; font-weight: 700;
  padding: 4px 8px; border-radius: 999px;
}
.trend-up   { color: #22c55e; background: rgba(34,197,94,0.1); }
.trend-down { color: #ef4444; background: rgba(239,68,68,0.1); }
.trend-neu  { color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }
.trend-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 80px; }

.mc-body { display: flex; flex-direction: column; gap: 2px; }
.mc-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.3); }
.mc-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem; font-weight: 900; line-height: 1;
  color: #fff; letter-spacing: -0.01em;
}
.mc-value small { font-size: 0.85rem; opacity: 0.4; margin-left: 3px; }
.mc-hint { font-size: 0.63rem; color: rgba(255,255,255,0.2); margin-top: 1px; }

.animate-in { opacity: 0; transform: translateY(14px); animation: fadeUp 0.5s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1100px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px)  { .metrics-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px)  {
  .target-banner { flex-direction: column; align-items: flex-start; }
  .tb-right { width: 100%; min-width: unset; }
}
</style>