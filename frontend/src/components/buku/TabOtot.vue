<template>
  <div class="muscle-guide-grid">
    <div v-for="mg in muscleGuides" :key="mg.name" class="muscle-guide-card">
      <div class="card-top-bar" :style="{ background: `linear-gradient(90deg, transparent, ${mg.color}, transparent)` }"></div>

      <div class="mg-header">
        <div class="mg-icon-wrap" :style="{ background: mg.color + '14', border: `1px solid ${mg.color}38`, color: mg.color }">
          <span v-html="mg.icon"></span>
        </div>
        <div>
          <h3 class="mg-name">{{ mg.name }}</h3>
          <p class="mg-latin">{{ mg.latin }}</p>
        </div>
      </div>

      <p class="mg-desc">{{ mg.desc }}</p>

      <div class="mg-exercises">
        <span class="mg-ex-label">Latihan utama:</span>
        <div class="mg-ex-tags">
          <span v-for="e in mg.exercises" :key="e" class="mg-ex-tag">{{ e }}</span>
        </div>
      </div>

      <div class="mg-tip">
        <span class="tip-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </span>
        <span>{{ mg.tip }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { muscleGuides } from './bukuData.js'

export default {
  name: 'TabOtot',
  data() {
    return { muscleGuides }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

.muscle-guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.muscle-guide-card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 24px; position: relative; overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;
}
.muscle-guide-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }

.card-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; }

.mg-header { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }

.mg-icon-wrap {
  width: 50px; height: 50px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: filter 0.2s;
}
.muscle-guide-card:hover .mg-icon-wrap {
  filter: drop-shadow(0 0 8px currentColor);
}
/* scale the SVG inside to fit nicely */
.mg-icon-wrap :deep(svg) { width: 28px; height: 28px; }

.mg-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.06em; color: #fff;
}
.mg-latin { font-size: 0.72rem; color: rgba(255,255,255,0.3); margin-top: 2px; font-style: italic; }

.mg-desc { font-size: 0.83rem; color: rgba(255,255,255,0.5); line-height: 1.65; margin-bottom: 16px; }

.mg-exercises { margin-bottom: 14px; }
.mg-ex-label {
  font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.22); display: block; margin-bottom: 8px;
}
.mg-ex-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.mg-ex-tag {
  font-size: 0.72rem; font-weight: 600;
  padding: 4px 10px; border-radius: 6px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.45);
  transition: border-color 0.15s, color 0.15s;
}
.mg-ex-tag:hover { border-color: rgba(234,179,8,0.3); color: rgba(255,255,255,0.7); }

.mg-tip {
  display: flex; gap: 8px; align-items: flex-start;
  background: rgba(234,179,8,0.05); border: 1px solid rgba(234,179,8,0.14);
  border-radius: 10px; padding: 10px 12px;
  font-size: 0.78rem; color: rgba(255,255,255,0.45); line-height: 1.55;
}
.tip-icon { display: flex; align-items: center; flex-shrink: 0; margin-top: 1px; }
</style>