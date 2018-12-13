<template>
<el-col :span="24" v-loading="loading">

  <el-collapse v-model="catAccordion" accordion>

    <!-- Iterate over each category and render the questions -->
    <el-collapse-item v-for="category in categories" :key="category.categoryID" :title="category.title" :name="category.categoryID">

      <component v-for="(question, index) in category.questions" :key="index" v-bind:is="question.input.type" v-bind:questionData="question" v-bind:index="index" v-bind:categoryID="category.categoryID" v-model="question.value" />

    </el-collapse-item>

    <!-- Display Results -->
    <el-collapse-item title="Results" name="Results">

      <graph />

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
import graph from '@/components/calculator/graphs/graph'

export default {
  name: 'calcAccordion',
  data () {
    return {
      catAccordion: '0'
    }
  },
  computed: {
    categories () { return this.$store.getters['calculator/categories'] },
    loading () { return (this.$store.getters['calculator/categories'] > 0) }
  },
  components: {
    list,
    dependentValue,
    value,
    paragraph,
    tableQuestion,
    graph
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
