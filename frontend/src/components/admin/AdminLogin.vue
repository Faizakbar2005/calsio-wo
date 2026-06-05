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
            <div class="bp-shield">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 3L4 8V16C4 22.6 9.4 28.7 16 30C22.6 28.7 28 22.6 28 16V8L16 3Z"
                  stroke="#eab308" stroke-width="1.2" stroke-linejoin="round" fill="rgba(234,179,8,0.08)"/>
                <path d="M11 16L14.5 19.5L21 13" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <div class="bp-name">CALSIO</div>
              <div class="bp-sub">ADMIN PANEL</div>
            </div>
          </div>

          <div class="bp-copy">
            <div class="bp-eyebrow">⚠ Restricted Access</div>
            <h1 class="bp-title">Admin<br>Control.</h1>
            <p class="bp-desc">Area ini hanya untuk administrator. Akses tidak sah akan dicatat dan dilaporkan.</p>
          </div>

          <!-- Admin feature list -->
          <div class="bp-features">
            <div class="bp-feat-item">
              <div class="bp-feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <div class="bp-feat-title">Kelola User</div>
                <div class="bp-feat-sub">Lihat & hapus akun pengguna</div>
              </div>
            </div>
            <div class="bp-feat-item">
              <div class="bp-feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <div>
                <div class="bp-feat-title">Statistik Platform</div>
                <div class="bp-feat-sub">Grafik & analitik penggunaan</div>
              </div>
            </div>
            <div class="bp-feat-item">
              <div class="bp-feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
              </div>
              <div>
                <div class="bp-feat-title">Riwayat Workout</div>
                <div class="bp-feat-sub">Monitor & hapus sesi latihan</div>
              </div>
            </div>
          </div>

          <div class="bp-warning">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Semua aktivitas login tercatat dalam sistem
          </div>

        </div>
      </div>

      <!-- ═══ RIGHT: Form ═══ -->
      <div class="form-panel">
        <div class="form-box animate-in">

          <a href="/" class="btn-back">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Kembali ke Aplikasi
          </a>

          <div class="form-head">
            <div class="admin-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Administrator Access
            </div>
            <h2 class="form-title">Masuk<br>Admin</h2>
            <p class="form-sub">Gunakan kredensial admin kamu untuk melanjutkan</p>
          </div>

          <div v-if="errorMsg" class="alert-error">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ errorMsg }}
          </div>

          <form @submit.prevent="handleLogin" class="auth-form" novalidate>

            <div class="field" :class="{ error: errors.email }">
              <label class="field-lbl">Email Admin</label>
              <div class="field-wrap">
                <svg class="fi" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="admin@calsio.com"
                  class="field-input"
                  autocomplete="email"
                  @input="clearError('email')"
                />
              </div>
              <span v-if="errors.email" class="field-err">{{ errors.email }}</span>
            </div>

            <div class="field" :class="{ error: errors.password }">
              <label class="field-lbl">Password Admin</label>
              <div class="field-wrap">
                <svg class="fi" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  v-model="form.password"
                  :type="showPw ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="field-input"
                  autocomplete="current-password"
                  @input="clearError('password')"
                />
                <button type="button" @click="showPw = !showPw" class="pw-toggle">
                  <svg v-if="!showPw" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
              </div>
              <span v-if="errors.password" class="field-err">{{ errors.password }}</span>
            </div>

            <button type="submit" class="btn-submit" :disabled="loading">
              <span v-if="!loading" class="btn-inner">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M16 3L28 8V16C28 22.6 22.6 28.7 16 30C9.4 28.7 4 22.6 4 16V8L16 3Z"/></svg>
                Masuk ke Admin Panel
              </span>
              <span v-else class="btn-dots">
                <span class="d"></span><span class="d"></span><span class="d"></span>
              </span>
            </button>

          </form>

          <div class="form-footer">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Bukan admin? <a href="/login" class="footer-link">Login sebagai user biasa →</a>
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
  name: 'AdminLogin',
  emits: ['login-success'],

  data() {
    return {
      form    : { email: '', password: '' },
      errors  : {},
      errorMsg: '',
      loading : false,
      showPw  : false,
    }
  },

  methods: {
    clearError(field) {
      delete this.errors[field]
      this.errorMsg = ''
    },

    validate() {
      this.errors = {}
      if (!this.form.email)
        this.errors.email = 'Email wajib diisi'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email))
        this.errors.email = 'Format email tidak valid'
      if (!this.form.password)
        this.errors.password = 'Password wajib diisi'
      else if (this.form.password.length < 6)
        this.errors.password = 'Password minimal 6 karakter'
      return Object.keys(this.errors).length === 0
    },

    async handleLogin() {
      if (!this.validate()) return
      this.loading  = true
      this.errorMsg = ''
      try {
        const res = await axios.post(`${API_URL}/api/admin/login`, {
          email   : this.form.email,
          password: this.form.password,
        })
        if (res.data.token) {
          localStorage.setItem('admin_token', res.data.token)
          localStorage.setItem('admin_user', JSON.stringify(res.data.admin || {}))
          this.$emit('login-success')
        }
      } catch (err) {
        const status = err.response?.status
        if (status === 401 || status === 400)
          this.errorMsg = 'Email atau password salah'
        else if (err.code === 'ERR_NETWORK')
          this.errorMsg = 'Tidak bisa terhubung ke server'
        else
          this.errorMsg = err.response?.data?.message || 'Gagal masuk, coba lagi'
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

/* Grid pattern lebih gelap untuk admin */
.bg-grid {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(239,68,68,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(239,68,68,0.02) 1px, transparent 1px);
  background-size: 48px 48px; pointer-events: none; z-index: 0;
}

/* Warna glow merah untuk admin — beda dari user */
.glow { position: fixed; pointer-events: none; z-index: 0; border-radius: 50%; }
.glow--tl { top: -180px; left: -120px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%); }
.glow--br { bottom: -200px; right: -100px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(234,179,8,0.04) 0%, transparent 70%); }

.auth-layout {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* Brand panel lebih gelap untuk nuansa admin */
.brand-panel {
  background: #06080d;
  border-right: 1px solid rgba(239,68,68,0.1);
  display: flex; align-items: center; justify-content: center;
  padding: 60px 56px; position: relative; overflow: hidden;
}
.brand-panel::before {
  content: ''; position: absolute; inset: 0;
  background: repeating-linear-gradient(
    45deg, transparent, transparent 40px,
    rgba(239,68,68,0.012) 40px, rgba(239,68,68,0.012) 41px
  );
}
.brand-inner {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; gap: 36px;
  max-width: 380px; width: 100%;
}

.bp-logo { display: flex; align-items: center; gap: 14px; }
.bp-shield {
  display: flex; align-items: center; justify-content: center;
  filter: drop-shadow(0 0 8px rgba(234,179,8,0.3));
}
.bp-name { font-family: 'Barlow Condensed', sans-serif; font-size: 1.5rem; font-weight: 900; letter-spacing: 0.2em; color: #eab308; }
.bp-sub  { font-family: 'Barlow Condensed', sans-serif; font-size: 0.48rem; font-weight: 700; letter-spacing: 0.25em; color: rgba(239,68,68,0.5); text-transform: uppercase; margin-top: 2px; }

.bp-eyebrow {
  font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.16em; color: rgba(239,68,68,0.7); margin-bottom: 10px;
}
.bp-title {
  font-family: 'Barlow Condensed', sans-serif; font-size: 4rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.02em; line-height: 0.93;
  color: #fff; margin-bottom: 16px;
}
.bp-desc { font-size: 0.83rem; color: rgba(255,255,255,0.28); line-height: 1.7; }

/* Feature list — khas admin */
.bp-features {
  display: flex; flex-direction: column; gap: 12px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px; padding: 18px 20px;
}
.bp-feat-item {
  display: flex; align-items: center; gap: 12px;
}
.bp-feat-icon {
  width: 32px; height: 32px; flex-shrink: 0;
  background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.15);
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  color: #eab308;
}
.bp-feat-title { font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.6); }
.bp-feat-sub   { font-size: 0.68rem; color: rgba(255,255,255,0.25); margin-top: 1px; }

/* Warning box */
.bp-warning {
  display: flex; align-items: center; gap: 8px;
  background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15);
  border-radius: 10px; padding: 10px 14px;
  font-size: 0.72rem; color: rgba(239,68,68,0.6);
}

/* Form panel */
.form-panel {
  display: flex; align-items: center; justify-content: center;
  padding: 52px 56px; background: #080a0f;
}
.form-box {
  width: 100%; max-width: 400px;
  display: flex; flex-direction: column; gap: 26px;
}

.animate-in { animation: fadeUp 0.45s ease forwards; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

.btn-back {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.72rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.2s;
}
.btn-back:hover { color: rgba(255,255,255,0.6); }

/* Badge merah untuk admin — beda dari user yang kuning */
.admin-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2);
  border-radius: 999px; padding: 5px 12px;
  font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em; color: #ef4444;
  margin-bottom: 8px;
}

.form-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.6rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.04em;
  line-height: 0.95; color: #fff; margin-bottom: 8px;
}
.form-sub { font-size: 0.8rem; color: rgba(255,255,255,0.3); }

.alert-error {
  display: flex; align-items: center; gap: 8px;
  padding: 11px 14px; border-radius: 10px;
  font-size: 0.78rem; font-weight: 500;
  background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #fca5a5;
}

.auth-form { display: flex; flex-direction: column; gap: 16px; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field-lbl { font-size: 0.64rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.35); }

.field-wrap {
  position: relative; display: flex; align-items: center;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; transition: border-color 0.2s, background 0.2s;
}
/* Focus warna merah untuk admin */
.field-wrap:focus-within { border-color: rgba(239,68,68,0.4); background: rgba(239,68,68,0.03); }
.field.error .field-wrap  { border-color: rgba(239,68,68,0.5); }

.fi { position: absolute; left: 13px; color: rgba(255,255,255,0.2); pointer-events: none; flex-shrink: 0; }

.field-input {
  width: 100%; padding: 13px 14px 13px 38px;
  background: transparent; border: none; outline: none;
  color: #fff; font-family: 'Barlow', sans-serif; font-size: 0.88rem;
}
.field-input::placeholder { color: rgba(255,255,255,0.15); }

.pw-toggle {
  position: absolute; right: 12px; padding: 5px;
  background: transparent; border: none; border-radius: 4px;
  color: rgba(255,255,255,0.2); cursor: pointer; transition: color 0.15s;
  display: flex; align-items: center;
}
.pw-toggle:hover { color: rgba(255,255,255,0.6); }

.field-err { font-size: 0.63rem; color: #fca5a5; }

/* Tombol submit merah untuk admin — beda dari user yang kuning */
.btn-submit {
  width: 100%; padding: 14px; margin-top: 4px;
  background: #dc2626; border: none; border-radius: 11px;
  color: #fff; font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.05rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 0.1em;
  cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden;
}
.btn-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent 55%); }
.btn-submit:hover:not(:disabled) { background: #ef4444; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(220,38,38,0.4); }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }

.btn-dots { display: flex; align-items: center; justify-content: center; gap: 5px; }
.d { width: 7px; height: 7px; border-radius: 50%; background: #fff; animation: bounce 0.9s infinite; }
.d:nth-child(2){animation-delay:0.15s} .d:nth-child(3){animation-delay:0.3s}
@keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }

.form-footer {
  display: flex; align-items: center; gap: 6px; justify-content: center;
  font-size: 0.75rem; color: rgba(255,255,255,0.2);
}
.footer-link { color: rgba(234,179,8,0.5); text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: #eab308; }

@media (max-width: 860px) {
  .auth-layout { grid-template-columns: 1fr; }
  .brand-panel  { display: none; }
  .form-panel   { padding: 40px 24px; }
}
</style>