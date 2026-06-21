<template>
  <div class="nutrisi-wrap">

    <!-- ── MAKRONUTRIEN ── -->
    <div class="section-header">
      <div class="sh-left">
        <div class="sh-bar"></div>
        <div>
          <span class="sh-eyebrow">Fondasi Diet</span>
          <h2 class="sh-title">Makronutrien</h2>
        </div>
      </div>
      <p class="sh-desc">Tiga pilar utama nutrisi yang menentukan energi, pemulihan, dan komposisi tubuh</p>
    </div>

    <div class="makro-row">
      <div
        v-for="makro in makronutrien"
        :key="makro.name"
        class="makro-card"
        :style="{ '--accent': makro.color }"
      >
        <!-- Top accent line -->
        <div class="makro-accent-bar"></div>

        <!-- Photo Banner -->
        <div class="makro-banner">
          <img :src="makro.icon" :alt="makro.name" class="makro-banner-img" />
          <div class="makro-banner-overlay"></div>
          <div class="makro-pct" :style="{ color: makro.color }">
            <span class="makro-pct-num">{{ makro.pct }}</span>
            <span class="makro-pct-unit">%</span>
          </div>
        </div>

        <!-- Body -->
        <div class="makro-body">
          <div class="makro-name-row">
            <h3 class="makro-name">{{ makro.name }}</h3>
            <span class="makro-kcal">{{ makro.kcalPerGram }} kcal/g</span>
          </div>

          <div class="makro-bar-track">
            <div class="makro-bar-fill" :style="{ width: makro.pct + '%', background: makro.color }"></div>
          </div>

          <p class="makro-desc">{{ makro.desc }}</p>
        </div>
      </div>
    </div>

    <!-- ── TIPS ── -->
    <div class="section-header" style="margin-top: 8px">
      <div class="sh-left">
        <div class="sh-bar"></div>
        <div>
          <span class="sh-eyebrow">Panduan Praktis</span>
          <h2 class="sh-title">Tips Nutrisi</h2>
        </div>
      </div>
      <p class="sh-desc">Strategi berbasis riset untuk optimasi performa dan komposisi tubuh</p>
    </div>

    <div class="tips-grid">
      <div v-for="tip in nutrisiTips" :key="tip.title" class="tip-card">
        <div class="tip-top-bar"></div>

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
import { makronutrien, nutrisiTips } from '../../services/bukuData.js'

export default {
  name: 'TabNutrisi',
  data() {
    return { makronutrien, nutrisiTips }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

.nutrisi-wrap { display: flex; flex-direction: column; gap: 22px; }

/* ── Section Header ── */
.section-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 24px;
  flex-wrap: wrap;
}
.sh-left { display: flex; align-items: flex-start; gap: 14px; }
.sh-bar {
  width: 2px; min-height: 50px;
  background: linear-gradient(180deg, #eab308 0%, rgba(234,179,8,0.1) 100%);
  border-radius: 2px; flex-shrink: 0; margin-top: 2px;
}
.sh-eyebrow {
  display: block;
  font-size: 0.6rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.2em;
  color: rgba(234,179,8,0.5); margin-bottom: 5px;
}
.sh-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.7rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: #fff; line-height: 1;
}
.sh-desc {
  font-size: 0.82rem; color: rgba(255,255,255,0.28);
  max-width: 380px; line-height: 1.6;
  align-self: center;
}

/* ── Makro Cards ── */
.makro-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.makro-card {
  background: #0c0f18;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  overflow: hidden;
  display: flex; flex-direction: column;
  position: relative;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  cursor: default;
}
.makro-card:hover {
  border-color: var(--accent, rgba(255,255,255,0.14));
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.5);
}

.makro-accent-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px; z-index: 2;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.6; transition: opacity 0.25s;
}
.makro-card:hover .makro-accent-bar { opacity: 1; }

/* ── Banner foto ── */
.makro-banner {
  position: relative;
  height: 160px;
  overflow: hidden;
}
.makro-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}
.makro-card:hover .makro-banner-img {
  transform: scale(1.05);
}
.makro-banner-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 40%, #0c0f18 100%);
}

/* Persentase di atas foto pojok kanan bawah */
.makro-pct {
  position: absolute; bottom: 12px; right: 16px;
  display: flex; align-items: baseline; gap: 2px;
  z-index: 1;
  text-shadow: 0 2px 8px rgba(0,0,0,0.8);
}
.makro-pct-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.4rem; font-weight: 900; line-height: 1;
}
.makro-pct-unit {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 700; opacity: 0.8;
}

/* ── Body ── */
.makro-body {
  padding: 18px 20px 22px;
  display: flex; flex-direction: column; gap: 12px;
}

.makro-name-row {
  display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
}
.makro-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.2rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.08em; color: #fff;
}
.makro-kcal {
  font-size: 0.7rem; color: rgba(255,255,255,0.22); white-space: nowrap;
}

.makro-bar-track {
  height: 4px; background: rgba(255,255,255,0.06);
  border-radius: 999px; overflow: hidden;
}
.makro-bar-fill { height: 100%; border-radius: 999px; transition: width 0.8s ease; }

.makro-desc {
  font-size: 0.79rem; color: rgba(255,255,255,0.38);
  line-height: 1.68;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 12px;
}

/* ── Tips Grid ── */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
  gap: 12px;
}

.tip-card {
  background: #0c0f18;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px; padding: 22px;
  position: relative; overflow: hidden;
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.tip-card:hover {
  border-color: rgba(234,179,8,0.2);
  transform: translateY(-2px);
}
.tip-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.35), transparent);
}

.tip-header {
  display: flex; align-items: center; gap: 14px; margin-bottom: 20px;
}
.tip-icon-wrap {
  width: 42px; height: 42px; border-radius: 11px; flex-shrink: 0;
  background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.18);
  color: #eab308;
  display: flex; align-items: center; justify-content: center;
}
.tip-icon-wrap :deep(svg) { width: 22px; height: 22px; }
.tip-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.08em; color: #fff;
}

.tip-list { display: flex; flex-direction: column; gap: 10px; list-style: none; }
.tip-item {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 10px 12px;
  border-radius: 9px;
  transition: background 0.18s;
}
.tip-item:hover { background: rgba(255,255,255,0.025); }
.tip-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.72rem; font-weight: 900;
  color: rgba(234,179,8,0.35); letter-spacing: 0.05em;
  flex-shrink: 0; margin-top: 1px;
  transition: color 0.18s;
}
.tip-item:hover .tip-num { color: #eab308; }
.tip-text {
  font-size: 0.79rem; color: rgba(255,255,255,0.42);
  line-height: 1.58; transition: color 0.18s;
}
.tip-item:hover .tip-text { color: rgba(255,255,255,0.68); }

/* ── Responsive ── */
@media (max-width: 860px) {
  .makro-row { grid-template-columns: 1fr; }
  .section-header { flex-direction: column; }
}
@media (max-width: 600px) {
  .tips-grid { grid-template-columns: 1fr; }
}
</style>