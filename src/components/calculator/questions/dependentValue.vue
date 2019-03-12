<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Email:  jackrwoods@gmail.com
@Filename: dependentValue.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-03-12T10:31:08-07:00
@Copyright: 2019 Oregon State University
-->

<template>

  <!-- draw a value question if the question should be visible -->
  <value v-show="showQuestion" v-bind:questionData="questionDataWithMeta" v-bind:index="index" v-bind:categoryID="categoryID" />

</template>

<script>
import value from '@/components/calculator/questions/value'

export default {
  name: 'dependentValue',
  props: {
    'questionData': Object,
    'index': Number,
    'categoryID': Number
  },
  computed: {
    parentQuestion () {
      return this.$store.state.calculator.categories[this.categoryID].questions[this.questionData.trigger.parentQuestion]
    },
    showQuestion () {
      // Return true if the trigger value matches the parent's value, or return true if the trigger value is 'any' and the parent's value is not the default
      return (this.triggerValue === 'any' && this.parentQuestion.value !== this.parentQuestion.input.values[0].val) || (this.parentQuestion.value === this.triggerValue)
    },
    questionDataWithMeta () {
      let questionData = this.questionData
      this.$set(questionData, 'metaData', this.parentQuestion.metaData)
      return questionData
    }
  },
  data () {
    return {
      triggerValue: this.questionData.trigger.triggerValue
    }
  },
  components: {
    value
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
