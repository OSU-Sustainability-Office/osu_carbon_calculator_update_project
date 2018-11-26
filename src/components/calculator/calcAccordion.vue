<template>
<el-col :span="24" v-loading="loading">

  <el-collapse v-model="catAccordion" accordion>
    <el-collapse-item v-for="category in categories" :key="category.categoryID" :title="category.title" :name="category.categoryID">

      <component v-for="question in category.questions" v-bind:is="question.input.type" v-bind:questionData="question" />

    </el-collapse-item>
  </el-collapse>

</el-col>
</template>

<script>
// Import components for each question type
import list from '@/components/calculator/questions/list'
import dependentValue from '@/components/calculator/questions/dependentValue'
import value from '@/components/calculator/questions/value'
import text from '@/components/calculator/questions/text'

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
    text
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
