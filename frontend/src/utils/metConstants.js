// ─────────────────────────────────────────────────────────────
// Nilai MET berdasarkan:
// Herrmann SD, et al. (2024) "2024 Adult Compendium of Physical
// Activities: A third update of the energy costs of human activities"
// Journal of Sport and Health Science, 13(1), 6–12.
// https://pacompendium.com/
//
// CATATAN METODOLOGI (penting untuk transparansi):
// Compendium resmi TIDAK menyediakan MET per-variasi gerakan
// (mis. tidak ada baris terpisah untuk "Wide Push-Up" vs
// "Diamond Push-Up" vs "Decline Push-Up"). Compendium hanya
// menyediakan kategori umum, contoh:
//   - Kode 02020: Calisthenics (pushups, sit-ups, pull-ups,
//     jumping jacks, burpees), vigorous effort   -> 7.5 MET
//   - Resistance training (free weight/nautilus), vigorous     -> ~6.0 MET
//   - Aerobic, general                                          -> 7.3 MET
//
// Nilai MET_BASE_PER_TYPE di bawah diselaraskan ke kategori umum
// tersebut. Sedangkan MET_PER_EXERCISE (per-gerakan) adalah
// ESTIMASI YANG DIADAPTASI dari kategori tersebut — diberi variasi
// granular berdasarkan tingkat kesulitan/ROM/aktivasi otot tiap
// gerakan, karena Compendium sendiri tidak memecah levelnya
// se-detail itu. Pendekatan estimasi serupa juga lazim dipakai
// aplikasi fitness lain (mis. MyFitnessPal, Fitbit) saat granularitas
// resmi tidak tersedia untuk semua variasi gerakan.
// ─────────────────────────────────────────────────────────────

// ─── MET per Muscle Group (fallback, kalau nama exercise tidak ditemukan) ────
// Diselaraskan ke kategori resistance training umum Compendium 2024 (~5.0-6.0 MET)
export const MET_PER_MUSCLE = {
  "Dada"    : 5.0,   // Resistance training - Chest Press / Bench Press
  "Punggung": 5.0,   // Resistance training - Pull Up / Barbell Row
  "Kaki"    : 5.5,   // Resistance training - Squat / Leg Press
  "Bokong"  : 5.0,   // Resistance training - Hip Thrust / Glute Bridge
  "Deltoid" : 5.0,   // Resistance training - Shoulder Press / Lateral Raise
  "Bisep"   : 4.5,   // Resistance training - Bicep Curl
  "Trisep"  : 4.5,   // Resistance training - Tricep Extension / Pushdown
  "Perut"   : 3.8,   // Calisthenics, light/moderate - Sit Up / Plank / Crunch
  "Kardio"  : 7.3,   // Aerobic, general (kode 02000, Compendium 2024)
}

// MET rata-rata per Workout Type — diselaraskan ke kategori Compendium 2024
// Digunakan sebagai baseline normalisasi (denominator getMETFactor)
export const MET_BASE_PER_TYPE = {
  "Strength": 5.0,   // Resistance training, free weight, moderate-vigorous
  "HIIT"    : 7.5,   // Calisthenics (pushup/situp/pullup/jumping jack/burpee), vigorous — kode 02020
  "Cardio"  : 7.3,   // Aerobic, general — kode 02000
  "Yoga"    : 3.0,   // Yoga, Hatha — Compendium kategori Inactivity/Light Conditioning
}

// ─────────────────────────────────────────────────────────────
// MET per Exercise — estimasi granular per gerakan
//
// PENTING: nilai-nilai ini BUKAN dikutip langsung baris-per-baris
// dari Compendium (karena Compendium tidak punya entri seterperinci
// ini), melainkan estimasi yang diadaptasi dari kategori umum
// Compendium di atas, disesuaikan dengan tingkat kesulitan/ROM
// masing-masing variasi gerakan. Disalin dari field `met` di
// data/homeGymExercises.js agar konsisten dengan data exercise utama.
// ─────────────────────────────────────────────────────────────
export const MET_PER_EXERCISE = {
  // ── NO EQUIPMENT ─────────────────────────────────────────
  'Push-Up'                   : 8.0,
  'Wide Push-Up'               : 8.0,
  'Diamond Push-Up'            : 8.5,
  'Decline Push-Up'            : 8.5,
  'Incline Push-Up'            : 6.0,
  'Pike Push-Up'                : 8.0,
  'Close Grip Push-Up'         : 8.0,
  'Superman Hold'               : 4.0,
  'Back Extension'              : 4.5,
  'Bird Dog'                    : 3.5,
  'Table Row'                   : 5.0,
  'Inverted Row'                : 6.0,
  'Chin-Up'                     : 8.0,
  'Shoulder Taps'                : 7.5,
  'Wall Push-Up'                 : 3.5,
  'Arm Circle'                   : 3.0,
  'Bicep Isometric Curl'         : 3.0,
  'Towel Curl'                   : 3.5,
  'Tricep Dips'                  : 7.5,
  'Bench Dips'                   : 6.0,
  'Crunch'                       : 5.0,
  'Sit-Up'                       : 5.5,
  'Plank'                        : 5.0,
  'Bicycle Crunch'                : 8.0,
  'Leg Raise'                     : 5.5,
  'Russian Twist'                 : 6.0,
  'Mountain Climber'              : 10.0,
  'Flutter Kick'                  : 6.0,
  'Side Plank'                    : 4.5,
  'V-Up'                          : 7.0,
  'Squat'                         : 5.0,
  'Jump Squat'                    : 12.0,
  'Lunge'                         : 5.5,
  'Reverse Lunge'                 : 5.5,
  'Glute Bridge'                  : 4.0,
  'Wall Sit'                      : 4.0,
  'Calf Raise'                    : 3.0,
  'Donkey Kick'                   : 4.5,
  'Fire Hydrant'                  : 4.0,
  'Step-Up'                       : 6.0,
  'Sumo Squat'                    : 5.5,
  'Lateral Lunge'                 : 5.5,
  'Burpee'                        : 12.0,
  'Jumping Jack'                  : 8.0,
  'High Knees'                    : 10.0,
  'Lompat Tali (Tanpa Tali)'      : 12.0,
  'Squat Jump'                    : 12.0,

  // ── WITH DUMBBELL ────────────────────────────────────────
  'DB Chest Press'                : 6.0,
  'DB Incline Press'              : 6.0,
  'DB Flye'                       : 5.0,
  'DB Pullover'                   : 5.5,
  'DB Push-Up (Handles)'          : 8.0,
  'DB Row'                        : 5.5,
  'DB Bent Over Row'              : 6.0,
  'DB Deadlift'                   : 7.0,
  'DB Shrug'                      : 4.0,
  'DB Reverse Flye'               : 4.5,
  'DB Romanian Deadlift'          : 6.5,
  'DB Shoulder Press'             : 6.0,
  'DB Lateral Raise'              : 4.0,
  'DB Front Raise'                : 4.0,
  'DB Arnold Press'               : 5.5,
  'DB Upright Row'                : 5.0,
  'DB Bicep Curl'                 : 4.5,
  'DB Hammer Curl'                : 4.5,
  'DB Concentration Curl'         : 4.0,
  'DB Alternating Curl'           : 4.5,
  'DB Zottman Curl'               : 4.5,
  'DB Overhead Tricep Extension'  : 4.5,
  'DB Skull Crusher'              : 4.5,
  'DB Kickback'                   : 4.0,
  'DB Close-Grip Press'           : 5.5,
  'DB Tate Press'                 : 4.5,
  'DB Russian Twist'              : 6.5,
  'DB Weighted Crunch'            : 5.5,
  'DB Side Bend'                  : 4.0,
  'DB Woodchop'                   : 6.0,
  'DB Goblet Squat'               : 6.0,
  'DB Lunge'                      : 6.0,
  'DB Bulgarian Split Squat'      : 7.0,
  'DB Sumo Squat'                 : 6.0,
  'DB Hip Thrust'                 : 5.5,
  'DB Step-Up'                    : 6.5,
  'DB Calf Raise'                 : 3.5,
  'DB Lateral Lunge'              : 6.0,
  'DB Thruster'                   : 10.0,
  'DB Renegade Row'               : 8.0,
  'DB Swing'                      : 9.0,
  'DB Clean and Press'            : 9.5,
  'DB Burpee'                     : 12.0,
}

/**
 * Hitung faktor koreksi MET
 * Formula: MET Gerakan / MET Rata-rata Workout Type
 *
 * Prioritas pencarian MET gerakan:
 * 1. MET spesifik exercise (exerciseName) dari MET_PER_EXERCISE — estimasi
 *    granular, diadaptasi dari kategori umum Compendium (lihat catatan di atas)
 * 2. MET rata-rata muscle group (muscleGroup) dari MET_PER_MUSCLE — fallback
 * 3. Default 5.0 — fallback terakhir
 *
 * Referensi kategori dasar:
 * Herrmann SD, et al. (2024). 2024 Adult Compendium of Physical Activities.
 * Journal of Sport and Health Science, 13(1), 6–12. https://pacompendium.com/
 *
 * @param {string} muscleGroup - nama muscle group yang dipilih (fallback)
 * @param {string} workoutType - workout type hasil mapping
 * @param {string} [exerciseName] - nama exercise spesifik (opsional, untuk presisi lebih tinggi)
 * @returns {number} faktor koreksi (0.7 – 1.4)
 */
export function getMETFactor(muscleGroup, workoutType, exerciseName = null) {
  const metGerakan =
    (exerciseName && MET_PER_EXERCISE[exerciseName]) ||
    MET_PER_MUSCLE[muscleGroup] ||
    5.0

  const metBaseline = MET_BASE_PER_TYPE[workoutType] || 5.0
  const factor       = metGerakan / metBaseline

  // Batasi faktor antara 0.7 - 1.4 agar tidak terlalu ekstrem
  return Math.min(Math.max(factor, 0.7), 1.4)
}

// ─────────────────────────────────────────────────────────────
// Volume Factor — koreksi berdasarkan Sets x Reps
//
// Model GBR (ml-service/app.py) dilatih TANPA fitur sets/reps,
// sehingga jumlah repetisi latihan tidak tertangkap dalam prediksi.
// Volume factor ini menutup gap tersebut sebagai post-processing,
// di luar model — sejalan dengan pendekatan getMETFactor() di atas.
//
// Referensi:
// Lytle, J.R., Kravits, D.M., Martin, S.E., Green, J.S., Crouse, S.F.,
// & Lambert, B.S. (2019). Predicting energy expenditure of an acute
// resistance exercise bout in men and women.
// Medicine & Science in Sports & Exercise, 51(7), 1532–1537.
// DOI: 10.1249/MSS.0000000000001925
//
// Studi ini menghitung Total Volume (TV = sets x reps x beban) dan
// membuktikan TV berkontribusi signifikan terhadap total energy
// expenditure, diukur langsung via indirect calorimetry (VO2).
// Protokol standar pada studi: 2-3 set x 8-12 repetisi.
// ─────────────────────────────────────────────────────────────

// Baseline volume standar: 3 set x 12 rep = 36
// (titik tengah dari protokol 2-3 set x 8-12 rep pada Lytle et al., 2019)
export const BASELINE_VOLUME = 3 * 12

/**
 * Hitung faktor koreksi volume latihan (sets x reps)
 * Formula: (sets x reps) / BASELINE_VOLUME
 *
 * Referensi:
 * Lytle, Kravits, et al. (2019). DOI: 10.1249/MSS.0000000000001925
 *
 * @param {number} sets - jumlah set
 * @param {number} reps - jumlah repetisi per set
 * @returns {number} faktor koreksi (0.5 – 2.5)
 */
export function getVolumeFactor(sets, reps) {
  if (!sets || !reps) return 1.0  // tidak ada data -> tidak ada koreksi

  const volume = sets * reps
  const factor  = volume / BASELINE_VOLUME

  // Batasi faktor antara 0.5 - 2.5 agar tidak terlalu ekstrem
  // (mis. user input 10 set x 50 rep tidak melonjak 13x lipat)
  return Math.min(Math.max(factor, 0.5), 2.5)
}