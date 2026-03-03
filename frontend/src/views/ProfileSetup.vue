<template>
  <div class="setup-wrapper">

    <!-- Animated background -->
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>

    <div class="card">

      <!-- Header -->
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
        <div class="step" :class="{ active: equipment }"><span>3</span><p>Latihan</p></div>
      </div>

      <!-- Form -->
      <div class="form-body">

        <!-- Row berat & tinggi -->
        <div class="input-row">
          <div class="input-group">
            <label>Berat Badan</label>
            <div class="input-wrap">
              <input
                v-model="weight"
                type="number"
                placeholder="0"
                class="input-field"
              />
              <span class="unit">kg</span>
            </div>
          </div>
          <div class="input-group">
            <label>Tinggi Badan</label>
            <div class="input-wrap">
              <input
                v-model="height"
                type="number"
                placeholder="0"
                class="input-field"
              />
              <span class="unit">cm</span>
            </div>
          </div>
        </div>

        <!-- Gender -->
        <div class="input-group">
          <label>Gender</label>
          <div class="gender-toggle">
            <button
              @click="gender = 'Male'"
              :class="['toggle-btn', gender === 'Male' ? 'active' : '']"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="10" cy="14" r="5"/>
                <path d="M19 5l-5.4 5.4M19 5h-5M19 5v5"/>
              </svg>
              Male
            </button>
            <button
              @click="gender = 'Female'"
              :class="['toggle-btn', gender === 'Female' ? 'active' : '']"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="5"/>
                <path d="M12 13v8M9 18h6"/>
              </svg>
              Female
            </button>
          </div>
        </div>

        <!-- Jenis Latihan -->
        <div class="input-group">
          <label>Jenis Latihan</label>
          <div class="equipment-toggle">
            <button
              @click="equipment = 'Basic Equipment'"
              :class="['equip-btn', equipment === 'Basic Equipment' ? 'active' : '']"
            >
              <div class="equip-icon">🏋️</div>
              <div class="equip-text">
                <span class="equip-title">Basic Equipment</span>
                <span class="equip-desc">Dumbbell, barbell, dll</span>
              </div>
              <div v-if="equipment === 'Basic Equipment'" class="equip-check">✓</div>
            </button>
            <button
              @click="equipment = 'No Equipment'"
              :class="['equip-btn', equipment === 'No Equipment' ? 'active' : '']"
            >
              <div class="equip-icon">🤸</div>
              <div class="equip-text">
                <span class="equip-title">No Equipment</span>
                <span class="equip-desc">Bodyweight, calisthenics</span>
              </div>
              <div v-if="equipment === 'No Equipment'" class="equip-check">✓</div>
            </button>
          </div>
        </div>

        <!-- BMI Preview -->
        <div v-if="weight && height" class="bmi-preview">
          <span class="bmi-label">BMI Kamu</span>
          <span class="bmi-value" :class="bmiClass">{{ bmiValue }} — {{ bmiStatus }}</span>
        </div>

        <!-- Error message -->
        <div v-if="errorMsg" class="error-msg">
          ⚠️ {{ errorMsg }}
        </div>

        <!-- Submit -->
        <button
          @click="submitProfile"
          :disabled="loading"
          class="btn-submit"
        >
          <span v-if="!loading">Simpan & Mulai Workout 🔥</span>
          <span v-else class="loading-text">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
        </button>

      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export default {
  data() {
    return {
      weight: "",
      height: "",
      gender: "",
      equipment: "",
      loading: false,
      errorMsg: ""
    }
  },
  computed: {
    bmiValue() {
      if (!this.weight || !this.height) return null
      const bmi = this.weight / ((this.height / 100) ** 2)
      return bmi.toFixed(1)
    },
    bmiStatus() {
      const bmi = parseFloat(this.bmiValue)
      if (bmi < 18.5) return "Underweight"
      if (bmi < 25) return "Normal"
      if (bmi < 30) return "Overweight"
      return "Obesitas"
    },
    bmiClass() {
      const bmi = parseFloat(this.bmiValue)
      if (bmi < 18.5) return "bmi-blue"
      if (bmi < 25) return "bmi-green"
      if (bmi < 30) return "bmi-orange"
      return "bmi-red"
    }
  },
  methods: {
    async submitProfile() {
      this.errorMsg = ""

      if (!this.weight || !this.height || !this.gender || !this.equipment) {
        this.errorMsg = "Lengkapi semua data terlebih dahulu"
        return
      }

      this.loading = true

      try {
        const response = await axios.post(`${API_URL}/api/users`, {
          weight: Number(this.weight),
          height: Number(this.height),
          gender: this.gender,
          equipment: this.equipment
        })

        // Simpan user ID ke localStorage untuk dipakai halaman lain
        if (response.data?.user?.id) {
          localStorage.setItem("calsio_user_id", response.data.user.id)
        }

      } catch (error) {
        console.warn("Backend error:", error.message)
        // Tetap lanjut walau backend gagal
      }

      localStorage.setItem("calsio_user_setup", "true")
      await this.$router.push("/")

      this.loading = false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.setup-wrapper {
  font-family: 'Barlow', sans-serif;
  min-height: 100vh;
  background: #080a0f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 24px;
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(234, 179, 8, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(234, 179, 8, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.bg-glow {
  position: fixed;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.card {
  background: #0d1117;
  border: 1px solid rgba(234, 179, 8, 0.2);
  border-radius: 20px;
  width: 100%;
  max-width: 460px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(234, 179, 8, 0.05),
    0 20px 60px rgba(0, 0, 0, 0.6),
    0 0 80px rgba(234, 179, 8, 0.06);
  position: relative;
  z-index: 1;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #eab308, transparent);
}

.card-header {
  padding: 36px 36px 0;
  text-align: center;
}

.icon-wrap {
  width: 60px;
  height: 60px;
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #eab308;
}

.title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.5;
  margin-bottom: 24px;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.2), transparent);
}

.steps {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.step span {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.step p {
  font-size: 0.65rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.3s ease;
}

.step.active span {
  background: rgba(234, 179, 8, 0.15);
  border-color: #eab308;
  color: #eab308;
}

.step.active p {
  color: #eab308;
}

.step-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0 8px;
  margin-bottom: 20px;
}

.form-body {
  padding: 28px 36px 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
}

.input-wrap {
  position: relative;
}

.input-field {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 40px 12px 14px;
  color: #ffffff;
  font-size: 1.1rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  transition: border-color 0.2s, background 0.2s;
  outline: none;
  -moz-appearance: textfield;
}

.input-field::-webkit-inner-spin-button,
.input-field::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.input-field:focus {
  border-color: rgba(234, 179, 8, 0.6);
  background: rgba(234, 179, 8, 0.04);
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.15);
}

.unit {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.72rem;
  font-weight: 700;
  color: #eab308;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}

.gender-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Barlow', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  border-color: rgba(234, 179, 8, 0.3);
  color: rgba(255, 255, 255, 0.7);
}

.toggle-btn.active {
  background: rgba(234, 179, 8, 0.1);
  border-color: #eab308;
  color: #eab308;
}

.equipment-toggle {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.equip-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.equip-btn:hover {
  border-color: rgba(234, 179, 8, 0.25);
  background: rgba(234, 179, 8, 0.03);
}

.equip-btn.active {
  background: rgba(234, 179, 8, 0.08);
  border-color: rgba(234, 179, 8, 0.5);
}

.equip-icon {
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
}

.equip-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.equip-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.equip-desc {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.3);
}

.equip-check {
  width: 22px;
  height: 22px;
  background: #eab308;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  color: #000;
  font-weight: 900;
  flex-shrink: 0;
}

.bmi-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
}

.bmi-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.35);
}

.bmi-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.bmi-green  { color: #22c55e; }
.bmi-blue   { color: #60a5fa; }
.bmi-orange { color: #f97316; }
.bmi-red    { color: #ef4444; }

.error-msg {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.82rem;
  color: #f87171;
}

.btn-submit {
  width: 100%;
  padding: 16px;
  background: #eab308;
  border: none;
  border-radius: 12px;
  color: #000000;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.05rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.btn-submit::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
}

.btn-submit:hover:not(:disabled) {
  background: #facc15;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(234, 179, 8, 0.4);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #000;
  border-radius: 50%;
  animation: bounce 1s infinite;
}

.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}
</style>