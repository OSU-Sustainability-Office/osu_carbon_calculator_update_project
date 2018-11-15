<template>
  <div id="app">
    <el-container>

      <el-header>
        <navbar></navbar>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>

      <el-button @click="visible = true">Button</el-button>
      <el-dialog :visible.sync="visible" title="Hello world">
        <p>Try Element</p>
      </el-dialog>

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
  data: function() {
    return {visible: false}
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
.pageTo-enter-active, .pageTo-leave-active {
  transition-property: opacity, transform;
  transition-duration: 1s;
}
.pageTo-enter {
  transform: scale(0.75);
  position: absolute;
  overflow: visible;
}
.pageTo-leave-active {
  transform: scale(2);
}
.pageTo-enter, .pageTo-leave-active {
  opacity: 0;

}
.pageFrom-enter-active, .pageFrom-leave-active {
  transition-property: opacity, transform;
  transition-duration: 1s;
}
.pageFrom-enter {
  transform: scale(2);
  position: absolute;
  overflow: visible;
}
.pageFrom-leave-active {
  transform: scale(0.75);
}
.pageFrom-enter, .pageFrom-leave-active {
  opacity: 0;

}
</style>
<style scoped lang='scss'>
@import '@/assets/style-variables.scss';

.app {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
}
.header {
  margin: 0;
  padding: 0;
  height: $--nav-height;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.main {
  position: absolute;
  top: $--nav-height;
  left: 0;
  min-height: calc(100% - #{$--nav-height});
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
