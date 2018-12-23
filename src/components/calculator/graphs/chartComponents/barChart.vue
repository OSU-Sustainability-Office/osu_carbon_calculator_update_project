<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: barGraph.vue
@Last modified by:   Jack Woods
@Last modified time: 2018-12-23T11:11:04-08:00
@Copyright: 2018 Oregon State University
-->
<script>

import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    histData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      options: {
        chartoptions: {
          responsive: true,
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
          label: 'Total Carbon Dioxide Equivalent Emissions by Category',
          data: this.histData.totals
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
