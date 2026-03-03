<template>
  <nav class="navbar">
    <div class="nav-brand">
      <div class="brand-mark">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer hex ring -->
          <path
            d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
            stroke="#eab308"
            stroke-width="1.2"
            stroke-linejoin="round"
            fill="rgba(234,179,8,0.06)"
          />
          <!-- Inner flame/calorie bolt -->
          <path
            d="M19 8L13 17H17.5L13 24L22 14H17L19 8Z"
            fill="#eab308"
            stroke="none"
          />
        </svg>
      </div>
      <div class="brand-text">
        <span class="brand-name">CALCIO</span>
        <span class="brand-sub">CALORIE TRACKER</span>
      </div>
    </div>

    <div class="nav-links">
      <router-link to="/" class="nav-link">Dashboard</router-link>
      <router-link to="/workout" class="nav-link">Workout</router-link>
      <router-link to="/buku-acuan" class="nav-link">Buku Acuan</router-link>
    </div>

    <div class="nav-date">{{ todayDate }}</div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    todayDate() {
      return new Date().toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@600&display=swap');

.navbar {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 40px;
  border-bottom: 1px solid rgba(234,179,8,0.1);
  background: rgba(8,10,15,0.85);
  backdrop-filter: blur(12px);
}

/* ── Brand ─────────────────────────────── */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 6px rgba(234,179,8,0.35));
  transition: filter 0.25s;
}
.nav-brand:hover .brand-mark {
  filter: drop-shadow(0 0 12px rgba(234,179,8,0.6));
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 2px;
}

.brand-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.45rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: #eab308;
  line-height: 1;
}

.brand-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: rgba(234,179,8,0.35);
  text-transform: uppercase;
}

/* ── Nav Links ─────────────────────────── */
.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  font-family: 'Barlow', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  padding: 7px 16px;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: rgba(234,179,8,0.08);
  color: rgba(255,255,255,0.7);
}

.nav-link.router-link-active {
  background: rgba(234,179,8,0.12);
  color: #eab308;
}

/* ── Date ──────────────────────────────── */
.nav-date {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.05em;
}

/* ── Responsive ────────────────────────── */
@media (max-width: 768px) {
  .navbar { padding: 14px 20px; }
  .nav-date { display: none; }
  .nav-link { padding: 6px 10px; font-size: 0.72rem; }
  .brand-name { font-size: 1.2rem; }
  .brand-sub { display: none; }
}
</style>