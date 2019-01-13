<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: index.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-13T12:22:03-08:00
@Copyright: 2018 Oregon State University
-->

<template>

  <!-- This div only exists to satisfy VueJS's 1 root element requirement -->
  <div id="calculator">

    <!-- The part at the top that says OSU Carbon Calculator -->
    <el-row>
      <logo></logo>
    </el-row>

    <!-- The actual calculator -->
    <el-row>
      <calcCarousel></calcCarousel>
      <historicalDataDialog></historicalDataDialog>
    </el-row>

  </div>

</template>

<script>
import logo from '@/components/calculator/logo'
import calcCarousel from '@/components/calculator/calcCarousel'
import historicalDataDialog from '@/components/administration/historicalDataDialog'

export default {
  name: 'index',
  components: {
    logo,
    calcCarousel,
    historicalDataDialog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
