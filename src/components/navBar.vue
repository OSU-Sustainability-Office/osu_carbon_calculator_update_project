<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">Processing Center</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'navbar',
  created () {
    // Update user variables (if logged in)
    this.$store.dispatch('user/setUserVars').then(() => {
      console.log('done')
    })
  },
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
</style>
