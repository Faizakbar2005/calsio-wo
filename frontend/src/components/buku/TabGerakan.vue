<template>
  <div class="tab-gerakan">

    <!-- Toolbar -->
    <div class="toolbar">
      <div class="search-wrap">
        <span class="search-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input v-model="searchQuery" placeholder="Cari gerakan..." class="search-input" />
        <button v-if="searchQuery" @click="searchQuery = ''" class="search-clear">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="filter-chips">
        <button
          v-for="cat in muscleCategories"
          :key="cat"
          @click="filterMuscle = filterMuscle === cat ? '' : cat"
          :class="['chip', filterMuscle === cat ? 'active' : '']"
        >{{ cat }}</button>
      </div>
    </div>

    <!-- Count -->
    <div class="result-count" v-if="filteredExercises.length > 0">
      <span>{{ filteredExercises.length }} gerakan</span>
      <span v-if="filterMuscle || searchQuery" class="count-filter">
        · filter aktif
        <button @click="filterMuscle=''; searchQuery=''" class="clear-filter">Reset</button>
      </span>
    </div>

    <!-- Exercise Grid -->
    <div class="exercise-grid">
      <div
        v-for="(ex, idx) in filteredExercises"
        :key="ex.name"
        @click="$emit('open-detail', ex)"
        class="exercise-card"
        :style="{ animationDelay: (idx * 0.04) + 's' }"
      >
        <!-- Top accent -->
        <div class="ex-accent" :style="{ background: ex.color }"></div>

        <!-- Illustration -->
        <div class="ex-illus" :style="{ background: ex.color + '0d' }">
          <div class="ex-icon">
            <img :src="ex.icon" :alt="ex.name" class="ex-icon-img" />
          </div>
          <div class="ex-difficulty" :class="ex.level">{{ levelLabel[ex.level] }}</div>
        </div>

        <!-- Body -->
        <div class="ex-body">
          <div class="ex-body-top">
            <h3 class="ex-name">{{ ex.name }}</h3>
            <div class="ex-arrow" :style="{ color: ex.color }">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>

          <div class="ex-tags">
            <span class="ex-tag muscle" :style="{ color: ex.color, background: ex.color + '12', borderColor: ex.color + '25' }">
              <span class="tag-icon" v-html="ex.muscleIcon"></span>
              {{ ex.muscle }}
            </span>
            <span class="ex-tag equip">{{ ex.equipment }}</span>
          </div>

          <div class="ex-footer">
            <div class="ex-met-wrap">
              <span class="ex-met-label">MET</span>
              <span class="ex-met-val" :style="{ color: ex.color }">{{ ex.met }}</span>
            </div>
            <div class="ex-kcal">
              <span>≈{{ Math.round(ex.met * 70 * 0.5) }} kcal</span>
              <span class="ex-kcal-note">/ 30 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-if="filteredExercises.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>
      <p class="empty-title">Gerakan tidak ditemukan</p>
      <p class="empty-sub">Coba ubah filter atau kata kunci pencarian</p>
      <button @click="filterMuscle=''; searchQuery=''" class="empty-reset">Reset Filter</button>
    </div>

  </div>
</template>

<script>
import { exercises, muscleCategories } from '../../services/bukuData.js'

export default {
  name: 'TabGerakan',
  emits: ['open-detail'],
  data() {
    return {
      searchQuery: '',
      filterMuscle: '',
      exercises,
      muscleCategories,
      levelLabel: {
        beginner: 'Pemula',
        intermediate: 'Menengah',
        advanced: 'Mahir',
      }
    }
  },
  computed: {
    filteredExercises() {
      let list = this.exercises
      if (this.filterMuscle && this.filterMuscle !== 'Semua') {
        list = list.filter(e => e.muscle === this.filterMuscle)
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase()
        list = list.filter(e =>
          e.name.toLowerCase().includes(q) || e.muscle.toLowerCase().includes(q)
        )
      }
      return list
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;600&display=swap');

.tab-gerakan { display: flex; flex-direction: column; gap: 18px; }

/* ── Toolbar ── */
.toolbar {
  display: flex; flex-direction: column; gap: 12px;
}

.search-wrap {
  position: relative; max-width: 380px;
  display: flex; align-items: center;
}
.search-icon {
  position: absolute; left: 14px;
  color: rgba(255,255,255,0.2);
  display: flex; align-items: center;
  pointer-events: none;
}
.search-input {
  width: 100%; padding: 12px 40px 12px 40px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 11px; color: #fff;
  font-family: 'Barlow', sans-serif; font-size: 0.9rem; outline: none;
  transition: border-color 0.2s, background 0.2s;
}
.search-input:focus {
  border-color: rgba(234,179,8,0.4);
  background: rgba(255,255,255,0.05);
}
.search-input::placeholder { color: rgba(255,255,255,0.18); }
.search-clear {
  position: absolute; right: 12px;
  background: none; border: none;
  color: rgba(255,255,255,0.25); cursor: pointer;
  display: flex; align-items: center;
  transition: color 0.2s;
}
.search-clear:hover { color: rgba(255,255,255,0.6); }

.filter-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip {
  padding: 6px 14px;
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px; color: rgba(255,255,255,0.35);
  font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.07em;
  cursor: pointer; transition: all 0.18s ease;
}
.chip:hover {
  border-color: rgba(234,179,8,0.25);
  color: rgba(255,255,255,0.65);
  background: rgba(255,255,255,0.055);
}
.chip.active {
  background: rgba(234,179,8,0.1);
  border-color: rgba(234,179,8,0.35);
  color: #eab308;
}

/* Result count */
.result-count {
  font-size: 0.75rem; color: rgba(255,255,255,0.22);
  display: flex; align-items: center; gap: 6px;
}
.count-filter { color: rgba(234,179,8,0.5); display: flex; align-items: center; gap: 6px; }
.clear-filter {
  background: none; border: none;
  color: rgba(234,179,8,0.7); font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  cursor: pointer; text-decoration: underline; padding: 0;
  transition: color 0.2s;
}
.clear-filter:hover { color: #eab308; }

/* ── Grid ── */
.exercise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(228px, 1fr));
  gap: 14px;
}

/* ── Card ── */
.exercise-card {
  background: #0c0f18;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px; overflow: hidden; cursor: pointer;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  animation: cardIn 0.35s ease both;
}
.exercise-card:hover {
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.5);
}
@keyframes cardIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

.ex-accent {
  height: 2px; opacity: 0.6;
  transition: opacity 0.2s;
}
.exercise-card:hover .ex-accent { opacity: 1; }

.ex-illus {
  height: 160px;        /* naik dari 118px */
  display: flex; align-items: center; justify-content: center;
  position: relative;
  overflow: hidden;
  transition: background 0.25s;
}

/* PNG icon */
.ex-icon {
  width: 100%;
  height: 100%;
}

.ex-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;  /* ← fokus ke bagian atas/tengah gambar */
  transition: transform 0.25s ease;
}
.exercise-card:hover .ex-icon-img {
  transform: scale(1.06);
}

.ex-difficulty {
  position: absolute; top: 10px; right: 10px;
  font-size: 0.6rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.1em;
  padding: 3px 9px; border-radius: 999px;
}
.ex-difficulty.beginner     { background: rgba(34,197,94,0.1);  color: #22c55e; border: 1px solid rgba(34,197,94,0.22); }
.ex-difficulty.intermediate { background: rgba(234,179,8,0.1);  color: #eab308; border: 1px solid rgba(234,179,8,0.22); }
.ex-difficulty.advanced     { background: rgba(239,68,68,0.1);   color: #ef4444; border: 1px solid rgba(239,68,68,0.22); }

.ex-body { padding: 16px 18px 18px; display: flex; flex-direction: column; gap: 12px; }

.ex-body-top {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
}
.ex-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.08rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.07em;
  color: #fff; line-height: 1.1;
}
.ex-arrow {
  display: flex; flex-shrink: 0;
  opacity: 0.3;
  transition: opacity 0.2s, transform 0.2s;
  margin-top: 2px;
}
.exercise-card:hover .ex-arrow {
  opacity: 1;
  transform: translateX(3px);
}

.ex-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.ex-tag {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 0.63rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em;
  padding: 4px 10px; border-radius: 6px; border: 1px solid;
}
.ex-tag.equip {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.28);
}
.tag-icon { display: flex; align-items: center; flex-shrink: 0; }
.tag-icon :deep(svg) { width: 11px; height: 11px; }

.ex-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.ex-met-wrap { display: flex; align-items: baseline; gap: 5px; }
.ex-met-label {
  font-size: 0.6rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.2);
}
.ex-met-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 900;
}
.ex-kcal {
  display: flex; align-items: baseline; gap: 3px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.82rem; font-weight: 700;
  color: rgba(255,255,255,0.22);
}
.ex-kcal-note { font-size: 0.62rem; color: rgba(255,255,255,0.14); }

/* ── Empty ── */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 10px; padding: 72px 20px; text-align: center;
}
.empty-icon { margin-bottom: 4px; }
.empty-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
  color: rgba(255,255,255,0.2);
}
.empty-sub { font-size: 0.78rem; color: rgba(255,255,255,0.15); }
.empty-reset {
  margin-top: 8px; padding: 8px 20px;
  background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.25);
  border-radius: 8px; color: #eab308;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
  cursor: pointer; transition: all 0.2s;
}
.empty-reset:hover { background: rgba(234,179,8,0.14); }

@media (max-width: 600px) {
  .exercise-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
}
@media (max-width: 400px) {
  .exercise-grid { grid-template-columns: 1fr; }
}
</style>