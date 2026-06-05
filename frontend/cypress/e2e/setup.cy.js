describe('Setup Profile Flow', () => {

beforeEach(() => {
  cy.clearLocalStorage()
  cy.window().then(win => {
    win.localStorage.setItem('calsio_visited', 'true')
  })

  // Login dulu untuk dapat token valid
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/auth/login',
    body: {
      email: 'test@gmail.com',
      password: 'password123'
    }
  }).then(res => {
    cy.window().then(win => {
      win.localStorage.setItem('calsio_token', res.body.token)
    })
  })
})

  it('halaman setup bisa diakses', () => {
    cy.visit('http://localhost:5173/setup')
    cy.contains('Setup Profil').should('be.visible')
    cy.contains('Simpan & Mulai Workout').should('be.visible')
  })

  it('validasi form kosong tampilkan error', () => {
    cy.visit('http://localhost:5173/setup')
    cy.contains('Simpan & Mulai Workout').click()
    cy.contains('Lengkapi semua data').should('be.visible')
  })

  it('BMI preview muncul saat isi berat dan tinggi', () => {
    cy.visit('http://localhost:5173/setup')
    cy.get('input[placeholder="70"]').type('70')
    cy.get('input[placeholder="170"]').type('170')
    cy.contains('BMI Kamu').should('be.visible')
    cy.contains('Normal').should('be.visible')
  })

  it('pilih gender Male aktif', () => {
    cy.visit('http://localhost:5173/setup')
    cy.contains('Male').click()
    cy.contains('Male').should('have.class', 'active')
  })

  it('pilih gender Female aktif', () => {
    cy.visit('http://localhost:5173/setup')
    cy.contains('Female').click()
    cy.contains('Female').should('have.class', 'active')
  })

  it('pilih peralatan Tanpa Alat aktif', () => {
    cy.visit('http://localhost:5173/setup')
    cy.contains('Tanpa Alat').click()
    cy.contains('Tanpa Alat').closest('.equip-btn').should('have.class', 'active')
  })

  it('pilih peralatan Dumbbell aktif', () => {
    cy.visit('http://localhost:5173/setup')
    cy.contains('Dumbbell').click()
    cy.contains('Dumbbell').closest('.equip-btn').should('have.class', 'active')
  })

  it('setup lengkap redirect ke dashboard', () => {
    // Login dulu dengan akun real untuk dapat token valid
    cy.visit('http://localhost:5173/login')
    cy.window().then(win => {
      win.localStorage.setItem('calsio_visited', 'true')
    })
    cy.get('input[type="email"]').type('test@gmail.com')
    cy.get('input[type="password"]').type('password123')
    cy.contains('Masuk Sekarang').click()

    // Hapus setup agar bisa ke halaman setup
    cy.window().then(win => {
      win.localStorage.removeItem('calsio_user_setup')
    })

    cy.visit('http://localhost:5173/setup')

    // Isi semua field
    cy.get('input[placeholder="25"]').type('25')
    cy.get('input[placeholder="70"]').type('70')
    cy.get('input[placeholder="170"]').type('170')
    cy.contains('Male').click()
    cy.contains('Tanpa Alat').click()

    cy.contains('Simpan & Mulai Workout').click()
    cy.url().should('include', '/dashboard', { timeout: 5000 })
  })

})