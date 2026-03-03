<template>
  <div class="tab-gerakan">

    <!-- Search + Filter -->
    <div class="search-filter-row">
      <div class="search-wrap">
        <span class="search-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input v-model="searchQuery" placeholder="Cari gerakan..." class="search-input" />
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

    <!-- Exercise Grid -->
    <div class="exercise-grid">
      <div
        v-for="ex in filteredExercises"
        :key="ex.name"
        @click="$emit('open-detail', ex)"
        class="exercise-card"
      >
        <div class="ex-illus" :style="{ background: ex.color + '12' }">
          <!-- Border accent top -->
          <div class="ex-illus-accent" :style="{ background: ex.color }"></div>

          <!-- SVG icon dari data -->
          <div class="ex-icon" :style="{ color: ex.color }" v-html="ex.icon"></div>

          <!-- Difficulty badge -->
          <div class="ex-difficulty" :class="ex.level">{{ levelLabel[ex.level] }}</div>
        </div>

        <div class="ex-body">
          <h3 class="ex-name">{{ ex.name }}</h3>
          <div class="ex-tags">
            <span class="ex-tag muscle">
              <span class="tag-icon" v-html="ex.muscleIcon" :style="{ color: ex.color }"></span>
              {{ ex.muscle }}
            </span>
            <span class="ex-tag equip">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4"/>
              </svg>
              {{ ex.equipment }}
            </span>
          </div>
          <div class="ex-meta">
            <span class="ex-met">MET {{ ex.met }}</span>
            <span class="ex-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredExercises.length === 0" class="empty-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
      <p>Gerakan tidak ditemukan</p>
    </div>

  </div>
</template>

<script>
import { exercises, muscleCategories } from './bukuData.js'

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

.tab-gerakan { display: flex; flex-direction: column; gap: 20px; }

/* ── Search & Filter ── */
.search-filter-row { display: flex; flex-direction: column; gap: 12px; }

.search-wrap { position: relative; max-width: 400px; }
.search-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: rgba(255,255,255,0.25); display: flex; align-items: center;
}
.search-input {
  width: 100%; padding: 12px 14px 12px 42px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; color: #fff;
  font-family: 'Barlow', sans-serif; font-size: 0.9rem; outline: none;
  transition: border-color 0.2s;
}
.search-input:focus { border-color: rgba(234,179,8,0.5); }
.search-input::placeholder { color: rgba(255,255,255,0.2); }

.filter-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  padding: 6px 14px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px; color: rgba(255,255,255,0.4);
  font-size: 0.72rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.06em;
  cursor: pointer; transition: all 0.2s;
}
.chip:hover { border-color: rgba(234,179,8,0.3); color: rgba(255,255,255,0.7); }
.chip.active { background: rgba(234,179,8,0.12); border-color: #eab308; color: #eab308; }

/* ── Grid ── */
.exercise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

/* ── Card ── */
.exercise-card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; overflow: hidden; cursor: pointer;
  transition: all 0.25s ease;
}
.exercise-card:hover {
  border-color: rgba(234,179,8,0.3);
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.4);
}

/* Illustration area */
.ex-illus {
  position: relative; height: 120px;
  display: flex; align-items: center; justify-content: center;
}
.ex-illus-accent {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  opacity: 0.7;
}
.ex-icon {
  display: flex; align-items: center; justify-content: center;
  opacity: 0.85;
  filter: drop-shadow(0 0 12px currentColor);
  transition: transform 0.25s, opacity 0.25s;
}
.exercise-card:hover .ex-icon {
  transform: scale(1.08);
  opacity: 1;
}

/* Difficulty badge */
.ex-difficulty {
  position: absolute; top: 10px; right: 10px;
  font-size: 0.62rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 3px 10px; border-radius: 999px;
}
.ex-difficulty.beginner     { background: rgba(34,197,94,0.12);  color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
.ex-difficulty.intermediate { background: rgba(234,179,8,0.12);  color: #eab308; border: 1px solid rgba(234,179,8,0.25); }
.ex-difficulty.advanced     { background: rgba(239,68,68,0.12);   color: #ef4444; border: 1px solid rgba(239,68,68,0.25); }

/* Body */
.ex-body { padding: 16px; }
.ex-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: #fff; margin-bottom: 10px;
}
.ex-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.ex-tag {
  display: flex; align-items: center; gap: 5px;
  font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em;
  padding: 4px 10px; border-radius: 999px;
}
.ex-tag.muscle { background: rgba(234,179,8,0.08); color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.1); }
.ex-tag.equip  { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.35); border: 1px solid rgba(255,255,255,0.08); }

.tag-icon {
  display: flex; align-items: center;
  flex-shrink: 0;
}
/* scale down muscle icon inside tag */
.tag-icon :deep(svg) { width: 12px; height: 12px; }

.ex-meta { display: flex; align-items: center; justify-content: space-between; }
.ex-met {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.82rem; font-weight: 700;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.05em;
}
.ex-arrow {
  color: rgba(234,179,8,0.4); display: flex;
  transition: transform 0.2s, color 0.2s;
}
.exercise-card:hover .ex-arrow { transform: translateX(4px); color: #eab308; }

/* ── Empty ── */
.empty-state {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; padding: 60px; text-align: center;
}
.empty-state p { color: rgba(255,255,255,0.2); font-size: 0.9rem; }

@media (max-width: 600px) {
  .exercise-grid { grid-template-columns: 1fr 1fr; }
}
</style>