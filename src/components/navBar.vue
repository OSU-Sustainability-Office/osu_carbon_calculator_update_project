<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">Oregon State University Sustainability Office</el-menu-item>
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
      console.log(key)
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
  }
}
</script>

<style>
</style>
