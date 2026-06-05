<template>
  <div class="buku-wrapper">
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>
    <Navbar />

    <main class="main-content">

      <!-- Page Title -->
      <div class="page-head animate-in">
        <div class="page-head-left">
          <div class="page-tag">
            <span class="page-tag-dot"></span>
            Referensi
          </div>
          <h1 class="page-title">Buku<br><span class="page-title-accent">Acuan</span></h1>
          <p class="page-sub">Panduan workout & nutrisi untuk latihan lebih efektif</p>
        </div>
        <div class="page-stats">
          <div class="ps-item">
            <span class="ps-num">12</span>
            <span class="ps-label">Gerakan</span>
          </div>
          <div class="ps-div"></div>
          <div class="ps-item">
            <span class="ps-num">26</span>
            <span class="ps-label">Data MET</span>
          </div>
          <div class="ps-div"></div>
          <div class="ps-item">
            <span class="ps-num">9</span>
            <span class="ps-label">Otot</span>
          </div>
        </div>
      </div>

      <!-- Tab Bar -->
      <div class="tab-bar animate-in" style="animation-delay:.08s">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', activeTab === tab.id ? 'active' : '']"
          @click="activeTab = tab.id"
          :style="activeTab === tab.id ? { '--tab-accent': tab.color } : {}"
        >
          <span class="tab-icon" v-html="tab.svg"></span>
          <span class="tab-label">{{ tab.label }}</span>
          <span
            class="tab-badge"
            v-if="tab.badge"
            :style="activeTab === tab.id ? { background: tab.color + '18', color: tab.color, borderColor: tab.color + '30' } : {}"
          >{{ tab.badge }}</span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-body animate-in" style="animation-delay:.14s" :key="activeTab">
        <TabCari     v-if="activeTab === 'cari'" />
        <TabGerakan  v-if="activeTab === 'gerakan'" @open-detail="openDetail" />
        <TabOtot     v-if="activeTab === 'otot'" />
        <TabNutrisi  v-if="activeTab === 'nutrisi'" />
        <TabMet      v-if="activeTab === 'met'" />
      </div>

    </main>

    <ExerciseModal :exercise="selectedExercise" @close="closeDetail" />
  </div>
</template>

<script>
import Navbar        from '../components/layout/navbar.vue'
import TabCari       from '../components/buku/TabCari.vue'
import TabGerakan    from '../components/buku/TabGerakan.vue'
import TabOtot       from '../components/buku/TabOtot.vue'
import TabNutrisi    from '../components/buku/TabNutrisi.vue'
import TabMet        from '../components/buku/TabMet.vue'
import ExerciseModal from '../components/buku/ExerciseModal.vue'

const svg = path =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`

export default {
  name: 'BukuAcuan',
  components: { Navbar, TabCari, TabGerakan, TabOtot, TabNutrisi, TabMet, ExerciseModal },

  data() {
    return {
      activeTab: 'cari',
      selectedExercise: null,

      tabs: [
        {
          id   : 'cari',
          label: 'Cari',
          badge: 'AI',
          color: '#eab308',
          svg  : svg(`<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>`)
        },
        {
          id   : 'gerakan',
          label: 'Gerakan',
          badge: '12',
          color: '#60a5fa',
          svg  : svg(`<path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4"/>`)
        },
        {
          id   : 'otot',
          label: 'Otot',
          badge: '9',
          color: '#f43f5e',
          svg  : svg(`<circle cx="12" cy="5" r="2"/><path d="M10 22v-6.5M14 22v-6.5"/><path d="M8 10h8l-1 6H9z"/><path d="M8 10L6 7M16 10l2-3"/>`)
        },
        {
          id   : 'nutrisi',
          label: 'Nutrisi',
          badge: '6',
          color: '#22c55e',
          svg  : svg(`<path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7c4 0 8 3 8 8"/><path d="M11 20c0-4 2-8 9-8"/><path d="M11 13 4 20"/>`)
        },
        {
          id   : 'met',
          label: 'Kalori MET',
          badge: '26',
          color: '#a78bfa',
          svg  : svg(`<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`)
        },
      ]
    }
  },

  methods: {
    openDetail(exercise) { this.selectedExercise = exercise },
    closeDetail()        { this.selectedExercise = null },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.buku-wrapper {
  font-family: 'Barlow', sans-serif;
  min-height: 100vh;
  background: #060810;
  color: #fff;
  position: relative;
  overflow-x: hidden;
}

.bg-grid {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(234,179,8,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(234,179,8,0.018) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none; z-index: 0;
}

.bg-glow {
  position: fixed;
  top: -200px; left: 50%; transform: translateX(-50%);
  width: 800px; height: 500px;
  background: radial-gradient(ellipse at center, rgba(234,179,8,0.04) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}

.main-content {
  position: relative; z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 44px 100px;
  display: flex; flex-direction: column; gap: 32px;
}

/* ── Page Head ──────────────────────── */
.page-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.page-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.62rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.2em;
  color: rgba(234,179,8,0.5);
  margin-bottom: 10px;
}
.page-tag-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #eab308;
  box-shadow: 0 0 6px #eab308;
}

.page-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 3.4rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.03em; line-height: 0.92;
  color: rgba(255,255,255,0.9);
}
.page-title-accent { color: #eab308; }

.page-sub {
  margin-top: 12px;
  font-size: 0.84rem;
  color: rgba(255,255,255,0.28);
  letter-spacing: 0.01em;
}

.page-stats {
  display: flex; align-items: stretch; gap: 0;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  overflow: hidden;
  flex-shrink: 0;
}
.ps-item {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px;
  padding: 20px 28px;
  transition: background 0.2s;
}
.ps-item:hover { background: rgba(234,179,8,0.04); }
.ps-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem; font-weight: 900; color: #eab308; line-height: 1;
}
.ps-label {
  font-size: 0.6rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.14em;
  color: rgba(255,255,255,0.25);
}
.ps-div { width: 1px; background: rgba(255,255,255,0.06); }

/* ── Tab Bar ────────────────────────── */
.tab-bar {
  display: flex;
  gap: 4px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 5px;
  overflow-x: auto;
}
.tab-bar::-webkit-scrollbar { display: none; }

.tab-btn {
  display: flex; align-items: center; gap: 9px;
  padding: 11px 20px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 13px;
  cursor: pointer;
  transition: all 0.22s ease;
  white-space: nowrap;
  color: rgba(255,255,255,0.28);
  position: relative;
}
.tab-btn:hover {
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.65);
}
.tab-btn.active {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.1);
  color: #fff;
}
.tab-btn.active .tab-icon { color: var(--tab-accent, #eab308); }

.tab-icon {
  display: flex; align-items: center;
  transition: color 0.2s;
  flex-shrink: 0;
}

.tab-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.86rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.1em;
}

.tab-badge {
  font-size: 0.6rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 2px 7px; border-radius: 5px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.22);
  transition: all 0.22s;
}

/* ── Tab Body ───────────────────────── */
.tab-body { min-height: 400px; }

/* ── Animations ─────────────────────── */
.animate-in {
  opacity: 0; transform: translateY(14px);
  animation: fadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

/* ── Responsive ─────────────────────── */
@media (max-width: 768px) {
  .main-content { padding: 28px 18px 80px; gap: 24px; }
  .page-head { flex-direction: column; align-items: flex-start; gap: 20px; }
  .page-title { font-size: 2.6rem; }
  .page-stats { width: 100%; }
  .ps-item { padding: 16px 0; flex: 1; }
  .tab-btn { padding: 10px 14px; }
  .tab-badge { display: none; }
}
@media (max-width: 480px) {
  .tab-label { font-size: 0.76rem; }
}
</style>