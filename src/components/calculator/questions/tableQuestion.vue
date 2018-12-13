<template>
<div class="question" v-if="showQuestion">

  {{questionData.text}} <br />

  <el-table v-loading="loading" :data="tableData" stripe border>
    <el-table-column v-for="(column, index) in this.questionData.input.values[0]" :key="index" :prop="column" :label="column">

      <template slot-scope="scope">
        <editableCell :show-input="tableData[scope.$index][index]" v-model="questionData.input.values[scope.$index][index]">
          <span slot="content">{{questionData.input.values[scope.$index][index]}}</span>
        </editableCell>
      </template>

    </el-table-column>
  </el-table>

  <!-- <el-input-number v-model="questionData.value" @change="updateQuestionValue" :min="0" /> -->

</div>
</template>

<script>
// NOTE: Special thanks to reddit user u/CristiJ for the editable ElementUI table
// source code. Available: https://www.reddit.com/r/vuejs/comments/842g5c/inline_editable_table_with_elementui/
// The code in this project has been edited significantly, but I felt that credit
// was due. -JW
import editableCell from '@/components/calculator/questions/editableCell'

export default {
  name: 'tableQuestion',
  props: {
    'questionData': Object,
    'index': Number,
    'categoryID': Number
  },
  components: {
    editableCell
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
        rowObj[index] = false // Initialize each cell in the table to be non-editable.
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
    },
    setEditMode (row, index) {
      this.tableData[row][index] = true
    },
    saveRow (row, index) {
      this.tableData[row][index] = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
