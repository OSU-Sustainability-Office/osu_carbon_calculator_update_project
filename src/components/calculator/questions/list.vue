<template>
<div class="question">

  {{questionData.text}} <br />

  <el-select v-model="value" @change="updateQuestionValue" placeholder="Select One">
    <el-option v-for="choice in questionData.input.values" :key="choice.val" :label="choice.val" :value="choice.val" :coef="choice.coef" />
  </el-select>

</div>
</template>

<script>
export default {
  name: 'list',
  props: {
    'questionData': Object,
    'index': Number,
    'categoryID': Number
  },
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.value = this.questionData.input.values[0].val
    this.$store.commit({
      type: 'calculator/updateQuestionValue',
      categoryID: this.categoryID,
      questionIndex: this.index,
      value: this.value
    })
  },
  methods: {
    updateQuestionValue () {
      this.$store.commit({
        type: 'calculator/updateQuestionValue',
        categoryID: this.categoryID,
        questionIndex: this.index,
        value: this.value
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
