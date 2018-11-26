<template>

  <div class="question">

    {{questionData.text}} <br />

  </div>

</template>

<script>
export default {
  name: 'text',
  props: {
    'questionData': Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
