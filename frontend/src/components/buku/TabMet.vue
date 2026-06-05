<template>
  <div class="tab-met">

    <!-- ── Hero ── -->
    <div class="met-hero">
      <div class="met-hero-left">
        <div class="eyebrow-row">
          <div class="eyebrow-line"></div>
          <span class="eyebrow">Metabolic Equivalent of Task</span>
        </div>
        <h2 class="met-title">Tabel MET</h2>
        <p class="met-sub">Semakin tinggi nilai MET, semakin banyak kalori terbakar per satuan waktu</p>
      </div>

      <div class="formula-card">
        <div class="formula-header">
          <span class="formula-eyebrow">Rumus Kalori</span>
        </div>
        <div class="formula-eq">
          <div class="formula-factor">
            <span class="ff-val">MET</span>
          </div>
          <span class="formula-op">×</span>
          <div class="formula-factor">
            <span class="ff-val">Berat</span>
            <span class="ff-unit">kg</span>
          </div>
          <span class="formula-op">×</span>
          <div class="formula-factor">
            <span class="ff-val">Durasi</span>
            <span class="ff-unit">jam</span>
          </div>
          <span class="formula-op">=</span>
          <div class="formula-result">
            <span>kcal</span>
          </div>
        </div>
        <div class="formula-example">
          Push Up (3.8) × 70 kg × 0.5h
          <span class="fe-result">= 133 kcal</span>
        </div>
      </div>
    </div>

    <!-- ── Controls ── -->
    <div class="controls-row">
      <div class="legend">
        <div class="legend-item">
          <span class="legend-pip" style="background:#22c55e"></span>
          <span>Ringan &lt; 4</span>
        </div>
        <div class="legend-item">
          <span class="legend-pip" style="background:#eab308"></span>
          <span>Sedang 4–7</span>
        </div>
        <div class="legend-item">
          <span class="legend-pip" style="background:#ef4444"></span>
          <span>Berat &gt; 7</span>
        </div>
      </div>

      <div class="filter-chips">
        <button
          v-for="cat in metCategories"
          :key="cat"
          @click="metFilter = metFilter === cat ? '' : cat"
          :class="['chip', metFilter === cat ? 'active' : '']"
        >{{ cat }}</button>
      </div>
    </div>

    <!-- ── Grid ── -->
    <div class="met-grid">
      <div
        v-for="(row, idx) in filteredMet"
        :key="row.name"
        class="met-card"
        :style="{ '--mc': metColor(row.met), animationDelay: (idx * 0.03) + 's' }"
      >
        <div class="mc-accent"></div>

        <div class="mc-top">
          <div class="mc-name-group">
            <div class="mc-name">{{ row.name }}</div>
            <div class="mc-badges">
              <span class="mc-badge cat">{{ row.category }}</span>
              <span class="mc-badge intensity" :class="row.intensity">{{ row.intensity }}</span>
            </div>
          </div>
          <div class="mc-kcal">
            <span class="mc-kcal-val" :style="{ color: metColor(row.met) }">{{ Math.round(row.met * 70 * 0.5) }}</span>
            <span class="mc-kcal-sub">kcal / 30min</span>
          </div>
        </div>

        <div class="mc-bar-section">
          <div class="mc-bar-row">
            <span class="mc-bar-label">MET</span>
            <span class="mc-score" :style="{ color: metColor(row.met) }">{{ row.met }}</span>
          </div>
          <div class="mc-bar-track">
            <div
              class="mc-bar-fill"
              :style="{ width: (row.met / maxMet * 100) + '%', background: metColor(row.met) }"
            ></div>
            <div class="mc-tick" style="left: 32.4%"></div>
            <div class="mc-tick" style="left: 56.7%"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { metData, metCategories } from '../../services/bukuData.js'

export default {
  name: 'TabMet',
  data() {
    return { metFilter: '', metData, metCategories }
  },
  computed: {
    filteredMet() {
      if (!this.metFilter || this.metFilter === 'Semua') return this.metData
      return this.metData.filter(m => m.category === this.metFilter)
    },
    maxMet() {
      return Math.max(...this.metData.map(d => d.met))
    }
  },
  methods: {
    metColor(val) {
      if (val < 4) return '#22c55e'
      if (val < 7) return '#eab308'
      return '#ef4444'
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

.tab-met { display: flex; flex-direction: column; gap: 26px; }

/* ── Hero ── */
.met-hero {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 24px; flex-wrap: wrap;
}
.eyebrow-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.eyebrow-line {
  width: 20px; height: 1.5px;
  background: #eab308; border-radius: 1px; flex-shrink: 0;
}
.eyebrow {
  font-size: 0.6rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.18em;
  color: rgba(234,179,8,0.5);
}
.met-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.2rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: #fff; line-height: 1; margin-bottom: 8px;
}
.met-sub { font-size: 0.83rem; color: rgba(255,255,255,0.28); max-width: 360px; line-height: 1.6; }

/* Formula Card */
.formula-card {
  background: rgba(234,179,8,0.04);
  border: 1px solid rgba(234,179,8,0.15);
  border-radius: 18px; padding: 20px 24px;
  display: flex; flex-direction: column; gap: 12px;
  flex-shrink: 0;
}
.formula-header { }
.formula-eyebrow {
  font-size: 0.6rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.18em;
  color: rgba(234,179,8,0.45);
}
.formula-eq {
  display: flex; align-items: center; gap: 10px;
  flex-wrap: wrap;
}
.formula-factor {
  display: flex; align-items: baseline; gap: 3px;
}
.ff-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 900; color: #eab308;
  letter-spacing: 0.04em;
}
.ff-unit {
  font-size: 0.62rem; color: rgba(234,179,8,0.5);
  font-weight: 600; letter-spacing: 0.06em;
}
.formula-op { color: rgba(255,255,255,0.2); font-size: 1rem; }
.formula-result {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 900;
  color: rgba(255,255,255,0.8); letter-spacing: 0.04em;
}
.formula-example {
  font-size: 0.74rem; color: rgba(255,255,255,0.28);
  border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px;
}
.fe-result { color: #eab308; font-weight: 700; margin-left: 4px; }

/* ── Controls ── */
.controls-row {
  display: flex; align-items: center; gap: 20px;
  flex-wrap: wrap; justify-content: space-between;
}
.legend { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.legend-item {
  display: flex; align-items: center; gap: 7px;
  font-size: 0.72rem; color: rgba(255,255,255,0.3); font-weight: 600;
}
.legend-pip { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

.filter-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip {
  padding: 6px 14px;
  background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px; color: rgba(255,255,255,0.35);
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em;
  cursor: pointer; transition: all 0.18s ease;
}
.chip:hover { border-color: rgba(234,179,8,0.25); color: rgba(255,255,255,0.65); }
.chip.active { background: rgba(234,179,8,0.1); border-color: rgba(234,179,8,0.35); color: #eab308; }

/* ── Met Grid ── */
.met-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(252px, 1fr));
  gap: 11px;
}

.met-card {
  background: #0c0f18;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; padding: 18px 20px;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; gap: 14px;
  transition: border-color 0.22s ease, transform 0.22s ease;
  animation: cardIn 0.3s ease both;
  cursor: default;
}
.met-card:hover {
  border-color: var(--mc, rgba(255,255,255,0.18));
  transform: translateY(-2px);
}
@keyframes cardIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

.mc-accent {
  position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
  background: linear-gradient(90deg, transparent, var(--mc), transparent);
  opacity: 0.5; transition: opacity 0.22s;
}
.met-card:hover .mc-accent { opacity: 1; }

/* Card top */
.mc-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.mc-name-group { display: flex; flex-direction: column; gap: 8px; }
.mc-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.98rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: #fff; line-height: 1.15;
}
.mc-badges { display: flex; gap: 5px; flex-wrap: wrap; }
.mc-badge {
  font-size: 0.58rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 2px 8px; border-radius: 5px;
}
.mc-badge.cat { background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.3); }
.mc-badge.intensity.ringan { background: rgba(34,197,94,0.08);  border: 1px solid rgba(34,197,94,0.2);  color: #22c55e; }
.mc-badge.intensity.sedang { background: rgba(234,179,8,0.08);  border: 1px solid rgba(234,179,8,0.2);  color: #eab308; }
.mc-badge.intensity.berat  { background: rgba(239,68,68,0.08);  border: 1px solid rgba(239,68,68,0.2);  color: #ef4444; }

.mc-kcal {
  display: flex; flex-direction: column; align-items: flex-end; flex-shrink: 0;
}
.mc-kcal-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.6rem; font-weight: 900; line-height: 1;
}
.mc-kcal-sub { font-size: 0.58rem; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 0.06em; }

/* Bar */
.mc-bar-section { display: flex; flex-direction: column; gap: 7px; }
.mc-bar-row { display: flex; align-items: center; justify-content: space-between; }
.mc-bar-label {
  font-size: 0.58rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.14em;
  color: rgba(255,255,255,0.2);
}
.mc-score {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 900; line-height: 1;
}
.mc-bar-track {
  height: 6px; background: rgba(255,255,255,0.06);
  border-radius: 999px; overflow: visible; position: relative;
}
.mc-bar-fill {
  height: 100%; border-radius: 999px;
  transition: width 0.65s ease;
  position: relative; opacity: 0.8;
}
.mc-tick {
  position: absolute; top: -2px; width: 1px; height: 10px;
  background: rgba(255,255,255,0.08);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .met-hero { flex-direction: column; }
  .formula-card { width: 100%; }
  .controls-row { flex-direction: column; align-items: flex-start; }
  .met-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 420px) {
  .met-grid { grid-template-columns: 1fr; }
}
</style>