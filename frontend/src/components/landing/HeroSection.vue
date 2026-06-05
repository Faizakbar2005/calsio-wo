<template>
  <section class="hero">
    <div class="hero-badge">
      <svg xmlns="http://www.w3.org/2000/svg" class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
      <span>Workout Tracker</span>
    </div>

    <h1 class="hero-title">
      Latihan Lebih <span class="accent">Cerdas</span><br/>dengan Prediksi Kalori
    </h1>

    <p class="hero-sub">
      Calsio membantu kamu memprediksi kalori yang terbakar
      berdasarkan jenis latihan, durasi, dan data tubuhmu secara real-time.
    </p>

    <div class="hero-actions">
      <button @click="$emit('start')" class="btn-primary">Mulai Sekarang →</button>
      <button @click="$emit('learn')" class="btn-secondary">Pelajari Lebih Lanjut</button>
    </div>
  </section>
</template>

<script>
export default { emits: ['start', 'learn'] }
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
  gap: 24px;
}
.hero-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: rgba(234, 179, 8, 0.08);
  border: 1px solid rgba(234, 179, 8, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 999px;
  font-size: 0.75rem;
  color: #facc15;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.2s ease;
}
.hero-badge:hover {
  border-color: rgba(234, 179, 8, 0.5);
  box-shadow: 0 0 20px rgba(234, 179, 8, 0.25);
  transform: translateY(-1px);
}
.badge-icon {
  width: 16px;
  height: 16px;
  color: #eab308;
}
.hero-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.05;
  color: #fff;
}
.accent { color: #eab308; }
.hero-sub {
  max-width: 520px;
  font-size: 1rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
}
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.btn-primary {
  padding: 14px 32px;
  background: #eab308;
  border: none;
  border-radius: 12px;
  color: #000;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary:hover {
  background: #facc15;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(234,179,8,0.4);
}
.btn-secondary {
  padding: 14px 32px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 12px;
  color: rgba(255,255,255,0.6);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-secondary:hover {
  border-color: rgba(255,255,255,0.35);
  color: #fff;
}
</style>