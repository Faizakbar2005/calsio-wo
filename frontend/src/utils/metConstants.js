// ─────────────────────────────────────────────────────────────
// Nilai MET berdasarkan:
// Ainsworth et al. (2011) "2011 Compendium of Physical Activities"
// Medicine & Science in Sports & Exercise, 43(8), 1575–1581
// DOI: 10.1249/MSS.0b013e31821ece12
// ─────────────────────────────────────────────────────────────

export const MET_PER_MUSCLE = {
  "Dada"    : 5.0,   // Chest Press / Bench Press
  "Punggung": 5.0,   // Pull Up / Barbell Row
  "Kaki"    : 5.5,   // Squat / Leg Press
  "Bokong"  : 5.0,   // Hip Thrust / Glute Bridge
  "Deltoid" : 5.0,   // Shoulder Press / Lateral Raise
  "Bisep"   : 4.5,   // Bicep Curl
  "Trisep"  : 4.5,   // Tricep Extension / Pushdown
  "Perut"   : 3.8,   // Sit Up / Plank / Crunch
  "Kardio"  : 7.0,   // Jogging / Treadmill
}

// MET rata-rata per Workout Type (dari dataset training model)
// Digunakan sebagai baseline normalisasi
export const MET_BASE_PER_TYPE = {
  "Strength": 5.0,
  "HIIT"    : 8.0,
  "Cardio"  : 7.0,
  "Yoga"    : 3.0,
}

/**
 * Hitung faktor koreksi MET
 * Formula: MET Gerakan / MET Rata-rata Workout Type
 *
 * Referensi:
 * Ainsworth, B.E., et al. (2011). Compendium of Physical Activities.
 * Medicine & Science in Sports & Exercise, 43(8), 1575–1581.
 *
 * @param {string} muscleGroup - nama muscle group yang dipilih
 * @param {string} workoutType - workout type hasil mapping
 * @returns {number} faktor koreksi (0.7 – 1.4)
 */
export function getMETFactor(muscleGroup, workoutType) {
  const metGerakan  = MET_PER_MUSCLE[muscleGroup] || 5.0
  const metBaseline = MET_BASE_PER_TYPE[workoutType] || 5.0
  const factor      = metGerakan / metBaseline

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
  const factor = volume / BASELINE_VOLUME

  // Batasi faktor antara 0.5 - 2.5 agar tidak terlalu ekstrem
  // (mis. user input 10 set x 50 rep tidak melonjak 13x lipat)
  return Math.min(Math.max(factor, 0.5), 2.5)
}