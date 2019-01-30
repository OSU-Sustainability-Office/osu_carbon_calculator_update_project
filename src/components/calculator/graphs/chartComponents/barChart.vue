<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: barGraph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-29T21:05:31-08:00
@Copyright: 2018 Oregon State University
-->
<script>

import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    dataObj: {
      type: Object,
      default: null
    },
    resultsToggle: {
      type: Boolean,
      default: true
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
              stacked: true,
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
        labels: ['US Average', 'Your Result'],
        datasets: [
          {
            label: 'Transportation',
            data: [0, 0],
            backgroundColor: '#D3832B',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'Consumption',
            data: [0, 0],
            backgroundColor: '#AA9D2E',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'Energy and Heating',
            data: [0, 0],
            backgroundColor: '#FFB500',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'Food',
            data: [0, 0],
            backgroundColor: '#E0E0E0',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'Water',
            data: [0, 0],
            backgroundColor: '#006A8E',
            borderColor: '#000',
            borderWidth: 2
          }
        ]
      },
      chartdataSeperate: {
        labels: ['Transportation', 'Consumption', 'Energy and Heating', 'Food', 'Water'],
        datasets: [
          {
            label: 'USAverage',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: ['#D3832B', '#AA9D2E', '#FFB500', '#E0E0E0', '#006A8E'],
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'Your Result',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: ['#D3832B', '#AA9D2E', '#FFB500', '#E0E0E0', '#006A8E'],
            borderColor: '#000',
            borderWidth: 2
          }
        ]
      }
    }
  },
  methods: {
    assignStackedData () {
      // Use Object.assign for vue reactivity
      Object.assign(this.chartdata.datasets[0].data, this.dataObj.transportation)
      Object.assign(this.chartdata.datasets[1].data, this.dataObj.consumption)
      Object.assign(this.chartdata.datasets[2].data, this.dataObj.energyAndHeating)
      Object.assign(this.chartdata.datasets[3].data, this.dataObj.food)
      Object.assign(this.chartdata.datasets[4].data, this.dataObj.water)
    }
  },
  mounted () {
    this.assignStackedData()
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    dataObj () {
      this.assignStackedData()
      this.$data._chart.update()
    }
  }
}
</script>

<style>
</style>
