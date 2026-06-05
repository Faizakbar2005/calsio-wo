<template>
  <div class="workout-wrapper">
    <div class="bg-grid"></div>
    <Navbar />

    <main class="main-content">

      <div class="page-header animate-in">
        <div class="page-eyebrow">ML-Powered Prediction</div>
        <h1 class="page-title">Workout Session</h1>
        <p class="page-sub">Pilih gerakan, isi detail, dan model GBR kami prediksi kalori yang terbakar</p>
      </div>

      <div class="workout-grid animate-in" style="animation-delay:0.08s">

        <WorkoutSteps
          :selected-equipment="selectedEquipment"
          :selected-category="selectedCategory"
          :selected-exercise="selectedExercise"
          :muscle-categories="muscleCategories"
          :filtered-exercises="filteredExercises"
          :no-equipment-count="noEquipmentCount"
          :dumbbell-count="dumbbellCount"
          :sets="sets"
          :reps="reps"
          :rest="rest"
          :duration="duration"
          :intensity="intensity"
          :intensity-levels="intensityLevels"
          :user-profile="userProfile"
          :loading="loading"
          @select-equipment="selectEquipment"
          @select-category="selectCategory"
          @select-exercise="selectExercise"
          @predict="predictCalories"
          @update:sets="sets = $event"
          @update:reps="reps = $event"
          @update:rest="rest = $event"
          @update:duration="duration = $event"
          @update:intensity="intensity = $event"
        />

        <WorkoutBodyVisualizer
          v-model:bodyView="bodyView"
          :selected-exercise="selectedExercise"
          :selected-equipment="selectedEquipment"
          :calories="calories"
          :saved="saved"
          :error-msg="errorMsg"
          :sets="sets"
          :reps="reps"
          :rest="rest"
          :duration="duration"
          :avg-bpm="getAvgBpm(intensity)"
          @open-modal="modalVisible = true"
          @save="saveSession"
          @reset="resetAll"
        />

      </div>
    </main>

    <CaloriePredictModal
      :visible="modalVisible"
      :loading="loading"
      :calories="calories"
      :exercise="selectedExercise"
      :duration="duration"
      :avg-bpm="getAvgBpm(intensity)"
      :sets="sets"
      :reps="reps"
      :intensity="intensity"
      :saved="saved"
      :error-msg="errorMsg"
      :feature-importance="featureImportance"
      @close="modalVisible = false"
      @save="saveSession"
    />

    <WorkoutToast
      :visible="toastVisible"
      :calories="calories"
      :exercise-name="selectedExercise?.name || ''"
      @close="toastVisible = false"
      @go-dashboard="goToDashboard"
    />

  </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import Navbar                from '../components/layout/navbar.vue'
import WorkoutSteps          from '../components/WorkoutSteps.vue'
import WorkoutBodyVisualizer from '../components/WorkoutBodyVisualizer.vue'
import WorkoutToast          from '../components/WorkoutToast.vue'
import CaloriePredictModal   from './CaloriePredictModal.vue'
import { HOME_GYM_EXERCISES, NO_EQUIPMENT, WITH_DUMBBELL } from '../data/homeGymExercises.js'
import { getMETFactor } from '../utils/metConstants.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const INTENSITY_BPM = { low: 0.75, medium: 0.85, high: 0.93 }

const DEFAULT_PROFILE = {
  age             : 25,
  gender          : 'Male',
  weight          : 70,
  height          : 1.70,
  maxBpm          : 195,
  restingBpm      : 62,
  fatPercentage   : 24.98,
  waterIntake     : 2.63,
  workoutFrequency: 3,
  experienceLevel : 2,
}

export default {
  name: 'Workout',
  components: { Navbar, WorkoutSteps, WorkoutBodyVisualizer, WorkoutToast, CaloriePredictModal },

  setup() {
    const router = useRouter()
    return { router }
  },

  data() {
    return {
      selectedEquipment : '',
      selectedCategory  : null,
      selectedExercise  : null,
      sets              : 3,
      reps              : 12,
      rest              : 1,
      duration          : 45,
      intensity         : 'medium',
      calories          : null,
      loading           : false,
      saved             : false,
      errorMsg          : '',
      modalVisible      : false,
      toastVisible      : false,
      bodyView          : 'front',
      featureImportance : [],

      intensityLevels: [
        { value: 'low',    label: 'Ringan', color: '#22c55e' },
        { value: 'medium', label: 'Sedang', color: '#eab308' },
        { value: 'high',   label: 'Berat',  color: '#ef4444' },
      ],

      muscleCategories: [
        { key: 'chest',    label: 'Chest',       keywords: ['dada', 'pectoralis', 'pec'],                                                                                           icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6 Q6 3 12 5 Q18 3 21 6 L21 14 Q18 18 12 16 Q6 18 3 14 Z"/><line x1="12" y1="5" x2="12" y2="16"/></svg>` },
        { key: 'back',     label: 'Back',         keywords: ['punggung', 'lat', 'latissimus', 'trapezius', 'trap', 'erector', 'lower back'],                                        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><path d="M4 6 Q8 5 12 6 Q16 5 20 6"/><path d="M5 12 Q8 10 12 11 Q16 10 19 12"/><path d="M6 18 Q9 16 12 17 Q15 16 18 18"/></svg>` },
        { key: 'shoulder', label: 'Shoulder',     keywords: ['deltoid', 'bahu'],                                                                                                    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 14 Q4 6 9 8 Q12 9 12 12"/><path d="M22 14 Q20 6 15 8 Q12 9 12 12"/><path d="M9 8 Q12 4 15 8"/></svg>` },
        { key: 'bicep',    label: 'Bicep',         keywords: ['bisep', 'bicep', 'brachialis', 'brachioradialis'],                                                                    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20 L7 14 Q7 8 10 6 Q14 4 16 8 Q18 12 14 14 L8 16"/><path d="M6 20 Q7 22 10 21 L14 14"/></svg>` },
        { key: 'tricep',   label: 'Tricep',         keywords: ['trisep', 'tricep'],                                                                                                  icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4 Q12 2 16 4 L17 12 Q17 16 12 18 Q7 16 7 12 Z"/><line x1="10" y1="4" x2="9" y2="18"/><line x1="14" y1="4" x2="15" y2="18"/></svg>` },
        { key: 'abs',      label: 'Abs & Core',    keywords: ['perut', 'abs', 'core', 'oblique', 'hip flexor'],                                                                     icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="5" height="4" rx="1"/><rect x="13" y="3" width="5" height="4" rx="1"/><rect x="6" y="10" width="5" height="4" rx="1"/><rect x="13" y="10" width="5" height="4" rx="1"/><rect x="6" y="17" width="5" height="4" rx="1"/><rect x="13" y="17" width="5" height="4" rx="1"/></svg>` },
        { key: 'legs',     label: 'Legs',           keywords: ['kaki', 'quad', 'hamstring', 'gluteus', 'glute', 'bokong', 'betis', 'calf', 'paha', 'hip abductor', 'hip adductor'], icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2 L8 12 Q8 14 9 15 L8 22"/><path d="M15 2 L16 12 Q16 14 15 15 L16 22"/><path d="M9 2 Q12 1 15 2"/><path d="M9 15 Q12 16 15 15"/></svg>` },
        { key: 'cardio',   label: 'Cardio & HIIT', keywords: ['kardio', 'full body', 'cardio'],                                                                                     icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><polyline points="2 13 6 13 8 9 11 17 13 13 15 15 17 13 22 13" stroke-width="1.5"/></svg>` },
        { key: 'fullbody', label: 'Full Body',      keywords: ['full body', 'kardio', 'core', 'kaki', 'dada', 'punggung'],                                                           icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v5l-4 4v5M12 12l4 4v5"/><path d="M8 9h8"/></svg>` },
      ],
    }
  },

  computed: {
    noEquipmentCount() { return NO_EQUIPMENT.length },
    dumbbellCount()    { return WITH_DUMBBELL.length },

    filteredExercises() {
      if (!this.selectedEquipment || !this.selectedCategory) return []
      const kws = this.selectedCategory.keywords
      if (this.selectedCategory.key === 'fullbody') {
        return HOME_GYM_EXERCISES.filter(e =>
          e.equipment === this.selectedEquipment &&
          (e.workoutType === 'HIIT' || (e.muscles && e.muscles.length >= 3))
        )
      }
      return HOME_GYM_EXERCISES.filter(e => {
        if (e.equipment !== this.selectedEquipment) return false
        const muscles = (e.muscles || []).map(m => m.toLowerCase())
        return kws.some(kw => muscles.some(m => m.includes(kw) || kw.includes(m)))
      })
    },

    userProfile() {
      try {
        const s = localStorage.getItem('calsio_user_profile')
        if (s) return { ...DEFAULT_PROFILE, ...JSON.parse(s) }
      } catch {}
      return DEFAULT_PROFILE
    },
  },

  methods: {
    getAvgBpm(intensityVal) {
      return Math.round(this.userProfile.maxBpm * (INTENSITY_BPM[intensityVal] || 0.85))
    },

    selectEquipment(eq) {
      this.selectedEquipment = eq
      this.selectedCategory  = null
      this.selectedExercise  = null
      this.calories = null; this.saved = false; this.errorMsg = ''
    },

    selectCategory(cat) {
      this.selectedCategory = cat
      this.selectedExercise = null
      this.calories = null; this.saved = false; this.errorMsg = ''
    },

    selectExercise(ex) {
      this.selectedExercise = ex
      this.calories = null; this.saved = false; this.errorMsg = ''
      const backMuscles = ['punggung', 'lat', 'trap', 'hamstring', 'glute', 'bokong', 'trisep', 'tricep']
      const muscles = (ex.muscles || []).map(m => m.toLowerCase())
      this.bodyView = muscles.some(m => backMuscles.some(b => m.includes(b))) ? 'back' : 'front'
    },

    async predictCalories() {
      if (!this.selectedExercise) return

      this.modalVisible      = true
      this.loading           = true
      this.calories          = null
      this.saved             = false
      this.errorMsg          = ''
      this.featureImportance = []

      const p      = this.userProfile
      const avgBpm = this.getAvgBpm(this.intensity)

      const payload = {
        age    : p.age,
        gender : p.gender,
        weight : p.weight,
        height : p.height > 10 ? p.height / 100 : p.height,

        maxBpm    : p.maxBpm,
        avgBpm,
        restingBpm: p.restingBpm,

        sessionDuration: parseFloat((this.duration / 60).toFixed(4)),
        workoutType    : this.selectedExercise.workoutType,

        experienceLevel : p.experienceLevel  || 2,
        fatPercentage   : p.fatPercentage    || 24.98,
        waterIntake     : p.waterIntake      || 2.63,
        workoutFrequency: p.workoutFrequency || 3,
      }

      try {
        const res = await axios.post(`${API_URL}/api/calories/predict`, payload)

        if (res.data.success === true || res.data.success === 'true') {
          const base      = res.data.data.caloriesBurned
          const metFactor = getMETFactor(this.selectedExercise.muscles[0], this.selectedExercise.workoutType)

          this.calories          = Math.round(base * metFactor)
          this.featureImportance = [...(res.data.data.featureImportance || [])]
        } else {
          throw new Error(res.data.message || 'Prediksi gagal')
        }

      } catch (err) {
        if (err.code === 'ERR_NETWORK' || err.response?.status === 503) {
          this.calories          = this._fallback()
          this.featureImportance = []
          this.errorMsg          = 'ML service offline — hasil estimasi manual (MET)'
        } else {
          this.errorMsg = err.response?.data?.message || err.message
        }
      } finally {
        this.loading = false
      }
    },

    _fallback() {
      const met = this.selectedExercise?.met || ({ low: 3.5, medium: 6.5, high: 10 }[this.intensity] || 6.5)
      return Math.round(met * this.userProfile.weight * (this.duration / 60))
    },

    async saveSession() {
      try {
        const token = localStorage.getItem('calsio_token') || localStorage.getItem('access_token')

        await axios.post(`${API_URL}/api/history`, {
          calories     : this.calories,
          duration     : this.duration,
          exercise_name: this.selectedExercise?.name         || null,
          muscle_group : this.selectedExercise?.muscles?.[0] || null,
          workout_type : this.selectedExercise?.workoutType  || null,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.saved        = true
        this.modalVisible = false
        this.toastVisible = true
      } catch (err) {
        console.error('Gagal simpan:', err.message)
      }
    },

    goToDashboard() {
      this.toastVisible = false
      this.router.push('/dashboard')
    },

    resetAll() {
      this.selectedEquipment  = ''
      this.selectedCategory   = null
      this.selectedExercise   = null
      this.sets = 3; this.reps = 12; this.rest = 1; this.duration = 45
      this.intensity          = 'medium'
      this.calories           = null
      this.saved              = false
      this.errorMsg           = ''
      this.featureImportance  = []
      this.modalVisible       = false
      this.toastVisible       = false
      this.bodyView           = 'front'
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.workout-wrapper { font-family: 'Barlow', sans-serif; min-height: 100vh; background: #080a0f; color: #fff; position: relative; overflow-x: hidden; }
.bg-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(234,179,8,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.025) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; z-index: 0; }
.main-content { position: relative; z-index: 1; max-width: 1600px; margin: 0 auto; padding: 44px 48px 100px; display: flex; flex-direction: column; gap: 28px; }
.animate-in { opacity: 0; transform: translateY(14px); animation: fadeUp 0.4s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
.page-eyebrow { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em; color: #eab308; margin-bottom: 6px; }
.page-title   { font-family: 'Barlow Condensed', sans-serif; font-size: 2.8rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.03em; line-height: 1; }
.page-sub     { margin-top: 8px; font-size: 0.85rem; color: rgba(255,255,255,0.3); }

/* Main two-panel grid: WorkoutSteps (left, wide) + WorkoutBodyVisualizer (right, fixed) */
.workout-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 20px;
  align-items: start;
}

@media (max-width: 1200px) { .workout-grid { grid-template-columns: 1fr 340px; } }
@media (max-width: 1024px) { .workout-grid { grid-template-columns: 1fr; } }
@media (max-width: 900px)  { .main-content { padding: 28px 20px 60px; } }
</style>