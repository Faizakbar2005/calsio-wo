require('dotenv').config()
const bcrypt = require('bcryptjs')
const { Admin } = require('./src/models')

async function createAdmin() {
  const password = 'admin123' // ganti sesuai keinginan
  const hash = await bcrypt.hash(password, 10)

  const [admin, created] = await Admin.findOrCreate({
    where: { email: 'admin@calsio.com' },
    defaults: {
      name    : 'Admin Calsio',
      email   : 'admin@calsio.com',
      password: hash,
      role    : 'admin',
    }
  })

  if (!created) {
    // Kalau sudah ada, update passwordnya
    await admin.update({ password: hash })
    console.log('Password admin diupdate:', admin.email)
  } else {
    console.log('Admin berhasil dibuat:', admin.email)
  }

  process.exit(0)
}

createAdmin().catch(err => {
  console.error(err)
  process.exit(1)
})