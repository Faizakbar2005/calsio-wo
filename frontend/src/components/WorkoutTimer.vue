<template>
  <div class="timer-card">
    <div class="timer-bar-top"></div>

    <!-- Header -->
    <div class="timer-header">
      <div class="timer-title-wrap">
        <span class="timer-eyebrow">{{ phaseLabel }}</span>
        <span class="timer-exercise">{{ exerciseName || 'Pilih gerakan dulu' }}</span>
      </div>
      <div class="timer-set-info" v-if="exerciseName">
        Set <strong>{{ currentSet }}</strong> / {{ totalSets }}
      </div>
    </div>

    <!-- Ring -->
    <div class="timer-ring-wrap">
      <svg class="timer-ring" viewBox="0 0 120 120">
        <!-- Track -->
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/>
        <!-- Progress -->
        <circle
          cx="60" cy="60" r="52" fill="none"
          :stroke="phase === 'rest' ? '#22c55e' : '#eab308'"
          stroke-width="6"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          transform="rotate(-90 60 60)"
          style="transition: stroke-dashoffset 1s linear, stroke 0.3s"
        />
      </svg>
      <div class="timer-center">
        <span class="timer-digits">{{ formattedTime }}</span>
        <span class="timer-phase-dot" :class="phase"></span>
      </div>
    </div>

    <!-- Controls -->
    <div class="timer-controls" v-if="exerciseName">
      <button class="tc-btn secondary" @click="resetTimer" title="Reset">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
      </button>

      <button class="tc-btn primary" @click="toggleTimer">
        <!-- Play -->
        <svg v-if="!running" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <!-- Pause -->
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
      </button>

      <button class="tc-btn secondary" @click="skipPhase" title="Skip">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
      </button>
    </div>

    <!-- Set dots -->
    <div class="set-dots" v-if="totalSets > 0">
      <span
        v-for="i in totalSets" :key="i"
        :class="['set-dot', i < currentSet ? 'done' : i === currentSet ? 'active' : '']"
      ></span>
    </div>

    <!-- Duration & Rest config -->
    <div class="timer-config" v-if="exerciseName">
      <div class="tc-conf">
        <span class="tc-conf-label">⏱ Durasi set</span>
        <div class="tc-conf-ctrl">
          <button @click="setDuration = Math.max(10, setDuration - 5)">−</button>
          <span>{{ setDuration }}s</span>
          <button @click="setDuration += 5">+</button>
        </div>
      </div>
      <div class="tc-conf">
        <span class="tc-conf-label">😮‍💨 Rest</span>
        <div class="tc-conf-ctrl">
          <button @click="restDuration = Math.max(10, restDuration - 5)">−</button>
          <span>{{ restDuration }}s</span>
          <button @click="restDuration += 5">+</button>
        </div>
      </div>
    </div>

    <!-- Completed state -->
    <div class="timer-done" v-if="completed">
      <span class="done-emoji">🎉</span>
      <span class="done-text">Semua set selesai!</span>
      <button class="done-restart" @click="resetTimer">Ulangi</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'WorkoutTimer',
  props: {
    exerciseName: { type: String, default: '' },
    totalSets   : { type: Number, default: 3 },
  },

  data() {
    return {
      phase       : 'set',    // 'set' | 'rest'
      running     : false,
      completed   : false,
      currentSet  : 1,
      setDuration : 45,       // seconds per set
      restDuration: 60,       // seconds rest
      timeLeft    : 45,
      ticker      : null,
    }
  },

  computed: {
    circumference() { return 2 * Math.PI * 52 },
    totalDuration() { return this.phase === 'set' ? this.setDuration : this.restDuration },
    dashOffset()    {
      const ratio = this.timeLeft / this.totalDuration
      return this.circumference * (1 - ratio)
    },
    formattedTime() {
      const m = Math.floor(this.timeLeft / 60)
      const s = this.timeLeft % 60
      return `${m}:${s.toString().padStart(2, '0')}`
    },
    phaseLabel() {
      if (this.completed) return 'Selesai'
      return this.phase === 'set' ? 'Waktu Set' : 'Waktu Rest'
    },
  },

  watch: {
    exerciseName() { this.resetTimer() },
    totalSets()    { this.resetTimer() },
    setDuration(v) { if (!this.running && this.phase === 'set') this.timeLeft = v },
    restDuration(v){ if (!this.running && this.phase === 'rest') this.timeLeft = v },
  },

  beforeUnmount() { this.stopTicker() },

  methods: {
    toggleTimer() {
      if (this.completed) return
      this.running ? this.stopTicker() : this.startTicker()
      this.running = !this.running
    },

    startTicker() {
      this.ticker = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--
        } else {
          this.onPhaseEnd()
        }
      }, 1000)
    },

    stopTicker() {
      clearInterval(this.ticker)
      this.ticker = null
    },

    onPhaseEnd() {
      this.stopTicker()
      this.running = false
      this.playBeep()

      if (this.phase === 'set') {
        // Switch to rest
        this.phase    = 'rest'
        this.timeLeft = this.restDuration
        // Auto start rest timer
        this.$nextTick(() => { this.running = true; this.startTicker() })
      } else {
        // Rest done — next set
        if (this.currentSet < this.totalSets) {
          this.currentSet++
          this.phase    = 'set'
          this.timeLeft = this.setDuration
          this.$nextTick(() => { this.running = true; this.startTicker() })
        } else {
          this.completed = true
        }
      }
    },

    skipPhase() {
      this.stopTicker()
      this.running = false
      this.onPhaseEnd()
    },

    resetTimer() {
      this.stopTicker()
      this.running    = false
      this.completed  = false
      this.currentSet = 1
      this.phase      = 'set'
      this.timeLeft   = this.setDuration
    },

    playBeep() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain); gain.connect(ctx.destination)
        osc.frequency.value = this.phase === 'set' ? 880 : 440
        osc.type = 'sine'
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
        osc.start(); osc.stop(ctx.currentTime + 0.4)
      } catch {}
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;500;600&display=swap');

.timer-card {
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 20px;
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.timer-bar-top {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent);
}

/* Header */
.timer-header { width: 100%; display: flex; align-items: flex-start; justify-content: space-between; }
.timer-title-wrap { display: flex; flex-direction: column; gap: 2px; }
.timer-eyebrow { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(255,255,255,0.25); }
.timer-exercise { font-family: 'Barlow Condensed', sans-serif; font-size: 0.88rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.7); max-width: 160px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.timer-set-info { font-size: 0.7rem; color: rgba(255,255,255,0.3); }
.timer-set-info strong { color: #eab308; }

/* Ring */
.timer-ring-wrap { position: relative; width: 120px; height: 120px; }
.timer-ring { width: 120px; height: 120px; }
.timer-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
.timer-digits { font-family: 'Barlow Condensed', sans-serif; font-size: 2rem; font-weight: 900; color: #fff; line-height: 1; }
.timer-phase-dot { width: 7px; height: 7px; border-radius: 50%; }
.timer-phase-dot.set  { background: #eab308; animation: blink 1s ease-in-out infinite; }
.timer-phase-dot.rest { background: #22c55e; animation: blink 1.5s ease-in-out infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

/* Controls */
.timer-controls { display: flex; align-items: center; gap: 10px; }
.tc-btn { border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.tc-btn.primary {
  width: 52px; height: 52px;
  background: #eab308; color: #000;
  box-shadow: 0 4px 20px rgba(234,179,8,0.3);
}
.tc-btn.primary:hover { background: #facc15; transform: scale(1.05); }
.tc-btn.secondary {
  width: 38px; height: 38px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1) !important;
  color: rgba(255,255,255,0.4);
}
.tc-btn.secondary:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); }

/* Set dots */
.set-dots { display: flex; gap: 6px; }
.set-dot  { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.1); transition: all 0.3s; }
.set-dot.done   { background: rgba(34,197,94,0.6); }
.set-dot.active { background: #eab308; box-shadow: 0 0 8px rgba(234,179,8,0.5); transform: scale(1.2); }

/* Config */
.timer-config { width: 100%; display: flex; gap: 8px; }
.tc-conf { flex: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; }
.tc-conf-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); }
.tc-conf-ctrl  { display: flex; align-items: center; justify-content: space-between; }
.tc-conf-ctrl button { width: 24px; height: 24px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); font-size: 1rem; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; }
.tc-conf-ctrl button:hover { border-color: rgba(234,179,8,0.4); color: #eab308; }
.tc-conf-ctrl span { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 800; color: #fff; }

/* Done */
.timer-done { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px; background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2); border-radius: 12px; width: 100%; }
.done-emoji { font-size: 1.5rem; }
.done-text  { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #22c55e; }
.done-restart { margin-top: 4px; padding: 6px 16px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; color: #22c55e; font-family: 'Barlow Condensed', sans-serif; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; transition: all 0.2s; }
.done-restart:hover { background: rgba(34,197,94,0.2); }
</style>