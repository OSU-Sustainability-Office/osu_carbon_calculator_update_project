<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: barGraph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-06T15:45:21-08:00
@Copyright: 2018 Oregon State University
-->
<script>

import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
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
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    // Convert the data into a format compatible with chartjs
    chartdata () {
      // Data object for chartjs
      let obj = {
        labels: ['Transportation', 'Consumption', 'Energy and Heating', 'Food', 'Water', 'Waste'],
        datasets: [{
          label: 'Carbon Dioxide Equivalent Emissions by Category',
          data: this.dataObj.totals,
          backgroundColor: ['#D3832B', '#AA9D2E', '#FFB500', '#0D5257', '#006A8E', '#7A6855'],
          borderColor: '#000'
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
