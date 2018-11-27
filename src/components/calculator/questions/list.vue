<template>
<div class="question">

  {{questionData.text}} <br />

  <el-select v-model="questionData.value" @change="updateQuestionValue" placeholder="Select One">
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
  },
  created () {
    this.questionData.value = this.questionData.input.values[0].val
    this.$store.commit('calculator/updateQuestionValue', this.categoryID, this.index, this.questionData.value)
  },
  methods: {
    updateQuestionValue () {
      this.$store.commit('calculator/updateQuestionValue', this.categoryID, this.index, this.questionData.value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
