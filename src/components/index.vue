<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: index.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-05T16:05:54-08:00
@Copyright: 2018 Oregon State University
-->

<template>

  <!-- This div only exists to satisfy VueJS's 1 root element requirement -->
  <div id="calculator">

    <!-- The actual calculator -->
    <el-row>
      <calcMobile v-if="isMobile" />
      <calcDesktop v-else />
      <historicalDataDialog />
    </el-row>

  </div>

</template>

<script>
import calcDesktop from '@/components/calculator/calcDesktop'
import calcMobile from '@/components/calculator/calcMobile'
import historicalDataDialog from '@/components/administration/historicalDataDialog'

export default {
  name: 'index',
  components: {
    calcDesktop,
    calcMobile,
    historicalDataDialog
  },
  computed: {
    isMobile () {
      // Shout out to https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
      // eslint-disable-next-line
      return true// (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)
    }
  }
}
</script>
<style>
h1 {
  padding: 0em;
  margin: 0;
  font-family: 'StratumNo2';
  font-size: 6vh;
}
</style>
