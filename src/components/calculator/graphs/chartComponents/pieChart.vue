<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: barGraph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-05T12:03:36-08:00
@Copyright: 2018 Oregon State University
-->
<script>

import { Pie, mixins } from 'vue-chartjs'

export default {
  extends: Pie,
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
        chartoptions: {
          responsive: false,
          maintainAspectRatio: false
        }
      }
    }
  },
  computed: {
    // Convert the data into a format compatible with chartjs
    chartdata () {
      // Data object for chartjs
      // TODO: renderChart is not reacting to changes in chartdata. It may not be able to sense changes with chartdata.datasets[0].data[0] etc
      let obj = {
        labels: ['Transportation', 'Consumption', 'Energy and Heating', 'Food', 'Water', 'Waste'],
        datasets: [{
          label: 'Carbon Dioxide Equivalent Emissions by Category',
          data: this.dataObj.totals
        }]
      }

      // Use Object.assign for vue reactivity
      Object.assign(obj.datasets[0].data, this.dataObj.totals)

      // When this variable changes, re-render chart
      this.renderChart(obj, this.options)
      return obj
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
</style>
