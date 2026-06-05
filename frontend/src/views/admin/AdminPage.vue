<template>
  <div>
    <AdminLogin v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <AdminPanel v-else @logout="handleLogout" />
  </div>
</template>

<script>
import AdminLogin from '../../components/admin/AdminLogin.vue'
import AdminPanel from '../../components/admin/AdminPanel.vue'

export default {
  name: 'AdminPage',
  components: { AdminLogin, AdminPanel },

  data() {
    return {
      isLoggedIn: !!localStorage.getItem('admin_token'),
    }
  },

  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true
    },
    handleLogout() {
      this.isLoggedIn = false
    },
  },
}
</script>