<template>
  <div class="buku-wrapper">
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>

    <Navbar />

    <main class="main-content">

      <!-- Header -->
      <div class="animate-in" style="animation-delay:0s">
        <h1 class="page-title">Buku Acuan</h1>
        <p class="page-sub">Panduan lengkap gerakan, otot, nutrisi & referensi kalori</p>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-nav animate-in" style="animation-delay:0.05s">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['tab-btn', activeTab === tab.id ? 'active' : '']"
        >
          <span class="tab-icon" v-html="tab.icon"></span>
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content animate-in" style="animation-delay:0.1s">
        <TabCari     v-if="activeTab === 'cari'" />
        <TabGerakan  v-if="activeTab === 'gerakan'" @open-detail="openDetail" />
        <TabOtot     v-if="activeTab === 'otot'" />
        <TabNutrisi  v-if="activeTab === 'nutrisi'" />
        <TabMet      v-if="activeTab === 'met'" />
      </div>

    </main>

    <!-- Modal -->
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

const svgIcon = (path, extra = '') =>
  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${path}</svg>`

export default {
  name: 'BukuAcuan',
  components: { Navbar, TabCari, TabGerakan, TabOtot, TabNutrisi, TabMet, ExerciseModal },

  data() {
    return {
      activeTab: 'cari',
      selectedExercise: null,
      tabs: [
        {
          id: 'cari',
          label: 'Cari & Rangkum',
          // Brain / AI
          icon: svgIcon(`<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>`)
        },
        {
          id: 'gerakan',
          label: 'Panduan Gerakan',
          // Dumbbell
          icon: svgIcon(`<path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4"/>`)
        },
        {
          id: 'otot',
          label: 'Muscle Group',
          // Body silhouette / person
          icon: svgIcon(`<circle cx="12" cy="5" r="2"/><path d="M10 22v-6.5M14 22v-6.5"/><path d="M8 10h8l-1 6H9z"/><path d="M8 10L6 7M16 10l2-3"/>`)
        },
        {
          id: 'nutrisi',
          label: 'Tips Nutrisi',
          // Leaf / salad
          icon: svgIcon(`<path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7c4 0 8 3 8 8"/><path d="M11 20c0-4 2-8 9-8"/><path d="M11 13 4 20"/>`)
        },
        {
          id: 'met',
          label: 'Tabel MET',
          // Bar chart
          icon: svgIcon(`<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`)
        },
      ]
    }
  },

  methods: {
    openDetail(exercise) { this.selectedExercise = exercise },
    closeDetail()        { this.selectedExercise = null }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.buku-wrapper {
  font-family: 'Barlow', sans-serif;
  min-height: 100vh;
  background: #080a0f;
  color: #fff;
  position: relative;
  overflow-x: hidden;
}

.bg-grid {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(234,179,8,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(234,179,8,0.025) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none; z-index: 0;
}
.bg-glow {
  position: fixed; top: -200px; right: -100px;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}

/* Main */
.main-content {
  position: relative; z-index: 1;
  max-width: 1280px; margin: 0 auto;
  padding: 40px 40px 80px;
  display: flex; flex-direction: column; gap: 28px;
}

.page-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.6rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.04em;
}
.page-sub { margin-top: 8px; font-size: 0.9rem; color: rgba(255,255,255,0.35); }

/* Tabs */
.tab-nav {
  display: flex; gap: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.tab-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 20px; background: transparent; border: none;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  color: rgba(255,255,255,0.35);
  font-family: 'Barlow', sans-serif; font-size: 0.82rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.08em;
  cursor: pointer; transition: all 0.2s;
}
.tab-btn:hover { color: rgba(255,255,255,0.7); }
.tab-btn.active { color: #eab308; border-bottom-color: #eab308; }

.tab-icon {
  display: flex; align-items: center;
  opacity: 0.6;
}
.tab-btn.active .tab-icon { opacity: 1; }

.tab-content { min-height: 400px; }

/* Animation */
.animate-in {
  opacity: 0; transform: translateY(16px);
  animation: fadeUp 0.45s ease forwards;
}
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .main-content { padding: 24px 20px 60px; }
  .tab-btn { font-size: 0.72rem; padding: 10px 12px; gap: 6px; }
}
</style>