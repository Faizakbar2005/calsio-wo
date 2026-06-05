const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:7860';
console.log('[ML_SERVICE_URL]', ML_SERVICE_URL); // ← tambah ini

// Nilai rata-rata dari dataset training (notebook GBR)
// Dipakai sebagai fallback kalau field opsional tidak dikirim frontend
const TRAINING_DEFAULTS = {
  fatPercentage   : 24.98,   // mean Fat_Percentage dari dataset
  waterIntake     : 2.63,    // mean Water_Intake (liters)
  workoutFrequency: 3,        // mean Workout_Frequency (days/week)
  experienceLevel : 2,        // default Intermediate kalau tidak ada di profil
};

/**
 * POST /api/calories/predict
 *
 * Body (camelCase dari frontend):
 * {
 *   age, gender, weight, height,
 *   maxBpm, avgBpm, restingBpm,
 *   sessionDuration, workoutType,
 *   experienceLevel?,   ← dari profil user (1/2/3), BUKAN dari intensity
 *   fatPercentage?,     ← dari profil user
 *   waterIntake?,       ← dari profil user
 *   workoutFrequency?   ← dari profil user
 * }
 */
exports.predictCalories = async (req, res) => {
  try {
    const {
      age, gender, weight, height,
      maxBpm, avgBpm, restingBpm,
      sessionDuration, workoutType,
      experienceLevel,
      fatPercentage, waterIntake, workoutFrequency,
    } = req.body;

    // ── Validasi field wajib ──────────────────────────────────────────────
    const required = {
      age, gender, weight, height,
      maxBpm, avgBpm, restingBpm,
      sessionDuration, workoutType,
    };
    const missing = Object.entries(required)
      .filter(([, v]) => v === undefined || v === null || v === '')
      .map(([k]) => k);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Field wajib tidak boleh kosong: ${missing.join(', ')}`,
      });
    }

    // ── Validasi workoutType ──────────────────────────────────────────────
    const validWorkoutTypes = ['Cardio', 'HIIT', 'Strength', 'Yoga'];
    if (!validWorkoutTypes.includes(workoutType)) {
      return res.status(400).json({
        success: false,
        message: `workoutType harus salah satu dari: ${validWorkoutTypes.join(', ')}`,
      });
    }

    // ── Validasi & resolve experienceLevel ────────────────────────────────
    // Prioritas: dari profil user → fallback ke default (2 = Intermediate)
    // JANGAN pakai intensity sebagai experience level — keduanya berbeda konsep
    let expLevel = Number(experienceLevel);
    if (![1, 2, 3].includes(expLevel)) {
      expLevel = TRAINING_DEFAULTS.experienceLevel; // fallback: 2 (Intermediate)
    }

    // ── Hitung derived features (sesuai notebook section 4.3) ────────────
    const maxBpmNum     = Number(maxBpm);
    const restingBpmNum = Number(restingBpm);
    const weightNum     = Number(weight);
    const heightNum     = Number(height);

    // BPM_Range = Max_BPM - Resting_BPM  ← WAJIB, dari notebook feature engineering
    const bpmRange = maxBpmNum - restingBpmNum;

    // BMI = Weight / Height²  ← sudah ada di dataset, hitung ulang untuk konsistensi
    const bmi = weightNum / (heightNum * heightNum);

    // ── Resolve fitur opsional dengan nilai default dari training data ────
    const resolvedFatPct     = fatPercentage    != null ? Number(fatPercentage)    : TRAINING_DEFAULTS.fatPercentage;
    const resolvedWater      = waterIntake      != null ? Number(waterIntake)      : TRAINING_DEFAULTS.waterIntake;
    const resolvedFrequency  = workoutFrequency != null ? Number(workoutFrequency) : TRAINING_DEFAULTS.workoutFrequency;

    // ── Mapping ke nama kolom asli model Python ───────────────────────────
    // Urutan sesuai features list di notebook section 4.4
    const mlPayload = {
      'Age'                          : Number(age),
      'Gender'                       : gender,           // 'Male' | 'Female' — Flask yang encode
      'Weight (kg)'                  : weightNum,
      'Height (m)'                   : heightNum,
      'Max_BPM'                      : maxBpmNum,
      'Avg_BPM'                      : Number(avgBpm),
      'Resting_BPM'                  : restingBpmNum,
      'BPM_Range'                    : bpmRange,         // ← derived, dihitung di sini
      'Session_Duration (hours)'     : Number(sessionDuration),
      'Fat_Percentage'               : resolvedFatPct,
      'Water_Intake (liters)'        : resolvedWater,
      'Workout_Frequency (days/week)': resolvedFrequency,
      'Experience_Level'             : expLevel,
      'BMI'                          : parseFloat(bmi.toFixed(4)),
      'Workout_Type'                 : workoutType,      // Flask yang one-hot encode
    };

    // ── Log untuk debugging (hapus di production) ─────────────────────────
    if (process.env.NODE_ENV !== 'production') {
      console.log('[predict] payload ke ML:', JSON.stringify(mlPayload, null, 2));
    }

    // ── Kirim ke Flask ML service ─────────────────────────────────────────
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict`, mlPayload, {
      timeout: 10000,
    });

    return res.status(200).json({
      success: true,
      data: {
        caloriesBurned: mlResponse.data.calories_burned,
        unit          : mlResponse.data.unit || 'kcal',
          featureImportance: mlResponse.data.feature_importance || [],
        debug: process.env.NODE_ENV !== 'production' ? {
          bpmRange,
          bmi       : parseFloat(bmi.toFixed(2)),
          expLevel,
          usedDefaults: {
            fatPercentage   : fatPercentage    == null,
            waterIntake     : waterIntake      == null,
            workoutFrequency: workoutFrequency == null,
            experienceLevel : ![1,2,3].includes(Number(experienceLevel)),
          },
        } : undefined,
      },
    });

  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data?.error || 'Error dari ML service',
      });
    }
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return res.status(503).json({
        success: false,
        message: 'ML service tidak tersedia. Pastikan Flask sudah berjalan di port 5001.',
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};