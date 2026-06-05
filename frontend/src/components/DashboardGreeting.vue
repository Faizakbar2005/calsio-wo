<template>
  <div class="greeting animate-in">
    <div class="greeting-left">
      <div class="greeting-date">{{ dayLabel }} — {{ dateLabel }}</div>
      <h1 class="greeting-title">{{ greetingText }} 💪</h1>
      <p class="greeting-sub">Pantau progres latihan kamu — semua data dari sesi yang sudah kamu simpan.</p>
    </div>
    <div class="quick-guide">
      <div class="qg-step">
        <div class="qg-num">1</div>
        <span>Lakukan workout di halaman <strong>Workout</strong></span>
      </div>
      <div class="qg-arrow">→</div>
      <div class="qg-step">
        <div class="qg-num">2</div>
        <span>Klik <strong>Simpan ke Riwayat</strong> setelah prediksi</span>
      </div>
      <div class="qg-arrow">→</div>
      <div class="qg-step">
        <div class="qg-num">3</div>
        <span>Data otomatis muncul di dashboard ini</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardGreeting',
  computed: {
    greetingText() {
      const h = new Date().getHours()
      if (h < 11) return 'Selamat Pagi'
      if (h < 15) return 'Selamat Siang'
      if (h < 18) return 'Selamat Sore'
      return 'Selamat Malam'
    },
    dayLabel() {
      return new Date().toLocaleDateString('id-ID', { weekday: 'long' })
    },
    dateLabel() {
      return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    },
  },
}
</script>

<style scoped>
.greeting {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 24px; flex-wrap: wrap;
}
.greeting-date {
  font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.12em; color: rgba(234,179,8,0.5); margin-bottom: 6px;
}
.greeting-title {
  font-family: 'Barlow Condensed', sans-serif; font-size: 2.6rem;
  font-weight: 900; text-transform: uppercase; letter-spacing: 0.04em; line-height: 1;
}
.greeting-sub { margin-top: 8px; font-size: 0.87rem; color: rgba(255,255,255,0.35); }

.quick-guide {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; padding: 14px 20px; flex-shrink: 0;
}
.qg-step {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.78rem; color: rgba(255,255,255,0.4); max-width: 160px;
}
.qg-step strong { color: rgba(255,255,255,0.7); }
.qg-num {
  width: 22px; height: 22px; border-radius: 50%;
  background: rgba(234,179,8,0.15); border: 1px solid rgba(234,179,8,0.3);
  color: #eab308; font-size: 0.7rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.qg-arrow { color: rgba(255,255,255,0.2); font-size: 1rem; }

.animate-in { opacity: 0; transform: translateY(16px); animation: fadeUp 0.5s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1100px) { .quick-guide { display: none; } }
</style>