<template>
  <div class="bottom-section">

    <!-- Bottom Row: Progress + Table -->
    <div class="bottom-row animate-in" :style="{ animationDelay: '0.2s' }">

      <!-- Progress per Muscle Group -->
      <div class="card">
        <div class="card-top-bar"></div>
        <div class="card-header-row">
          <div>
            <h3 class="card-title">Kalori per Muscle Group</h3>
            <p class="card-subtitle">Total kalori terbakar per area otot pada periode ini</p>
          </div>
          <div class="header-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(234,179,8,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12"/></svg>
          </div>
        </div>
        <div v-if="muscleProgress.length === 0" class="empty-chart" style="height:140px">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12"/></svg>
          <p>Belum ada data periode ini.</p>
        </div>
        <div v-else class="prog-list">
          <div v-for="(p, i) in muscleProgress" :key="p.name" class="prog-item" :style="{ animationDelay: (i * 0.06) + 's' }">
            <div class="prog-header">
              <div class="prog-name-wrap">
                <span class="prog-dot" :style="{ background: p.color }"></span>
                <span class="prog-name">{{ p.name }}</span>
              </div>
              <div class="prog-right">
                <span class="prog-kcal">{{ p.calories.toLocaleString('id-ID') }} kcal</span>
                <span class="badge" :class="p.calories >= targetPerSession ? 'badge-green' : 'badge-amber'">
                  {{ Math.min(Math.round(p.calories / targetPerSession * 100), 100) }}%
                </span>
              </div>
            </div>
            <div class="prog-track">
              <div
                class="prog-fill"
                :style="{
                  width: Math.min(p.calories / targetPerSession * 100, 100) + '%',
                  background: p.color,
                }"
              >
                <div class="prog-glow" :style="{ background: p.color }"></div>
              </div>
            </div>
            <div class="prog-note">
              <span v-if="p.calories >= targetPerSession" class="note-green">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Melampaui target per sesi
              </span>
              <span v-else class="note-amber">Kurang {{ (targetPerSession - p.calories).toLocaleString('id-ID') }} kcal dari target</span>
            </div>
          </div>
        </div>
        <div class="target-row">
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            Target kalori per sesi
          </span>
          <span class="target-val">{{ targetPerSession.toLocaleString('id-ID') }} kcal</span>
        </div>
      </div>

      <!-- History Table -->
      <div class="card">
        <div class="card-top-bar"></div>
        <div class="card-header-row">
          <div>
            <h3 class="card-title">Riwayat Sesi Terakhir</h3>
            <p class="card-subtitle">6 sesi terbaru dari semua waktu</p>
          </div>
          <div class="header-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(234,179,8,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
        </div>
        <div v-if="recentHistory.length === 0" class="empty-chart" style="height:140px">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <p>Belum ada riwayat tersimpan.</p>
        </div>
        <div v-else class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Gerakan</th>
                <th>Muscle</th>
                <th>Tipe</th>
                <th>Durasi</th>
                <th>Kalori</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(h, i) in recentHistory"
                :key="h.id"
                :class="{ 'row-new': h._isNew }"
                :style="{ animationDelay: (i * 0.05) + 's' }"
              >
                <td class="td-muted">{{ formatDate(h.created_at || h.createdAt) }}</td>
                <td>
                  <span class="exercise-name">{{ h.exercise_name || '—' }}</span>
                </td>
                <td>
                  <span class="muscle-pill">{{ h.muscle_group || '—' }}</span>
                </td>
                <td class="td-muted td-small">{{ h.workout_type || '—' }}</td>
                <td class="td-muted">{{ h.duration || 0 }}<span class="td-unit"> mnt</span></td>
                <td>
                  <span class="td-calories">{{ Math.round(h.calories) }}</span>
                  <span class="td-unit"> kcal</span>
                  <span v-if="h.calories >= targetPerSession" class="dot-green" title="Melampaui target">
                    <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#22c55e"/></svg>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-legend">
          <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#22c55e"/></svg>
          = melampaui target {{ targetPerSession.toLocaleString('id-ID') }} kcal
        </div>
      </div>

    </div>

    <!-- Streak Card -->
    <div class="card streak-card animate-in" :style="{ animationDelay: '0.26s' }">
      <div class="card-top-bar"></div>
      <div class="card-header-row">
        <div>
          <h3 class="card-title">Streak Latihan — 14 Hari Terakhir</h3>
          <p class="card-subtitle">Kotak hijau = ada sesi · Abu = tidak ada · Kuning = hari ini</p>
        </div>
        <div class="streak-count-wrap">
          <div class="streak-fire">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2.5-1.5-4.5-2.5-6 0 2-1 3.5-2.5 4.5C13 8 12 5 12 2z"/></svg>
          </div>
          <span class="streak-count">{{ streakCount }} hari</span>
          <span class="streak-sub">berturut-turut</span>
        </div>
      </div>
      <div class="streak-row">
        <div
          v-for="(s, i) in streakData"
          :key="i"
          :class="['streak-day', s.isToday ? 'today' : s.hit ? 'hit' : 'miss']"
          :title="`${s.dateStr}${s.hit ? ' ✓ Ada latihan' : ' · Tidak ada latihan'}`"
        >
          <span class="sd-day">{{ s.dayLabel }}</span>
          <span class="sd-indicator">
            <svg v-if="s.hit && !s.isToday" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span v-else-if="s.isToday" class="today-dot"></span>
            <span v-else class="miss-dot"></span>
          </span>
          <span class="sd-num">{{ s.dateNum }}</span>
        </div>
      </div>
      <div v-if="streakCount === 0" class="streak-nudge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Belum ada streak. Simpan sesi hari ini untuk mulai!
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DashboardBottom',
  props: {
    muscleProgress:   { type: Array,  default: () => [] },
    recentHistory:    { type: Array,  default: () => [] },
    streakData:       { type: Array,  default: () => [] },
    streakCount:      { type: Number, default: 0 },
    targetPerSession: { type: Number, default: 500 },
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '—'
      return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
    },
  },
}
</script>

<style scoped>
.bottom-section { display: flex; flex-direction: column; gap: 20px; }

.bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; padding: 26px; position: relative; overflow: hidden;
}
.card-top-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent);
}
.card-header-row {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 16px; gap: 12px;
}
.card-title    { font-family: 'Barlow Condensed', sans-serif; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.5); }
.card-subtitle { font-size: 0.7rem; color: rgba(255,255,255,0.22); margin-top: 4px; }
.header-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

/* Progress */
.prog-list { display: flex; flex-direction: column; gap: 14px; }
.prog-item  { animation: fadeInRow 0.4s ease forwards; opacity: 0; }
@keyframes fadeInRow { to { opacity: 1; } }
.prog-header   { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
.prog-name-wrap { display: flex; align-items: center; gap: 8px; }
.prog-dot  { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
.prog-name { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.5); }
.prog-right { display: flex; align-items: center; gap: 7px; }
.prog-kcal  { font-size: 0.75rem; color: rgba(255,255,255,0.45); }
.prog-track {
  height: 7px; background: rgba(255,255,255,0.06);
  border-radius: 999px; overflow: hidden; position: relative;
}
.prog-fill {
  height: 100%; border-radius: 999px;
  transition: width 0.8s cubic-bezier(.4,0,.2,1);
  position: relative; overflow: hidden;
}
.prog-glow {
  position: absolute; top: 0; right: 0; width: 30%; height: 100%;
  filter: blur(4px); opacity: 0.7;
}
.prog-note  { margin-top: 4px; font-size: 0.65rem; display: flex; align-items: center; gap: 4px; }
.note-green { color: rgba(34,197,94,0.7); display: flex; align-items: center; gap: 4px; }
.note-amber { color: rgba(234,179,8,0.55); }
.target-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06);
  font-size: 0.7rem; color: rgba(255,255,255,0.3);
  gap: 6px;
}
.target-val { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 0.95rem; color: #eab308; }

.badge { font-size: 0.58rem; padding: 2px 7px; border-radius: 5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
.badge-green { background: rgba(34,197,94,0.1);  color: #22c55e; }
.badge-amber { background: rgba(234,179,8,0.1);   color: #eab308; }

/* Table */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th {
  text-align: left; font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.12em; color: rgba(255,255,255,0.22);
  padding: 6px 8px; border-bottom: 1px solid rgba(255,255,255,0.07);
}
td {
  padding: 10px 8px; font-size: 0.8rem;
  border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle;
}
tr:last-child td  { border-bottom: none; }
tr:hover td { background: rgba(255,255,255,0.02); }

/* Row flash kuning untuk sesi baru */
.row-new td { animation: rowFlash 1.5s ease forwards; }
@keyframes rowFlash {
  0%   { background: rgba(234,179,8,0.15); }
  100% { background: transparent; }
}

.td-muted    { color: rgba(255,255,255,0.35); }
.td-small    { font-size: 0.72rem; }
.td-unit     { color: rgba(255,255,255,0.25); font-size: 0.7rem; }
.td-calories { font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 800; }
.exercise-name {
  font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.7);
  display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 110px;
}
.muscle-pill {
  font-size: 0.6rem; padding: 3px 9px;
  background: rgba(234,179,8,0.07); border: 1px solid rgba(234,179,8,0.2);
  border-radius: 999px; color: #eab308; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap;
}
.dot-green { margin-left: 4px; vertical-align: middle; }
.table-legend { margin-top: 12px; font-size: 0.65rem; color: rgba(255,255,255,0.22); display: flex; align-items: center; gap: 5px; }

/* Streak */
.streak-card { }
.streak-count-wrap  { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; flex-shrink: 0; }
.streak-fire { display: flex; align-items: center; justify-content: flex-end; animation: fireWiggle 1.5s ease-in-out infinite; }
@keyframes fireWiggle { 0%,100%{transform:rotate(-6deg)} 50%{transform:rotate(6deg)} }
.streak-count { font-family: 'Barlow Condensed', sans-serif; font-size: 1.4rem; font-weight: 900; color: #eab308; line-height: 1; }
.streak-sub   { font-size: 0.62rem; color: rgba(255,255,255,0.22); }

.streak-row { display: flex; gap: 5px; margin-top: 6px; }
.streak-day {
  flex: 1; min-height: 52px; border-radius: 10px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  cursor: default; transition: transform 0.15s;
}
.streak-day:hover { transform: translateY(-2px); }
.streak-day.hit   { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2); }
.streak-day.miss  { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.05); }
.streak-day.today { background: rgba(234,179,8,0.12); border: 1px solid rgba(234,179,8,0.35); }

.sd-day { font-size: 0.55rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(255,255,255,0.25); }
.sd-num { font-size: 0.6rem; color: rgba(255,255,255,0.2); }
.streak-day.hit   .sd-num { color: rgba(34,197,94,0.5); }
.streak-day.today .sd-num { color: rgba(234,179,8,0.6); }

.sd-indicator { display: flex; align-items: center; justify-content: center; height: 14px; }
.today-dot { width: 7px; height: 7px; border-radius: 50%; background: #eab308; animation: todayPulse 1.5s ease-in-out infinite; }
@keyframes todayPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }
.miss-dot  { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.1); }

.streak-nudge {
  margin-top: 14px; text-align: center; font-size: 0.75rem;
  color: rgba(234,179,8,0.55); background: rgba(234,179,8,0.04);
  border: 1px dashed rgba(234,179,8,0.15); border-radius: 10px; padding: 10px 16px;
  display: flex; align-items: center; justify-content: center; gap: 7px;
}

.empty-chart {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 10px; color: rgba(255,255,255,0.2); font-size: 0.8rem; text-align: center; padding: 0 20px;
}

.animate-in { opacity: 0; transform: translateY(14px); animation: fadeUp 0.5s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) { .bottom-row { grid-template-columns: 1fr; } }
</style>