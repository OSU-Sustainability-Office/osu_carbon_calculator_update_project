<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: barGraph.vue
@Last modified by:   Jack Woods
@Last modified time: 2018-12-26T10:38:28-08:00
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
      return {
        labels: ['Transportation', 'Consumption', 'Energy and Heating', 'Food', 'Water', 'Waste'],
        datasets: [{
          label: 'Carbon Dioxide Equivalent Emissions by Category',
          data: this.dataObj.totals
        }]
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
</style>
