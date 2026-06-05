<template>
  <section class="cta">
    <div class="cta-box">
      <div class="card-top-bar"></div>
      <h2 class="cta-title">Siap Mulai Latihan?</h2>
      <p class="cta-sub">Setup profilmu sekarang dan biarkan AI memprediksi kalori yang kamu bakar.</p>
      <button @click="$emit('start')" class="btn-cta">Mulai Gratis →</button>
    </div>
  </section>
</template>

<script>
export default { emits: ['start'] }
</script>

<style scoped>
.cta { padding: 60px 24px 100px; display: flex; justify-content: center; }
.cta-box {
  max-width: 600px; width: 100%; padding: 48px;
  background: #0d1117; border: 1px solid rgba(234,179,8,0.2);
  border-radius: 24px; text-align: center; position: relative; overflow: hidden;
}
.card-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, #eab308, transparent);
}
.cta-title {
  font-family: 'Barlow Condensed', sans-serif; font-size: 2.2rem;
  font-weight: 900; text-transform: uppercase; color: #fff; margin-bottom: 12px;
}
.cta-sub { font-size: 0.9rem; color: rgba(255,255,255,0.4); margin-bottom: 28px; line-height: 1.6; }
.btn-cta {
  padding: 15px 40px; background: #eab308; border: none; border-radius: 12px;
  color: #000; font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem;
  font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase;
  cursor: pointer; transition: all 0.2s;
}
.btn-cta:hover { background: #facc15; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(234,179,8,0.4); }
</style>