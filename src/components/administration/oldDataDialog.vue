<!--
@Author: Jack Woods
@Date:   2018-12-19T18:36:52-08:00
@Filename: oldDataDialog.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-11T16:00:04-08:00
@Copyright: 2018 Oregon State University
-->
<template>
  <el-dialog
    title="Choose Data"
    :visible.sync="visible"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    center>
    <span v-if="!(histData.length > 0)">You currently have no historical data.</span>
    <el-table v-if="histData.length > 0" :data="tableData" align="center">
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>Transportation: {{ props.row.transportation }}</p>
          <p>Consumption: {{ props.row.consumption }}</p>
          <p>Energy and Heating: {{ props.row.energyAndHeating }}</p>
          <p>Food: {{ props.row.food }}</p>
          <p>Water: {{ props.row.water }}</p>
          <p>Waste: {{ props.row.waste }}</p>
        </template>
      </el-table-column>
      <el-table-column width="100" prop="date" label="Date"></el-table-column>
      <el-table-column width="100" label="Delete">
        <template slot-scope="scope">
          <el-button @click="confirmDeletion(scope.$index)" type="text" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$store.commit('ui/toggleOldDataDialog')">Close</el-button>
    </span>
  </el-dialog>
</template>

<script>
import UserApi from '@/utils/api/user.js' // For deleting user data

export default {
  name: 'oldDataDialog',
  computed: {
    visible () {
      return this.$store.getters['ui/oldDataDialog']
    },
    histData () {
      return this.$store.getters['user/data']
    },
    tableData () {
      let data = []
      this.histData.forEach((entry, index) => {
        if (index >== data.length - 2) {
          data.push({
            date: entry.date,
            transportation: entry.totals[0],
            consumption: entry.totals[1],
            energyAndHeating: entry.totals[2],
            food: entry.totals[3],
            water: entry.totals[4],
            waste: entry.totals[5]
          })
        }
      })
      return data
    }
  },
  methods: {
    handleDelete (row) {
      this.$store.commit('user/removeHistData', row)
      UserApi.deleteHistData(row)
    },
    confirmDeletion (row) {
      this.$confirm('This will permanently delete your results from ' + this.$store.getters['user/data'][row].date + '. Continue?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Deleted data.'
        })
        this.handleDelete(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled.'
        })
      })
    }
  }
}
</script>

<style>
</style>
