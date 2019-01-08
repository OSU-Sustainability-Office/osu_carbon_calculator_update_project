<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: navBar.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-07T15:33:53-08:00
@Copyright: 2018 Oregon State University
-->

<template>
<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
  <el-menu-item index="0"><svgLogo class="logo"/>
  </el-menu-item>
  <el-menu-item index="1">Home
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
      logoutLink: 'https://api.sustainability.oregonstate.edu/auth/logoutRedirect',
      officeHomepageLink: 'http://sustainability.oregonstate.edu/',
      dashboardLink: 'https://dashboard.sustainability.oregonstate.edu/'
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
        case '0':
          window.location = this.officeHomepageLink
          break
        case '1':
          this.router.go('#')
          break
        case '2':
          window.location = this.loginLink
          break
        case '3-1':
          this.$store.commit('ui/toggleHistoricalDataDialog')
          break
        case '3-2':
          window.location = this.dashboardLink
          break
        case '3-4':
          window.location = this.logoutLink
          this.$store.commit('user/logout')
          break
        default:
          break
      }
    }
  },
  components: {
    svgLogo
  }
}
</script>

<style scoped lang='scss'>
.logo {
  height: 4em;
}
</style>
