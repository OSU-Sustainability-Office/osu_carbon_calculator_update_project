<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: barGraph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-10T15:13:18-08:00
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
    }
  },
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartdata: {
        labels: ['Transportation', 'Consumption', 'Energy and Heating', 'Food', 'Water', 'Waste'],
        datasets: [{
          label: 'Carbon Dioxide Equivalent Emissions by Category',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: ['#D3832B', '#AA9D2E', '#FFB500', '#8E9089', '#006A8E', '#7A6855'],
          borderColor: '#000',
          borderWidth: 2
        }]
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
  watch: {
    dataObj () {
      // Use Object.assign for vue reactivity
      Object.assign(this.chartdata.datasets[0].data, this.dataObj.totals)
      this.$data._chart.update()
    }
  }
}
</script>

<style>
</style>
