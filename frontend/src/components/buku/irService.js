/**
 * irService.js
 * Information Retrieval engine sederhana berbasis TF-IDF
 * untuk mencari konten relevan di bukuData.js
 */

import { exercises, muscleGuides, nutrisiTips, metData, makronutrien } from './bukuData.js'

// ─────────────────────────────────────────
// 1. Flatten semua data jadi dokumen flat
// ─────────────────────────────────────────
function buildDocuments() {
  const docs = []

  // Exercises
  exercises.forEach(ex => {
    docs.push({
      id: `exercise_${ex.name}`,
      type: 'exercise',
      title: ex.name,
      emoji: ex.emoji,
      color: ex.color,
      tags: [ex.muscle, ex.equipment, ex.level],
      body: [
        ex.name,
        ex.muscle,
        ex.equipment,
        ex.level,
        ex.desc,
        ex.tip,
        ...ex.steps,
        ...ex.muscles
      ].join(' '),
      raw: ex
    })
  })

  // Muscle Guides
  muscleGuides.forEach(mg => {
    docs.push({
      id: `muscle_${mg.name}`,
      type: 'muscle',
      title: mg.name,
      emoji: mg.emoji,
      color: mg.color,
      tags: [mg.latin],
      body: [
        mg.name,
        mg.latin,
        mg.desc,
        mg.tip,
        ...mg.exercises
      ].join(' '),
      raw: mg
    })
  })

  // Nutrisi Tips
  nutrisiTips.forEach(tip => {
    docs.push({
      id: `nutrisi_${tip.title}`,
      type: 'nutrisi',
      title: tip.title,
      emoji: tip.icon,
      color: '#22c55e',
      tags: ['nutrisi', 'diet', 'makan'],
      body: [
        tip.title,
        ...tip.items
      ].join(' '),
      raw: tip
    })
  })

  // Makronutrien
  makronutrien.forEach(m => {
    docs.push({
      id: `makro_${m.name}`,
      type: 'makro',
      title: m.name,
      emoji: m.icon,
      color: m.color,
      tags: ['nutrisi', 'makro', 'kalori'],
      body: [m.name, m.desc, `${m.kcalPerGram} kalori per gram`].join(' '),
      raw: m
    })
  })

  // MET Data
  metData.forEach(m => {
    docs.push({
      id: `met_${m.name}`,
      type: 'met',
      title: m.name,
      emoji: '📊',
      color: '#60a5fa',
      tags: [m.category, m.intensity, 'MET', 'kalori'],
      body: [
        m.name,
        m.category,
        m.intensity,
        `MET ${m.met}`,
        `${Math.round(m.met * 70 * 0.5)} kalori per 30 menit`
      ].join(' '),
      raw: m
    })
  })

  return docs
}

// ─────────────────────────────────────────
// 2. Tokenizer & Stopwords (Bahasa Indonesia)
// ─────────────────────────────────────────
const STOPWORDS = new Set([
  'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'dengan', 'ini', 'itu',
  'adalah', 'ada', 'atau', 'juga', 'pada', 'dalam', 'tidak', 'sudah',
  'bisa', 'saat', 'lebih', 'sangat', 'saja', 'agar', 'apa', 'akan',
  'karena', 'oleh', 'jika', 'namun', 'tetapi', 'tapi', 'dapat', 'kamu',
  'kita', 'kami', 'mereka', 'saya', 'nya', 'per', 'ya', 'lah',
])

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !STOPWORDS.has(t))
}

// ─────────────────────────────────────────
// 3. TF-IDF
// ─────────────────────────────────────────
function computeTF(tokens) {
  const tf = {}
  tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1 })
  const total = tokens.length
  Object.keys(tf).forEach(k => { tf[k] = tf[k] / total })
  return tf
}

function computeIDF(docs, allTerms) {
  const idf = {}
  const N = docs.length
  allTerms.forEach(term => {
    const count = docs.filter(d => d.tokens.includes(term)).length
    idf[term] = Math.log((N + 1) / (count + 1)) + 1
  })
  return idf
}

// ─────────────────────────────────────────
// 4. Build Index
// ─────────────────────────────────────────
let _index = null

function buildIndex() {
  if (_index) return _index

  const docs = buildDocuments()

  // Tokenize semua dokumen
  const tokenizedDocs = docs.map(doc => ({
    ...doc,
    tokens: tokenize(doc.body)
  }))

  // Kumpulkan semua term unik
  const allTerms = [...new Set(tokenizedDocs.flatMap(d => d.tokens))]

  // IDF
  const idf = computeIDF(tokenizedDocs, allTerms)

  // TF-IDF per dokumen
  const indexed = tokenizedDocs.map(doc => {
    const tf = computeTF(doc.tokens)
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
// 5. Cosine Similarity
// ─────────────────────────────────────────
function cosineSimilarity(queryVec, docVec) {
  const terms = Object.keys(queryVec)
  let dot = 0, qMag = 0, dMag = 0

  terms.forEach(t => {
    dot += (queryVec[t] || 0) * (docVec[t] || 0)
    qMag += (queryVec[t] || 0) ** 2
  })

  Object.values(docVec).forEach(v => { dMag += v ** 2 })

  const mag = Math.sqrt(qMag) * Math.sqrt(dMag)
  return mag === 0 ? 0 : dot / mag
}

// ─────────────────────────────────────────
// 6. SEARCH — fungsi utama yang diekspor
// ─────────────────────────────────────────
export function search(query, topK = 5) {
  const { docs, idf } = buildIndex()

  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) return []

  // TF-IDF query
  const queryTF = computeTF(queryTokens)
  const queryVec = {}
  queryTokens.forEach(t => {
    queryVec[t] = (queryTF[t] || 0) * (idf[t] || 1)
  })

  // Hitung similarity tiap dokumen
  const scored = docs.map(doc => ({
    ...doc,
    score: cosineSimilarity(queryVec, doc.tfidf)
  }))

  // Bonus score untuk exact match di title/tags
  const lowerQuery = query.toLowerCase()
  scored.forEach(doc => {
    if (doc.title.toLowerCase().includes(lowerQuery)) doc.score += 0.5
    if (doc.tags.some(t => t.toLowerCase().includes(lowerQuery))) doc.score += 0.3
  })

  return scored
    .filter(d => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}

// ─────────────────────────────────────────
// 7. Format hasil untuk dikirim ke Gemini
// ─────────────────────────────────────────
export function formatForGemini(results, query) {
  const context = results.map((r, i) => {
    const raw = r.raw
    let content = ''

    if (r.type === 'exercise') {
      content = `
Gerakan: ${raw.name}
Muscle Group: ${raw.muscle}
Equipment: ${raw.equipment}
Level: ${raw.level}
MET: ${raw.met}
Deskripsi: ${raw.desc}
Cara melakukan: ${raw.steps.join('. ')}
Otot yang dilatih: ${raw.muscles.join(', ')}
Tips: ${raw.tip}
      `.trim()
    } else if (r.type === 'muscle') {
      content = `
Muscle Group: ${raw.name} (${raw.latin})
Deskripsi: ${raw.desc}
Latihan utama: ${raw.exercises.join(', ')}
Tips: ${raw.tip}
      `.trim()
    } else if (r.type === 'nutrisi') {
      content = `
Tips Nutrisi: ${raw.title}
${raw.items.map((item, i) => `${i+1}. ${item}`).join('\n')}
      `.trim()
    } else if (r.type === 'makro') {
      content = `
Makronutrien: ${raw.name}
Kalori per gram: ${raw.kcalPerGram} kcal
Persentase kebutuhan: ${raw.pct}%
Deskripsi: ${raw.desc}
      `.trim()
    } else if (r.type === 'met') {
      content = `
Gerakan: ${raw.name}
Kategori: ${raw.category}
Intensitas: ${raw.intensity}
MET: ${raw.met}
Estimasi kalori (70kg, 30 menit): ${Math.round(raw.met * 70 * 0.5)} kcal
      `.trim()
    }

    return `[Dokumen ${i+1}]\n${content}`
  }).join('\n\n')

  return `Kamu adalah asisten fitness dan nutrisi untuk aplikasi Calsio. Berdasarkan dokumen berikut, jawab pertanyaan pengguna dengan ringkas, akurat, dan dalam Bahasa Indonesia. Jangan tambahkan informasi di luar dokumen yang diberikan.

=== DOKUMEN REFERENSI ===
${context}
=== AKHIR DOKUMEN ===

Pertanyaan pengguna: "${query}"

Berikan ringkasan yang informatif dan praktis dalam 3-5 kalimat. Sebutkan fakta spesifik dari dokumen (angka MET, kalori, nama otot, dll) jika relevan.`
}