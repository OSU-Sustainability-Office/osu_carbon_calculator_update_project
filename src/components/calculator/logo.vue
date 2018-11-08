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
}
.jumbotron_text_bottom {
  background-color: #000000;
  color: #DC4405;
  text-align: left;
}
</style>
