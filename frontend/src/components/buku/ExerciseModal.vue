<template>
  <transition name="modal">
    <div v-if="exercise" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-box">
        <div class="modal-top-bar"></div>

        <button @click="$emit('close')" class="modal-close">✕</button>

        <!-- Hero -->
        <div class="modal-hero" :style="{ background: `linear-gradient(135deg, ${exercise.color}22, transparent)` }">
          <div class="modal-emoji">{{ exercise.emoji }}</div>
          <div class="modal-hero-info">
            <h2 class="modal-title">{{ exercise.name }}</h2>
            <div class="modal-badges">
              <span class="ex-tag muscle">{{ exercise.muscle }}</span>
              <span class="ex-tag equip">{{ exercise.equipment }}</span>
              <span class="ex-difficulty" :class="exercise.level">{{ exercise.level }}</span>
            </div>
          </div>
        </div>

        <div class="modal-body">

          <!-- MET Bar -->
          <div class="met-highlight">
            <span class="mh-label">MET Score</span>
            <div class="mh-bar-wrap">
              <div class="mh-bar" :style="{ width: (exercise.met / 15 * 100) + '%', background: exercise.color }"></div>
            </div>
            <span class="mh-val">{{ exercise.met }}</span>
          </div>

          <!-- Deskripsi -->
          <div class="modal-section">
            <h4 class="modal-section-title">📋 Deskripsi</h4>
            <p class="modal-desc">{{ exercise.desc }}</p>
          </div>

          <!-- Cara Melakukan -->
          <div class="modal-section">
            <h4 class="modal-section-title">🎯 Cara Melakukan</h4>
            <ol class="steps-list">
              <li v-for="(step, i) in exercise.steps" :key="i" class="step-item">
                <span class="step-num">{{ i + 1 }}</span>
                <span>{{ step }}</span>
              </li>
            </ol>
          </div>

          <!-- Otot yang Dilatih -->
          <div class="modal-section">
            <h4 class="modal-section-title">💪 Otot yang Dilatih</h4>
            <div class="muscle-chips">
              <span v-for="m in exercise.muscles" :key="m" class="muscle-chip">{{ m }}</span>
            </div>
          </div>

          <!-- Tips -->
          <div class="modal-tip-box" :style="{ borderColor: exercise.color + '44', background: exercise.color + '08' }">
            <span>⚡</span>
            <p>{{ exercise.tip }}</p>
          </div>

          <!-- Estimasi Kalori -->
          <div class="modal-kcal-row">
            <div class="mkcal-item">
              <span class="mkcal-val">{{ Math.round(exercise.met * 70 * (15/60)) }}</span>
              <span class="mkcal-label">kcal / 15 menit</span>
            </div>
            <div class="mkcal-divider"></div>
            <div class="mkcal-item">
              <span class="mkcal-val">{{ Math.round(exercise.met * 70 * 0.5) }}</span>
              <span class="mkcal-label">kcal / 30 menit</span>
            </div>
            <div class="mkcal-divider"></div>
            <div class="mkcal-item">
              <span class="mkcal-val">{{ Math.round(exercise.met * 70 * 1) }}</span>
              <span class="mkcal-label">kcal / 60 menit</span>
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
  background: rgba(0,0,0,0.85);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  backdrop-filter: blur(8px);
}

.modal-box {
  background: #0d1117;
  border: 1px solid rgba(234,179,8,0.2);
  border-radius: 24px;
  width: 100%; max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(234,179,8,0.06);
  font-family: 'Barlow', sans-serif;
}

.modal-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, #eab308, transparent);
}

.modal-close {
  position: absolute; top: 16px; right: 16px;
  width: 32px; height: 32px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: rgba(255,255,255,0.5);
  font-size: 0.85rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; z-index: 1;
}
.modal-close:hover { background: rgba(239,68,68,0.15); color: #ef4444; border-color: rgba(239,68,68,0.3); }

.modal-hero {
  display: flex; align-items: center; gap: 20px;
  padding: 32px 28px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.modal-emoji { font-size: 3.5rem; flex-shrink: 0; }
.modal-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.8rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.04em;
  color: #fff; margin-bottom: 10px;
}
.modal-badges { display: flex; flex-wrap: wrap; gap: 8px; }

.ex-tag {
  font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em;
  padding: 3px 10px; border-radius: 999px;
}
.ex-tag.muscle { background: rgba(234,179,8,0.1); color: #eab308; border: 1px solid rgba(234,179,8,0.25); }
.ex-tag.equip  { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.1); }
.ex-difficulty {
  font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 3px 10px; border-radius: 999px;
}
.ex-difficulty.beginner     { background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
.ex-difficulty.intermediate { background: rgba(234,179,8,0.15); color: #eab308; border: 1px solid rgba(234,179,8,0.3); }
.ex-difficulty.advanced     { background: rgba(239,68,68,0.15);  color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }

.modal-body { padding: 24px 28px 32px; display: flex; flex-direction: column; gap: 22px; }

.met-highlight {
  display: flex; align-items: center; gap: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px; padding: 14px 16px;
}
.mh-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); white-space: nowrap; }
.mh-bar-wrap { flex: 1; height: 6px; background: rgba(255,255,255,0.07); border-radius: 999px; overflow: hidden; }
.mh-bar { height: 100%; border-radius: 999px; transition: width 0.6s ease; }
.mh-val { font-family: 'Barlow Condensed', sans-serif; font-size: 1.3rem; font-weight: 900; color: #eab308; white-space: nowrap; }

.modal-section-title { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); margin-bottom: 12px; }
.modal-desc { font-size: 0.88rem; color: rgba(255,255,255,0.55); line-height: 1.7; }

.steps-list { display: flex; flex-direction: column; gap: 10px; list-style: none; }
.step-item { display: flex; gap: 12px; align-items: flex-start; font-size: 0.85rem; color: rgba(255,255,255,0.55); line-height: 1.6; }
.step-num {
  width: 24px; height: 24px; flex-shrink: 0;
  background: rgba(234,179,8,0.12); border: 1px solid rgba(234,179,8,0.3); border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Barlow Condensed', sans-serif; font-size: 0.8rem; font-weight: 800; color: #eab308;
}

.muscle-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.muscle-chip { font-size: 0.75rem; font-weight: 600; padding: 5px 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); }

.modal-tip-box { display: flex; gap: 10px; align-items: flex-start; border-width: 1px; border-style: solid; border-radius: 12px; padding: 14px 16px; font-size: 0.83rem; color: rgba(255,255,255,0.55); line-height: 1.6; }

.modal-kcal-row { display: flex; align-items: center; background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.15); border-radius: 14px; padding: 18px; }
.mkcal-item { flex: 1; text-align: center; display: flex; flex-direction: column; gap: 4px; }
.mkcal-val { font-family: 'Barlow Condensed', sans-serif; font-size: 1.8rem; font-weight: 900; color: #eab308; line-height: 1; }
.mkcal-label { font-size: 0.7rem; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em; }
.mkcal-divider { width: 1px; height: 40px; background: rgba(234,179,8,0.15); }

.modal-enter-active, .modal-leave-active { transition: all 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.96); }
</style>