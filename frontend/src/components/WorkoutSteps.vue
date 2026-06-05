<template>
  <div class="left-col">

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
    <div class="step-card" v-if="selectedCategory">
      <div class="step-bar"></div>
      <div class="step-head">
        <span class="step-num">03</span>
        <span class="step-title">Pilih Gerakan</span>
        <span class="step-badge" v-if="selectedExercise">{{ selectedExercise.name }}</span>
      </div>

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

      <!-- All exercises -->
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

    <!-- STEP 4: Detail Latihan -->
    <div class="step-card" v-if="selectedExercise">
      <div class="step-bar"></div>
      <div class="step-head">
        <span class="step-num">04</span>
        <span class="step-title">Detail Latihan</span>
      </div>
      <div class="detail-grid">
        <div class="inp-group">
          <label class="inp-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg> Set</label>
          <div class="num-ctrl">
            <button @click="$emit('update:sets', Math.max(1, sets - 1))" class="nc-btn">−</button>
            <span class="nc-val">{{ sets }}</span>
            <button @click="$emit('update:sets', sets + 1)" class="nc-btn">+</button>
          </div>
        </div>
        <div class="inp-group">
          <label class="inp-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4"/></svg> Repetisi</label>
          <div class="num-ctrl">
            <button @click="$emit('update:reps', Math.max(1, reps - 1))" class="nc-btn">−</button>
            <span class="nc-val">{{ reps }}</span>
            <button @click="$emit('update:reps', reps + 1)" class="nc-btn">+</button>
          </div>
        </div>
        <div class="inp-group">
          <label class="inp-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Rest (mnt)</label>
          <div class="num-ctrl">
            <button @click="$emit('update:rest', parseFloat((Math.max(0.5, rest - 0.5)).toFixed(1)))" class="nc-btn">−</button>
            <span class="nc-val">{{ rest }}</span>
            <button @click="$emit('update:rest', parseFloat((rest + 0.5).toFixed(1)))" class="nc-btn">+</button>
          </div>
        </div>
        <div class="inp-group">
          <label class="inp-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 3h6"/><path d="M12 3v2"/></svg> Durasi (mnt)</label>
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
        <span>Profil: {{ userProfile.age }}thn · {{ userProfile.weight }}kg · {{ userProfile.height }}m · {{ userProfile.gender === 'Male' ? 'Pria' : 'Wanita' }}</span>
      </div>

      <button @click="$emit('predict')" :disabled="loading" class="btn-predict">
        <span v-if="!loading" class="btn-predict-inner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2.5-1.5-4.5-2.5-6 0 2-1 3.5-2.5 4.5C13 8 12 5 12 2z"/></svg>
          Prediksi Kalori Terbakar
        </span>
        <span v-else class="btn-loading"><span class="ld"></span><span class="ld"></span><span class="ld"></span></span>
      </button>
    </div>

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

  computed: {
    favoritesInCategory() {
      return this.filteredExercises.filter(ex => this.isFavorite(ex.name))
    },
    nonFavoritesInCategory() {
      return this.filteredExercises.filter(ex => !this.isFavorite(ex.name))
    },
  },

  methods: {
    getExerciseIcon(t) { return ic[t?.toLowerCase()] || ic.strength },
    workoutTypeColor(t){ return { Strength:'#60a5fa', Cardio:'#34d399', HIIT:'#f87171', Yoga:'#a78bfa' }[t] || '#eab308' },
    getAvgBpm(v)       { return Math.round(this.userProfile.maxBpm * (INTENSITY_BPM[v] || 0.85)) },

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
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.left-col { display: flex; flex-direction: column; gap: 16px; }
.step-card { background: #0d1117; border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 24px 26px; position: relative; overflow: hidden; }
.step-bar  { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent); }
.step-head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.step-num  { font-family: 'Barlow Condensed', sans-serif; font-size: 0.65rem; font-weight: 900; letter-spacing: 0.14em; color: rgba(234,179,8,0.6); background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.2); padding: 3px 8px; border-radius: 4px; }
.step-title { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.6); }
.step-badge { margin-left: auto; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #eab308; background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.25); padding: 3px 10px; border-radius: 999px; }

.category-tabs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.cat-tab { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.3); }
.cat-tab:hover { border-color: rgba(234,179,8,0.3); background: rgba(234,179,8,0.04); color: rgba(255,255,255,0.7); }
.cat-tab.active { background: rgba(234,179,8,0.12); border-color: rgba(234,179,8,0.5); color: #eab308; }
.cat-icon { display: flex; }
.cat-name { font-family: 'Barlow Condensed', sans-serif; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
.cat-count { font-size: 0.6rem; color: rgba(255,255,255,0.2); }
.cat-tab.active .cat-count { color: rgba(234,179,8,0.5); }

.category-muscle-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.muscle-cat-btn { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 14px 6px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.3); }
.muscle-cat-btn:hover { border-color: rgba(234,179,8,0.3); background: rgba(234,179,8,0.05); color: rgba(255,255,255,0.7); transform: translateY(-1px); }
.muscle-cat-btn.active { background: rgba(234,179,8,0.12); border-color: rgba(234,179,8,0.5); color: #eab308; }
.mc-icon  { display: flex; align-items: center; justify-content: center; }
.mc-label { font-family: 'Barlow Condensed', sans-serif; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; line-height: 1; }
.mc-count { font-size: 0.58rem; color: rgba(255,255,255,0.2); font-weight: 600; }
.muscle-cat-btn.active .mc-count { color: rgba(234,179,8,0.5); }

/* Favorites section */
.fav-section { margin-bottom: 4px; }
.fav-section-label { display: flex; align-items: center; gap: 5px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(234,179,8,0.6); margin-bottom: 8px; }
.fav-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 12px 0 8px; }

/* Exercise grid */
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

/* Detail */
.detail-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.inp-group   { display: flex; flex-direction: column; gap: 8px; }
.inp-label   { display: flex; align-items: center; gap: 5px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.3); }
.num-ctrl    { display: flex; align-items: center; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
.nc-btn      { width: 36px; height: 42px; background: transparent; border: none; color: rgba(255,255,255,0.4); font-size: 1.1rem; cursor: pointer; transition: all 0.15s; flex-shrink: 0; }
.nc-btn:hover { background: rgba(234,179,8,0.1); color: #eab308; }
.nc-val      { flex: 1; text-align: center; font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; font-weight: 800; color: #fff; }

.inp-section-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.3); margin-bottom: 10px; }
.intensity-row { display: flex; gap: 8px; margin-bottom: 18px; }
.int-btn { flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; cursor: pointer; transition: all 0.2s; }
.int-btn:hover  { border-color: rgba(255,255,255,0.18); }
.int-btn.active { background: rgba(0,0,0,0.3); border-color: var(--acc, #eab308); }
.int-indicator  { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.int-info       { display: flex; flex-direction: column; gap: 2px; text-align: left; }
.int-label      { font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.6); }
.int-btn.active .int-label { color: var(--acc, #eab308); }
.int-bpm        { font-size: 0.62rem; color: rgba(255,255,255,0.2); }

.profile-info-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; padding: 10px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; font-size: 0.72rem; color: rgba(255,255,255,0.3); }

.btn-predict { width: 100%; padding: 16px; background: #eab308; border: none; border-radius: 12px; color: #000; font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; transition: all 0.2s; overflow: hidden; position: relative; }
.btn-predict::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 55%); }
.btn-predict-inner { display: flex; align-items: center; justify-content: center; gap: 9px; }
.btn-predict:hover:not(:disabled) { background: #facc15; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(234,179,8,0.35); }
.btn-predict:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-loading { display: flex; align-items: center; justify-content: center; gap: 6px; }
.ld { width: 7px; height: 7px; background: #000; border-radius: 50%; animation: bounce 0.9s infinite; }
.ld:nth-child(2) { animation-delay: 0.15s } .ld:nth-child(3) { animation-delay: 0.3s }
@keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }

@media (max-width: 900px) {
  .exercise-grid { grid-template-columns: repeat(2, 1fr); }
  .detail-grid   { grid-template-columns: repeat(2, 1fr); }
}
</style>