<!--
@Author: Jack Woods <jackrwoods>
@Date:   2018-12-12T12:28:53-08:00
@Filename: graph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-28T21:10:30-08:00
@Copyright: 2018 Oregon State University
@Note: The code in this container is pretty awful, in my opinion. This is because the vision for the charts section continues to change. In beta builds, this will be refactored and optimized.
-->

<template>

<div class="chartContainer">
  <el-row>
    <!-- US Avg and Category Comparison Charts -->
    <el-col :span="barSpan">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <h1 v-if="barSpan === 10" class="centered">Your Results</h1>
          <h1 v-else class="centered">Live Results</h1>
        </div>
        <div>
          <bar-chart ref="resultsBarChart" :dataObj="resultsBarData" :styles="{height: chartHeight + 'em'}" />
          <el-switch v-model="resultsToggle" active-text="Percentages" inactive-text="Totals (Kg CO2e)"></el-switch>
        </div>
      </el-card>
    </el-col>
    <el-col :span="14" v-if="lastSlide">
      <!-- Trend/Historical Data Chart -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <h1 class="centered">Country Comparison</h1>
        </div>
        <div>
          <countryComparisonChart :dataObj="countryComparisonChartData" :styles="{height: chartHeight + 1.4 + 'em'}"/>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row v-if="lastSlide">
    <el-col :span="16" :offset="4" v-if="this.$store.getters['user/isLoggedIn'] && this.$store.getters['user/data'].length > 0 && lastSlide">
      <!-- Trend/Historical Data Chart -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <h1 class="centered">Trend</h1>
        </div>
        <div>
          <trend-chart :dataObj="formatHistData(historicalData)" ref="trendBar" :styles="{height: chartHeight + 'em'}"/>
        </div>
      </el-card>
    </el-col>

    <el-col :span="16" :offset="4" v-if="!(this.$store.getters['user/isLoggedIn']) && lastSlide">
      <!-- Trend/Historical Data Chart -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <h1 class="centered">Trend</h1>
        </div>
        <div>
          <p>Viewing historical trends and user-specific historical data is currently available for users who log in with ONID.</p>
          <el-button type="primary" plain @click="redirectToLogin">Login</el-button>
        </div>
      </el-card>
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
    },
    chartsWidth: {
      type: Number,
      default: 8
    },
    studentType: {
      type: String,
      default: 'On Campus'
    }
  },
  data () {
    return {
      usAvgDataObj: {
        totals: [4808.4, 4979.9, 3692.1, 2404.2, 515.2]
      },
      chartHeight: 37.4,
      resultsToggle: true
    }
  },
  computed: {
    categories () { return this.$store.getters['calculator/categories'] },
    historicalData () { return this.$store.getters['user/data'] },
    studentBaseline () {
      // eslint-disable-next-line
      if (this.studentType == 'On Campus') {
        return [3498.6, 170.2]
      }
      // eslint-disable-next-line
      if (this.studentType == 'Off Campus Full-time Commuter Student or Staff') {
        return [2624.6, 164.6]
      }
      // Otherwise, default to 'Part-time Commuter Student or Staff':
      return [1750.5, 159.1]
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

      // Add baseline data for each student type to the calculator.
      this.$set(totals, 2, this.studentBaseline[0] + totals[2])
      this.$set(totals, 4, this.studentBaseline[1] + totals[4])

      // Upload this data if the user is logged in
      if (this.$store.getters['user/isLoggedIn']) this.uploadTotals(totals)

      return totals
    },
    resultsBarData () {
      // Determine what data should be shown.
      if (this.resultsToggle) {
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
    barSpan () { return this.chartsWidth === 8 ? 24 : 10 },
    countryComparisonChartData () {
      let sum = 0
      this.totals.forEach(t => { sum += t })
      let arr = []
      arr.push(sum)
      return arr
    }
  },
  methods: {
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
    formatHistData (data) {
      // An array that stores which day each data point is from.
      let dates = []

      // Initialize a dataset object
      let datasets = [
        {
          label: 'Transportation',
          backgroundColor: '#D3832B',
          borderColor: '#000'
        },
        {
          label: 'Consumption',
          backgroundColor: '#AA9D2E',
          borderColor: '#000'
        },
        {
          label: 'Energy and Heating',
          backgroundColor: '#FFB500',
          borderColor: '#000'
        },
        {
          label: 'Food',
          backgroundColor: '#8E9089',
          borderColor: '#000'
        },
        {
          label: 'Water',
          backgroundColor: '#006A8E',
          borderColor: '#000'
        }
      ]

      // Iterate over each dataset, and add each historical data point
      datasets.forEach((set, index) => {
        set.data = []
        set.fill = index === 0 ? 'origin' : index - 1
        data.forEach(entry => {
          set.data.push(entry.totals[index])
          if (index === 1) dates.push(entry.date)
        })

        // Add current totals to dataset if data has been entered.
        if (!this.isIncomplete) {
          // Check to see if overwriting data is necessary.
          // eslint-disable-next-line
          if (data[data.length - 1].date == this.todayDate) {
            // Update today's datapoint by overwriting
            this.$set(set.data, set.data.length - 1, this.totals[index])
          } else {
            // Append a new datapoint
            set.data.push(this.totals[index])
            if (index === 1) dates.push(this.todayDate)
          }
        }
      })

      return { datasets, dates }
    },
    redirectToLogin () {
      window.location = 'https://api.sustainability.oregonstate.edu/auth/login?returnURI=' + window.location
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-carousel__item {
  background: #fff;
}
.centered {
  text-align: center;
}
.el-card {
  border: 1px solid #000;
  margin: 1px;
  border-radius: 4px;
}
h1 {
  padding: 0em;
  margin: 0;
  font-family: 'StratumNo2';
  font-size: 2.5em;
}
</style>
