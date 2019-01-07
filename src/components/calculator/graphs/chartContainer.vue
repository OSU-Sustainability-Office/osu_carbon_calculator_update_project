<!--
@Author: Jack Woods <jackrwoods>
@Date:   2018-12-12T12:28:53-08:00
@Filename: graph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-07T13:52:52-08:00
@Copyright: 2018 Oregon State University
-->

<template>

<div class="chartContainer">

  <el-row v-if="!isIncomplete" :gutter="20">
    <el-col :span="24">
      <h3 class="centered">Your Results:</h3>
      <bar-chart ref="resBar" :dataObj="dataObj" :styles="{height: chartHeight + 'em'}"/>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="8" :offset="avgOffset">
      <h3 class="centered">US Average:</h3>
      <pie-chart :dataObj="usAvgDataObj" :styles="{height: chartHeight + 'em'}"/>
    </el-col>
    <el-col v-if="!isIncomplete" :span="8">
      <h3 class="centered">Your Footprint:</h3>
      <pie-chart ref="resPie" :dataObj="dataObj" :styles="{height: chartHeight + 'em'}"/>
    </el-col>
  </el-row>

  <el-row v-if="this.$store.getters['user/isLoggedIn'] && this.$store.getters['user/data'].length > 0" :gutter="20">
    <el-col :span="24">
      <h3 class="centered">Trend:</h3>
      <trend-chart :dataObj="formatHistData(historicalData)" ref="trendBar" :styles="{height: chartHeight + 'em'}"/>
      <el-carousel type="card" trigger="click" :height="chartHeight + 10 + 'em'" :autoplay="false" :loop="false">
        <el-carousel-item v-for="(entry, index) in historicalData" :key="index">
          <h3>{{ entry.date }}</h3>
          <bar-chart :dataObj="entry" :styles="{height: chartHeight + 'em'}"/>
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
import trendChart from '@/components/calculator/graphs/chartComponents/trendChart'

export default {
  name: 'chartContainer',
  components: {
    barChart,
    pieChart,
    trendChart
  },
  data () {
    return {
      usAvgDataObj: {
        totals: [4808.4, 4979.9, 3692.1, 2404.2, 515.2]
      },
      chartHeight: 30
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
    avgOffset () {
      // Always show the Us average, but make room for user's results if the
      // data has been entered into the calculator
      return this.isIncomplete ? 8 : 4
    }
  },
  methods: {
    uploadTotals () {
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
        totals: this.totals
      })

      // Upload userObject for DB entry
      UserApi.uploadUserData(userObject)
    },
    reRender () {
      if (this.$refs.resPie) {
        this.$refs.resPie.reRender()
        this.$refs.resBar.reRender()
        this.$refs.trendBar.reRender()
      }
    },
    formatHistData (data) {
      let dates = []

      // Create a dataset for each category
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
          backgroundColor: '#0D5257',
          borderColor: '#000'
        },
        {
          label: 'Water',
          backgroundColor: '#006A8E',
          borderColor: '#000'
        },
        {
          label: 'Waste',
          backgroundColor: '#7A6855',
          borderColor: '#000'
        }
      ]

      // Iterate over each dataset, and add each historical data point
      datasets.forEach((set, index) => {
        set.data = []
        set.fill = index === 0 ? 'origin' : index - 1
        data.forEach(entry => {
          // Sum all previous data points to make this point 'stack'
          let sum = 0
          for (let i = 0; i <= index; i++) {
            sum += entry.totals[i]
          }
          set.data.push(sum)
          if (index === 1) dates.push(entry.date)
        })

        // Add current totals to dataset if data has been entered.
        if (!this.isIncomplete()) {
          let sum = 0
          for (let i = 0; i <= index; i++) {
            sum += this.totals[i]
          }
          set.data.push(sum)
          if (index === 1) dates.push(new Date().toLocaleDateString())
        }
      })

      return { datasets, dates }
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
