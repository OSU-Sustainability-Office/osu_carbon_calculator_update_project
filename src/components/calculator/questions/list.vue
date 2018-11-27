<template>
<div class="question">

  {{questionData.text}} <br />

  <el-select v-model="questionData.value" placeholder="Select One">
    <el-option v-for="choice in questionData.input.values" :key="choice.val" :label="choice.val" :value="choice.val" :coef="choice.coef" />
  </el-select>


</div>
</template>

<script>
export default {
  name: 'list',
  props: {
    'questionData': Object,
    'index': Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
