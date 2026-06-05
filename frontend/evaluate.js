/**
 * evaluate.js
 * Script evaluasi sistem RAG untuk skripsi
 * Metrik: Precision@K, Recall@K, F1@K, MRR, Response Time
 *
 * Cara pakai:
 *   node evaluate.js
 *
 * Output:
 *   - Tabel hasil per query di terminal
 *   - File hasil: evaluation_results.json
 *   - File laporan: evaluation_report.txt
 */

import { search, buildFallbackSummary, formatForLLM } from './src/services/irService.js'
import { writeFileSync } from 'fs'

// ─────────────────────────────────────────
// GROUND TRUTH
// Dataset query + dokumen yang SEHARUSNYA muncul di hasil
// Ini harus kamu tentukan manual berdasarkan pengetahuan domain
// Format: { query, relevant: [id dokumen yang relevan], topK }
// ─────────────────────────────────────────
const GROUND_TRUTH = [
  {
    query   : 'cara push up yang benar',
    relevant: ['exercise_Push Up', 'muscle_Dada (Chest)'],
    topK    : 3
  },
  {
    query   : 'latihan untuk otot dada',
    relevant: ['exercise_Push Up', 'muscle_Dada (Chest)'],
    topK    : 3
  },
  {
    query   : 'berapa kalori squat 30 menit',
    relevant: ['exercise_Squat', 'met_Squat (BW)'],
    topK    : 3
  },
  {
    query   : 'latihan punggung',
    relevant: ['exercise_Pull Up', 'exercise_Deadlift', 'muscle_Punggung (Back)'],
    topK    : 5
  },
  {
    query   : 'protein berapa per hari',
    relevant: ['makro_Protein', 'nutrisi_Makanan Prioritas'],
    topK    : 3
  },
  {
    query   : 'latihan untuk pemula tanpa alat',
    relevant: ['exercise_Push Up', 'exercise_Squat', 'exercise_Plank', 'exercise_Lunges'],
    topK    : 5
  },
  {
    query   : 'cara menurunkan berat badan',
    relevant: ['nutrisi_Defisit & Surplus Kalori', 'makro_Karbohidrat', 'makro_Lemak'],
    topK    : 5
  },
  {
    query   : 'latihan bisep',
    relevant: ['exercise_Dumbbell Curl', 'muscle_Bisep (Biceps)'],
    topK    : 3
  },
  {
    query   : 'tips hidrasi saat olahraga',
    relevant: ['nutrisi_Hidrasi'],
    topK    : 3
  },
  {
    query   : 'MET lari 8 km per jam',
    relevant: ['met_Lari 8 km/jam'],
    topK    : 3
  },
  {
    query   : 'latihan kardio terbaik',
    relevant: ['exercise_Jumping Jack', 'exercise_Mountain Climber', 'muscle_Kardio'],
    topK    : 5
  },
  {
    query   : 'otot glutes bokong',
    relevant: ['exercise_Hip Thrust', 'muscle_Bokong (Glutes)'],
    topK    : 3
  },
  {
    query   : 'suplemen untuk gym',
    relevant: ['nutrisi_Suplemen Dasar'],
    topK    : 3
  },
  {
    query   : 'cara deadlift yang benar',
    relevant: ['exercise_Deadlift', 'muscle_Punggung (Back)'],
    topK    : 3
  },
  {
    query   : 'makan sebelum dan sesudah latihan',
    relevant: ['nutrisi_Timing Makan'],
    topK    : 3
  },
  {
    query   : 'latihan trisep',
    relevant: ['exercise_Tricep Dip', 'muscle_Trisep (Triceps)'],
    topK    : 3
  },
  {
    query   : 'plank untuk core',
    relevant: ['exercise_Plank', 'muscle_Perut (Core)'],
    topK    : 3
  },
  {
    query   : 'pemulihan setelah olahraga',
    relevant: ['nutrisi_Pemulihan'],
    topK    : 3
  },
  {
    query   : 'shoulder press untuk bahu',
    relevant: ['exercise_Shoulder Press', 'muscle_Bahu (Shoulders)'],
    topK    : 3
  },
  {
    query   : 'kalori bersepeda vs lari',
    relevant: ['met_Lari 8 km/jam', 'met_Bersepeda Santai', 'met_Bersepeda Cepat'],
    topK    : 5
  },
]

// ─────────────────────────────────────────
// HELPER: Hitung metrik per query
// ─────────────────────────────────────────

/**
 * Precision@K = jumlah dokumen relevan di top-K / K
 */
function precisionAtK(retrieved, relevant, k) {
  const topK = retrieved.slice(0, k)
  const hits  = topK.filter(id => relevant.includes(id)).length
  return hits / k
}

/**
 * Recall@K = jumlah dokumen relevan di top-K / total dokumen relevan
 */
function recallAtK(retrieved, relevant, k) {
  const topK = retrieved.slice(0, k)
  const hits  = topK.filter(id => relevant.includes(id)).length
  return relevant.length === 0 ? 0 : hits / relevant.length
}

/**
 * F1@K = 2 * (P * R) / (P + R)
 */
function f1AtK(precision, recall) {
  if (precision + recall === 0) return 0
  return 2 * (precision * recall) / (precision + recall)
}

/**
 * Reciprocal Rank = 1 / posisi dokumen relevan pertama
 * (untuk MRR, dirata-rata di semua query)
 */
function reciprocalRank(retrieved, relevant) {
  for (let i = 0; i < retrieved.length; i++) {
    if (relevant.includes(retrieved[i])) {
      return 1 / (i + 1)
    }
  }
  return 0
}

/**
 * Average Precision = rata-rata precision di setiap posisi
 * dokumen relevan ditemukan
 */
function averagePrecision(retrieved, relevant) {
  let hits = 0
  let sumPrecision = 0
  retrieved.forEach((id, i) => {
    if (relevant.includes(id)) {
      hits++
      sumPrecision += hits / (i + 1)
    }
  })
  return relevant.length === 0 ? 0 : sumPrecision / relevant.length
}

// ─────────────────────────────────────────
// EVALUASI IR
// ─────────────────────────────────────────
function evaluateIR() {
  console.log('\n' + '═'.repeat(80))
  console.log('  EVALUASI IR — TF-IDF + Query Expansion + Re-ranking')
  console.log('═'.repeat(80))

  const results = []
  const K_VALUES = [1, 3, 5]

  GROUND_TRUTH.forEach((gt, idx) => {
    const startTime = performance.now()
    const retrieved  = search(gt.query, gt.topK)
    const endTime    = performance.now()
    const latency    = endTime - startTime

    const retrievedIds = retrieved.map(r => r.id)

    const metrics = {}
    K_VALUES.forEach(k => {
      if (k <= gt.topK) {
        const p  = precisionAtK(retrievedIds, gt.relevant, k)
        const r  = recallAtK(retrievedIds, gt.relevant, k)
        const f1 = f1AtK(p, r)
        metrics[`P@${k}`]  = p
        metrics[`R@${k}`]  = r
        metrics[`F1@${k}`] = f1
      }
    })

    const rr = reciprocalRank(retrievedIds, gt.relevant)
    const ap = averagePrecision(retrievedIds, gt.relevant)

    results.push({
      no      : idx + 1,
      query   : gt.query,
      relevant: gt.relevant,
      retrieved: retrievedIds,
      metrics,
      rr,
      ap,
      latency : parseFloat(latency.toFixed(2)),
      topK    : gt.topK,
    })

    // Print per query
    const hit = retrievedIds.filter(id => gt.relevant.includes(id))
    console.log(`\n[Q${String(idx+1).padStart(2,'0')}] "${gt.query}"`)
    console.log(`  Retrieved : ${retrievedIds.join(', ')}`)
    console.log(`  Relevant  : ${gt.relevant.join(', ')}`)
    console.log(`  Hits      : ${hit.join(', ') || '—'}`)
    console.log(`  P@${gt.topK}: ${metrics[`P@${gt.topK}`]?.toFixed(3) ?? '-'} | R@${gt.topK}: ${metrics[`R@${gt.topK}`]?.toFixed(3) ?? '-'} | F1@${gt.topK}: ${metrics[`F1@${gt.topK}`]?.toFixed(3) ?? '-'}`)
    console.log(`  RR: ${rr.toFixed(3)} | AP: ${ap.toFixed(3)} | Latency: ${latency.toFixed(1)}ms`)
  })

  // ── Aggregate Metrics ──
  const avgMetrics = {}
  K_VALUES.forEach(k => {
    const pVals  = results.filter(r => r.metrics[`P@${k}`] !== undefined).map(r => r.metrics[`P@${k}`])
    const rVals  = results.filter(r => r.metrics[`R@${k}`] !== undefined).map(r => r.metrics[`R@${k}`])
    const f1Vals = results.filter(r => r.metrics[`F1@${k}`] !== undefined).map(r => r.metrics[`F1@${k}`])
    if (pVals.length) {
      avgMetrics[`P@${k}`]  = pVals.reduce((a,b) => a+b, 0) / pVals.length
      avgMetrics[`R@${k}`]  = rVals.reduce((a,b) => a+b, 0) / rVals.length
      avgMetrics[`F1@${k}`] = f1Vals.reduce((a,b) => a+b, 0) / f1Vals.length
    }
  })

  const MRR  = results.reduce((a, r) => a + r.rr, 0) / results.length
  const MAP  = results.reduce((a, r) => a + r.ap, 0) / results.length
  const avgLatency = results.reduce((a, r) => a + r.latency, 0) / results.length

  console.log('\n' + '─'.repeat(80))
  console.log('  HASIL AGREGAT')
  console.log('─'.repeat(80))
  K_VALUES.forEach(k => {
    if (avgMetrics[`P@${k}`] !== undefined) {
      console.log(`  Avg Precision@${k} : ${avgMetrics[`P@${k}`].toFixed(4)}`)
      console.log(`  Avg Recall@${k}    : ${avgMetrics[`R@${k}`].toFixed(4)}`)
      console.log(`  Avg F1@${k}        : ${avgMetrics[`F1@${k}`].toFixed(4)}`)
      console.log()
    }
  })
  console.log(`  MRR (Mean Reciprocal Rank) : ${MRR.toFixed(4)}`)
  console.log(`  MAP (Mean Average Precision): ${MAP.toFixed(4)}`)
  console.log(`  Avg Latency IR             : ${avgLatency.toFixed(2)} ms`)

  return { results, avgMetrics, MRR, MAP, avgLatency }
}

// ─────────────────────────────────────────
// EVALUASI FALLBACK SUMMARY (tanpa LLM)
// Cek apakah fallback summary relevan dengan query
// ─────────────────────────────────────────
function evaluateFallback() {
  console.log('\n' + '═'.repeat(80))
  console.log('  EVALUASI FALLBACK SUMMARY')
  console.log('═'.repeat(80))

  const sample = GROUND_TRUTH.slice(0, 10)
  const results = []

  sample.forEach((gt, idx) => {
    const retrieved = search(gt.query, gt.topK)
    const summary   = buildFallbackSummary(retrieved, gt.query)

    // Cek apakah kata kunci dari query muncul di summary (proxy relevance)
    const queryWords = gt.query.toLowerCase().split(' ').filter(w => w.length > 3)
    const summaryLow = summary.toLowerCase()
    const coverage   = queryWords.filter(w => summaryLow.includes(w)).length / queryWords.length

    results.push({ query: gt.query, coverage, summary })
    console.log(`\n[Q${idx+1}] "${gt.query}"`)
    console.log(`  Coverage : ${(coverage * 100).toFixed(0)}%`)
    console.log(`  Summary  : ${summary.slice(0, 120)}...`)
  })

  const avgCoverage = results.reduce((a, r) => a + r.coverage, 0) / results.length
  console.log(`\n  Avg Keyword Coverage: ${(avgCoverage * 100).toFixed(1)}%`)

  return results
}

// ─────────────────────────────────────────
// SAVE HASIL KE FILE
// ─────────────────────────────────────────
function saveResults(irResults, fallbackResults) {
  const timestamp = new Date().toISOString()

  // JSON untuk analisis lebih lanjut
  const jsonOutput = {
    timestamp,
    system: 'TF-IDF + Query Expansion + Re-ranking + LLM Summarization',
    totalQueries: GROUND_TRUTH.length,
    irEvaluation: {
      perQuery  : irResults.results,
      aggregate : {
        ...irResults.avgMetrics,
        MRR       : irResults.MRR,
        MAP       : irResults.MAP,
        avgLatency: irResults.avgLatency,
      }
    },
    fallbackEvaluation: fallbackResults,
  }

  writeFileSync('evaluation_results.json', JSON.stringify(jsonOutput, null, 2))

  // Laporan teks untuk lampiran skripsi
  const report = generateTextReport(irResults, fallbackResults, timestamp)
  writeFileSync('evaluation_report.txt', report)

  console.log('\n✅ Hasil disimpan ke:')
  console.log('   - evaluation_results.json')
  console.log('   - evaluation_report.txt')
}

// ─────────────────────────────────────────
// GENERATE LAPORAN TEKS
// ─────────────────────────────────────────
function generateTextReport(irResults, fallbackResults, timestamp) {
  const { avgMetrics, MRR, MAP, avgLatency } = irResults

  const lines = [
    '================================================================',
    'LAPORAN EVALUASI SISTEM INFORMATION RETRIEVAL',
    'Sistem: RAG dengan TF-IDF + Query Expansion + Re-ranking',
    `Tanggal: ${new Date(timestamp).toLocaleString('id-ID')}`,
    `Total Query Uji: ${GROUND_TRUTH.length}`,
    '================================================================',
    '',
    '1. METODOLOGI',
    '   - Algoritma IR  : TF-IDF dengan Cosine Similarity',
    '   - Query Expansion: Sinonim Bahasa Indonesia + Inggris',
    '   - Re-ranking    : Boost berdasarkan title match + tipe dokumen',
    '   - LLM Generator : Gemini 2.0 Flash (summarization)',
    '   - Fallback      : Template-based summary dari irService',
    '',
    '2. DATASET',
    `   - Total dokumen : ~56 dokumen (exercises, muscle, nutrisi, MET)`,
    `   - Query uji     : ${GROUND_TRUTH.length} query`,
    '   - Bahasa        : Indonesia (dengan ekspansi ke Inggris)',
    '',
    '3. HASIL EVALUASI IR',
    '',
    '   a. Precision, Recall, F1-Score',
    '   ┌────────────┬───────────┬──────────┬──────────┐',
    '   │   Metrik   │    @1     │    @3    │    @5    │',
    '   ├────────────┼───────────┼──────────┼──────────┤',
    `   │ Precision  │  ${(avgMetrics['P@1']||0).toFixed(4)}  │  ${(avgMetrics['P@3']||0).toFixed(4)} │  ${(avgMetrics['P@5']||0).toFixed(4)} │`,
    `   │ Recall     │  ${(avgMetrics['R@1']||0).toFixed(4)}  │  ${(avgMetrics['R@3']||0).toFixed(4)} │  ${(avgMetrics['R@5']||0).toFixed(4)} │`,
    `   │ F1-Score   │  ${(avgMetrics['F1@1']||0).toFixed(4)}  │  ${(avgMetrics['F1@3']||0).toFixed(4)} │  ${(avgMetrics['F1@5']||0).toFixed(4)} │`,
    '   └────────────┴───────────┴──────────┴──────────┘',
    '',
    '   b. Ranking Metrics',
    `   MRR  (Mean Reciprocal Rank)  : ${MRR.toFixed(4)}`,
    `   MAP  (Mean Average Precision): ${MAP.toFixed(4)}`,
    '',
    '   c. Performa',
    `   Rata-rata latency IR         : ${avgLatency.toFixed(2)} ms`,
    '',
    '4. HASIL EVALUASI PER QUERY',
    '',
    ...irResults.results.map(r => [
      `   Q${String(r.no).padStart(2,'0')}: "${r.query}"`,
      `        P@${r.topK}: ${r.metrics[`P@${r.topK}`]?.toFixed(3)??'-'} | R@${r.topK}: ${r.metrics[`R@${r.topK}`]?.toFixed(3)??'-'} | F1: ${r.metrics[`F1@${r.topK}`]?.toFixed(3)??'-'} | RR: ${r.rr.toFixed(3)} | ${r.latency}ms`,
    ].join('\n')),
    '',
    '5. ANALISIS',
    `   - Sistem berhasil menemukan dokumen relevan dengan MRR ${MRR.toFixed(4)}`,
    `   - Precision@3 ${(avgMetrics['P@3']||0).toFixed(4)} menunjukkan ${((avgMetrics['P@3']||0)*100).toFixed(1)}% dokumen yang diambil relevan`,
    `   - Recall@5 ${(avgMetrics['R@5']||0).toFixed(4)} menunjukkan sistem menemukan ${((avgMetrics['R@5']||0)*100).toFixed(1)}% dari total dokumen relevan`,
    `   - Rata-rata waktu retrieval ${avgLatency.toFixed(2)}ms menunjukkan sistem real-time`,
    '',
    '================================================================',
    'END OF REPORT',
    '================================================================',
  ]

  return lines.join('\n')
}

// ─────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────
async function main() {
  console.log('\n🔬 Memulai evaluasi sistem RAG...')
  console.log(`   Total query uji: ${GROUND_TRUTH.length}`)

  const irResults       = evaluateIR()
  const fallbackResults = evaluateFallback()

  saveResults(irResults, fallbackResults)

  console.log('\n' + '═'.repeat(80))
  console.log('  RINGKASAN AKHIR')
  console.log('═'.repeat(80))
  console.log(`  Precision@3 : ${(irResults.avgMetrics['P@3']||0).toFixed(4)}`)
  console.log(`  Recall@3    : ${(irResults.avgMetrics['R@3']||0).toFixed(4)}`)
  console.log(`  F1@3        : ${(irResults.avgMetrics['F1@3']||0).toFixed(4)}`)
  console.log(`  MRR         : ${irResults.MRR.toFixed(4)}`)
  console.log(`  MAP         : ${irResults.MAP.toFixed(4)}`)
  console.log(`  Avg Latency : ${irResults.avgLatency.toFixed(2)} ms`)
  console.log('═'.repeat(80))
}

main().catch(console.error)