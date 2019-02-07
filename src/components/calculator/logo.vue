<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: logo.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-05T12:30:57-08:00
@Copyright: 2018 Oregon State University
-->

<template>

  <el-row id="logo">
    <el-col :span="24">
      <div class="jumbotron_text_top">
        <h1>OREGON STATE UNIVERSITY</h1>
      </div>
      <div class="jumbotron_text_bottom">
        <h1>CARBON CALCULATOR</h1>
      </div>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'logo'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron_text_top {
  position: absolute;

  top: 0px;
  left: 0px;
  width: 45vw;
  z-index: 999;
  background-color: #FF4E00;
  color: #000000;
  text-align: right;
  font-family: 'StratumNo2';
  height: 8vh;
  padding-right: 8vw;
  -webkit-clip-path: polygon(0 0, 90% 0, 100% 100%, 0 100%);
  clip-path: polygon(0 0, 90% 0, 100% 100%, 0 100%);
}
.jumbotron_text_bottom {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #000000;
  color: #FF4E00;
  text-align: left;
  padding-left: 55vw;
  font-family: 'StratumNo2';
  height: 8vh;
}
h1 {
  padding: 0px;
  margin: 0px;
  font-size: 8vh;
}
#logo {
  height: 8vh;
}
</style>
