<template>
  <div class="landing-wrapper">
    <div class="bg-grid"></div>
    <div class="bg-glow"></div>

    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-brand" @click="$router.push('/')">
        <div class="brand-mark">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
              stroke="#eab308"
              stroke-width="1.2"
              stroke-linejoin="round"
              fill="rgba(234,179,8,0.06)"
            />
            <path
              d="M19 8L13 17H17.5L13 24L22 14H17L19 8Z"
              fill="#eab308"
            />
          </svg>
        </div>

        <div class="brand-text">
          <span class="brand-name">CALSIO</span>
   
        </div>
      </div>

      <div class="nav-links">
        <a href="#features">Fitur</a>
        <button @click="handleStart" class="nav-btn">Mulai →</button>
      </div>
    </nav>

    <!-- Sections -->
    <HeroSection @start="handleStart" @learn="scrollToFeatures" />
    <FeaturesSection />
    <CtaSection @start="handleStart" />

    <!-- Footer -->
    <footer class="footer">
      <span>© 2026 Calsio — Workout Tracker</span>
    </footer>
  </div>
</template>

<script>
import HeroSection from '../components/landing/HeroSection.vue'
import FeaturesSection from '../components/landing/FeaturesSection.vue'
import CtaSection from '../components/landing/CtaSection.vue'

export default {
  components: { HeroSection, FeaturesSection, CtaSection },

  methods: {
    handleStart() {
      const isSetup = localStorage.getItem('calsio_user_setup')
      if (isSetup) {
        this.$router.push({ name: 'Home' })
      } else {
        this.$router.push({ name: 'Setup' })
      }
    },
    scrollToFeatures() {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
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

.landing-wrapper {
  font-family: 'Barlow', sans-serif;
  min-height: 100vh;
  background: #080a0f;
  color: #fff;
  position: relative;
  overflow-x: hidden;
}

/* Background */
.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(234,179,8,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(234,179,8,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.bg-glow {
  position: fixed;
  top: -200px;
  right: -100px;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%);
  pointer-events: none;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px;
  background: rgba(8,10,15,0.75);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 6px rgba(234,179,8,0.35));
  transition: 0.25s;
}

.nav-brand:hover .brand-mark {
  filter: drop-shadow(0 0 12px rgba(234,179,8,0.6));
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.brand-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #eab308;
}

.brand-sub {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(234,179,8,0.35);
  text-transform: uppercase;
}

/* Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-links a {
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
}

.nav-links a:hover {
  color: #fff;
}

.nav-btn {
  padding: 9px 22px;
  background: #eab308;
  border: none;
  border-radius: 8px;
  color: #000;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
}

.nav-btn:hover {
  background: #facc15;
}

/* Footer */
.footer {
  text-align: center;
  padding: 24px;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-size: 0.75rem;
  color: rgba(255,255,255,0.2);
}
</style>