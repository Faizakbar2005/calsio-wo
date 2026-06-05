<template>
  <div class="right-col">

    <!-- Body Visualizer Card -->
    <div class="body-card">
      <div class="step-bar"></div>
      <div class="body-card-header">
        <span class="body-card-title">Visualisasi Otot</span>
        <div class="body-view-toggle">
          <button :class="['bvt-btn', bodyView === 'front' ? 'active' : '']" @click="$emit('update:bodyView', 'front')">Depan</button>
          <button :class="['bvt-btn', bodyView === 'back'  ? 'active' : '']" @click="$emit('update:bodyView', 'back')">Belakang</button>
        </div>
      </div>

      <div class="body-visual-wrap">
        <!-- FRONT VIEW -->
        <svg v-if="bodyView === 'front'" class="body-svg" viewBox="0 0 220 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="110" cy="42" rx="26" ry="30" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1.2"/>
          <rect x="102" y="70" width="16" height="18" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <ellipse cx="74" cy="108" rx="18" ry="14" :fill="ma('Deltoid') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Deltoid') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Deltoid') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Deltoid') }"/>
          <ellipse cx="146" cy="108" rx="18" ry="14" :fill="ma('Deltoid') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Deltoid') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Deltoid') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Deltoid') }"/>
          <path d="M88 92 Q88 130 110 132 Q110 130 110 92 Z" :fill="ma('Dada') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Dada') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Dada') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Dada') }"/>
          <path d="M132 92 Q132 130 110 132 Q110 130 110 92 Z" :fill="ma('Dada') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Dada') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Dada') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Dada') }"/>
          <rect x="97" y="133" width="26" height="72" rx="8" :fill="ma('Perut') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Perut') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Perut') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Perut') }"/>
          <line x1="110" y1="133" x2="110" y2="205" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
          <line x1="97" y1="155" x2="123" y2="155" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
          <line x1="97" y1="175" x2="123" y2="175" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
          <rect x="58" y="122" width="20" height="54" rx="10" :fill="ma('Bisep') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Bisep') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Bisep') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Bisep') }"/>
          <rect x="142" y="122" width="20" height="54" rx="10" :fill="ma('Bisep') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Bisep') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Bisep') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Bisep') }"/>
          <rect x="40" y="130" width="16" height="44" rx="8" :fill="ma('Trisep') ? 'rgba(234,179,8,0.18)' : 'rgba(255,255,255,0.03)'" :stroke="ma('Trisep') ? 'rgba(234,179,8,0.6)' : 'rgba(255,255,255,0.07)'" :stroke-width="ma('Trisep') ? '1.5' : '1'"/>
          <rect x="164" y="130" width="16" height="44" rx="8" :fill="ma('Trisep') ? 'rgba(234,179,8,0.18)' : 'rgba(255,255,255,0.03)'" :stroke="ma('Trisep') ? 'rgba(234,179,8,0.6)' : 'rgba(255,255,255,0.07)'" :stroke-width="ma('Trisep') ? '1.5' : '1'"/>
          <rect x="42" y="178" width="18" height="44" rx="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          <rect x="160" y="178" width="18" height="44" rx="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          <path d="M82 205 Q82 220 110 222 Q138 220 138 205 Q130 205 110 208 Q90 205 82 205 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
          <rect x="84" y="222" width="28" height="90" rx="14" :fill="ma('Kaki') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Kaki') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Kaki') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Kaki') }"/>
          <rect x="108" y="222" width="28" height="90" rx="14" :fill="ma('Kaki') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Kaki') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Kaki') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Kaki') }"/>
          <rect x="86" y="318" width="24" height="70" rx="12" :fill="ma('Betis') ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Betis') ? 'rgba(234,179,8,0.6)' : 'rgba(255,255,255,0.08)'" :stroke-width="ma('Betis') ? '1.5' : '1'"/>
          <rect x="110" y="318" width="24" height="70" rx="12" :fill="ma('Betis') ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Betis') ? 'rgba(234,179,8,0.6)' : 'rgba(255,255,255,0.08)'" :stroke-width="ma('Betis') ? '1.5' : '1'"/>
          <rect x="88" y="392" width="20" height="28" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          <rect x="112" y="392" width="20" height="28" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          <ellipse v-if="ma('Kardio')" cx="110" cy="200" rx="90" ry="170" fill="rgba(234,179,8,0.04)" stroke="#eab308" stroke-width="1.5" stroke-dasharray="8 5" class="cardio-pulse"/>
          <text v-if="activeMuscleLabels.length > 0" x="110" y="456" text-anchor="middle" font-size="11" fill="rgba(234,179,8,0.8)" font-family="'Barlow Condensed', sans-serif" font-weight="700" letter-spacing="1">{{ activeMuscleLabels.join(' · ') }}</text>
        </svg>

        <!-- BACK VIEW -->
        <svg v-else class="body-svg" viewBox="0 0 220 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="110" cy="42" rx="26" ry="30" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1.2"/>
          <rect x="102" y="70" width="16" height="18" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <path d="M92 88 Q110 82 128 88 Q128 108 110 112 Q92 108 92 88 Z" :fill="ma('Punggung') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.05)'" :stroke="ma('Punggung') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Punggung') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Punggung') }"/>
          <ellipse cx="74" cy="108" rx="18" ry="14" :fill="ma('Deltoid') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Deltoid') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Deltoid') ? '1.8' : '1'"/>
          <ellipse cx="146" cy="108" rx="18" ry="14" :fill="ma('Deltoid') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Deltoid') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Deltoid') ? '1.8' : '1'"/>
          <path d="M88 112 Q72 130 78 180 Q88 188 97 185 Q97 150 97 112 Z" :fill="ma('Punggung') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Punggung') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Punggung') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Punggung') }"/>
          <path d="M132 112 Q148 130 142 180 Q132 188 123 185 Q123 150 123 112 Z" :fill="ma('Punggung') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Punggung') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Punggung') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Punggung') }"/>
          <rect x="97" y="112" width="26" height="90" rx="6" :fill="ma('Punggung') ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Punggung') ? 'rgba(234,179,8,0.6)' : 'rgba(255,255,255,0.08)'" :stroke-width="ma('Punggung') ? '1.5' : '1'"/>
          <rect x="58" y="122" width="20" height="54" rx="10" :fill="ma('Trisep') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Trisep') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Trisep') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Trisep') }"/>
          <rect x="142" y="122" width="20" height="54" rx="10" :fill="ma('Trisep') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Trisep') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Trisep') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Trisep') }"/>
          <rect x="42" y="178" width="18" height="44" rx="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          <rect x="160" y="178" width="18" height="44" rx="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          <path d="M82 200 Q82 240 110 244 Q110 240 110 200 Z" :fill="ma('Bokong') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Bokong') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Bokong') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Bokong') }"/>
          <path d="M138 200 Q138 240 110 244 Q110 240 110 200 Z" :fill="ma('Bokong') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Bokong') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Bokong') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Bokong') }"/>
          <rect x="84" y="244" width="28" height="82" rx="14" :fill="ma('Kaki') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Kaki') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Kaki') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Kaki') }"/>
          <rect x="108" y="244" width="28" height="82" rx="14" :fill="ma('Kaki') ? 'rgba(234,179,8,0.25)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Kaki') ? '#eab308' : 'rgba(255,255,255,0.1)'" :stroke-width="ma('Kaki') ? '1.8' : '1'" :class="{ 'muscle-active': ma('Kaki') }"/>
          <rect x="86" y="332" width="24" height="66" rx="12" :fill="ma('Betis') ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Betis') ? 'rgba(234,179,8,0.6)' : 'rgba(255,255,255,0.08)'" stroke-width="1"/>
          <rect x="110" y="332" width="24" height="66" rx="12" :fill="ma('Betis') ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.04)'" :stroke="ma('Betis') ? 'rgba(234,179,8,0.6)' : 'rgba(255,255,255,0.08)'" stroke-width="1"/>
          <rect x="88" y="402" width="20" height="24" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          <rect x="112" y="402" width="20" height="24" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
          <ellipse v-if="ma('Kardio')" cx="110" cy="200" rx="90" ry="170" fill="rgba(234,179,8,0.04)" stroke="#eab308" stroke-width="1.5" stroke-dasharray="8 5" class="cardio-pulse"/>
          <text v-if="activeMuscleLabels.length > 0" x="110" y="448" text-anchor="middle" font-size="11" fill="rgba(234,179,8,0.8)" font-family="'Barlow Condensed', sans-serif" font-weight="700" letter-spacing="1">{{ activeMuscleLabels.join(' · ') }}</text>
        </svg>

        <div v-if="!selectedExercise" class="body-hint">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          <span>Pilih gerakan untuk melihat otot yang aktif</span>
        </div>
      </div>

      <div class="muscle-legend" v-if="selectedExercise">
        <div v-for="m in selectedExercise.muscles" :key="m" class="ml-item">
          <span class="ml-dot"></span>
          <span class="ml-name">{{ m }}</span>
        </div>
      </div>
    </div>

    <!-- ══ WORKOUT TIMER CARD ══ -->
    <div class="timer-card" v-if="selectedExercise">
      <div class="step-bar"></div>

      <div class="timer-header">
        <div class="timer-title-wrap">
          <span class="timer-eyebrow">{{ timerPhaseLabel }}</span>
          <span class="timer-exercise">{{ selectedExercise.name }}</span>
        </div>
        <div class="timer-set-info">
          Set <strong>{{ timerCurrentSet }}</strong> / {{ sets }}
        </div>
      </div>

      <div class="timer-ring-wrap">
        <svg class="timer-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="6"/>
          <circle
            cx="60" cy="60" r="52" fill="none"
            :stroke="timerPhase === 'rest' ? '#22c55e' : '#eab308'"
            stroke-width="6" stroke-linecap="round"
            :stroke-dasharray="timerCircumference"
            :stroke-dashoffset="timerDashOffset"
            transform="rotate(-90 60 60)"
            style="transition: stroke-dashoffset 1s linear, stroke 0.3s"
          />
        </svg>
        <div class="timer-center">
          <span class="timer-digits">{{ timerFormatted }}</span>
          <span class="timer-phase-dot" :class="timerPhase"></span>
        </div>
      </div>

      <div class="timer-controls">
        <button class="tc-btn secondary" @click="timerReset" title="Reset">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
        </button>
        <button class="tc-btn primary" @click="timerToggle">
          <svg v-if="!timerRunning" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        </button>
        <button class="tc-btn secondary" @click="timerSkip" title="Skip">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
        </button>
      </div>

      <div class="set-dots">
        <span
          v-for="i in sets" :key="i"
          :class="['set-dot', i < timerCurrentSet ? 'done' : i === timerCurrentSet ? 'active' : '']"
        ></span>
      </div>

      <div class="timer-config">
        <div class="tc-conf">
          <span class="tc-conf-label">⏱ Durasi set</span>
          <div class="tc-conf-ctrl">
            <button @click="timerSetDuration = Math.max(10, timerSetDuration - 5)">−</button>
            <span>{{ timerSetDuration }}s</span>
            <button @click="timerSetDuration += 5">+</button>
          </div>
        </div>
        <div class="tc-conf">
          <span class="tc-conf-label">😮‍💨 Rest</span>
          <div class="tc-conf-ctrl">
            <button @click="timerRestDuration = Math.max(10, timerRestDuration - 5)">−</button>
            <span>{{ timerRestDuration }}s</span>
            <button @click="timerRestDuration += 5">+</button>
          </div>
        </div>
      </div>

      <div class="timer-done" v-if="timerCompleted">
        <span class="done-emoji">🎉</span>
        <span class="done-text">Semua set selesai!</span>
        <button class="done-restart" @click="timerReset">Ulangi</button>
      </div>
    </div>

    <!-- Exercise Info Card -->
    <div class="info-card" v-if="selectedExercise">
      <div class="info-card-bar"></div>
      <div class="info-top">
        <div class="info-icon-wrap">
          <span v-html="getExerciseIcon(selectedExercise.workoutType)"></span>
        </div>
        <div>
          <div class="info-exname">{{ selectedExercise.name }}</div>
          <div class="info-excat">{{ selectedEquipment === 'no_equipment' ? 'Tanpa Alat' : 'Dumbbell' }}</div>
        </div>
        <div class="info-type-pill" :style="{ '--pill-color': workoutTypeColor(selectedExercise.workoutType) }">
          {{ selectedExercise.workoutType }}
        </div>
      </div>
      <p class="info-desc">{{ selectedExercise.desc }}</p>
      <div class="live-stats" v-if="sets && reps && duration">
        <div class="ls-item"><span class="ls-val">{{ sets }} × {{ reps }}</span><span class="ls-key">Set × Rep</span></div>
        <div class="ls-div"></div>
        <div class="ls-item"><span class="ls-val">{{ duration }}'</span><span class="ls-key">Durasi</span></div>
        <div class="ls-div"></div>
        <div class="ls-item"><span class="ls-val">{{ rest }}'</span><span class="ls-key">Rest</span></div>
        <div class="ls-div"></div>
        <div class="ls-item"><span class="ls-val">{{ avgBpm }}</span><span class="ls-key">Avg BPM</span></div>
      </div>
    </div>

    <!-- Result Preview Card -->
    <div class="result-card" v-if="calories !== null">
      <div class="result-card-bar"></div>
      <div class="rc-header">
        <span class="rc-label">Hasil Terakhir</span>
        <span class="rc-badge">GBR · R² 99.6%</span>
      </div>
      <div class="rc-number">
        <span class="rc-cal">{{ calories }}</span>
        <span class="rc-unit">kcal</span>
      </div>
      <p v-if="errorMsg" class="error-msg">⚠ {{ errorMsg }}</p>
      <div class="rc-actions">
        <button @click="$emit('open-modal')" class="btn-detail">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Lihat Detail
        </button>
        <button @click="$emit('save')" :disabled="saved" class="btn-save">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>
          {{ saved ? '✓ Tersimpan' : 'Simpan' }}
        </button>
        <button @click="$emit('reset')" class="btn-reset">Reset</button>
      </div>
    </div>

  </div>
</template>

<script>
const ic = {
  strength: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12"/></svg>`,
  cardio:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  hiit:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
}

export default {
  name: 'WorkoutBodyVisualizer',
  emits: ['update:bodyView', 'open-modal', 'save', 'reset'],
  props: {
    bodyView         : { type: String,  default: 'front' },
    selectedExercise : { type: Object,  default: null },
    selectedEquipment: { type: String,  default: '' },
    calories         : { type: Number,  default: null },
    saved            : { type: Boolean, default: false },
    errorMsg         : { type: String,  default: '' },
    sets             : { type: Number,  default: 3 },
    reps             : { type: Number,  default: 12 },
    rest             : { type: Number,  default: 1 },
    duration         : { type: Number,  default: 45 },
    avgBpm           : { type: Number,  default: 0 },
  },

  data() {
    return {
      // Timer state
      timerPhase      : 'set',
      timerRunning    : false,
      timerCompleted  : false,
      timerCurrentSet : 1,
      timerSetDuration : 45,
      timerRestDuration: 60,
      timerTimeLeft   : 45,
      timerTicker     : null,
    }
  },

  computed: {
    activeMuscles()      { return this.selectedExercise?.muscles || [] },
    activeMuscleLabels() { return this.activeMuscles.slice(0, 3) },

    timerCircumference() { return 2 * Math.PI * 52 },
    timerTotalDuration() { return this.timerPhase === 'set' ? this.timerSetDuration : this.timerRestDuration },
    timerDashOffset()    {
      const ratio = this.timerTimeLeft / this.timerTotalDuration
      return this.timerCircumference * (1 - ratio)
    },
    timerFormatted() {
      const m = Math.floor(this.timerTimeLeft / 60)
      const s = this.timerTimeLeft % 60
      return `${m}:${s.toString().padStart(2, '0')}`
    },
    timerPhaseLabel() {
      if (this.timerCompleted) return 'Selesai'
      return this.timerPhase === 'set' ? 'Waktu Set' : 'Waktu Rest'
    },
  },

  watch: {
    selectedExercise()    { this.timerReset() },
    sets()                { this.timerReset() },
    timerSetDuration(v)   { if (!this.timerRunning && this.timerPhase === 'set')  this.timerTimeLeft = v },
    timerRestDuration(v)  { if (!this.timerRunning && this.timerPhase === 'rest') this.timerTimeLeft = v },
  },

  beforeUnmount() { this.timerStopTicker() },

  methods: {
    // ── Body visualizer ──
    ma(name) {
      if (!this.selectedExercise) return false
      const muscles     = this.selectedExercise.muscles || []
      const workoutType = this.selectedExercise.workoutType || ''
      const n = name.toLowerCase()
      if (n === 'kardio') return ['cardio', 'hiit'].includes(workoutType.toLowerCase())
      return muscles.some(m => m.toLowerCase().includes(n) || n.includes(m.toLowerCase()))
    },
    getExerciseIcon(t) { return ic[t?.toLowerCase()] || ic.strength },
    workoutTypeColor(t){ return { Strength: '#60a5fa', Cardio: '#34d399', HIIT: '#f87171', Yoga: '#a78bfa' }[t] || '#eab308' },

    // ── Timer ──
    timerToggle() {
      if (this.timerCompleted) return
      if (this.timerRunning) {
        this.timerStopTicker()
      } else {
        this.timerStartTicker()
      }
      this.timerRunning = !this.timerRunning
    },

    timerStartTicker() {
      this.timerTicker = setInterval(() => {
        if (this.timerTimeLeft > 0) {
          this.timerTimeLeft--
        } else {
          this.timerOnPhaseEnd()
        }
      }, 1000)
    },

    timerStopTicker() {
      clearInterval(this.timerTicker)
      this.timerTicker = null
    },

    timerOnPhaseEnd() {
      this.timerStopTicker()
      this.timerRunning = false
      this.timerBeep()

      if (this.timerPhase === 'set') {
        this.timerPhase    = 'rest'
        this.timerTimeLeft = this.timerRestDuration
        this.$nextTick(() => { this.timerRunning = true; this.timerStartTicker() })
      } else {
        if (this.timerCurrentSet < this.sets) {
          this.timerCurrentSet++
          this.timerPhase    = 'set'
          this.timerTimeLeft = this.timerSetDuration
          this.$nextTick(() => { this.timerRunning = true; this.timerStartTicker() })
        } else {
          this.timerCompleted = true
        }
      }
    },

    timerSkip() {
      this.timerStopTicker()
      this.timerRunning = false
      this.timerOnPhaseEnd()
    },

    timerReset() {
      this.timerStopTicker()
      this.timerRunning    = false
      this.timerCompleted  = false
      this.timerCurrentSet = 1
      this.timerPhase      = 'set'
      this.timerTimeLeft   = this.timerSetDuration
    },

    timerBeep() {
      try {
        const ctx  = new (window.AudioContext || window.webkitAudioContext)()
        const osc  = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain); gain.connect(ctx.destination)
        osc.frequency.value = this.timerPhase === 'set' ? 880 : 440
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
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');

.right-col { display: flex; flex-direction: column; gap: 14px; }

/* ── Body Card ── */
.body-card { background: #0d1117; border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 20px; position: relative; overflow: hidden; }
.step-bar  { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent); }
.body-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.body-card-title  { font-family: 'Barlow Condensed', sans-serif; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.4); }
.body-view-toggle { display: flex; gap: 3px; background: rgba(255,255,255,0.04); padding: 3px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.07); }
.bvt-btn { padding: 4px 12px; font-family: 'Barlow Condensed', sans-serif; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: transparent; border: none; color: rgba(255,255,255,0.3); border-radius: 6px; cursor: pointer; transition: all 0.15s; }
.bvt-btn.active { background: rgba(234,179,8,0.15); color: #eab308; }

.body-visual-wrap { display: flex; justify-content: center; position: relative; padding: 8px 0; }
.body-svg { width: 160px; height: auto; filter: drop-shadow(0 0 20px rgba(234,179,8,0.08)); }
.muscle-active { animation: muscle-glow 1.8s ease-in-out infinite; filter: drop-shadow(0 0 6px rgba(234,179,8,0.5)); }
@keyframes muscle-glow { 0%,100%{opacity:1} 50%{opacity:0.7} }
.cardio-pulse  { animation: cardio-ring 2.5s ease-in-out infinite; }
@keyframes cardio-ring { 0%,100%{opacity:0.4;stroke-dashoffset:0} 50%{opacity:0.9;stroke-dashoffset:20} }
.body-hint { position: absolute; bottom: 8px; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 0.65rem; color: rgba(255,255,255,0.2); text-align: center; padding: 0 20px; }

.muscle-legend { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06); }
.ml-item { display: flex; align-items: center; gap: 5px; }
.ml-dot  { width: 7px; height: 7px; border-radius: 50%; background: #eab308; flex-shrink: 0; animation: dot-blink 1.5s ease-in-out infinite; }
.ml-name { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(234,179,8,0.8); }
@keyframes dot-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }

/* ── Timer Card ── */
.timer-card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 20px; position: relative; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; gap: 14px;
}
.timer-header { width: 100%; display: flex; align-items: flex-start; justify-content: space-between; }
.timer-title-wrap { display: flex; flex-direction: column; gap: 2px; }
.timer-eyebrow  { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(255,255,255,0.25); }
.timer-exercise { font-family: 'Barlow Condensed', sans-serif; font-size: 0.88rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.7); max-width: 160px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.timer-set-info { font-size: 0.7rem; color: rgba(255,255,255,0.3); }
.timer-set-info strong { color: #eab308; }

.timer-ring-wrap { position: relative; width: 120px; height: 120px; }
.timer-ring      { width: 120px; height: 120px; }
.timer-center    { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
.timer-digits    { font-family: 'Barlow Condensed', sans-serif; font-size: 2rem; font-weight: 900; color: #fff; line-height: 1; }
.timer-phase-dot { width: 7px; height: 7px; border-radius: 50%; }
.timer-phase-dot.set  { background: #eab308; animation: blink 1s ease-in-out infinite; }
.timer-phase-dot.rest { background: #22c55e; animation: blink 1.5s ease-in-out infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

.timer-controls { display: flex; align-items: center; gap: 10px; }
.tc-btn { border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.tc-btn.primary   { width: 52px; height: 52px; background: #eab308; color: #000; box-shadow: 0 4px 20px rgba(234,179,8,0.3); }
.tc-btn.primary:hover { background: #facc15; transform: scale(1.05); }
.tc-btn.secondary { width: 38px; height: 38px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1) !important; color: rgba(255,255,255,0.4); }
.tc-btn.secondary:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); }

.set-dots { display: flex; gap: 6px; }
.set-dot  { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.1); transition: all 0.3s; }
.set-dot.done   { background: rgba(34,197,94,0.6); }
.set-dot.active { background: #eab308; box-shadow: 0 0 8px rgba(234,179,8,0.5); transform: scale(1.2); }

.timer-config { width: 100%; display: flex; gap: 8px; }
.tc-conf { flex: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; }
.tc-conf-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); }
.tc-conf-ctrl  { display: flex; align-items: center; justify-content: space-between; }
.tc-conf-ctrl button { width: 24px; height: 24px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); font-size: 1rem; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; }
.tc-conf-ctrl button:hover { border-color: rgba(234,179,8,0.4); color: #eab308; }
.tc-conf-ctrl span { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 800; color: #fff; }

.timer-done { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px; background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2); border-radius: 12px; width: 100%; }
.done-emoji { font-size: 1.5rem; }
.done-text  { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #22c55e; }
.done-restart { margin-top: 4px; padding: 6px 16px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; color: #22c55e; font-family: 'Barlow Condensed', sans-serif; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; transition: all 0.2s; }
.done-restart:hover { background: rgba(34,197,94,0.2); }

/* ── Info Card ── */
.info-card     { background: #0d1117; border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 20px; position: relative; overflow: hidden; }
.info-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(234,179,8,0.4), transparent); }
.info-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.info-icon-wrap { width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0; background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.2); display: flex; align-items: center; justify-content: center; color: #eab308; }
.info-exname { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #fff; line-height: 1; }
.info-excat  { font-size: 0.65rem; color: rgba(255,255,255,0.3); margin-top: 3px; text-transform: uppercase; letter-spacing: 0.08em; }
.info-type-pill { margin-left: auto; flex-shrink: 0; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--pill-color, #eab308); background: color-mix(in srgb, var(--pill-color, #eab308) 15%, transparent); border: 1px solid color-mix(in srgb, var(--pill-color, #eab308) 40%, transparent); padding: 4px 10px; border-radius: 999px; }
.info-desc { font-size: 0.8rem; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 14px; }
.live-stats { display: flex; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 10px 14px; }
.ls-item { flex: 1; text-align: center; }
.ls-val  { display: block; font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 900; color: #eab308; line-height: 1; }
.ls-key  { display: block; font-size: 0.58rem; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }
.ls-div  { width: 1px; height: 28px; background: rgba(255,255,255,0.08); }

/* ── Result Card ── */
.result-card     { background: #0d1117; border: 1px solid rgba(234,179,8,0.2); border-radius: 18px; padding: 20px; position: relative; overflow: hidden; }
.result-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(234,179,8,0.7), transparent); }
.rc-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.rc-label  { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); }
.rc-badge  { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #eab308; background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.25); padding: 3px 9px; border-radius: 999px; }
.rc-number { display: flex; align-items: baseline; gap: 8px; margin-bottom: 14px; }
.rc-cal    { font-family: 'Barlow Condensed', sans-serif; font-size: 3.2rem; font-weight: 900; color: #eab308; line-height: 1; }
.rc-unit   { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; }
.error-msg { font-size: 0.7rem; color: #fca5a5; margin-bottom: 10px; }
.rc-actions { display: flex; gap: 8px; }
.btn-detail { flex: 1; padding: 10px; display: flex; align-items: center; justify-content: center; gap: 7px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; color: rgba(255,255,255,0.5); font-family: 'Barlow Condensed', sans-serif; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; }
.btn-detail:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.8); }
.btn-save   { flex: 1; padding: 10px; display: flex; align-items: center; justify-content: center; gap: 7px; background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.35); border-radius: 10px; color: #eab308; font-family: 'Barlow Condensed', sans-serif; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; }
.btn-save:hover:not(:disabled) { background: rgba(234,179,8,0.2); }
.btn-save:disabled { opacity: 0.7; cursor: default; }
.btn-reset  { padding: 10px 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.35); font-family: 'Barlow Condensed', sans-serif; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; }
.btn-reset:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); }

@media (max-width: 1100px) { .right-col { display: grid; grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .right-col { grid-template-columns: 1fr; } .rc-actions { flex-wrap: wrap; } }
</style>