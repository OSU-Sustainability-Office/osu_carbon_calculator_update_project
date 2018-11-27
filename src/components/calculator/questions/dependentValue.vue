<template>

  <!-- draw a value question if the question should be visible -->
  <value v-if="showQuestion" v-bind:questionData="questionData" v-bind:index="index" />

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
    showQuestion () {
      const parentQuestion = this.$store.getters['calculator/categories'][this.categoryID].questions[this.questionData.trigger.parentQuestion]

      // Return true if the trigger value matches the parent's value, or return true if the trigger value is 'any' and the parent's value is not the default
      return (parentQuestion.value === this.questionData.trigger.triggerValue) || (this.questionData.trigger.triggerValue === 'any' && parentQuestion.value !== parentQuestion.input.values[0].val)
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
