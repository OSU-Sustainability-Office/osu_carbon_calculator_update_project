<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: trendChart.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-11T17:40:24-08:00
@Copyright: 2018 Oregon State University
-->
<script>

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  name: 'trend-chart',
  props: {
    totals: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: 14,
                fontColor: '#000',
                fontFamily: 'Open Sans'
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                fontSize: 14,
                fontColor: '#000',
                fontFamily: 'Open Sans'
              }
            }
          ]
        },
        legend: {
          labels: {
            fontSize: 14,
            fontColor: '#000',
            fontFamily: 'Open Sans',
            padding: 20
          },
          onHover: function (e) {
            e.target.style.cursor = 'pointer'
          }
        },
        hover: {
          onHover: function (e) {
            e.target.style.cursor = 'default'
          }
        },
        tooltips: {
          backgroundColor: '#fff',
          borderColor: '#000',
          borderWidth: 2,
          titleFontSize: 16,
          titleFontColor: '#000',
          titleFontFamily: 'Open Sans',
          bodyFontSize: 14,
          bodyFontColor: '#000',
          bodyFontFamily: 'Open Sans',
          cornerRadius: 4,
          callbacks: {
            label: item => { return parseFloat(item.yLabel).toFixed(1) + ' kgCO2e' }
          }
        }
      },
      chartdata: {
        labels: [],
        datasets: []
      }
    }
  },
  computed: {
    dataObj () {
      // Get historical data
      let data = this.$store.getters['user/data']

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
          if (index === 1) dates.push(entry.date) // Only push one date for each set of totals. I have arbitrarily chosen to do this on the 1st totals category.
        })

        // Add current totals to dataset if data has been entered.
        if (!this.isIncomplete) {
          // Append a new datapoint
          set.data.push(this.totals[index])
          if (index === 1) dates.push('Today')
        }
      })

      // Check to see if data has already been collected for today.
      // eslint-disable-next-line
      if (dates[dates.length - 2] == new Date().toLocaleDateString()) {
        // Update today's datapoint by overwriting
        this.$set(dates, dates.length - 2, 'Earlier Today')
      }

      return { datasets, dates }
    }
  },
  mounted () {
    // Use Object.assign for vue reactivity
    Object.assign(this.chartdata.datasets, this.dataObj.datasets)
    Object.assign(this.chartdata.labels, this.dataObj.dates)
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    dataObj () {
      // Use Object.assign for vue reactivity
      Object.assign(this.chartdata.datasets, this.dataObj.datasets)
      Object.assign(this.chartdata.labels, this.dataObj.dates)
      this.$data._chart.update()
    }
  }
}
</script>

<style>
</style>
