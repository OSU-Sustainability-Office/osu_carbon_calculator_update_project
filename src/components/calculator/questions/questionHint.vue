<!--
@Author: Jack Woods
@Date:   2019-03-07T14:12:23-08:00
@Email:  jackrwoods@gmail.com
@Filename: questionHint.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-03-12T10:36:52-07:00
-->
<template>
  <el-tooltip :value="!disabled" class="item" effect="light" :content="metadata" placement="top" manual>
    <i class="el-icon-info mouseover" @click="toggleDisabled()"></i>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    'metadata': String
  },
  data () {
    return {
      disabled: true
    }
  },
  methods: {
    toggleDisabled: function () {
      this.disabled = !this.disabled
    }
  }
}
</script>
<style>
.mouseover {
  cursor: pointer;
}
</style>
