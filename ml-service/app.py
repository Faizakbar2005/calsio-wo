from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# ── Load model, scaler, dan feature list ──
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model    = joblib.load(os.path.join(BASE_DIR, 'gradient_boosting_calories_model.pkl'))
scaler   = joblib.load(os.path.join(BASE_DIR, 'scaler_calories.pkl'))
features = joblib.load(os.path.join(BASE_DIR, 'feature_list.pkl'))

# Rata-rata default untuk fitur opsional (dari notebook)
DEFAULTS = {
    'Fat_Percentage'               : 24.98,
    'Water_Intake (liters)'        : 2.63,
    'Workout_Frequency (days/week)': 3.32,
}

# ── Hitung feature importance sekali saat startup ──────────────────────────
# Dikelompokkan jadi 5 kategori yang mudah dipahami user
def build_feature_importance():
    raw = dict(zip(features, model.feature_importances_))

    # Kelompokkan fitur ke kategori yang user-friendly
    groups = {
        'Durasi'  : ['Session_Duration (hours)'],
        'Avg BPM' : ['Avg_BPM'],
        'Fat %'   : ['Fat_Percentage'],
        'Umur'    : ['Age'],
        'Gender'  : ['Gender'],
        'Lainnya' : [f for f in features if f not in [
            'Session_Duration (hours)', 'Avg_BPM', 'Fat_Percentage', 'Age', 'Gender'
        ]],
    }

    result = {}
    for label, feat_list in groups.items():
        result[label] = round(float(sum(raw.get(f, 0) for f in feat_list)) * 100, 1)

    # Urutkan dari terbesar, buang 'Lainnya' kalau 0
    sorted_result = sorted(result.items(), key=lambda x: x[1], reverse=True)
    return [{'label': k, 'pct': v} for k, v in sorted_result if v > 0]

FEATURE_IMPORTANCE = build_feature_importance()

# Warna per label untuk frontend
IMPORTANCE_COLORS = {
    'Durasi'  : '#eab308',
    'Avg BPM' : '#60a5fa',
    'Fat %'   : '#a78bfa',
    'Umur'    : '#34d399',
    'Gender'  : '#f97316',
    'Lainnya' : '#6b7280',
}


def preprocess(data: dict) -> pd.DataFrame:
    inp = data.copy()

    # 1. Gender encoding (Female=0, Male=1)
    inp['Gender'] = 1 if str(inp.get('Gender', 'Male')).lower() == 'male' else 0

    # 2. BMI — hitung kalau belum ada
    if 'BMI' not in inp:
        weight = float(inp['Weight (kg)'])
        height = float(inp['Height (m)'])
        inp['BMI'] = weight / (height ** 2)

    # 3. BPM_Range — hitung kalau belum ada
    if 'BPM_Range' not in inp:
        inp['BPM_Range'] = int(inp['Max_BPM']) - int(inp['Resting_BPM'])

    # 4. Isi fitur opsional kalau tidak dikirim
    for key, default_val in DEFAULTS.items():
        if key not in inp:
            inp[key] = default_val

    # 5. One-Hot Encoding Workout_Type
    workout_type = inp.pop('Workout_Type', 'Cardio')
    for wt in ['Cardio', 'HIIT', 'Strength', 'Yoga']:
        inp[f'Workout_Type_{wt}'] = 1 if workout_type == wt else 0

    # 6. Susun sesuai urutan features
    row = pd.DataFrame([inp])[features]
    return row


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body kosong atau bukan JSON'}), 400

        # Validasi field wajib
        required_fields = [
            'Age', 'Gender', 'Weight (kg)', 'Height (m)',
            'Max_BPM', 'Avg_BPM', 'Resting_BPM',
            'Session_Duration (hours)', 'Workout_Type', 'Experience_Level'
        ]
        missing = [f for f in required_fields if f not in data]
        if missing:
            return jsonify({'error': f'Field wajib tidak ada: {missing}'}), 400

        # Preprocess & predict
        row        = preprocess(data)
        row_scaled = scaler.transform(row)
        prediction = model.predict(row_scaled)[0]

        # Kirim feature importance yang sudah dihitung saat startup
        importance_with_colors = [
            {
                'label': item['label'],
                'pct'  : item['pct'],
                'color': IMPORTANCE_COLORS.get(item['label'], '#6b7280'),
            }
            for item in FEATURE_IMPORTANCE
        ]

        return jsonify({
            'calories_burned'   : round(float(prediction), 2),
            'unit'              : 'kkal',
            'status'            : 'success',
            'feature_importance': importance_with_colors,  # ← kirim ke frontend
        })

    except KeyError as e:
        return jsonify({'error': f'Field tidak ditemukan: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/feature-importance', methods=['GET'])
def feature_importance():
    """Endpoint terpisah kalau frontend mau fetch importance tanpa predict"""
    result = [
        {
            'label': item['label'],
            'pct'  : item['pct'],
            'color': IMPORTANCE_COLORS.get(item['label'], '#6b7280'),
        }
        for item in FEATURE_IMPORTANCE
    ]
    return jsonify({'feature_importance': result})


@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'model' : 'GradientBoostingRegressor',
        'r2'    : 0.9959,
    })


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 7860))
    app.run(host='0.0.0.0', port=port, debug=False)