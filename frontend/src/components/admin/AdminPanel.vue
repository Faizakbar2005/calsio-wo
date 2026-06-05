<template>
  <div class="admin-wrapper">
    <div class="bg-grid"></div>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <span class="brand-icon">⚡</span>
        <transition name="fade">
          <span v-if="!sidebarCollapsed" class="brand-name">CALSIO<span class="brand-suffix"> ADMIN</span></span>
        </transition>
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <button
          v-for="item in navItems" :key="item.id"
          @click="activePage = item.id"
          :class="['nav-item', activePage === item.id ? 'active' : '']"
          :title="sidebarCollapsed ? item.label : ''"
        >
          <span class="nav-icon" v-html="item.icon"></span>
          <transition name="fade">
            <span v-if="!sidebarCollapsed" class="nav-label">{{ item.label }}</span>
          </transition>
          <transition name="fade">
            <span v-if="!sidebarCollapsed && item.badge" class="nav-badge">{{ item.badge }}</span>
          </transition>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="admin-info" v-if="!sidebarCollapsed">
          <div class="admin-avatar">{{ adminInitial }}</div>
          <div class="admin-meta">
            <div class="admin-name">{{ adminName }}</div>
            <div class="admin-role">Super Admin</div>
          </div>
        </div>
        <button class="logout-btn" @click="handleLogout" :title="sidebarCollapsed ? 'Logout' : ''">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <transition name="fade">
            <span v-if="!sidebarCollapsed">Logout</span>
          </transition>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">

      <!-- Topbar -->
      <div class="topbar">
        <div class="topbar-left">
          <h2 class="page-heading">{{ currentPageLabel }}</h2>
          <span class="page-date">{{ dateLabel }}</span>
        </div>
        <div class="topbar-right">
          <div class="search-wrap" v-if="activePage !== 'stats'">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="searchQuery" :placeholder="'Cari ' + currentPageLabel.toLowerCase() + '...'" />
          </div>
          <div class="topbar-dot"></div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Memuat data...</p>
      </div>

      <template v-else>

        <!-- ═══════════════════════════════════ -->
        <!--  PAGE: STATISTIK                    -->
        <!-- ═══════════════════════════════════ -->
        <div v-if="activePage === 'stats'" class="page-content">

          <!-- Stat Cards -->
          <div class="stat-grid animate-in">
            <div v-for="s in statCards" :key="s.label" class="stat-card">
              <div class="stat-icon" :style="{ background: s.iconBg }">
                <span v-html="s.icon"></span>
              </div>
              <div class="stat-body">
                <span class="stat-label">{{ s.label }}</span>
                <span class="stat-value">{{ s.value.toLocaleString('id-ID') }}<small>{{ s.unit }}</small></span>
                <span class="stat-delta" :class="s.up ? 'up' : 'neu'">{{ s.delta }}</span>
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="charts-row animate-in" style="animation-delay:0.1s">
            <div class="card wide-card">
              <div class="card-bar"></div>
              <div class="card-header">
                <h3 class="card-title">Aktivitas Workout — 7 Hari Terakhir</h3>
                <span class="card-sub">Total sesi & kalori per hari</span>
              </div>
              <div class="chart-wrap">
                <canvas ref="activityChart"></canvas>
              </div>
            </div>

            <div class="card">
              <div class="card-bar"></div>
              <h3 class="card-title" style="margin-bottom:4px">Muscle Group Populer</h3>
              <span class="card-sub" style="margin-bottom:16px;display:block">Berdasarkan total sesi</span>
              <div class="chart-wrap" style="height:200px">
                <canvas ref="muscleChart"></canvas>
              </div>
              <div class="muscle-legend">
                <div v-for="m in muscleStats" :key="m.name" class="ml-item">
                  <span class="ml-dot" :style="{ background: m.color }"></span>
                  <span class="ml-name">{{ m.name }}</span>
                  <span class="ml-val">{{ m.count }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card animate-in" style="animation-delay:0.15s">
            <div class="card-bar"></div>
            <h3 class="card-title" style="margin-bottom:16px">Aktivitas Terbaru</h3>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Muscle</th>
                    <th>Durasi</th>
                    <th>Kalori</th>
                    <th>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="h in recentActivity" :key="h.id">
                    <td><span class="user-chip">{{ h.user_email || h.userId || '—' }}</span></td>
                    <td><span class="muscle-pill">{{ h.muscle_group || '—' }}</span></td>
                    <td>{{ h.duration }} <span class="td-unit">mnt</span></td>
                    <td><strong>{{ Math.round(h.calories) }}</strong> <span class="td-unit">kcal</span></td>
                    <td class="td-muted">{{ formatDateTime(h.created_at || h.createdAt) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════ -->
        <!--  PAGE: USERS                        -->
        <!-- ═══════════════════════════════════ -->
        <div v-if="activePage === 'users'" class="page-content">
          <div class="card animate-in">
            <div class="card-bar"></div>
            <div class="card-header">
              <h3 class="card-title">Semua User Terdaftar</h3>
              <span class="count-badge">{{ filteredUsers.length }} user</span>
            </div>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Nama</th>
                    <th>Terdaftar</th>
                    <th>Total Sesi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="u in filteredUsers" :key="u.id" :class="{ 'row-deleting': deletingId === u.id }">
                    <td class="td-muted">#{{ u.id }}</td>
                    <td>{{ u.email }}</td>
                    <td>{{ u.name || '—' }}</td>
                    <td class="td-muted">{{ formatDate(u.created_at || u.createdAt) }}</td>
                    <td>
                      <span class="count-pill">{{ u.session_count || 0 }} sesi</span>
                    </td>
                    <td>
                      <button
                        @click="confirmDelete('user', u)"
                        class="btn-danger-sm"
                        :disabled="deletingId === u.id"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        Hapus
                      </button>
                    </td>
                  </tr>
                  <tr v-if="filteredUsers.length === 0">
                    <td colspan="6" class="empty-row">Tidak ada user ditemukan</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════ -->
        <!--  PAGE: HISTORY                      -->
        <!-- ═══════════════════════════════════ -->
        <div v-if="activePage === 'history'" class="page-content">
          <div class="filter-bar animate-in">
            <select v-model="historyFilter.muscle" class="filter-select">
              <option value="">Semua Muscle Group</option>
              <option v-for="m in muscleOptions" :key="m" :value="m">{{ m }}</option>
            </select>
            <select v-model="historyFilter.sort" class="filter-select">
              <option value="newest">Terbaru dulu</option>
              <option value="oldest">Terlama dulu</option>
              <option value="calories_desc">Kalori tertinggi</option>
              <option value="calories_asc">Kalori terendah</option>
            </select>
            <span class="filter-count">{{ filteredHistory.length }} sesi ditemukan</span>
          </div>

          <div class="card animate-in" style="animation-delay:0.05s">
            <div class="card-bar"></div>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Muscle</th>
                    <th>Workout Type</th>
                    <th>Durasi</th>
                    <th>Kalori</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="h in paginatedHistory" :key="h.id" :class="{ 'row-deleting': deletingId === h.id }">
                    <td class="td-muted">#{{ h.id }}</td>
                    <td><span class="user-chip">{{ h.user_email || h.userId || '—' }}</span></td>
                    <td><span class="muscle-pill">{{ h.muscle_group || '—' }}</span></td>
                    <td class="td-muted">{{ h.workout_type || '—' }}</td>
                    <td>{{ h.duration }} <span class="td-unit">mnt</span></td>
                    <td><strong>{{ Math.round(h.calories) }}</strong> <span class="td-unit">kcal</span></td>
                    <td class="td-muted">{{ formatDateTime(h.created_at || h.createdAt) }}</td>
                    <td>
                      <button
                        @click="confirmDelete('history', h)"
                        class="btn-danger-sm"
                        :disabled="deletingId === h.id"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        Hapus
                      </button>
                    </td>
                  </tr>
                  <tr v-if="paginatedHistory.length === 0">
                    <td colspan="8" class="empty-row">Tidak ada data ditemukan</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="pagination" v-if="totalHistoryPages > 1">
              <button @click="historyPage--" :disabled="historyPage === 1" class="page-btn">←</button>
              <span class="page-info">{{ historyPage }} / {{ totalHistoryPages }}</span>
              <button @click="historyPage++" :disabled="historyPage === totalHistoryPages" class="page-btn">→</button>
            </div>
          </div>
        </div>

      </template>
    </main>

    <!-- Delete Confirm Modal -->
    <transition name="modal">
      <div v-if="deleteModal.show" class="modal-overlay" @click.self="deleteModal.show = false">
        <div class="modal-box">
          <div class="modal-icon">🗑️</div>
          <h3 class="modal-title">Konfirmasi Hapus</h3>
          <p class="modal-desc">{{ deleteModal.message }}</p>
          <p class="modal-warning">Tindakan ini tidak dapat dibatalkan.</p>
          <div class="modal-actions">
            <button @click="deleteModal.show = false" class="btn-cancel">Batal</button>
            <button @click="executeDelete" class="btn-confirm-delete" :disabled="deletingId">
              {{ deletingId ? 'Menghapus...' : 'Ya, Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <svg v-if="toast.type === 'success'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {{ toast.message }}
      </div>
    </transition>

  </div>
</template>

<script>
import axios from 'axios'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  BarElement, LineElement, CategoryScale, LinearScale,
  PointElement, ArcElement
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement, ArcElement)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const MUSCLE_COLORS = {
  'Dada':'#eab308','Kaki':'#3b82f6','Punggung':'#22c55e',
  'Kardio':'#14b8a6','Bisep':'#a855f7','Trisep':'#f97316',
  'Deltoid':'#ec4899','Perut':'#06b6d4','Bokong':'#84cc16',
}

const SVG = {
  users  : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  history: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  stats  : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  fire   : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2.5-1.5-4.5-2.5-6 0 2-1 3.5-2.5 4.5C13 8 12 5 12 2z"/></svg>`,
  clock  : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 3h6M12 3v2"/></svg>`,
}

export default {
  name: 'AdminPanel',
  emits: ['logout'],

  data() {
    return {
      loading         : true,
      sidebarCollapsed: false,
      activePage      : 'stats',
      searchQuery     : '',
      deletingId      : null,

      users          : [],
      allHistory     : [],
      globalStats    : {},

      historyFilter  : { muscle: '', sort: 'newest' },
      historyPage    : 1,
      historyPerPage : 15,

      deleteModal    : { show: false, type: '', item: null, message: '' },
      toast          : { show: false, type: 'success', message: '' },

      activityChartInst: null,
      muscleChartInst  : null,

      navItems: [
        { id: 'stats',   label: 'Statistik',      icon: SVG.stats,   badge: null },
        { id: 'users',   label: 'Kelola User',     icon: SVG.users,   badge: null },
        { id: 'history', label: 'Riwayat Workout', icon: SVG.history, badge: null },
      ],
      muscleOptions: ['Dada','Punggung','Kaki','Bokong','Deltoid','Bisep','Trisep','Perut','Kardio'],
    }
  },

  computed: {
    adminName() {
      try { return JSON.parse(localStorage.getItem('admin_user') || '{}').name || 'Admin' } catch { return 'Admin' }
    },
    adminInitial() { return this.adminName.charAt(0).toUpperCase() },
    currentPageLabel() {
      return { stats: 'Statistik & Grafik', users: 'Kelola User', history: 'Riwayat Workout' }[this.activePage]
    },
    dateLabel() {
      return new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    },

    // ── Stats Cards ──
    statCards() {
      const totalSessions  = this.allHistory.length
      const totalCalories  = Math.round(this.allHistory.reduce((s, h) => s + (h.calories || 0), 0))
      const totalDuration  = this.allHistory.reduce((s, h) => s + (h.duration || 0), 0)
      const today = new Date().toDateString()
      const todaySessions  = this.allHistory.filter(h => new Date(h.created_at || h.createdAt).toDateString() === today).length
      return [
        { label: 'Total User',     value: this.users.length,  unit: '',     delta: 'Terdaftar',       up: true,  icon: SVG.users,   iconBg: 'rgba(96,165,250,0.12)' },
        { label: 'Total Sesi',     value: totalSessions,      unit: ' sesi',delta: 'Sepanjang waktu',  up: true,  icon: SVG.history, iconBg: 'rgba(34,197,94,0.12)'  },
        { label: 'Total Kalori',   value: totalCalories,      unit: ' kcal',delta: 'Semua user',       up: true,  icon: SVG.fire,    iconBg: 'rgba(234,179,8,0.12)'  },
        { label: 'Sesi Hari Ini',  value: todaySessions,      unit: ' sesi',delta: 'Hari ini',         up: todaySessions > 0, icon: SVG.clock, iconBg: 'rgba(168,85,247,0.12)' },
      ]
    },

    muscleStats() {
      const counts = {}
      this.allHistory.forEach(h => {
        const k = h.muscle_group || 'Lainnya'
        counts[k] = (counts[k] || 0) + 1
      })
      return Object.entries(counts)
        .sort((a,b) => b[1]-a[1]).slice(0,6)
        .map(([name, count]) => ({ name, count, color: MUSCLE_COLORS[name] || '#888' }))
    },

    recentActivity() {
      return [...this.allHistory]
        .sort((a,b) => new Date(b.created_at||b.createdAt) - new Date(a.created_at||a.createdAt))
        .slice(0,8)
    },

    // ── Users filter ──
    filteredUsers() {
      const q = this.searchQuery.toLowerCase()
      if (!q) return this.users
      return this.users.filter(u =>
        (u.email||'').toLowerCase().includes(q) ||
        (u.name||'').toLowerCase().includes(q) ||
        String(u.id).includes(q)
      )
    },

    // ── History filter + sort + paginate ──
    filteredHistory() {
      let list = [...this.allHistory]
      const q  = this.searchQuery.toLowerCase()
      if (q) list = list.filter(h =>
        (h.muscle_group||'').toLowerCase().includes(q) ||
        (h.user_email||'').toLowerCase().includes(q) ||
        String(h.id).includes(q)
      )
      if (this.historyFilter.muscle) list = list.filter(h => h.muscle_group === this.historyFilter.muscle)
      const s = this.historyFilter.sort
      if (s === 'newest')        list.sort((a,b) => new Date(b.created_at||b.createdAt) - new Date(a.created_at||a.createdAt))
      else if (s === 'oldest')   list.sort((a,b) => new Date(a.created_at||a.createdAt) - new Date(b.created_at||b.createdAt))
      else if (s === 'calories_desc') list.sort((a,b) => b.calories - a.calories)
      else if (s === 'calories_asc')  list.sort((a,b) => a.calories - b.calories)
      return list
    },
    totalHistoryPages() { return Math.ceil(this.filteredHistory.length / this.historyPerPage) },
    paginatedHistory()  {
      const start = (this.historyPage - 1) * this.historyPerPage
      return this.filteredHistory.slice(start, start + this.historyPerPage)
    },
  },

  watch: {
    activePage() {
      this.searchQuery  = ''
      this.historyPage  = 1
      this.$nextTick(() => { this.renderCharts() })
    },
    filteredHistory() { this.historyPage = 1 },
  },

  async mounted() {
    await this.fetchAll()
  },

  methods: {
    authHeaders() {
      const token = localStorage.getItem('admin_token')
      return token ? { Authorization: `Bearer ${token}` } : {}
    },

    async fetchAll() {
      this.loading = true
      try {
        const [usersRes, histRes] = await Promise.allSettled([
          axios.get(`${API_URL}/api/admin/users`,   { headers: this.authHeaders() }),
          axios.get(`${API_URL}/api/admin/history`, { headers: this.authHeaders() }),
        ])
        if (usersRes.status === 'fulfilled') this.users      = usersRes.value.data || []
        if (histRes.status  === 'fulfilled') this.allHistory = histRes.value.data  || []

        // Update nav badges
        this.navItems[1].badge = this.users.length      || null
        this.navItems[2].badge = this.allHistory.length || null
      } catch (err) {
        console.warn('Fetch error:', err.message)
        this.showToast('Gagal memuat data', 'error')
      } finally {
        this.loading = false
        this.$nextTick(() => this.renderCharts())
      }
    },

    renderCharts() {
      if (this.activePage !== 'stats') return
      this.renderActivityChart()
      this.renderMuscleChart()
    },

    renderActivityChart() {
      const canvas = this.$refs.activityChart
      if (!canvas) return
      if (this.activityChartInst) this.activityChartInst.destroy()

      const now  = new Date()
      const days = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now); d.setDate(now.getDate() - i); days.push(d)
      }
      const labels   = days.map(d => d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }))
      const sessions = days.map(d => this.allHistory.filter(h => new Date(h.created_at||h.createdAt).toDateString() === d.toDateString()).length)
      const calories = days.map(d => Math.round(this.allHistory.filter(h => new Date(h.created_at||h.createdAt).toDateString() === d.toDateString()).reduce((s,h) => s+(h.calories||0), 0)))

      this.activityChartInst = new ChartJS(canvas, {
        data: {
          labels,
          datasets: [
            { type:'bar',  label:'Sesi',   data: sessions, backgroundColor:'rgba(234,179,8,0.2)',  borderColor:'#eab308', borderWidth:1, borderRadius:6, yAxisID:'y'  },
            { type:'line', label:'Kalori', data: calories, borderColor:'#60a5fa', backgroundColor:'transparent', borderWidth:2, pointBackgroundColor:'#60a5fa', pointRadius:4, tension:0.4, yAxisID:'y2' },
          ],
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          interaction:{ mode:'index', intersect:false },
          plugins:{ legend:{ display:false }, tooltip:{ backgroundColor:'#0d1117', borderColor:'rgba(234,179,8,0.3)', borderWidth:1, titleColor:'#eab308', bodyColor:'#fff' } },
          scales: {
            x:  { grid:{ color:'rgba(255,255,255,0.04)' }, ticks:{ color:'rgba(255,255,255,0.4)', font:{size:11} }, border:{color:'rgba(255,255,255,0.08)'} },
            y:  { position:'left',  grid:{ color:'rgba(255,255,255,0.04)' }, ticks:{ color:'rgba(255,255,255,0.4)', font:{size:11}, callback:v=>v+' sesi'   }, border:{color:'rgba(255,255,255,0.08)'} },
            y2: { position:'right', grid:{ display:false },                  ticks:{ color:'rgba(96,165,250,0.7)',  font:{size:11}, callback:v=>v+' kcal'   }, border:{color:'rgba(255,255,255,0.08)'} },
          },
        },
      })
    },

    renderMuscleChart() {
      const canvas = this.$refs.muscleChart
      if (!canvas || !this.muscleStats.length) return
      if (this.muscleChartInst) this.muscleChartInst.destroy()

      this.muscleChartInst = new ChartJS(canvas, {
        type:'doughnut',
        data:{
          labels: this.muscleStats.map(m=>m.name),
          datasets:[{ data: this.muscleStats.map(m=>m.count), backgroundColor: this.muscleStats.map(m=>m.color), borderWidth:0, hoverOffset:4 }],
        },
        options:{
          responsive:true, maintainAspectRatio:false, cutout:'65%',
          plugins:{ legend:{display:false}, tooltip:{ backgroundColor:'#0d1117', borderColor:'rgba(234,179,8,0.3)', borderWidth:1, titleColor:'#eab308', bodyColor:'#fff', callbacks:{label:ctx=>` ${ctx.label}: ${ctx.parsed} sesi`} } },
        },
      })
    },

    confirmDelete(type, item) {
      this.deleteModal = {
        show   : true,
        type,
        item,
        message: type === 'user'
          ? `Hapus user "${item.email || item.name}"? Semua riwayat workout milik user ini juga akan terhapus.`
          : `Hapus sesi workout #${item.id} (${item.muscle_group}, ${Math.round(item.calories)} kcal)?`,
      }
    },

    async executeDelete() {
      const { type, item } = this.deleteModal
      this.deletingId = item.id
      this.deleteModal.show = false
      try {
        const url = type === 'user'
          ? `${API_URL}/api/admin/users/${item.id}`
          : `${API_URL}/api/admin/history/${item.id}`
        await axios.delete(url, { headers: this.authHeaders() })
        if (type === 'user')    this.users      = this.users.filter(u => u.id !== item.id)
        if (type === 'history') this.allHistory = this.allHistory.filter(h => h.id !== item.id)
        this.showToast(`Berhasil dihapus`, 'success')
      } catch (err) {
        this.showToast(err.response?.data?.message || 'Gagal menghapus', 'error')
      } finally {
        this.deletingId = null
      }
    },

    showToast(message, type = 'success') {
      this.toast = { show: true, type, message }
      setTimeout(() => { this.toast.show = false }, 3000)
    },

    handleLogout() {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      this.$emit('logout')
    },

    formatDate(d)     { if (!d) return '—'; return new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' }) },
    formatDateTime(d) { if (!d) return '—'; return new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) },
  },

  beforeUnmount() {
    if (this.activityChartInst) this.activityChartInst.destroy()
    if (this.muscleChartInst)   this.muscleChartInst.destroy()
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }

.admin-wrapper {
  display: flex; min-height: 100vh;
  background: #080a0f; color: #fff;
  font-family: 'Barlow', sans-serif;
  position: relative;
}
.bg-grid {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(234,179,8,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(234,179,8,0.025) 1px, transparent 1px);
  background-size: 40px 40px; pointer-events: none; z-index: 0;
}

/* ── Sidebar ── */
.sidebar {
  width: 240px; min-height: 100vh; flex-shrink: 0;
  background: #0a0c11; border-right: 1px solid rgba(255,255,255,0.06);
  display: flex; flex-direction: column;
  position: sticky; top: 0; height: 100vh;
  transition: width 0.25s ease; z-index: 10;
}
.sidebar.collapsed { width: 68px; }

.sidebar-header {
  display: flex; align-items: center; gap: 10px;
  padding: 20px 18px; border-bottom: 1px solid rgba(255,255,255,0.05);
  min-height: 64px;
}
.brand-icon { font-size: 1.3rem; flex-shrink: 0; }
.brand-name {
  font-family: 'Barlow Condensed', sans-serif; font-size: 1rem;
  font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em;
  white-space: nowrap; overflow: hidden;
}
.brand-suffix { color: #eab308; }
.collapse-btn {
  margin-left: auto; background: none; border: none;
  color: rgba(255,255,255,0.3); cursor: pointer; padding: 4px; flex-shrink: 0;
  transition: color 0.2s;
}
.collapse-btn:hover { color: rgba(255,255,255,0.7); }

.sidebar-nav { flex: 1; padding: 16px 10px; display: flex; flex-direction: column; gap: 4px; }
.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 10px; border-radius: 10px; border: none;
  background: transparent; color: rgba(255,255,255,0.35);
  cursor: pointer; transition: all 0.2s; text-align: left; width: 100%;
  white-space: nowrap; overflow: hidden;
}
.nav-item:hover  { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); }
.nav-item.active { background: rgba(234,179,8,0.12); color: #eab308; }
.nav-icon { display: flex; flex-shrink: 0; }
.nav-label { font-size: 0.85rem; font-weight: 600; }
.nav-badge {
  margin-left: auto; font-size: 0.6rem; font-weight: 700;
  background: rgba(234,179,8,0.15); color: #eab308;
  border: 1px solid rgba(234,179,8,0.25);
  border-radius: 999px; padding: 2px 7px;
}

.sidebar-footer {
  padding: 12px 10px; border-top: 1px solid rgba(255,255,255,0.05);
  display: flex; flex-direction: column; gap: 8px;
}
.admin-info { display: flex; align-items: center; gap: 10px; padding: 6px 4px; }
.admin-avatar {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  background: rgba(234,179,8,0.15); border: 1px solid rgba(234,179,8,0.3);
  color: #eab308; font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700; font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center;
}
.admin-name { font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.7); }
.admin-role { font-size: 0.65rem; color: rgba(255,255,255,0.25); text-transform: uppercase; letter-spacing: 0.08em; }
.logout-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; border-radius: 10px; border: none;
  background: transparent; color: rgba(239,68,68,0.5);
  cursor: pointer; transition: all 0.2s; font-size: 0.85rem; font-weight: 600;
  width: 100%;
}
.logout-btn:hover { background: rgba(239,68,68,0.08); color: #ef4444; }

/* ── Main Content ── */
.main-content {
  flex: 1; display: flex; flex-direction: column;
  position: relative; z-index: 1; min-width: 0;
}

.topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px; height: 64px; border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(10,12,17,0.8); backdrop-filter: blur(8px);
  position: sticky; top: 0; z-index: 5;
}
.topbar-left { display: flex; align-items: baseline; gap: 14px; }
.page-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em;
}
.page-date { font-size: 0.72rem; color: rgba(255,255,255,0.25); }
.topbar-right { display: flex; align-items: center; gap: 12px; }
.search-wrap {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px; padding: 7px 12px; color: rgba(255,255,255,0.3);
  transition: border-color 0.2s;
}
.search-wrap:focus-within { border-color: rgba(234,179,8,0.3); }
.search-wrap input { background: none; border: none; outline: none; color: #fff; font-size: 0.82rem; width: 180px; }
.search-wrap input::placeholder { color: rgba(255,255,255,0.2); }
.topbar-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 6px #22c55e; }

.page-content { padding: 28px 32px 48px; display: flex; flex-direction: column; gap: 20px; }

/* ── Stat Grid ── */
.stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
.stat-card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 20px;
  display: flex; align-items: center; gap: 14px;
  transition: border-color 0.2s, transform 0.2s;
}
.stat-card:hover { border-color: rgba(234,179,8,0.2); transform: translateY(-2px); }
.stat-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-body { display: flex; flex-direction: column; gap: 1px; }
.stat-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); }
.stat-value { font-family: 'Barlow Condensed', sans-serif; font-size: 1.65rem; font-weight: 900; line-height: 1.1; }
.stat-value small { font-size: 0.82rem; opacity: 0.5; margin-left: 2px; }
.stat-delta { font-size: 0.68rem; }
.stat-delta.up  { color: #22c55e; }
.stat-delta.neu { color: rgba(255,255,255,0.3); }

/* ── Card ── */
.card {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; padding: 24px; position: relative; overflow: hidden;
}
.card-bar {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent);
}
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); }
.card-sub   { font-size: 0.7rem; color: rgba(255,255,255,0.25); margin-top: 3px; }
.count-badge { font-size: 0.7rem; font-weight: 700; background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.25); color: #eab308; padding: 3px 10px; border-radius: 999px; }

.charts-row { display: grid; grid-template-columns: 1fr 320px; gap: 20px; }
.wide-card  { }
.chart-wrap { position: relative; width: 100%; height: 240px; }

.muscle-legend { display: flex; flex-direction: column; gap: 7px; margin-top: 16px; }
.ml-item { display: flex; align-items: center; gap: 8px; font-size: 0.76rem; }
.ml-dot  { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }
.ml-name { flex: 1; color: rgba(255,255,255,0.45); }
.ml-val  { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 0.9rem; }

/* ── Table ── */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th { text-align: left; font-size: 0.63rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); padding: 8px 10px; border-bottom: 1px solid rgba(255,255,255,0.06); white-space: nowrap; }
td { padding: 11px 10px; font-size: 0.82rem; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
tr:last-child td { border-bottom: none; }
tr.row-deleting { opacity: 0.4; pointer-events: none; }
.td-muted  { color: rgba(255,255,255,0.35); }
.td-unit   { color: rgba(255,255,255,0.3); font-size: 0.72rem; }
.empty-row { text-align: center; color: rgba(255,255,255,0.2); font-size: 0.85rem; padding: 32px; }

.user-chip   { font-size: 0.72rem; background: rgba(96,165,250,0.08); border: 1px solid rgba(96,165,250,0.2); color: #60a5fa; padding: 3px 8px; border-radius: 6px; }
.muscle-pill { font-size: 0.65rem; padding: 3px 8px; background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.2); border-radius: 999px; color: #eab308; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; }
.count-pill  { font-size: 0.72rem; background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2); color: #22c55e; padding: 3px 8px; border-radius: 6px; }

.btn-danger-sm {
  display: flex; align-items: center; gap: 5px;
  padding: 5px 10px; font-size: 0.72rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.06em;
  background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2);
  border-radius: 6px; color: #ef4444; cursor: pointer; transition: all 0.2s; white-space: nowrap;
}
.btn-danger-sm:hover:not(:disabled) { background: rgba(239,68,68,0.16); border-color: rgba(239,68,68,0.4); }
.btn-danger-sm:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Filter Bar ── */
.filter-bar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.filter-select {
  padding: 9px 14px; background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
  color: rgba(255,255,255,0.6); font-family: 'Barlow', sans-serif; font-size: 0.82rem;
  cursor: pointer; transition: border-color 0.2s; outline: none;
}
.filter-select:focus { border-color: rgba(234,179,8,0.3); }
.filter-count { font-size: 0.72rem; color: rgba(255,255,255,0.25); margin-left: auto; }

/* ── Pagination ── */
.pagination { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); }
.page-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: rgba(255,255,255,0.5); padding: 6px 14px; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
.page-btn:hover:not(:disabled) { border-color: rgba(234,179,8,0.3); color: #eab308; }
.page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.page-info { font-size: 0.78rem; color: rgba(255,255,255,0.35); }

/* ── Modal ── */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.7);
  display: flex; align-items: center; justify-content: center; z-index: 100;
  backdrop-filter: blur(4px);
}
.modal-box {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px; padding: 36px 32px; max-width: 400px; width: 90%;
  text-align: center;
}
.modal-icon  { font-size: 2.5rem; margin-bottom: 16px; }
.modal-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.3rem; font-weight: 900; text-transform: uppercase; margin-bottom: 12px; }
.modal-desc  { font-size: 0.85rem; color: rgba(255,255,255,0.5); line-height: 1.5; margin-bottom: 8px; }
.modal-warning { font-size: 0.75rem; color: rgba(239,68,68,0.6); margin-bottom: 24px; }
.modal-actions { display: flex; gap: 10px; justify-content: center; }
.btn-cancel { padding: 11px 24px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.5); font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; }
.btn-cancel:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); }
.btn-confirm-delete { padding: 11px 24px; background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); border-radius: 10px; color: #ef4444; font-family: 'Barlow Condensed', sans-serif; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; }
.btn-confirm-delete:hover:not(:disabled) { background: rgba(239,68,68,0.25); }
.btn-confirm-delete:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── Toast ── */
.toast {
  position: fixed; bottom: 28px; right: 28px; z-index: 200;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 18px; border-radius: 12px; font-size: 0.82rem; font-weight: 600;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.toast.success { background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3); color: #22c55e; }
.toast.error   { background: rgba(239,68,68,0.15);  border: 1px solid rgba(239,68,68,0.3);  color: #ef4444; }

/* ── Loading ── */
.loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; min-height: 400px; color: rgba(255,255,255,0.35); }
.spinner { width: 36px; height: 36px; border: 3px solid rgba(234,179,8,0.15); border-top-color: #eab308; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.animate-in { opacity: 0; transform: translateY(12px); animation: fadeUp 0.4s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

/* ── Transitions ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.modal-enter-active, .modal-leave-active { transition: all 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from { opacity: 0; transform: translateY(16px); }
.toast-leave-to   { opacity: 0; transform: translateX(20px); }

@media (max-width: 1100px) {
  .stat-grid   { grid-template-columns: repeat(2,1fr); }
  .charts-row  { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .sidebar     { width: 68px; }
  .brand-name, .nav-label, .nav-badge, .admin-meta, .logout-btn span { display: none; }
  .page-content { padding: 20px 16px 40px; }
}
</style>