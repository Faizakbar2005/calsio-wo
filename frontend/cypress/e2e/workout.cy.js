describe('Workout - Core Functions', () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login',
      body: { email: 'test@gmail.com', password: 'password123' }
    }).then(res => {
      cy.window().then(win => {
        win.localStorage.setItem('calsio_visited', 'true')
        win.localStorage.setItem('calsio_token', res.body.token)
        win.localStorage.setItem('calsio_user_setup', 'true')
        win.localStorage.setItem('calsio_user_profile', JSON.stringify({
          age: 25, weight: 70, height: 1.70, gender: 'Male',
          maxBpm: 185, restingBpm: 62
        }))
      })
    })
  })

  it('halaman workout bisa diakses', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Workout Session').should('be.visible')
    cy.contains('Tanpa Alat').should('be.visible')
    cy.contains('Dumbbell').should('be.visible')
  })

  it('pilih equipment Tanpa Alat muncul kategori otot', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Tanpa Alat').click()
    cy.contains('Chest').should('be.visible')
    cy.contains('Back').should('be.visible')
    cy.contains('Legs').should('be.visible')
  })

  it('pilih equipment Dumbbell muncul kategori otot', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Dumbbell').click()
    cy.contains('Chest').should('be.visible')
  })

  it('pilih kategori otot muncul daftar gerakan', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Tanpa Alat').click()
    cy.contains('Chest').click()
    cy.get('.ex-btn').should('have.length.greaterThan', 0)
  })

  it('pilih gerakan muncul detail latihan (step 4)', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Tanpa Alat').click()
    cy.contains('Chest').click()
    cy.get('.ex-btn').first().click()
    cy.contains('Detail Latihan').should('be.visible')
    cy.contains('Prediksi Kalori Terbakar').should('be.visible')
  })

  it('intensitas bisa dipilih', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Tanpa Alat').click()
    cy.contains('Chest').click()
    cy.get('.ex-btn').first().click()
    cy.contains('Ringan').click()
    cy.contains('Ringan').closest('.int-btn').should('have.class', 'active')
    cy.contains('Berat').click()
    cy.contains('Berat').closest('.int-btn').should('have.class', 'active')
  })

  it('tombol prediksi kalori berfungsi dan muncul modal', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Tanpa Alat').click()
    cy.contains('Chest').click()
    cy.get('.ex-btn').first().click()
    cy.contains('Prediksi Kalori Terbakar').click()
    // Modal loading muncul
    cy.contains('Model GBR menghitung').should('be.visible')
    // Tunggu hasil prediksi
    cy.contains('kcal', { timeout: 10000 }).should('be.visible')
  })

  it('simpan sesi setelah prediksi muncul toast', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Tanpa Alat').click()
    cy.contains('Chest').click()
    cy.get('.ex-btn').first().click()
    cy.contains('Prediksi Kalori Terbakar').click()
    cy.contains('Simpan ke Riwayat', { timeout: 10000 }).click()
    // Toast muncul setelah simpan
    cy.get('.workout-toast', { timeout: 5000 }).should('be.visible')
  })

  it('tombol reset kembali ke step 1', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Tanpa Alat').click()
    cy.contains('Chest').click()
    cy.get('.ex-btn').first().click()
    cy.contains('Prediksi Kalori Terbakar').click()
    cy.contains('kcal', { timeout: 10000 }).should('be.visible')
    // Klik reset di result card
    cy.get('.btn-reset').click()
    // Kembali ke awal
    cy.contains('Tanpa Alat').should('be.visible')
    cy.contains('Detail Latihan').should('not.exist')
  })

  it('visualisasi otot muncul saat pilih gerakan', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Tanpa Alat').click()
    cy.contains('Chest').click()
    cy.get('.ex-btn').first().click()
    cy.get('.body-svg').should('be.visible')
  })

  it('toggle front/back body view berfungsi', () => {
    cy.visit('http://localhost:5173/workout')
    cy.contains('Tanpa Alat').click()
    cy.contains('Back').click()
    cy.get('.ex-btn').first().click()
    cy.contains('Belakang').click()
    cy.contains('Depan').click()
    cy.get('.body-svg').should('be.visible')
  })

})