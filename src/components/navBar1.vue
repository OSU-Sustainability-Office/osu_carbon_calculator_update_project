<!--
@Author: Jack Woods, GitHub user JeffMinsungKim
@Date:   2019-02-05T15:52:28-08:00
@Email:  jackrwoods@gmail.com
@Filename: index.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-07T15:49:12-08:00
-->

<template>
  <div class="navWrapper">
    <div id="menu" :class="{ active: isActive }">
      <el-menu mode="horizontal" @select="handleSelect" :router="true">
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
    </div>
    <div id="toggle" @click="select()">
      <div class="span" id="top" :class="{ active: isActive }"></div>
      <div class="span" id="middle" :class="{ active: isActive }"></div>
      <div class="span" id="bottom" :class="{ active: isActive }"></div>
    </div>
  </div>
</template>

<script>
import svgLogo from '../../public/static/images/logo.svg'

export default {
  components: {
    svgLogo
  },

  data () {
    return {
      activeIndex: '1',
      administrator: this.$store.getters['user/administrator'],
      loginLink: 'https://api.sustainability.oregonstate.edu/auth/login?returnURI=' + window.location,
      logoutLink: 'https://api.sustainability.oregonstate.edu/auth/logoutRedirect',
      officeHomepageLink: 'http://sustainability.oregonstate.edu/',
      dashboardLink: 'https://dashboard.sustainability.oregonstate.edu/',
      isActive: false
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
    },
    select: function () {
      this.isActive = !this.isActive
    }
  }
}
</script>
<style lang='scss'>
$nav-toggle-color: #0E5FC2;
$primary-color: #21CF5F;

/* BreakPoints */

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

.el-menu-item {
  padding: 5px 35px;
}

@mixin sm-menu {
  .el-menu--horizontal .el-menu-item {
    text-align: center;
    float: none;
    display: block;
    height: 100%;
    width: 100%;
    border-top: 1px solid #EAEAEB;
    font-size: 18px;
  }
}

.logo-header {
  padding-left: 15px;
  padding-right: 50px;
  z-index: 100;
}

.navWrapper {
  width: 100%;
  position: fixed;
  top: 0;
}

#logo.el-menu-item.is-active {
  border-bottom-color: transparent;
}

#toggle {
  position: absolute;
  right: 20px;
  top: 14px;
  z-index: 999;
  width: 40px;
  height: 40px;
  cursor: pointer;
  float: right;
  transition: all .3s ease-out;
  visibility: hidden;
  opacity: 0;
}

#toggle .span {
  border-radius: 10px;
  background: $nav-toggle-color;
  transition: all 0.3s ease-out;
  backface-visibility: hidden;
}

#top.span.active {
  transform: rotate(45deg) translateX(3px) translateY(5px);
}

#middle.span.active {
  opacity: 0;
}

#bottom.span.active {
  transform: rotate(-45deg) translateX(8px) translateY(-10px);
}

@media only screen and (max-width: $screen-md-min) {

  .logo-header {
    padding: 0;
  }

  #toggle {
    visibility: visible;
    opacity: 1;
    margin-top: 6px;
  }

  #toggle .span {
    height: 4px;
    margin: 5px 0;
    transition: all .3s ease-out;
    backface-visibility: visible;
    visibility: visible;
    opacity: 1;
  }

  #menu .el-menu-item {
    display: none;
  }

  #menu.active {
    margin: 70px 0;
    visibility: visible;
    opacity: 0.98;
    transition: all .5s ease-out;

    @include sm-menu;
  }
}
</style>
