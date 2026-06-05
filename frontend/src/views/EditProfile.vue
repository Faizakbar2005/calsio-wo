<template>
  <div class="edit-wrapper">
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>
    <Navbar />

    <main class="main-content">
      <div class="page-header animate-in">
        <h1 class="page-title">Profil Pengguna</h1>
        <p class="page-sub">Lengkapi data diri agar prediksi kalori lebih akurat</p>
      </div>

      <div class="profile-grid animate-in" style="animation-delay:0.1s">

        <!-- FORM -->
        <div class="card form-card">
          <div class="card-top-bar"></div>

          <!-- Avatar -->
          <div class="avatar-row">
            <div class="avatar">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <div>
              <div class="avatar-name">{{ savedUser?.name || (form.gender === 'Male' ? '♂ Pria' : '♀ Wanita') }}</div>
              <div class="avatar-bmi" v-if="bmiLive.value">
                BMI {{ bmiLive.value }} —
                <span :style="{ color: bmiLive.color }">{{ bmiLive.category }}</span>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <!-- Nama -->
          <div class="section-label">Nama</div>
          <div class="field-group full-width">
            <div class="field-wrap" :class="{ focused: focusedField === 'name' }">
              <input v-model="form.name" type="text" placeholder="Nama lengkap" class="field-input" @focus="focusedField = 'name'" @blur="focusedField = ''"/>
            </div>
          </div>

          <div class="divider"></div>

          <!-- Gender -->
          <div class="section-label">Jenis Kelamin</div>
          <div class="gender-row">
            <button v-for="g in genderOptions" :key="g.value" @click="form.gender = g.value" :class="['gender-btn', form.gender === g.value ? 'active' : '']">
              {{ g.label }}
            </button>
          </div>

          <div class="divider"></div>

          <!-- Data Fisik -->
          <div class="section-label">Data Fisik</div>
          <div class="fields-grid">
            <div class="field-group">
              <label>Umur</label>
              <div class="field-wrap" :class="{ focused: focusedField === 'age' }">
                <input v-model.number="form.age" type="number" min="10" max="99" placeholder="25" class="field-input" @focus="focusedField = 'age'" @blur="focusedField = ''"/>
                <span class="field-unit">thn</span>
              </div>
            </div>
            <div class="field-group">
              <label>Berat Badan</label>
              <div class="field-wrap" :class="{ focused: focusedField === 'weight' }">
                <input v-model.number="form.weight" type="number" min="30" max="200" step="0.1" placeholder="70" class="field-input" @focus="focusedField = 'weight'" @blur="focusedField = ''"/>
                <span class="field-unit">kg</span>
              </div>
            </div>
            <div class="field-group">
              <label>Tinggi Badan</label>
              <div class="field-wrap" :class="{ focused: focusedField === 'height' }">
                <input v-model.number="form.height" type="number" min="100" max="250" placeholder="170" class="field-input" @focus="focusedField = 'height'" @blur="focusedField = ''"/>
                <span class="field-unit">cm</span>
              </div>
            </div>
          </div>

          <!-- BMI Bar -->
          <div class="bmi-bar-card" v-if="bmiLive.value">
            <div class="bmi-bar-track">
              <div class="bmi-bar-fill" :style="{ width: bmiLive.percent + '%', background: bmiLive.color }"></div>
              <div class="bmi-bar-dot"  :style="{ left: bmiLive.percent + '%' }"></div>
            </div>
            <div class="bmi-bar-labels">
              <span :style="{ color: bmiLive.color }">{{ bmiLive.category }}</span>
            </div>
            <div class="bmi-number" :style="{ color: bmiLive.color }">{{ bmiLive.value }}</div>
          </div>

          <div class="divider"></div>

          <!-- Experience Level ← BARU -->
          <div class="section-label">
            Level Pengalaman
            <span class="section-hint">— dipakai model ML untuk prediksi kalori</span>
          </div>
          <div class="exp-toggle">
            <button
              v-for="lvl in experienceLevels" :key="lvl.value"
              @click="form.experienceLevel = lvl.value"
              :class="['exp-btn', form.experienceLevel === lvl.value ? 'active' : '']"
              :style="form.experienceLevel === lvl.value ? { '--acc': lvl.color } : {}"
            >
              <span class="exp-icon">{{ lvl.emoji }}</span>
              <div class="exp-info">
                <span class="exp-title">{{ lvl.label }}</span>
                <span class="exp-desc">{{ lvl.desc }}</span>
              </div>
              <div v-if="form.experienceLevel === lvl.value" class="exp-check" :style="{ background: lvl.color }">✓</div>
            </button>
          </div>

          <div class="divider"></div>

          <!-- Workout Frequency ← BARU -->
          <div class="section-label">Frekuensi Latihan per Minggu</div>
          <div class="freq-row">
            <button
              v-for="f in [2,3,4,5]" :key="f"
              @click="form.workoutFrequency = f"
              :class="['freq-btn', form.workoutFrequency === f ? 'active' : '']"
            >{{ f }}x</button>
          </div>

          <div class="divider"></div>

          <!-- Submit -->
          <button @click="saveProfile" :disabled="saving || !isValid" class="btn-save">
            <span v-if="!saving" class="btn-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
              </svg>
              {{ isEditMode ? 'Simpan Perubahan' : 'Simpan Profil' }}
            </span>
            <span v-else class="loading-dots">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </span>
          </button>

          <p v-if="successMsg" class="msg-success">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ successMsg }}
          </p>
          <p v-if="errorMsg" class="msg-error">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ errorMsg }}
          </p>
        </div>

        <!-- KANAN -->
        <div class="right-col">

          <!-- Ringkasan -->
          <div class="card">
            <div class="card-top-bar"></div>
            <div class="section-label">Ringkasan Profil</div>
            <div v-if="savedUser" class="summary-grid">
              <div class="summary-item">
                <span class="si-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>
                <span class="si-val">{{ savedUser.age || '—' }}</span>
                <span class="si-lbl">Tahun</span>
              </div>
              <div class="summary-item">
                <span class="si-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M12 8v8"/><path d="M8 14l4 4 4-4"/><line x1="6" y1="20" x2="18" y2="20"/></svg></span>
                <span class="si-val">{{ savedUser.weight }}</span>
                <span class="si-lbl">kg</span>
              </div>
              <div class="summary-item">
                <span class="si-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
                <span class="si-val">{{ savedUser.height }}</span>
                <span class="si-lbl">cm</span>
              </div>
              <div class="summary-item">
                <span class="si-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8M12 8v8"/></svg></span>
                <span class="si-val" :style="{ color: bmiLive.color }">{{ savedBmi }}</span>
                <span class="si-lbl">BMI</span>
              </div>
              <div class="summary-item">
                <span class="si-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
                <span class="si-val">{{ savedUser.daily_target_calories }}</span>
                <span class="si-lbl">kcal/hari</span>
              </div>
              <div class="summary-item">
                <span class="si-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span>
                <span class="si-val">{{ estimatedMaxBpm }}</span>
                <span class="si-lbl">Max BPM</span>
              </div>
            </div>
            <div v-else class="empty-state"><p>Belum ada profil tersimpan</p></div>
          </div>

          <!-- Level badge card ← BARU -->
          <div class="card" v-if="form.experienceLevel">
            <div class="card-top-bar"></div>
            <div class="section-label">Level Saat Ini</div>
            <div class="level-display">
              <span class="level-emoji">{{ currentLevelData.emoji }}</span>
              <div class="level-info">
                <span class="level-name" :style="{ color: currentLevelData.color }">{{ currentLevelData.label }}</span>
                <span class="level-desc">{{ currentLevelData.desc }}</span>
              </div>
              <div class="level-freq">
                <span class="lf-val">{{ form.workoutFrequency }}x</span>
                <span class="lf-lbl">/ minggu</span>
              </div>
            </div>
            <div class="level-impact">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Experience Level berkontribusi <strong>~13.9%</strong> terhadap prediksi kalori model GBR
            </div>
          </div>

          <!-- Info ML -->
          <div class="card">
            <div class="card-top-bar"></div>
            <div class="section-label">Data untuk Model ML</div>
            <div class="ml-list">
              <div class="ml-row" v-if="savedUser?.name">
                <span class="ml-key-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> Nama</span>
                <span class="ml-val">{{ savedUser.name }}</span>
              </div>
              <div class="ml-row">
                <span class="ml-key-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Umur</span>
                <span class="ml-val">{{ form.age || '—' }} thn</span>
              </div>
              <div class="ml-row">
                <span class="ml-key-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M12 8v8"/><path d="M8 14l4 4 4-4"/><line x1="6" y1="20" x2="18" y2="20"/></svg> Berat</span>
                <span class="ml-val">{{ form.weight || '—' }} kg</span>
              </div>
              <div class="ml-row">
                <span class="ml-key-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Tinggi</span>
                <span class="ml-val">{{ form.height || '—' }} cm</span>
              </div>
              <div class="ml-row">
                <span class="ml-key-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> Gender</span>
                <span class="ml-val">{{ form.gender }}</span>
              </div>
              <div class="ml-row">
                <span class="ml-key-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8M12 8v8"/></svg> BMI</span>
                <span class="ml-val">{{ bmiLive.value || '—' }}</span>
              </div>
              <div class="ml-row">
                <span class="ml-key-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Max BPM</span>
                <span class="ml-val">{{ estimatedMaxBpm }}</span>
              </div>
              <div class="ml-row">
                <span class="ml-key-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Experience</span>
                <span class="ml-val" :style="{ color: currentLevelData?.color }">{{ currentLevelData?.label || '—' }}</span>
              </div>
              <div class="ml-row">
                <span class="ml-key-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Frekuensi</span>
                <span class="ml-val">{{ form.workoutFrequency }}x / minggu</span>
              </div>
            </div>
          </div>

          <!-- Rekomendasi Workout -->
          <div class="card" v-if="recommended.length">
            <div class="card-top-bar"></div>
            <div class="section-label">Rekomendasi Workout</div>
            <div class="rec-list">
              <div v-for="r in recommended" :key="r" class="rec-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                {{ r }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/layout/navbar.vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default {
  components: { Navbar },

  data() {
    return {
      form: {
        name            : '',
        age             : null,
        weight          : null,
        height          : null,
        gender          : 'Male',
        experienceLevel : null,
        workoutFrequency: 3,
      },
      originalForm    : null,
      savedUser       : null,
      recommended     : [],
      saving          : false,
      successMsg      : '',
      errorMsg        : '',
      isEditMode      : false,
      isFirstTimeSetup: false,
      focusedField    : '',

      genderOptions: [
        { value: 'Male',   label: '♂ Pria'   },
        { value: 'Female', label: '♀ Wanita' },
      ],

      experienceLevels: [
        { value: 1, label: 'Pemula',        emoji: '🌱', color: '#22c55e', desc: 'Baru mulai latihan / < 6 bulan' },
        { value: 2, label: 'Menengah',      emoji: '💪', color: '#eab308', desc: 'Sudah rutin 6 bulan – 2 tahun' },
        { value: 3, label: 'Berpengalaman', emoji: '🏆', color: '#ef4444', desc: 'Latihan intensif > 2 tahun' },
      ],
    }
  },

  computed: {
    hasChanges() {
      if (!this.originalForm) return true
      return JSON.stringify(this.form) !== JSON.stringify(this.originalForm)
    },
    isValid() {
      return this.form.weight > 0 && this.form.height > 0
          && this.form.age    > 0 && this.form.gender
          && this.form.experienceLevel && this.hasChanges
    },
    bmiLive() {
      if (!this.form.weight || !this.form.height) return { value: null }
      const h   = this.form.height / 100
      const bmi = parseFloat((this.form.weight / (h * h)).toFixed(1))
      let category, color, percent
      if (bmi < 18.5)    { category = 'Kekurangan Berat'; color = '#60a5fa'; percent = Math.min((bmi / 18.5) * 25, 24) }
      else if (bmi < 25) { category = 'Normal';            color = '#22c55e'; percent = 25 + ((bmi - 18.5) / 6.5) * 25 }
      else if (bmi < 30) { category = 'Kelebihan Berat';   color = '#eab308'; percent = 50 + ((bmi - 25) / 5) * 25 }
      else               { category = 'Obesitas';          color = '#ef4444'; percent = Math.min(75 + ((bmi - 30) / 10) * 25, 98) }
      return { value: bmi, category, color, percent }
    },
    estimatedMaxBpm()  { return this.form.age ? 220 - this.form.age : '—' },
    savedBmi()         { return this.savedUser?.bmi ? parseFloat(this.savedUser.bmi).toFixed(1) : '—' },
    currentLevelData() { return this.experienceLevels.find(l => l.value === this.form.experienceLevel) || null },
  },

  async mounted() {
    const token = localStorage.getItem('calsio_token')
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await this.loadUser()
  },

  methods: {
    async loadUser() {
      try {
        const res      = await axios.get(`${API_URL}/api/users`)
        this.savedUser = res.data
        this.isEditMode = true

        this.form.name             = res.data.name             || ''
        this.form.age              = res.data.age
        this.form.weight           = res.data.weight
        this.form.height           = res.data.height
        this.form.gender           = res.data.gender
        this.form.experienceLevel  = res.data.experience_level  || 1
        this.form.workoutFrequency = res.data.workout_frequency || 3

        this.originalForm = { ...this.form }
        this._saveToLocalStorage(res.data)
      } catch {
        this.isEditMode       = false
        this.isFirstTimeSetup = true
        this.originalForm     = null
      }
    },

    async saveProfile() {
      if (!this.isValid) return
      this.saving     = true
      this.successMsg = ''
      this.errorMsg   = ''

      try {
        const payload = {
          name             : this.form.name,
          age              : this.form.age,
          weight           : this.form.weight,
          height           : this.form.height,
          gender           : this.form.gender,
          experience_level : this.form.experienceLevel,
          workout_frequency: this.form.workoutFrequency,
        }

        let res
        if (this.isEditMode && this.savedUser?.id) {
          res = await axios.put(`${API_URL}/api/users/${this.savedUser.id}`, payload)
        } else {
          res = await axios.post(`${API_URL}/api/users`, payload)
        }

        this.savedUser   = res.data.user
        this.recommended = res.data.recommended || []
        this.successMsg  = 'Profil berhasil disimpan!'
        this.originalForm = { ...this.form }
        this._saveToLocalStorage(res.data.user)
        localStorage.setItem('calsio_user_setup', 'true')

        if (this.isFirstTimeSetup) {
          setTimeout(() => this.$router.push({ name: 'Home' }), 1500)
        } else {
          this.isEditMode = true
          setTimeout(() => { this.successMsg = '' }, 3000)
        }
      } catch (err) {
        this.errorMsg = err.response?.data?.message || err.message
      } finally {
        this.saving = false
      }
    },

    _saveToLocalStorage(user) {
      const maxBpm = user.age ? 220 - user.age : 185
      const bmi    = user.bmi || (user.weight / ((user.height / 100) ** 2))

      // Estimasi fat percentage berdasarkan BMI + gender
      let fatPercentage
      if (user.gender === 'Male') {
        fatPercentage = bmi < 18.5 ? 13 : bmi < 25 ? 18 : bmi < 30 ? 25 : 30
      } else {
        fatPercentage = bmi < 18.5 ? 20 : bmi < 25 ? 24 : bmi < 30 ? 30 : 35
      }

      // Water intake: 0.033 L per kg, clamp ke range dataset
      const waterIntake = Math.min(Math.max(parseFloat((user.weight * 0.033).toFixed(1)), 1.5), 3.7)

      localStorage.setItem('calsio_user_id', user.id)
      localStorage.setItem('calsio_user_profile', JSON.stringify({
        name            : user.name             || '',
        age             : user.age,
        weight          : user.weight,
        height          : user.height / 100,
        gender          : user.gender,
        maxBpm,
        restingBpm      : 62,
        fatPercentage,
        waterIntake,
        workoutFrequency: user.workout_frequency || this.form.workoutFrequency || 3,
        experienceLevel : user.experience_level  || this.form.experienceLevel  || 1,
      }))
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }

.edit-wrapper { font-family: 'Barlow', sans-serif; min-height: 100vh; background: #080a0f; color: #fff; position: relative; overflow-x: hidden; }
.bg-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(234,179,8,0.03) 1px,transparent 1px), linear-gradient(90deg,rgba(234,179,8,0.03) 1px,transparent 1px); background-size: 40px 40px; pointer-events: none; z-index: 0; }
.bg-glow { position: fixed; top: -200px; right: -100px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%); pointer-events: none; z-index: 0; }
.main-content { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 40px 40px 60px; display: flex; flex-direction: column; gap: 32px; }
.page-title { font-family: 'Barlow Condensed', sans-serif; font-size: 2.6rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.04em; line-height: 1; }
.page-sub { margin-top: 8px; font-size: 0.9rem; color: rgba(255,255,255,0.35); }
.profile-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: start; }

.card { background: #0d1117; border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 28px; position: relative; overflow: hidden; }
.card-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent); }
.section-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.3); margin-bottom: 14px; }
.section-hint { font-size: 0.6rem; color: rgba(255,255,255,0.18); text-transform: none; letter-spacing: 0; font-weight: 400; }
.divider { height: 1px; background: rgba(255,255,255,0.06); margin: 22px 0; }

.avatar-row { display: flex; align-items: center; gap: 16px; margin-bottom: 4px; }
.avatar { width: 56px; height: 56px; background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #eab308; }
.avatar-name { font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; font-weight: 700; }
.avatar-bmi  { font-size: 0.78rem; color: rgba(255,255,255,0.4); margin-top: 2px; }

.full-width { width: 100%; }
.full-width .field-wrap { width: 100%; }
.gender-row { display: flex; gap: 10px; }
.gender-btn { flex: 1; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.2s; letter-spacing: 0.05em; }
.gender-btn:hover  { border-color: rgba(234,179,8,0.3); color: rgba(255,255,255,0.7); }
.gender-btn.active { background: rgba(234,179,8,0.12); border-color: #eab308; color: #eab308; }

.fields-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
.field-group { display: flex; flex-direction: column; gap: 8px; }
.field-group label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); }
.field-wrap { display: flex; align-items: center; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; transition: border-color 0.2s; }
.field-wrap.focused { border-color: rgba(234,179,8,0.5); }
.field-input { flex: 1; padding: 12px 10px; background: transparent; border: none; outline: none; color: #fff; font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; font-weight: 700; }
.field-input::placeholder { color: rgba(255,255,255,0.15); }
.field-unit { padding: 0 10px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.3); }

.bmi-bar-card { display: flex; align-items: center; gap: 16px; margin-top: 14px; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; }
.bmi-bar-track { flex: 1; height: 6px; background: rgba(255,255,255,0.08); border-radius: 999px; position: relative; }
.bmi-bar-fill { height: 100%; border-radius: 999px; transition: width 0.4s, background 0.4s; }
.bmi-bar-dot  { position: absolute; top: 50%; transform: translate(-50%,-50%); width: 12px; height: 12px; background: #fff; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.5); transition: left 0.4s; }
.bmi-bar-labels { display: flex; justify-content: space-between; margin-top: 6px; font-size: 0.58rem; color: rgba(255,255,255,0.2); text-transform: uppercase; }
.bmi-number { font-family: 'Barlow Condensed', sans-serif; font-size: 1.8rem; font-weight: 900; min-width: 52px; text-align: right; transition: color 0.3s; }

/* Experience Level */
.exp-toggle { display: flex; flex-direction: column; gap: 8px; }
.exp-btn { display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer; transition: all 0.2s; text-align: left; }
.exp-btn:hover { border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); }
.exp-btn.active { background: rgba(0,0,0,0.3); border-color: var(--acc, #eab308); }
.exp-icon  { font-size: 1.3rem; flex-shrink: 0; }
.exp-info  { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.exp-title { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.7); }
.exp-btn.active .exp-title { color: var(--acc, #eab308); }
.exp-desc  { font-size: 0.65rem; color: rgba(255,255,255,0.25); }
.exp-check { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: #000; font-weight: 900; flex-shrink: 0; }

/* Workout Frequency */
.freq-row { display: flex; gap: 8px; }
.freq-btn { flex: 1; padding: 10px 6px; font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.2s; }
.freq-btn:hover  { border-color: rgba(234,179,8,0.3); color: rgba(255,255,255,0.7); }
.freq-btn.active { background: rgba(234,179,8,0.12); border-color: #eab308; color: #eab308; }

/* Level display card */
.level-display { display: flex; align-items: center; gap: 14px; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; margin-bottom: 10px; }
.level-emoji { font-size: 1.8rem; flex-shrink: 0; }
.level-info  { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.level-name  { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.06em; }
.level-desc  { font-size: 0.68rem; color: rgba(255,255,255,0.3); }
.level-freq  { display: flex; flex-direction: column; align-items: center; }
.lf-val  { font-family: 'Barlow Condensed', sans-serif; font-size: 1.4rem; font-weight: 900; color: #eab308; line-height: 1; }
.lf-lbl  { font-size: 0.6rem; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.06em; }
.level-impact { font-size: 0.68rem; color: rgba(255,255,255,0.25); display: flex; align-items: center; gap: 6px; }
.level-impact strong { color: #eab308; }

.btn-save { width: 100%; padding: 15px; background: #eab308; border: none; border-radius: 12px; color: #000; font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
.btn-save:hover:not(:disabled) { background: #facc15; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(234,179,8,0.35); }
.btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }

.loading-dots { display: flex; align-items: center; justify-content: center; gap: 6px; }
.dot { width: 8px; height: 8px; background: #000; border-radius: 50%; animation: bounce 1s infinite; }
.dot:nth-child(2) { animation-delay: 0.15s; } .dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce { 0%,80%,100%{transform:scale(0.7);opacity:.5}40%{transform:scale(1);opacity:1} }

.msg-success { margin-top: 12px; text-align: center; font-size: 0.8rem; color: #22c55e; display: flex; align-items: center; justify-content: center; gap: 6px; }
.msg-error   { margin-top: 12px; text-align: center; font-size: 0.8rem; color: #ef4444; display: flex; align-items: center; justify-content: center; gap: 6px; }

.right-col { display: flex; flex-direction: column; gap: 16px; }
.summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 4px; }
.summary-item { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 14px 6px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; text-align: center; }
.si-icon { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: rgba(234,179,8,0.08); border-radius: 8px; color: rgba(234,179,8,0.7); }
.si-val  { font-family: 'Barlow Condensed', sans-serif; font-size: 1.3rem; font-weight: 900; color: #eab308; }
.si-lbl  { font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.3); }
.empty-state { text-align: center; padding: 20px 0; color: rgba(255,255,255,0.25); font-size: 0.85rem; }

.rec-list { display: flex; flex-direction: column; gap: 8px; }
.rec-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: rgba(234,179,8,0.05); border: 1px solid rgba(234,179,8,0.1); border-radius: 8px; font-size: 0.85rem; color: rgba(255,255,255,0.7); }

.ml-list { display: flex; flex-direction: column; gap: 10px; }
.ml-row  { display: flex; justify-content: space-between; align-items: center; }
.ml-key-wrap { display: flex; align-items: center; gap: 7px; font-size: 0.72rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.08em; }
.ml-val { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 700; color: #eab308; }

.animate-in { opacity: 0; transform: translateY(16px); animation: fadeUp 0.5s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 900px) { .profile-grid { grid-template-columns: 1fr; } .fields-grid { grid-template-columns: 1fr 1fr; } .main-content { padding: 24px 20px 48px; } }
</style>