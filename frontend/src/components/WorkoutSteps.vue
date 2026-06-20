<template>
  <!-- Inner 2-col layout: selector steps (01-02-03) kiri, detail step (04) kanan -->
  <div class="steps-outer">

    <!-- ── KOLOM KIRI: Selector Steps ── -->
    <div class="steps-selector">

      <!-- STEP 1: Equipment -->
      <div class="step-card">
        <div class="step-bar"></div>
        <div class="step-head">
          <span class="step-num">01</span>
          <span class="step-title">Peralatan</span>
          <span class="step-badge" v-if="selectedEquipment">
            {{ selectedEquipment === 'no_equipment' ? 'Tanpa Alat' : 'Dumbbell' }}
          </span>
        </div>
        <div class="category-tabs">
          <button @click="$emit('select-equipment', 'no_equipment')" :class="['cat-tab', selectedEquipment === 'no_equipment' ? 'active' : '']">
            <span class="cat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v5l-4 4v5M12 12l4 4v5"/></svg></span>
            <span class="cat-name">Tanpa Alat</span>
            <span class="cat-count">{{ noEquipmentCount }} gerakan</span>
          </button>
          <button @click="$emit('select-equipment', 'dumbbell')" :class="['cat-tab', selectedEquipment === 'dumbbell' ? 'active' : '']">
            <span class="cat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12"/></svg></span>
            <span class="cat-name">Dumbbell</span>
            <span class="cat-count">{{ dumbbellCount }} gerakan</span>
          </button>
        </div>
      </div>

      <!-- STEP 2: Muscle Category -->
      <div class="step-card" v-if="selectedEquipment">
        <div class="step-bar"></div>
        <div class="step-head">
          <span class="step-num">02</span>
          <span class="step-title">Kelompok Otot</span>
          <span class="step-badge" v-if="selectedCategory">{{ selectedCategory.label }}</span>
        </div>
        <div class="category-muscle-grid">
          <button
            v-for="cat in muscleCategories" :key="cat.key"
            @click="$emit('select-category', cat)"
            :class="['muscle-cat-btn', selectedCategory?.key === cat.key ? 'active' : '']"
          >
            <span class="mc-icon" v-html="cat.icon"></span>
            <span class="mc-label">{{ cat.label }}</span>
            <span class="mc-count">{{ getCategoryCount(cat.key) }}</span>
          </button>
        </div>
      </div>

      <!-- STEP 3: Exercise Picker -->
      <div class="step-card step-card--exercises" v-if="selectedCategory">
        <div class="step-bar"></div>
        <div class="step-head">
          <span class="step-num">03</span>
          <span class="step-title">Pilih Gerakan</span>
          <span class="step-badge" v-if="selectedExercise">{{ selectedExercise.name }}</span>
        </div>

        <!-- Scrollable exercise area -->
        <div class="exercise-scroll-area">
          <!-- Favorit section -->
          <div v-if="favoritesInCategory.length > 0" class="fav-section">
            <div class="fav-section-label">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Favorit
            </div>
            <div class="exercise-grid">
              <button
                v-for="ex in favoritesInCategory" :key="'fav-' + ex.name"
                @click="$emit('select-exercise', ex)"
                :class="['ex-btn', selectedExercise?.name === ex.name ? 'active' : '', 'fav']"
              >
<div class="ex-btn-top">
  <span class="ex-icon" v-html="getExerciseIcon(ex.workoutType)"></span>
  <button class="fav-star active" @click.stop="toggleFavorite(ex.name)" title="Hapus dari favorit">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  </button>
</div>
                <span class="ex-name">{{ ex.name }}</span>
                <span class="ex-type-tag" :style="{ '--tag-color': workoutTypeColor(ex.workoutType) }">{{ ex.workoutType }}</span>
              </button>
            </div>
            <div class="fav-divider"></div>
          </div>

          <div v-if="nonFavoritesInCategory.length === 0 && favoritesInCategory.length === 0" class="no-exercise">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p>Belum ada gerakan untuk kategori ini.</p>
          </div>
          <div v-else class="exercise-grid">
            <button
              v-for="ex in nonFavoritesInCategory" :key="ex.name"
              @click="$emit('select-exercise', ex)"
              :class="['ex-btn', selectedExercise?.name === ex.name ? 'active' : '']"
            >
              <div class="ex-btn-top">
                <span class="ex-icon" v-html="getExerciseIcon(ex.workoutType)"></span>
                <button class="fav-star" @click.stop="toggleFavorite(ex.name)" title="Tambah ke favorit">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </button>
              </div>
              <span class="ex-name">{{ ex.name }}</span>
              <span class="ex-type-tag" :style="{ '--tag-color': workoutTypeColor(ex.workoutType) }">{{ ex.workoutType }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state hint jika belum memilih -->
      <div class="empty-hint" v-if="!selectedEquipment">
        <div class="eh-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(234,179,8,0.3)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12"/></svg>
        </div>
        <p>Mulai dengan memilih peralatan di atas</p>
      </div>

    </div>

    <!-- ── KOLOM KANAN: Step 04 Detail + Timer (sticky) ── -->
    <div class="steps-detail">
      <div class="step-card step-card--detail" :class="{ 'has-exercise': !!selectedExercise }">
        <div class="step-bar"></div>
        <div class="step-head">
          <span class="step-num">04</span>
          <span class="step-title">Detail Latihan</span>

          <!-- Toggle Detail / Timer -->
          <div class="step4-toggle" v-if="selectedExercise">
            <button
              :class="['s4-tab', step4View === 'detail' ? 'active' : '']"
              @click="step4View = 'detail'"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Detail
            </button>
            <button
              :class="['s4-tab', step4View === 'timer' ? 'active' : '']"
              @click="step4View = 'timer'"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 3h6"/><path d="M12 3v2"/></svg>
              Timer
              <span v-if="timerRunning" class="timer-live-dot"></span>
            </button>
          </div>
        </div>

        <!-- No exercise selected state -->
        <div class="detail-empty" v-if="!selectedExercise">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(234,179,8,0.15)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          <p class="detail-empty-title">Pilih gerakan dulu</p>
          <p class="detail-empty-sub">Selesaikan langkah 01–03 di sebelah kiri</p>
          <!-- Show current param defaults -->
          <div class="detail-defaults">
            <div class="dd-item"><span class="dd-val">{{ sets }}</span><span class="dd-key">Set</span></div>
            <div class="dd-div"></div>
            <div class="dd-item"><span class="dd-val">{{ reps }}</span><span class="dd-key">Rep</span></div>
            <div class="dd-div"></div>
            <div class="dd-item"><span class="dd-val">{{ duration }}'</span><span class="dd-key">Menit</span></div>
          </div>
        </div>

        <!-- ── PANEL: DETAIL ── -->
        <div v-if="selectedExercise && step4View === 'detail'" class="panel-detail">

          <!-- Exercise name strip -->
         <div class="ex-name-strip">
  <div class="ex-strip-thumb">
    <img :src="selectedExercise.image" :alt="selectedExercise.name" class="ex-thumb-img" @error="onImgError" />
    <span class="ex-strip-icon ex-icon-fallback" v-html="getExerciseIcon(selectedExercise.workoutType)"></span>
  </div>
            <div class="ex-strip-info">
              <span class="ex-strip-name">{{ selectedExercise.name }}</span>
              <span class="ex-strip-type" :style="{ '--tag-color': workoutTypeColor(selectedExercise.workoutType) }">{{ selectedExercise.workoutType }}</span>
            </div>
          </div>

          <div class="detail-grid">
            <div class="inp-group">
              <label class="inp-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                Set
              </label>
              <div class="num-ctrl">
                <button @click="$emit('update:sets', Math.max(1, sets - 1))" class="nc-btn">−</button>
                <span class="nc-val">{{ sets }}</span>
                <button @click="$emit('update:sets', sets + 1)" class="nc-btn">+</button>
              </div>
            </div>
            <div class="inp-group">
              <label class="inp-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4"/></svg>
                Repetisi
              </label>
              <div class="num-ctrl">
                <button @click="$emit('update:reps', Math.max(1, reps - 1))" class="nc-btn">−</button>
                <span class="nc-val">{{ reps }}</span>
                <button @click="$emit('update:reps', reps + 1)" class="nc-btn">+</button>
              </div>
            </div>
            <div class="inp-group">
              <label class="inp-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                Rest (mnt)
              </label>
              <div class="num-ctrl">
                <button @click="$emit('update:rest', parseFloat((Math.max(0.5, rest - 0.5)).toFixed(1)))" class="nc-btn">−</button>
                <span class="nc-val">{{ rest }}</span>
                <button @click="$emit('update:rest', parseFloat((rest + 0.5).toFixed(1)))" class="nc-btn">+</button>
              </div>
            </div>
            <div class="inp-group">
              <label class="inp-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 3h6"/><path d="M12 3v2"/></svg>
                Durasi (mnt)
              </label>
              <div class="num-ctrl">
                <button @click="$emit('update:duration', Math.max(5, duration - 5))" class="nc-btn">−</button>
                <span class="nc-val">{{ duration }}</span>
                <button @click="$emit('update:duration', duration + 5)" class="nc-btn">+</button>
              </div>
            </div>
          </div>

          <div class="inp-section-label">Intensitas Latihan</div>
          <div class="intensity-row">
            <button
              v-for="lvl in intensityLevels" :key="lvl.value"
              @click="$emit('update:intensity', lvl.value)"
              :class="['int-btn', intensity === lvl.value ? 'active' : '']"
              :style="intensity === lvl.value ? { '--acc': lvl.color } : {}"
            >
              <div class="int-indicator" :style="{ background: lvl.color }"></div>
              <div class="int-info">
                <span class="int-label">{{ lvl.label }}</span>
                <span class="int-bpm">~{{ getAvgBpm(lvl.value) }} BPM</span>
              </div>
            </button>
          </div>

          <div class="profile-info-row">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            <span>{{ userProfile.age }}thn · {{ userProfile.weight }}kg · {{ userProfile.height }}m · {{ userProfile.gender === 'Male' ? 'Pria' : 'Wanita' }}</span>
          </div>

          <!-- Shortcut ke timer -->
          <button class="btn-timer-shortcut" @click="step4View = 'timer'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 3h6"/><path d="M12 3v2"/></svg>
            Mulai Timer Latihan
            <span class="shortcut-arrow">→</span>
          </button>

          <button @click="$emit('predict')" :disabled="loading" class="btn-predict">
            <span v-if="!loading" class="btn-predict-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2.5-1.5-4.5-2.5-6 0 2-1 3.5-2.5 4.5C13 8 12 5 12 2z"/></svg>
              Prediksi Kalori Terbakar
            </span>
            <span v-else class="btn-loading"><span class="ld"></span><span class="ld"></span><span class="ld"></span></span>
          </button>
        </div>

        <!-- ── PANEL: TIMER ── -->
        <div v-if="selectedExercise && step4View === 'timer'" class="panel-timer">

          <!-- Exercise info bar -->
          <div class="timer-exercise-bar">
            <div class="teb-left">
              <span class="teb-name">{{ selectedExercise.name }}</span>
              <span class="teb-meta">{{ sets }} set · {{ reps }} rep · rest {{ rest }}mnt</span>
            </div>
            <span class="teb-tag" :style="{ '--tag-color': workoutTypeColor(selectedExercise.workoutType) }">{{ selectedExercise.workoutType }}</span>
          </div>

          <!-- Timer config row -->
          <div class="timer-config-row">
            <div class="tc-conf">
              <span class="tc-conf-label">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 3h6"/></svg>
                Durasi Set
              </span>
              <div class="tc-conf-ctrl">
                <button @click="timerSetDuration = Math.max(10, timerSetDuration - 5)">−</button>
                <span>{{ timerSetDuration }}s</span>
                <button @click="timerSetDuration += 5">+</button>
              </div>
            </div>
            <div class="tc-conf">
              <span class="tc-conf-label">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                Rest
              </span>
              <div class="tc-conf-ctrl">
                <button @click="timerRestDuration = Math.max(10, timerRestDuration - 5)">−</button>
                <span>{{ timerRestDuration }}s</span>
                <button @click="timerRestDuration += 5">+</button>
              </div>
            </div>
          </div>

          <!-- Ring Timer -->
          <div class="timer-ring-wrap">
            <svg class="timer-ring" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="7"/>
              <circle
                cx="70" cy="70" r="60" fill="none"
                :stroke="timerPhase === 'rest' ? '#22c55e' : '#eab308'"
                stroke-width="7"
                stroke-linecap="round"
                :stroke-dasharray="timerCircumference"
                :stroke-dashoffset="timerDashOffset"
                transform="rotate(-90 70 70)"
                style="transition: stroke-dashoffset 1s linear, stroke 0.3s"
              />
            </svg>
            <div class="timer-center">
              <div class="timer-phase-label">{{ timerPhaseLabel }}</div>
              <div class="timer-digits">{{ timerFormatted }}</div>
              <div class="timer-set-label">Set <strong>{{ timerCurrentSet }}</strong> / {{ sets }}</div>
            </div>
          </div>

          <!-- Set dots -->
          <div class="set-dots">
            <span
              v-for="i in sets" :key="i"
              :class="['set-dot', i < timerCurrentSet ? 'done' : i === timerCurrentSet ? 'active' : '']"
            ></span>
          </div>

          <!-- Controls -->
          <div class="timer-controls">
            <button class="tc-btn secondary" @click="resetTimer" title="Reset">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
            </button>
            <button class="tc-btn primary" @click="toggleTimer" :disabled="timerCompleted">
              <svg v-if="!timerRunning" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            </button>
            <button class="tc-btn secondary" @click="skipTimerPhase" title="Skip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
            </button>
          </div>

          <!-- Done state -->
          <div class="timer-done" v-if="timerCompleted">
            <span class="done-emoji">🎉</span>
            <span class="done-text">Semua set selesai!</span>
            <button class="done-restart" @click="resetTimer">Ulangi</button>
          </div>

          <!-- Back to detail -->
          <button class="btn-back-detail" @click="step4View = 'detail'">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Kembali ke Detail &amp; Prediksi
          </button>
        </div>

      </div><!-- end step-card--detail -->
    </div><!-- end steps-detail -->

  </div>
</template>

<script>
import { HOME_GYM_EXERCISES } from '../data/homeGymExercises.js'
import { useFavorites } from '../composables/useFavorites.js'

const INTENSITY_BPM = { low: 0.75, medium: 0.85, high: 0.93 }
const ic = {
  strength: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12"/></svg>`,
  cardio:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  hiit:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
}

export default {
  name: 'WorkoutSteps',
  emits: ['select-equipment','select-category','select-exercise','predict',
          'update:sets','update:reps','update:rest','update:duration','update:intensity'],
  props: {
    selectedEquipment : { type: String,  default: '' },
    selectedCategory  : { type: Object,  default: null },
    selectedExercise  : { type: Object,  default: null },
    muscleCategories  : { type: Array,   required: true },
    filteredExercises : { type: Array,   required: true },
    noEquipmentCount  : { type: Number,  default: 0 },
    dumbbellCount     : { type: Number,  default: 0 },
    sets              : { type: Number,  default: 3 },
    reps              : { type: Number,  default: 12 },
    rest              : { type: Number,  default: 1 },
    duration          : { type: Number,  default: 45 },
    intensity         : { type: String,  default: 'medium' },
    intensityLevels   : { type: Array,   required: true },
    userProfile       : { type: Object,  required: true },
    loading           : { type: Boolean, default: false },
  },

  setup() {
    const { isFavorite, toggleFavorite } = useFavorites()
    return { isFavorite, toggleFavorite }
  },

  data() {
    return {
      step4View        : 'detail',

      // ── Timer state ──
      timerPhase       : 'set',
      timerRunning     : false,
      timerCompleted   : false,
      timerCurrentSet  : 1,
      timerSetDuration : 45,
      timerRestDuration: 60,
      timerTimeLeft    : 45,
      timerTicker      : null,
    }
  },

  computed: {
    favoritesInCategory() {
      return this.filteredExercises.filter(ex => this.isFavorite(ex.name))
    },
    nonFavoritesInCategory() {
      return this.filteredExercises.filter(ex => !this.isFavorite(ex.name))
    },

    timerCircumference() { return 2 * Math.PI * 60 },
    timerTotalDuration()  { return this.timerPhase === 'set' ? this.timerSetDuration : this.timerRestDuration },
    timerDashOffset() {
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
    selectedExercise() { this.resetTimer(); this.step4View = 'detail' },
    sets()             { this.resetTimer() },
    timerSetDuration(v) { if (!this.timerRunning && this.timerPhase === 'set') this.timerTimeLeft = v },
    timerRestDuration(v){ if (!this.timerRunning && this.timerPhase === 'rest') this.timerTimeLeft = v },
  },

  beforeUnmount() { this.stopTimerTicker() },

  methods: {
    getExerciseIcon(t) { return ic[t?.toLowerCase()] || ic.strength },
    workoutTypeColor(t){ return { Strength: '#60a5fa', Cardio: '#34d399', HIIT: '#f87171', Yoga: '#a78bfa' }[t] || '#eab308' },
    getAvgBpm(v)       { return Math.round(this.userProfile.maxBpm * (INTENSITY_BPM[v] || 0.85)) },

    onImgError(e) {
  e.target.classList.add('img-error')
},

    getCategoryCount(key) {
      if (!this.selectedEquipment) return 0
      const cat = this.muscleCategories.find(c => c.key === key)
      if (!cat) return 0
      if (key === 'fullbody') return HOME_GYM_EXERCISES.filter(e => e.equipment === this.selectedEquipment && (e.workoutType === 'HIIT' || (e.muscles && e.muscles.length >= 3))).length
      return HOME_GYM_EXERCISES.filter(e => {
        if (e.equipment !== this.selectedEquipment) return false
        const muscles = (e.muscles || []).map(m => m.toLowerCase())
        return cat.keywords.some(kw => muscles.some(m => m.includes(kw) || kw.includes(m)))
      }).length
    },

    toggleTimer() {
      if (this.timerCompleted) return
      if (this.timerRunning) {
        this.stopTimerTicker()
      } else {
        this.startTimerTicker()
      }
      this.timerRunning = !this.timerRunning
    },

    startTimerTicker() {
      this.timerTicker = setInterval(() => {
        if (this.timerTimeLeft > 0) {
          this.timerTimeLeft--
        } else {
          this.onTimerPhaseEnd()
        }
      }, 1000)
    },

    stopTimerTicker() {
      clearInterval(this.timerTicker)
      this.timerTicker = null
    },

    onTimerPhaseEnd() {
      this.stopTimerTicker()
      this.timerRunning = false
      this.playBeep()

      if (this.timerPhase === 'set') {
        this.timerPhase    = 'rest'
        this.timerTimeLeft = this.timerRestDuration
        this.$nextTick(() => { this.timerRunning = true; this.startTimerTicker() })
      } else {
        if (this.timerCurrentSet < this.sets) {
          this.timerCurrentSet++
          this.timerPhase    = 'set'
          this.timerTimeLeft = this.timerSetDuration
          this.$nextTick(() => { this.timerRunning = true; this.startTimerTicker() })
        } else {
          this.timerCompleted = true
        }
      }
    },

    skipTimerPhase() {
      this.stopTimerTicker()
      this.timerRunning = false
      this.onTimerPhaseEnd()
    },

    resetTimer() {
      this.stopTimerTicker()
      this.timerRunning    = false
      this.timerCompleted  = false
      this.timerCurrentSet = 1
      this.timerPhase      = 'set'
      this.timerTimeLeft   = this.timerSetDuration
    },

    playBeep() {
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
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ═══════════════════════════════════════════════
   OUTER LAYOUT: 2 kolom
   Kiri: selector steps (01-02-03)
   Kanan: detail step (04) — sticky
═══════════════════════════════════════════════ */

.steps-outer {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 16px;
  align-items: start;
}

.steps-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.steps-detail {
  position: sticky;
  top: 76px; /* sesuaikan dengan tinggi navbar */
  min-width: 0;
}

/* ═══════════════════════════════════════════════
   STEP CARDS
═══════════════════════════════════════════════ */

.step-card {
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 24px 26px;
  position: relative;
  overflow: hidden;
}

/* Detail card: highlight border saat ada exercise */
.step-card--detail {
  border-color: rgba(255,255,255,0.07);
  transition: border-color 0.3s;
}
.step-card--detail.has-exercise {
  border-color: rgba(234,179,8,0.2);
}

.step-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent);
}

.step-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.step-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.65rem; font-weight: 900;
  letter-spacing: 0.14em;
  color: rgba(234,179,8,0.6);
  background: rgba(234,179,8,0.08);
  border: 1px solid rgba(234,179,8,0.2);
  padding: 3px 8px; border-radius: 4px;
  flex-shrink: 0;
}

.step-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.6);
  flex-shrink: 0;
}

.step-badge {
  font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #eab308;
  background: rgba(234,179,8,0.1);
  border: 1px solid rgba(234,179,8,0.25);
  padding: 3px 10px; border-radius: 999px;
  /* truncate long names */
  max-width: 160px; overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap;
}

/* ═══════════════════════════════════════════════
   STEP 4 TOGGLE
═══════════════════════════════════════════════ */

.step4-toggle {
  margin-left: auto;
  display: flex;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 8px;
  padding: 3px; gap: 2px;
}

.s4-tab {
  display: flex; align-items: center; gap: 5px;
  padding: 5px 12px;
  background: transparent; border: none;
  border-radius: 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: rgba(255,255,255,0.3);
  cursor: pointer; transition: all 0.2s;
  position: relative;
}
.s4-tab:hover { color: rgba(255,255,255,0.6); }
.s4-tab.active { background: rgba(234,179,8,0.14); color: #eab308; border: 1px solid rgba(234,179,8,0.3); }
.timer-live-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #22c55e;
  animation: blink 1s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

/* ═══════════════════════════════════════════════
   EQUIPMENT TABS
═══════════════════════════════════════════════ */

.category-tabs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.cat-tab { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.3); }
.cat-tab:hover { border-color: rgba(234,179,8,0.3); background: rgba(234,179,8,0.04); color: rgba(255,255,255,0.7); }
.cat-tab.active { background: rgba(234,179,8,0.12); border-color: rgba(234,179,8,0.5); color: #eab308; }
.cat-icon  { display: flex; }
.cat-name  { font-family: 'Barlow Condensed', sans-serif; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
.cat-count { font-size: 0.6rem; color: rgba(255,255,255,0.2); }
.cat-tab.active .cat-count { color: rgba(234,179,8,0.5); }

/* ═══════════════════════════════════════════════
   MUSCLE CATEGORY GRID
═══════════════════════════════════════════════ */

.category-muscle-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.muscle-cat-btn { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 14px 6px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.3); }
.muscle-cat-btn:hover { border-color: rgba(234,179,8,0.3); background: rgba(234,179,8,0.05); color: rgba(255,255,255,0.7); transform: translateY(-1px); }
.muscle-cat-btn.active { background: rgba(234,179,8,0.12); border-color: rgba(234,179,8,0.5); color: #eab308; }
.mc-icon  { display: flex; align-items: center; justify-content: center; }
.mc-label { font-family: 'Barlow Condensed', sans-serif; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; line-height: 1; }
.mc-count { font-size: 0.58rem; color: rgba(255,255,255,0.2); font-weight: 600; }
.muscle-cat-btn.active .mc-count { color: rgba(234,179,8,0.5); }

/* ═══════════════════════════════════════════════
   EXERCISE PICKER (step 03) - scrollable inner area
═══════════════════════════════════════════════ */

.step-card--exercises { padding-bottom: 0; }

.exercise-scroll-area {
  max-height: 340px;
  overflow-y: auto;
  padding-bottom: 20px;
  /* custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(234,179,8,0.2) transparent;
}
.exercise-scroll-area::-webkit-scrollbar { width: 4px; }
.exercise-scroll-area::-webkit-scrollbar-track { background: transparent; }
.exercise-scroll-area::-webkit-scrollbar-thumb { background: rgba(234,179,8,0.2); border-radius: 2px; }

.fav-section { margin-bottom: 4px; }
.fav-section-label { display: flex; align-items: center; gap: 5px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(234,179,8,0.6); margin-bottom: 8px; }
.fav-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 12px 0 8px; }

.no-exercise { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px; text-align: center; color: rgba(255,255,255,0.25); font-size: 0.8rem; }

.exercise-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.ex-btn { display: flex; flex-direction: column; align-items: flex-start; gap: 5px; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; cursor: pointer; text-align: left; transition: all 0.2s; color: rgba(255,255,255,0.5); }
.ex-btn:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); }
.ex-btn.active { background: rgba(234,179,8,0.1); border-color: rgba(234,179,8,0.45); color: #fff; }
.ex-btn.fav    { border-color: rgba(234,179,8,0.15); background: rgba(234,179,8,0.04); }
.ex-btn-top { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.ex-icon    { display: flex; }
.fav-star   { background: transparent; border: none; cursor: pointer; padding: 2px; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.15s; opacity: 0; }
.ex-btn:hover .fav-star { opacity: 1; }
.fav-star.active { opacity: 1 !important; }
.fav-star:hover  { background: rgba(234,179,8,0.1); }
.ex-name     { font-size: 0.78rem; font-weight: 600; line-height: 1.2; }
.ex-type-tag { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--tag-color, #eab308); background: color-mix(in srgb, var(--tag-color, #eab308) 15%, transparent); padding: 2px 6px; border-radius: 4px; }

/* Empty hint */
.empty-hint { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 28px 20px; text-align: center; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.06); border-radius: 14px; color: rgba(255,255,255,0.2); font-size: 0.8rem; }
.eh-icon { opacity: 0.5; }

.ex-thumb {
  width: 100%;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255,255,255,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  position: relative;
}
.ex-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ex-thumb-img.img-error { display: none; }
.ex-icon-fallback {
  display: none;
  position: absolute;
  inset: 0;
  align-items: center;
  justify-content: center;
}
.ex-thumb:has(.img-error) .ex-icon-fallback { display: flex; }

.ex-name-strip {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  padding: 0;
  margin-bottom: 18px;
  background: rgba(234,179,8,0.06);
  border: 1px solid rgba(234,179,8,0.15);
  border-radius: 10px;
  overflow: hidden;
}

.ex-strip-thumb {
  width: 100%;
  height: 160px;
  position: relative;
  background: rgba(255,255,255,0.03);
}

.ex-strip-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 14px;
}

/* ═══════════════════════════════════════════════
   STEP 04: DETAIL EMPTY STATE
═══════════════════════════════════════════════ */

.detail-empty {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; padding: 28px 20px;
  text-align: center;
}
.detail-empty-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: rgba(255,255,255,0.25);
}
.detail-empty-sub {
  font-size: 0.75rem; color: rgba(255,255,255,0.18);
  margin-bottom: 16px;
}
.detail-defaults {
  display: flex; align-items: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px; padding: 10px 14px;
  width: 100%;
}
.dd-item { flex: 1; text-align: center; }
.dd-val  { display: block; font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 900; color: rgba(255,255,255,0.2); line-height: 1; }
.dd-key  { display: block; font-size: 0.58rem; color: rgba(255,255,255,0.15); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }
.dd-div  { width: 1px; height: 24px; background: rgba(255,255,255,0.06); }

/* ═══════════════════════════════════════════════
   PANEL: DETAIL
═══════════════════════════════════════════════ */

.panel-detail { display: flex; flex-direction: column; gap: 0; }

/* Exercise name strip */
.ex-name-strip {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; margin-bottom: 18px;
  background: rgba(234,179,8,0.06);
  border: 1px solid rgba(234,179,8,0.15);
  border-radius: 10px;
}
.ex-strip-icon { display: flex; color: #eab308; flex-shrink: 0; }
.ex-strip-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.ex-strip-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.ex-strip-type {
  font-size: 0.6rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--tag-color, #eab308);
}

.detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
.inp-group   { display: flex; flex-direction: column; gap: 8px; }
.inp-label   { display: flex; align-items: center; gap: 5px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.3); }
.num-ctrl    { display: flex; align-items: center; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
.nc-btn      { width: 36px; height: 42px; background: transparent; border: none; color: rgba(255,255,255,0.4); font-size: 1.1rem; cursor: pointer; transition: all 0.15s; flex-shrink: 0; }
.nc-btn:hover { background: rgba(234,179,8,0.1); color: #eab308; }
.nc-val      { flex: 1; text-align: center; font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; font-weight: 800; color: #fff; }

.inp-section-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.3); margin-bottom: 10px; }
.intensity-row { display: flex; gap: 6px; margin-bottom: 18px; }
.int-btn { flex: 1; display: flex; align-items: center; gap: 8px; padding: 10px 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; cursor: pointer; transition: all 0.2s; }
.int-btn:hover  { border-color: rgba(255,255,255,0.18); }
.int-btn.active { background: rgba(0,0,0,0.3); border-color: var(--acc, #eab308); }
.int-indicator  { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.int-info       { display: flex; flex-direction: column; gap: 2px; text-align: left; }
.int-label      { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.6); }
.int-btn.active .int-label { color: var(--acc, #eab308); }
.int-bpm        { font-size: 0.58rem; color: rgba(255,255,255,0.2); }

.profile-info-row { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; padding: 10px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; font-size: 0.7rem; color: rgba(255,255,255,0.25); }

.btn-timer-shortcut {
  display: flex; align-items: center; gap: 8px; justify-content: center;
  width: 100%; padding: 11px 16px; margin-bottom: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.82rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: rgba(255,255,255,0.35);
  cursor: pointer; transition: all 0.2s;
}
.btn-timer-shortcut:hover {
  border-color: rgba(234,179,8,0.3);
  background: rgba(234,179,8,0.05);
  color: #eab308;
}
.shortcut-arrow { margin-left: auto; opacity: 0.5; }

.btn-predict { width: 100%; padding: 16px; background: #eab308; border: none; border-radius: 12px; color: #000; font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; transition: all 0.2s; overflow: hidden; position: relative; }
.btn-predict::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 55%); }
.btn-predict-inner { display: flex; align-items: center; justify-content: center; gap: 9px; }
.btn-predict:hover:not(:disabled) { background: #facc15; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(234,179,8,0.35); }
.btn-predict:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-loading { display: flex; align-items: center; justify-content: center; gap: 6px; }
.ld { width: 7px; height: 7px; background: #000; border-radius: 50%; animation: bounce 0.9s infinite; }
.ld:nth-child(2) { animation-delay: 0.15s } .ld:nth-child(3) { animation-delay: 0.3s }
@keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }

/* ═══════════════════════════════════════════════
   PANEL: TIMER
═══════════════════════════════════════════════ */

.panel-timer { display: flex; flex-direction: column; align-items: center; gap: 14px; }

.timer-exercise-bar { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; }
.teb-left { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.teb-name { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.teb-meta { font-size: 0.62rem; color: rgba(255,255,255,0.3); }
.teb-tag  { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--tag-color, #eab308); background: color-mix(in srgb, var(--tag-color, #eab308) 15%, transparent); padding: 3px 8px; border-radius: 4px; white-space: nowrap; flex-shrink: 0; }

.timer-config-row { width: 100%; display: flex; gap: 10px; }
.tc-conf { flex: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 10px 14px; display: flex; flex-direction: column; gap: 6px; }
.tc-conf-label { display: flex; align-items: center; gap: 5px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); }
.tc-conf-ctrl  { display: flex; align-items: center; justify-content: space-between; }
.tc-conf-ctrl button { width: 28px; height: 28px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); font-size: 1rem; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; }
.tc-conf-ctrl button:hover { border-color: rgba(234,179,8,0.4); color: #eab308; }
.tc-conf-ctrl span { font-family: 'Barlow Condensed', sans-serif; font-size: 1.05rem; font-weight: 800; color: #fff; }

.timer-ring-wrap { position: relative; width: 140px; height: 140px; }
.timer-ring { width: 140px; height: 140px; }
.timer-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; }
.timer-phase-label { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(255,255,255,0.25); }
.timer-digits { font-family: 'Barlow Condensed', sans-serif; font-size: 2.4rem; font-weight: 900; color: #fff; line-height: 1; }
.timer-set-label { font-size: 0.65rem; color: rgba(255,255,255,0.3); }
.timer-set-label strong { color: #eab308; }

.set-dots { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
.set-dot  { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.1); transition: all 0.3s; }
.set-dot.done   { background: rgba(34,197,94,0.6); }
.set-dot.active { background: #eab308; box-shadow: 0 0 8px rgba(234,179,8,0.5); transform: scale(1.2); }

.timer-controls { display: flex; align-items: center; gap: 12px; }
.tc-btn { border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.tc-btn.primary  { width: 54px; height: 54px; background: #eab308; color: #000; box-shadow: 0 4px 20px rgba(234,179,8,0.3); }
.tc-btn.primary:hover:not(:disabled) { background: #facc15; transform: scale(1.05); }
.tc-btn.primary:disabled { opacity: 0.4; cursor: not-allowed; }
.tc-btn.secondary { width: 40px; height: 40px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1) !important; color: rgba(255,255,255,0.4); }
.tc-btn.secondary:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); }

.timer-done { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px; background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2); border-radius: 12px; width: 100%; text-align: center; }
.done-emoji { font-size: 1.5rem; }
.done-text  { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #22c55e; }
.done-restart { margin-top: 4px; padding: 6px 16px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; color: #22c55e; font-family: 'Barlow Condensed', sans-serif; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; transition: all 0.2s; }
.done-restart:hover { background: rgba(34,197,94,0.2); }

.btn-back-detail { display: flex; align-items: center; gap: 6px; background: transparent; border: none; font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.25); cursor: pointer; transition: color 0.2s; padding: 4px 0; }
.btn-back-detail:hover { color: rgba(255,255,255,0.6); }

/* ═══════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════ */

/* Tablet: inner 2-col menjadi 1-col, detail turun ke bawah */
@media (max-width: 1100px) {
  .steps-outer {
    grid-template-columns: 1fr;
  }
  .steps-detail {
    position: static; /* lepas sticky */
  }
  /* Pada tablet, exercise grid 2 kolom */
  .exercise-grid { grid-template-columns: repeat(2, 1fr); }
  .detail-grid   { grid-template-columns: repeat(4, 1fr); }
}

/* Mobile */
@media (max-width: 640px) {
  .step-card { padding: 18px 16px; }
  .exercise-grid { grid-template-columns: repeat(2, 1fr); }
  .detail-grid   { grid-template-columns: repeat(2, 1fr); }
  .intensity-row { flex-direction: column; }
  .exercise-scroll-area { max-height: 280px; }
}
</style>