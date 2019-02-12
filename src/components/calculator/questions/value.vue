<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: value.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-11T15:15:54-08:00
@Copyright: 2018 Oregon State University
-->

<template>

  <div class="question">

    {{questionData.text}} <br />

    <unitInput :unit="questionData.input.units.unit" :prefix="questionData.input.units.prefix" v-model="questionData.value" @change="updateQuestionValue" :min="0" />

  </div>

</template>

<script>
import unitInput from '@/components/calculator/questions/numericalUnitInput'
export default {
  name: 'value',
  components: {
    unitInput
  },
  props: {
    'questionData': Object,
    'index': Number,
    'categoryID': Number
  },
  created () {
    // Checks the vuex store for a value. If one is already present, load that value.
    this.questionData.value = this.questionData.value
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
