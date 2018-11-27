<template>

  <div class="question">

    {{questionData.text}} <br />

    <el-input-number v-model="questionData.value" @change="updateQuestionValue" :min="0" />

  </div>

</template>

<script>
export default {
  name: 'value',
  props: {
    'questionData': Object,
    'index': Number,
    'categoryID': Number
  },
  created () {
    this.questionData.value = 0
    this.$store.commit({
      type: 'calculator/updateQuestionValue',
      categoryID: this.categoryID,
      questionIndex: this.index,
      value: this.questionData.value
    })
  },
  methods: {
    updateQuestionValue () {
      this.$store.commit({
        type: 'calculator/updateQuestionValue',
        categoryID: this.categoryID,
        questionIndex: this.index,
        value: this.questionData.value
      })
    }
  },
  data () {
    return {
      num: '1'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
