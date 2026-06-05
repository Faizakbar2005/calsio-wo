<template>
  <nav class="navbar">

    <!-- KIRI: Brand -->
    <router-link to="/dashboard" class="nav-brand">
      <div class="brand-mark">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="#eab308" stroke-width="1.2" stroke-linejoin="round" fill="rgba(234,179,8,0.06)"/>
          <path d="M19 8L13 17H17.5L13 24L22 14H17L19 8Z" fill="#eab308" stroke="none"/>
        </svg>
      </div>
      <div class="brand-text">
        <span class="brand-name">CALSIO</span>
      </div>
    </router-link>

    <!-- TENGAH: Nav Links (desktop) -->
    <div class="nav-center">
      <router-link to="/dashboard" class="nav-link">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        Dashboard
      </router-link>

      <router-link to="/workout" class="nav-link">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12"/></svg>
        Workout
      </router-link>

      <router-link to="/history" class="nav-link">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Riwayat
      </router-link>

      <router-link to="/buku-acuan" class="nav-link">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/></svg>
        Buku Acuan
      </router-link>
    </div>

    <!-- KANAN: Avatar dropdown + Hamburger -->
    <div class="nav-right">

      <!-- Avatar dropdown (desktop) -->
      <div class="avatar-wrap" @click="toggleMenu" ref="avatarWrap">
        <div class="avatar-btn" :class="{ open: menuOpen }">
          <div class="avatar-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <span v-if="userName" class="avatar-username">{{ userName }}</span>
          <svg class="chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>

        <transition name="drop">
          <div v-if="menuOpen" class="dropdown">
            <div v-if="userName" class="drop-user-info">
              <div class="drop-user-avatar">
                {{ userInitial }}
              </div>
              <div class="drop-user-detail">
                <span class="drop-user-name">{{ userName }}</span>
                <span class="drop-user-sub">Member</span>
              </div>
            </div>
            <div v-if="userName" class="drop-divider"></div>
            <router-link to="/profile" class="drop-item" @click="menuOpen = false">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              Profil Saya
            </router-link>
            <div class="drop-divider"></div>
            <button class="drop-item drop-item--danger" @click="handleLogout">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </transition>
      </div>

      <!-- Hamburger (mobile) -->
      <button class="hamburger" @click="mobileOpen = !mobileOpen" :class="{ open: mobileOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div v-if="mobileOpen" class="mobile-menu">

        <!-- User info mobile -->
        <div v-if="userName" class="mobile-user-info">
          <div class="mobile-user-avatar">{{ userInitial }}</div>
          <div class="mobile-user-detail">
            <span class="mobile-user-name">{{ userName }}</span>
            <span class="mobile-user-sub">Member</span>
          </div>
        </div>
        <div v-if="userName" class="mobile-divider"></div>

        <router-link to="/dashboard"  class="mobile-link" @click="mobileOpen = false">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          Dashboard
        </router-link>
        <router-link to="/workout"    class="mobile-link" @click="mobileOpen = false">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12"/></svg>
          Workout
        </router-link>
        <router-link to="/history"    class="mobile-link" @click="mobileOpen = false">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Riwayat
        </router-link>
        <router-link to="/buku-acuan" class="mobile-link" @click="mobileOpen = false">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/></svg>
          Buku Acuan
        </router-link>

        <div class="mobile-divider"></div>

        <router-link to="/profile" class="mobile-link" @click="mobileOpen = false">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          Profil Saya
        </router-link>
        <button class="mobile-link mobile-link--danger" @click="handleLogout">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </div>
    </transition>

  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  data() {
    return {
      menuOpen  : false,
      mobileOpen: false,
      userName  : '',
    }
  },

  computed: {
    userInitial() {
      return this.userName ? this.userName.charAt(0).toUpperCase() : '?'
    },
  },

  methods: {
    loadUserName() {
      try {
        const raw = localStorage.getItem('calsio_user_profile')
        if (raw) {
          const p = JSON.parse(raw)
          this.userName = p.name || ''
        }
      } catch {}
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },

    handleLogout() {
      this.menuOpen   = false
      this.mobileOpen = false
      localStorage.removeItem('calsio_token')
      localStorage.removeItem('calsio_user_setup')
      localStorage.removeItem('calsio_user_profile')
      localStorage.removeItem('calsio_user_id')
      localStorage.removeItem('calsio_visited')
      this.$router.push({ name: 'Landing' })
    },

    handleClickOutside(e) {
      if (this.$refs.avatarWrap && !this.$refs.avatarWrap.contains(e.target)) {
        this.menuOpen = false
      }
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
    this.loadUserName()
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  watch: {
    $route() {
      this.mobileOpen = false
      this.menuOpen   = false
      this.loadUserName() // refresh nama setiap pindah halaman
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;600&display=swap');

.navbar {
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  border-bottom: 1px solid rgba(234,179,8,0.1);
  background: rgba(8,10,15,0.9);
  backdrop-filter: blur(14px);
}

/* ── Brand ─────────────────────────────── */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  cursor: pointer;
  text-decoration: none;
}
.brand-mark {
  display: flex;
  align-items: center;
  filter: drop-shadow(0 0 6px rgba(234,179,8,0.35));
  transition: filter 0.25s;
}
.nav-brand:hover .brand-mark {
  filter: drop-shadow(0 0 12px rgba(234,179,8,0.6));
}
.brand-text { display: flex; flex-direction: column; line-height: 1; gap: 2px; }
.brand-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.2rem; font-weight: 900;
  letter-spacing: 0.15em; color: #eab308; line-height: 1;
}
.brand-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.5rem; font-weight: 700;
  letter-spacing: 0.2em; color: rgba(234,179,8,0.35);
  text-transform: uppercase;
}

/* ── Center ────────────────────────────── */
.nav-center {
  display: flex;
  align-items: center;
  gap: 2px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* ── Nav Links ─────────────────────────── */
.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Barlow', sans-serif;
  font-size: 0.78rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  padding: 7px 13px;
  border-radius: 8px;
  transition: all 0.2s;
  white-space: nowrap;
}
.nav-link:hover { background: rgba(234,179,8,0.08); color: rgba(255,255,255,0.7); }
.nav-link.router-link-active { background: rgba(234,179,8,0.12); color: #eab308; }
.nav-icon { flex-shrink: 0; opacity: 0.6; transition: opacity 0.2s; }
.nav-link:hover .nav-icon,
.nav-link.router-link-active .nav-icon { opacity: 1; }

/* ── Right ─────────────────────────────── */
.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* ── Avatar dropdown ───────────────────── */
.avatar-wrap {
  position: relative;
  user-select: none;
}

.avatar-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px 6px 6px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  color: rgba(255,255,255,0.45);
  cursor: pointer;
  transition: all 0.2s;
}
.avatar-btn:hover,
.avatar-btn.open {
  background: rgba(234,179,8,0.08);
  border-color: rgba(234,179,8,0.3);
  color: rgba(255,255,255,0.75);
}

.avatar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px; height: 26px;
  background: rgba(234,179,8,0.12);
  border: 1px solid rgba(234,179,8,0.25);
  border-radius: 7px;
  color: #eab308;
  flex-shrink: 0;
}

.avatar-username {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.8);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron {
  opacity: 0.4;
  transition: transform 0.2s, opacity 0.2s;
  flex-shrink: 0;
}
.avatar-btn.open .chevron {
  transform: rotate(180deg);
  opacity: 0.8;
}

/* Dropdown */
.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(234,179,8,0.05);
  z-index: 200;
}

/* User info di dalam dropdown */
.drop-user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px 12px;
}
.drop-user-avatar {
  width: 34px; height: 34px;
  background: linear-gradient(135deg, rgba(234,179,8,0.25), rgba(234,179,8,0.08));
  border: 1px solid rgba(234,179,8,0.3);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 900;
  color: #eab308;
  flex-shrink: 0;
}
.drop-user-detail {
  display: flex; flex-direction: column; gap: 2px; overflow: hidden;
}
.drop-user-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.95rem; font-weight: 700;
  color: #fff;
  letter-spacing: 0.04em;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.drop-user-sub {
  font-size: 0.62rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: rgba(234,179,8,0.5);
}

.drop-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 16px;
  font-family: 'Barlow', sans-serif;
  font-size: 0.82rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
}
.drop-item:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.85); }
.drop-item.router-link-active { color: #eab308; background: rgba(234,179,8,0.06); }
.drop-item--danger { color: rgba(239,68,68,0.6); }
.drop-item--danger:hover { background: rgba(239,68,68,0.08); color: #f87171; }
.drop-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 2px 0; }

/* Dropdown animation */
.drop-enter-active, .drop-leave-active { transition: opacity 0.15s, transform 0.15s; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── Hamburger ─────────────────────────── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px; height: 36px;
  padding: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.hamburger span {
  display: block;
  width: 100%; height: 1.5px;
  background: rgba(255,255,255,0.5);
  border-radius: 2px;
  transition: all 0.25s;
  transform-origin: center;
}
.hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
.hamburger:hover { border-color: rgba(234,179,8,0.3); background: rgba(234,179,8,0.06); }

/* ── Mobile Menu ───────────────────────── */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0; right: 0;
  background: rgba(8,10,15,0.97);
  border-bottom: 1px solid rgba(234,179,8,0.1);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  padding: 8px 16px 16px;
  z-index: 99;
  gap: 2px;
}

/* User info mobile */
.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: rgba(234,179,8,0.05);
  border: 1px solid rgba(234,179,8,0.1);
  border-radius: 10px;
  margin-bottom: 4px;
}
.mobile-user-avatar {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, rgba(234,179,8,0.2), rgba(234,179,8,0.06));
  border: 1px solid rgba(234,179,8,0.3);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 900;
  color: #eab308;
  flex-shrink: 0;
}
.mobile-user-detail {
  display: flex; flex-direction: column; gap: 2px;
}
.mobile-user-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem; font-weight: 700;
  color: #fff; letter-spacing: 0.04em;
}
.mobile-user-sub {
  font-size: 0.6rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: rgba(234,179,8,0.5);
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  font-family: 'Barlow', sans-serif;
  font-size: 0.85rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}
.mobile-link:hover { background: rgba(234,179,8,0.06); color: rgba(255,255,255,0.7); }
.mobile-link.router-link-active { background: rgba(234,179,8,0.1); color: #eab308; }
.mobile-link--danger { color: rgba(239,68,68,0.55); }
.mobile-link--danger:hover { background: rgba(239,68,68,0.07); color: #f87171; }
.mobile-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 6px 0; }

/* Mobile menu animation */
.slide-enter-active, .slide-leave-active { transition: opacity 0.2s, transform 0.2s; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Responsive ────────────────────────── */
@media (max-width: 960px) {
  .nav-center { display: none; }
  .hamburger  { display: flex; }
  .avatar-wrap { display: none; }
}

@media (max-width: 640px) {
  .navbar    { padding: 14px 20px; }
  .brand-sub { display: none; }
}
</style>