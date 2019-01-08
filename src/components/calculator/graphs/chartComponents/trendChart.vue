<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: barGraph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-07T14:24:54-08:00
@Copyright: 2018 Oregon State University
-->
<script>

import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  name: 'trend-chart',
  mixins: [mixins.reactiveProp],
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
      }
    }
  },
  computed: {
    // Convert the data into a format compatible with chartjs
    chartdata () {
      // Data object for chartjs
      let obj = {
        labels: this.dataObj.dates,
        datasets: []
      }

      // Use Object.assign for vue reactivity
      Object.assign(obj.datasets, this.dataObj.datasets)

      return obj
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
  methods: {
    reRender () {
      // When this variable changes, re-render chart
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>

<style>
</style>