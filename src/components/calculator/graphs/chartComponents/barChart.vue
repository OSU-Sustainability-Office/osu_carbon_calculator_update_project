<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: barGraph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-12T17:43:17-08:00
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
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
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
            backgroundColor: '#8E9089',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'Water',
            data: [0, 0],
            backgroundColor: '#006A8E',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'Waste',
            data: [0, 0],
            backgroundColor: '#7A6855',
            borderColor: '#000',
            borderWidth: 2
          }
        ]
      },
      chartdataSeperate: {
        labels: ['Transportation', 'Consumption', 'Energy and Heating', 'Food', 'Water', 'Waste'],
        datasets: [
          {
            label: 'USAverage',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: ['#D3832B', '#AA9D2E', '#FFB500', '#8E9089', '#006A8E', '#7A6855'],
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'Your Result',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: ['#D3832B', '#AA9D2E', '#FFB500', '#8E9089', '#006A8E', '#7A6855'],
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
      Object.assign(this.chartdata.datasets[5].data, this.dataObj.waste)
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
