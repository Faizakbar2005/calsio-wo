/**
 * ragService.js
 * RAG Pipeline — TF-IDF Retriever + Gemini Generator
 * Node.js backend (CommonJS)
 *
 * Install deps:
 *   npm install @google/generative-ai express
 *
 * ENV:
 *   GEMINI_API_KEY=your_key_here
 */

const { GoogleGenerativeAI } = require('@google/generative-ai')
const { Router }             = require('express')

// ⚠️  irService.js aslinya diimport dari frontend — pindahkan file tersebut
//     ke backend (misal: src/services/irService.js) lalu sesuaikan path ini.
const { search } = require('./irService')

// ─────────────────────────────────────────
// Config
// ─────────────────────────────────────────
const GEMINI_MODEL   = 'gemini-3.5-flash'  // ganti ke gemini-1.5-pro untuk kualitas lebih tinggi
const TOP_K_RETRIEVE = 6                    // ambil lebih banyak dokumen untuk konteks richer
const MAX_TOKENS     = 1024
const TEMPERATURE    = 0.3                  // rendah = lebih faktual, lebih sedikit halusinasi

// ─────────────────────────────────────────
// 1. Inisialisasi Gemini Client
// ─────────────────────────────────────────
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY tidak ditemukan di environment variables')
  return new GoogleGenerativeAI(apiKey)
}

// ─────────────────────────────────────────
// 2. Format Konteks dari Hasil Retrieval
// ─────────────────────────────────────────
function formatContext(results) {
  return results.map((r, i) => {
    const raw = r.raw
    let content = ''

    if (r.type === 'exercise') {
      content = `Gerakan: ${raw.name}
Muscle Group: ${raw.muscle}
Equipment: ${raw.equipment}
Level: ${raw.level}
MET: ${raw.met}
Estimasi kalori (70kg):
  - 15 mnt: ${Math.round(raw.met * 70 * (15 / 60))} kcal
  - 30 mnt: ${Math.round(raw.met * 70 * 0.5)} kcal
  - 60 mnt: ${Math.round(raw.met * 70)} kcal
Deskripsi: ${raw.desc}
Cara melakukan: ${raw.steps.map((s, i) => `${i + 1}. ${s}`).join(' | ')}
Otot yang dilatih: ${raw.muscles.join(', ')}
Tips: ${raw.tip}`

    } else if (r.type === 'muscle') {
      content = `Muscle Group: ${raw.name} (${raw.latin})
Deskripsi: ${raw.desc}
Latihan utama: ${raw.exercises.join(', ')}
Tips: ${raw.tip}`

    } else if (r.type === 'nutrisi') {
      content = `Tips Nutrisi — ${raw.title}:
${raw.items.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}`

    } else if (r.type === 'makro') {
      content = `Makronutrien: ${raw.name}
Kalori per gram: ${raw.kcalPerGram} kcal
Persentase kebutuhan harian: ${raw.pct}%
Deskripsi: ${raw.desc}`

    } else if (r.type === 'met') {
      content = `Aktivitas: ${raw.name}
Kategori: ${raw.category}
Intensitas: ${raw.intensity}
Nilai MET: ${raw.met}
Estimasi kalori (70kg):
  - 15 mnt: ${Math.round(raw.met * 70 * (15 / 60))} kcal
  - 30 mnt: ${Math.round(raw.met * 70 * 0.5)} kcal
  - 60 mnt: ${Math.round(raw.met * 70)} kcal`
    }

    return `[Dokumen ${i + 1} | Tipe: ${r.type} | Skor relevansi: ${(r.score * 100).toFixed(0)}%]\n${content}`
  }).join('\n\n---\n\n')
}

// ─────────────────────────────────────────
// 3. System Prompt
// ─────────────────────────────────────────
const SYSTEM_INSTRUCTION = `Kamu adalah asisten fitness dan nutrisi untuk aplikasi Calsio — ahli kebugaran yang ramah dan tepat sasaran.

ATURAN WAJIB:
1. Jawab HANYA menggunakan informasi dari dokumen referensi yang diberikan di setiap pertanyaan
2. Jika informasi tidak tersedia di dokumen, jawab: "Informasi tersebut belum tersedia di panduan Calsio."
3. JANGAN mengarang angka MET, kalori, nama otot, atau fakta yang tidak ada di dokumen
4. Gunakan angka spesifik dari dokumen jika relevan (MET, kcal, repetisi, dll)
5. Jawab dalam Bahasa Indonesia yang jelas, hangat, dan mudah dipahami
6. Panjang jawaban: 3-5 kalimat yang padat dan informatif
7. Jika ada beberapa dokumen relevan, sintesiskan informasinya secara kohesif
8. Jangan sebut "dokumen" atau "referensi" dalam jawaban — bicara langsung ke pengguna`

// ─────────────────────────────────────────
// 4. Build Prompt User
// ─────────────────────────────────────────
function buildUserPrompt(context, query, userProfile = null) {
  const profileSection = userProfile
    ? `\nProfil pengguna: berat badan ${userProfile.weight}kg, tinggi ${userProfile.height}cm, usia ${userProfile.age} tahun, tujuan: ${userProfile.goal}\n`
    : ''

  return `${profileSection}
=== DOKUMEN REFERENSI ===
${context}
=== AKHIR DOKUMEN ===

Pertanyaan pengguna: "${query}"`
}

// ─────────────────────────────────────────
// 5. Core RAG Function
// ─────────────────────────────────────────
/**
 * ask(query, options) → { answer, sources, retrievedDocs }
 *
 * @param {string} query
 * @param {object} options
 *   @param {object}   userProfile  - { weight, height, age, goal } (opsional)
 *   @param {number}   topK         - Jumlah dokumen yang diambil (default: TOP_K_RETRIEVE)
 *   @param {boolean}  streaming    - Aktifkan streaming response (default: false)
 *   @param {function} onChunk      - Callback untuk streaming: (chunk: string) => void
 */
async function ask(query, options = {}) {
  const {
    userProfile = null,
    topK        = TOP_K_RETRIEVE,
    streaming   = false,
    onChunk     = null,
  } = options

  // ── Step 1: Retrieve ──────────────────────
  const results = search(query, topK)

  if (results.length === 0) {
    return {
      answer       : 'Informasi tersebut belum tersedia di panduan Calsio.',
      sources      : [],
      retrievedDocs: [],
    }
  }

  // ── Step 2: Format Context ─────────────────
  const context    = formatContext(results)
  const userPrompt = buildUserPrompt(context, query, userProfile)

  // ── Step 3: Generate dengan Gemini ─────────
  const genAI = getGeminiClient()
  const model = genAI.getGenerativeModel({
    model            : GEMINI_MODEL,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig : {
      maxOutputTokens: MAX_TOKENS,
      temperature    : TEMPERATURE,
      topP           : 0.9,
    },
  })

  let answer = ''

  if (streaming && typeof onChunk === 'function') {
    const streamResult = await model.generateContentStream(userPrompt)
    for await (const chunk of streamResult.stream) {
      const text = chunk.text()
      answer += text
      onChunk(text)
    }
  } else {
    const result = await model.generateContent(userPrompt)
    answer = result.response.text()
  }

  // ── Step 4: Return hasil + metadata ────────
  return {
    answer       : answer.trim(),
    sources      : results.map(r => ({
      id   : r.id,
      type : r.type,
      title: r.title,
      score: parseFloat((r.score * 100).toFixed(1)),
    })),
    retrievedDocs: results,
  }
}

// ─────────────────────────────────────────
// 6. Multi-turn Chat
// ─────────────────────────────────────────
class CalsioChat {
  constructor(userProfile = null) {
    this.userProfile = userProfile
    this.history     = []
    this.genAI       = getGeminiClient()
  }

  async sendMessage(query) {
    const results = search(query, TOP_K_RETRIEVE)
    const context = results.length > 0
      ? formatContext(results)
      : 'Tidak ada dokumen relevan ditemukan.'

    const userPrompt = buildUserPrompt(context, query, this.userProfile)

    const model = this.genAI.getGenerativeModel({
      model            : GEMINI_MODEL,
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig : { maxOutputTokens: MAX_TOKENS, temperature: TEMPERATURE },
    })

    const chat   = model.startChat({ history: this.history })
    const result = await chat.sendMessage(userPrompt)
    const answer = result.response.text().trim()

    this.history.push({ role: 'user',  parts: [{ text: query }] })
    this.history.push({ role: 'model', parts: [{ text: answer }] })

    // Batasi history max 10 turn (20 entri)
    if (this.history.length > 20) {
      this.history = this.history.slice(-20)
    }

    return {
      answer,
      sources: results.map(r => ({
        id   : r.id,
        type : r.type,
        title: r.title,
        score: parseFloat((r.score * 100).toFixed(1)),
      })),
    }
  }

  clearHistory() {
    this.history = []
  }
}

// ─────────────────────────────────────────
// 7. Express Router
// ─────────────────────────────────────────
const ragRouter = Router()

// POST /api/rag/ask
ragRouter.post('/ask', async (req, res) => {
  const { query, userProfile } = req.body

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Parameter "query" wajib diisi.' })
  }

  try {
    const result = await ask(query.trim(), { userProfile })
    return res.json(result)
  } catch (err) {
    console.error('[RAG Error]', err)
    return res.status(500).json({ error: 'Gagal menghubungi AI. Coba lagi.' })
  }
})

// POST /api/rag/ask/stream  (Server-Sent Events)
ragRouter.post('/ask/stream', async (req, res) => {
  const { query, userProfile } = req.body

  if (!query) return res.status(400).json({ error: 'Query wajib diisi.' })

  res.setHeader('Content-Type',  'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection',    'keep-alive')

  try {
    const result = await ask(query.trim(), {
      userProfile,
      streaming: true,
      onChunk  : (chunk) => {
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`)
      },
    })

    res.write(`data: ${JSON.stringify({ done: true, sources: result.sources })}\n\n`)
    res.end()
  } catch (err) {
    console.error('[RAG Stream Error]', err)
    res.write(`data: ${JSON.stringify({ error: 'Gagal menghubungi AI.' })}\n\n`)
    res.end()
  }
})

// ─────────────────────────────────────────
// 8. Format Personal History Context
// ─────────────────────────────────────────
function formatPersonalContext(histories) {
  if (!histories || histories.length === 0) {
    return '[DATA PERSONAL]\nPengguna belum memiliki riwayat latihan dalam 30 hari terakhir.'
  }

  const now      = new Date()
  const todayStr = now.toISOString().slice(0, 10)

  // ── Grup by tanggal ────────────────────
  const byDate = {}
  histories.forEach(h => {
    const date = new Date(h.createdAt).toISOString().slice(0, 10)
    if (!byDate[date]) byDate[date] = []
    byDate[date].push(h)
  })

  // ── Hari ini ───────────────────────────
  const todayData     = byDate[todayStr] || []
  const todayCalories = todayData.reduce((s, h) => s + (h.calories || 0), 0)
  const todayDuration = todayData.reduce((s, h) => s + (h.duration || 0), 0)
  const todayExercises = [...new Set(todayData.map(h => h.exercise_name).filter(Boolean))]

  // ── Minggu ini (7 hari terakhir) ───────
  const weekAgo  = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const weekData = histories.filter(h =>
    new Date(h.createdAt).toISOString().slice(0, 10) >= weekAgo
  )
  const weekCals  = weekData.reduce((s, h) => s + (h.calories || 0), 0)
  const weekDur   = weekData.reduce((s, h) => s + (h.duration || 0), 0)
  const weekDays  = new Set(
    weekData.map(h => new Date(h.createdAt).toISOString().slice(0, 10))
  ).size

  // ── Streak ─────────────────────────────
  const allDates    = Object.keys(byDate).sort().reverse()
  let streak        = 0
  for (let i = 0; i < 30; i++) {
    const expected = new Date(now - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    if (byDate[expected]) streak++
    else break
  }

  // ── Per gerakan (top 5) ────────────────
  const byExercise = {}
  histories.forEach(h => {
    if (!h.exercise_name) return
    if (!byExercise[h.exercise_name]) {
      byExercise[h.exercise_name] = {
        count   : 0,
        calories: 0,
        duration: 0,
        muscle  : h.muscle_group || ''
      }
    }
    byExercise[h.exercise_name].count    += 1
    byExercise[h.exercise_name].calories += (h.calories || 0)
    byExercise[h.exercise_name].duration += (h.duration || 0)
  })
  const topExercises = Object.entries(byExercise)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)

  // ── Build string ───────────────────────
  const lines = []
  lines.push(`[DATA PERSONAL PENGGUNA]`)
  lines.push(`Tanggal hari ini: ${todayStr}`)
  lines.push(``)

  lines.push(`Hari Ini (${todayStr}):`)
  if (todayData.length === 0) {
    lines.push(`  Belum ada latihan hari ini.`)
  } else {
    lines.push(`  Total kalori terbakar : ${todayCalories.toFixed(1)} kcal`)
    lines.push(`  Total durasi          : ${todayDuration} menit`)
    lines.push(`  Gerakan               : ${todayExercises.join(', ') || '-'}`)
    todayData.forEach(h => {
      lines.push(`    · ${h.exercise_name || 'Latihan'}: ${(h.calories || 0).toFixed(1)} kcal, ${h.duration || 0} mnt${h.muscle_group ? `, otot: ${h.muscle_group}` : ''}`)
    })
  }

  lines.push(``)
  lines.push(`Minggu Ini (7 hari terakhir):`)
  lines.push(`  Total kalori  : ${weekCals.toFixed(1)} kcal`)
  lines.push(`  Total durasi  : ${weekDur} menit`)
  lines.push(`  Hari aktif    : ${weekDays} dari 7 hari`)

  lines.push(``)
  lines.push(`Streak & Progress:`)
  lines.push(`  Streak latihan berturut-turut : ${streak} hari`)
  lines.push(`  Total sesi (30 hari)          : ${histories.length} sesi`)

  lines.push(``)
  lines.push(`Gerakan Terbanyak (Top 5):`)
  if (topExercises.length === 0) {
    lines.push(`  Belum ada data.`)
  } else {
    topExercises.forEach(([name, d]) => {
      lines.push(`  · ${name}: ${d.count}x | total ${d.calories.toFixed(0)} kcal | ${d.duration} mnt${d.muscle ? ` | otot: ${d.muscle}` : ''}`)
    })
  }

  return lines.join('\n')
}

// ─────────────────────────────────────────
// 9. Deteksi query personal
// ─────────────────────────────────────────
const PERSONAL_KEYWORDS = [
  'saya', 'aku', 'gue', 'ku',
  'hari ini', 'kemarin', 'minggu ini', 'bulan ini',
  'kalori saya', 'progress saya', 'latihan saya',
  'sudah berapa', 'sudah latihan', 'berapa kalori',
  'streak', 'total saya', 'riwayat', 'history',
  'paling sering', 'sudah berapa kali', 'target saya',
]

function isPersonalQuery(query) {
  const lower = query.toLowerCase()
  return PERSONAL_KEYWORDS.some(kw => lower.includes(kw))
}

// ─────────────────────────────────────────
// 10. askPersonal — RAG + data history user
// ─────────────────────────────────────────
async function askPersonal(query, histories = [], options = {}) {
  const { userProfile = null, topK = TOP_K_RETRIEVE } = options

  // Dokumen fitness yang relevan (opsional, bisa 0)
  const docResults  = search(query, topK)
  const docContext  = docResults.length > 0
    ? `\n[REFERENSI FITNESS]\n${formatContext(docResults)}`
    : ''

  const personalCtx = formatPersonalContext(histories)
  const fullContext = personalCtx + docContext

  const profileSection = userProfile
    ? `Profil pengguna: berat ${userProfile.weight}kg, tinggi ${userProfile.height}cm, usia ${userProfile.age} tahun.\n\n`
    : ''

  const userPrompt = `${profileSection}${fullContext}\n\nPertanyaan: "${query}"`

  const genAI = getGeminiClient()
  const model = genAI.getGenerativeModel({
    model            : GEMINI_MODEL,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig : {
      maxOutputTokens: MAX_TOKENS,
      temperature    : TEMPERATURE,
    },
  })

  const result = await model.generateContent(userPrompt)
  const answer = result.response.text().trim()

  return {
    answer,
    isPersonal: true,
    sources   : docResults.map(r => ({
      id   : r.id,
      type : r.type,
      title: r.title,
      score: parseFloat((r.score * 100).toFixed(1)),
    })),
  }
}

// ─────────────────────────────────────────
// Exports
// ─────────────────────────────────────────
module.exports = { ask, askPersonal, isPersonalQuery, formatPersonalContext, CalsioChat, ragRouter }
