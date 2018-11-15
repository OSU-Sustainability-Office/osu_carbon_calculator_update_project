<template>

  <!-- This div only exists to satisfy VueJS's 1 root element requirement -->
  <div id="calculator">

    <!-- The part at the top that says OSU Carbon Calculator -->
    <el-row>
      <logo></logo>
    </el-row>

    <!-- A paragraph containing meta information -->
    <el-row>
      <introText></introText>
    </el-row>

    <!-- The actual calculator -->
    <el-row>
      <calcAccordion></calcAccordion>
    </el-row>

  </div>

</template>

<script>
import logo from '@/components/calculator/logo'
import introText from '@/components/calculator/introText'
import calcAccordion from '@/components/calculator/calcAccordion'

export default {
  name: 'index',
  components: {
    logo,
    introText,
    calcAccordion
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
