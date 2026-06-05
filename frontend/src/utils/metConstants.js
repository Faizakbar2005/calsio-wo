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