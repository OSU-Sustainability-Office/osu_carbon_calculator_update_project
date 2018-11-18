<template>
<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1"><svgLogo class="logo"/>
  </el-menu-item>
  <el-menu-item v-if="loggedOut" index="2">Login</el-menu-item>
  <el-submenu v-else index="3">
    <template slot="title">My Account</template>
    <el-menu-item index="3-1">Historical Data</el-menu-item>
    <el-menu-item index="3-2">Energy Dashboard</el-menu-item>
    <el-menu-item v-if="administrator" index="3-3">Edit Calculator</el-menu-item>
    <el-menu-item index="3-4">Logout</el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
import svgLogo from '../../public/static/images/logo.svg'

export default {
  name: 'navbar',
  data () {
    return {
      activeIndex: '1',
      administrator: this.$store.getters['user/administrator'],
      loginLink: 'https://api.sustainability.oregonstate.edu/auth/login?returnURI=' + window.location,
      logoutLink: 'https://api.sustainability.oregonstate.edu/auth/logoutRedirect'
    }
  },
  computed: {
    loggedOut () {
      return !this.$store.getters['user/isLoggedIn']
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      switch (key) {
        case '2':
          window.location = this.loginLink
          break
        case '3-4':
          window.location = this.logoutLink
          this.$store.commit('user/logout')
          break
        default:
          console.log('blah')
          break
      }
    }
  },
  components: {
    svgLogo
  }
}
</script>

<style scoped>
.logo {
  height: 50px;
}
</style>
