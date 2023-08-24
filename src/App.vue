<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:58-08:00
@Filename: App.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-12T14:41:07-08:00
@Copyright: 2018 Oregon State University
-->

<template>
  <div id="app">
    <el-container>
      <el-header height="10vh">
        <navbar :mobileWidth="mobileWidth"></navbar>
      </el-header>

      <el-main>
        <router-view :mobileWidth="mobileWidth" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navbar from '@/components/navBar'

export default {
  name: 'App',
  components: {
    navbar
  },
  created () {
    // Update user variables (if logged in)
    this.$store.dispatch('user/setUserVars')

    // Download the cc categories and questions
    this.$store.dispatch('calculator/downloadCategories')
  },
  data () {
    return {
      mobileWidth: window.innerWidth < 760
    }
  },
  mounted () {
    window.onresize = () => {
      this.mobileWidth = window.innerWidth < 760
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/element-variables.scss";
@import "@/assets/theme-chalk-custom/src/index.scss";

@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@font-face {
  font-family: "StratumNo2";
  src:
    url("/static/fonts/StratumNo2-Bold.woff2") format("woff2"),
    url("/static/fonts/StratumNo2-Bold.woff") format("woff"),
    url("/static/fonts/StratumNo2-Bold.ttf") format("truetype"),
    url("/static/fonts/StratumNo2-Bold.svg#StratumNo2-Bold") format("svg");
  font-weight: bold;
  font-style: normal;
}
body {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}
</style>
