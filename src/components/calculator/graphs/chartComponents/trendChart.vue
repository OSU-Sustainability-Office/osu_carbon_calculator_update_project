<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: trendChart.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-12T18:36:26-08:00
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
          yAxes: [{
            stacked: true
          }]
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
