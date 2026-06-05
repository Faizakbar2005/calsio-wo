import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'          // ← tambah ini
import './assets/main.css'

// ── Restore token setiap kali app boot ──────────────────────────
const token = localStorage.getItem('calsio_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

createApp(App).use(router).mount('#app')