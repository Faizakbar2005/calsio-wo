/**
 * frontend/src/services/__tests__/irService.test.js
 * Jalankan: cd frontend && npm test
 */

import { search, buildFallbackSummary, formatForLLM } from '../irService.js'
import { describe, it, expect } from 'vitest'

// ─────────────────────────────────────────────────────────────────────────────
describe('irService — search()', () => {

  // ── 1. Recall ──────────────────────────────────────────────────────────────
  describe('Recall — dokumen yang benar harus ditemukan', () => {

    it('query "push up" → menemukan exercise Push Up', () => {
      const results = search('push up')
      const ids = results.map(r => r.id)
      expect(ids).toContain('exercise_Push Up')
    })

    it('query "squat" → menemukan exercise Squat', () => {
      const results = search('squat')
      const ids = results.map(r => r.id)
      expect(ids).toContain('exercise_Squat')
    })

    it('query "protein harian" → menemukan makro Protein', () => {
      const results = search('protein harian')
      const ids = results.map(r => r.id)
      expect(ids).toContain('makro_Protein')
    })

    it('query "lari kalori" → menemukan MET Lari', () => {
      const results = search('lari kalori')
      const ids = results.map(r => r.id)
      const found = ids.some(id => id.toLowerCase().includes('lari'))
      expect(found).toBe(true)
    })

    it('query "waktu makan olahraga" → menemukan nutrisi Timing Makan', () => {
      const results = search('waktu makan olahraga')
      const ids = results.map(r => r.id)
      expect(ids).toContain('nutrisi_Timing Makan')
    })

    it('query "otot dada" → menemukan muscle Dada', () => {
      const results = search('otot dada')
      const ids = results.map(r => r.id)
      const found = ids.some(id => id.includes('muscle_Dada'))
      expect(found).toBe(true)
    })
  })

  // ── 2. Ranking ─────────────────────────────────────────────────────────────
  describe('Ranking — dokumen paling relevan di posisi #1', () => {

    it('"Jumping Jack" exact match → rank #1', () => {
      const results = search('Jumping Jack')
      expect(results[0].id).toBe('exercise_Jumping Jack')
    })

    it('"Deadlift" exact match → rank #1', () => {
      const results = search('Deadlift')
      expect(results[0].id).toBe('exercise_Deadlift')
    })

    it('"Plank" exact match → rank #1', () => {
      const results = search('Plank')
      expect(results[0].id).toBe('exercise_Plank')
    })

    it('score selalu descending', () => {
      const results = search('latihan dada push up cara benar')
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score)
      }
    })

    it('query nutrisi → top result tipe nutrisi atau makro', () => {
      const results = search('kebutuhan protein gram per kilogram')
      expect(['makro', 'nutrisi']).toContain(results[0].type)
    })

    it('query gerakan → top result tipe exercise atau muscle', () => {
      const results = search('cara melakukan squat yang benar')
      expect(['exercise', 'muscle']).toContain(results[0].type)
    })
  })

  // ── 3. Query Expansion ─────────────────────────────────────────────────────
  describe('Query Expansion — sinonim harus bekerja', () => {

    it('"chest" → menemukan dada atau Push Up', () => {
      const results = search('chest workout')
      const titles = results.map(r => r.title.toLowerCase())
      const found = titles.some(t => t.includes('dada') || t.includes('push'))
      expect(found).toBe(true)
    })

    it('"glute" → menemukan bokong atau Hip Thrust', () => {
      const results = search('glute exercise')
      const titles = results.map(r => r.title.toLowerCase())
      const found = titles.some(t =>
        t.includes('bokong') || t.includes('hip') || t.includes('thrust')
      )
      expect(found).toBe(true)
    })

    it('"abs" → menemukan perut atau Plank', () => {
      const results = search('abs training')
      const titles = results.map(r => r.title.toLowerCase())
      const found = titles.some(t =>
        t.includes('perut') || t.includes('plank') || t.includes('mountain')
      )
      expect(found).toBe(true)
    })

    it('"back" → menemukan punggung atau Pull Up', () => {
      const results = search('back exercise')
      const titles = results.map(r => r.title.toLowerCase())
      const found = titles.some(t =>
        t.includes('punggung') || t.includes('pull') || t.includes('deadlift')
      )
      expect(found).toBe(true)
    })

    it('"burn calories" → menemukan MET atau exercise', () => {
      const results = search('burn calories fast')
      const types = results.map(r => r.type)
      expect(types.some(t => ['met', 'exercise'].includes(t))).toBe(true)
    })

    it('"carbs" → menemukan karbohidrat atau nutrisi', () => {
      const results = search('carbs energy workout')
      const titles = results.map(r => r.title.toLowerCase())
      const found = titles.some(t =>
        t.includes('karbohidrat') || t.includes('nutrisi') || t.includes('timing')
      )
      expect(found).toBe(true)
    })
  })

  // ── 4. Precision ───────────────────────────────────────────────────────────
  describe('Precision — hasil tidak boleh noise', () => {

    it('query "squat" → top result bukan nutrisi', () => {
      const results = search('squat')
      expect(results[0].type).not.toBe('nutrisi')
      expect(results[0].type).not.toBe('makro')
    })

    it('query "protein" → top result bukan exercise', () => {
      const results = search('kebutuhan protein per hari untuk otot')
      expect(['makro', 'nutrisi']).toContain(results[0].type)
    })

    it('query "MET lari" → top result tipe met', () => {
      const results = search('MET nilai lari')
      expect(results[0].type).toBe('met')
    })
  })

  // ── 5. Edge Cases ──────────────────────────────────────────────────────────
  describe('Edge Cases', () => {

    it('query kosong → return array kosong', () => {
      expect(search('')).toEqual([])
    })

    it('query hanya stopword → return array kosong', () => {
      expect(search('yang dan di ke dari')).toEqual([])
    })

    it('query UPPERCASE → hasil sama dengan lowercase', () => {
      expect(search('PUSH UP')[0].id).toBe(search('push up')[0].id)
    })

    it('query 1 kata → tidak crash dan ada hasil', () => {
      expect(() => search('squat')).not.toThrow()
      expect(search('squat').length).toBeGreaterThan(0)
    })

    it('query sangat panjang → tidak crash', () => {
      const q = 'latihan push up cara melakukan yang benar untuk pemula dengan tangan lebar siku ditekuk 45 derajat supaya otot dada lebih aktif'
      expect(() => search(q)).not.toThrow()
    })

    it('max 5 hasil (topK default)', () => {
      expect(search('latihan olahraga workout').length).toBeLessThanOrEqual(5)
    })

    it('topK custom → mengikuti parameter', () => {
      expect(search('latihan', 3).length).toBeLessThanOrEqual(3)
    })

    it('tidak ada duplikat id', () => {
      const results = search('latihan kaki squat dada push chest')
      const ids = results.map(r => r.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('semua hasil punya score > 0', () => {
      search('push up').forEach(r => expect(r.score).toBeGreaterThan(0))
    })
  })

  // ── 6. Struktur Output ─────────────────────────────────────────────────────
  describe('Struktur Output', () => {

    it('setiap result punya field wajib: id, type, title, score, tags, raw', () => {
      const r = search('push up')[0]
      expect(r).toHaveProperty('id')
      expect(r).toHaveProperty('type')
      expect(r).toHaveProperty('title')
      expect(r).toHaveProperty('score')
      expect(r).toHaveProperty('tags')
      expect(r).toHaveProperty('raw')
    })

    it('type hanya nilai valid', () => {
      const validTypes = ['exercise', 'muscle', 'nutrisi', 'makro', 'met']
      search('latihan nutrisi kalori').forEach(r => {
        expect(validTypes).toContain(r.type)
      })
    })

    it('tags adalah array', () => {
      search('squat').forEach(r => expect(Array.isArray(r.tags)).toBe(true))
    })

    it('raw.name ada untuk semua hasil', () => {
      search('latihan').forEach(r => expect(r.raw).toHaveProperty('name'))
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
describe('irService — buildFallbackSummary()', () => {

  it('hasil kosong → pesan tidak ditemukan', () => {
    const text = buildFallbackSummary([], 'xyzabc')
    expect(text).toContain('Tidak ditemukan')
    expect(text).toContain('xyzabc')
  })

  it('ada hasil → teks tidak kosong dan mengandung query', () => {
    const text = buildFallbackSummary(search('push up'), 'push up')
    expect(text).toContain('push up')
    expect(text.length).toBeGreaterThan(30)
  })

  it('hasil exercise → mengandung MET atau kcal', () => {
    const results = search('push up').filter(r => r.type === 'exercise')
    const text = buildFallbackSummary(results, 'push up')
    expect(text).toMatch(/MET|kcal/)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
describe('irService — formatForLLM()', () => {

  it('menghasilkan string tidak kosong', () => {
    const prompt = formatForLLM(search('push up'), 'cara push up')
    expect(typeof prompt).toBe('string')
    expect(prompt.length).toBeGreaterThan(100)
  })

  it('prompt mengandung query pengguna', () => {
    const prompt = formatForLLM(search('squat kaki'), 'squat kaki')
    expect(prompt).toContain('squat kaki')
  })

  it('prompt mengandung marker DOKUMEN REFERENSI', () => {
    const prompt = formatForLLM(search('push up'), 'push up')
    expect(prompt).toContain('DOKUMEN REFERENSI')
  })

  it('prompt mengandung MET dan kcal untuk exercise', () => {
    const results = search('push up').filter(r => r.type === 'exercise')
    const prompt = formatForLLM(results, 'push up')
    expect(prompt).toContain('MET')
    expect(prompt).toContain('kcal')
  })
})