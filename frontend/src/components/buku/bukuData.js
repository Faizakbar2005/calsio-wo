// ─── SVG Builder ────────────────────────────────────────────────────────────
const icon = (body, size = 48, vb = '0 0 48 48') =>
  `<svg width="${size}" height="${size}" viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg">${body}</svg>`

// ─── Muscle Icons — anatomical silhouettes ───────────────────────────────────
export const muscleIcons = {

  // DADA: pektoral kiri-kanan dengan garis sternal
  Dada: icon(`
    <path d="M8 16 Q10 8 24 12 Q38 8 40 16 L40 30 Q36 38 24 35 Q12 38 8 30 Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <line x1="24" y1="12" x2="24" y2="35" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/>
    <path d="M10 20 Q14 17 20 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M38 20 Q34 17 28 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  `),

  // PUNGGUNG: vertebrae + sayap lat melebar
  Punggung: icon(`
    <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 10 Q14 12 8 18 Q6 22 10 24 Q16 22 24 20" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.6"/>
    <path d="M24 10 Q34 12 40 18 Q42 22 38 24 Q32 22 24 20" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.6"/>
    <path d="M24 24 Q14 26 10 32 Q9 36 13 37 Q18 35 24 33" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.4"/>
    <path d="M24 24 Q34 26 38 32 Q39 36 35 37 Q30 35 24 33" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="24" cy="14" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="24" cy="20" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="24" cy="26" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="24" cy="32" r="1.5" fill="currentColor" opacity="0.4"/>
  `),

  // KAKI: siluet paha + betis kiri & kanan dengan garis quadricep
  Kaki: icon(`
    <path d="M14 6 Q11 6 10 10 L8 28 Q8 32 11 33 L13 42 Q14 44 16 43 L17 33 Q19 32 19 28 L18 10 Q17 6 14 6Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.6"/>
    <path d="M34 6 Q37 6 38 10 L40 28 Q40 32 37 33 L35 42 Q34 44 32 43 L31 33 Q29 32 29 28 L30 10 Q31 6 34 6Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.6"/>
    <path d="M13 10 Q14 8 15 12 Q15 20 14 26" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
    <path d="M35 10 Q34 8 33 12 Q33 20 34 26" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
    <path d="M13 6 Q14 4 15 4 Q20 4 24 5 Q28 4 33 4 Q34 4 35 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>
  `),

  // BOKONG: dua lingkaran glute dari tampak belakang
  Bokong: icon(`
    <path d="M8 22 Q8 10 18 8 Q24 6 24 14 Q24 6 30 8 Q40 10 40 22 Q40 36 24 42 Q8 36 8 22Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <path d="M24 14 Q24 28 24 42" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/>
    <path d="M10 24 Q14 18 20 20 Q22 24 18 28 Q14 30 10 24Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
    <path d="M38 24 Q34 18 28 20 Q26 24 30 28 Q34 30 38 24Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2"/>
  `),

  // BAHU: tiga kubah deltoid anterior-medial-posterior
  Bahu: icon(`
    <path d="M6 28 Q6 18 14 14 Q20 10 24 16 Q24 10 28 10 Q38 14 42 24 Q40 32 34 30 Q28 24 24 24 Q20 24 14 30 Q8 32 6 28Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <path d="M14 14 Q10 20 12 28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
    <path d="M24 16 Q22 22 24 28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
    <path d="M34 14 Q38 20 36 28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
    <ellipse cx="24" cy="14" rx="5" ry="3" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.2"/>
  `),

  // BISEP: profil lengan fleksi dengan puncak otot
  Bisep: icon(`
    <path d="M14 38 L15 28 Q14 18 18 12 Q22 6 26 8 Q32 10 32 18 Q32 24 28 28 L26 38Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <path d="M18 12 Q16 16 18 20 Q22 14 26 16 Q28 18 26 22"
      stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <path d="M26 8 Q30 10 30 16 Q30 22 26 26" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
    <line x1="14" y1="38" x2="26" y2="38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  `),

  // TRISEP: belakang lengan atas — tiga kepala + insertasi
  Trisep: icon(`
    <path d="M16 8 Q14 8 13 12 L12 22 Q12 28 16 32 L18 38 Q20 42 24 42 Q28 42 30 38 L32 32 Q36 28 36 22 L35 12 Q34 8 32 8Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8"/>
    <path d="M18 10 Q16 16 18 22 Q20 26 24 28 Q28 26 30 22 Q32 16 30 10"
      stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.6"/>
    <path d="M16 14 Q14 18 15 24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
    <path d="M32 14 Q34 18 33 24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
    <path d="M24 10 Q22 16 24 28" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
  `),

  // PERUT: 3 baris x 2 kolom six-pack dengan garis linea alba
  Perut: icon(`
    <rect x="10" y="8"  width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <rect x="26" y="8"  width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <rect x="10" y="20" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <rect x="26" y="20" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <rect x="10" y="32" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <rect x="26" y="32" width="12" height="8" rx="2.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
  `),

  // KARDIO: jantung berdenyut dengan garis EKG
  Kardio: icon(`
    <path d="M24 38 L10 24 Q4 16 10 10 Q16 4 22 10 L24 12 L26 10 Q32 4 38 10 Q44 16 38 24 Z"
      fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.8"/>
    <polyline points="6,26 12,26 15,20 19,34 22,26 25,28 27,24 30,24 34,26 42,26"
      stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  `),
}

// ─── Exercise Icons — movement visualization ─────────────────────────────────
export const exerciseIcons = {

  // PUSH UP: siluet orang plank + panah dorong
  'Push Up': icon(`
    <circle cx="36" cy="10" r="5" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <path d="M36 15 L36 22 L10 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M10 28 L10 34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M36 22 L36 34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="6" y1="34" x2="42" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
    <path d="M16 22 L20 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    <path d="M22 20 L26 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  `),

  // PULL UP: tangan di palang, tubuh menggantung naik
  'Pull Up': icon(`
    <line x1="6" y1="8" x2="42" y2="8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="32" y1="8" x2="32" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M16 16 Q24 20 32 16" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="24" cy="26" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M24 31 L22 42 M24 31 L26 42" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M24 24 L20 28 M24 24 L28 28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  `),

  // SQUAT: posisi jongkok penuh tampak samping
  'Squat': icon(`
    <circle cx="32" cy="8" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M32 13 L30 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M30 20 L20 26 L14 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M30 20 L34 30 L28 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 26 L28 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <line x1="10" y1="38" x2="38" y2="38" stroke="currentColor" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
    <path d="M28 16 L38 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  `),

  // DEADLIFT: barbell di lantai, badan membungkuk angkat
  'Deadlift': icon(`
    <circle cx="6" cy="36" r="4" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="42" cy="36" r="4" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <line x1="10" y1="36" x2="38" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="30" cy="12" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M30 17 L28 26 L24 36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M28 26 L36 30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M30 17 L22 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M22 20 L24 36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  `),

  // PLANK: posisi horizontal sempurna tampak samping
  'Plank': icon(`
    <circle cx="38" cy="12" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M38 17 L38 26 L10 26" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 26 L10 34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="6" y1="34" x2="44" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
    <path d="M30 22 L38 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
    <path d="M18 22 L28 22" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.3"/>
    <path d="M36 24 L44 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
  `),

  // LUNGES: satu kaki ke depan, lutut belakang di lantai
  'Lunges': icon(`
    <circle cx="24" cy="7" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M24 12 L22 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M22 20 L14 30 L14 40" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 20 L32 28 L38 40" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="8" y1="40" x2="42" y2="40" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
    <circle cx="14" cy="40" r="2" fill="currentColor" opacity="0.4"/>
  `),

  // DUMBBELL CURL: lengan fleksi pegang dumbbell
  'Dumbbell Curl': icon(`
    <rect x="4" y="20" width="6" height="10" rx="2" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <rect x="2" y="22" width="4" height="6" rx="1" fill="currentColor" stroke="currentColor" stroke-width="1"/>
    <rect x="10" y="22" width="4" height="6" rx="1" fill="currentColor" stroke="currentColor" stroke-width="1"/>
    <path d="M14 25 Q20 10 30 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
    <circle cx="33" cy="10" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M30 14 L32 22 L36 30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 22 L42 26" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>
  `),

  // TRICEP DIP: tangan di bangku, pinggul turun
  'Tricep Dip': icon(`
    <rect x="4" y="18" width="18" height="5" rx="2" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <rect x="26" y="18" width="18" height="5" rx="2" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="24" cy="8" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M24 13 L24 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M10 18 L14 14 L24 16 L34 14 L38 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M16 38 L24 28 L32 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="12" y1="38" x2="36" y2="38" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
  `),

  // HIP THRUST: bahu di bangku, pinggul ke atas
  'Hip Thrust': icon(`
    <rect x="4" y="24" width="16" height="8" rx="3" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="14" cy="14" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M14 19 L14 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 24 Q20 30 30 28 L38 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
    <path d="M38 22 L42 30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="36" y1="38" x2="44" y2="38" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
    <circle cx="26" cy="26" r="3" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.2"/>
    <path d="M26 22 L26 18 L30 14 L34 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  `),

  // JUMPING JACK: pose bintang lompat
  'Jumping Jack': icon(`
    <circle cx="24" cy="7" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M24 12 L24 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M8 16 L24 20 L40 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 38 L24 28 L34 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 40 L14 38 M40 40 L34 38" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  `),

  // SHOULDER PRESS: dumbbell diangkat atas kepala
  'Shoulder Press': icon(`
    <circle cx="24" cy="28" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M24 23 L24 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 18 L24 18 L34 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="8" y="14" width="8" height="8" rx="2" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <rect x="32" y="14" width="8" height="8" rx="2" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M14 18 L10 26" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>
    <path d="M34 18 L38 26" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/>
    <path d="M16 38 L24 32 L32 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 8 L14 14 M30 8 L34 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
  `),

  // MOUNTAIN CLIMBER: sprint di plank
  'Mountain Climber': icon(`
    <circle cx="38" cy="10" r="5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <path d="M38 15 L38 22 L10 28" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 28 L10 34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M38 22 L34 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M28 24 L24 18 L22 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="6" y1="34" x2="44" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
    <path d="M42 20 L46 16 M42 22 L46 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
  `),
}

// ─── Nutrisi Icons ───────────────────────────────────────────────────────────
export const nutrisiIcons = {
  // Jam: timing makan
  timing: icon(`
    <circle cx="24" cy="24" r="18" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="2"/>
    <circle cx="24" cy="24" r="2.5" fill="currentColor"/>
    <line x1="24" y1="24" x2="24" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="24" y1="24" x2="33" y2="28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="24" y1="8" x2="24" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="24" x2="38" y2="24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  `),
  // Tetes air
  hidrasi: icon(`
    <path d="M24 6 Q36 18 36 28 A12 12 0 0 1 12 28 Q12 18 24 6Z"
      fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2"/>
    <path d="M20 32 Q24 28 28 32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.5"/>
  `),
  // Bulan + bintang: tidur/pemulihan
  pemulihan: icon(`
    <path d="M30 10 Q20 12 18 24 Q16 36 28 40 Q16 42 10 34 Q4 22 12 14 Q18 8 30 10Z"
      fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2"/>
    <circle cx="36" cy="14" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="42" cy="22" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="38" cy="30" r="1" fill="currentColor" opacity="0.3"/>
  `),
  // Kilat: kalori / energi
  kalori: icon(`
    <path d="M28 6 L14 26 L22 26 L18 42 L36 20 L26 20 Z"
      fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  `),
  // Daun: makanan sehat
  makanan: icon(`
    <path d="M8 40 Q16 20 38 8 Q38 30 20 36 Z"
      fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    <path d="M8 40 Q18 30 38 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.5"/>
  `),
  // Labu/botol suplemen
  suplemen: icon(`
    <rect x="17" y="6" width="14" height="6" rx="2" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>
    <path d="M14 12 Q10 16 10 20 L10 38 Q10 42 14 42 L34 42 Q38 42 38 38 L38 20 Q38 16 34 12Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="2"/>
    <line x1="10" y1="26" x2="38" y2="26" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
    <line x1="24" y1="20" x2="24" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="18" y1="26" x2="30" y2="26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  `),
}

// ─── Makronutrien Icons ──────────────────────────────────────────────────────
export const makroIcons = {
  // Protein: daging/ayam
  Protein: icon(`
    <path d="M14 28 Q10 20 14 14 Q18 8 24 10 Q30 8 34 14 Q38 20 34 28 Q30 36 24 38 Q18 36 14 28Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="2"/>
    <path d="M18 18 Q22 14 28 18 Q32 22 28 28 Q24 32 20 28 Q16 24 18 18Z"
      fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>
    <line x1="28" y1="10" x2="34" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="30" y1="8" x2="38" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  `),
  // Karbohidrat: mangkuk nasi
  Karbohidrat: icon(`
    <path d="M8 22 Q8 14 24 14 Q40 14 40 22 L36 34 Q32 40 24 40 Q16 40 12 34 Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="2"/>
    <path d="M8 22 Q24 28 40 22" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <path d="M16 10 Q18 6 20 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.5"/>
    <path d="M22 8 Q24 4 26 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.5"/>
    <path d="M28 10 Q30 6 32 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.5"/>
  `),
  // Lemak: alpukat
  Lemak: icon(`
    <path d="M24 6 Q34 14 34 26 Q34 38 24 42 Q14 38 14 26 Q14 14 24 6Z"
      fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="2"/>
    <ellipse cx="24" cy="30" rx="7" ry="9" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="24" cy="30" r="4" fill="currentColor" fill-opacity="0.4"/>
  `),
}

// ─── Exercises Data ──────────────────────────────────────────────────────────
export const exercises = [
  {
    name: 'Push Up',
    icon: exerciseIcons['Push Up'],
    muscle: 'Dada',
    muscleIcon: muscleIcons['Dada'],
    equipment: 'No Equipment',
    level: 'beginner',
    met: 3.8,
    color: '#eab308',
    desc: 'Gerakan dasar mendorong tubuh naik turun dengan tangan, melatih dada, bahu, dan trisep secara bersamaan.',
    steps: [
      'Posisi plank dengan tangan selebar bahu',
      'Turunkan dada hingga hampir menyentuh lantai',
      'Siku membentuk sudut 45° dari tubuh',
      'Dorong kembali ke atas dengan kuat',
      'Jaga tubuh lurus dari kepala hingga tumit sepanjang gerakan',
    ],
    muscles: ['Pectoralis Major', 'Deltoid Anterior', 'Triceps Brachii', 'Core'],
    tip: 'Jaga siku tidak terlalu keluar. Fokus pada squeeze dada di puncak gerakan untuk hasil maksimal.',
  },
  {
    name: 'Pull Up',
    icon: exerciseIcons['Pull Up'],
    muscle: 'Punggung',
    muscleIcon: muscleIcons['Punggung'],
    equipment: 'Basic Equipment',
    level: 'intermediate',
    met: 5.0,
    color: '#60a5fa',
    desc: 'Gerakan menarik tubuh ke atas menggunakan palang, sangat efektif untuk membangun lebar punggung dan kekuatan bisep.',
    steps: [
      'Pegang palang dengan jarak lebih lebar dari bahu, telapak menghadap depan',
      'Gantung dengan lengan lurus penuh',
      'Tarik tubuh ke atas hingga dagu melewati palang',
      'Fokus tarik siku ke bawah, bukan tangan ke atas',
      'Turunkan perlahan dengan kontrol penuh',
    ],
    muscles: ['Latissimus Dorsi', 'Biceps Brachii', 'Teres Major', 'Rhomboid'],
    tip: 'Bayangkan kamu mau memasukkan siku ke kantong celana. Ini memaksimalkan aktivasi lat.',
  },
  {
    name: 'Squat',
    icon: exerciseIcons['Squat'],
    muscle: 'Kaki',
    muscleIcon: muscleIcons['Kaki'],
    equipment: 'No Equipment',
    level: 'beginner',
    met: 5.0,
    color: '#22c55e',
    desc: 'Raja latihan kaki. Melatih seluruh otot tungkai bawah sekaligus dan sangat fungsional untuk kehidupan sehari-hari.',
    steps: [
      'Kaki selebar bahu, jari kaki sedikit keluar',
      'Rentangkan tangan ke depan untuk keseimbangan',
      'Turunkan pinggul ke bawah seolah duduk di kursi',
      'Lutut mengikuti arah jari kaki, tidak ke dalam',
      'Turunkan hingga paha sejajar lantai, lalu dorong naik',
    ],
    muscles: ['Quadriceps', 'Gluteus Maximus', 'Hamstring', 'Core', 'Calves'],
    tip: 'Jaga dada tetap tegak dan berat badan di tumit. Jangan biarkan lutut jatuh ke dalam.',
  },
  {
    name: 'Deadlift',
    icon: exerciseIcons['Deadlift'],
    muscle: 'Punggung',
    muscleIcon: muscleIcons['Punggung'],
    equipment: 'Basic Equipment',
    level: 'advanced',
    met: 6.0,
    color: '#f97316',
    desc: 'Gerakan compound paling fungsional. Melatih hampir semua otot posterior tubuh dari punggung bawah hingga kaki.',
    steps: [
      'Kaki selebar pinggul, bar di depan tulang kering',
      'Bungkuk dan pegang bar dengan grip selebar bahu',
      'Punggung lurus, dada tegak, pandangan ke depan',
      'Angkat bar dengan mendorong lantai menggunakan kaki',
      'Kunci pinggul di atas, turunkan kembali dengan kontrol',
    ],
    muscles: ['Erector Spinae', 'Gluteus Maximus', 'Hamstring', 'Trapezius', 'Quadriceps'],
    tip: 'Bayangkan kamu mendorong bumi ke bawah, bukan menarik bar ke atas. Ini menjaga postur tetap benar.',
  },
  {
    name: 'Plank',
    icon: exerciseIcons['Plank'],
    muscle: 'Perut',
    muscleIcon: muscleIcons['Perut'],
    equipment: 'No Equipment',
    level: 'beginner',
    met: 3.5,
    color: '#a78bfa',
    desc: 'Latihan isometrik terbaik untuk core. Melatih stabilitas seluruh batang tubuh tanpa gerakan berulang.',
    steps: [
      'Posisi push up, tapi tumpuan di lengan bawah',
      'Siku tepat di bawah bahu',
      'Tubuh lurus dari kepala hingga tumit',
      'Perut dikencangkan, pantat tidak naik atau turun',
      'Tahan posisi selama durasi yang ditentukan',
    ],
    muscles: ['Rectus Abdominis', 'Transverse Abdominis', 'Obliques', 'Erector Spinae'],
    tip: 'Bayangkan ada gelas berisi air di punggungmu. Jaga agar tidak tumpah.',
  },
  {
    name: 'Lunges',
    icon: exerciseIcons['Lunges'],
    muscle: 'Kaki',
    muscleIcon: muscleIcons['Kaki'],
    equipment: 'No Equipment',
    level: 'beginner',
    met: 4.0,
    color: '#22c55e',
    desc: 'Gerakan unilateral yang melatih keseimbangan dan kekuatan kaki secara bergantian.',
    steps: [
      'Berdiri tegak, kaki rapat',
      'Langkahkan satu kaki ke depan panjang',
      'Turunkan lutut belakang mendekati lantai',
      'Lutut depan tidak melewati jari kaki',
      'Dorong kembali ke posisi awal dan ganti sisi',
    ],
    muscles: ['Quadriceps', 'Gluteus Maximus', 'Hamstring', 'Calves'],
    tip: 'Jaga torso tegak lurus. Condong ke depan mengurangi keterlibatan glutes.',
  },
  {
    name: 'Dumbbell Curl',
    icon: exerciseIcons['Dumbbell Curl'],
    muscle: 'Bisep',
    muscleIcon: muscleIcons['Bisep'],
    equipment: 'Basic Equipment',
    level: 'beginner',
    met: 3.5,
    color: '#f472b6',
    desc: 'Latihan isolasi klasik untuk bisep. Sederhana namun sangat efektif untuk membangun ukuran dan kekuatan lengan depan.',
    steps: [
      'Berdiri tegak, dumbbell di tangan dengan telapak menghadap depan',
      'Siku menempel di sisi tubuh sepanjang gerakan',
      'Angkat dumbbell dengan memfleksikan siku',
      'Squeeze bisep di puncak gerakan',
      'Turunkan perlahan dengan kontrol penuh',
    ],
    muscles: ['Biceps Brachii', 'Brachialis', 'Brachioradialis'],
    tip: 'Hindari mengayun tubuh. Fase turun (eksentrik) sama pentingnya dengan angkat.',
  },
  {
    name: 'Tricep Dip',
    icon: exerciseIcons['Tricep Dip'],
    muscle: 'Trisep',
    muscleIcon: muscleIcons['Trisep'],
    equipment: 'Basic Equipment',
    level: 'intermediate',
    met: 4.0,
    color: '#fb923c',
    desc: 'Gerakan compound untuk trisep menggunakan beban tubuh sendiri.',
    steps: [
      'Duduk di tepi kursi/bangku, tangan di pinggir',
      'Geser tubuh ke depan, kaki lurus atau ditekuk',
      'Turunkan tubuh dengan menekuk siku ke belakang',
      'Turunkan hingga siku membentuk sudut 90°',
      'Dorong kembali ke atas dengan trisep',
    ],
    muscles: ['Triceps Brachii', 'Deltoid Anterior', 'Pectoralis Minor'],
    tip: 'Jaga siku tetap ke belakang, bukan ke samping.',
  },
  {
    name: 'Hip Thrust',
    icon: exerciseIcons['Hip Thrust'],
    muscle: 'Bokong',
    muscleIcon: muscleIcons['Bokong'],
    equipment: 'Basic Equipment',
    level: 'intermediate',
    met: 4.5,
    color: '#f43f5e',
    desc: 'Gerakan terbaik untuk mengaktifkan glutes secara maksimal.',
    steps: [
      'Punggung bersandar di bangku, kaki selebar pinggul di lantai',
      'Beban (dumbbell/barbell) di atas pinggul',
      'Dorong pinggul ke atas hingga tubuh membentuk garis lurus',
      'Squeeze glutes kuat-kuat di posisi atas',
      'Turunkan perlahan hingga bokong hampir menyentuh lantai',
    ],
    muscles: ['Gluteus Maximus', 'Gluteus Medius', 'Hamstring', 'Core'],
    tip: 'Jaga dagu menunduk dan rib cage turun. Hindari hyperextend punggung bawah.',
  },
  {
    name: 'Jumping Jack',
    icon: exerciseIcons['Jumping Jack'],
    muscle: 'Kardio',
    muscleIcon: muscleIcons['Kardio'],
    equipment: 'No Equipment',
    level: 'beginner',
    met: 8.0,
    color: '#34d399',
    desc: 'Latihan kardio full-body yang sempurna untuk warm-up atau sesi kardio intensitas sedang.',
    steps: [
      'Berdiri tegak, kaki rapat dan tangan di sisi tubuh',
      'Lompat sambil membuka kaki selebar bahu',
      'Bersamaan angkat tangan ke atas hingga hampir bertemu',
      'Lompat kembali ke posisi awal',
      'Ulangi dengan ritme yang konsisten',
    ],
    muscles: ['Full Body', 'Deltoid', 'Gluteus Medius', 'Calves', 'Core'],
    tip: 'Mendarat dengan lembut pada bola kaki untuk meminimalkan impak pada sendi lutut.',
  },
  {
    name: 'Shoulder Press',
    icon: exerciseIcons['Shoulder Press'],
    muscle: 'Bahu',
    muscleIcon: muscleIcons['Bahu'],
    equipment: 'Basic Equipment',
    level: 'intermediate',
    met: 4.0,
    color: '#818cf8',
    desc: 'Gerakan compound untuk bahu yang juga melatih trisep dan upper chest.',
    steps: [
      'Duduk atau berdiri tegak, dumbbell di ketinggian bahu',
      'Telapak tangan menghadap ke depan',
      'Dorong dumbbell ke atas hingga lengan lurus',
      'Jangan kunci siku di posisi atas',
      'Turunkan perlahan ke posisi awal',
    ],
    muscles: ['Deltoid', 'Triceps Brachii', 'Upper Trapezius', 'Serratus Anterior'],
    tip: 'Jaga core tetap kencang. Jangan melengkungkan punggung bawah.',
  },
  {
    name: 'Mountain Climber',
    icon: exerciseIcons['Mountain Climber'],
    muscle: 'Perut',
    muscleIcon: muscleIcons['Perut'],
    equipment: 'No Equipment',
    level: 'intermediate',
    met: 8.0,
    color: '#a78bfa',
    desc: 'Kombinasi latihan core dan kardio. Intensitas tinggi dalam satu gerakan.',
    steps: [
      'Mulai dari posisi push up tinggi',
      'Bawa lutut kanan menuju dada dengan cepat',
      'Kembali dan langsung ganti dengan lutut kiri',
      'Gerakan bergantian seperti sedang lari di tempat',
      'Jaga pinggul tidak naik, tubuh tetap lurus',
    ],
    muscles: ['Rectus Abdominis', 'Obliques', 'Hip Flexors', 'Deltoid', 'Core'],
    tip: 'Semakin cepat semakin tinggi intensitas kardionya. Untuk fokus core, lakukan lebih lambat.',
  },
]

// ─── Muscle Guides ───────────────────────────────────────────────────────────
export const muscleGuides = [
  { name: 'Dada (Chest)',      latin: 'Pectoralis Major & Minor',              icon: muscleIcons['Dada'],     color: '#eab308', desc: 'Otot dada adalah otot besar yang mencakup seluruh bagian depan atas tubuh. Berfungsi untuk gerakan mendorong horizontal dan adduksi lengan. Otot dada yang kuat meningkatkan postur dan kekuatan fungsional.', exercises: ['Push Up', 'Bench Press', 'Chest Fly', 'Dips'], tip: 'Latih dada 2x seminggu. Variasikan sudut (incline, flat, decline) untuk melatih semua bagian dada.' },
  { name: 'Punggung (Back)',   latin: 'Latissimus Dorsi & Rhomboids',          icon: muscleIcons['Punggung'], color: '#60a5fa', desc: 'Punggung adalah grup otot terbesar kedua di tubuh. Terdiri dari lat (lebar), rhomboid (tengah), dan trapezius (atas). Punggung yang kuat adalah kunci postur yang baik dan pencegahan cedera.', exercises: ['Pull Up', 'Deadlift', 'Bent Over Row', 'Lat Pulldown'], tip: 'Jangan skip latihan punggung. Ketidakseimbangan dada-punggung adalah penyebab utama postur bungkuk.' },
  { name: 'Kaki (Legs)',       latin: 'Quadriceps & Hamstrings',               icon: muscleIcons['Kaki'],     color: '#22c55e', desc: 'Kaki adalah kelompok otot terbesar di tubuh. Melatih kaki meningkatkan metabolisme secara keseluruhan, produksi hormon anabolik, dan kekuatan fungsional untuk aktivitas sehari-hari.', exercises: ['Squat', 'Lunges', 'Leg Press', 'Leg Curl'], tip: 'Jangan pernah skip leg day. Otot kaki yang besar membantu membakar lebih banyak kalori bahkan saat istirahat.' },
  { name: 'Bokong (Glutes)',   latin: 'Gluteus Maximus, Medius & Minimus',     icon: muscleIcons['Bokong'],   color: '#f43f5e', desc: 'Glutes adalah otot terbesar di tubuh manusia. Selain estetika, glutes yang kuat sangat penting untuk stabilitas panggul, mencegah nyeri punggung bawah, dan performa atletik.', exercises: ['Hip Thrust', 'Squat', 'Deadlift', 'Glute Bridge'], tip: 'Banyak orang mengalami "glute amnesia" karena terlalu banyak duduk. Aktifkan glutes dengan peregangan hip flexor sebelum latihan.' },
  { name: 'Bahu (Shoulders)',  latin: 'Deltoideus Anterior, Medial & Posterior', icon: muscleIcons['Bahu'],  color: '#818cf8', desc: 'Bahu terdiri dari tiga kepala: anterior (depan), medial (tengah), dan posterior (belakang). Bahu medial yang berkembang memberi tampilan lebar, sementara posterior mencegah cedera dan memperbaiki postur.', exercises: ['Shoulder Press', 'Lateral Raise', 'Front Raise', 'Face Pull'], tip: 'Perbanyak latihan posterior deltoid. Kebanyakan orang over-train anterior deltoid dari push up dan bench press.' },
  { name: 'Bisep (Biceps)',    latin: 'Biceps Brachii & Brachialis',           icon: muscleIcons['Bisep'],    color: '#f472b6', desc: 'Bisep bekerja melakukan fleksi siku dan supinasi lengan bawah. Meski sering jadi fokus banyak orang, bisep sebenarnya relatif kecil dan banyak terlatih saat latihan punggung.', exercises: ['Dumbbell Curl', 'Barbell Curl', 'Hammer Curl', 'Pull Up'], tip: 'Variasikan grip untuk melatih semua bagian bisep: supinasi untuk puncak bisep, netral (hammer) untuk brachialis.' },
  { name: 'Trisep (Triceps)',  latin: 'Triceps Brachii',                       icon: muscleIcons['Trisep'],   color: '#fb923c', desc: 'Trisep membentuk 2/3 massa lengan atas, jauh lebih besar dari bisep. Terdiri dari tiga kepala. Trisep yang kuat sangat penting untuk semua gerakan mendorong.', exercises: ['Tricep Dip', 'Skull Crusher', 'Tricep Pushdown', 'Close-Grip Push Up'], tip: 'Untuk lengan besar, fokus pada trisep lebih dari bisep. Gerakan overhead paling mengaktifkan kepala panjang trisep.' },
  { name: 'Perut (Core)',      latin: 'Rectus Abdominis & Obliques',           icon: muscleIcons['Perut'],    color: '#a78bfa', desc: 'Core bukan hanya six-pack (rectus abdominis), tapi juga obliques, transverse abdominis, dan erector spinae. Core yang kuat adalah fondasi semua gerakan atletik dan pencegahan cedera.', exercises: ['Plank', 'Crunch', 'Mountain Climber', 'Leg Raise'], tip: 'Six-pack dibuat di dapur, bukan di gym. Latihan core membangun otot, tapi lemak perut hilang dengan defisit kalori.' },
  { name: 'Kardio',            latin: 'Cardiovascular System',                 icon: muscleIcons['Kardio'],   color: '#34d399', desc: 'Latihan kardio melatih sistem kardiovaskular: jantung, paru-paru, dan sirkulasi darah. Meningkatkan daya tahan, membakar kalori, dan sangat penting untuk kesehatan jangka panjang.', exercises: ['Jumping Jack', 'Burpee', 'High Knees', 'Jump Rope'], tip: 'Kombinasikan LISS dan HIIT untuk hasil optimal. HIIT lebih efisien waktu, LISS lebih baik untuk pemula.' },
]

// ─── Makronutrien ────────────────────────────────────────────────────────────
export const makronutrien = [
  { name: 'Protein',     icon: makroIcons['Protein'],     color: '#ef4444', kcalPerGram: 4, pct: 30, desc: 'Membangun dan memperbaiki otot. Target: 1.6–2.2g per kg berat badan untuk yang aktif berlatih.' },
  { name: 'Karbohidrat', icon: makroIcons['Karbohidrat'], color: '#eab308', kcalPerGram: 4, pct: 50, desc: 'Sumber energi utama untuk latihan. Prioritaskan karbohidrat kompleks: nasi merah, oats, ubi.' },
  { name: 'Lemak',       icon: makroIcons['Lemak'],       color: '#22c55e', kcalPerGram: 9, pct: 20, desc: 'Penting untuk produksi hormon dan penyerapan vitamin. Fokus lemak sehat: alpukat, kacang, minyak zaitun.' },
]

// ─── Nutrisi Tips ────────────────────────────────────────────────────────────
export const nutrisiTips = [
  { icon: nutrisiIcons.timing,    title: 'Timing Makan',            items: ['Makan 1-3 jam sebelum latihan untuk energi optimal','Konsumsi protein + karbohidrat 30-60 menit setelah latihan','Window makan tidak sepenting total kalori harian','Sarapan berprotein tinggi mengurangi nafsu makan sepanjang hari','Jangan latihan dengan perut kosong untuk sesi intensitas tinggi'] },
  { icon: nutrisiIcons.hidrasi,   title: 'Hidrasi',                 items: ['Minum 2-3 liter air per hari sebagai baseline','Tambahkan 500ml per jam latihan intensitas sedang','Urine berwarna kuning pucat = terhidrasi dengan baik','Minum air sebelum merasa haus — haus artinya sudah dehidrasi ringan','Elektrolit penting untuk sesi kardio lebih dari 60 menit'] },
  { icon: nutrisiIcons.pemulihan, title: 'Pemulihan',               items: ['Otot tumbuh saat tidur, bukan saat latihan','Target 7-9 jam tidur berkualitas per malam','Rest day bukan hari malas, tapi bagian dari program','Konsumsi casein protein (susu, keju cottage) sebelum tidur','Aktif recovery: jalan, stretching, yoga membantu pemulihan'] },
  { icon: nutrisiIcons.kalori,    title: 'Defisit & Surplus Kalori',items: ['Defisit 300-500 kcal/hari untuk fat loss yang sustainable','Surplus 200-300 kcal/hari untuk muscle gain tanpa banyak lemak','Hitung TDEE (Total Daily Energy Expenditure) sebagai baseline','Timbang berat badan di pagi hari, ambil rata-rata mingguan','Jangan defisit lebih dari 1000 kcal/hari — berisiko kehilangan otot'] },
  { icon: nutrisiIcons.makanan,   title: 'Makanan Prioritas',       items: ['Protein hewani: ayam, telur, ikan, daging sapi lean','Protein nabati: tempe, tahu, edamame, kacang-kacangan','Karbohidrat: nasi merah, oats, ubi, buah-buahan','Lemak sehat: alpukat, minyak zaitun, kacang kenari','Sayuran: penuhi setengah piring dengan sayuran setiap makan'] },
  { icon: nutrisiIcons.suplemen,  title: 'Suplemen Dasar',          items: ['Whey protein: praktis untuk mencapai target protein harian','Creatine monohydrate: terbukti ilmiah meningkatkan kekuatan','Vitamin D3: penting untuk yang kurang paparan sinar matahari','Omega-3 (fish oil): anti-inflamasi dan kesehatan jantung','Suplemen tidak menggantikan pola makan baik — hanya melengkapi'] },
]

// ─── MET Data ────────────────────────────────────────────────────────────────
export const metData = [
  { name: 'Push Up',           category: 'Bodyweight', met: 3.8,  intensity: 'sedang' },
  { name: 'Pull Up',           category: 'Bodyweight', met: 5.0,  intensity: 'berat'  },
  { name: 'Squat (BW)',        category: 'Bodyweight', met: 5.0,  intensity: 'sedang' },
  { name: 'Lunges',            category: 'Bodyweight', met: 4.0,  intensity: 'sedang' },
  { name: 'Plank',             category: 'Core',       met: 3.5,  intensity: 'ringan' },
  { name: 'Mountain Climber',  category: 'Core',       met: 8.0,  intensity: 'berat'  },
  { name: 'Crunch',            category: 'Core',       met: 2.8,  intensity: 'ringan' },
  { name: 'Leg Raise',         category: 'Core',       met: 3.0,  intensity: 'ringan' },
  { name: 'Burpee',            category: 'Bodyweight', met: 8.0,  intensity: 'berat'  },
  { name: 'Jumping Jack',      category: 'Kardio',     met: 8.0,  intensity: 'sedang' },
  { name: 'High Knees',        category: 'Kardio',     met: 8.0,  intensity: 'berat'  },
  { name: 'Lari 8 km/jam',     category: 'Kardio',     met: 8.3,  intensity: 'sedang' },
  { name: 'Lari 12 km/jam',    category: 'Kardio',     met: 11.5, intensity: 'berat'  },
  { name: 'Bersepeda Santai',  category: 'Kardio',     met: 4.0,  intensity: 'ringan' },
  { name: 'Bersepeda Cepat',   category: 'Kardio',     met: 10.0, intensity: 'berat'  },
  { name: 'Renang Santai',     category: 'Kardio',     met: 6.0,  intensity: 'sedang' },
  { name: 'Bench Press',       category: 'Beban',      met: 5.0,  intensity: 'sedang' },
  { name: 'Deadlift',          category: 'Beban',      met: 6.0,  intensity: 'berat'  },
  { name: 'Barbell Squat',     category: 'Beban',      met: 6.0,  intensity: 'berat'  },
  { name: 'Dumbbell Curl',     category: 'Beban',      met: 3.5,  intensity: 'ringan' },
  { name: 'Shoulder Press',    category: 'Beban',      met: 4.0,  intensity: 'sedang' },
  { name: 'Lat Pulldown',      category: 'Beban',      met: 5.0,  intensity: 'sedang' },
  { name: 'Hip Thrust',        category: 'Beban',      met: 4.5,  intensity: 'sedang' },
  { name: 'Tricep Dip',        category: 'Bodyweight', met: 4.0,  intensity: 'sedang' },
  { name: 'Jalan Kaki',        category: 'Kardio',     met: 3.5,  intensity: 'ringan' },
  { name: 'Skip / Jump Rope',  category: 'Kardio',     met: 12.3, intensity: 'berat'  },
]

// ─── Categories ──────────────────────────────────────────────────────────────
export const muscleCategories = ['Semua', 'Dada', 'Punggung', 'Kaki', 'Bokong', 'Bahu', 'Bisep', 'Trisep', 'Perut', 'Kardio']
export const metCategories    = ['Semua', 'Bodyweight', 'Beban', 'Kardio', 'Core']