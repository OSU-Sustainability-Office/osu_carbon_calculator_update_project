<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:58-08:00
@Filename: App.vue
@Last modified by:   Jack Woods
@Last modified time: 2018-12-19T10:08:11-08:00
@Copyright: 2018 Oregon State University
-->

<template>
  <div id="app">
    <el-container>

      <el-header>
        <navbar></navbar>
      </el-header>

      <el-main>
        <router-view/>
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
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@font-face {
    font-family: 'StratumNo2';
    src: url('/static/fonts/StratumNo2-Bold.woff2') format('woff2'),
        url('/static/fonts/StratumNo2-Bold.woff') format('woff'),
        url('/static/fonts/StratumNo2-Bold.ttf') format('truetype'),
        url('/static/fonts/StratumNo2-Bold.svg#StratumNo2-Bold') format('svg');
    font-weight: bold;
    font-style: normal;
}
body {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style scoped lang='scss'>
</style>
