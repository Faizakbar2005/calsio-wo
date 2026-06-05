describe('Auth - Login Flow', () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.window().then(win => {
      win.localStorage.setItem('calsio_visited', 'true')
    })
  })

  it('halaman login bisa diakses', () => {
    cy.visit('http://localhost:5173/login')
    cy.contains('Masuk').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
  })

  it('validasi form login kosong', () => {
    cy.visit('http://localhost:5173/login')
    cy.contains('Masuk Sekarang').click()
    cy.contains('Email wajib diisi').should('be.visible')
    cy.contains('Password wajib diisi').should('be.visible')
  })

  it('validasi format email tidak valid', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('emailtidakvalid')
    cy.get('input[type="password"]').type('password123')
    cy.contains('Masuk Sekarang').click()
    cy.contains('Format email tidak valid').should('be.visible')
  })

  it('validasi password kurang dari 6 karakter', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('test@gmail.com')
    cy.get('input[type="password"]').type('123')
    cy.contains('Masuk Sekarang').click()
    cy.contains('Password minimal 6 karakter').should('be.visible')
  })

  it('login email salah tampilkan error', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('salah@gmail.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.contains('Masuk Sekarang').click()
    cy.contains('tidak ditemukan').should('be.visible')
  })

  it('login password salah tampilkan error', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('test@gmail.com')
    cy.get('input[type="password"]').type('passwordsalah')
    cy.contains('Masuk Sekarang').click()
    cy.contains('salah').should('be.visible')
  })

  it('login berhasil redirect ke setup atau dashboard', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('test@gmail.com')
    cy.get('input[type="password"]').type('password123')
    cy.contains('Masuk Sekarang').click()
    cy.url().should('satisfy', url =>
      url.includes('/setup') || url.includes('/dashboard')
    )
  })

  it('tombol show/hide password berfungsi', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="password"]').should('exist')
    cy.get('.pw-toggle').click()
    cy.get('input[type="text"]').should('exist')
    cy.get('.pw-toggle').click()
    cy.get('input[type="password"]').should('exist')
  })

  it('link ke register berfungsi', () => {
    cy.visit('http://localhost:5173/login')
    cy.contains('Daftar sekarang').click()
    cy.url().should('include', '/register')
  })

})