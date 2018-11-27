<template>

  <div class="question">

    {{questionData.text}} <br />

    <el-input-number v-model="questionData.value" @change="handleChange" :min="1" :max="10" />

  </div>

</template>

<script>
export default {
  name: 'value',
  props: {
    'questionData': Object
  },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  },
  data () {
    return {
      num: '1'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
