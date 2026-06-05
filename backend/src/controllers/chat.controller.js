/**
 * chat.controller.js
 * POST /api/chat
 *
 * RAG Pipeline v2 — intent-aware, DB-first untuk pertanyaan personal
 *
 * Dependency:
 *   npm install @google/generative-ai
 *
 * ENV:
 *   GEMINI_API_KEY=your_key_here
 */

const { GoogleGenerativeAI } = require('@google/generative-ai')
const { Op }                 = require('sequelize')
const { User, Workout, History } = require('../models')

// irService di-require dengan try-catch karena opsional
// (kalau belum ada, chatbot tetap jalan tapi tanpa knowledge base)
let irSearch = null
try {
  const ir = require('../services/irService')
  irSearch  = ir.search
} catch {
  console.warn('[Chat] irService tidak ditemukan — knowledge base dinonaktifkan')
}

// ─── Config ──────────────────────────────────────────────────────────────────
const GEMINI_MODEL  = 'gemini-3.5-flash'
const MAX_TOKENS    = 700
const TEMPERATURE   = 0.3
const TOP_K_DOCS    = 5

// ─── Gemini Client ────────────────────────────────────────────────────────────
function getGemini() {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY tidak ditemukan di .env')
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. INTENT DETECTION
//    Klasifikasi query → 'personal' | 'knowledge' | 'mixed'
//    personal  = pertanyaan tentang data user (latihan hari ini, progres, kalori saya, dll)
//    knowledge = pertanyaan umum fitness/nutrisi
//    mixed     = keduanya (misal: "latihan dada apa yang cocok untuk berat badan saya?")
// ─────────────────────────────────────────────────────────────────────────────
const PERSONAL_KEYWORDS = [
  'saya', 'aku', 'ku', 'gue', 'gw',
  'hari ini', 'tadi', 'kemarin', 'minggu ini', 'bulan ini',
  'latihan saya', 'progres', 'progress', 'riwayat',
  'kalori saya', 'berapa kalori', 'sudah berapa',
  'sudah latihan', 'belum latihan', 'workout saya',
  'berat badan saya', 'bmi saya', 'target saya',
  'pencapaian', 'history', 'data saya', 'statistik',
]

const KNOWLEDGE_KEYWORDS = [
  'cara', 'bagaimana', 'teknik', 'form', 'gerakan',
  'otot', 'muscle', 'nutrisi', 'protein', 'karbo', 'lemak',
  'kalori', 'met', 'diet', 'suplemen', 'tips', 'manfaat',
  'latihan apa', 'exercise', 'workout', 'push up', 'pull up',
  'squat', 'deadlift', 'plank', 'lunges',
]

function detectIntent(query) {
  const lower = query.toLowerCase()
  const isPersonal  = PERSONAL_KEYWORDS.some(k => lower.includes(k))
  const isKnowledge = KNOWLEDGE_KEYWORDS.some(k => lower.includes(k))

  if (isPersonal && isKnowledge) return 'mixed'
  if (isPersonal)               return 'personal'
  return 'knowledge'  // default: knowledge
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. AMBIL DATA USER DARI DB
// ─────────────────────────────────────────────────────────────────────────────
async function getUserContext(userId) {
  if (!userId) return null

  const user = await User.findByPk(userId, {
    attributes: ['name', 'age', 'weight', 'height', 'gender', 'equipment', 'bmi', 'daily_target_calories']
  })
  if (!user) return null

  const today    = new Date()
  const todayStr = today.toISOString().split('T')[0]

  // Workout hari ini
  const todayWorkouts = await Workout.findAll({
    where  : { UserId: userId, createdAt: { [Op.gte]: new Date(todayStr) } },
    order  : [['createdAt', 'DESC']],
    limit  : 20
  })

  // Riwayat 7 hari terakhir (History = sesi selesai dengan total kalori)
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const recentHistory = await History.findAll({
    where : { UserId: userId, createdAt: { [Op.gte]: weekAgo } },
    order : [['createdAt', 'DESC']],
    limit : 14
  })

  // Kalori hari ini dari History
  const todayHistory = recentHistory.filter(h =>
    h.createdAt.toISOString().split('T')[0] === todayStr
  )
  const caloriesToday = Math.round(todayHistory.reduce((s, h) => s + (h.calories || 0), 0))

  // Statistik mingguan
  const totalCaloriesWeek  = Math.round(recentHistory.reduce((s, h) => s + (h.calories || 0), 0))
  const totalDurationWeek  = recentHistory.reduce((s, h) => s + (h.duration || 0), 0)
  const workoutDaysThisWeek = new Set(
    recentHistory.map(h => h.createdAt.toISOString().split('T')[0])
  ).size

  // Hitung kalori hari ini dari workout (pakai caloriesPerMinute jika History kosong)
  const caloriesFromWorkouts = caloriesToday

  return {
    profile       : user.toJSON(),
    todayWorkouts : todayWorkouts.map(w => ({
      muscleGroup: w.muscle_group,
      sets       : w.sets,
      reps       : w.reps,
      restMinutes: w.rest_minutes,
      createdAt  : w.createdAt,
    })),
    caloriesToday,
    weekStats: {
      totalCalories   : totalCaloriesWeek,
      totalDurationMin: totalDurationWeek,
      workoutDays     : workoutDaysThisWeek,
      sessions        : recentHistory.length,
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. FORMAT KONTEKS USER → STRING
// ─────────────────────────────────────────────────────────────────────────────
function formatUserContext(ctx, intent) {
  if (!ctx) return ''

  const { profile, todayWorkouts, caloriesToday, weekStats } = ctx
  const lines = ['=== DATA PENGGUNA (PRIORITAS UTAMA) ===']

  // Profil
  const profileParts = []
  if (profile.name)   profileParts.push(`Nama: ${profile.name}`)
  if (profile.age)    profileParts.push(`Usia: ${profile.age} tahun`)
  if (profile.weight) profileParts.push(`Berat: ${profile.weight} kg`)
  if (profile.height) profileParts.push(`Tinggi: ${profile.height} cm`)
  if (profile.bmi)    profileParts.push(`BMI: ${profile.bmi}`)
  if (profile.gender) profileParts.push(`Gender: ${profile.gender}`)
  if (profile.equipment) profileParts.push(`Peralatan: ${profile.equipment}`)
  if (profile.daily_target_calories) profileParts.push(`Target kalori harian: ${profile.daily_target_calories} kcal`)
  lines.push(profileParts.join(' | '))

  // Latihan hari ini — selalu tampilkan untuk intent personal/mixed
  lines.push('')
  lines.push('--- Latihan Hari Ini ---')
  if (todayWorkouts.length === 0) {
    lines.push('Belum ada latihan yang tercatat hari ini.')
  } else {
    todayWorkouts.forEach((w, i) => {
      lines.push(`${i + 1}. Otot: ${w.muscleGroup} | ${w.sets} set × ${w.reps} reps | Rest: ${w.restMinutes} menit`)
    })
    lines.push(`Kalori terbakar hari ini: ${caloriesToday} kcal`)
  }

  // Statistik mingguan
  lines.push('')
  lines.push('--- Statistik 7 Hari Terakhir ---')
  lines.push(`Hari aktif: ${weekStats.workoutDays} hari dari 7 hari`)
  lines.push(`Total sesi: ${weekStats.sessions} sesi`)
  lines.push(`Total kalori terbakar: ${weekStats.totalCalories} kcal`)
  lines.push(`Total durasi latihan: ${weekStats.totalDurationMin} menit`)

  // Persentase target kalori hari ini
  if (profile.daily_target_calories && caloriesToday > 0) {
    const pct = Math.round((caloriesToday / profile.daily_target_calories) * 100)
    lines.push(`Progress target kalori hari ini: ${pct}% (${caloriesToday}/${profile.daily_target_calories} kcal)`)
  }

  return lines.join('\n')
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. FORMAT DOKUMEN IR → STRING
// ─────────────────────────────────────────────────────────────────────────────
function formatIRContext(results) {
  if (!results || !results.length) return ''

  return results.map((r, i) => {
    const raw = r.raw
    let content = ''

    if (r.type === 'exercise') {
      content = [
        `Gerakan: ${raw.name} | Otot: ${raw.muscle} | Level: ${raw.level} | MET: ${raw.met}`,
        `Estimasi kalori: ${Math.round(raw.met * 70 * 0.5)} kcal/30mnt (berat 70kg)`,
        `Deskripsi: ${raw.desc}`,
        `Tips: ${raw.tip}`,
      ].join('\n')
    } else if (r.type === 'muscle') {
      content = [
        `Otot: ${raw.name} (${raw.latin})`,
        `Deskripsi: ${raw.desc}`,
        `Latihan utama: ${raw.exercises.join(', ')}`,
        `Tips: ${raw.tip}`,
      ].join('\n')
    } else if (r.type === 'nutrisi') {
      content = `Nutrisi — ${raw.title}:\n` + raw.items.map((x, i) => `${i + 1}. ${x}`).join('\n')
    } else if (r.type === 'makro') {
      content = `${raw.name}: ${raw.kcalPerGram} kcal/gram (~${raw.pct}% kebutuhan harian). ${raw.desc}`
    } else if (r.type === 'met') {
      content = `${raw.name} | MET: ${raw.met} | ~${Math.round(raw.met * 70 * 0.5)} kcal/30mnt (70kg) | Intensitas: ${raw.intensity}`
    }

    return `[Referensi ${i + 1} | ${r.type} | relevansi ${(r.score * 100).toFixed(0)}%]\n${content}`
  }).join('\n\n')
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. BANGUN SYSTEM PROMPT BERDASARKAN INTENT
// ─────────────────────────────────────────────────────────────────────────────
function buildSystemPrompt(intent, hasUserData) {
  const base = `Kamu adalah asisten fitness pribadi di aplikasi Calsio — ahli kebugaran yang ramah, akurat, dan berbasis data nyata pengguna.`

  const rules = [
    `Jawab dalam Bahasa Indonesia yang hangat dan natural.`,
    `Maksimal 4-5 kalimat, padat dan actionable.`,
    `JANGAN mengarang angka yang tidak ada di konteks.`,
    `Jangan sebut kata "dokumen", "referensi", atau "konteks" — bicara langsung ke pengguna.`,
  ]

  if (intent === 'personal' && hasUserData) {
    rules.unshift(
      `PRIORITAS UTAMA: Gunakan DATA PENGGUNA untuk menjawab. Data ini adalah data real dari database.`,
      `Sebutkan angka spesifik dari data (kalori, jumlah latihan, hari aktif, dll).`,
      `Jika data menunjukkan belum latihan hari ini, sampaikan dengan jujur dan berikan motivasi.`,
    )
  } else if (intent === 'mixed' && hasUserData) {
    rules.unshift(
      `Kombinasikan DATA PENGGUNA (untuk konteks personal) dengan REFERENSI FITNESS (untuk saran teknis).`,
      `Sebutkan data spesifik pengguna, lalu berikan rekomendasi yang relevan.`,
    )
  } else if (intent === 'knowledge') {
    rules.unshift(
      `Gunakan REFERENSI FITNESS untuk menjawab. Berikan informasi yang akurat dan actionable.`,
      `Jika ada data user yang relevan, personalisasi jawabannya.`,
    )
  } else {
    // personal tapi tidak ada data user (belum login)
    rules.unshift(
      `Pengguna belum login atau data tidak tersedia. Jawab secara umum berdasarkan referensi fitness.`,
      `Sarankan pengguna untuk login agar bisa melihat data personalnya.`,
    )
  }

  return `${base}\n\nATURAN:\n${rules.map((r, i) => `${i + 1}. ${r}`).join('\n')}`
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. BANGUN USER PROMPT
// ─────────────────────────────────────────────────────────────────────────────
function buildUserPrompt(intent, userContextStr, irContextStr, query) {
  const sections = []

  // Urutan konteks berdasarkan intent
  if (intent === 'personal' || intent === 'mixed') {
    if (userContextStr) sections.push(userContextStr)
    if (irContextStr)   sections.push(`=== REFERENSI FITNESS ===\n${irContextStr}`)
  } else {
    // knowledge: IR dulu, data user sebagai pelengkap
    if (irContextStr)   sections.push(`=== REFERENSI FITNESS ===\n${irContextStr}`)
    if (userContextStr) sections.push(`=== KONTEKS PENGGUNA (untuk personalisasi) ===\n${userContextStr}`)
  }

  sections.push(`=== PERTANYAAN PENGGUNA ===\n"${query}"`)

  return sections.join('\n\n')
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. MAIN CONTROLLER
// ─────────────────────────────────────────────────────────────────────────────
async function chat(req, res) {
  const { query, history = [] } = req.body
  const userId = req.user?.id || req.body.userId || null

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'Parameter "query" wajib diisi.' })
  }

  const cleanQuery = query.trim()

  try {
    // ── Step 1: Deteksi intent ──
    const intent = detectIntent(cleanQuery)

    // ── Step 2: Ambil data paralel ──
    const [userCtx, irResults] = await Promise.all([
      getUserContext(userId),
      irSearch ? Promise.resolve(irSearch(cleanQuery, TOP_K_DOCS)) : Promise.resolve([])
    ])

    // ── Step 3: Format konteks ──
    const userContextStr = formatUserContext(userCtx, intent)
    const irContextStr   = formatIRContext(irResults)

    // ── Step 4: Bangun prompt ──
    const systemPrompt = buildSystemPrompt(intent, !!userCtx)
    const userPrompt   = buildUserPrompt(intent, userContextStr, irContextStr, cleanQuery)

    // ── Step 5: Panggil Gemini ──
    const genAI = getGemini()
    const model = genAI.getGenerativeModel({
      model            : GEMINI_MODEL,
      systemInstruction: systemPrompt,
      generationConfig : { maxOutputTokens: MAX_TOKENS, temperature: TEMPERATURE, topP: 0.9 },
    })

    const chatHistory = history
      .filter(m => m.role && m.text)
      .slice(-10)
      .map(m => ({
        role : m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }))

    const session = model.startChat({ history: chatHistory })
    const result  = await session.sendMessage(userPrompt)
    const answer  = result.response.text().trim()

    // ── Step 6: Return ──
    return res.json({
      answer,
      intent,
      sources: irResults.slice(0, 3).map(r => ({
        type : r.type,
        title: r.title,
        score: parseFloat((r.score * 100).toFixed(1))
      })),
      hasUserData: !!userCtx,
      debug: process.env.NODE_ENV === 'development' ? { intent, hasUserData: !!userCtx } : undefined
    })

  } catch (err) {
    console.error('[Chat Error]', err.message)
    return res.status(500).json({ error: 'Gagal memproses pertanyaan. Coba lagi.' })
  }
}

module.exports = { chat }