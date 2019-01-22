<!--
@Author: Jack Woods
@Date:   2019-01-17T10:21:54-08:00
@Filename: countryComparisonChart.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-22T15:19:50-08:00
@Copyright: 2018 Oregon State University
-->
<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: barGraph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-22T15:19:50-08:00
@Copyright: 2018 Oregon State University
-->
<script>

import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  name: 'country-chart',
  props: {
    dataObj: {
      type: Array,
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
            fontFamily: 'Open Sans'
          },
          onHover: function (e) {
            e.target.style.cursor = 'pointer'
          }
        },
        hover: {
          onHover: function (e) {
            var point = this.getElementAtEvent(e)
            if (point.length) e.target.style.cursor = 'pointer'
            else e.target.style.cursor = 'default'
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
            label: item => { return parseFloat(item.yLabel).toFixed(2) + ' kgCO2e' }
          }
        }
      },
      chartdata: {
        labels: ['Total Average Footprint (KgCO2e)'],
        datasets: [
          {
            label: 'Brazil',
            data: [2500],
            backgroundColor: '#C4D6A4',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'Burkina Faso',
            data: [200],
            backgroundColor: '#B8DDE1',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'China',
            data: [7600],
            backgroundColor: '#FDD26E',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'France',
            data: [10640],
            backgroundColor: '#C6DAE7',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'Oregon',
            data: [5100],
            backgroundColor: '#B7A99A',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'US',
            data: [16399.8],
            backgroundColor: '#7A6855',
            borderColor: '#000',
            borderWidth: 2
          },
          {
            label: 'You',
            data: [3668.9],
            backgroundColor: '#F7A162',
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
      Object.assign(this.chartdata.datasets[6].data, this.dataObj)
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
