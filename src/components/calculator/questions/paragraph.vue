<template>

  <div class="question">

    <span v-html="questionData.text"></span> <br />

  </div>

</template>

<script>
export default {
  name: 'paragraph',
  props: {
    'questionData': Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
