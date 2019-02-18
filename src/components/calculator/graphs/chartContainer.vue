<!--
@Author: Jack Woods <jackrwoods>
@Date:   2018-12-12T12:28:53-08:00
@Filename: graph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-18T14:56:00-08:00
@Copyright: 2018 Oregon State University
@Note: The code in this container is pretty awful, in my opinion. This is because the vision for the charts section continues to change. In beta builds, this will be refactored and optimized.
-->

<template>

<div class="chartContainer">
  <el-row>
    <!-- US Avg and Category Comparison Charts -->
    <el-col :span="barSpan">
      <h1 class="centered">Results</h1>
      <bar-chart ref="resultsBarChart" :dataObj="resultsBarData" :styles="{height: '70vh'}" :resultsToggle="resultsToggle" />
      <div class="centered">
        <el-switch v-model="resultsToggle" active-text="Totals (Kg CO2e)" inactive-text="Percentages"></el-switch>
      </div>
    </el-col>
    <el-col :span="12" v-if="lastSlide">
      <!-- Trend/Historical Data Chart -->
      <h1 class="centered">Country Comparison</h1>
      <countryComparisonChart :dataObj="countryComparisonChartData" :styles="{height: '70vh'}"/>
    </el-col>
  </el-row>

  <el-row v-if="lastSlide">
    <el-col :span="16" :offset="4" v-if="this.$store.getters['user/isLoggedIn'] && this.$store.getters['user/data'].length > 0 && lastSlide">
      <!-- Trend/Historical Data Chart -->
      <h1 class="centered">Trend</h1>
      <trend-chart :totals="totals" ref="trendBar" :styles="{height: '70vh'}"/>
    </el-col>

    <el-col class="centered" :span="16" :offset="4" v-else>
      <!-- Trend/Historical Data Chart -->
      <h1 class="centered">Trend</h1>
      <div v-if="!this.$store.getters['user/isLoggedIn']">
        <p>Viewing historical trends and user-specific historical data is currently available for users who log in with ONID.</p>
        <el-button type="primary" plain @click="redirectToLogin">Login</el-button>
      </div>
      <div v-else>
        <p>Viewing historical trends and user-specific historical data will be available next time you log in.</p>
      </div>
    </el-col>
  </el-row>

</div>

</template>

<script>
import UserApi from '@/utils/api/user.js' // For uploading user data
import barChart from '@/components/calculator/graphs/chartComponents/barChart'
import trendChart from '@/components/calculator/graphs/chartComponents/trendChart'
import countryComparisonChart from '@/components/calculator/graphs/chartComponents/countryComparisonChart'

export default {
  name: 'chartContainer',
  components: {
    barChart,
    trendChart,
    countryComparisonChart
  },
  props: {
    lastSlide: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      usAvgDataObj: {
        totals: [4808.4, 4979.9, 3692.1, 2404.2, 515.2]
      },
      resultsToggle: true,
      historicalData: {
        labels: [],
        datasets: []
      }
    }
  },
  computed: {
    categories () { return this.$store.getters['calculator/categories'] },
    studentBaseline () {
      // eslint-disable-next-line
      if (this.$store.getters['user/studentType'] == 'On Campus Resident Student') {
        return [3498.6, 170.2]
      }
      // eslint-disable-next-line
      if (this.$store.getters['user/studentType'] == 'Full Time Commuter Student, Staff, or Faculty') {
        return [2624.6, 164.6]
      }
      // eslint-disable-next-line
      if (this.$store.getters['user/studentType'] == 'Part-time Commuter Student, Staff, or Faculty') {
        return [1750.5, 159.1]
      }
      // Otherwise, default to Not Affiliated:
      return [0, 0]
    },
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

            // If the parentQuestion has not been rendered, its value will be incorrect. Ignore this question if it's parent is undefined.
            if (typeof parentQuestion.input.values[location] !== 'undefined') {
              // Add to the total for this category
              // If the parentQuestion has a 0 coefficient, the child question has the coefficient
              if (parentQuestion.input.values[location].coef === 0) {
                // Multiply the current question's value to the child question's coefficient
                total += question.value * question.input.values[0].coef
              } else {
                // Multiply the current question's value to the parent question's coefficient
                if (!isNaN(question.value) && !isNaN(parentQuestion.input.values[location].coef)) total += question.value * parentQuestion.input.values[location].coef
              }
            }

            // eslint-disable-next-line
          } else if (question.input.type == 'value') {
            total += question.value * question.input.values[0].coef
            // eslint-disable-next-line
          } else if (question.input.type == 'tableQuestion') {
            total += question.value
            // eslint-disable-next-line
          } else if (question.input.type == 'list' && question.trigger.parentQuestion === -1) {
            total += question.input.values[question.input.values.map(a => a.val).indexOf(question.value)].coef
          }
        })

        totals.push(total)
      })

      // Add baseline data for each student type to the calculator.
      this.$set(totals, 2, this.studentBaseline[0] + totals[2])
      this.$set(totals, 4, this.studentBaseline[1] + totals[4])

      return totals
    },
    resultsBarData () {
      // Determine what data should be shown.
      if (!this.resultsToggle) {
        // Show 0-100% category comparison vs US Average

        // Sum all US data
        let USDataSum = 0
        this.usAvgDataObj.totals.forEach(d => {
          USDataSum += d
        })

        // Compute percentages
        let USData = []
        this.usAvgDataObj.totals.forEach(d => {
          USData.push(d / USDataSum * 100)
        })

        // Sum all user data
        let userDataSum = 0
        this.totals.forEach(d => {
          userDataSum += d
        })

        // Compute Percentages
        let userData = []
        this.totals.forEach(d => {
          userData.push(d / userDataSum * 100)
        })

        let finalDataObject = {
          transportation: [USData[0], userData[0]],
          consumption: [USData[1], userData[1]],
          energyAndHeating: [USData[2], userData[2]],
          food: [USData[3], userData[3]],
          water: [USData[4], userData[4]]
        }
        return finalDataObject
      } else {
        // Show each category's totals
        let finalDataObject = {
          transportation: [this.usAvgDataObj.totals[0], this.totals[0]],
          consumption: [this.usAvgDataObj.totals[1], this.totals[1]],
          energyAndHeating: [this.usAvgDataObj.totals[2], this.totals[2]],
          food: [this.usAvgDataObj.totals[3], this.totals[3]],
          water: [this.usAvgDataObj.totals[4], this.totals[4]]
        }
        return finalDataObject
      }
    },
    isIncomplete () {
      // Returns true if no data has been entered into the calculator
      let incomplete = true

      this.totals.forEach(t => {
        if (t !== 0) incomplete = false
      })

      return incomplete
    },
    todayDate () {
      return new Date().toLocaleDateString()
    },
    barSpan () { return this.lastSlide ? 12 : 24 },
    countryComparisonChartData () {
      let sum = 0
      this.totals.forEach(t => { sum += t })
      let arr = []
      arr.push(sum)
      return arr
    }
  },
  methods: {
    confirmData () {
      this.$confirm('We have collected multiple submissions from you today. Would you like to overwrite your previous results?', 'Warning', {
        confirmButtonText: 'Save Newest Results',
        cancelButtonText: 'Keep Previous Results',
        type: 'warning'
      }).then(() => {
        this.uploadTotals(this.totals)
        this.$message({
          type: 'success',
          message: 'Saved your most recent results!'
        })
      }).catch(() => {
        this.$message({
          type: 'success',
          message: 'Kept your previous response!'
        })
      })
    },
    uploadTotals (totals) {
      // Initialize user object for upload
      let userObject = {}
      userObject['onid'] = this.$store.getters['user/onid']
      userObject['firstName'] = this.$store.getters['user/firstName']
      userObject['primaryAffiliation'] = this.$store.getters['user/primaryAffiliation']
      userObject['administrator'] = this.$store.getters['user/administratior']

      // Initialize data array with current data only
      userObject['data'] = []
      userObject['data'].push({
        date: this.todayDate,
        location: UserApi.getLocation(),
        totals: totals
      })

      // Upload userObject for DB entry
      UserApi.uploadUserData(userObject)
    },
    redirectToLogin () {
      window.location = 'https://api.sustainability.oregonstate.edu/auth/login?returnURI=' + window.location
    }
  },
  watch: {
    lastSlide () {
      // Get historical data from vuex store.
      let data = this.$store.getters['user/data']

      if (data[data.length - 1].date === this.todayDate && this.lastSlide) {
        // Prompt the user for which data to keep (today's previous response, or today's new response).
        this.confirmData()
      } else {
        // Upload this data if the user is logged in and has no historical data for today.
        if (this.$store.getters['user/isLoggedIn']) this.uploadTotals(this.totals)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.centered {
  text-align: center;
}
.el-card {
  border: 1px solid #000;
  margin: 1px;
  border-radius: 4px;
}
h1 {
  font-size: 4vh;
  line-height: 6vh;
}
</style>
