<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: logo.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-13T11:05:01-08:00
@Copyright: 2018 Oregon State University
-->

<template>

  <el-col :span="24">
    <div class="jumbotron_text_top">
      <h1>OREGON STATE UNIVERSITY</h1>
    </div>

    <div class="jumbotron_text_bottom">
      <h1>CARBON CALCULATOR</h1>
    </div>
  </el-col>

</template>

<script>
export default {
  name: 'logo'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron_text_top {
  background-color: #DC4405;
  color: #000000;
  text-align: right;
  font-family: 'StratumNo2';
}
.jumbotron_text_bottom {
  background-color: #000000;
  color: #DC4405;
  text-align: left;
  font-family: 'StratumNo2';
}
h1 {
  padding: 0px;
  margin: 0px;
  font-size: 3em;
}
</style>
