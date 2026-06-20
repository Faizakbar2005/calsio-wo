// ============================================================
//  homeGymExercises.js  — SINGLE SOURCE OF TRUTH
//  Dipakai oleh: workout.vue, TabGerakan, bukuData.js
// ============================================================

// ─── SVG Helpers ────────────────────────────────────────────
const ic = (body, size = 48) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${body}</svg>`

// ─── Image slug helper ──────────────────────────────────────
// Auto-generate path gambar dari nama exercise.
// "Push-Up" -> "/images/exercises/pushup.png"
// "DB Chest Press" -> "/images/exercises/dbchestpress.png"
// "Lompat Tali (Tanpa Tali)" -> "/images/exercises/lompattalitanpatali.png"
// Taruh file PNG/JPG/WebP di public/images/exercises/ dengan nama hasil slug ini.
// Jika file tidak ada, UI akan otomatis fallback ke ikon SVG bawaan (lihat WorkoutSteps.vue).
const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '')

const imgPath = (name) => `/images/exercises/${slugify(name)}.png`

// ─── Muscle Icons ────────────────────────────────────────────
export const muscleIcons = {
  Dada    : ic(`<path d="M8 16 Q10 8 24 12 Q38 8 40 16 L40 30 Q36 38 24 35 Q12 38 8 30 Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/><line x1="24" y1="12" x2="24" y2="35" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/><path d="M10 20 Q14 17 20 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M38 20 Q34 17 28 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`),
  Punggung: ic(`<line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M24 10 Q14 12 8 18 Q6 22 10 24 Q16 22 24 20" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.6"/><path d="M24 10 Q34 12 40 18 Q42 22 38 24 Q32 22 24 20" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.6"/><path d="M24 24 Q14 26 10 32 Q9 36 13 37 Q18 35 24 33" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.4"/><path d="M24 24 Q34 26 38 32 Q39 36 35 37 Q30 35 24 33" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.4"/>`),
  Kaki    : ic(`<path d="M14 6 Q11 6 10 10 L8 28 Q8 32 11 33 L13 42 Q14 44 16 43 L17 33 Q19 32 19 28 L18 10 Q17 6 14 6Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.6"/><path d="M34 6 Q37 6 38 10 L40 28 Q40 32 37 33 L35 42 Q34 44 32 43 L31 33 Q29 32 29 28 L30 10 Q31 6 34 6Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.6"/>`),
  Gluteus : ic(`<path d="M8 22 Q8 10 18 8 Q24 6 24 14 Q24 6 30 8 Q40 10 40 22 Q40 36 24 42 Q8 36 8 22Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/><path d="M10 24 Q14 18 20 20 Q22 24 18 28 Q14 30 10 24Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/><path d="M38 24 Q34 18 28 20 Q26 24 30 28 Q34 30 38 24Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>`),
  Deltoid : ic(`<path d="M6 28 Q6 18 14 14 Q20 10 24 16 Q24 10 28 10 Q38 14 42 24 Q40 32 34 30 Q28 24 24 24 Q20 24 14 30 Q8 32 6 28Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/><path d="M14 14 Q10 20 12 28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/><path d="M34 14 Q38 20 36 28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>`),
  Bisep   : ic(`<path d="M14 38 L15 28 Q14 18 18 12 Q22 6 26 8 Q32 10 32 18 Q32 24 28 28 L26 38Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/><path d="M18 12 Q16 16 18 20 Q22 14 26 16 Q28 18 26 22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>`),
  Trisep  : ic(`<path d="M16 8 Q14 8 13 12 L12 22 Q12 28 16 32 L18 38 Q20 42 24 42 Q28 42 30 38 L32 32 Q36 28 36 22 L35 12 Q34 8 32 8Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/><path d="M18 10 Q16 16 18 22 Q20 26 24 28 Q28 26 30 22 Q32 16 30 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.6"/>`),
  Perut   : ic(`<rect x="10" y="8"  width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><rect x="26" y="8"  width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="20" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><rect x="26" y="20" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="32" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><rect x="26" y="32" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>`),
  Kardio  : ic(`<path d="M24 38 L10 24 Q4 16 10 10 Q16 4 22 10 L24 12 L26 10 Q32 4 38 10 Q44 16 38 24 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.8"/><polyline points="6,26 12,26 15,20 19,34 22,26 25,28 27,24 30,24 34,26 42,26" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`),
  Core    : ic(`<ellipse cx="24" cy="24" rx="16" ry="20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.8"/><ellipse cx="24" cy="24" rx="8" ry="12" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.4"/><line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity="0.4"/>`),
  Hamstring: ic(`<path d="M14 6 Q11 6 10 10 L8 30 Q8 36 12 38 L14 44 Q15 46 17 45 L18 38 Q20 36 20 30 L18 10 Q17 6 14 6Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.6"/><path d="M34 6 Q37 6 38 10 L40 30 Q40 36 36 38 L34 44 Q33 46 31 45 L30 38 Q28 36 28 30 L30 10 Q31 6 34 6Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.6"/>`),
  Betis   : ic(`<path d="M16 8 Q13 10 12 18 L14 36 Q15 42 18 42 Q21 42 22 36 L24 18 Q23 10 20 8Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.6"/><path d="M32 8 Q35 10 36 18 L34 36 Q33 42 30 42 Q27 42 26 36 L24 18 Q25 10 28 8Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.6"/>`),
  Trapezius: ic(`<path d="M10 8 Q24 4 38 8 L42 18 Q36 22 24 20 Q12 22 6 18 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.8"/><path d="M10 8 L6 18 Q8 28 16 30" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.5"/><path d="M38 8 L42 18 Q40 28 32 30" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.5"/>`),
}

// ─── Exercise Icons (workout-style SVG) ──────────────────────
const exIcons = {
  push   : ic(`<circle cx="36" cy="10" r="5" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/><path d="M36 15 L36 22 L10 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 28 L10 34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M36 22 L36 34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="34" x2="42" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>`),
  pull   : ic(`<line x1="6" y1="8" x2="42" y2="8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="32" y1="8" x2="32" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16 16 Q24 20 32 16" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="24" cy="28" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M24 33 L22 44 M24 33 L26 44" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`),
  squat  : ic(`<circle cx="32" cy="8" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M32 13 L30 20 L20 26 L14 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 20 L34 30 L28 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 26 L28 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>`),
  lunge  : ic(`<circle cx="24" cy="7" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M24 12 L22 20 L14 30 L14 40" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 20 L32 28 L38 40" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`),
  plank  : ic(`<circle cx="38" cy="12" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M38 17 L38 26 L10 26" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 26 L10 34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="34" x2="44" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>`),
  crunch : ic(`<circle cx="24" cy="10" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M24 15 Q20 22 14 26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M24 15 Q28 22 34 26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 26 L10 36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M34 26 L38 36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 36 L40 36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>`),
  jump   : ic(`<circle cx="24" cy="7" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M24 12 L24 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 16 L24 20 L40 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 38 L24 28 L34 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`),
  dumbbell: ic(`<rect x="4" y="20" width="6" height="10" rx="2" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="22" width="4" height="6" rx="1" fill="currentColor" stroke="currentColor" stroke-width="1"/><rect x="10" y="22" width="4" height="6" rx="1" fill="currentColor" stroke="currentColor" stroke-width="1"/><path d="M14 25 Q20 10 30 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="33" cy="10" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M30 14 L32 22 L36 30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),
  row    : ic(`<circle cx="36" cy="10" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M36 15 L34 24 Q30 30 24 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M24 30 L12 26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="4" y="24" width="10" height="6" rx="2" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M34 24 L40 28" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>`),
  hip    : ic(`<rect x="4" y="24" width="16" height="8" rx="3" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="14" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M14 19 L14 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 24 Q20 30 30 28 L38 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M38 22 L42 30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),
  press  : ic(`<circle cx="24" cy="28" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M24 23 L24 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 18 L34 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><rect x="8" y="14" width="8" height="8" rx="2" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><rect x="32" y="14" width="8" height="8" rx="2" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M16 38 L24 32 L32 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`),
  deadlift: ic(`<circle cx="6" cy="36" r="4" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><circle cx="42" cy="36" r="4" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="36" x2="38" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="30" cy="12" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M30 17 L28 26 L24 36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M28 26 L36 30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),
  burpee : ic(`<circle cx="24" cy="7" r="4" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M24 11 L20 18 L10 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 18 L28 18 L38 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 22 L8 34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M38 22 L40 34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 34 L42 34" stroke="currentColor" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/><path d="M24 7 L24 4 L28 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>`),
  raise  : ic(`<circle cx="24" cy="32" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M24 27 L24 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 24 L24 22 L40 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="2" y="20" width="8" height="6" rx="2" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><rect x="38" y="20" width="8" height="6" rx="2" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M16 36 L24 28 L32 36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`),
  swing  : ic(`<circle cx="24" cy="8" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M24 13 L22 22 L16 34 L24 42 L32 34 L26 22 Z" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M20 22 L28 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/><rect x="18" y="36" width="12" height="6" rx="2" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>`),
  curl   : ic(`<circle cx="34" cy="10" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M34 15 Q34 24 26 28 Q18 30 14 26" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><rect x="4" y="22" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/><path d="M34 22 L40 28" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>`),
  generic: ic(`<circle cx="24" cy="12" r="6" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/><path d="M24 18 L20 28 L14 40" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 18 L28 28 L34 40" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 26 L30 26" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`),
}

// ─── Color map per primary muscle ────────────────────────────
const COLOR = {
  Dada    : '#eab308',
  Punggung: '#60a5fa',
  Kaki    : '#22c55e',
  Gluteus : '#f43f5e',
  Deltoid : '#818cf8',
  Bisep   : '#f472b6',
  Trisep  : '#fb923c',
  Perut   : '#a78bfa',
  Core    : '#a78bfa',
  Kardio  : '#34d399',
  Hamstring:'#10b981',
  Betis   : '#06b6d4',
  Trapezius:'#8b5cf6',
}
const color = (muscles) => COLOR[muscles[0]] || '#eab308'

// ─── Level helper ────────────────────────────────────────────
// beginner | intermediate | advanced
const lvl = (muscles, met) => {
  if (met >= 9) return 'advanced'
  if (met >= 6) return 'intermediate'
  return 'beginner'
}

// ──────────────────────────────────────────────────────────────
//  NO EQUIPMENT
// ──────────────────────────────────────────────────────────────
export const NO_EQUIPMENT = [

  // ── CHEST ─────────────────────────────────────────────────
  {
    name: 'Push-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Dada','Trisep','Deltoid'], met: 8.0,
    color: COLOR.Dada, level: 'beginner',
    icon: exIcons.push, muscleIcon: muscleIcons.Dada,
    desc: 'Gerakan dasar mendorong tubuh dari lantai. Efektif melatih otot dada, trisep, dan bahu secara bersamaan.',
    steps: ['Posisi plank dengan tangan selebar bahu','Turunkan dada hingga hampir menyentuh lantai','Siku membentuk sudut 45° dari tubuh','Dorong kembali ke atas dengan kuat','Jaga tubuh lurus dari kepala hingga tumit'],
    tip: 'Jaga siku tidak terlalu keluar. Fokus squeeze dada di puncak gerakan.',
  },
  {
    name: 'Wide Push-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Dada','Deltoid'], met: 8.0,
    color: COLOR.Dada, level: 'beginner',
    icon: exIcons.push, muscleIcon: muscleIcons.Dada,
    desc: 'Push-up dengan tangan lebih lebar dari bahu. Fokus lebih besar pada otot dada bagian luar.',
    steps: ['Tangan lebih lebar dari bahu','Jari mengarah sedikit keluar','Turunkan dada ke lantai','Dorong naik dengan kuat','Jaga tubuh tetap lurus'],
    tip: 'Semakin lebar tangan, semakin besar fokus ke dada luar.',
  },
  {
    name: 'Diamond Push-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Trisep','Dada'], met: 8.5,
    color: COLOR.Trisep, level: 'intermediate',
    icon: exIcons.push, muscleIcon: muscleIcons.Trisep,
    desc: 'Tangan membentuk berlian di bawah dada. Sangat efektif mengaktifkan trisep dan dada bagian tengah.',
    steps: ['Bentuk berlian dengan ibu jari dan telunjuk','Posisi di bawah dada','Turunkan dengan siku rapat ke badan','Dorong naik kuat-kuat','Fokus squeeze trisep'],
    tip: 'Ini push-up paling efektif untuk trisep. Jaga siku tidak keluar.',
  },
  {
    name: 'Decline Push-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Dada','Deltoid','Trisep'], met: 8.5,
    color: COLOR.Dada, level: 'intermediate',
    icon: exIcons.push, muscleIcon: muscleIcons.Dada,
    desc: 'Kaki lebih tinggi dari tangan. Menargetkan dada bagian atas dan bahu lebih intensif.',
    steps: ['Taruh kaki di kursi atau sofa','Tangan di lantai selebar bahu','Turunkan dada ke lantai','Dorong naik hingga lengan lurus','Jaga tubuh tetap lurus'],
    tip: 'Semakin tinggi kaki, semakin besar fokus ke dada atas dan bahu.',
  },
  {
    name: 'Incline Push-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Dada','Trisep'], met: 6.0,
    color: COLOR.Dada, level: 'beginner',
    icon: exIcons.push, muscleIcon: muscleIcons.Dada,
    desc: 'Tangan bertumpu pada permukaan tinggi. Cocok untuk pemula atau menargetkan dada bagian bawah.',
    steps: ['Tangan di tepi meja atau sofa','Kaki lurus di belakang','Turunkan dada ke permukaan','Dorong naik kuat-kuat','Jaga punggung lurus'],
    tip: 'Semakin rendah permukaan, semakin sulit gerakannya.',
  },
  {
    name: 'Pike Push-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Deltoid','Trisep','Dada'], met: 8.0,
    color: COLOR.Deltoid, level: 'intermediate',
    icon: exIcons.press, muscleIcon: muscleIcons.Deltoid,
    desc: 'Posisi tubuh membentuk huruf V terbalik, tekuk siku ke samping. Gerakan terbaik untuk bahu tanpa alat.',
    steps: ['Posisi downward dog, pinggul tinggi','Tangan selebar bahu','Tekuk siku ke samping','Turunkan kepala ke arah lantai','Dorong naik kembali'],
    tip: 'Bayangkan sedang melakukan overhead press versi tubuh kamu.',
  },
  {
    name: 'Close Grip Push-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Trisep','Dada'], met: 8.0,
    color: COLOR.Trisep, level: 'beginner',
    icon: exIcons.push, muscleIcon: muscleIcons.Trisep,
    desc: 'Push-up dengan tangan berdekatan di bawah dada. Menargetkan trisep dan dada bagian tengah.',
    steps: ['Tangan berdekatan di bawah dada','Siku rapat ke sisi tubuh saat turun','Turunkan dada mendekati tangan','Dorong naik dengan kuat','Squeeze trisep di atas'],
    tip: 'Bedakan dengan diamond: close grip siku lebih ke belakang.',
  },

  // ── BACK ──────────────────────────────────────────────────
  {
    name: 'Superman Hold', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Punggung','Gluteus'], met: 4.0,
    color: COLOR.Punggung, level: 'beginner',
    icon: exIcons.generic, muscleIcon: muscleIcons.Punggung,
    desc: 'Berbaring tengkurap, angkat lengan dan kaki bersamaan. Memperkuat otot punggung bawah dan bokong.',
    steps: ['Berbaring tengkurap, lengan lurus ke depan','Angkat lengan, dada, dan kaki bersamaan','Tahan 2-3 detik di puncak','Turunkan perlahan','Ulangi dengan kontrol'],
    tip: 'Fokus pada squeeze punggung bawah dan bokong, bukan kecepatan.',
  },
  {
    name: 'Back Extension', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Punggung','Gluteus'], met: 4.5,
    color: COLOR.Punggung, level: 'beginner',
    icon: exIcons.generic, muscleIcon: muscleIcons.Punggung,
    desc: 'Berbaring tengkurap, angkat dada dari lantai menggunakan otot punggung. Memperkuat lower back.',
    steps: ['Berbaring tengkurap, tangan di belakang kepala','Angkat dada dan bahu dari lantai','Gunakan otot punggung, bukan leher','Tahan 1-2 detik di atas','Turunkan perlahan'],
    tip: 'Jangan paksa leher ke atas. Gerakan harus dari punggung bawah.',
  },
  {
    name: 'Bird Dog', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Punggung','Core','Gluteus'], met: 3.5,
    color: COLOR.Punggung, level: 'beginner',
    icon: exIcons.generic, muscleIcon: muscleIcons.Punggung,
    desc: 'Posisi merangkak, luruskan lengan dan kaki berlawanan. Bagus untuk stabilitas punggung dan core.',
    steps: ['Posisi merangkak, punggung lurus','Luruskan lengan kanan dan kaki kiri bersamaan','Tahan 3-5 detik','Kembali ke posisi awal','Ganti sisi dan ulangi'],
    tip: 'Jaga pinggul tidak miring. Fokus pada stabilitas, bukan ketinggian angkatan.',
  },
  {
    name: 'Table Row', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Punggung','Bisep','Trapezius'], met: 5.0,
    color: COLOR.Punggung, level: 'beginner',
    icon: exIcons.row, muscleIcon: muscleIcons.Punggung,
    desc: 'Berbaring di bawah meja, tarik badan ke atas menyentuh tepi meja. Alternatif pull-up untuk pemula.',
    steps: ['Masuk di bawah meja yang stabil','Pegang tepi meja dengan tangan selebar bahu','Badan lurus dari kepala ke tumit','Tarik dada ke arah meja','Turunkan perlahan dengan kontrol'],
    tip: 'Pastikan meja benar-benar stabil sebelum mulai.',
  },
  {
    name: 'Inverted Row', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Punggung','Bisep','Trapezius'], met: 6.0,
    color: COLOR.Punggung, level: 'intermediate',
    icon: exIcons.row, muscleIcon: muscleIcons.Punggung,
    desc: 'Berbaring di bawah meja stabil, tarik tubuh ke atas. Latihan pulling efektif untuk punggung dan bisep.',
    steps: ['Pegang tepi meja, badan lurus','Kaki lurus ke depan di lantai','Tarik dada ke arah meja dengan siku ke belakang','Squeeze punggung di puncak','Turunkan perlahan'],
    tip: 'Semakin horizontal posisi tubuh, semakin sulit gerakannya.',
  },
  {
    name: 'Chin-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Bisep','Punggung','Trapezius'], met: 8.0,
    color: COLOR.Bisep, level: 'intermediate',
    icon: exIcons.pull, muscleIcon: muscleIcons.Bisep,
    desc: 'Pull-up dengan pegangan supinasi (telapak menghadap wajah). Bisep dan punggung bekerja maksimal.',
    steps: ['Pegang palang dengan telapak menghadap wajah','Gantung dengan lengan lurus','Tarik tubuh hingga dagu melewati palang','Siku mengarah ke bawah saat menarik','Turunkan perlahan'],
    tip: 'Chin-up lebih mudah dari pull-up karena bisep terlibat lebih besar.',
  },

  // ── SHOULDER ──────────────────────────────────────────────
  {
    name: 'Shoulder Taps', equipment: 'no_equipment', workoutType: 'HIIT',
    muscles: ['Deltoid','Core','Dada'], met: 7.5,
    color: COLOR.Deltoid, level: 'intermediate',
    icon: exIcons.plank, muscleIcon: muscleIcons.Deltoid,
    desc: 'Posisi plank, sentuh bahu bergantian dengan tangan lawan. Melatih stabilitas bahu dan core.',
    steps: ['Mulai dari posisi push-up tinggi','Angkat tangan kanan sentuh bahu kiri','Kembali ke posisi awal','Angkat tangan kiri sentuh bahu kanan','Jaga pinggul tidak berayun'],
    tip: 'Kunci core kuat-kuat untuk mencegah tubuh bergoyang.',
  },
  {
    name: 'Wall Push-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Deltoid','Dada','Trisep'], met: 3.5,
    color: COLOR.Deltoid, level: 'beginner',
    icon: exIcons.push, muscleIcon: muscleIcons.Deltoid,
    desc: 'Push-up berdiri menghadap dinding. Cocok untuk pemula, melatih bahu dan dada dengan intensitas rendah.',
    steps: ['Berdiri menghadap dinding, jarak lengan','Tangan di dinding setinggi bahu','Tekuk siku, dada ke dinding','Dorong kembali ke posisi awal','Jaga tubuh lurus'],
    tip: 'Ideal untuk rehabilitasi atau pemula total.',
  },
  {
    name: 'Arm Circle', equipment: 'no_equipment', workoutType: 'Cardio',
    muscles: ['Deltoid'], met: 3.0,
    color: COLOR.Deltoid, level: 'beginner',
    icon: exIcons.raise, muscleIcon: muscleIcons.Deltoid,
    desc: 'Putar lengan dalam lingkaran besar ke depan dan belakang. Pemanasan bahu yang efektif.',
    steps: ['Berdiri tegak, lengan rentang ke samping','Putar ke depan dalam lingkaran kecil 15x','Putar ke belakang 15x','Perbesar lingkaran untuk intensitas lebih','Ganti arah dan ulangi'],
    tip: 'Mulai dengan lingkaran kecil, perbesar secara bertahap.',
  },

  // ── BICEP ─────────────────────────────────────────────────
  {
    name: 'Bicep Isometric Curl', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Bisep'], met: 3.0,
    color: COLOR.Bisep, level: 'beginner',
    icon: exIcons.curl, muscleIcon: muscleIcons.Bisep,
    desc: 'Tekan telapak tangan ke bawah meja sambil coba angkat. Latihan isometrik intensif untuk bisep.',
    steps: ['Duduk di depan meja','Letakkan telapak tangan di bawah tepi meja','Tekan ke atas seolah ingin mengangkat meja','Tahan 10-15 detik dengan kontraksi penuh','Rileks dan ulangi'],
    tip: 'Kontraksi isometrik sangat efektif untuk kekuatan bisep meski tanpa gerakan.',
  },
  {
    name: 'Towel Curl', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Bisep'], met: 3.5,
    color: COLOR.Bisep, level: 'beginner',
    icon: exIcons.curl, muscleIcon: muscleIcons.Bisep,
    desc: 'Injak ujung handuk, tarik ujung lain ke atas seperti curl. Resistansi dari beban tubuh sendiri.',
    steps: ['Lipat handuk, injak bagian tengah dengan satu kaki','Pegang kedua ujung handuk','Tekuk siku ke atas melawan resistansi kaki','Turunkan perlahan','Ganti kaki dan ulangi'],
    tip: 'Atur resistansi dengan meningkatkan tekanan kaki ke handuk.',
  },

  // ── TRICEP ────────────────────────────────────────────────
  {
    name: 'Tricep Dips', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Trisep','Deltoid','Dada'], met: 7.5,
    color: COLOR.Trisep, level: 'intermediate',
    icon: exIcons.press, muscleIcon: muscleIcons.Trisep,
    desc: 'Tangan bertumpu di kursi atau meja, turunkan badan dengan menekuk siku. Sangat efektif untuk trisep.',
    steps: ['Duduk di tepi kursi, tangan di pinggir','Geser ke depan hingga bokong melayang','Tekuk siku ke belakang, turunkan badan','Turunkan hingga siku 90°','Dorong kembali ke atas'],
    tip: 'Jaga siku ke belakang, bukan ke samping, untuk isolasi trisep optimal.',
  },
  {
    name: 'Bench Dips', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Trisep','Deltoid'], met: 6.0,
    color: COLOR.Trisep, level: 'intermediate',
    icon: exIcons.press, muscleIcon: muscleIcons.Trisep,
    desc: 'Kaki diluruskan ke depan, tangan di kursi atau bangku, turunkan badan.',
    steps: ['Kaki lurus ke depan di lantai','Tangan di tepi kursi di belakang tubuh','Turunkan badan dengan menekuk siku','Turunkan hingga siku sejajar bahu','Dorong kembali naik'],
    tip: 'Semakin jauh kaki dari kursi, semakin besar intensitasnya.',
  },

  // ── ABS / CORE ────────────────────────────────────────────
  {
    name: 'Crunch', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Perut','Core'], met: 5.0,
    color: COLOR.Perut, level: 'beginner',
    icon: exIcons.crunch, muscleIcon: muscleIcons.Perut,
    desc: 'Gerakan dasar mengangkat bahu dari lantai. Efektif melatih rektus abdominis bagian atas.',
    steps: ['Berbaring, lutut ditekuk, kaki di lantai','Tangan di belakang kepala','Angkat bahu dari lantai dengan kontraksi perut','Jangan tarik kepala dengan tangan','Turunkan perlahan'],
    tip: 'Fokus pada kontraksi perut, bukan ketinggian angkatan.',
  },
  {
    name: 'Sit-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Perut','Core','Hip Flexor'], met: 5.5,
    color: COLOR.Perut, level: 'beginner',
    icon: exIcons.crunch, muscleIcon: muscleIcons.Perut,
    desc: 'Angkat seluruh punggung dari lantai hingga duduk tegak.',
    steps: ['Berbaring, lutut ditekuk','Tangan silang di dada atau di kepala','Angkat punggung hingga duduk tegak','Turunkan perlahan hingga berbaring kembali','Ulangi dengan ritme konsisten'],
    tip: 'Sit-up melatih core lebih komprehensif dari crunch.',
  },
  {
    name: 'Plank', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Core','Perut','Deltoid'], met: 5.0,
    color: COLOR.Core, level: 'beginner',
    icon: exIcons.plank, muscleIcon: muscleIcons.Core,
    desc: 'Posisi tubuh lurus seperti papan. Melatih seluruh core secara isometrik.',
    steps: ['Posisi push-up, tumpuan di lengan bawah','Siku tepat di bawah bahu','Tubuh lurus dari kepala ke tumit','Perut dikencangkan','Tahan posisi selama durasi yang ditentukan'],
    tip: 'Bayangkan ada gelas berisi air di punggungmu. Jaga agar tidak tumpah.',
  },
  {
    name: 'Bicycle Crunch', equipment: 'no_equipment', workoutType: 'HIIT',
    muscles: ['Perut','Oblique','Core'], met: 8.0,
    color: COLOR.Perut, level: 'intermediate',
    icon: exIcons.crunch, muscleIcon: muscleIcons.Perut,
    desc: 'Gerakan mengayuh sambil memutar badan. Melatih abs dan obliques secara bersamaan.',
    steps: ['Berbaring, tangan di belakang kepala','Angkat bahu dan kaki dari lantai','Bawa lutut kanan ke siku kiri','Ganti ke lutut kiri dan siku kanan','Gerakan bergantian seperti mengayuh sepeda'],
    tip: 'Perlambat gerakan untuk fokus pada kontraksi obliques.',
  },
  {
    name: 'Leg Raise', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Perut','Core','Hip Flexor'], met: 5.5,
    color: COLOR.Perut, level: 'beginner',
    icon: exIcons.crunch, muscleIcon: muscleIcons.Perut,
    desc: 'Berbaring, angkat kedua kaki lurus ke atas. Menargetkan lower abs dan hip flexor.',
    steps: ['Berbaring lurus, tangan di sisi tubuh','Angkat kedua kaki lurus hingga 90°','Turunkan perlahan tanpa menyentuh lantai','Jaga punggung bawah tetap menempel lantai','Ulangi dengan kontrol penuh'],
    tip: 'Jika terlalu berat, tekuk sedikit lututnya.',
  },
  {
    name: 'Russian Twist', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Oblique','Core','Perut'], met: 6.0,
    color: COLOR.Perut, level: 'intermediate',
    icon: exIcons.crunch, muscleIcon: muscleIcons.Perut,
    desc: 'Duduk setengah, putar badan ke kiri dan kanan. Gerakan efektif untuk obliques dan rotasi core.',
    steps: ['Duduk dengan kaki sedikit terangkat','Punggung sedikit condong ke belakang','Putar badan ke kanan hingga tangan menyentuh lantai','Putar ke kiri','Jaga kaki tidak menyentuh lantai'],
    tip: 'Tambahkan buku atau botol air untuk menambah resistansi.',
  },
  {
    name: 'Mountain Climber', equipment: 'no_equipment', workoutType: 'HIIT',
    muscles: ['Core','Perut','Kaki','Deltoid'], met: 10.0,
    color: COLOR.Core, level: 'intermediate',
    icon: exIcons.burpee, muscleIcon: muscleIcons.Core,
    desc: 'Posisi plank, ganti lutut menuju dada dengan cepat. Kardio dan core dalam satu gerakan.',
    steps: ['Mulai dari posisi push-up tinggi','Bawa lutut kanan menuju dada','Kembali dan langsung ganti lutut kiri','Gerakan bergantian seperti lari di tempat','Jaga pinggul tidak naik'],
    tip: 'Semakin cepat = kardio lebih tinggi. Lebih lambat = fokus core.',
  },
  {
    name: 'Flutter Kick', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Perut','Core','Hip Flexor'], met: 6.0,
    color: COLOR.Perut, level: 'beginner',
    icon: exIcons.crunch, muscleIcon: muscleIcons.Perut,
    desc: 'Berbaring, kaki terangkat sedikit dan tendang bergantian. Efektif untuk lower abs.',
    steps: ['Berbaring lurus, tangan di sisi tubuh','Angkat kaki 15-20cm dari lantai','Tendang bergantian naik turun dengan gerakan kecil','Jaga kaki tidak menyentuh lantai','Pertahankan punggung bawah menempel lantai'],
    tip: 'Semakin rendah kaki dari lantai, semakin intens untuk lower abs.',
  },
  {
    name: 'Side Plank', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Oblique','Core'], met: 4.5,
    color: COLOR.Core, level: 'intermediate',
    icon: exIcons.plank, muscleIcon: muscleIcons.Core,
    desc: 'Plank miring bertumpu pada satu lengan. Mengisolasi otot samping perut.',
    steps: ['Berbaring miring, tumpuan lengan bawah','Siku di bawah bahu','Angkat pinggul hingga tubuh membentuk garis lurus','Tahan posisi','Ganti sisi'],
    tip: 'Jaga pinggul tidak turun. Itu pertanda core bekerja.',
  },
  {
    name: 'V-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Perut','Core','Hip Flexor'], met: 7.0,
    color: COLOR.Perut, level: 'advanced',
    icon: exIcons.crunch, muscleIcon: muscleIcons.Perut,
    desc: 'Angkat lengan dan kaki bersamaan membentuk huruf V. Gerakan full abs yang sangat intens.',
    steps: ['Berbaring lurus, lengan di atas kepala','Angkat lengan dan kaki bersamaan','Coba sentuh jari kaki dengan tangan','Turunkan perlahan','Jaga punggung tidak memantul di lantai'],
    tip: 'Gerak lambat saat turun jauh lebih efektif dari gerak cepat.',
  },

  // ── LEGS ──────────────────────────────────────────────────
  {
    name: 'Squat', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Kaki','Quad','Gluteus','Hamstring'], met: 5.0,
    color: COLOR.Kaki, level: 'beginner',
    icon: exIcons.squat, muscleIcon: muscleIcons.Kaki,
    desc: 'Gerakan duduk berdiri tanpa beban. Melatih quad, hamstring, dan gluteus secara komprehensif.',
    steps: ['Kaki selebar bahu, jari sedikit keluar','Rentangkan tangan ke depan','Turunkan pinggul seolah duduk di kursi','Lutut mengikuti arah jari kaki','Turunkan hingga paha sejajar lantai, lalu naik'],
    tip: 'Jaga dada tegak dan berat badan di tumit.',
  },
  {
    name: 'Jump Squat', equipment: 'no_equipment', workoutType: 'HIIT',
    muscles: ['Kaki','Quad','Gluteus','Betis'], met: 12.0,
    color: COLOR.Kaki, level: 'intermediate',
    icon: exIcons.jump, muscleIcon: muscleIcons.Kaki,
    desc: 'Squat yang diakhiri lompatan eksplosif. Meningkatkan kekuatan, daya ledak, dan membakar kalori tinggi.',
    steps: ['Turunkan ke posisi squat penuh','Dorong eksplosif ke atas','Lompat setinggi mungkin','Mendarat lembut pada bola kaki','Langsung turun ke squat berikutnya'],
    tip: 'Mendarat dengan lembut untuk melindungi lutut.',
  },
  {
    name: 'Lunge', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Kaki','Quad','Gluteus','Hamstring'], met: 5.5,
    color: COLOR.Kaki, level: 'beginner',
    icon: exIcons.lunge, muscleIcon: muscleIcons.Kaki,
    desc: 'Langkah panjang ke depan dengan lutut hampir menyentuh lantai. Melatih kaki secara unilateral.',
    steps: ['Berdiri tegak, kaki rapat','Langkahkan satu kaki ke depan panjang','Turunkan lutut belakang mendekati lantai','Lutut depan tidak melewati jari kaki','Dorong kembali dan ganti sisi'],
    tip: 'Jaga torso tegak lurus. Condong ke depan mengurangi aktivasi glutes.',
  },
  {
    name: 'Reverse Lunge', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Kaki','Gluteus','Hamstring','Quad'], met: 5.5,
    color: COLOR.Kaki, level: 'beginner',
    icon: exIcons.lunge, muscleIcon: muscleIcons.Kaki,
    desc: 'Langkah ke belakang dengan lutut mendekati lantai. Lebih aman untuk lutut, fokus lebih pada gluteus.',
    steps: ['Berdiri tegak','Langkahkan satu kaki jauh ke belakang','Turunkan lutut belakang mendekati lantai','Lutut depan tetap di atas tumit','Kembali dan ganti sisi'],
    tip: 'Reverse lunge lebih aman dari forward lunge untuk lutut bermasalah.',
  },
  {
    name: 'Glute Bridge', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Gluteus','Hamstring','Core'], met: 4.0,
    color: COLOR.Gluteus, level: 'beginner',
    icon: exIcons.hip, muscleIcon: muscleIcons.Gluteus,
    desc: 'Berbaring, angkat pinggul ke atas dengan kekuatan gluteus. Isolasi terbaik untuk bokong tanpa alat.',
    steps: ['Berbaring, lutut ditekuk, kaki di lantai','Tangan di sisi tubuh','Dorong pinggul ke atas dengan kekuatan gluteus','Squeeze bokong kuat di atas','Turunkan perlahan'],
    tip: 'Tahan 1-2 detik di atas untuk kontraksi maksimal.',
  },
  {
    name: 'Wall Sit', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Kaki','Quad','Gluteus'], met: 4.0,
    color: COLOR.Kaki, level: 'beginner',
    icon: exIcons.squat, muscleIcon: muscleIcons.Kaki,
    desc: 'Duduk bersandar tembok dengan paha sejajar lantai. Latihan isometrik intensif untuk quad.',
    steps: ['Bersandar di tembok','Turunkan posisi duduk dengan paha sejajar lantai','Lutut membentuk sudut 90°','Tahan posisi selama mungkin','Jaga punggung tetap rata di tembok'],
    tip: 'Jangan turun terlalu rendah dari 90°. Ini membantu melindungi lutut.',
  },
  {
    name: 'Calf Raise', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Betis'], met: 3.0,
    color: COLOR.Betis, level: 'beginner',
    icon: exIcons.raise, muscleIcon: muscleIcons.Betis,
    desc: 'Naik turun pada ujung kaki. Isolasi terbaik untuk otot betis.',
    steps: ['Berdiri tegak, kaki selebar bahu','Pegang dinding untuk keseimbangan','Naik ke ujung kaki setinggi mungkin','Tahan 1 detik di atas','Turunkan perlahan'],
    tip: 'Lakukan di tepi tangga untuk ROM yang lebih besar.',
  },
  {
    name: 'Donkey Kick', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Gluteus','Hamstring'], met: 4.5,
    color: COLOR.Gluteus, level: 'beginner',
    icon: exIcons.hip, muscleIcon: muscleIcons.Gluteus,
    desc: 'Posisi merangkak, tendang kaki ke belakang atas. Isolasi gluteus yang sangat efektif.',
    steps: ['Posisi merangkak, punggung lurus','Angkat satu kaki ke belakang dengan lutut ditekuk 90°','Dorong ke atas setinggi mungkin','Squeeze bokong di puncak','Turunkan dan ganti sisi'],
    tip: 'Jaga pinggul sejajar lantai. Jangan putar pinggul untuk menambah tinggi angkatan.',
  },
  {
    name: 'Fire Hydrant', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Gluteus','Hip Abductor'], met: 4.0,
    color: COLOR.Gluteus, level: 'beginner',
    icon: exIcons.hip, muscleIcon: muscleIcons.Gluteus,
    desc: 'Posisi merangkak, angkat lutut ke samping. Menargetkan gluteus medius dan hip abductor.',
    steps: ['Posisi merangkak','Angkat satu lutut ke samping setinggi bahu','Lutut tetap ditekuk 90°','Tahan 1-2 detik di atas','Turunkan dan ganti sisi'],
    tip: 'Gerakan ini sangat bagus untuk kesehatan pinggul dan stabilitas gluteus.',
  },
  {
    name: 'Step-Up', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Kaki','Quad','Gluteus','Hamstring'], met: 6.0,
    color: COLOR.Kaki, level: 'beginner',
    icon: exIcons.squat, muscleIcon: muscleIcons.Kaki,
    desc: 'Naiki dan turuni kursi atau anak tangga bergantian. Melatih kaki unilateral dan keseimbangan.',
    steps: ['Berdiri di depan kursi atau anak tangga','Langkahkan satu kaki ke atas','Ikuti dengan kaki kedua','Turunkan kaki pertama','Ikuti kaki kedua, ganti kaki terdepan'],
    tip: 'Dorong dengan kaki yang di atas, bukan tendang dengan kaki di bawah.',
  },
  {
    name: 'Sumo Squat', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Kaki','Gluteus','Hamstring'], met: 5.5,
    color: COLOR.Kaki, level: 'beginner',
    icon: exIcons.squat, muscleIcon: muscleIcons.Kaki,
    desc: 'Squat dengan kaki lebar dan jari mengarah keluar. Menargetkan paha dalam dan gluteus lebih luas.',
    steps: ['Kaki lebih lebar dari bahu','Jari kaki mengarah keluar 45°','Turunkan pinggul lurus ke bawah','Lutut mengikuti arah jari kaki','Dorong naik melalui tumit'],
    tip: 'Variasi squat yang lebih ramah untuk pinggul.',
  },
  {
    name: 'Lateral Lunge', equipment: 'no_equipment', workoutType: 'Strength',
    muscles: ['Kaki','Quad','Gluteus','Hamstring'], met: 5.5,
    color: COLOR.Kaki, level: 'intermediate',
    icon: exIcons.lunge, muscleIcon: muscleIcons.Kaki,
    desc: 'Langkah ke samping dengan lutut ditekuk. Melatih paha dalam dan luar serta gluteus dari sudut berbeda.',
    steps: ['Berdiri tegak, kaki rapat','Langkah panjang ke satu sisi','Tekuk lutut kaki yang melangkah','Kaki lainnya tetap lurus','Dorong kembali dan ganti sisi'],
    tip: 'Gerakan lateral sangat bagus untuk stabilitas pinggul yang sering diabaikan.',
  },

  // ── CARDIO / FULL BODY ────────────────────────────────────
  {
    name: 'Burpee', equipment: 'no_equipment', workoutType: 'HIIT',
    muscles: ['Kardio','Core','Dada','Kaki'], met: 12.0,
    color: COLOR.Kardio, level: 'advanced',
    icon: exIcons.burpee, muscleIcon: muscleIcons.Kardio,
    desc: 'Kombinasi squat, push-up, dan lompatan. Raja latihan HIIT yang membakar kalori tertinggi.',
    steps: ['Berdiri tegak','Squat dan letakkan tangan di lantai','Lompat kaki ke belakang ke posisi plank','Lakukan satu push-up','Lompat kaki ke depan lalu loncat ke atas'],
    tip: 'Kuasai setiap komponen secara terpisah sebelum menggabungkan.',
  },
  {
    name: 'Jumping Jack', equipment: 'no_equipment', workoutType: 'Cardio',
    muscles: ['Kardio','Kaki','Deltoid'], met: 8.0,
    color: COLOR.Kardio, level: 'beginner',
    icon: exIcons.jump, muscleIcon: muscleIcons.Kardio,
    desc: 'Loncat sambil buka tutup kaki dan tangan. Pemanasan klasik yang meningkatkan denyut jantung.',
    steps: ['Berdiri tegak, kaki rapat, tangan di sisi tubuh','Lompat sambil buka kaki selebar bahu','Bersamaan angkat tangan ke atas','Lompat kembali ke posisi awal','Ulangi dengan ritme konsisten'],
    tip: 'Mendarat dengan lembut pada bola kaki untuk meminimalkan impak sendi.',
  },
  {
    name: 'High Knees', equipment: 'no_equipment', workoutType: 'Cardio',
    muscles: ['Kardio','Core','Kaki','Hip Flexor'], met: 10.0,
    color: COLOR.Kardio, level: 'beginner',
    icon: exIcons.jump, muscleIcon: muscleIcons.Kardio,
    desc: 'Lari di tempat dengan lutut terangkat tinggi. Latihan kardio intensif yang juga melatih core.',
    steps: ['Berdiri tegak','Angkat lutut kanan hingga setinggi pinggul','Turunkan dan langsung angkat lutut kiri','Gerakan bergantian cepat seperti lari','Ayunkan tangan berlawanan dengan kaki'],
    tip: 'Jaga tempo tinggi untuk memaksimalkan manfaat kardio.',
  },
  {
    name: 'Lompat Tali (Tanpa Tali)', equipment: 'no_equipment', workoutType: 'Cardio',
    muscles: ['Kardio','Betis','Kaki'], met: 12.0,
    color: COLOR.Kardio, level: 'beginner',
    icon: exIcons.jump, muscleIcon: muscleIcons.Kardio,
    desc: 'Simulasi lompat tali tanpa tali. Melatih koordinasi, daya tahan, dan membakar kalori.',
    steps: ['Berdiri tegak, tangan di sisi tubuh','Gerakkan pergelangan tangan seperti memutar tali','Lompat kecil bergantian kaki','Jaga tempo konsisten','Pertahankan postur tegak'],
    tip: 'Lompatan kecil lebih efisien dari lompatan besar.',
  },
  {
    name: 'Squat Jump', equipment: 'no_equipment', workoutType: 'HIIT',
    muscles: ['Kaki','Quad','Gluteus','Betis','Kardio'], met: 12.0,
    color: COLOR.Kaki, level: 'intermediate',
    icon: exIcons.jump, muscleIcon: muscleIcons.Kaki,
    desc: 'Lompat dari posisi squat ke atas secara eksplosif. Melatih daya ledak kaki dan meningkatkan denyut jantung.',
    steps: ['Mulai dari posisi squat penuh','Hentakkan kaki ke lantai secara eksplosif','Lompat setinggi mungkin','Mendarat lembut dan langsung squat kembali','Ulangi tanpa jeda'],
    tip: 'Gunakan lengan untuk membantu momentum lompatan.',
  },
]

// ──────────────────────────────────────────────────────────────
//  WITH DUMBBELL
// ──────────────────────────────────────────────────────────────
export const WITH_DUMBBELL = [

  // ── CHEST ─────────────────────────────────────────────────
  {
    name: 'DB Chest Press', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Dada','Trisep','Deltoid'], met: 6.0,
    color: COLOR.Dada, level: 'beginner',
    icon: exIcons.press, muscleIcon: muscleIcons.Dada,
    desc: 'Berbaring, dorong dumbbell ke atas. Gerakan bench press versi rumahan yang sangat efektif untuk dada.',
    steps: ['Berbaring, dumbbell di tangan setinggi dada','Siku membentuk 90°','Dorong dumbbell ke atas hingga lengan lurus','Jangan kunci siku','Turunkan perlahan ke posisi awal'],
    tip: 'Bayangkan mendorong dada ke atas, bukan tangan ke atas.',
  },
  {
    name: 'DB Incline Press', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Dada','Deltoid','Trisep'], met: 6.0,
    color: COLOR.Dada, level: 'intermediate',
    icon: exIcons.press, muscleIcon: muscleIcons.Dada,
    desc: 'Press dengan punggung bersandar miring ke atas. Menargetkan dada bagian atas dan bahu.',
    steps: ['Sandarkan punggung di sudut 45° (sofa/bantal)','Dumbbell di tangan setinggi dada','Dorong ke atas dan sedikit ke dalam','Turunkan perlahan ke posisi awal','Fokus pada stretch dada atas'],
    tip: 'Sudut 30-45° adalah posisi terbaik untuk dada atas.',
  },
  {
    name: 'DB Flye', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Dada','Deltoid'], met: 5.0,
    color: COLOR.Dada, level: 'intermediate',
    icon: exIcons.raise, muscleIcon: muscleIcons.Dada,
    desc: 'Berbaring, buka tutup lengan seperti memeluk pohon. Stretch dan kontraksi dada yang optimal.',
    steps: ['Berbaring, dumbbell di atas dengan siku sedikit ditekuk','Buka lengan ke samping dengan arc melengkung','Turunkan hingga terasa stretch di dada','Tutup kembali ke atas dengan kekuatan dada','Squeeze dada di atas'],
    tip: 'Siku harus sedikit ditekuk sepanjang gerakan untuk melindungi sendi.',
  },
  {
    name: 'DB Pullover', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Dada','Punggung','Trisep'], met: 5.5,
    color: COLOR.Dada, level: 'intermediate',
    icon: exIcons.generic, muscleIcon: muscleIcons.Dada,
    desc: 'Berbaring, ayunkan dumbbell dari atas kepala ke dada. Melatih dada dan lat secara unik.',
    steps: ['Berbaring, pegang satu dumbbell dengan kedua tangan di atas dada','Turunkan dumbbell ke belakang kepala dengan siku sedikit ditekuk','Rasakan stretch di dada dan lat','Tarik kembali ke atas dada','Jaga siku tidak terlalu lebar'],
    tip: 'Gerakan ini langka — melatih dada dan lat dalam satu gerakan.',
  },
  {
    name: 'DB Push-Up (Handles)', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Dada','Trisep','Deltoid'], met: 8.0,
    color: COLOR.Dada, level: 'intermediate',
    icon: exIcons.push, muscleIcon: muscleIcons.Dada,
    desc: 'Push-up dengan tangan menggenggam dumbbell. Menambah ROM dan stabilitas lebih.',
    steps: ['Letakkan dumbbell di lantai selebar bahu','Pegang dumbbell dalam posisi push-up','Lakukan push-up normal','Tambahan ROM dari ketinggian dumbbell','Jaga stabilitas pergelangan tangan'],
    tip: 'Gunakan dumbbell heksagonal agar tidak menggelinding.',
  },

  // ── BACK ──────────────────────────────────────────────────
  {
    name: 'DB Row', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Punggung','Bisep','Trapezius'], met: 5.5,
    color: COLOR.Punggung, level: 'beginner',
    icon: exIcons.row, muscleIcon: muscleIcons.Punggung,
    desc: 'Bertumpu satu tangan di lutut, tarik dumbbell ke pinggang. Melatih punggung dan bisep.',
    steps: ['Letakkan satu lutut dan tangan di kursi','Pegang dumbbell dengan tangan lainnya','Punggung lurus dan sejajar lantai','Tarik dumbbell ke pinggang, siku ke atas','Turunkan perlahan dan ulangi'],
    tip: 'Bayangkan menarik siku ke belakang, bukan mengangkat tangan.',
  },
  {
    name: 'DB Bent Over Row', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Punggung','Bisep','Trapezius','Erector Spinae'], met: 6.0,
    color: COLOR.Punggung, level: 'intermediate',
    icon: exIcons.row, muscleIcon: muscleIcons.Punggung,
    desc: 'Bungkuk dengan punggung lurus, tarik kedua dumbbell ke perut. Compound movement terbaik untuk punggung.',
    steps: ['Berdiri, bungkuk 45°, punggung lurus','Pegang dumbbell di kedua tangan','Tarik kedua dumbbell ke perut dengan siku ke samping','Squeeze punggung atas di puncak','Turunkan perlahan'],
    tip: 'Jaga punggung lurus. Membungkuk bisa menyebabkan cedera.',
  },
  {
    name: 'DB Deadlift', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Punggung','Hamstring','Gluteus','Erector Spinae'], met: 7.0,
    color: COLOR.Punggung, level: 'intermediate',
    icon: exIcons.deadlift, muscleIcon: muscleIcons.Punggung,
    desc: 'Angkat dumbbell dari lantai dengan postur tegak. Gerakan compound terbaik untuk punggung dan kaki belakang.',
    steps: ['Dumbbell di lantai di depan kaki','Bungkuk, punggung lurus, pegang dumbbell','Dorong lantai dengan kaki sambil angkat badan','Kunci pinggul di atas','Turunkan dengan hinge pinggul ke belakang'],
    tip: 'Bayangkan mendorong bumi ke bawah, bukan mengangkat dumbbell ke atas.',
  },
  {
    name: 'DB Shrug', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Trapezius','Punggung'], met: 4.0,
    color: COLOR.Trapezius, level: 'beginner',
    icon: exIcons.raise, muscleIcon: muscleIcons.Trapezius,
    desc: 'Angkat bahu setinggi mungkin sambil pegang dumbbell. Isolasi langsung untuk trapezius atas.',
    steps: ['Berdiri tegak, dumbbell di kedua tangan','Tangan di sisi tubuh','Angkat bahu setinggi mungkin ke arah telinga','Tahan 1-2 detik di atas','Turunkan perlahan'],
    tip: 'Jangan putar bahu — gerak lurus atas bawah saja.',
  },
  {
    name: 'DB Reverse Flye', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Punggung','Deltoid','Trapezius'], met: 4.5,
    color: COLOR.Punggung, level: 'intermediate',
    icon: exIcons.raise, muscleIcon: muscleIcons.Punggung,
    desc: 'Bungkuk, buka lengan ke samping. Menargetkan punggung atas, rear deltoid, dan trapezius.',
    steps: ['Berdiri, bungkuk 45°','Dumbbell menggantung di depan','Buka lengan ke samping dengan siku sedikit ditekuk','Angkat hingga lengan sejajar lantai','Turunkan perlahan'],
    tip: 'Ini latihan terbaik untuk rear deltoid yang sering diabaikan.',
  },
  {
    name: 'DB Romanian Deadlift', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Hamstring','Gluteus','Punggung','Erector Spinae'], met: 6.5,
    color: COLOR.Hamstring, level: 'intermediate',
    icon: exIcons.deadlift, muscleIcon: muscleIcons.Hamstring,
    desc: 'Hinge pinggul ke belakang, turunkan dumbbell di depan kaki. Terbaik untuk hamstring dan lower back.',
    steps: ['Berdiri tegak, dumbbell di depan paha','Hinge pinggul ke belakang, punggung lurus','Turunkan dumbbell di depan kaki hingga terasa stretch hamstring','Dorong pinggul ke depan untuk naik','Squeeze bokong di posisi atas'],
    tip: 'Beda dari deadlift biasa: lutut hampir lurus dan fokus pada hamstring.',
  },

  // ── SHOULDER ──────────────────────────────────────────────
  {
    name: 'DB Shoulder Press', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Deltoid','Trisep','Trapezius'], met: 6.0,
    color: COLOR.Deltoid, level: 'beginner',
    icon: exIcons.press, muscleIcon: muscleIcons.Deltoid,
    desc: 'Dorong dumbbell ke atas dari posisi bahu. Compound movement terbaik untuk bahu keseluruhan.',
    steps: ['Duduk atau berdiri, dumbbell di ketinggian bahu','Telapak menghadap ke depan','Dorong ke atas hingga lengan hampir lurus','Jangan kunci siku','Turunkan perlahan ke posisi awal'],
    tip: 'Duduk lebih aman untuk punggung bawah.',
  },
  {
    name: 'DB Lateral Raise', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Deltoid'], met: 4.0,
    color: COLOR.Deltoid, level: 'beginner',
    icon: exIcons.raise, muscleIcon: muscleIcons.Deltoid,
    desc: 'Angkat dumbbell ke samping setinggi bahu. Isolasi terbaik untuk bahu medial yang membentuk V-taper.',
    steps: ['Berdiri, dumbbell di sisi tubuh','Angkat ke samping dengan siku sedikit ditekuk','Angkat hingga sejajar bahu','Jangan angkat lebih tinggi dari bahu','Turunkan perlahan'],
    tip: 'Bayangkan menuangkan air dari ceret saat mengangkat.',
  },
  {
    name: 'DB Front Raise', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Deltoid','Dada'], met: 4.0,
    color: COLOR.Deltoid, level: 'beginner',
    icon: exIcons.raise, muscleIcon: muscleIcons.Deltoid,
    desc: 'Angkat dumbbell ke depan setinggi bahu. Menargetkan bahu anterior dan bagian atas dada.',
    steps: ['Berdiri, dumbbell di depan paha','Angkat satu atau dua dumbbell ke depan','Angkat hingga sejajar bahu','Jaga siku sedikit ditekuk','Turunkan perlahan'],
    tip: 'Bahu anterior sudah banyak bekerja di push dan press, jangan over-train.',
  },
  {
    name: 'DB Arnold Press', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Deltoid','Trisep'], met: 5.5,
    color: COLOR.Deltoid, level: 'intermediate',
    icon: exIcons.press, muscleIcon: muscleIcons.Deltoid,
    desc: 'Press dengan rotasi lengan dari depan ke samping. Melatih ketiga kepala deltoid dalam satu gerakan.',
    steps: ['Duduk, dumbbell setinggi dagu, telapak menghadap wajah','Buka lengan ke samping sambil dorong ke atas','Di atas telapak menghadap ke depan','Turunkan dengan rotasi berlawanan','Satu gerakan penuh = satu rep'],
    tip: 'Gerakan rotasi ini yang membedakan Arnold Press dari shoulder press biasa.',
  },
  {
    name: 'DB Upright Row', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Deltoid','Trapezius','Bisep'], met: 5.0,
    color: COLOR.Deltoid, level: 'intermediate',
    icon: exIcons.row, muscleIcon: muscleIcons.Deltoid,
    desc: 'Tarik dumbbell ke atas menuju dagu. Melatih bahu atas dan trapezius secara bersamaan.',
    steps: ['Berdiri, dumbbell di depan paha','Tarik ke atas menuju dagu dengan siku lebih tinggi dari tangan','Siku mengarah ke luar','Angkat hingga siku setinggi bahu','Turunkan perlahan'],
    tip: 'Jaga grip tidak terlalu sempit untuk menghindari impingement bahu.',
  },

  // ── BICEP ─────────────────────────────────────────────────
  {
    name: 'DB Bicep Curl', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Bisep'], met: 4.5,
    color: COLOR.Bisep, level: 'beginner',
    icon: exIcons.curl, muscleIcon: muscleIcons.Bisep,
    desc: 'Curl dumbbell ke atas sambil putar pergelangan tangan. Gerakan klasik isolasi bisep.',
    steps: ['Berdiri, dumbbell di sisi tubuh, telapak menghadap depan','Siku menempel di sisi tubuh','Angkat dumbbell ke atas dengan fleksi siku','Squeeze bisep di puncak','Turunkan perlahan'],
    tip: 'Fase turun (eksentrik) sama pentingnya untuk membangun otot.',
  },
  {
    name: 'DB Hammer Curl', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Bisep','Brachialis'], met: 4.5,
    color: COLOR.Bisep, level: 'beginner',
    icon: exIcons.curl, muscleIcon: muscleIcons.Bisep,
    desc: 'Curl dengan telapak menghadap ke dalam. Melatih brachialis dan bisep untuk lengan lebih tebal.',
    steps: ['Berdiri, dumbbell di sisi tubuh, telapak menghadap ke dalam','Angkat dumbbell seperti memalu','Siku tetap di sisi tubuh','Squeeze di puncak','Turunkan perlahan'],
    tip: 'Hammer curl lebih baik untuk ketebalan lengan dari bicep curl biasa.',
  },
  {
    name: 'DB Concentration Curl', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Bisep'], met: 4.0,
    color: COLOR.Bisep, level: 'beginner',
    icon: exIcons.curl, muscleIcon: muscleIcons.Bisep,
    desc: 'Duduk, siku bertumpu di paha, curl ke atas. Isolasi bisep paling fokus.',
    steps: ['Duduk di tepi kursi','Kaki sedikit terbuka','Siku kanan bertumpu di paha kanan','Curl dumbbell ke atas','Squeeze bisep keras di puncak'],
    tip: 'Ini gerakan terbaik untuk puncak bisep (bisep peak).',
  },
  {
    name: 'DB Alternating Curl', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Bisep'], met: 4.5,
    color: COLOR.Bisep, level: 'beginner',
    icon: exIcons.curl, muscleIcon: muscleIcons.Bisep,
    desc: 'Curl dumbbell bergantian kiri dan kanan. Memastikan setiap lengan bekerja secara independen.',
    steps: ['Berdiri, dumbbell di kedua tangan','Curl tangan kanan ke atas','Turunkan dan langsung curl tangan kiri','Bergantian dengan ritme konsisten','Siku tetap di sisi tubuh'],
    tip: 'Alternatif ini lebih baik untuk keseimbangan kekuatan kedua lengan.',
  },
  {
    name: 'DB Zottman Curl', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Bisep','Brachialis','Brachioradialis'], met: 4.5,
    color: COLOR.Bisep, level: 'intermediate',
    icon: exIcons.curl, muscleIcon: muscleIcons.Bisep,
    desc: 'Curl ke atas dengan supinasi, turun dengan pronasi. Melatih bisep dan lengan bawah efisien.',
    steps: ['Mulai dengan telapak menghadap atas','Curl ke atas seperti biasa','Di atas, putar telapak ke bawah','Turunkan dengan telapak menghadap bawah','Di bawah, putar kembali telapak ke atas'],
    tip: 'Satu gerakan ini menggantikan dua latihan: curl dan reverse curl.',
  },

  // ── TRICEP ────────────────────────────────────────────────
  {
    name: 'DB Overhead Tricep Extension', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Trisep'], met: 4.5,
    color: COLOR.Trisep, level: 'beginner',
    icon: exIcons.press, muscleIcon: muscleIcons.Trisep,
    desc: 'Angkat dumbbell di atas kepala, tekuk dan luruskan siku. Terbaik untuk kepala panjang trisep.',
    steps: ['Duduk atau berdiri','Pegang satu dumbbell dengan kedua tangan di atas kepala','Tekuk siku turunkan dumbbell ke belakang kepala','Luruskan siku kembali ke atas','Siku tetap menunjuk ke atas sepanjang gerakan'],
    tip: 'Overhead extension melatih long head trisep yang paling besar.',
  },
  {
    name: 'DB Skull Crusher', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Trisep'], met: 4.5,
    color: COLOR.Trisep, level: 'intermediate',
    icon: exIcons.generic, muscleIcon: muscleIcons.Trisep,
    desc: 'Berbaring, turunkan dumbbell ke dahi dan kembali. Isolasi langsung untuk ketiga kepala trisep.',
    steps: ['Berbaring, dumbbell di atas dengan siku mengarah ke langit','Tekuk siku turunkan dumbbell ke sisi kepala','Jaga siku tidak melebar','Luruskan siku kembali ke atas','Kontrol penuh — jangan sampai jatuh ke kepala'],
    tip: 'Ini isolasi trisep paling intens. Mulai dengan beban ringan.',
  },
  {
    name: 'DB Kickback', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Trisep'], met: 4.0,
    color: COLOR.Trisep, level: 'beginner',
    icon: exIcons.generic, muscleIcon: muscleIcons.Trisep,
    desc: 'Bungkuk, siku di pinggang, luruskan lengan ke belakang. Isolasi trisep yang efektif.',
    steps: ['Bungkuk 45°, siku ditekuk di pinggang','Siku setinggi bahu','Luruskan lengan ke belakang dengan kekuatan trisep','Squeeze trisep di posisi lurus','Tekuk kembali'],
    tip: 'Jaga siku tetap tinggi untuk ROM trisep yang optimal.',
  },
  {
    name: 'DB Close-Grip Press', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Trisep','Dada'], met: 5.5,
    color: COLOR.Trisep, level: 'intermediate',
    icon: exIcons.press, muscleIcon: muscleIcons.Trisep,
    desc: 'Press dengan pegangan sempit dan siku rapat. Menekankan aktivasi trisep lebih besar.',
    steps: ['Berbaring, kedua dumbbell bersentuhan di atas dada','Siku rapat ke sisi tubuh','Dorong ke atas dengan trisep','Turunkan perlahan ke dada','Jaga dumbbell tetap bersentuhan'],
    tip: 'Variasi press yang sangat efektif untuk trisep.',
  },
  {
    name: 'DB Tate Press', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Trisep','Dada'], met: 4.5,
    color: COLOR.Trisep, level: 'advanced',
    icon: exIcons.generic, muscleIcon: muscleIcons.Trisep,
    desc: 'Berbaring, siku keluar, turunkan dumbbell ke dada lalu luruskan. Variasi unik yang memaksimalkan trisep.',
    steps: ['Berbaring, dumbbell di atas dengan telapak menghadap kaki','Siku keluar ke samping','Tekuk siku turunkan dumbbell ke dada','Luruskan dengan memfleksikan trisep','Jaga upper arm tetap horizontal'],
    tip: 'Gerakan tidak umum tapi sangat efektif untuk aktivasi trisep.',
  },

  // ── ABS / CORE ────────────────────────────────────────────
  {
    name: 'DB Russian Twist', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Oblique','Core','Perut'], met: 6.5,
    color: COLOR.Perut, level: 'intermediate',
    icon: exIcons.crunch, muscleIcon: muscleIcons.Perut,
    desc: 'Duduk setengah, putar badan ke kiri dan kanan dengan dumbbell. Lebih intensif dari versi tanpa beban.',
    steps: ['Duduk dengan kaki terangkat','Pegang satu dumbbell dengan kedua tangan','Putar badan ke kanan hingga dumbbell hampir menyentuh lantai','Putar ke kiri','Jaga kaki tidak menyentuh lantai'],
    tip: 'Kontrol gerakan — jangan hanya ayun lengan, putar dari torso.',
  },
  {
    name: 'DB Weighted Crunch', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Perut','Core'], met: 5.5,
    color: COLOR.Perut, level: 'beginner',
    icon: exIcons.crunch, muscleIcon: muscleIcons.Perut,
    desc: 'Crunch sambil memegang dumbbell di dada. Menambah resistansi untuk memperkuat otot perut lebih cepat.',
    steps: ['Berbaring, lutut ditekuk','Pegang dumbbell di dada','Angkat bahu dari lantai dengan kontraksi perut','Tahan 1 detik di atas','Turunkan perlahan'],
    tip: 'Mulai dengan beban ringan. Fokus pada kualitas kontraksi, bukan beban.',
  },
  {
    name: 'DB Side Bend', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Oblique','Core'], met: 4.0,
    color: COLOR.Perut, level: 'beginner',
    icon: exIcons.raise, muscleIcon: muscleIcons.Perut,
    desc: 'Berdiri, condongkan badan ke samping dengan dumbbell. Isolasi obliques yang efektif.',
    steps: ['Berdiri, satu dumbbell di tangan kanan','Condongkan badan ke kanan sejauh mungkin','Kembali ke posisi tegak dengan kekuatan obliques kiri','Selesaikan satu sisi lalu ganti','Jaga pinggul tidak ikut bergerak'],
    tip: 'Fokus pada kontraksi obliques sisi berlawanan saat kembali tegak.',
  },
  {
    name: 'DB Woodchop', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Core','Oblique','Deltoid'], met: 6.0,
    color: COLOR.Core, level: 'intermediate',
    icon: exIcons.swing, muscleIcon: muscleIcons.Core,
    desc: 'Ayun dumbbell dari atas bahu ke arah lutut berlawanan. Melatih rotasi core dan bahu secara fungsional.',
    steps: ['Berdiri, pegang satu dumbbell','Angkat ke atas bahu kanan','Ayun secara diagonal ke lutut kiri sambil membungkuk','Kembali ke posisi awal','Selesaikan satu sisi lalu ganti'],
    tip: 'Gerakan rotasi ini sangat fungsional untuk kehidupan sehari-hari.',
  },

  // ── LEGS ──────────────────────────────────────────────────
  {
    name: 'DB Goblet Squat', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Kaki','Quad','Gluteus','Core'], met: 6.0,
    color: COLOR.Kaki, level: 'beginner',
    icon: exIcons.squat, muscleIcon: muscleIcons.Kaki,
    desc: 'Squat sambil pegang dumbbell di depan dada. Postur lebih tegak, quad dan gluteus lebih aktif.',
    steps: ['Pegang satu dumbbell vertikal di depan dada','Kaki sedikit lebih lebar dari bahu','Turunkan ke squat penuh','Siku dorong lutut keluar di bawah','Dorong naik melalui tumit'],
    tip: 'Goblet squat memaksa postur lebih tegak dari back squat biasa.',
  },
  {
    name: 'DB Lunge', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Kaki','Quad','Gluteus'], met: 6.0,
    color: COLOR.Kaki, level: 'beginner',
    icon: exIcons.lunge, muscleIcon: muscleIcons.Kaki,
    desc: 'Lunge ke depan sambil memegang dumbbell di kedua tangan. Meningkatkan intensitas dan pembakaran kalori.',
    steps: ['Berdiri tegak, dumbbell di kedua tangan','Langkahkan satu kaki ke depan','Turunkan lutut belakang mendekati lantai','Dorong kembali ke posisi awal','Ganti kaki dan ulangi'],
    tip: 'Dumbbell menambah beban sekaligus melatih grip strength.',
  },
  {
    name: 'DB Bulgarian Split Squat', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Kaki','Quad','Gluteus','Hamstring'], met: 7.0,
    color: COLOR.Kaki, level: 'advanced',
    icon: exIcons.squat, muscleIcon: muscleIcons.Kaki,
    desc: 'Split squat dengan kaki belakang di atas kursi sambil pegang dumbbell. Gerakan paling menantang untuk kaki.',
    steps: ['Berdiri di depan kursi, dumbbell di kedua tangan','Letakkan kaki belakang di atas kursi','Turunkan lutut depan mendekati lantai','Lutut depan tidak melewati jari kaki','Dorong naik melalui tumit kaki depan'],
    tip: 'Ini latihan kaki unilateral terberat. Mulai tanpa beban dulu.',
  },
  {
    name: 'DB Sumo Squat', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Kaki','Gluteus','Hamstring'], met: 6.0,
    color: COLOR.Kaki, level: 'beginner',
    icon: exIcons.squat, muscleIcon: muscleIcons.Kaki,
    desc: 'Squat kaki lebar pegang satu dumbbell di tengah. Menargetkan paha dalam dan gluteus lebih luas.',
    steps: ['Kaki lebih lebar dari bahu, jari keluar 45°','Pegang satu dumbbell dengan kedua tangan di tengah','Turunkan dumbbell di antara kaki','Lutut mengikuti arah jari kaki','Dorong naik melalui tumit'],
    tip: 'Variasi squat yang sangat bagus untuk inner thigh.',
  },
  {
    name: 'DB Hip Thrust', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Gluteus','Hamstring','Core'], met: 5.5,
    color: COLOR.Gluteus, level: 'intermediate',
    icon: exIcons.hip, muscleIcon: muscleIcons.Gluteus,
    desc: 'Punggung di sofa, dumbbell di pinggul, dorong pinggul ke atas. Isolasi bokong terbaik dengan beban.',
    steps: ['Punggung bersandar di sofa/bangku','Letakkan dumbbell di atas pinggul','Dorong pinggul ke atas hingga tubuh membentuk garis lurus','Squeeze bokong kuat-kuat di atas','Turunkan perlahan'],
    tip: 'Ini adalah gerakan terbaik untuk glutes. Gunakan beban yang bisa dikontrol.',
  },
  {
    name: 'DB Step-Up', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Kaki','Quad','Gluteus','Hamstring'], met: 6.5,
    color: COLOR.Kaki, level: 'beginner',
    icon: exIcons.squat, muscleIcon: muscleIcons.Kaki,
    desc: 'Naiki kursi atau anak tangga sambil pegang dumbbell. Melatih kaki fungsional dengan beban.',
    steps: ['Berdiri di depan kursi, dumbbell di kedua tangan','Langkahkan satu kaki ke atas kursi','Dorong naik dengan kaki yang di atas','Ikuti kaki kedua','Turunkan bergantian'],
    tip: 'Dorong dengan kaki yang di atas, bukan lompat dengan kaki di bawah.',
  },
  {
    name: 'DB Calf Raise', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Betis'], met: 3.5,
    color: COLOR.Betis, level: 'beginner',
    icon: exIcons.raise, muscleIcon: muscleIcons.Betis,
    desc: 'Berdiri sambil pegang dumbbell, naik turun ujung kaki. Isolasi betis dengan beban.',
    steps: ['Berdiri tegak, dumbbell di kedua tangan','Berdiri di tepi tangga untuk ROM lebih besar','Naik ke ujung kaki setinggi mungkin','Tahan 1-2 detik di atas','Turunkan perlahan di bawah level lantai'],
    tip: 'Full ROM (di bawah lantai) lebih efektif dari calf raise di lantai datar.',
  },
  {
    name: 'DB Lateral Lunge', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Kaki','Quad','Gluteus','Hamstring'], met: 6.0,
    color: COLOR.Kaki, level: 'intermediate',
    icon: exIcons.lunge, muscleIcon: muscleIcons.Kaki,
    desc: 'Langkah ke samping dengan dumbbell di tangan. Melatih paha dalam dan luar serta gluteus lebih intensif.',
    steps: ['Berdiri, dumbbell di kedua tangan','Langkah panjang ke satu sisi','Tekuk lutut kaki yang melangkah','Dumbbell di sisi yang melangkah','Dorong kembali dan ganti sisi'],
    tip: 'Lateral movement sering diabaikan tapi sangat penting untuk stabilitas.',
  },

  // ── FULL BODY / COMPOUND ──────────────────────────────────
  {
    name: 'DB Thruster', equipment: 'dumbbell', workoutType: 'HIIT',
    muscles: ['Kaki','Deltoid','Trisep','Core','Kardio'], met: 10.0,
    color: COLOR.Kardio, level: 'advanced',
    icon: exIcons.press, muscleIcon: muscleIcons.Kardio,
    desc: 'Gabungkan goblet squat dan shoulder press dalam satu gerakan. Latihan full body paling efisien.',
    steps: ['Pegang dumbbell di ketinggian bahu','Turunkan ke squat penuh','Saat naik dari squat, gunakan momentum','Dorong dumbbell ke atas menjadi shoulder press','Turunkan kembali ke bahu untuk rep berikutnya'],
    tip: 'Koordinasi yang bagus lebih penting dari beban berat.',
  },
  {
    name: 'DB Renegade Row', equipment: 'dumbbell', workoutType: 'Strength',
    muscles: ['Punggung','Core','Dada','Bisep'], met: 8.0,
    color: COLOR.Punggung, level: 'advanced',
    icon: exIcons.row, muscleIcon: muscleIcons.Punggung,
    desc: 'Plank di atas dumbbell, row bergantian kiri dan kanan. Melatih punggung, core, dan stabilitas.',
    steps: ['Push-up di atas dumbbell heksagonal','Kaki sedikit lebar untuk stabilitas','Tarik satu dumbbell ke pinggang','Kembali ke posisi plank','Ganti sisi dengan kontrol penuh'],
    tip: 'Ini salah satu gerakan paling menantang untuk core stability.',
  },
  {
    name: 'DB Swing', equipment: 'dumbbell', workoutType: 'HIIT',
    muscles: ['Gluteus','Hamstring','Punggung','Core','Kardio'], met: 9.0,
    color: COLOR.Kardio, level: 'intermediate',
    icon: exIcons.swing, muscleIcon: muscleIcons.Kardio,
    desc: 'Ayun dumbbell dari antara kaki ke setinggi bahu. Meniru gerakan kettlebell swing untuk power dan kardio.',
    steps: ['Pegang satu dumbbell dengan kedua tangan','Kaki sedikit lebih lebar dari bahu','Swing dumbbell ke belakang di antara kaki dengan hinge pinggul','Dorong pinggul ke depan secara eksplosif','Ayun dumbbell ke depan setinggi bahu'],
    tip: 'Gerakan ini dari pinggul, bukan dari tangan. Pinggul yang menggerakkan beban.',
  },
  {
    name: 'DB Clean and Press', equipment: 'dumbbell', workoutType: 'HIIT',
    muscles: ['Kaki','Punggung','Deltoid','Core','Kardio'], met: 9.5,
    color: COLOR.Kardio, level: 'advanced',
    icon: exIcons.press, muscleIcon: muscleIcons.Kardio,
    desc: 'Angkat dumbbell dari bawah ke bahu lalu press ke atas. Gerakan full body yang melatih power dan koordinasi.',
    steps: ['Dumbbell di lantai di sisi kaki','Squat, pegang dumbbell','Eksplosif berdiri sambil angkat dumbbell ke bahu (clean)','Dari bahu, press ke atas (press)','Turunkan perlahan ke lantai'],
    tip: 'Pelajari clean dan press secara terpisah dulu sebelum digabungkan.',
  },
  {
    name: 'DB Burpee', equipment: 'dumbbell', workoutType: 'HIIT',
    muscles: ['Kardio','Dada','Kaki','Core','Deltoid'], met: 12.0,
    color: COLOR.Kardio, level: 'advanced',
    icon: exIcons.burpee, muscleIcon: muscleIcons.Kardio,
    desc: 'Burpee dengan memegang dumbbell. Versi lebih intens dari burpee biasa.',
    steps: ['Pegang dumbbell di lantai','Lompat kaki ke belakang','Lakukan push-up di atas dumbbell','Lompat kaki kembali ke depan','Angkat dumbbell dan lompat ke atas'],
    tip: 'Salah satu latihan paling intens yang ada. Kurangi beban, jaga form.',
  },
]

// ──────────────────────────────────────────────────────────────
//  MERGED EXPORT (sekarang termasuk field `image`)
// ──────────────────────────────────────────────────────────────
export const HOME_GYM_EXERCISES = [...NO_EQUIPMENT, ...WITH_DUMBBELL].map(e => ({
  ...e,
  image: imgPath(e.name),
}))

// ──────────────────────────────────────────────────────────────
//  HELPERS untuk TabGerakan & bukuData compatibility
// ──────────────────────────────────────────────────────────────

// muscle (string tunggal) untuk filter chip TabGerakan
// Diambil dari muscles[0], lalu normalize ke nama yang user-friendly
const MUSCLE_DISPLAY = {
  Dada: 'Dada', Punggung: 'Punggung', Kaki: 'Kaki', Gluteus: 'Bokong',
  Deltoid: 'Bahu', Bisep: 'Bisep', Trisep: 'Trisep', Perut: 'Perut',
  Core: 'Perut', Kardio: 'Kardio', Hamstring: 'Kaki', Betis: 'Kaki',
  Trapezius: 'Punggung', Oblique: 'Perut',
}

// Export format yang kompatibel dengan TabGerakan (field `muscle` string)
// `image` ikut terbawa karena spread dari HOME_GYM_EXERCISES
export const exercises = HOME_GYM_EXERCISES.map(e => ({
  ...e,
  muscle: MUSCLE_DISPLAY[e.muscles[0]] || e.muscles[0],
}))

// Kategori untuk filter chip
export const muscleCategories = [
  'Semua','Dada','Punggung','Kaki','Bokong','Bahu','Bisep','Trisep','Perut','Kardio'
]

// MET data untuk halaman referensi
export const metData = HOME_GYM_EXERCISES.map(e => ({
  name     : e.name,
  category : e.equipment === 'no_equipment' ? 'Bodyweight' : 'Beban',
  met      : e.met,
  intensity: e.met >= 9 ? 'berat' : e.met >= 6 ? 'sedang' : 'ringan',
}))