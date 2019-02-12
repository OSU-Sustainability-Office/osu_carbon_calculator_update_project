<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: list.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-12T13:52:36-08:00
@Copyright: 2018 Oregon State University
-->

<template>
<div class="question">

  {{questionData.text}} <br />

  <el-switch v-if="questionData.input.values.length <= 2" v-model="answer" @change="updateQuestionValue" :active-text="questionData.input.values[1].val" :inactive-text="questionData.input.values[0].val"></el-switch>

  <el-select v-if="questionData.input.values.length > 2" v-model="value" @change="updateQuestionValue" placeholder="Select One">
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
      value: '',
      answer: false
    }
  },
  created () {
    if (this.questionData.value !== 0) {
      this.value = this.questionData.value
    } else {
      this.value = this.questionData.input.values[0].val
    }

    // Update VueX for switch type
    this.$store.commit({
      type: 'calculator/updateQuestionValue',
      categoryID: this.categoryID,
      questionIndex: this.index,
      value: this.answer ? this.questionData.input.values[1].val : this.questionData.input.values[0].val
    })
  },
  methods: {
    updateQuestionValue () {
      // Update VueX for list type
      if (this.questionData.input.values.length > 2) {
        this.$store.commit({
          type: 'calculator/updateQuestionValue',
          categoryID: this.categoryID,
          questionIndex: this.index,
          value: this.value
        })
      } else {
        // Update VueX for switch type
        this.$store.commit({
          type: 'calculator/updateQuestionValue',
          categoryID: this.categoryID,
          questionIndex: this.index,
          value: this.answer ? this.questionData.input.values[1].val : this.questionData.input.values[0].val
        })
        this.value = this.answer ? this.questionData.input.values[1].val : this.questionData.input.values[0].val
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-select {
  display: inline-table;
  width: 100%;
}
</style>
