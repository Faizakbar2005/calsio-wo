/**
 * irService.js
 * Information Retrieval engine berbasis TF-IDF
 * v2 — query expansion, re-ranking, prompt hardening
 * (CommonJS)
 */

const { exercises, muscleGuides, nutrisiTips, metData, makronutrien } = require('./bukuData')

// ─────────────────────────────────────────
// 1. Flatten semua data jadi dokumen flat
// ─────────────────────────────────────────
function buildDocuments() {
  const docs = []

  exercises.forEach(ex => {
    docs.push({
      id     : `exercise_${ex.name}`,
      type   : 'exercise',
      title  : ex.name,
      svgIcon: ex.icon,
      color  : ex.color,
      tags   : [ex.muscle, ex.equipment, ex.level],
      body   : [
        ex.name, ex.muscle, ex.equipment, ex.level,
        ex.desc, ex.tip,
        ...ex.steps, ...ex.muscles
      ].join(' '),
      raw: ex
    })
  })

  muscleGuides.forEach(mg => {
    docs.push({
      id     : `muscle_${mg.name}`,
      type   : 'muscle',
      title  : mg.name,
      svgIcon: mg.icon,
      color  : mg.color,
      tags   : [mg.latin],
      body   : [mg.name, mg.latin, mg.desc, mg.tip, ...mg.exercises].join(' '),
      raw    : mg
    })
  })

  nutrisiTips.forEach(tip => {
    docs.push({
      id     : `nutrisi_${tip.title}`,
      type   : 'nutrisi',
      title  : tip.title,
      svgIcon: tip.icon,
      color  : '#22c55e',
      tags   : ['nutrisi', 'diet', 'makan'],
      body   : [tip.title, ...tip.items].join(' '),
      raw    : tip
    })
  })

  makronutrien.forEach(m => {
    docs.push({
      id     : `makro_${m.name}`,
      type   : 'makro',
      title  : m.name,
      svgIcon: m.icon,
      color  : m.color,
      tags   : ['nutrisi', 'makro', 'kalori'],
      body   : [m.name, m.desc, `${m.kcalPerGram} kalori per gram`].join(' '),
      raw    : m
    })
  })

  metData.forEach(m => {
    docs.push({
      id     : `met_${m.name}`,
      type   : 'met',
      title  : m.name,
      svgIcon: null,
      color  : '#60a5fa',
      tags   : [m.category, m.intensity, 'MET', 'kalori'],
      body   : [
        m.name, m.category, m.intensity,
        `MET ${m.met}`,
        `${Math.round(m.met * 70 * 0.5)} kalori per 30 menit`
      ].join(' '),
      raw: m
    })
  })

  return docs
}

// ─────────────────────────────────────────
// 2. Tokenizer & Stopwords Bahasa Indonesia
// ─────────────────────────────────────────
const STOPWORDS = new Set([
  'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'dengan', 'ini', 'itu',
  'adalah', 'ada', 'atau', 'juga', 'pada', 'dalam', 'tidak', 'sudah',
  'bisa', 'saat', 'lebih', 'sangat', 'saja', 'agar', 'apa', 'akan',
  'karena', 'oleh', 'jika', 'namun', 'tetapi', 'tapi', 'dapat', 'kamu',
  'kita', 'kami', 'mereka', 'saya', 'nya', 'per', 'ya', 'lah',
  'cara', 'bagaimana', 'berapa', 'gimana', 'apa', 'siapa',
])

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOPWORDS.has(t))
}

// ─────────────────────────────────────────
// 3. Query Expansion — sinonim & alias
// ─────────────────────────────────────────
const SYNONYMS = {
  'dada'     : ['chest', 'pektoral', 'pectoralis', 'push'],
  'kaki'     : ['leg', 'legs', 'quad', 'quadriceps', 'hamstring', 'betis', 'calves'],
  'perut'    : ['abs', 'core', 'abdominal', 'six', 'pack'],
  'bahu'     : ['shoulder', 'deltoid', 'delts', 'press'],
  'punggung' : ['back', 'lat', 'latissimus', 'rhomboid', 'pull', 'row'],
  'bisep'    : ['bicep', 'biceps', 'curl', 'lengan'],
  'trisep'   : ['tricep', 'triceps', 'dip', 'lengan'],
  'bokong'   : ['glute', 'glutes', 'gluteus', 'pantat', 'hip', 'thrust'],
  'kardio'   : ['cardio', 'aerobik', 'jantung', 'lari', 'run', 'sprint'],
  'push'     : ['pushup', 'push up', 'dada', 'mendorong'],
  'pull'     : ['pullup', 'pull up', 'chinup', 'chin up', 'punggung'],
  'squat'    : ['jongkok', 'kaki', 'legs'],
  'deadlift' : ['angkat', 'beban', 'punggung'],
  'plank'    : ['isometrik', 'core', 'perut'],
  'lunge'    : ['lunges', 'step', 'kaki'],
  'curl'     : ['bicep', 'bisep', 'lengan'],
  'protein'  : ['otot', 'amino', 'daging', 'ayam', 'telur', 'whey'],
  'karbo'    : ['karbohidrat', 'nasi', 'energi', 'carb', 'carbs'],
  'lemak'    : ['fat', 'minyak', 'omega', 'alpukat'],
  'kalori'   : ['kcal', 'energi', 'bakar', 'MET', 'met'],
  'diet'     : ['defisit', 'makan', 'nutrisi', 'meal'],
  'tidur'    : ['sleep', 'istirahat', 'pemulihan', 'recovery'],
  'air'      : ['hidrasi', 'minum', 'hydration'],
  'suplemen' : ['whey', 'creatine', 'vitamin', 'supplement'],
  'pemula'   : ['beginner', 'awal', 'dasar', 'mudah'],
  'lanjut'   : ['advanced', 'berat', 'expert', 'mahir'],
  'menengah' : ['intermediate', 'sedang'],
  'latihan'  : ['exercise', 'workout', 'gerakan', 'olahraga'],
  'benar'    : ['correct', 'cara', 'teknik', 'form', 'posisi'],
  'bakar'    : ['kalori', 'lemak', 'fat', 'kcal', 'burn'],
  'besar'    : ['otot', 'massa', 'bulk', 'berat'],
  'kurus'    : ['defisit', 'diet', 'lean', 'cut', 'turun'],
}

function expandQuery(query) {
  const tokens  = tokenize(query)
  const expanded = new Set(tokens)

  tokens.forEach(t => {
    if (SYNONYMS[t]) {
      SYNONYMS[t].forEach(s => tokenize(s).forEach(st => expanded.add(st)))
    }
    Object.entries(SYNONYMS).forEach(([key, vals]) => {
      if (vals.some(v => v.toLowerCase().includes(t) || t.includes(v.toLowerCase()))) {
        expanded.add(key)
        tokenize(key).forEach(kt => expanded.add(kt))
      }
    })
  })

  return [...expanded].join(' ')
}

// ─────────────────────────────────────────
// 4. TF-IDF
// ─────────────────────────────────────────
function computeTF(tokens) {
  const tf    = {}
  const total = tokens.length
  tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1 })
  Object.keys(tf).forEach(k => { tf[k] = tf[k] / total })
  return tf
}

function computeIDF(docs, allTerms) {
  const idf = {}
  const N   = docs.length
  allTerms.forEach(term => {
    const count = docs.filter(d => d.tokens.includes(term)).length
    idf[term] = Math.log((N + 1) / (count + 1)) + 1
  })
  return idf
}

// ─────────────────────────────────────────
// 5. Build Index (lazy, cached)
// ─────────────────────────────────────────
let _index = null

function buildIndex() {
  if (_index) return _index

  const docs         = buildDocuments()
  const tokenizedDocs = docs.map(doc => ({ ...doc, tokens: tokenize(doc.body) }))
  const allTerms     = [...new Set(tokenizedDocs.flatMap(d => d.tokens))]
  const idf          = computeIDF(tokenizedDocs, allTerms)

  const indexed = tokenizedDocs.map(doc => {
    const tf    = computeTF(doc.tokens)
    const tfidf = {}
    doc.tokens.forEach(term => {
      tfidf[term] = (tf[term] || 0) * (idf[term] || 1)
    })
    return { ...doc, tfidf }
  })

  _index = { docs: indexed, idf, allTerms }
  return _index
}

// ─────────────────────────────────────────
// 6. Cosine Similarity
// ─────────────────────────────────────────
function cosineSimilarity(queryVec, docVec) {
  const terms = Object.keys(queryVec)
  let dot = 0, qMag = 0, dMag = 0

  terms.forEach(t => {
    dot  += (queryVec[t] || 0) * (docVec[t] || 0)
    qMag += (queryVec[t] || 0) ** 2
  })
  Object.values(docVec).forEach(v => { dMag += v ** 2 })

  const mag = Math.sqrt(qMag) * Math.sqrt(dMag)
  return mag === 0 ? 0 : dot / mag
}

// ─────────────────────────────────────────
// 7. Re-ranking
// ─────────────────────────────────────────
function rerank(scored, originalQuery) {
  const lower      = originalQuery.toLowerCase()
  const origTokens = tokenize(originalQuery)

  scored.forEach(doc => {
    if (doc.title.toLowerCase() === lower)           doc.score += 1.5
    if (doc.title.toLowerCase().includes(lower))     doc.score += 0.8

    origTokens.forEach(t => {
      if (doc.title.toLowerCase().includes(t))       doc.score += 0.3
    })

    doc.tags.forEach(tag => {
      origTokens.forEach(t => {
        if (tag.toLowerCase().includes(t))           doc.score += 0.2
      })
    })

    const workoutWords  = ['latihan', 'gerakan', 'exercise', 'workout', 'cara', 'otot']
    const isWorkoutQuery = origTokens.some(t => workoutWords.includes(t))
    if (isWorkoutQuery && (doc.type === 'exercise' || doc.type === 'muscle')) {
      doc.score += 0.15
    }

const nutriWords   = ['nutrisi', 'makan', 'diet', 'kalori', 'protein', 'karbo', 'lemak']
    const isNutriQuery = origTokens.some(t => nutriWords.includes(t))
    if (isNutriQuery && (doc.type === 'nutrisi' || doc.type === 'makro')) {
      doc.score += 0.15
    }

    // ── Type boosting berdasarkan intent ──────────────
const isExerciseIntent = origTokens.some(t => 
  ['gerakan','lakukan','teknik','form','steps','posisi','benar','push','pull','squat','plank','lunge','curl','dip','crunch','burpee','latihan','workout','exercise'].includes(t)
)
const isMETIntent = origTokens.some(t => 
  ['kalori','kcal','met','bakar','menit','jam','berapa','terbakar'].includes(t)
)
const isMuscleIntent = origTokens.some(t => 
  ['otot','muscle','melatih','bagian','dada','punggung','kaki','bahu','bisep','trisep','perut','bokong'].includes(t)
)
const isNutriIntent = origTokens.some(t => 
  ['makan','nutrisi','diet','protein','karbo','lemak','suplemen','makanan','minum','air','hidrasi','tidur','pemulihan'].includes(t)
)

    if (isExerciseIntent && doc.type === 'exercise') doc.score += 0.4
    if (isMETIntent      && doc.type === 'met')      doc.score += 0.4
    if (isMuscleIntent   && doc.type === 'muscle')   doc.score += 0.4
    if (isNutriIntent    && (doc.type === 'nutrisi' || doc.type === 'makro')) doc.score += 0.4
  })

  return scored
}

// ─────────────────────────────────────────
// 8. SEARCH
// ─────────────────────────────────────────
function search(query, topK = 5) {
  const { docs, idf } = buildIndex()

  const expandedQuery = expandQuery(query)
  const queryTokens   = tokenize(expandedQuery)

  if (queryTokens.length === 0) return []

  const queryTF  = computeTF(queryTokens)
  const queryVec = {}
  queryTokens.forEach(t => {
    queryVec[t] = (queryTF[t] || 0) * (idf[t] || 1)
  })

  const scored   = docs.map(doc => ({ ...doc, score: cosineSimilarity(queryVec, doc.tfidf) }))
  const reranked = rerank(scored, query)

  return reranked
    .filter(d => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}

// ─────────────────────────────────────────
// 9. Format context untuk LLM
// ─────────────────────────────────────────
function formatForLLM(results, query) {
  const context = results.map((r, i) => {
    const raw = r.raw
    let content = ''

    if (r.type === 'exercise') {
      content = `Gerakan: ${raw.name}
Muscle Group: ${raw.muscle}
Equipment: ${raw.equipment}
Level: ${raw.level}
MET: ${raw.met}
Estimasi kalori (70kg): ${Math.round(raw.met * 70 * (15/60))} kcal/15 mnt | ${Math.round(raw.met * 70 * 0.5)} kcal/30 mnt | ${Math.round(raw.met * 70)} kcal/60 mnt
Deskripsi: ${raw.desc}
Cara melakukan: ${raw.steps.map((s, i) => `${i+1}. ${s}`).join(' ')}
Otot yang dilatih: ${raw.muscles.join(', ')}
Tips: ${raw.tip}`

    } else if (r.type === 'muscle') {
      content = `Muscle Group: ${raw.name} (${raw.latin})
Deskripsi: ${raw.desc}
Latihan utama: ${raw.exercises.join(', ')}
Tips: ${raw.tip}`

    } else if (r.type === 'nutrisi') {
      content = `Tips Nutrisi — ${raw.title}:
${raw.items.map((item, i) => `${i + 1}. ${item}`).join('\n')}`

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
Estimasi kalori (berat badan 70kg):
  - 15 menit: ${Math.round(raw.met * 70 * (15/60))} kcal
  - 30 menit: ${Math.round(raw.met * 70 * 0.5)} kcal
  - 60 menit: ${Math.round(raw.met * 70)} kcal`
    }

    return `[Dokumen ${i + 1} | Tipe: ${r.type} | Relevansi: ${(r.score * 100).toFixed(0)}%]\n${content}`
  }).join('\n\n---\n\n')

  return `Kamu adalah asisten fitness dan nutrisi untuk aplikasi Calsio. Tugasmu adalah menjawab pertanyaan pengguna berdasarkan HANYA dokumen referensi yang diberikan.

ATURAN WAJIB:
1. Jawab HANYA menggunakan informasi dari dokumen referensi di bawah
2. Jika informasi tidak tersedia di dokumen, jawab: "Informasi tersebut belum tersedia di panduan Calsio."
3. JANGAN mengarang angka MET, kalori, nama otot, atau fakta yang tidak ada di dokumen
4. Gunakan angka spesifik dari dokumen jika relevan (MET, kcal, repetisi, dll)
5. Jawab dalam Bahasa Indonesia yang jelas dan mudah dipahami
6. Panjang jawaban: 3-5 kalimat, padat dan informatif
7. Jika ada beberapa dokumen relevan, sintesiskan informasinya secara kohesif

=== DOKUMEN REFERENSI ===
${context}
=== AKHIR DOKUMEN ===

Pertanyaan pengguna: "${query}"

Jawaban (berdasarkan dokumen di atas):`
}

// ─────────────────────────────────────────
// 10. Fallback summary (tanpa LLM)
// ─────────────────────────────────────────
function buildFallbackSummary(results, query) {
  if (!results.length) {
    return `Tidak ditemukan informasi yang relevan untuk "${query}". Coba kata kunci seperti nama gerakan, muscle group, atau topik nutrisi.`
  }

  const lines = results.slice(0, 3).map(r => {
    const raw = r.raw
    switch (r.type) {
      case 'exercise':
        return `• ${raw.name} — otot ${raw.muscle}, MET ${raw.met}, level ${raw.level}. ~${Math.round(raw.met * 70 * 0.5)} kcal/30 menit (70kg). ${raw.tip}`
      case 'muscle':
        return `• ${raw.name} (${raw.latin}) — latihan utama: ${raw.exercises.slice(0, 3).join(', ')}. ${raw.tip}`
      case 'nutrisi':
        return `• ${raw.title}: ${raw.items[0]}${raw.items[1] ? ' ' + raw.items[1] : ''}`
      case 'makro':
        return `• ${raw.name}: ${raw.kcalPerGram} kcal/gram, ~${raw.pct}% kebutuhan harian. ${raw.desc}`
      case 'met':
        return `• ${raw.name} — MET ${raw.met} (${raw.intensity}), ~${Math.round(raw.met * 70 * 0.5)} kcal/30 menit untuk berat 70kg`
      default:
        return `• ${r.title}`
    }
  })

  return `Ditemukan ${results.length} informasi relevan untuk "${query}":\n\n${lines.join('\n')}`
}

// Alias untuk backward compatibility
const formatForGemini = formatForLLM

// ─────────────────────────────────────────
// Exports
// ─────────────────────────────────────────
module.exports = { search, formatForLLM, formatForGemini, buildFallbackSummary }