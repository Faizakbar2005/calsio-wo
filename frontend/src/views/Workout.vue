<template>
  <div class="workout-wrapper">

    <div class="bg-grid"></div>
    <div class="bg-glow"></div>

    <Navbar />

    <main class="main-content">

      <!-- Header -->
      <div class="page-header animate-in" style="animation-delay:0s">
        <div>
          <h1 class="page-title">Workout Session</h1>
          <p class="page-sub">Isi detail latihan kamu, kami prediksi kalori yang terbakar</p>
        </div>
      </div>

      <div class="content-grid animate-in" style="animation-delay:0.1s">

        <!-- LEFT: Form Panel -->
        <div class="form-panel">
          <div class="card">
            <div class="card-top-bar"></div>

            <!-- Muscle Group Picker -->
            <div class="section-label">Pilih Muscle Group</div>
            <div class="muscle-grid">
              <button
                v-for="m in muscleGroups"
                :key="m.name"
                @click="muscle = m.name"
                :class="['muscle-btn', muscle === m.name ? 'active' : '']"
              >
                <span class="muscle-icon" v-html="m.icon"></span>
                <span class="muscle-name">{{ m.name }}</span>
              </button>
            </div>

            <div class="form-divider"></div>

            <!-- Set / Rep / Rest / Duration -->
            <div class="section-label">Detail Latihan</div>
            <div class="inputs-grid">

              <div class="input-group">
                <label>
                  <span class="label-icon">
                    <!-- Repeat icon -->
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                  </span> Set
                </label>
                <div class="number-input">
                  <button @click="sets = Math.max(1, sets - 1)" class="num-btn">−</button>
                  <span class="num-val">{{ sets }}</span>
                  <button @click="sets++" class="num-btn">+</button>
                </div>
              </div>

              <div class="input-group">
                <label>
                  <span class="label-icon">
                    <!-- Dumbbell icon -->
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4"/></svg>
                  </span> Repetisi
                </label>
                <div class="number-input">
                  <button @click="reps = Math.max(1, reps - 1)" class="num-btn">−</button>
                  <span class="num-val">{{ reps }}</span>
                  <button @click="reps++" class="num-btn">+</button>
                </div>
              </div>

              <div class="input-group">
                <label>
                  <span class="label-icon">
                    <!-- Pause icon -->
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  </span> Rest (menit)
                </label>
                <div class="number-input">
                  <button @click="rest = Math.max(0.5, rest - 0.5)" class="num-btn">−</button>
                  <span class="num-val">{{ rest }}</span>
                  <button @click="rest += 0.5" class="num-btn">+</button>
                </div>
              </div>

              <div class="input-group">
                <label>
                  <span class="label-icon">
                    <!-- Timer icon -->
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 3h6"/><path d="M12 3v2"/></svg>
                  </span> Durasi (menit)
                </label>
                <div class="number-input">
                  <button @click="duration = Math.max(5, duration - 5)" class="num-btn">−</button>
                  <span class="num-val">{{ duration }}</span>
                  <button @click="duration += 5" class="num-btn">+</button>
                </div>
              </div>

            </div>

            <!-- Intensity -->
            <div class="form-divider"></div>
            <div class="section-label">Intensitas</div>
            <div class="intensity-row">
              <button
                v-for="lvl in intensityLevels"
                :key="lvl.value"
                @click="intensity = lvl.value"
                :class="['intensity-btn', intensity === lvl.value ? 'active' : '']"
                :style="intensity === lvl.value ? `--accent: ${lvl.color}` : ''"
              >
                <span class="intensity-dot" :style="{ background: lvl.color }"></span>
                {{ lvl.label }}
              </button>
            </div>

            <!-- Submit -->
            <button
              @click="startWorkout"
              :disabled="loading || !muscle"
              class="btn-submit"
            >
              <span v-if="!loading" class="btn-submit-inner">
                <!-- Brain/AI icon -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
                Prediksi Kalori
              </span>
              <span v-else class="loading-text">
                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
              </span>
            </button>

            <p v-if="!muscle" class="hint-text">Pilih muscle group terlebih dahulu</p>

          </div>
        </div>

        <!-- RIGHT: Result + Illustration Panel -->
        <div class="result-panel">

          <!-- Muscle Illustration Card -->
          <div class="card illustration-card">
            <div class="card-top-bar"></div>
            <div class="illus-wrap">
              <div class="illus-figure" :class="muscle ? 'has-muscle' : ''">

                <!-- SVG Body Silhouette -->
                <svg class="body-svg" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="40" r="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
                  <rect x="90" y="65" width="20" height="20" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
                  <rect x="55" y="82" width="90" height="110" rx="12"
                    :fill="isActive('Dada') || isActive('Perut') ? 'rgba(234,179,8,0.18)' : 'rgba(255,255,255,0.05)'"
                    :stroke="isActive('Dada') || isActive('Perut') ? '#eab308' : 'rgba(255,255,255,0.1)'"
                    stroke-width="1.5"/>
                  <line x1="100" y1="88" x2="100" y2="185" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
                  <rect x="22" y="85" width="30" height="75" rx="12"
                    :fill="isActive('Bisep') || isActive('Trisep') || isActive('Deltoid') ? 'rgba(234,179,8,0.18)' : 'rgba(255,255,255,0.05)'"
                    :stroke="isActive('Bisep') || isActive('Trisep') || isActive('Deltoid') ? '#eab308' : 'rgba(255,255,255,0.1)'"
                    stroke-width="1.5"/>
                  <rect x="148" y="85" width="30" height="75" rx="12"
                    :fill="isActive('Bisep') || isActive('Trisep') || isActive('Deltoid') ? 'rgba(234,179,8,0.18)' : 'rgba(255,255,255,0.05)'"
                    :stroke="isActive('Bisep') || isActive('Trisep') || isActive('Deltoid') ? '#eab308' : 'rgba(255,255,255,0.1)'"
                    stroke-width="1.5"/>
                  <rect x="18" y="163" width="26" height="65" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                  <rect x="156" y="163" width="26" height="65" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                  <rect x="58" y="85" width="84" height="100" rx="10"
                    :fill="isActive('Punggung') ? 'rgba(234,179,8,0.12)' : 'transparent'"
                    :stroke="isActive('Punggung') ? 'rgba(234,179,8,0.6)' : 'none'"
                    stroke-width="1" stroke-dasharray="4 3"/>
                  <rect x="58" y="195" width="38" height="95" rx="14"
                    :fill="isActive('Kaki') || isActive('Bokong') ? 'rgba(234,179,8,0.18)' : 'rgba(255,255,255,0.05)'"
                    :stroke="isActive('Kaki') || isActive('Bokong') ? '#eab308' : 'rgba(255,255,255,0.1)'"
                    stroke-width="1.5"/>
                  <rect x="104" y="195" width="38" height="95" rx="14"
                    :fill="isActive('Kaki') || isActive('Bokong') ? 'rgba(234,179,8,0.18)' : 'rgba(255,255,255,0.05)'"
                    :stroke="isActive('Kaki') || isActive('Bokong') ? '#eab308' : 'rgba(255,255,255,0.1)'"
                    stroke-width="1.5"/>
                  <rect x="60" y="293" width="34" height="80" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                  <rect x="106" y="293" width="34" height="80" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                  <ellipse v-if="isActive('Kardio')" cx="100" cy="140" rx="60" ry="80"
                    fill="rgba(234,179,8,0.06)" stroke="#eab308" stroke-width="1.5"
                    stroke-dasharray="6 4" class="pulse-ring"/>
                </svg>

                <!-- Muscle label -->
                <div v-if="muscle" class="muscle-label-overlay">
                  <span class="muscle-label-icon" v-html="activeMuscle?.icon"></span>
                  <span class="muscle-label-text">{{ muscle }}</span>
                </div>

              </div>
            </div>

            <div class="illus-stats" v-if="muscle">
              <div class="illus-stat">
                <span class="is-val">{{ sets }}</span>
                <span class="is-lbl">Set</span>
              </div>
              <div class="is-divider"></div>
              <div class="illus-stat">
                <span class="is-val">{{ reps }}</span>
                <span class="is-lbl">Rep</span>
              </div>
              <div class="is-divider"></div>
              <div class="illus-stat">
                <span class="is-val">{{ duration }}'</span>
                <span class="is-lbl">Durasi</span>
              </div>
              <div class="is-divider"></div>
              <div class="illus-stat">
                <span class="is-val">{{ rest }}'</span>
                <span class="is-lbl">Rest</span>
              </div>
            </div>
            <div v-else class="illus-hint">← Pilih muscle group untuk mulai</div>
          </div>

          <!-- Result Card -->
          <div class="card result-card">
            <div class="card-top-bar"></div>

            <div v-if="calories === null && !loading" class="result-empty">
              <div class="result-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>
              </div>
              <p>Hasil prediksi ML</p>
              <p class="result-empty-sub">akan muncul di sini setelah kamu isi form dan klik prediksi</p>
            </div>

            <div v-else-if="loading" class="result-loading">
              <div class="spinner"></div>
              <p>Model sedang menghitung...</p>
            </div>

            <div v-else class="result-content">
              <div class="result-header">
                <span class="result-label">Prediksi Kalori Terbakar</span>
                <span class="result-badge">ML Model</span>
              </div>

              <div class="result-number">
                <span class="result-kcal">{{ calories }}</span>
                <span class="result-unit">kcal</span>
              </div>

              <div class="result-breakdown">
                <div class="rb-item">
                  <span class="rb-label">Muscle</span>
                  <span class="rb-val">{{ muscle }}</span>
                </div>
                <div class="rb-item">
                  <span class="rb-label">Intensitas</span>
                  <span class="rb-val" :style="{ color: activeIntensity?.color }">{{ activeIntensity?.label }}</span>
                </div>
                <div class="rb-item">
                  <span class="rb-label">Total Set</span>
                  <span class="rb-val">{{ sets }} × {{ reps }} rep</span>
                </div>
              </div>

              <div class="result-actions">
                <button @click="saveSession" :disabled="saved" class="btn-save">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                  {{ saved ? 'Tersimpan!' : 'Simpan ke Riwayat' }}
                </button>
                <button @click="resetForm" class="btn-reset">Reset</button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </main>
  </div>
</template>

<script>
import axios from "axios"
import Navbar from "../components/layout/navbar.vue"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
const ML_URL  = import.meta.env.VITE_ML_URL  || "http://localhost:8000"

// SVG icons sebagai string untuk v-html
const icons = {
  // Dada: dua lengkungan pectoral kiri & kanan
  chest: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6 Q6 3 12 5 Q18 3 21 6 L21 14 Q18 18 12 16 Q6 18 3 14 Z"/>
    <line x1="12" y1="5" x2="12" y2="16"/>
  </svg>`,

  // Punggung: tulang belakang + garis trapezius melebar ke bahu
  back: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="3" x2="12" y2="21"/>
    <path d="M4 6 Q8 5 12 6 Q16 5 20 6"/>
    <path d="M5 12 Q8 10 12 11 Q16 10 19 12"/>
    <path d="M6 18 Q9 16 12 17 Q15 16 18 18"/>
  </svg>`,

  // Kaki: siluet paha + lutut + betis
  leg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 2 L8 12 Q8 14 9 15 L8 22"/>
    <path d="M15 2 L16 12 Q16 14 15 15 L16 22"/>
    <path d="M9 2 Q12 1 15 2"/>
    <path d="M9 15 Q12 16 15 15"/>
  </svg>`,

  // Bokong: dua kurva glute
  glute: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 8 Q5 2 12 4 Q19 2 21 8 Q21 16 12 20 Q3 16 3 8Z"/>
    <path d="M12 4 Q12 12 12 20"/>
  </svg>`,

  // Deltoid: kubah bahu kiri-kanan dan tengah
  shoulder: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 14 Q4 6 9 8 Q12 9 12 12"/>
    <path d="M22 14 Q20 6 15 8 Q12 9 12 12"/>
    <path d="M9 8 Q12 4 15 8"/>
  </svg>`,

  // Bisep: lengan fleksi memperlihatkan puncak otot
  bicep: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 20 L7 14 Q7 8 10 6 Q14 4 16 8 Q18 12 14 14 L8 16"/>
    <path d="M6 20 Q7 22 10 21 L14 14"/>
  </svg>`,

  // Trisep: bagian belakang lengan atas (3 kepala)
  tricep: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 4 Q12 2 16 4 L17 12 Q17 16 12 18 Q7 16 7 12 Z"/>
    <line x1="10" y1="4" x2="9" y2="18"/>
    <line x1="14" y1="4" x2="15" y2="18"/>
  </svg>`,

  // Perut: 6 kotak six-pack
  abs: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="6"  y="3"  width="5" height="4" rx="1"/>
    <rect x="13" y="3"  width="5" height="4" rx="1"/>
    <rect x="6"  y="10" width="5" height="4" rx="1"/>
    <rect x="13" y="10" width="5" height="4" rx="1"/>
    <rect x="6"  y="17" width="5" height="4" rx="1"/>
    <rect x="13" y="17" width="5" height="4" rx="1"/>
  </svg>`,

  // Kardio: detak jantung / EKG
  cardio: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    <polyline points="2 13 6 13 8 9 11 17 13 13 15 15 17 13 22 13" stroke-width="1.5"/>
  </svg>`,
}

export default {
  components: { Navbar },

  data() {
    return {
      muscle: "",
      sets: 3,
      reps: 12,
      rest: 1,
      duration: 30,
      intensity: "medium",
      calories: null,
      loading: false,
      saved: false,

      muscleGroups: [
        { name: "Dada",     icon: icons.chest    },
        { name: "Punggung", icon: icons.back     },
        { name: "Kaki",     icon: icons.leg      },
        { name: "Bokong",   icon: icons.glute    },
        { name: "Deltoid",  icon: icons.shoulder },
        { name: "Bisep",    icon: icons.bicep    },
        { name: "Trisep",   icon: icons.tricep   },
        { name: "Perut",    icon: icons.abs      },
        { name: "Kardio",   icon: icons.cardio   },
      ],

      intensityLevels: [
        { value: "low",    label: "Ringan", color: "#22c55e" },
        { value: "medium", label: "Sedang", color: "#eab308" },
        { value: "high",   label: "Berat",  color: "#ef4444" },
      ]
    }
  },

  computed: {
    activeMuscle() {
      return this.muscleGroups.find(m => m.name === this.muscle)
    },
    activeIntensity() {
      return this.intensityLevels.find(l => l.value === this.intensity)
    }
  },

  methods: {
    isActive(name) {
      return this.muscle === name
    },

    async startWorkout() {
      if (!this.muscle) return
      this.loading = true
      this.calories = null
      this.saved = false

      try {
        const userId = localStorage.getItem("calsio_user_id")
        let weight = 70
        if (userId) {
          try {
            const userRes = await axios.get(`${API_URL}/api/users/${userId}`)
            weight = userRes.data.weight || 70
          } catch { /* pakai default */ }
        }
        const response = await axios.post(`${ML_URL}/predict`, {
          weight, duration: this.duration, intensity: this.intensity,
          muscle_group: this.muscle, sets: this.sets, reps: this.reps
        })
        this.calories = response.data.predicted_calories
      } catch (error) {
        const metMap = { low: 3.5, medium: 6, high: 9 }
        const met = metMap[this.intensity] || 6
        this.calories = Math.round(met * 70 * (this.duration / 60))
      } finally {
        this.loading = false
      }
    },

    async saveSession() {
      try {
        await axios.post(`${API_URL}/api/history`, {
          calories: this.calories,
          duration: this.duration
        })
        this.saved = true
      } catch (err) {
        console.error("Gagal simpan:", err.message)
      }
    },

    resetForm() {
      this.muscle = ""
      this.sets = 3; this.reps = 12; this.rest = 1; this.duration = 30
      this.intensity = "medium"; this.calories = null; this.saved = false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.workout-wrapper {
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
    linear-gradient(rgba(234,179,8,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(234,179,8,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none; z-index: 0;
}
.bg-glow {
  position: fixed; bottom: -200px; left: -100px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}

/* ── Main ── */
.main-content {
  position: relative; z-index: 1;
  max-width: 1280px; margin: 0 auto;
  padding: 40px 40px 60px;
  display: flex; flex-direction: column; gap: 32px;
}

.page-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.6rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.04em; line-height: 1;
}
.page-sub { margin-top: 8px; font-size: 0.9rem; color: rgba(255,255,255,0.35); }

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
}

.card {
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 28px;
  position: relative;
  overflow: hidden;
}
.card-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent);
}

/* ── Form ── */
.section-label {
  font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.3);
  margin-bottom: 14px;
}
.form-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 22px 0; }

/* Muscle Grid */
.muscle-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.muscle-btn {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 6px;
  padding: 14px 8px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgba(255,255,255,0.35);
}
.muscle-btn:hover {
  border-color: rgba(234,179,8,0.3);
  background: rgba(234,179,8,0.04);
  color: rgba(255,255,255,0.7);
}
.muscle-btn.active {
  background: rgba(234,179,8,0.12);
  border-color: #eab308;
  color: #eab308;
}
.muscle-icon { display: flex; align-items: center; justify-content: center; }
.muscle-name {
  font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em;
}

/* Number inputs */
.inputs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.input-group { display: flex; flex-direction: column; gap: 8px; }
.input-group label {
  font-size: 0.7rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.35);
  display: flex; align-items: center; gap: 6px;
}
.label-icon { display: flex; align-items: center; color: rgba(255,255,255,0.3); }

.number-input {
  display: flex; align-items: center;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; overflow: hidden;
}
.num-btn {
  width: 38px; height: 44px;
  background: transparent; border: none;
  color: rgba(255,255,255,0.5);
  font-size: 1.2rem; cursor: pointer;
  transition: all 0.15s;
}
.num-btn:hover { background: rgba(234,179,8,0.1); color: #eab308; }
.num-val {
  flex: 1; text-align: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.3rem; font-weight: 700; color: #fff;
}

/* Intensity */
.intensity-row { display: flex; gap: 8px; }
.intensity-btn {
  flex: 1; padding: 11px 8px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  font-family: 'Barlow', sans-serif;
  font-size: 0.82rem; font-weight: 600;
  color: rgba(255,255,255,0.4);
  cursor: pointer; transition: all 0.2s;
}
.intensity-btn:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }
.intensity-btn.active {
  background: rgba(0,0,0,0.2);
  border-color: var(--accent, #eab308);
  color: var(--accent, #eab308);
}
.intensity-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Submit */
.btn-submit {
  margin-top: 22px; width: 100%; padding: 16px;
  background: #eab308; border: none; border-radius: 12px;
  color: #000;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 900;
  letter-spacing: 0.08em; text-transform: uppercase;
  cursor: pointer; transition: all 0.2s;
  position: relative; overflow: hidden;
}
.btn-submit::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
}
.btn-submit-inner { display: flex; align-items: center; justify-content: center; gap: 10px; }
.btn-submit:hover:not(:disabled) { background: #facc15; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(234,179,8,0.4); }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.hint-text { text-align: center; margin-top: 10px; font-size: 0.75rem; color: rgba(255,255,255,0.2); }

.loading-text { display: flex; align-items: center; justify-content: center; gap: 6px; }
.dot { width: 8px; height: 8px; background: #000; border-radius: 50%; animation: bounce 1s infinite; }
.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }

/* ── Result Panel ── */
.result-panel { display: flex; flex-direction: column; gap: 20px; }

.illustration-card { padding: 24px; }
.illus-wrap { display: flex; justify-content: center; padding: 16px 0; }
.illus-figure { position: relative; display: flex; justify-content: center; transition: all 0.3s; }
.body-svg { width: 140px; height: auto; filter: drop-shadow(0 0 20px rgba(234,179,8,0.1)); }
.illus-figure.has-muscle .body-svg { filter: drop-shadow(0 0 30px rgba(234,179,8,0.25)); }

@keyframes pulse-stroke { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
.pulse-ring { animation: pulse-stroke 2s ease-in-out infinite; }

.muscle-label-overlay {
  position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 8px;
  background: rgba(234,179,8,0.15); border: 1px solid rgba(234,179,8,0.4);
  border-radius: 999px; padding: 5px 14px; white-space: nowrap;
  color: #eab308;
}
.muscle-label-icon { display: flex; align-items: center; }
.muscle-label-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.8rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em; color: #eab308;
}

.illus-stats {
  display: flex; align-items: center; justify-content: center;
  margin-top: 28px; padding: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
}
.illus-stat { flex: 1; text-align: center; display: flex; flex-direction: column; gap: 2px; }
.is-val { font-family: 'Barlow Condensed', sans-serif; font-size: 1.4rem; font-weight: 900; color: #eab308; }
.is-lbl { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.3); }
.is-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.08); }
.illus-hint { text-align: center; margin-top: 16px; font-size: 0.8rem; color: rgba(255,255,255,0.2); }

.result-empty, .result-loading {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; min-height: 200px; text-align: center;
}
.result-empty-icon { opacity: 0.4; }
.result-empty p { color: rgba(255,255,255,0.35); font-size: 0.9rem; }
.result-empty-sub { font-size: 0.75rem !important; color: rgba(255,255,255,0.2) !important; }

.spinner { width: 40px; height: 40px; border: 3px solid rgba(234,179,8,0.15); border-top-color: #eab308; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.result-loading p { color: rgba(255,255,255,0.4); font-size: 0.85rem; }

.result-content { display: flex; flex-direction: column; gap: 20px; }
.result-header { display: flex; align-items: center; justify-content: space-between; }
.result-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); }
.result-badge { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #eab308; background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.25); padding: 3px 10px; border-radius: 999px; }
.result-number { display: flex; align-items: baseline; gap: 8px; }
.result-kcal { font-family: 'Barlow Condensed', sans-serif; font-size: 4rem; font-weight: 900; color: #eab308; line-height: 1; }
.result-unit { font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; }

.result-breakdown { display: flex; flex-direction: column; gap: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 16px; }
.rb-item { display: flex; justify-content: space-between; align-items: center; }
.rb-label { font-size: 0.75rem; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em; }
.rb-val { font-family: 'Barlow Condensed', sans-serif; font-size: 0.95rem; font-weight: 700; color: #fff; }

.result-actions { display: flex; gap: 10px; }
.btn-save {
  flex: 1; padding: 13px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: rgba(234,179,8,0.12); border: 1px solid rgba(234,179,8,0.4);
  border-radius: 10px; color: #eab308;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em;
  cursor: pointer; transition: all 0.2s;
}
.btn-save:hover:not(:disabled) { background: rgba(234,179,8,0.2); box-shadow: 0 0 20px rgba(234,179,8,0.15); }
.btn-save:disabled { opacity: 0.7; cursor: default; }
.btn-reset {
  padding: 13px 20px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; color: rgba(255,255,255,0.4);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em;
  cursor: pointer; transition: all 0.2s;
}
.btn-reset:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }

.animate-in { opacity: 0; transform: translateY(16px); animation: fadeUp 0.5s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 960px) {
  .content-grid { grid-template-columns: 1fr; }
  .main-content { padding: 24px 20px 48px; }
}
</style>