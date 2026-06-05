<template>
  <div class="tab-otot">

    <!-- Section intro -->
    <div class="section-intro">
      <div class="intro-line"></div>
      <div class="intro-text">
        <span class="intro-label">9 kelompok otot</span>
        <p class="intro-desc">Panduan lengkap anatomi otot, fungsi, dan latihan terbaik untuk setiap bagian tubuh</p>
      </div>
    </div>

    <!-- Grid -->
    <div class="muscle-guide-grid">
      <div
        v-for="mg in muscleGuides"
        :key="mg.name"
        class="muscle-guide-card"
        :style="{ '--accent': mg.color }"
      >
        <div class="card-glow"></div>
        <div class="card-top-bar"></div>

        <!-- Header -->
        <div class="mg-header">
          <div class="mg-icon-wrap" :style="{ background: mg.color + '12', border: `1px solid ${mg.color}28`, color: mg.color }">
            <span v-html="mg.icon"></span>
          </div>
          <div class="mg-title-group">
            <h3 class="mg-name">{{ mg.name }}</h3>
            <p class="mg-latin">{{ mg.latin }}</p>
          </div>
        </div>

        <!-- Desc -->
        <p class="mg-desc">{{ mg.desc }}</p>

        <!-- Exercises -->
        <div class="mg-exercises">
          <span class="mg-ex-label">Latihan utama</span>
          <div class="mg-ex-tags">
            <span v-for="e in mg.exercises" :key="e" class="mg-ex-tag">{{ e }}</span>
          </div>
        </div>

        <!-- Tip -->
        <div class="mg-tip">
          <div class="tip-icon-wrap">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <span class="tip-text">{{ mg.tip }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// BENAR
import { muscleGuides } from '../../services/bukuData.js'

export default {
  name: 'TabOtot',
  data() {
    return { muscleGuides }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

.tab-otot { display: flex; flex-direction: column; gap: 28px; }

/* ── Intro ── */
.section-intro {
  display: flex; align-items: flex-start; gap: 18px;
}
.intro-line {
  width: 2px; min-height: 52px;
  background: linear-gradient(180deg, #eab308 0%, rgba(234,179,8,0.1) 100%);
  border-radius: 2px; flex-shrink: 0; margin-top: 2px;
}
.intro-label {
  display: block;
  font-size: 0.62rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.2em;
  color: rgba(234,179,8,0.6); margin-bottom: 6px;
}
.intro-desc {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.35);
  line-height: 1.6;
  max-width: 460px;
}

/* ── Grid ── */
.muscle-guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 14px;
}

/* ── Card ── */
.muscle-guide-card {
  background: #0c0f18;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  padding: 26px;
  position: relative; overflow: hidden;
  transition: border-color 0.25s ease, transform 0.25s ease;
  cursor: default;
}
.muscle-guide-card:hover {
  border-color: rgba(255,255,255,0.12);
  transform: translateY(-3px);
}
.muscle-guide-card:hover .card-glow {
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: -40px; left: 50%; transform: translateX(-50%);
  width: 200px; height: 120px;
  background: radial-gradient(ellipse at center, var(--accent, #eab308) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.card-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
  background: linear-gradient(90deg, transparent 0%, var(--accent, #eab308) 50%, transparent 100%);
  opacity: 0.5;
}
.muscle-guide-card:hover .card-top-bar { opacity: 0.9; }

/* Header */
.mg-header {
  display: flex; align-items: center; gap: 16px;
  margin-bottom: 18px;
}
.mg-icon-wrap {
  width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s ease;
}
.muscle-guide-card:hover .mg-icon-wrap {
  filter: drop-shadow(0 0 10px var(--accent));
  border-color: var(--accent, rgba(255,255,255,0.3)) !important;
}
.mg-icon-wrap :deep(svg) { width: 28px; height: 28px; }

.mg-title-group { display: flex; flex-direction: column; gap: 3px; }
.mg-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.15rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.07em; color: #fff;
  line-height: 1;
}
.mg-latin {
  font-size: 0.7rem; color: rgba(255,255,255,0.25);
  font-style: italic; letter-spacing: 0.01em;
}

/* Desc */
.mg-desc {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.42);
  line-height: 1.7;
  margin-bottom: 20px;
}

/* Exercises */
.mg-exercises { margin-bottom: 16px; }
.mg-ex-label {
  font-size: 0.6rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.14em;
  color: rgba(255,255,255,0.18);
  display: block; margin-bottom: 9px;
}
.mg-ex-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.mg-ex-tag {
  font-size: 0.7rem; font-weight: 600;
  padding: 5px 11px; border-radius: 7px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.4);
  transition: all 0.18s ease;
  cursor: default;
}
.mg-ex-tag:hover {
  border-color: var(--accent, rgba(234,179,8,0.4));
  color: rgba(255,255,255,0.75);
  background: rgba(255,255,255,0.06);
}

/* Tip */
.mg-tip {
  display: flex; gap: 10px; align-items: flex-start;
  background: rgba(234,179,8,0.04);
  border: 1px solid rgba(234,179,8,0.12);
  border-radius: 11px;
  padding: 12px 14px;
}
.tip-icon-wrap {
  display: flex; align-items: center;
  color: rgba(234,179,8,0.6);
  flex-shrink: 0; margin-top: 1px;
}
.tip-text {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.6;
}

@media (max-width: 600px) {
  .muscle-guide-grid { grid-template-columns: 1fr; }
}
</style>