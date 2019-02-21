<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: navBar.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-21T11:43:59-08:00
@Copyright: 2018 Oregon State University
-->

<template>
  <el-row id="navbar">
    <el-col v-if="!mobileWidth" class="centered" :span="4">
      <svgLogo class="logo" />
    </el-col>
    <el-col class="centered" :span="16">
      <h1>Carbon Calculator</h1>
    </el-col>
    <el-col class="centered" :span="4" v-if="loggedIn">
      <el-dropdown @command="handleClick">
        <span class="button">
          My Account
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="3-1">Historical Data</el-dropdown-item>
          <el-dropdown-item command="3-2">Energy Dashboard</el-dropdown-item>
          <el-dropdown-item command="3-4">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col class="centered" :span="4" v-else>
      <span class="button" @click="handleClick('2')">Sign In</span>
    </el-col>
  </el-row>
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
  props: {
    mobileWidth: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters['user/isLoggedIn']
    }
  },
  methods: {
    handleClick (key) {
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
@import '@/assets/element-variables.scss';

// Mobile devices
$screen-xs-min: 360px;

// Small tablets and large smartphones (landscape view)
$screen-sm-min: 576px;

// Small tablets (portrait view)
$screen-md-min: 768px;

// Tablets and small desktops
$screen-lg-min: 992px;

// Large tablets and desktops
$screen-xl-min: 1200px;

@media only screen and (max-width: $screen-md-min) {
  h1 {
    font-size: 6vw;
  }
  .logo {
    height: 5vw;
  }
  .button {
    font-size: 3vw !important;
  }
}

.button {
  color: $--color-white;
  display: inline-block;
  font-size: 2vw;
  line-height: 10vh;
  transition: $--all-transition;
}
.button:hover {
  border-bottom: 2px solid #000;
  color: $--color-black;
  cursor: pointer;
}
.button .active {
  background-color: $--color-selected;
}
.centered {
  text-align: center;
}
.logo {
  height: 9.5vh;
  margin: 0.5vh;
}
h1 {
  line-height: 10vh;
}
#navbar {
  background-color: $--color-primary;
  color: $--color-white;
  height: 10vh;
}
</style>
