const app = require("./app");
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true, logging: console.log }) // ← tambah logging
  .then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => {
      console.log(`🚀 Calsio backend running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB sync error:', err);
    process.exit(1);
  });