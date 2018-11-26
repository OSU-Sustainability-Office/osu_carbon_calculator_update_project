<template>

  <div class="question">

    {{questionData.text}} <br />

    <el-select v-model="value" placeholder="Select One">
      <el-option
        v-for="choice in questionData.input.values"
        :key="choice.val"
        :label="choice.val"
        :value="choice.val"
        :coef="choice.coef">
      </el-option>
    </el-select>

  </div>

</template>

<script>
export default {
  name: 'list',
  props: {
    'questionData': Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
