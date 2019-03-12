<!--
@Author: Jack Woods
@Date:   2019-03-07T14:12:23-08:00
@Email:  jackrwoods@gmail.com
@Filename: questionHint.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-03-12T10:36:52-07:00
-->
<template>
  <el-tooltip tabindex="-1" class="item" effect="dark" :content="metadata" placement="top">
    <i class="el-icon-info"></i>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    'metadata': String
  }
}
</script>
