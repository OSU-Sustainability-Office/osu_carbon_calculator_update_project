<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: barGraph.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-29T21:04:08-08:00
@Copyright: 2018 Oregon State University
-->
<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
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
        legend: {
          labels: {
            fontSize: 14,
            fontColor: '#000',
            fontFamily: 'Open Sans',
            padding: 20
          },
          onHover: function ( e ) {
            e.target.style.cursor = 'pointer'
          }
        },
        hover: {
          onHover: function ( e ) {
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
            label: ( item ) => {
              return parseFloat( item.yLabel ).toFixed( 1 ) + ' kgCO2e'
            }
          }
        }
      },
      chartdata: {
        labels: [
          'Transportation',
          'Consumption',
          'Energy and Heating',
          'Food',
          'Water'
        ],
        datasets: [
          {
            label: 'Carbon Dioxide Equivalent Emissions by Category',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: [
              '#D3832B',
              '#AA9D2E',
              '#FFB500',
              '#E0E0E0',
              '#006A8E'
            ],
            borderColor: '#000',
            borderWidth: 2
          }
        ]
      }
    }
  },
  mounted () {
    // Use Object.assign for vue reactivity
    Object.assign( this.chartdata.datasets[0].data, this.dataObj.totals )
    this.renderChart( this.chartdata, this.options )
  },
  watch: {
    dataObj () {
      // Use Object.assign for vue reactivity
      Object.assign( this.chartdata.datasets[0].data, this.dataObj.totals )
      this.$data._chart.update()
    }
  }
}
</script>

<style></style>
