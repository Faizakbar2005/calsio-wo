/**
 * seed-admin.js
 * Jalankan SEKALI untuk membuat akun admin pertama:
 *   node src/seed-admin.js
 *
 * Taruh di: backend/src/seed-admin.js
 */

require('dotenv').config()
const bcrypt   = require('bcryptjs')
const { sequelize } = require('./config/database')
const Admin    = require('./models/Admin')

async function seedAdmin() {
  try {
    await sequelize.sync({ alter: true })
    console.log('✅ Tabel admins siap')

    // Cek apakah sudah ada admin
    const existing = await Admin.findOne({ where: { email: 'admin@calsio.com' } })
    if (existing) {
      console.log('⚠️  Admin sudah ada, skip.')
      process.exit(0)
    }

    const hashedPassword = await bcrypt.hash('admin123', 10)

    await Admin.create({
      name    : 'Super Admin',
      email   : 'admin@calsio.com',
      password: hashedPassword,
      role    : 'admin',
    })

    console.log('✅ Admin berhasil dibuat!')
    console.log('   Email   : admin@calsio.com')
    console.log('   Password: admin123')
    console.log('')
    console.log('⚠️  Segera ganti password setelah login pertama!')

  } catch (err) {
    console.error('❌ Error:', err.message)
  } finally {
    await sequelize.close()
    process.exit(0)
  }
}

seedAdmin()
