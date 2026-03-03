<template>
  <div class="tab-met">

    <!-- ── Header ── -->
    <div class="met-hero">
      <div class="met-hero-left">
        <div class="section-label-row">
          <div class="section-label-line"></div>
          <span class="section-label">Metabolic Equivalent of Task</span>
        </div>
        <h2 class="met-hero-title">Tabel MET</h2>
        <p class="met-hero-sub">Ukuran intensitas aktivitas fisik. Semakin tinggi MET, semakin banyak kalori terbakar.</p>
      </div>

      <!-- Formula box -->
      <div class="formula-box">
        <div class="formula-label">Formula Kalori</div>
        <div class="formula-eq">
          <span class="formula-var">MET</span>
          <span class="formula-op">×</span>
          <span class="formula-var">Berat <small>kg</small></span>
          <span class="formula-op">×</span>
          <span class="formula-var">Durasi <small>jam</small></span>
        </div>
        <div class="formula-example">
          Contoh: Push Up → 3.8 × 70 × 0.5 = <strong>133 kcal</strong>
        </div>
      </div>
    </div>

    <!-- ── Legend ── -->
    <div class="met-legend">
      <div class="legend-item">
        <span class="legend-dot" style="background:#22c55e"></span>
        <span>Ringan &lt; 4</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background:#eab308"></span>
        <span>Sedang 4–7</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background:#ef4444"></span>
        <span>Berat &gt; 7</span>
      </div>
      <div class="legend-sep"></div>
      <div class="met-filter-row">
        <button
          v-for="cat in metCategories"
          :key="cat"
          @click="metFilter = metFilter === cat ? '' : cat"
          :class="['chip', metFilter === cat ? 'active' : '']"
        >{{ cat }}</button>
      </div>
    </div>

    <!-- ── Card Grid ── -->
    <div class="met-grid">
      <div
        v-for="row in filteredMet"
        :key="row.name"
        class="met-card"
        :style="{ '--met-color': metColor(row.met) }"
      >
        <div class="met-card-accent"></div>

        <!-- Top row: name + kcal -->
        <div class="met-card-top">
          <div class="met-card-name">{{ row.name }}</div>
          <div class="met-kcal-pill">
            <span class="met-kcal-num">{{ Math.round(row.met * 70 * 0.5) }}</span>
            <span class="met-kcal-lbl">kcal/30min</span>
          </div>
        </div>

        <!-- Badges -->
        <div class="met-card-badges">
          <span class="badge cat">{{ row.category }}</span>
          <span class="badge intensity" :class="row.intensity">{{ row.intensity }}</span>
        </div>

        <!-- MET bar -->
        <div class="met-bar-section">
          <div class="met-bar-header">
            <span class="met-bar-label">MET Score</span>
            <span class="met-score" :style="{ color: metColor(row.met) }">{{ row.met }}</span>
          </div>
          <div class="met-bar-track">
            <div
              class="met-bar-fill"
              :style="{
                width: (row.met / maxMet * 100) + '%',
                background: `linear-gradient(90deg, ${metColor(row.met)}80, ${metColor(row.met)})`
              }"
            ></div>
            <!-- scale ticks -->
            <div class="met-tick" style="left: 32.5%"></div>
            <div class="met-tick" style="left: 57%"></div>
          </div>
          <div class="met-bar-scale">
            <span>0</span>
            <span style="margin-left: 28%">4</span>
            <span style="margin-left: 18%">7</span>
            <span style="margin-left: auto">{{ maxMet }}</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { metData, metCategories } from './bukuData.js'

export default {
  name: 'TabMet',
  data() {
    return {
      metFilter: '',
      metData,
      metCategories,
    }
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
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;600&display=swap');

.tab-met { display: flex; flex-direction: column; gap: 24px; }

/* ── Hero ── */
.met-hero {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 24px; flex-wrap: wrap;
}
.section-label-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.section-label-line { width: 3px; height: 14px; background: #eab308; border-radius: 2px; }
.section-label {
  font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.18em;
  color: rgba(255,255,255,0.3);
}
.met-hero-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: #fff; line-height: 1; margin-bottom: 6px;
}
.met-hero-sub { font-size: 0.82rem; color: rgba(255,255,255,0.35); max-width: 380px; }

/* Formula box */
.formula-box {
  background: rgba(234,179,8,0.06);
  border: 1px solid rgba(234,179,8,0.2);
  border-radius: 16px; padding: 18px 24px;
  display: flex; flex-direction: column; gap: 10px;
  flex-shrink: 0;
}
.formula-label {
  font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.14em;
  color: rgba(234,179,8,0.5);
}
.formula-eq {
  display: flex; align-items: center; gap: 10px;
}
.formula-var {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 900;
  color: #eab308; letter-spacing: 0.04em;
}
.formula-var small { font-size: 0.65rem; opacity: 0.6; margin-left: 2px; font-family: 'Barlow', sans-serif; font-weight: 400; }
.formula-op { color: rgba(255,255,255,0.25); font-size: 1rem; }
.formula-example { font-size: 0.76rem; color: rgba(255,255,255,0.35); border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; }
.formula-example strong { color: #eab308; }

/* ── Legend + Filter ── */
.met-legend {
  display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
}
.legend-item {
  display: flex; align-items: center; gap: 7px;
  font-size: 0.73rem; color: rgba(255,255,255,0.35); font-weight: 600;
}
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.legend-sep { width: 1px; height: 20px; background: rgba(255,255,255,0.08); }

.met-filter-row { display: flex; flex-wrap: wrap; gap: 6px; }
.chip {
  padding: 5px 14px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px; color: rgba(255,255,255,0.4);
  font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;
  cursor: pointer; transition: all 0.2s;
}
.chip:hover { border-color: rgba(234,179,8,0.3); color: rgba(255,255,255,0.7); }
.chip.active { background: rgba(234,179,8,0.12); border-color: #eab308; color: #eab308; }

/* ── Card Grid ── */
.met-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

.met-card {
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 18px 20px;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; gap: 12px;
  transition: border-color 0.2s, transform 0.2s;
}
.met-card:hover {
  border-color: var(--met-color, rgba(255,255,255,0.2));
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.met-card-accent {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--met-color), transparent);
  opacity: 0.7;
}

/* Card top */
.met-card-top {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 10px;
}
.met-card-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: #fff; line-height: 1.2;
}
.met-kcal-pill {
  display: flex; flex-direction: column; align-items: flex-end;
  flex-shrink: 0;
}
.met-kcal-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.4rem; font-weight: 900;
  color: var(--met-color); line-height: 1;
}
.met-kcal-lbl { font-size: 0.58rem; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.06em; }

/* Badges */
.met-card-badges { display: flex; gap: 6px; flex-wrap: wrap; }
.badge {
  font-size: 0.62rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.07em;
  padding: 3px 9px; border-radius: 999px;
}
.badge.cat { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.35); }
.badge.intensity.ringan { background: rgba(34,197,94,0.1);  border: 1px solid rgba(34,197,94,0.25);  color: #22c55e; }
.badge.intensity.sedang { background: rgba(234,179,8,0.1);  border: 1px solid rgba(234,179,8,0.25);  color: #eab308; }
.badge.intensity.berat  { background: rgba(239,68,68,0.1);  border: 1px solid rgba(239,68,68,0.25);  color: #ef4444; }

/* MET Bar */
.met-bar-section { display: flex; flex-direction: column; gap: 6px; }
.met-bar-header { display: flex; align-items: center; justify-content: space-between; }
.met-bar-label { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); }
.met-score {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 900; line-height: 1;
}

.met-bar-track {
  height: 8px; background: rgba(255,255,255,0.06);
  border-radius: 999px; overflow: visible; position: relative;
}
.met-bar-fill {
  height: 100%; border-radius: 999px;
  transition: width 0.6s ease;
  position: relative;
}
.met-tick {
  position: absolute; top: -2px; width: 1px; height: 12px;
  background: rgba(255,255,255,0.1);
}

.met-bar-scale {
  display: flex; align-items: center;
  font-size: 0.6rem; color: rgba(255,255,255,0.2);
  font-weight: 600; letter-spacing: 0.04em;
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .met-hero { flex-direction: column; }
  .formula-box { width: 100%; }
  .met-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 420px) {
  .met-grid { grid-template-columns: 1fr; }
}
</style>