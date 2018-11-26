<template>

  <el-form ref="form" :model="form" label-width="120px" v-display="questionData.visible">
    {{questionData.text}} <br />
    blah
    <el-select placeholder="Select One">
      <el-option
        v-for="(choice, index) in questionData.input.values"
        :key="index"
        :label="choice.val"
        :value="choice.val"
        :coef="choice.coef">
      </el-option>
    </el-select>

  </el-form>

</template>

<script>

export default {
  name: 'list',
  props: ['questionData']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
