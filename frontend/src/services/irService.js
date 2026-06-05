/**
 * irService.js
 * Information Retrieval engine berbasis TF-IDF
 * v3 — fix expandQuery, stronger prompt, better fallback
 */

import { exercises, muscleGuides, nutrisiTips, metData, makronutrien } from './bukuData.js'

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
// 2. Tokenizer & Stopwords
// ─────────────────────────────────────────
const STOPWORDS = new Set([
  'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'dengan', 'ini', 'itu',
  'adalah', 'ada', 'atau', 'juga', 'pada', 'dalam', 'tidak', 'sudah',
  'bisa', 'saat', 'lebih', 'sangat', 'saja', 'agar', 'akan',
  'karena', 'oleh', 'jika', 'namun', 'tetapi', 'tapi', 'dapat', 'kamu',
  'kita', 'kami', 'mereka', 'saya', 'nya', 'per', 'ya', 'lah',
  'bagaimana', 'berapa', 'gimana', 'apa', 'siapa', 'cara',
])

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOPWORDS.has(t))
}

// ─────────────────────────────────────────
// 3. Query Expansion — exact match only
// ─────────────────────────────────────────
const SYNONYMS = {
  'dada'     : ['chest', 'pektoral', 'pectoralis'],
  'kaki'     : ['leg', 'legs', 'quad', 'quadriceps', 'hamstring', 'betis', 'calves'],
  'perut'    : ['abs', 'core', 'abdominal', 'sixpack'],
  'bahu'     : ['shoulder', 'deltoid', 'delts'],
  'punggung' : ['back', 'lat', 'latissimus', 'rhomboid'],
  'bisep'    : ['bicep', 'biceps', 'lengan'],
  'trisep'   : ['tricep', 'triceps'],
  'bokong'   : ['glute', 'glutes', 'gluteus', 'pantat', 'hip'],
  'kardio'   : ['cardio', 'aerobik', 'jantung'],
  'pushup'   : ['push', 'dada', 'mendorong'],
  'pullup'   : ['pull', 'chinup', 'punggung'],
  'squat'    : ['jongkok', 'kaki'],
  'deadlift' : ['punggung', 'beban'],
  'plank'    : ['isometrik', 'core', 'perut'],
  'lunge'    : ['lunges', 'kaki'],
  'curl'     : ['bicep', 'bisep'],
  'protein'  : ['otot', 'amino', 'whey'],
  'karbo'    : ['karbohidrat', 'nasi', 'energi', 'carb'],
  'lemak'    : ['fat', 'minyak', 'omega'],
  'kalori'   : ['kcal', 'energi', 'met'],
  'diet'     : ['defisit', 'nutrisi'],
  'tidur'    : ['istirahat', 'pemulihan', 'recovery'],
  'air'      : ['hidrasi', 'minum'],
  'suplemen' : ['whey', 'creatine', 'vitamin'],
  'pemula'   : ['beginner', 'dasar', 'mudah'],
  'lanjut'   : ['advanced', 'mahir'],
  'menengah' : ['intermediate', 'sedang'],
  'latihan'  : ['exercise', 'workout', 'gerakan', 'olahraga'],
  'bakar'    : ['kalori', 'kcal'],
}

function expandQuery(query) {
  const tokens  = tokenize(query)
  const expanded = new Set(tokens)

  tokens.forEach(t => {
    // Forward: token cocok dengan key
    if (SYNONYMS[t]) {
      SYNONYMS[t].forEach(s => tokenize(s).forEach(st => expanded.add(st)))
    }
    // Reverse: token cocok dengan value (exact match saja)
    Object.entries(SYNONYMS).forEach(([key, vals]) => {
      if (vals.includes(t)) {
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

  const docs          = buildDocuments()
  const tokenizedDocs = docs.map(doc => ({ ...doc, tokens: tokenize(doc.body) }))
  const allTerms      = [...new Set(tokenizedDocs.flatMap(d => d.tokens))]
  const idf           = computeIDF(tokenizedDocs, allTerms)

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
// 7. Re-ranking — lebih ketat
// ─────────────────────────────────────────
function rerank(scored, originalQuery) {
  const lower      = originalQuery.toLowerCase()
  const origTokens = tokenize(originalQuery)

  scored.forEach(doc => {
    // Exact title match — boost besar
    if (doc.title.toLowerCase() === lower)          doc.score += 2.0
    // Title mengandung query
    if (doc.title.toLowerCase().includes(lower))    doc.score += 1.0

    // Token query ada di title
    origTokens.forEach(t => {
      if (doc.title.toLowerCase().includes(t))      doc.score += 0.4
    })

    // Token query ada di tags
    doc.tags.forEach(tag => {
      origTokens.forEach(t => {
        if (tag.toLowerCase() === t)                doc.score += 0.3
      })
    })

    // Boost berdasarkan tipe dokumen sesuai konteks query
    const isWorkoutQuery = origTokens.some(t =>
      ['latihan', 'gerakan', 'exercise', 'workout', 'otot', 'benar', 'teknik', 'form'].includes(t)
    )
    if (isWorkoutQuery && (doc.type === 'exercise' || doc.type === 'muscle')) {
      doc.score += 0.3
    }

    const isNutriQuery = origTokens.some(t =>
      ['nutrisi', 'makan', 'diet', 'protein', 'karbo', 'lemak', 'kalori', 'suplemen'].includes(t)
    )
    if (isNutriQuery && (doc.type === 'nutrisi' || doc.type === 'makro')) {
      doc.score += 0.3
    }

    const isMetQuery = origTokens.some(t =>
      ['met', 'bakar', 'kcal', 'kalori'].includes(t)
    )
    if (isMetQuery && doc.type === 'met') {
      doc.score += 0.3
    }
  })

  return scored
}

// ─────────────────────────────────────────
// 8. SEARCH
// ─────────────────────────────────────────
export function search(query, topK = 5) {
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
// 9. Format context untuk LLM — prompt lebih kuat
// ─────────────────────────────────────────
export function formatForLLM(results, query) {
  const context = results.map((r, i) => {
    const raw = r.raw
    let content = ''

    if (r.type === 'exercise') {
      content =
`Nama Gerakan: ${raw.name}
Otot Utama: ${raw.muscle}
Otot yang Dilatih: ${raw.muscles.join(', ')}
Equipment: ${raw.equipment}
Level: ${raw.level}
MET: ${raw.met} | Kalori (70kg): ${Math.round(raw.met * 70 * (15/60))} kcal/15mnt · ${Math.round(raw.met * 70 * 0.5)} kcal/30mnt · ${Math.round(raw.met * 70)} kcal/60mnt
Deskripsi: ${raw.desc}
Langkah-langkah:
${raw.steps.map((s, i) => `  ${i+1}. ${s}`).join('\n')}
Tips Penting: ${raw.tip}`

    } else if (r.type === 'muscle') {
      content =
`Muscle Group: ${raw.name}
Nama Latin: ${raw.latin}
Deskripsi: ${raw.desc}
Latihan Utama: ${raw.exercises.join(', ')}
Tips: ${raw.tip}`

    } else if (r.type === 'nutrisi') {
      content =
`Topik Nutrisi: ${raw.title}
Poin-poin penting:
${raw.items.map((item, i) => `  ${i+1}. ${item}`).join('\n')}`

    } else if (r.type === 'makro') {
      content =
`Makronutrien: ${raw.name}
Kalori per gram: ${raw.kcalPerGram} kcal
Porsi dari kebutuhan harian: ${raw.pct}%
Penjelasan: ${raw.desc}`

    } else if (r.type === 'met') {
      content =
`Aktivitas: ${raw.name}
Kategori: ${raw.category} | Intensitas: ${raw.intensity}
Nilai MET: ${raw.met}
Estimasi kalori (70kg): ${Math.round(raw.met * 70 * (15/60))} kcal/15mnt · ${Math.round(raw.met * 70 * 0.5)} kcal/30mnt · ${Math.round(raw.met * 70)} kcal/60mnt`
    }

    return `[Dokumen ${i+1}: ${r.type.toUpperCase()} — ${r.title}]\n${content}`
  }).join('\n\n---\n\n')

  return `Kamu adalah asisten fitness dan nutrisi bernama Calsio. Jawab pertanyaan pengguna berdasarkan dokumen referensi berikut.

ATURAN:
- Jawab dengan natural seperti seorang pelatih fitness yang menjelaskan ke temannya
- Jika pertanyaan tentang cara/teknik gerakan, jelaskan langkah-langkahnya secara urut dan jelas
- Sertakan angka spesifik (MET, kalori, target protein, dll) jika ada di dokumen dan relevan
- Jika ada tips penting, sertakan di akhir jawaban
- Jangan sebut "berdasarkan dokumen" — langsung jawab saja
- Jawab dalam Bahasa Indonesia, 3-6 kalimat atau poin-poin jika langkah teknis
- Jika informasi tidak ada di dokumen, jawab: "Informasi itu belum ada di panduan Calsio."

=== REFERENSI ===
${context}
=== AKHIR REFERENSI ===

Pertanyaan: "${query}"
Jawaban:`
}

// ─────────────────────────────────────────
// 10. Fallback summary — lebih natural
// ─────────────────────────────────────────
export function buildFallbackSummary(results, query) {
  if (!results.length) {
    return `Hmm, tidak ditemukan informasi yang cocok untuk "${query}". Coba cari dengan kata kunci yang lebih spesifik, misalnya nama gerakan atau topik nutrisi tertentu.`
  }

  // Ambil dokumen paling relevan
  const top = results[0]
  const raw = top.raw

  // Buat jawaban natural berdasarkan tipe dokumen teratas
  if (top.type === 'exercise') {
    const steps = raw.steps.map((s, i) => `${i+1}. ${s}`).join(' ')
    return `${raw.name} adalah latihan ${raw.level} untuk otot ${raw.muscle}. ${raw.desc} Cara melakukannya: ${steps} Tips: ${raw.tip} Kalori yang terbakar sekitar ${Math.round(raw.met * 70 * 0.5)} kcal per 30 menit untuk berat badan 70kg.`
  }

  if (top.type === 'muscle') {
    return `${raw.name} (${raw.latin}) — ${raw.desc} Latihan terbaik untuk melatihnya antara lain: ${raw.exercises.join(', ')}. ${raw.tip}`
  }

  if (top.type === 'nutrisi') {
    const poin = raw.items.slice(0, 3).map((item, i) => `${i+1}. ${item}`).join(' ')
    return `Tentang ${raw.title}: ${poin}`
  }

  if (top.type === 'makro') {
    return `${raw.name} mengandung ${raw.kcalPerGram} kcal per gram dan idealnya menyumbang sekitar ${raw.pct}% dari total kalori harian. ${raw.desc}`
  }

  if (top.type === 'met') {
    return `${raw.name} memiliki nilai MET ${raw.met} dengan intensitas ${raw.intensity}. Untuk berat badan 70kg, aktivitas ini membakar sekitar ${Math.round(raw.met * 70 * 0.5)} kcal per 30 menit.`
  }

  return `Ditemukan ${results.length} informasi relevan untuk "${query}".`
}

// Alias
export const formatForGemini = formatForLLM