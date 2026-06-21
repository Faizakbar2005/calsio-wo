<template>
  <div class="tab-met">

    <!-- ── Hero ── -->
    <div class="met-hero">
      <div class="met-hero-left">
        <div class="eyebrow-row">
          <div class="eyebrow-line"></div>
          <span class="eyebrow">Berdasarkan 2024 Compendium of Physical Activities</span>
        </div>
        <h2 class="met-title">Tabel MET</h2>
        <p class="met-sub">Metabolic Equivalent of Task — ukuran standar intensitas aktivitas fisik relatif terhadap kondisi istirahat</p>
      </div>

      <div class="info-strip">
        <div class="info-item">
          <span class="info-val">1 MET</span>
          <span class="info-desc">= duduk diam</span>
        </div>
        <div class="info-divider"></div>
        <div class="info-item">
          <span class="info-val">&lt; 4</span>
          <span class="info-desc green">Ringan</span>
        </div>
        <div class="info-divider"></div>
        <div class="info-item">
          <span class="info-val">4 – 7</span>
          <span class="info-desc yellow">Sedang</span>
        </div>
        <div class="info-divider"></div>
        <div class="info-item">
          <span class="info-val">&gt; 7</span>
          <span class="info-desc red">Berat</span>
        </div>
      </div>
    </div>

    <!-- ── Controls ── -->
    <div class="controls-row">
      <p class="result-count">{{ filteredMet.length }} aktivitas</p>
      <div class="filter-chips">
        <button
          v-for="cat in metCategories"
          :key="cat"
          @click="metFilter = metFilter === cat ? '' : cat"
          :class="['chip', metFilter === cat ? 'active' : '']"
        >{{ cat }}</button>
      </div>
    </div>

    <!-- ── List ── -->
    <div class="met-list">
      <div
        v-for="(row, idx) in filteredMet"
        :key="row.name"
        class="met-row"
        :style="{ '--mc': metColor(row.met), animationDelay: (idx * 0.025) + 's' }"
      >
        <div class="mr-thumb">
          <img
            v-if="exerciseIcons[row.name] && !imgErrors[row.name]"
            :src="exerciseIcons[row.name]"
            :alt="row.name"
            class="mr-thumb-img"
            loading="lazy"
            @error="onImgError(row.name)"
          />
          <span v-else class="mr-thumb-fallback">{{ row.name.charAt(0) }}</span>
        </div>

        <div class="mr-main">
          <div class="mr-head">
            <div class="mr-name">{{ row.name }}</div>
            <div class="mr-met" :style="{ color: metColor(row.met) }">{{ row.met }}</div>
          </div>

          <div class="mr-sub">
            <div class="mr-badges">
              <span class="mr-badge cat">{{ row.category }}</span>
              <span class="mr-badge intensity" :class="row.intensity">{{ row.intensity }}</span>
            </div>
            <div class="mr-bar-track">
              <div
                class="mr-bar-fill"
                :style="{ width: (row.met / maxMet * 100) + '%', background: metColor(row.met) }"
              ></div>
              <div class="mr-tick" style="left: 32.4%"></div>
              <div class="mr-tick" style="left: 56.7%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="source-note">
      Nilai MET berdasarkan
      <a href="https://pacompendium.com" target="_blank" rel="noopener">2024 Compendium of Physical Activities</a>
      — Herrmann et al., Journal of Sport and Health Science, 2024.
    </p>

  </div>
</template>

<script>
import { metData, metCategories, exerciseIcons } from '../../services/bukuData.js'

export default {
  name: 'TabMet',
  data() {
    return {
      metFilter: '',
      metData,
      metCategories,
      exerciseIcons,
      imgErrors: {},
    }
  },
  computed: {
    filteredMet() {
      if (!this.metFilter || this.metFilter === 'Semua') return this.metData
      return this.metData.filter(m => m.category === this.metFilter)
    },
    maxMet() {
      return Math.max(...this.metData.map(d => d.met))
    },
  },
  methods: {
    metColor(val) {
      if (val < 4) return '#22c55e'
      if (val < 7) return '#eab308'
      return '#ef4444'
    },
    onImgError(name) {
      this.imgErrors = { ...this.imgErrors, [name]: true }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

.tab-met { display: flex; flex-direction: column; gap: 24px; }

/* Hero */
.met-hero {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 24px; flex-wrap: wrap;
}
.eyebrow-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.eyebrow-line { width: 20px; height: 1.5px; background: #eab308; border-radius: 1px; flex-shrink: 0; }
.eyebrow { font-size: 0.58rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(234,179,8,0.5); }
.met-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.2rem; font-weight: 900; text-transform: uppercase;
  letter-spacing: 0.05em; color: #fff; line-height: 1; margin-bottom: 8px;
}
.met-sub { font-size: 0.82rem; color: rgba(255,255,255,0.28); max-width: 380px; line-height: 1.65; }

/* Info strip */
.info-strip {
  display: flex; align-items: stretch; gap: 0;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; overflow: hidden; flex-shrink: 0;
}
.info-item {
  display: flex; flex-direction: column; align-items: center;
  gap: 5px; padding: 18px 24px; text-align: center;
}
.info-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 900; color: #fff;
}
.info-desc { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); }
.info-desc.green { color: #22c55e; }
.info-desc.yellow { color: #eab308; }
.info-desc.red { color: #ef4444; }
.info-divider { width: 1px; background: rgba(255,255,255,0.07); flex-shrink: 0; }

/* Controls */
.controls-row {
  display: flex; align-items: center; gap: 16px;
  flex-wrap: wrap; justify-content: space-between;
}
.result-count { font-size: 0.75rem; color: rgba(255,255,255,0.22); }
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

/* List */
.met-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 6px 10px;
}

.met-row {
  background: #0c0f18;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  transition: border-color 0.2s ease, background 0.2s ease;
  animation: rowIn 0.28s ease both;
}
.met-row::before {
  content: '';
  position: absolute; left: 0; top: 10px; bottom: 10px; width: 2px;
  background: var(--mc); border-radius: 2px; opacity: 0.2;
  transition: opacity 0.2s;
}
.met-row:hover { border-color: rgba(255,255,255,0.14); background: #10131e; }
.met-row:hover::before { opacity: 0.6; }
@keyframes rowIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

/* Small, non-dominant thumbnail */
.mr-thumb {
  width: 38px; height: 38px;
  border-radius: 8px;
  overflow: hidden; flex-shrink: 0;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center;
}
.mr-thumb-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center 25%;
  display: block;
  opacity: 0.85;
}
.mr-thumb-fallback {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.95rem; font-weight: 900;
  color: var(--mc, #eab308); opacity: 0.6;
}

/* Main content area */
.mr-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mr-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.mr-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.88rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: #fff; line-height: 1.2;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.mr-met {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.25rem; font-weight: 900; line-height: 1;
  flex-shrink: 0;
}

.mr-sub {
  display: flex;
  align-items: center;
  gap: 12px;
}
.mr-badges { display: flex; gap: 5px; flex-shrink: 0; }
.mr-badge {
  font-size: 0.54rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.07em; padding: 2px 6px; border-radius: 5px;
  white-space: nowrap;
}
.mr-badge.cat { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.28); }
.mr-badge.intensity { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.4); }

.mr-bar-track {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.06);
  border-radius: 999px;
  overflow: visible;
  position: relative;
  min-width: 60px;
}
.mr-bar-fill { height: 100%; border-radius: 999px; transition: width 0.65s ease; opacity: 0.75; }
.mr-tick { position: absolute; top: -1.5px; width: 1px; height: 7px; background: rgba(255,255,255,0.1); }

/* Source note */
.source-note { font-size: 0.68rem; color: rgba(255,255,255,0.15); text-align: center; line-height: 1.6; }
.source-note a { color: rgba(234,179,8,0.4); text-decoration: none; }
.source-note a:hover { color: #eab308; }

/* Responsive */
@media (max-width: 860px) {
  .met-hero { flex-direction: column; }
  .info-strip { align-self: stretch; }
}
@media (max-width: 640px) {
  .controls-row { flex-direction: column; align-items: flex-start; }
  .mr-sub { flex-wrap: wrap; gap: 8px; }
  .mr-bar-track { min-width: 100%; order: 3; }
}
@media (max-width: 420px) {
  .met-row { padding: 8px 12px; gap: 10px; }
  .mr-thumb { width: 32px; height: 32px; }
  .mr-name { font-size: 0.8rem; }
}
</style>