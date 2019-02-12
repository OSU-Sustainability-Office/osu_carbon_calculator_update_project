<!--
@Author: Jack Woods
@Date:   2018-12-13T09:48:35-08:00
@Email:  jackrwoods@gmail.com
@Filename: tableQuestion.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-12T14:12:21-08:00
-->

<template>
<div class="question" v-if="showQuestion">

  {{questionData.text}} <br />

  <el-table v-loading="loading" :data="tableData" stripe border>
    <el-table-column v-for="(column, index) in this.questionData.input.values[0]" :key="index" :prop="column" :label="column">

      <template slot-scope="scope">
        <editableCell @change="updateQuestionValue" v-model="questionData.input.values[scope.$index + 1][index]">
          <span slot="content">{{ questionData.input.values[scope.$index + 1][index] }}</span>
        </editableCell>
      </template>

    </el-table-column>
  </el-table>

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
    // Dynamically build JSON object from 2D array to fit ElementUI specifications
    // JSON object data is stored in the first row of values
    this.questionData.input.values.forEach((row, index) => {
      let rowObj = {}
      row.forEach((data, index) => {
        // Create a property with variable title and assign data to it
        // 0 is the first row of the data array, which contains column titles.
        // [index] refers to the title that corresponds with this data point
        rowObj[this.questionData.input.values[0][index]] = data
        rowObj[index] = false // Initialize each cell in the table to be non-editable.
      })

      // Add this row to tableData
      if (index !== 0) {
        this.tableData.push(rowObj)
      }
    })

    // Disable the loading animation (enabled when component is rendered)
    this.loading = false
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
      // Convert strings to integers
      let values = []
      this.questionData.input.values.forEach((row, x) => {
        let newRow = []
        row.forEach((cell, y) => {
          newRow.push(parseInt(this.questionData.input.values[x][y]))
        })
        values.push(newRow)
      })

      let total = 0 // This will sum each entry in coefRow once it's multiplied by the primary column

      // Before commiting to the VueX store, multiply/sum each value in the table
      values.slice(1).forEach(row => {
        let primaryColVal = row[parseInt(this.questionData.input.primaryColumn)]
        let quantityColVal = row[parseInt(this.questionData.input.quantityColumn)]

        // Multiply each quantity by its coefficient
        let coefRow = row.slice(0)
        this.questionData.input.coefficients.forEach((c, index) => {
          if (index === this.questionData.input.quantityColumn) coefRow[index] = 0 //
          else coefRow[index] *= c
        })

        // Multiply each value in coefRow by the primary column
        this.questionData.input.sumColumns.forEach(index => {
          total += coefRow[index] * primaryColVal * quantityColVal
        })

        // Save result
        this.questionData.value = total * this.questionData.input.coefficient
      })

      // Update VueX Store
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
