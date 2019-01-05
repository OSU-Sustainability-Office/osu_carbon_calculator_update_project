<!--
@Author: Jack Woods <jackrwoods>
@Date:   2018-12-12T12:28:53-08:00
@Filename: graph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-05T12:32:42-08:00
@Copyright: 2018 Oregon State University
-->

<template>

<div class="chartContainer">
  <el-row :gutter="20">
    <el-col :span="avgSpan">
      <h3 class="centered">US Average:</h3>
      <pie-chart :dataObj="usAvgDataObj"/>
    </el-col>
    <el-col :span="resultSpan">
      <h3 class="centered">Your Result:</h3>
      <pie-chart :dataObj="dataObj"/>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="24">
      <h3> Historical Data </h3>
      <el-carousel type="card" trigger="click" height="30em" :autoplay="false" :loop="false">
        <el-carousel-item v-for="(entry, index) in historicalData" :key="index">
          <h3>{{ entry.date }}</h3>
          <bar-chart :dataObj="entry" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>

</div>

</template>

<script>
import UserApi from '@/utils/api/user.js' // For uploading user data
import barChart from '@/components/calculator/graphs/chartComponents/barChart'
import pieChart from '@/components/calculator/graphs/chartComponents/pieChart'

export default {
  name: 'chartContainer',
  components: {
    barChart,
    pieChart
  },
  data () {
    return {
      usAvgDataObj: {
        totals: [4808.4, 4979.9, 3692.1, 2404.2, 515.2]
      }
    }
  },
  computed: {
    categories () { return this.$store.getters['calculator/categories'] },
    historicalData () { return this.$store.getters['user/data'] },
    // Adds up the totals for each question and returns an array of category totals
    totals () {
      // Empty array of category totals (in order)
      let totals = []

      this.categories.forEach(category => {
        let total = 0
        category.questions.forEach(question => {
          // Multiply this value by parent question's coefficient
          // eslint-disable-next-line
          if (question.input.type == 'dependentValue') {
            let triggerValue = question.trigger.triggerValue
            let parentQuestion = category.questions[question.trigger.parentQuestion]

            // Check if the parent question has the correct value, activating 'question'
            let valueMap = null
            let location = null
            // eslint-disable-next-line
            if (triggerValue == parentQuestion.value) {
              // Find the location of the correct coefficient in parentQuestion's value list by mapping and linear searching array
              valueMap = parentQuestion.input.values.map(obj => obj.val)
              location = valueMap.indexOf(triggerValue)
            } else { // if (triggerValue == 'any')
              // Find the location of the correct coefficient in parentQuestion's value list by mapping and linear searching array
              valueMap = parentQuestion.input.values.map(obj => obj.val)
              location = valueMap.indexOf(parentQuestion.value)
            }

            // Add to the total for this category
            // If the parentQuestion has a 0 coefficient, the child question has the coefficient
            if (parentQuestion.input.values[location].coef === 0) {
              // Multiply the current question's value to the parent question's coefficient
              total += question.value * question.input.values[0].coef
            } else {
              // Multiply the current question's value to the parent question's coefficient
              if (!isNaN(question.value) && !isNaN(parentQuestion.input.values[location].coef)) total += question.value * parentQuestion.input.values[location].coef
            }

            // eslint-disable-next-line
          } else if (question.input.type == 'value') {
            total += question.value * question.input.values[0].coef
            // eslint-disable-next-line
          } else if (question.input.type == 'tableQuestion') {
            total += question.value
          }
        })

        totals.push(total)
      })

      return totals
    },
    dataObj () {
      let totals = this.totals

      // Trigger data upload when data changes
      if (this.$store.getters['user/isLoggedIn']) this.uploadTotals()

      return { totals }
    },
    isIncomplete () {
      // Returns true if no data has been entered into the calculator
      let incomplete = true

      this.totals.forEach(t => {
        if (t !== 0) incomplete = false
      })

      return incomplete
    },
    avgSpan () {
      // Always show the Us average, but make room for user's results if the
      // data has been entered into the calculator
      return this.isIncomplete ? 24 : 12
    },
    resultSpan () {
      // Do not show user results if no data has been entered.
      return this.isIncomplete ? 0 : 12
    }
  },
  methods: {
    uploadTotals: function () {
      // Initialize user object for upload
      let userObject = {}
      userObject['onid'] = this.$store.getters['user/onid']
      userObject['firstName'] = this.$store.getters['user/firstName']
      userObject['primaryAffiliation'] = this.$store.getters['user/primaryAffiliation']
      userObject['administrator'] = this.$store.getters['user/administratior']

      // Initialize data array with current data only
      userObject['data'] = []
      userObject['data'].push({
        date: new Date().toLocaleDateString(),
        location: UserApi.getLocation(),
        totals: this.totals.totals
      })

      // Upload userObject for DB entry
      UserApi.uploadUserData(userObject)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item {
  background: #fff;
}
.centered {
  text-align: center;
}
</style>
