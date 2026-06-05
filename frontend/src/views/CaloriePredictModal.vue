<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
        <transition name="modal-slide">
          <div v-if="visible" class="modal-box">

            <div class="modal-glow"></div>

            <!-- LOADING STATE -->
            <div v-if="loading" class="modal-loading">
              <div class="pulse-ring"></div>
              <div class="pulse-ring delay-1"></div>
              <div class="pulse-ring delay-2"></div>
              <div class="loader-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2.5-1.5-4.5-2.5-6 0 2-1 3.5-2.5 4.5C13 8 12 5 12 2z"/>
                </svg>
              </div>
              <div class="loading-text">
                <p class="lt-main">Model GBR menghitung...</p>
                <p class="lt-sub">300 estimators · max_depth 3 · R² 99.6%</p>
              </div>
              <div class="loading-bar-wrap">
                <div class="loading-bar"></div>
              </div>
            </div>

            <!-- RESULT STATE -->
            <div v-else-if="calories !== null" class="modal-result">

              <button class="modal-close" @click="$emit('close')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>

              <div class="result-badge">
                <span class="rb-dot"></span>
                GBR Model · R² 99.6%
              </div>

              <div class="calorie-display">
                <div class="calorie-number">
                  <span class="cal-val">{{ animatedCalories }}</span>
                  <span class="cal-unit">kcal</span>
                </div>
                <p class="calorie-label">Prediksi Kalori Terbakar</p>
              </div>

              <!-- Level bar -->
              <div class="level-wrap">
                <div class="level-track">
                  <div class="level-fill" :style="{ width: levelPercent + '%', background: levelColor }"></div>
                </div>
                <div class="level-label" :style="{ color: levelColor }">{{ calorieLevel }}</div>
              </div>


              <!-- Breakdown -->
              <div class="breakdown">
                <div class="bd-row">
                  <span class="bd-key">Gerakan</span>
                  <span class="bd-val">{{ exercise?.name || '—' }}</span>
                </div>
                <div class="bd-row">
                  <span class="bd-key">Workout Type</span>
                  <span class="bd-val" :style="{ color: typeColor }">{{ exercise?.workoutType || '—' }}</span>
                </div>
                <div class="bd-row">
                  <span class="bd-key">Durasi</span>
                  <span class="bd-val">{{ duration }} menit</span>
                </div>
                <div class="bd-row">
                  <span class="bd-key">Avg BPM</span>
                  <span class="bd-val">{{ avgBpm }} bpm</span>
                </div>
                <div class="bd-row">
                  <span class="bd-key">Intensitas</span>
                  <span class="bd-val" :style="{ color: intensityColor }">{{ intensityLabel }}</span>
                </div>
                <!-- Experience level dari profil user — ikut mempengaruhi prediksi -->
                <div class="bd-row">
                  <span class="bd-key">Exp. Level</span>
                  <span class="bd-val" :style="{ color: expColor }">{{ expLabel }}</span>
                </div>
                <div class="bd-row">
                  <span class="bd-key">Volume</span>
                  <span class="bd-val">{{ sets }} × {{ reps }} rep</span>
                </div>
              </div>

              <p v-if="errorMsg" class="modal-error">{{ errorMsg }}</p>

              <div class="modal-actions">
                <button @click="$emit('save')" :disabled="saved" class="btn-save">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>
                  {{ saved ? '✓ Tersimpan!' : 'Simpan ke Riwayat' }}
                </button>
                <button @click="$emit('close')" class="btn-close-modal">Tutup</button>
              </div>

            </div>

          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'CaloriePredictModal',

  props: {
    visible  : { type: Boolean, default: false },
    loading  : { type: Boolean, default: false },
    calories : { type: Number,  default: null  },
    exercise : { type: Object,  default: null  },
    duration : { type: Number,  default: 0     },
    avgBpm   : { type: Number,  default: 0     },
    sets     : { type: Number,  default: 0     },
    reps     : { type: Number,  default: 0     },
    intensity: { type: String,  default: 'medium' },
    saved    : { type: Boolean, default: false },
    errorMsg : { type: String,  default: ''    },
      featureImportance: { type: Array, default: () => [] },
  },

  emits: ['close', 'save'],

  data() {
    return { animatedCalories: 0 }
  },

  computed: {
    levelPercent() {
      if (!this.calories) return 0
      return Math.min(this.calories / 12, 100)
    },
    levelColor() {
      const c = this.calories
      if (!c)       return '#eab308'
      if (c < 300)  return '#60a5fa'
      if (c < 600)  return '#22c55e'
      if (c < 900)  return '#eab308'
      return '#ef4444'
    },
    calorieLevel() {
      const c = this.calories
      if (!c)       return ''
      if (c < 300)  return 'Ringan — cocok untuk recovery'
      if (c < 600)  return 'Moderate — pembakaran optimal'
      if (c < 900)  return 'Tinggi — sesi yang intens!'
      return 'Sangat Tinggi — workout maksimal!'
    },
    typeColor() {
      return { Strength:'#60a5fa', Cardio:'#34d399', HIIT:'#f87171', Yoga:'#a78bfa' }[this.exercise?.workoutType] || '#eab308'
    },
    intensityColor() {
      return { low:'#22c55e', medium:'#eab308', high:'#ef4444' }[this.intensity] || '#eab308'
    },
    intensityLabel() {
      return { low:'Ringan', medium:'Sedang', high:'Berat' }[this.intensity] || '—'
    },

    // Experience level dari localStorage profil user
    userExpLevel() {
      try {
        const s = localStorage.getItem('calsio_user_profile')
        if (s) return JSON.parse(s).experienceLevel || null
      } catch {}
      return null
    },
    expLabel() {
      return { 1: 'Pemula', 2: 'Menengah', 3: 'Berpengalaman' }[this.userExpLevel] || '—'
    },
    expColor() {
      return { 1: '#22c55e', 2: '#eab308', 3: '#ef4444' }[this.userExpLevel] || 'rgba(255,255,255,0.7)'
    },
    importanceData() {
      return this.featureImportance  // ✅ dari ML service
  }
},

  watch: {
    calories(newVal) {
      if (!newVal) return
      this.animatedCalories = 0
      const target   = newVal
      const duration = 900
      const start    = performance.now()
      const tick = (now) => {
        const elapsed  = now - start
        const progress = Math.min(elapsed / duration, 1)
        const ease     = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        this.animatedCalories = Math.round(ease * target)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 999;
  background: rgba(4,6,10,0.75); backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal-box {
  width: 100%; max-width: 420px; background: #0d1117;
  border: 1px solid rgba(234,179,8,0.2); border-radius: 24px;
  overflow: hidden; position: relative;
  box-shadow: 0 0 0 1px rgba(234,179,8,0.06), 0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(234,179,8,0.06);
}
.modal-glow { position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 300px; height: 200px; background: radial-gradient(ellipse, rgba(234,179,8,0.15) 0%, transparent 70%); pointer-events: none; }

/* Loading */
.modal-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 56px 32px 48px; gap: 16px; position: relative; }
.pulse-ring { position: absolute; width: 100px; height: 100px; border-radius: 50%; border: 1.5px solid rgba(234,179,8,0.25); animation: pulse-out 2s ease-out infinite; }
.pulse-ring.delay-1 { animation-delay: 0.6s; } .pulse-ring.delay-2 { animation-delay: 1.2s; }
@keyframes pulse-out { 0%{transform:scale(0.5);opacity:0.8} 100%{transform:scale(2);opacity:0} }
.loader-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.25); display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; animation: icon-breathe 2s ease-in-out infinite; }
@keyframes icon-breathe { 0%,100%{box-shadow:0 0 0 0 rgba(234,179,8,0.15)} 50%{box-shadow:0 0 0 12px rgba(234,179,8,0)} }
.loading-text { text-align: center; }
.lt-main { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.6); }
.lt-sub  { font-size: 0.68rem; color: rgba(255,255,255,0.2); margin-top: 4px; }
.loading-bar-wrap { width: 100%; height: 2px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden; margin-top: 4px; }
.loading-bar { height: 100%; background: linear-gradient(90deg, transparent, #eab308, transparent); border-radius: 999px; animation: bar-slide 1.4s ease-in-out infinite; }
@keyframes bar-slide { 0%{transform:translateX(-100%);width:60%} 100%{transform:translateX(200%);width:60%} }

/* Result */
.modal-result { padding: 28px; display: flex; flex-direction: column; gap: 18px; position: relative; }
.modal-close { position: absolute; top: 20px; right: 20px; width: 32px; height: 32px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.35); transition: all 0.2s; }
.modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
.result-badge { display: flex; align-items: center; gap: 7px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(234,179,8,0.6); }
.rb-dot { width: 6px; height: 6px; border-radius: 50%; background: #eab308; animation: dot-pulse 1.5s ease-in-out infinite; }
@keyframes dot-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }
.calorie-display { text-align: center; }
.calorie-number { display: flex; align-items: baseline; justify-content: center; gap: 8px; }
.cal-val  { font-family: 'Barlow Condensed', sans-serif; font-size: 5rem; font-weight: 900; color: #eab308; line-height: 1; text-shadow: 0 0 40px rgba(234,179,8,0.4); }
.cal-unit { font-family: 'Barlow Condensed', sans-serif; font-size: 1.4rem; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; }
.calorie-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.25); margin-top: 4px; }

/* Level bar */
.level-wrap  { display: flex; flex-direction: column; gap: 6px; }
.level-track { height: 6px; background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden; }
.level-fill  { height: 100%; border-radius: 999px; transition: width 1s ease; }
.level-label { font-size: 0.72rem; font-weight: 600; }

/* Feature importance bars */
.factors { display: flex; gap: 8px; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; }
.factor-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; }
.fi-bar-wrap { width: 24px; height: 60px; background: rgba(255,255,255,0.05); border-radius: 4px; display: flex; align-items: flex-end; overflow: hidden; }
.fi-bar { width: 100%; border-radius: 4px 4px 0 0; animation: bar-grow 0.8s ease forwards; transform-origin: bottom; }
@keyframes bar-grow { from{transform:scaleY(0)} to{transform:scaleY(1)} }
.fi-val { font-family: 'Barlow Condensed', sans-serif; font-size: 0.78rem; font-weight: 800; color: rgba(255,255,255,0.6); }
.fi-key { font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.2); text-align: center; }

/* Breakdown */
.breakdown { display: flex; flex-direction: column; gap: 8px; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; }
.bd-row { display: flex; justify-content: space-between; align-items: center; }
.bd-key { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); }
.bd-val { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 700; color: rgba(255,255,255,0.7); }

.modal-error { font-size: 0.7rem; color: #fca5a5; text-align: center; padding: 8px; background: rgba(239,68,68,0.06); border-radius: 8px; }

/* Actions */
.modal-actions { display: flex; gap: 8px; }
.btn-save { flex: 1; padding: 13px; display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(234,179,8,0.12); border: 1px solid rgba(234,179,8,0.4); border-radius: 10px; color: #eab308; font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; }
.btn-save:hover:not(:disabled) { background: rgba(234,179,8,0.22); }
.btn-save:disabled { opacity: 0.7; cursor: default; }
.btn-close-modal { padding: 13px 18px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.35); font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; }
.btn-close-modal:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); }

/* Transitions */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-slide-enter-active { transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.modal-slide-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.modal-slide-enter-from { opacity: 0; transform: scale(0.88) translateY(20px); }
.modal-slide-leave-to   { opacity: 0; transform: scale(0.95) translateY(10px); }
</style>