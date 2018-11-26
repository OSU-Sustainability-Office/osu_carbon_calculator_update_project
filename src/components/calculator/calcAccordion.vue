<template>
<el-col :span="24" v-loading="loading">

  <el-collapse v-model="catAccordion" accordion>

    <el-collapse-item v-for="category in categories" :key="category.categoryID" :title="category.title" :name="category.categoryID">
      <list questionData="category.questions[0]" />

    </el-collapse-item>

  </el-collapse>

</el-col>
</template>

<script>
import list from '@/components/calculator/questions/list'

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
    list
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
