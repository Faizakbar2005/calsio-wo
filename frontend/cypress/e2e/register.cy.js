describe('Auth - Register Flow', () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.window().then(win => {
      win.localStorage.setItem('calsio_visited', 'true')
    })
  })

  it('halaman register bisa diakses', () => {
    cy.visit('http://localhost:5173/register')
    cy.contains('Daftar').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
  })

  it('validasi form register kosong', () => {
    cy.visit('http://localhost:5173/register')
    cy.contains('Buat Akun').click()
    cy.contains('Nama wajib diisi').should('be.visible')
    cy.contains('Email wajib diisi').should('be.visible')
    cy.contains('Password wajib diisi').should('be.visible')
  })

  it('validasi password tidak cocok', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[placeholder="John Doe"]').type('Test User')
    cy.get('input[placeholder="email@kamu.com"]').type('test@gmail.com')
    cy.get('input[placeholder="Min. 6 karakter"]').type('password123')
    cy.get('input[placeholder="Ulangi password"]').type('passwordbeda')
    cy.contains('Buat Akun').click()
    cy.contains('Password tidak cocok').should('be.visible')
  })

  it('register berhasil redirect ke setup', () => {
    const randomEmail = `test${Date.now()}@gmail.com`
    cy.visit('http://localhost:5173/register')
    cy.get('input[placeholder="John Doe"]').type('Test User')
    cy.get('input[placeholder="email@kamu.com"]').type(randomEmail)
    cy.get('input[placeholder="Min. 6 karakter"]').type('password123')
    cy.get('input[placeholder="Ulangi password"]').type('password123')
    cy.contains('Buat Akun').click()
    cy.contains('Akun berhasil dibuat').should('be.visible')
    cy.url().should('include', '/setup', { timeout: 5000 })
  })

  it('register email sudah terdaftar tampilkan error', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[placeholder="John Doe"]').type('Test User')
    cy.get('input[placeholder="email@kamu.com"]').type('test@gmail.com')
    cy.get('input[placeholder="Min. 6 karakter"]').type('password123')
    cy.get('input[placeholder="Ulangi password"]').type('password123')
    cy.contains('Buat Akun').click()
    cy.contains('sudah terdaftar').should('be.visible')
  })

  it('link ke login berfungsi', () => {
    cy.visit('http://localhost:5173/register')
    cy.contains('Masuk Sekarang').click()
    cy.url().should('include', '/login')
  })

})