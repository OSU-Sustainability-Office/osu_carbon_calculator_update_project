<template>
<div class="question" v-if="showQuestion">

  {{questionData.text}} <br />

  <el-table v-loading="loading" :data="tableData" stripe border>
    <el-table-column v-for="(column, index) in this.questionData.input.values[0]" :key="index" :prop="column" :label="column" />
  </el-table>

  <!-- <el-input-number v-model="questionData.value" @change="updateQuestionValue" :min="0" /> -->

</div>
</template>

<script>
export default {
  name: 'tableQuestion',
  props: {
    'questionData': Object,
    'index': Number,
    'categoryID': Number
  },
  created () {
    // Overwrite default data in vuex store
    this.questionData.value = 0
    this.$store.commit({
      type: 'calculator/updateQuestionValue',
      categoryID: this.categoryID,
      questionIndex: this.index,
      value: this.questionData.value
    })

    // Dynamically build JSON object from 2D array to fit ElementUI specifications
    // JSON object data is stored in the first row of values
    this.questionData.input.values.slice(1).forEach(row => {
      let rowObj = {}
      row.forEach((data, index) => {
        // Create a property with variable title and assign data to it
        // 0 is the first row of the data array, which contains column titles.
        // [index] refers to the title that corresponds with this data point
        rowObj[this.questionData.input.values[0][index]] = data
      })

      // Add this row to tableData
      this.tableData.push(rowObj)

      // Disable the loading animation (enabled when component is rendered)
      this.loading = false
    })
  },
  computed: {
    parentQuestion () {
      return this.$store.state.calculator.categories[this.categoryID].questions[this.questionData.trigger.parentQuestion]
    },
    showQuestion () {
      // Return true if the trigger value matches the parent's value, or return true if the trigger value is 'any' and the parent's value is not the default
      return (this.triggerValue === 'any' && this.parentQuestion.value !== this.parentQuestion.input.values[0].val) || (this.parentQuestion.value === this.triggerValue)
    }
  },
  data () {
    return {
      triggerValue: this.questionData.trigger.triggerValue,
      tableData: [],
      loading: true
    }
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
