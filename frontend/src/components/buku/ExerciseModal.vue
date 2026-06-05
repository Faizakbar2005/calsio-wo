<template>
  <transition name="modal">
    <div v-if="exercise" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-box">

        <!-- Decorative glow -->
        <div class="modal-bg-glow" :style="{ background: `radial-gradient(ellipse at 50% 0%, ${exercise.color}18 0%, transparent 60%)` }"></div>

        <!-- Top accent -->
        <div class="modal-top-bar" :style="{ background: `linear-gradient(90deg, transparent, ${exercise.color}, transparent)` }"></div>

        <!-- Close -->
        <button @click="$emit('close')" class="modal-close">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <!-- Hero -->
        <div class="modal-hero">
          <div class="hero-icon-wrap" :style="{ background: exercise.color + '12', color: exercise.color }">
            <span v-html="exercise.icon"></span>
          </div>
          <div class="hero-info">
            <div class="hero-badges">
              <span class="ex-tag level" :class="exercise.level">{{ levelLabels[exercise.level] }}</span>
              <span class="ex-tag muscle" :style="{ color: exercise.color, background: exercise.color + '12', borderColor: exercise.color + '28' }">{{ exercise.muscle }}</span>
              <span class="ex-tag equip">{{ exercise.equipment }}</span>
            </div>
            <h2 class="modal-title">{{ exercise.name }}</h2>
          </div>
        </div>

        <!-- Content -->
        <div class="modal-content">

          <!-- MET Bar -->
          <div class="met-row">
            <div class="met-info">
              <span class="met-label">MET Score</span>
              <span class="met-val" :style="{ color: exercise.color }">{{ exercise.met }}</span>
            </div>
            <div class="met-bar-track">
              <div class="met-bar-fill" :style="{ width: (exercise.met / 14 * 100) + '%', background: `linear-gradient(90deg, ${exercise.color}60, ${exercise.color})` }"></div>
            </div>
          </div>

          <!-- Desc -->
          <div class="modal-block">
            <div class="block-label">
              <div class="block-dot" :style="{ background: exercise.color }"></div>
              Deskripsi
            </div>
            <p class="modal-desc">{{ exercise.desc }}</p>
          </div>

          <!-- Steps -->
          <div class="modal-block">
            <div class="block-label">
              <div class="block-dot" :style="{ background: exercise.color }"></div>
              Cara Melakukan
            </div>
            <ol class="steps-list">
              <li v-for="(step, i) in exercise.steps" :key="i" class="step-item">
                <span class="step-num" :style="{ background: exercise.color + '14', borderColor: exercise.color + '30', color: exercise.color }">{{ i + 1 }}</span>
                <span class="step-text">{{ step }}</span>
              </li>
            </ol>
          </div>

          <!-- Muscles -->
          <div class="modal-block">
            <div class="block-label">
              <div class="block-dot" :style="{ background: exercise.color }"></div>
              Otot yang Dilatih
            </div>
            <div class="muscle-chips">
              <span v-for="m in exercise.muscles" :key="m" class="muscle-chip">{{ m }}</span>
            </div>
          </div>

          <!-- Tip -->
          <div class="tip-box" :style="{ borderColor: exercise.color + '30', background: exercise.color + '06' }">
            <div class="tip-icon" :style="{ color: exercise.color }">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <p class="tip-text">{{ exercise.tip }}</p>
          </div>

          <!-- Kalori Grid -->
          <div class="kcal-grid">
            <div class="kcal-item" v-for="(dur, label) in { '15 min': 15/60, '30 min': 0.5, '60 min': 1 }" :key="label">
              <span class="kcal-val" :style="{ color: exercise.color }">{{ Math.round(exercise.met * 70 * dur) }}</span>
              <span class="kcal-unit">kcal</span>
              <span class="kcal-dur">{{ label }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ExerciseModal',
  props: {
    exercise: { type: Object, default: null }
  },
  emits: ['close'],
  data() {
    return {
      levelLabels: { beginner: 'Pemula', intermediate: 'Menengah', advanced: 'Mahir' }
    }
  },
  watch: {
    exercise(val) {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

.modal-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0,0,0,0.88);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.modal-box {
  background: #0a0d16;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 24px;
  width: 100%; max-width: 540px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  font-family: 'Barlow', sans-serif;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.modal-box::-webkit-scrollbar { width: 4px; }
.modal-box::-webkit-scrollbar-track { background: transparent; }
.modal-box::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }

.modal-bg-glow {
  position: absolute; top: 0; left: 0; right: 0; height: 200px;
  pointer-events: none; z-index: 0;
}
.modal-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
  z-index: 1;
}

.modal-close {
  position: absolute; top: 16px; right: 16px; z-index: 10;
  width: 30px; height: 30px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 8px;
  color: rgba(255,255,255,0.35);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.modal-close:hover { background: rgba(239,68,68,0.12); color: #ef4444; border-color: rgba(239,68,68,0.3); }

/* Hero */
.modal-hero {
  position: relative; z-index: 1;
  display: flex; align-items: center; gap: 20px;
  padding: 36px 28px 28px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.hero-icon-wrap {
  width: 68px; height: 68px; border-radius: 18px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.hero-icon-wrap :deep(svg) { width: 40px; height: 40px; }

.hero-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
.ex-tag {
  font-size: 0.62rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.09em;
  padding: 3px 10px; border-radius: 6px; border: 1px solid;
}
.ex-tag.level.beginner     { background: rgba(34,197,94,0.1); color: #22c55e; border-color: rgba(34,197,94,0.25); }
.ex-tag.level.intermediate { background: rgba(234,179,8,0.1); color: #eab308; border-color: rgba(234,179,8,0.25); }
.ex-tag.level.advanced     { background: rgba(239,68,68,0.1);  color: #ef4444; border-color: rgba(239,68,68,0.25); }
.ex-tag.equip { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.3); border-color: rgba(255,255,255,0.08); }

.modal-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.9rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.04em;
  color: #fff; line-height: 1;
}

/* Content */
.modal-content {
  position: relative; z-index: 1;
  padding: 26px 28px 32px;
  display: flex; flex-direction: column; gap: 26px;
}

/* MET Row */
.met-row {
  display: flex; align-items: center; gap: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px; padding: 14px 18px;
}
.met-info { display: flex; flex-direction: column; gap: 2px; flex-shrink: 0; }
.met-label {
  font-size: 0.6rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.14em;
  color: rgba(255,255,255,0.2);
}
.met-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem; font-weight: 900; line-height: 1;
}
.met-bar-track {
  flex: 1; height: 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 999px; overflow: hidden;
}
.met-bar-fill { height: 100%; border-radius: 999px; transition: width 0.7s ease; }

/* Blocks */
.modal-block { display: flex; flex-direction: column; gap: 12px; }
.block-label {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.62rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.15em;
  color: rgba(255,255,255,0.22);
}
.block-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

.modal-desc {
  font-size: 0.86rem; color: rgba(255,255,255,0.48); line-height: 1.72;
}

/* Steps */
.steps-list { display: flex; flex-direction: column; gap: 9px; list-style: none; }
.step-item { display: flex; gap: 12px; align-items: flex-start; }
.step-num {
  width: 24px; height: 24px; flex-shrink: 0;
  border: 1px solid; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.78rem; font-weight: 900; line-height: 1;
}
.step-text { font-size: 0.84rem; color: rgba(255,255,255,0.48); line-height: 1.65; padding-top: 3px; }

/* Muscles */
.muscle-chips { display: flex; flex-wrap: wrap; gap: 7px; }
.muscle-chip {
  font-size: 0.72rem; font-weight: 600;
  padding: 5px 12px; border-radius: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.5);
  transition: all 0.18s;
}
.muscle-chip:hover { border-color: rgba(255,255,255,0.18); color: rgba(255,255,255,0.75); }

/* Tip */
.tip-box {
  display: flex; gap: 12px; align-items: flex-start;
  border-width: 1px; border-style: solid;
  border-radius: 12px; padding: 14px 16px;
}
.tip-icon { display: flex; align-items: center; flex-shrink: 0; margin-top: 1px; }
.tip-text { font-size: 0.83rem; color: rgba(255,255,255,0.48); line-height: 1.65; }

/* Kcal Grid */
.kcal-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; overflow: hidden;
}
.kcal-item {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 3px; padding: 20px 12px;
  border-right: 1px solid rgba(255,255,255,0.06);
  transition: background 0.2s;
}
.kcal-item:last-child { border-right: none; }
.kcal-item:hover { background: rgba(255,255,255,0.025); }
.kcal-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem; font-weight: 900; line-height: 1;
}
.kcal-unit {
  font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.1em; color: rgba(255,255,255,0.22);
}
.kcal-dur {
  font-size: 0.68rem; color: rgba(255,255,255,0.2);
  margin-top: 2px;
}

/* Transition */
.modal-enter-active, .modal-leave-active { transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95) translateY(8px); }
</style>