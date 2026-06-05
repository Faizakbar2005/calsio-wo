<template>
  <div class="auth-wrapper">
    <div class="bg-grid"></div>
    <div class="glow glow--tl"></div>
    <div class="glow glow--br"></div>

    <div class="auth-layout">

      <!-- ═══ LEFT: Brand panel ═══ -->
      <div class="brand-panel">
        <div class="brand-inner">

          <div class="bp-logo">
            <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="#eab308" stroke-width="1.2" stroke-linejoin="round" fill="rgba(234,179,8,0.06)"/>
              <path d="M19 8L13 17H17.5L13 24L22 14H17L19 8Z" fill="#eab308"/>
            </svg>
            <div>
              <div class="bp-name">CALSIO</div>
            </div>
          </div>

          <div class="bp-copy">
            <div class="bp-eyebrow">Bergabung Sekarang</div>
            <h1 class="bp-title">Start Your<br>Journey.</h1>
            <p class="bp-desc">Satu tempat untuk catat workout, pantau kalori, dan jaga konsistensi latihan harianmu.</p>
          </div>

          <div class="bp-chart">
            <div
              v-for="(h, i) in [32,48,28,56,40,64,36,52,44,60,38,72,46,58]"
              :key="i"
              class="bp-bar"
              :style="{ height: h + 'px', animationDelay: (i * 0.07) + 's' }"
            ></div>
          </div>

        </div>
      </div>

      <!-- ═══ RIGHT: Form ═══ -->
      <div class="form-panel">
        <div class="form-box animate-in">

          <router-link :to="{ name: 'Landing' }" class="btn-back">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Beranda
          </router-link>

          <div class="form-head">
            <h2 class="form-title">Daftar</h2>
            <p class="form-sub">
              Sudah punya akun?
              <router-link :to="{ name: 'Login' }" class="text-link">Masuk di sini →</router-link>
            </p>
          </div>

          <div v-if="errorMsg" class="alert-error">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ errorMsg }}
          </div>

          <div v-if="successMsg" class="alert-success">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ successMsg }}
          </div>

          <form @submit.prevent="handleRegister" class="auth-form" novalidate>

            <div class="field" :class="{ error: errors.name }">
              <label class="field-lbl">Nama Lengkap</label>
              <div class="field-wrap">
                <svg class="fi" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                <input v-model="form.name" type="text" placeholder="John Doe" class="field-input" autocomplete="name" @input="clearError('name')"/>
              </div>
              <span v-if="errors.name" class="field-err">{{ errors.name }}</span>
            </div>

            <div class="field" :class="{ error: errors.email }">
              <label class="field-lbl">Email</label>
              <div class="field-wrap">
                <svg class="fi" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input v-model="form.email" type="email" placeholder="email@kamu.com" class="field-input" autocomplete="email" @input="clearError('email')"/>
              </div>
              <span v-if="errors.email" class="field-err">{{ errors.email }}</span>
            </div>

            <div class="field" :class="{ error: errors.password }">
              <label class="field-lbl">Password</label>
              <div class="field-wrap">
                <svg class="fi" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input v-model="form.password" :type="showPw ? 'text' : 'password'" placeholder="Min. 6 karakter" class="field-input" autocomplete="new-password" @input="clearError('password')"/>
                <button type="button" @click="showPw = !showPw" class="pw-toggle">
                  <svg v-if="!showPw" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
              </div>
              <span v-if="errors.password" class="field-err">{{ errors.password }}</span>
            </div>

            <div class="field" :class="{ error: errors.confirmPassword }">
              <label class="field-lbl">Konfirmasi Password</label>
              <div class="field-wrap">
                <svg class="fi" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input v-model="form.confirmPassword" :type="showPw2 ? 'text' : 'password'" placeholder="Ulangi password" class="field-input" autocomplete="new-password" @input="clearError('confirmPassword')"/>
                <button type="button" @click="showPw2 = !showPw2" class="pw-toggle">
                  <svg v-if="!showPw2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
              </div>
              <span v-if="errors.confirmPassword" class="field-err">{{ errors.confirmPassword }}</span>
            </div>

            <button type="submit" class="btn-submit" :disabled="loading">
              <span v-if="!loading" class="btn-inner">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                Buat Akun
              </span>
              <span v-else class="btn-dots">
                <span class="d"></span><span class="d"></span><span class="d"></span>
              </span>
            </button>

          </form>

          <div class="divider"><span class="dv-line"></span><span class="dv-txt">atau</span><span class="dv-line"></span></div>

          <div class="alt-cta">
            <p>Sudah punya akun?</p>
            <router-link :to="{ name: 'Login' }" class="btn-outline">Masuk Sekarang →</router-link>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default {
  name: 'Register',

  data() {
    return {
      form: {
        name           : '',
        email          : '',
        password       : '',
        confirmPassword: '',
      },
      errors    : {},
      errorMsg  : '',
      successMsg: '',
      loading   : false,
      showPw    : false,
      showPw2   : false,
    }
  },

  methods: {
    clearError(field) {
      delete this.errors[field]
      this.errorMsg = ''
    },

    validate() {
      this.errors = {}
      if (!this.form.name)
        this.errors.name = 'Nama wajib diisi'
      else if (this.form.name.length < 2)
        this.errors.name = 'Nama minimal 2 karakter'

      if (!this.form.email)
        this.errors.email = 'Email wajib diisi'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email))
        this.errors.email = 'Format email tidak valid'

      if (!this.form.password)
        this.errors.password = 'Password wajib diisi'
      else if (this.form.password.length < 6)
        this.errors.password = 'Password minimal 6 karakter'

      if (!this.form.confirmPassword)
        this.errors.confirmPassword = 'Konfirmasi password wajib diisi'
      else if (this.form.password !== this.form.confirmPassword)
        this.errors.confirmPassword = 'Password tidak cocok'

      return Object.keys(this.errors).length === 0
    },

    async handleRegister() {
      if (!this.validate()) return

      this.loading    = true
      this.errorMsg   = ''
      this.successMsg = ''

      try {
        const res = await axios.post(`${API_URL}/api/auth/register`, {
          name    : this.form.name,
          email   : this.form.email,
          password: this.form.password,
        })

        const { token, user } = res.data

        // ── Bersihkan semua data user lama ──
        localStorage.removeItem('calsio_token')
        localStorage.removeItem('calsio_user_profile')
        localStorage.removeItem('calsio_user_setup')
        localStorage.removeItem('calsio_user_id')
        localStorage.removeItem('calsio_visited')


        localStorage.setItem('calsio_visited', 'true')

localStorage.removeItem('calsio_token')
delete axios.defaults.headers.common['Authorization']

this.successMsg = 'Akun berhasil dibuat! Silakan masuk...'
setTimeout(() => {
  this.$router.push({ name: 'Login' })
}, 1500)

      } catch (err) {
        const status = err.response?.status
        const msg    = err.response?.data?.message || ''

        if (status === 409 || msg.toLowerCase().includes('exist'))
          this.errorMsg = 'Email sudah terdaftar, silakan masuk'
        else if (status === 400)
          this.errorMsg = 'Data tidak valid, periksa kembali'
        else if (err.code === 'ERR_NETWORK')
          this.errorMsg = 'Tidak bisa terhubung ke server'
        else
          this.errorMsg = msg || 'Gagal mendaftar, coba lagi'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.auth-wrapper {
  font-family: 'Barlow', sans-serif;
  min-height: 100vh; background: #080a0f; color: #fff;
  position: relative; overflow: hidden;
}
.bg-grid {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(234,179,8,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(234,179,8,0.025) 1px, transparent 1px);
  background-size: 48px 48px; pointer-events: none; z-index: 0;
}
.glow { position: fixed; pointer-events: none; z-index: 0; border-radius: 50%; }
.glow--tl { top: -180px; left: -120px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(234,179,8,0.09) 0%, transparent 70%); }
.glow--br { bottom: -200px; right: -100px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%); }

.auth-layout {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.brand-panel {
  background: #0a0c12;
  border-right: 1px solid rgba(234,179,8,0.1);
  display: flex; align-items: center; justify-content: center;
  padding: 60px 56px; position: relative; overflow: hidden;
}
.brand-panel::before {
  content: ''; position: absolute; inset: 0;
  background: repeating-linear-gradient(
    45deg, transparent, transparent 40px,
    rgba(234,179,8,0.015) 40px, rgba(234,179,8,0.015) 41px
  );
}
.brand-inner {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; gap: 44px;
  max-width: 380px; width: 100%;
}

.bp-logo { display: flex; align-items: center; gap: 14px; }
.bp-name { font-family: 'Barlow Condensed', sans-serif; font-size: 1.5rem; font-weight: 900; letter-spacing: 0.2em; color: #eab308; }

.bp-eyebrow { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em; color: rgba(234,179,8,0.6); margin-bottom: 10px; }
.bp-title { font-family: 'Barlow Condensed', sans-serif; font-size: 4rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.02em; line-height: 0.93; color: #fff; margin-bottom: 16px; }
.bp-desc  { font-size: 0.83rem; color: rgba(255,255,255,0.33); line-height: 1.7; }

.bp-chart { display: flex; align-items: flex-end; gap: 4px; height: 72px; }
.bp-bar {
  flex: 1; border-radius: 3px 3px 0 0;
  background: linear-gradient(to top, rgba(234,179,8,0.45), rgba(234,179,8,0.1));
  border-top: 1px solid rgba(234,179,8,0.55);
  transform-origin: bottom; opacity: 0;
  animation: barRise 0.5s ease forwards;
}
@keyframes barRise { to { transform: scaleY(1); opacity: 1; } from { transform: scaleY(0); opacity: 0; } }

.form-panel {
  display: flex; align-items: center; justify-content: center;
  padding: 52px 56px; background: #080a0f;
}
.form-box {
  width: 100%; max-width: 400px;
  display: flex; flex-direction: column; gap: 22px;
}

.animate-in { animation: fadeUp 0.45s ease forwards; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

.btn-back {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.72rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.3); text-decoration: none; transition: color 0.2s;
}
.btn-back:hover { color: rgba(255,255,255,0.7); }

.form-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.4rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.04em;
  line-height: 1; color: #fff; margin-bottom: 8px;
}
.form-sub { font-size: 0.8rem; color: rgba(255,255,255,0.3); }
.text-link { color: #eab308; text-decoration: none; font-weight: 600; }
.text-link:hover { text-decoration: underline; }

.alert-error {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 14px; border-radius: 10px; font-size: 0.78rem; font-weight: 500;
  background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #fca5a5;
}
.alert-success {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 14px; border-radius: 10px; font-size: 0.78rem; font-weight: 500;
  background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); color: #86efac;
}

.auth-form { display: flex; flex-direction: column; gap: 14px; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field-lbl { font-size: 0.64rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.38); }

.field-wrap {
  position: relative; display: flex; align-items: center;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; transition: border-color 0.2s, background 0.2s;
}
.field-wrap:focus-within { border-color: rgba(234,179,8,0.5); background: rgba(234,179,8,0.03); }
.field.error .field-wrap  { border-color: rgba(239,68,68,0.45); }

.fi { position: absolute; left: 13px; color: rgba(255,255,255,0.22); pointer-events: none; flex-shrink: 0; }

.field-input {
  width: 100%; padding: 13px 14px 13px 38px;
  background: transparent; border: none; outline: none;
  color: #fff; font-family: 'Barlow', sans-serif; font-size: 0.88rem;
}
.field-input::placeholder { color: rgba(255,255,255,0.18); }

.pw-toggle {
  position: absolute; right: 12px; padding: 5px;
  background: transparent; border: none; border-radius: 4px;
  color: rgba(255,255,255,0.22); cursor: pointer; transition: color 0.15s;
  display: flex; align-items: center;
}
.pw-toggle:hover { color: rgba(255,255,255,0.6); }

.field-err { font-size: 0.63rem; color: #fca5a5; }

.btn-submit {
  width: 100%; padding: 14px; margin-top: 4px;
  background: #eab308; border: none; border-radius: 11px;
  color: #000; font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.05rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.1em;
  cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden;
}
.btn-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 55%); }
.btn-submit:hover:not(:disabled) { background: #facc15; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(234,179,8,0.35); }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }

.btn-dots { display: flex; align-items: center; justify-content: center; gap: 5px; }
.d { width: 7px; height: 7px; border-radius: 50%; background: #000; animation: bounce 0.9s infinite; }
.d:nth-child(2){animation-delay:0.15s} .d:nth-child(3){animation-delay:0.3s}
@keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }

.divider { display: flex; align-items: center; gap: 12px; }
.dv-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
.dv-txt  { font-size: 0.65rem; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 0.1em; flex-shrink: 0; }

.alt-cta { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.alt-cta p { font-size: 0.78rem; color: rgba(255,255,255,0.28); }
.btn-outline {
  display: inline-block; padding: 11px 26px;
  background: transparent; border: 1px solid rgba(234,179,8,0.3);
  border-radius: 10px; text-decoration: none;
  color: #eab308; font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.88rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.08em; transition: all 0.2s;
}
.btn-outline:hover { background: rgba(234,179,8,0.1); box-shadow: 0 0 20px rgba(234,179,8,0.1); }

@media (max-width: 860px) {
  .auth-layout { grid-template-columns: 1fr; }
  .brand-panel  { display: none; }
  .form-panel   { padding: 40px 24px; }
}
</style>