<template>
  <div class="nutrisi-wrap">

    <!-- ── MAKRONUTRIEN SECTION ─────────────────────────────────── -->
    <div class="section-header">
      <div class="section-label-line"></div>
      <span class="section-label">Makronutrien</span>
    </div>

    <div class="makro-row">
      <div v-for="makro in makronutrien" :key="makro.name" class="makro-card" :style="{ '--accent': makro.color }">
        <div class="makro-top">
          <div class="makro-icon-wrap" :style="{ background: makro.color + '15', border: `1px solid ${makro.color}30`, color: makro.color }">
            <span v-html="makro.icon"></span>
          </div>
          <div class="makro-info">
            <div class="makro-name">{{ makro.name }}</div>
            <div class="makro-kcal">{{ makro.kcalPerGram }} kcal/gram</div>
          </div>
          <div class="makro-pct-badge" :style="{ color: makro.color, background: makro.color + '12', border: `1px solid ${makro.color}25` }">
            {{ makro.pct }}%
          </div>
        </div>

        <div class="makro-bar-wrap">
          <div class="makro-bar-track">
            <div class="makro-bar-fill" :style="{ width: makro.pct + '%', background: `linear-gradient(90deg, ${makro.color}99, ${makro.color})` }"></div>
          </div>
          <span class="makro-bar-label">{{ makro.pct }}% dari kebutuhan harian</span>
        </div>

        <p class="makro-desc">{{ makro.desc }}</p>
      </div>
    </div>

    <!-- ── TIPS SECTION ─────────────────────────────────────────── -->
    <div class="section-header">
      <div class="section-label-line"></div>
      <span class="section-label">Tips & Panduan</span>
    </div>

    <div class="tips-grid">
      <div v-for="tip in nutrisiTips" :key="tip.title" class="tip-card">
        <div class="tip-card-bar"></div>

        <div class="tip-header">
          <div class="tip-icon-wrap">
            <span v-html="tip.icon"></span>
          </div>
          <h3 class="tip-title">{{ tip.title }}</h3>
        </div>

        <ul class="tip-list">
          <li v-for="(item, idx) in tip.items" :key="item" class="tip-item">
            <span class="tip-num">{{ String(idx + 1).padStart(2, '0') }}</span>
            <span class="tip-text">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { makronutrien, nutrisiTips } from './bukuData.js'

export default {
  name: 'TabNutrisi',
  data() {
    return { makronutrien, nutrisiTips }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

.nutrisi-wrap {
  display: flex; flex-direction: column; gap: 20px;
}

/* ── Section Header ── */
.section-header {
  display: flex; align-items: center; gap: 14px;
  margin-top: 8px;
}
.section-label-line {
  width: 3px; height: 18px;
  background: linear-gradient(180deg, #eab308, #ca8a04);
  border-radius: 2px; flex-shrink: 0;
}
.section-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.72rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.18em;
  color: rgba(255,255,255,0.3);
}

/* ── Makronutrien ── */
.makro-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.makro-card {
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 22px;
  display: flex; flex-direction: column; gap: 16px;
  position: relative; overflow: hidden;
  transition: border-color 0.25s, transform 0.25s;
}
.makro-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}
.makro-card:hover {
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-2px);
}

.makro-top { display: flex; align-items: center; gap: 12px; }
.makro-icon-wrap {
  width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.makro-icon-wrap :deep(svg) { width: 26px; height: 26px; }

.makro-info { flex: 1; }
.makro-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.08em; color: #fff;
}
.makro-kcal { font-size: 0.7rem; color: rgba(255,255,255,0.3); margin-top: 2px; }

.makro-pct-badge {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.2rem; font-weight: 900;
  padding: 4px 12px; border-radius: 8px;
  flex-shrink: 0; line-height: 1;
}

.makro-bar-wrap { display: flex; flex-direction: column; gap: 6px; }
.makro-bar-track {
  height: 6px; background: rgba(255,255,255,0.06);
  border-radius: 999px; overflow: hidden;
}
.makro-bar-fill { height: 100%; border-radius: 999px; transition: width 0.8s ease; }
.makro-bar-label { font-size: 0.68rem; color: rgba(255,255,255,0.25); }

.makro-desc { font-size: 0.8rem; color: rgba(255,255,255,0.45); line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 14px; }

/* ── Tips Grid ── */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 14px;
}

.tip-card {
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 22px;
  position: relative; overflow: hidden;
  transition: border-color 0.25s, transform 0.25s;
}
.tip-card:hover { border-color: rgba(234,179,8,0.2); transform: translateY(-2px); }
.tip-card-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.4), transparent);
}

.tip-header {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 18px;
}
.tip-icon-wrap {
  width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
  background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.2);
  color: #eab308;
  display: flex; align-items: center; justify-content: center;
}
.tip-icon-wrap :deep(svg) { width: 22px; height: 22px; }

.tip-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.07em; color: #fff;
}

.tip-list { display: flex; flex-direction: column; gap: 10px; list-style: none; }
.tip-item {
  display: flex; gap: 12px; align-items: flex-start;
}
.tip-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem; font-weight: 900;
  color: #eab308; opacity: 0.5;
  letter-spacing: 0.05em; flex-shrink: 0;
  margin-top: 1px;
}
.tip-text {
  font-size: 0.8rem; color: rgba(255,255,255,0.5);
  line-height: 1.55;
}
.tip-item:hover .tip-num { opacity: 1; }
.tip-item:hover .tip-text { color: rgba(255,255,255,0.7); }

/* ── Responsive ── */
@media (max-width: 860px) {
  .makro-row { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .tips-grid { grid-template-columns: 1fr; }
}
</style>