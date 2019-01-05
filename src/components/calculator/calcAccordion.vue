<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: calcAccordion.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-05T15:17:27-08:00
@Copyright: 2018 Oregon State University
-->

<template>
<el-col :span="24">

  <el-collapse v-model="catAccordion" v-loading="loading" @change="changeAcc" accordion>

    <!-- Iterate over each category and render the questions -->
    <el-collapse-item v-for="category in categories" :key="category.categoryID" :title="category.title" :name="category.categoryID">

      <component v-for="(question, index) in category.questions" :key="index" v-bind:is="question.input.type" v-bind:questionData="question" v-bind:index="index" v-bind:categoryID="category.categoryID" v-model="question.value" />

      <br />
      <el-button-group>
        <el-button v-on:click="previous" type="primary" icon="el-icon-arrow-left">Previous Page</el-button>
        <el-button v-on:click="next" type="primary">Next Page <i class="el-icon-arrow-right el-icon-right"></i></el-button>
      </el-button-group>

    </el-collapse-item>

    <!-- Display Results -->
    <el-collapse-item title="Results" name="Results">

      <chartContainer ref="charts" />

    </el-collapse-item>
  </el-collapse>

</el-col>
</template>

<script>
// Import components for each question type
import list from '@/components/calculator/questions/list'
import dependentValue from '@/components/calculator/questions/dependentValue'
import value from '@/components/calculator/questions/value'
import paragraph from '@/components/calculator/questions/paragraph'
import tableQuestion from '@/components/calculator/questions/tableQuestion'
import chartContainer from '@/components/calculator/graphs/chartContainer'

export default {
  name: 'calcAccordion',
  data () {
    return {
      catAccordion: '0'
    }
  },
  computed: {
    categories () { return this.$store.getters['calculator/categories'] },
    loading () { return (this.$store.getters['calculator/categories'].length < 1) }
  },
  methods: {
    previous () {
      // Do things
    },
    next () {
      // Do other things
    },
    changeAcc (category) {
      // eslint-disable-next-line
      if (category == "Results") {
        this.$refs.charts.reRender()
      }
    }
  },
  components: {
    list,
    dependentValue,
    value,
    paragraph,
    tableQuestion,
    chartContainer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
