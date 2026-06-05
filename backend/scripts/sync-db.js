// backend/scripts/sync-db.js
require('dotenv').config({ path: '../.env' });
const { sequelize } = require('../src/config/database');
require('../src/models'); // ← load index.js bukan user.js langsung

sequelize.sync({ alter: true })
  .then(() => { console.log('✅ DB synced'); process.exit(0); })
  .catch(err => { console.error('❌', err); process.exit(1); });