<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: trendChart.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-29T21:04:05-08:00
@Copyright: 2018 Oregon State University
-->
<script>

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  name: 'trend-chart',
  props: {
    dataObj: {
      type: Object,
      default: null
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
        labels: this.dataObj.dates,
        datasets: []
      }
    }
  },
  mounted () {
    // Use Object.assign for vue reactivity
    Object.assign(this.chartdata.datasets, this.dataObj.datasets)
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    dataObj () {
      // Use Object.assign for vue reactivity
      Object.assign(this.chartdata.datasets, this.dataObj.datasets)
      this.$data._chart.update()
    }
  }
}
</script>

<style>
</style>
