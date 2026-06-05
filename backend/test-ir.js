/**
 * test-ir.js
 * Comprehensive Information Retrieval Testing
 * Jalankan: node test-ir.js
 */

// Jadi:
const { search }          = require('./src/services/irService')
const { isPersonalQuery, formatPersonalContext } = require('./src/services/ragService')

// ─── Warna terminal ──────────────────────────────────────────
const c = {
  reset : '\x1b[0m',
  green : '\x1b[32m',
  red   : '\x1b[31m',
  yellow: '\x1b[33m',
  cyan  : '\x1b[36m',
  white : '\x1b[37m',
  bold  : '\x1b[1m',
  dim   : '\x1b[2m',
}

const pass  = `${c.green}✅ PASS${c.reset}`
const fail  = `${c.red}❌ FAIL${c.reset}`
const warn  = `${c.yellow}⚠️  WARN${c.reset}`

// ─── Helper ──────────────────────────────────────────────────
function header(title) {
  console.log(`\n${c.bold}${c.cyan}${'═'.repeat(60)}${c.reset}`)
  console.log(`${c.bold}${c.cyan}  ${title}${c.reset}`)
  console.log(`${c.bold}${c.cyan}${'═'.repeat(60)}${c.reset}`)
}

function subheader(title) {
  console.log(`\n${c.yellow}── ${title} ${'─'.repeat(50 - title.length)}${c.reset}`)
}

// ════════════════════════════════════════════════════════════
// TEST 1: DOCUMENT RETRIEVAL (TF-IDF)
// ════════════════════════════════════════════════════════════
function testDocumentRetrieval() {
  header('TEST 1: DOCUMENT RETRIEVAL (TF-IDF + Cosine Similarity)')

  const testCases = [
    // Exercise queries
    { query: 'cara push up yang benar',        expected: 'Push Up',          type: 'exercise', topK: 3  },
    { query: 'latihan untuk otot dada',        expected: 'Push Up',          type: 'exercise', topK: 3  },
    { query: 'squat cara melakukan',           expected: 'Squat',            type: 'exercise', topK: 3  },
    { query: 'gerakan untuk bokong',           expected: 'Hip Thrust',       type: 'exercise', topK: 5  },
    { query: 'latihan bisep tanpa alat',       expected: 'Dumbbell Curl',    type: 'exercise', topK: 5  },
    { query: 'plank berapa lama',              expected: 'Plank',            type: 'exercise', topK: 3  },
    { query: 'burpee cara latihan',            expected: 'Burpee',           type: 'exercise', topK: 5  },
    { query: 'latihan trisep',                 expected: 'Tricep Dip',       type: 'exercise', topK: 5  },
    { query: 'jumping jack kardio',            expected: 'Jumping Jack',     type: 'exercise', topK: 3  },
    { query: 'mountain climber core',          expected: 'Mountain Climber', type: 'exercise', topK: 3  },

    // Muscle group queries
    { query: 'otot dada latihan apa saja',     expected: 'Dada',             type: 'muscle',   topK: 5  },
    { query: 'cara melatih punggung',          expected: 'Punggung',         type: 'muscle',   topK: 5  },
    { query: 'otot kaki latihan',              expected: 'Kaki',             type: 'muscle',   topK: 5  },
    { query: 'latihan bahu efektif',           expected: 'Bahu',             type: 'muscle',   topK: 5  },
    { query: 'cara besarkan perut sixpack',    expected: 'Perut',            type: 'muscle',   topK: 5  },

    // Nutrition queries
    { query: 'makan sebelum dan sesudah olahraga', expected: 'Timing Makan', type: 'nutrisi', topK: 3  },
    { query: 'berapa banyak minum air',        expected: 'Hidrasi',          type: 'nutrisi',  topK: 3  },
    { query: 'suplemen untuk otot',            expected: 'Suplemen Dasar',   type: 'nutrisi',  topK: 5  },
    { query: 'makanan untuk gym',              expected: 'Makanan Prioritas', type: 'nutrisi', topK: 5  },
    { query: 'defisit kalori turun berat',     expected: 'Defisit',          type: 'nutrisi',  topK: 5  },

    // Makronutrien queries
    { query: 'protein berapa gram per hari',   expected: 'Protein',          type: 'makro',    topK: 3  },
    { query: 'karbohidrat untuk energi',       expected: 'Karbohidrat',      type: 'makro',    topK: 3  },
    { query: 'lemak sehat untuk tubuh',        expected: 'Lemak',            type: 'makro',    topK: 3  },

    // MET queries
    { query: 'kalori lari 30 menit',           expected: 'Lari',             type: 'met',      topK: 3  },
    { query: 'berapa MET bersepeda',           expected: 'Bersepeda',        type: 'met',      topK: 3  },
    { query: 'kalori jumping jack',            expected: 'Jumping Jack',     type: 'met',      topK: 3  },
  ]

  let hits     = 0
  let totalMRR = 0
  let p_sum    = 0

  const results_log = []

  testCases.forEach(tc => {
    const results  = search(tc.query, tc.topK)
    const foundAt  = results.findIndex(r =>
      r.title.toLowerCase().includes(tc.expected.toLowerCase()) ||
      tc.expected.toLowerCase().includes(r.title.toLowerCase().split(' ')[0])
    )

    const isHit    = foundAt !== -1
    const mrr      = isHit ? 1 / (foundAt + 1) : 0
    const topScore = results[0] ? (results[0].score * 100).toFixed(0) : 0

    // Precision@K: berapa dokumen type yang benar dari topK hasil
    const relevantInResults = results.filter(r => r.type === tc.type).length
    const precision = results.length > 0 ? relevantInResults / results.length : 0

    if (isHit) hits++
    totalMRR += mrr
    p_sum    += precision

    results_log.push({
      query   : tc.query,
      expected: tc.expected,
      isHit,
      foundAt : foundAt + 1,
      mrr,
      precision,
      topResult: results[0]?.title || '-',
      topScore,
    })

    const status = isHit ? pass : fail
    console.log(`${status} "${tc.query}"`)
    console.log(`   ${c.dim}Expected: ${tc.expected} (${tc.type}) | Found: #${isHit ? foundAt+1 : 'X'} | Top: "${results[0]?.title}" (${topScore}%)${c.reset}`)
  })

  const accuracy  = (hits / testCases.length * 100).toFixed(1)
  const mrrScore  = (totalMRR / testCases.length).toFixed(3)
  const precision = (p_sum / testCases.length * 100).toFixed(1)

  subheader('Hasil Test 1')
  console.log(`  Total query   : ${testCases.length}`)
  console.log(`  Hit           : ${c.green}${hits}${c.reset} / ${testCases.length}`)
  console.log(`  Accuracy      : ${accuracy >= 80 ? c.green : c.red}${accuracy}%${c.reset}  (target: >80%)`)
  console.log(`  MRR           : ${mrrScore >= 0.7 ? c.green : c.red}${mrrScore}${c.reset}  (target: >0.70)`)
  console.log(`  Avg Precision : ${precision >= 60 ? c.green : c.red}${precision}%${c.reset}  (target: >60%)`)

  return { accuracy: parseFloat(accuracy), mrr: parseFloat(mrrScore), precision: parseFloat(precision) }
}

// ════════════════════════════════════════════════════════════
// TEST 2: QUERY EXPANSION & SYNONYM
// ════════════════════════════════════════════════════════════
function testQueryExpansion() {
  header('TEST 2: QUERY EXPANSION & SINONIM')

  const synonymTests = [
    // Bahasa informal → formal
    { query: 'chest workout',       expected: 'Push Up',   desc: 'English → Indonesia' },
    { query: 'leg day',             expected: 'Squat',     desc: 'English slang' },
    { query: 'abs latihan',         expected: 'Plank',     desc: 'Mixed language' },
    { query: 'cardio bakar lemak',  expected: 'Jumping',   desc: 'Kardio sinonim' },
    { query: 'pull up punggung',    expected: 'Pull Up',   desc: 'Compound query' },
    { query: 'glute bokong',        expected: 'Hip Thrust',desc: 'Sinonim Inggris' },
    { query: 'bisep curl lengan',   expected: 'Curl',      desc: 'Sinonim otot' },
    { query: 'core stability',      expected: 'Plank',     desc: 'English core' },
  ]

  let hits = 0

  synonymTests.forEach(tc => {
    const results = search(tc.query, 5)
    const found   = results.some(r =>
      r.title.toLowerCase().includes(tc.expected.toLowerCase()) ||
      tc.expected.toLowerCase().includes(r.title.toLowerCase().split(' ')[0])
    )

    if (found) hits++
    console.log(`${found ? pass : fail} [${tc.desc}] "${tc.query}" → ${tc.expected}`)
  })

  const pct = (hits / synonymTests.length * 100).toFixed(1)
  subheader('Hasil Test 2')
  console.log(`  Query expansion accuracy: ${pct >= 70 ? c.green : c.red}${pct}%${c.reset} (${hits}/${synonymTests.length})`)

  return parseFloat(pct)
}

// ════════════════════════════════════════════════════════════
// TEST 3: PERSONAL QUERY DETECTION
// ════════════════════════════════════════════════════════════
function testPersonalQueryDetection() {
  header('TEST 3: DETEKSI PERSONAL QUERY')

  const personalQueries = [
    { query: 'kalori saya hari ini berapa',    expected: true  },
    { query: 'latihan saya minggu ini apa',    expected: true  },
    { query: 'berapa kalori yang sudah saya bakar', expected: true },
    { query: 'streak saya berapa hari',        expected: true  },
    { query: 'sudah latihan berapa kali',      expected: true  },
    { query: 'riwayat workout saya',           expected: true  },
    { query: 'progress saya bulan ini',        expected: true  },
    { query: 'total kalori aku minggu ini',    expected: true  },
  ]

  const generalQueries = [
    { query: 'cara push up yang benar',        expected: false },
    { query: 'otot dada latihan apa',          expected: false },
    { query: 'protein berapa gram',            expected: false },
    { query: 'MET lari 30 menit',              expected: false },
    { query: 'latihan untuk pemula',           expected: false },
    { query: 'nutrisi setelah olahraga',       expected: false },
  ]

  const allTests = [...personalQueries, ...generalQueries]
  let hits = 0

  console.log(`\n${c.yellow}Personal queries (harus terdeteksi):${c.reset}`)
  personalQueries.forEach(tc => {
    const result = isPersonalQuery(tc.query)
    const ok     = result === tc.expected
    if (ok) hits++
    console.log(`${ok ? pass : fail} "${tc.query}" → ${result ? 'PERSONAL' : 'UMUM'}`)
  })

  console.log(`\n${c.yellow}General queries (tidak boleh terdeteksi sebagai personal):${c.reset}`)
  generalQueries.forEach(tc => {
    const result = isPersonalQuery(tc.query)
    const ok     = result === tc.expected
    if (ok) hits++
    console.log(`${ok ? pass : fail} "${tc.query}" → ${result ? 'PERSONAL' : 'UMUM'}`)
  })

  const pct = (hits / allTests.length * 100).toFixed(1)
  subheader('Hasil Test 3')
  console.log(`  Detection accuracy: ${pct >= 90 ? c.green : c.red}${pct}%${c.reset} (${hits}/${allTests.length})`)

  return parseFloat(pct)
}

// ════════════════════════════════════════════════════════════
// TEST 4: PERSONAL CONTEXT FORMATTING
// ════════════════════════════════════════════════════════════
function testPersonalContextFormatting() {
  header('TEST 4: FORMAT DATA PERSONAL USER')

  // Mock history data simulasi user
  const today     = new Date()
  const yesterday = new Date(today - 86400000)
  const twoDays   = new Date(today - 2 * 86400000)

  const mockHistories = [
    // Hari ini
    { id: 1, calories: 320.5, duration: 30, exercise_name: 'Push Up',     muscle_group: 'Dada',     workout_type: 'Strength', createdAt: today.toISOString()     },
    { id: 2, calories: 280.0, duration: 25, exercise_name: 'Plank',       muscle_group: 'Core',     workout_type: 'Strength', createdAt: today.toISOString()     },
    { id: 3, calories: 450.0, duration: 40, exercise_name: 'Jumping Jack', muscle_group: 'Kardio',  workout_type: 'Cardio',   createdAt: today.toISOString()     },
    // Kemarin
    { id: 4, calories: 380.0, duration: 35, exercise_name: 'Squat',       muscle_group: 'Kaki',     workout_type: 'Strength', createdAt: yesterday.toISOString() },
    { id: 5, calories: 210.0, duration: 20, exercise_name: 'Push Up',     muscle_group: 'Dada',     workout_type: 'Strength', createdAt: yesterday.toISOString() },
    // 2 hari lalu
    { id: 6, calories: 500.0, duration: 45, exercise_name: 'Burpee',      muscle_group: 'Kardio',   workout_type: 'HIIT',     createdAt: twoDays.toISOString()   },
    { id: 7, calories: 180.0, duration: 15, exercise_name: 'Plank',       muscle_group: 'Core',     workout_type: 'Strength', createdAt: twoDays.toISOString()   },
  ]

  console.log(`\n${c.yellow}Mock data: ${mockHistories.length} sesi latihan (3 hari)${c.reset}`)
  console.log(`  Hari ini   : ${mockHistories.filter(h => new Date(h.createdAt).toDateString() === today.toDateString()).length} sesi`)
  console.log(`  Kemarin    : ${mockHistories.filter(h => new Date(h.createdAt).toDateString() === yesterday.toDateString()).length} sesi`)
  console.log(`  2 hari lalu: ${mockHistories.filter(h => new Date(h.createdAt).toDateString() === twoDays.toDateString()).length} sesi`)

  let allPass = true
  const errors = []

  try {
    const context = formatPersonalContext(mockHistories)

    console.log(`\n${c.yellow}Cek field yang harus ada di context:${c.reset}`)

    const checks = [
      { label: 'Ada DATA PERSONAL header',     test: context.includes('[DATA PERSONAL')            },
      { label: 'Ada data hari ini',            test: context.includes('Hari Ini')                  },
      { label: 'Ada total kalori hari ini',    test: context.includes('kalori terbakar')            },
      { label: 'Ada daftar gerakan hari ini',  test: context.includes('Push Up')                   },
      { label: 'Ada data minggu ini',          test: context.includes('Minggu Ini')                },
      { label: 'Ada total kalori minggu',      test: context.includes('Total kalori')              },
      { label: 'Ada streak info',              test: context.includes('Streak')                    },
      { label: 'Ada top exercises',            test: context.includes('Gerakan Terbanyak')         },
      { label: 'Kalori hari ini > 0',          test: context.includes('1050') || context.match(/\d+\.\d+/) !== null },
    ]

    checks.forEach(c_item => {
      const ok = c_item.test
      if (!ok) { allPass = false; errors.push(c_item.label) }
      console.log(`${ok ? pass : fail} ${c_item.label}`)
    })

    console.log(`\n${c.dim}--- Preview Context (50 baris pertama) ---${c.reset}`)
    context.split('\n').slice(0, 50).forEach(line => {
      console.log(`  ${c.dim}${line}${c.reset}`)
    })

  } catch (err) {
    allPass = false
    console.log(`${fail} formatPersonalContext error: ${err.message}`)
  }

  subheader('Hasil Test 4')
  if (allPass) {
    console.log(`  ${c.green}Semua field personal context terbentuk dengan benar ✅${c.reset}`)
  } else {
    console.log(`  ${c.red}Field yang bermasalah:${c.reset}`)
    errors.forEach(e => console.log(`    - ${e}`))
  }

  return allPass
}

// ════════════════════════════════════════════════════════════
// TEST 5: EDGE CASES
// ════════════════════════════════════════════════════════════
function testEdgeCases() {
  header('TEST 5: EDGE CASES')

  const edgeCases = [
    { query: '',                    desc: 'Query kosong',          expectEmpty: true  },
    { query: '   ',                 desc: 'Query spasi saja',      expectEmpty: true  },
    { query: 'xyz123abc',           desc: 'Query tidak relevan',   expectEmpty: false },
    { query: 'a',                   desc: 'Query 1 karakter',      expectEmpty: true  },
    { query: 'push up push up push up push up push up', desc: 'Query berulang', expectEmpty: false },
    { query: 'latihan olahraga gym fitness workout sehat kuat', desc: 'Query panjang', expectEmpty: false },
    { query: 'PUSH UP CARA BENAR',  desc: 'Query huruf kapital',   expectEmpty: false },
    { query: 'push-up',             desc: 'Query dengan tanda -',  expectEmpty: false },
  ]

  let hits = 0

  edgeCases.forEach(tc => {
    try {
      const results = search(tc.query, 5)
      const isEmpty = results.length === 0

      let ok
      if (tc.expectEmpty) {
        ok = isEmpty
      } else {
        ok = true // tidak crash = pass untuk non-empty cases
      }

      if (ok) hits++
      console.log(`${ok ? pass : fail} [${tc.desc}] → ${results.length} hasil, tidak crash`)
    } catch (err) {
      console.log(`${fail} [${tc.desc}] → ERROR: ${err.message}`)
    }
  })

  subheader('Hasil Test 5')
  console.log(`  Edge case handling: ${c.green}${hits}/${edgeCases.length}${c.reset} tidak crash`)

  return hits
}

// ════════════════════════════════════════════════════════════
// TEST 6: PERSONAL CONTEXT - EMPTY DATA
// ════════════════════════════════════════════════════════════
function testEmptyPersonalData() {
  header('TEST 6: PERSONAL CONTEXT - DATA KOSONG')

  const cases = [
    { label: 'History kosong []',      data: []   },
    { label: 'History null',           data: null },
    { label: 'History undefined',      data: undefined },
  ]

  let allPass = true

  cases.forEach(tc => {
    try {
      const context = formatPersonalContext(tc.data)
      const hasMessage = context.includes('belum') || context.includes('Belum') || context.includes('DATA PERSONAL')
      console.log(`${hasMessage ? pass : fail} ${tc.label} → context terbentuk tanpa crash`)
      if (!hasMessage) allPass = false
    } catch (err) {
      console.log(`${fail} ${tc.label} → ERROR: ${err.message}`)
      allPass = false
    }
  })

  subheader('Hasil Test 6')
  console.log(`  Empty data handling: ${allPass ? c.green + 'PASS' : c.red + 'FAIL'}${c.reset}`)

  return allPass
}

// ════════════════════════════════════════════════════════════
// TEST 7: SCORE DISTRIBUTION
// ════════════════════════════════════════════════════════════
function testScoreDistribution() {
  header('TEST 7: DISTRIBUSI SKOR RELEVANSI')

  const queries = [
    'cara push up yang benar',
    'latihan otot dada',
    'protein untuk otot',
    'kalori lari',
    'gerakan squat',
  ]

  queries.forEach(q => {
    const results = search(q, 6)
    const scores  = results.map(r => (r.score * 100).toFixed(1))

    console.log(`\n"${q}"`)
    results.forEach((r, i) => {
      const bar   = '█'.repeat(Math.round(r.score * 30))
      const score = (r.score * 100).toFixed(1)
      const color = r.score > 0.5 ? c.green : r.score > 0.2 ? c.yellow : c.red
      console.log(`  ${i+1}. ${color}${bar.padEnd(30)}${c.reset} ${score}% — ${r.title} (${r.type})`)
    })

    // Cek gap antara rank 1 dan rank 2 (semakin besar semakin baik)
    if (results.length >= 2) {
      const gap = ((results[0].score - results[1].score) * 100).toFixed(1)
      const gapOk = parseFloat(gap) > 5
      console.log(`  ${gapOk ? c.green : c.yellow}Gap rank 1 vs 2: ${gap}%${c.reset}`)
    }
  })
}

// ════════════════════════════════════════════════════════════
// MAIN — Jalankan semua test
// ════════════════════════════════════════════════════════════
async function main() {
  console.log(`\n${c.bold}${c.cyan}`)
  console.log('  ██████╗ ██████╗      ████████╗███████╗███████╗████████╗')
  console.log('  ██╔══██╗██╔══██╗        ██╔══╝██╔════╝██╔════╝╚══██╔══╝')
  console.log('  ██║  ██║██████╔╝        ██║   █████╗  ███████╗   ██║   ')
  console.log('  ██║  ██║██╔══██╗        ██║   ██╔══╝  ╚════██║   ██║   ')
  console.log('  ██████╔╝██║  ██║        ██║   ███████╗███████║   ██║   ')
  console.log('  ╚═════╝ ╚═╝  ╚═╝        ╚═╝   ╚══════╝╚══════╝   ╚═╝   ')
  console.log(`${c.reset}`)
  console.log(`  ${c.dim}Information Retrieval System — Calsio Workout App${c.reset}`)
  console.log(`  ${c.dim}Tanggal: ${new Date().toLocaleString('id-ID')}${c.reset}`)

  const t1 = testDocumentRetrieval()
  const t2 = testQueryExpansion()
  const t3 = testPersonalQueryDetection()
  const t4 = testPersonalContextFormatting()
  const t5 = testEdgeCases()
  const t6 = testEmptyPersonalData()
  testScoreDistribution()

  // ── Ringkasan akhir ──────────────────────────────────────
  header('RINGKASAN AKHIR')

  const summary = [
    { name: 'Document Retrieval Accuracy', value: `${t1.accuracy}%`,   pass: t1.accuracy >= 80  },
    { name: 'MRR Score',                   value: t1.mrr.toFixed(3),   pass: t1.mrr >= 0.70     },
    { name: 'Avg Precision@K',             value: `${t1.precision}%`,  pass: t1.precision >= 60 },
    { name: 'Query Expansion',             value: `${t2}%`,            pass: t2 >= 70           },
    { name: 'Personal Query Detection',    value: `${t3}%`,            pass: t3 >= 90           },
    { name: 'Personal Context Format',     value: t4 ? 'PASS' : 'FAIL', pass: t4               },
    { name: 'Edge Case Handling',          value: `${t5}/8`,           pass: t5 >= 6            },
    { name: 'Empty Data Handling',         value: t6 ? 'PASS' : 'FAIL', pass: t6               },
  ]

  summary.forEach(s => {
    const icon = s.pass ? `${c.green}✅${c.reset}` : `${c.red}❌${c.reset}`
    const val  = s.pass ? `${c.green}${s.value}${c.reset}` : `${c.red}${s.value}${c.reset}`
    console.log(`  ${icon}  ${s.name.padEnd(35)} ${val}`)
  })

  const totalPass = summary.filter(s => s.pass).length
  const grade     = totalPass >= 7 ? '🏆 EXCELLENT' : totalPass >= 5 ? '👍 GOOD' : totalPass >= 3 ? '⚠️  FAIR' : '❌ NEEDS WORK'

  console.log(`\n  ${c.bold}Total: ${totalPass}/${summary.length} tests passed${c.reset}`)
  console.log(`  ${c.bold}Grade: ${grade}${c.reset}\n`)
}

main().catch(console.error)