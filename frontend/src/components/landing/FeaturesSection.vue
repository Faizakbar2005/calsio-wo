<template>
  <section class="features" id="features">
    <div class="section-label">Fitur Unggulan</div>
    <h2 class="section-title">Semua yang Kamu Butuhkan</h2>
    <div class="features-grid">
      <div v-for="f in features" :key="f.title" class="feature-card">
        <div class="feature-icon" v-html="f.icon"></div>
        <h3 class="feature-title">{{ f.title }}</h3>
        <p class="feature-desc">{{ f.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>`,
          title: 'Prediksi Kalori',
          desc: 'Prediksi kalori yang kamu bakar berdasarkan data latihan dan kondisi fisikmu secara real-time.'
        },
        {
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
          title: 'Tracking Riwayat',
          desc: 'Catat setiap sesi latihan dan pantau progress kalori harianmu dengan visualisasi yang informatif.'
        },
        {
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
          title: 'Workout Session',
          desc: 'Pilih muscle group, atur set dan durasi, lalu dapatkan prediksi kalori secara instan.'
        },
        {
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
          title: 'Profil Personal',
          desc: 'Lengkapi data fisikmu agar prediksi makin akurat dan rekomendasi workout lebih tepat sasaran.'
        },
        {
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
          title: 'BMI & Target Kalori',
          desc: 'Hitung BMI otomatis dan dapatkan target kalori harian yang disesuaikan dengan gender dan kondisi tubuhmu.'
        },
        {
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
          title: 'Buku Acuan',
          desc: 'Akses referensi latihan gym dengan fitur pencarian untuk menemukan panduan yang kamu butuhkan.'
        },
      ]
    }
  }
}
</script>

<style scoped>
.features { padding: 80px 24px; max-width: 1100px; margin: 0 auto; text-align: center; }
.section-label {
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.15em; color: #eab308; margin-bottom: 12px;
}
.section-title {
  font-family: 'Barlow Condensed', sans-serif; font-size: 2.4rem;
  font-weight: 900; text-transform: uppercase; color: #fff; margin-bottom: 48px;
}
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.feature-card {
  padding: 28px; background: #0d1117;
  border: 1px solid rgba(255,255,255,0.07); border-radius: 16px;
  text-align: left; transition: border-color 0.2s;
}
.feature-card:hover { border-color: rgba(234,179,8,0.3); }
.feature-icon {
  width: 48px; height: 48px; background: rgba(234,179,8,0.1);
  border: 1px solid rgba(234,179,8,0.2); border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: #eab308; margin-bottom: 16px;
}
.feature-title {
  font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem;
  font-weight: 700; color: #fff; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.04em;
}
.feature-desc { font-size: 0.82rem; color: rgba(255,255,255,0.4); line-height: 1.6; }
@media (max-width: 768px) { .features-grid { grid-template-columns: 1fr; } }
</style>