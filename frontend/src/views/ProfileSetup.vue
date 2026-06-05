<template>
  <div class="setup-wrapper">
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>

    <div class="card">
      <div class="card-header">
        <div class="icon-wrap">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/>
          </svg>
        </div>
        <h1 class="title">Setup Profil</h1>
        <p class="subtitle">Isi data kamu untuk prediksi kalori yang akurat</p>
        <div class="divider"></div>
      </div>

      <!-- Step indicators -->
      <div class="steps">
        <div class="step active"><span>1</span><p>Fisik</p></div>
        <div class="step-line"></div>
        <div class="step" :class="{ active: gender }"><span>2</span><p>Gender</p></div>
        <div class="step-line"></div>
        <div class="step" :class="{ active: experienceLevel }"><span>3</span><p>Level</p></div>
        <div class="step-line"></div>
        <div class="step" :class="{ active: equipment }"><span>4</span><p>Alat</p></div>
      </div>

      <div class="form-body">

        <!-- Umur -->
        <div class="input-group">
          <label>Umur</label>
          <div class="input-wrap">
            <input v-model="age" type="number" placeholder="25" class="input-field" min="10" max="99"/>
            <span class="unit">thn</span>
          </div>
        </div>

        <!-- Berat & Tinggi -->
        <div class="input-row">
          <div class="input-group">
            <label>Berat Badan</label>
            <div class="input-wrap">
              <input v-model="weight" type="number" placeholder="70" class="input-field" min="30" max="200"/>
              <span class="unit">kg</span>
            </div>
          </div>
          <div class="input-group">
            <label>Tinggi Badan</label>
            <div class="input-wrap">
              <input v-model="height" type="number" placeholder="170" class="input-field" min="100" max="250"/>
              <span class="unit">cm</span>
            </div>
          </div>
        </div>

        <!-- Gender -->
        <div class="input-group">
          <label>Gender</label>
          <div class="gender-toggle">
            <button @click="gender = 'Male'"   :class="['toggle-btn', gender === 'Male'   ? 'active' : '']">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="14" r="5"/><path d="M19 5l-5.4 5.4M19 5h-5M19 5v5"/></svg>
              Male
            </button>
            <button @click="gender = 'Female'" :class="['toggle-btn', gender === 'Female' ? 'active' : '']">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M12 13v8M9 18h6"/></svg>
              Female
            </button>
          </div>
        </div>

        <!-- Experience Level -->
        <div class="input-group">
          <label>
            Level Pengalaman
            <span class="label-hint">— berpengaruh besar pada prediksi kalori</span>
          </label>
          <div class="exp-toggle">
            <button
              v-for="lvl in experienceLevels" :key="lvl.value"
              @click="experienceLevel = lvl.value"
              :class="['exp-btn', experienceLevel === lvl.value ? 'active' : '']"
              :style="experienceLevel === lvl.value ? { '--acc': lvl.color } : {}"
            >
              <span class="exp-icon">{{ lvl.emoji }}</span>
              <div class="exp-info">
                <span class="exp-title">{{ lvl.label }}</span>
                <span class="exp-desc">{{ lvl.desc }}</span>
              </div>
              <div v-if="experienceLevel === lvl.value" class="exp-check" :style="{ background: lvl.color }">✓</div>
            </button>
          </div>
        </div>

        <!-- Workout Frequency -->
        <div class="input-group">
          <label>Frekuensi Latihan per Minggu</label>
          <div class="freq-row">
            <button
              v-for="f in [2,3,4,5]" :key="f"
              @click="workoutFrequency = f"
              :class="['freq-btn', workoutFrequency === f ? 'active' : '']"
            >{{ f }}x</button>
          </div>
        </div>

        <!-- Preferensi Latihan -->
        <div class="input-group">
          <label>Preferensi Latihan</label>
          <div class="equipment-toggle">
            <button @click="equipment = 'No Equipment'" :class="['equip-btn', equipment === 'No Equipment' ? 'active' : '']">
              <div class="equip-icon">🤸</div>
              <div class="equip-text">
                <span class="equip-title">Tanpa Alat</span>
                <span class="equip-desc">Bodyweight & calisthenics</span>
              </div>
              <div v-if="equipment === 'No Equipment'" class="equip-check">✓</div>
            </button>
            <button @click="equipment = 'Dumbbell'" :class="['equip-btn', equipment === 'Dumbbell' ? 'active' : '']">
              <div class="equip-icon">🏋️</div>
              <div class="equip-text">
                <span class="equip-title">Dumbbell</span>
                <span class="equip-desc">Latihan dengan dumbbell</span>
              </div>
              <div v-if="equipment === 'Dumbbell'" class="equip-check">✓</div>
            </button>
          </div>
        </div>

        <!-- BMI Preview -->
        <div v-if="weight && height" class="bmi-preview">
          <span class="bmi-label">BMI Kamu</span>
          <span class="bmi-value" :class="bmiClass">{{ bmiValue }} — {{ bmiStatus }}</span>
        </div>

        <div v-if="errorMsg" class="error-msg">⚠️ {{ errorMsg }}</div>

        <button @click="submitProfile" :disabled="loading" class="btn-submit">
          <span v-if="!loading">Simpan & Mulai Workout 🔥</span>
          <span v-else class="loading-text">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
          </span>
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default {
  created() {
    localStorage.removeItem('calsio_user_profile')
    localStorage.removeItem('calsio_user_setup')
  },

  data() {
    return {
      age             : '',
      weight          : '',
      height          : '',
      gender          : '',
      equipment       : '',
      experienceLevel : null,
      workoutFrequency: 3,
      loading         : false,
      errorMsg        : '',

      experienceLevels: [
        { value: 1, label: 'Pemula',          emoji: '🌱', color: '#22c55e', desc: 'Baru mulai latihan / < 6 bulan' },
        { value: 2, label: 'Menengah',         emoji: '💪', color: '#eab308', desc: 'Sudah rutin 6 bulan – 2 tahun' },
        { value: 3, label: 'Berpengalaman',    emoji: '🏆', color: '#ef4444', desc: 'Latihan intensif > 2 tahun' },
      ],
    }
  },

  computed: {
    bmiValue() {
      if (!this.weight || !this.height) return null
      return (this.weight / ((this.height / 100) ** 2)).toFixed(1)
    },
    bmiStatus() {
      const b = parseFloat(this.bmiValue)
      if (b < 18.5) return 'Underweight'
      if (b < 25)   return 'Normal'
      if (b < 30)   return 'Overweight'
      return 'Obesitas'
    },
    bmiClass() {
      const b = parseFloat(this.bmiValue)
      if (b < 18.5) return 'bmi-blue'
      if (b < 25)   return 'bmi-green'
      if (b < 30)   return 'bmi-orange'
      return 'bmi-red'
    },
  },

  methods: {
    async submitProfile() {
      this.errorMsg = ''
      if (!this.age || !this.weight || !this.height || !this.gender || !this.equipment || !this.experienceLevel) {
        this.errorMsg = 'Lengkapi semua data terlebih dahulu'
        return
      }
      this.loading = true
      try {
        const response = await axios.post(`${API_URL}/api/users`, {
          age              : Number(this.age),
          weight           : Number(this.weight),
          height           : Number(this.height),
          gender           : this.gender,
          equipment        : this.equipment,
          experience_level : this.experienceLevel,
          workout_frequency: this.workoutFrequency,
        })
        if (response.data?.user?.id) {
          localStorage.setItem('calsio_user_id', response.data.user.id)
        }
      } catch (err) {
        this.errorMsg = 'Gagal menyimpan profil ke server, coba lagi'
        this.loading  = false
        return
      }
      this._saveToLocalStorage({
        age             : Number(this.age),
        weight          : Number(this.weight),
        height          : Number(this.height),
        gender          : this.gender,
        bmi             : parseFloat(this.bmiValue),
        experienceLevel : this.experienceLevel,
        workoutFrequency: this.workoutFrequency,
      })
      localStorage.setItem('calsio_user_setup', 'true')
      this.loading = false
      await this.$router.push('/dashboard')
    },

    _saveToLocalStorage(user) {
      const maxBpm = 220 - user.age
      // Estimasi fat percentage berdasarkan BMI + gender (lebih akurat dari sebelumnya)
      let fatPercentage
      if (user.gender === 'Male') {
        fatPercentage = user.bmi < 18.5 ? 13 : user.bmi < 25 ? 18 : user.bmi < 30 ? 25 : 30
      } else {
        fatPercentage = user.bmi < 18.5 ? 20 : user.bmi < 25 ? 24 : user.bmi < 30 ? 30 : 35
      }
      // Water intake: 0.033 L per kg berat badan, clamp ke range dataset (1.5–3.7)
      const waterIntake = Math.min(Math.max(parseFloat((user.weight * 0.033).toFixed(1)), 1.5), 3.7)

      localStorage.setItem('calsio_user_profile', JSON.stringify({
        age             : user.age,
        weight          : user.weight,
        height          : user.height / 100,
        gender          : user.gender,
        maxBpm,
        restingBpm      : 62,
        fatPercentage,
        waterIntake,
        workoutFrequency: user.workoutFrequency,
        experienceLevel : user.experienceLevel,   // dari pilihan user, bukan hardcode
      }))
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
.setup-wrapper { font-family: 'Barlow', sans-serif; min-height: 100vh; background: #080a0f; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 24px; }
.bg-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(234,179,8,0.04) 1px,transparent 1px), linear-gradient(90deg,rgba(234,179,8,0.04) 1px,transparent 1px); background-size: 40px 40px; pointer-events: none; }
.bg-glow { position: fixed; top: -200px; left: 50%; transform: translateX(-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 70%); pointer-events: none; }
.card { background: #0d1117; border: 1px solid rgba(234,179,8,0.2); border-radius: 20px; width: 100%; max-width: 480px; overflow: hidden; box-shadow: 0 0 0 1px rgba(234,179,8,0.05), 0 20px 60px rgba(0,0,0,0.6); position: relative; z-index: 1; }
.card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #eab308, transparent); }
.card-header { padding: 36px 36px 0; text-align: center; }
.icon-wrap { width: 60px; height: 60px; background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.3); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: #eab308; }
.title { font-family: 'Barlow Condensed', sans-serif; font-size: 2rem; font-weight: 900; color: #fff; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1; margin-bottom: 8px; }
.subtitle { font-size: 0.85rem; color: rgba(255,255,255,0.4); line-height: 1.5; margin-bottom: 24px; }
.divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(234,179,8,0.2), transparent); }
.steps { display: flex; align-items: center; justify-content: center; padding: 20px 36px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.step { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.step span { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: rgba(255,255,255,0.3); transition: all 0.3s; }
.step p { font-size: 0.65rem; font-weight: 600; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.08em; transition: all 0.3s; }
.step.active span { background: rgba(234,179,8,0.15); border-color: #eab308; color: #eab308; }
.step.active p { color: #eab308; }
.step-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); margin: 0 8px 20px; }
.form-body { padding: 28px 36px 36px; display: flex; flex-direction: column; gap: 20px; }
.input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.input-group { display: flex; flex-direction: column; gap: 8px; }
label { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); }
.label-hint { font-size: 0.6rem; color: rgba(255,255,255,0.2); text-transform: none; letter-spacing: 0; font-weight: 400; }
.input-wrap { position: relative; }
.input-field { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 40px 12px 14px; color: #fff; font-size: 1.1rem; font-family: 'Barlow Condensed', sans-serif; font-weight: 600; transition: border-color 0.2s; outline: none; -moz-appearance: textfield; }
.input-field::-webkit-inner-spin-button, .input-field::-webkit-outer-spin-button { -webkit-appearance: none; }
.input-field:focus { border-color: rgba(234,179,8,0.6); background: rgba(234,179,8,0.04); }
.input-field::placeholder { color: rgba(255,255,255,0.15); }
.unit { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 0.72rem; font-weight: 700; color: #eab308; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.7; }
.gender-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.toggle-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.4); font-family: 'Barlow', sans-serif; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.toggle-btn:hover { border-color: rgba(234,179,8,0.3); color: rgba(255,255,255,0.7); }
.toggle-btn.active { background: rgba(234,179,8,0.1); border-color: #eab308; color: #eab308; }
.exp-toggle { display: flex; flex-direction: column; gap: 8px; }
.exp-btn { display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer; transition: all 0.2s; text-align: left; }
.exp-btn:hover { border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); }
.exp-btn.active { background: rgba(0,0,0,0.3); border-color: var(--acc, #eab308); }
.exp-icon { font-size: 1.4rem; flex-shrink: 0; }
.exp-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.exp-title { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.7); }
.exp-btn.active .exp-title { color: var(--acc, #eab308); }
.exp-desc { font-size: 0.65rem; color: rgba(255,255,255,0.25); }
.exp-check { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: #000; font-weight: 900; flex-shrink: 0; }
.freq-row { display: flex; gap: 8px; }
.freq-btn { flex: 1; padding: 10px 6px; font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.2s; }
.freq-btn:hover { border-color: rgba(234,179,8,0.3); color: rgba(255,255,255,0.7); }
.freq-btn.active { background: rgba(234,179,8,0.12); border-color: #eab308; color: #eab308; }
.equipment-toggle { display: flex; flex-direction: column; gap: 10px; }
.equip-btn { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer; transition: all 0.2s; text-align: left; }
.equip-btn:hover { border-color: rgba(234,179,8,0.25); background: rgba(234,179,8,0.03); }
.equip-btn.active { background: rgba(234,179,8,0.08); border-color: rgba(234,179,8,0.5); }
.equip-icon { font-size: 1.5rem; line-height: 1; flex-shrink: 0; }
.equip-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.equip-title { font-size: 0.9rem; font-weight: 700; color: rgba(255,255,255,0.85); font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.03em; text-transform: uppercase; }
.equip-desc { font-size: 0.72rem; color: rgba(255,255,255,0.3); }
.equip-check { width: 22px; height: 22px; background: #eab308; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: #000; font-weight: 900; flex-shrink: 0; }
.bmi-preview { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; }
.bmi-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); }
.bmi-value { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 700; letter-spacing: 0.03em; }
.bmi-green { color: #22c55e; } .bmi-blue { color: #60a5fa; } .bmi-orange { color: #f97316; } .bmi-red { color: #ef4444; }
.error-msg { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3); border-radius: 10px; padding: 10px 14px; font-size: 0.82rem; color: #f87171; }
.btn-submit { width: 100%; padding: 16px; background: #eab308; border: none; border-radius: 12px; color: #000; font-family: 'Barlow Condensed', sans-serif; font-size: 1.05rem; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; }
.btn-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%); }
.btn-submit:hover:not(:disabled) { background: #facc15; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(234,179,8,0.4); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.loading-text { display: flex; align-items: center; justify-content: center; gap: 6px; }
.dot { width: 8px; height: 8px; background: #000; border-radius: 50%; animation: bounce 1s infinite; }
.dot:nth-child(2) { animation-delay: 0.15s; } .dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce { 0%,80%,100%{transform:scale(0.7);opacity:.5} 40%{transform:scale(1);opacity:1} }
</style>