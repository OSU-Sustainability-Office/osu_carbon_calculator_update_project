<!--
@Author: Jack Woods <jackrwoods>
@Date:   2019-01-26T13:31:44-08:00
@Email:  jackrwoods@gmail.com
@Filename: numericalUnitInput.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-11T15:14:42-08:00
@Copyright: 2019 Oregon State University
-->
<template>
  <div>
    <el-input
      type="number"
      maxlength="20"
      :min="min"
      v-model="value"
      @change="$emit('change', $event)"
    >
      <template :slot="slot">{{ unit }}</template>
    </el-input>
    <br />
    <el-button-group class="padded">
      <el-button
        type="primary"
        @click="add(-1)"
        v-long-press="350"
        @long-press-start="longPressStart(-1)"
        @long-press-stop="longPressStop"
        icon="el-icon-minus"
        :disabled="isDecrementDisabled"
      ></el-button>
      <el-button
        type="primary"
        @click="add(1)"
        v-long-press="350"
        @long-press-start="longPressStart(1)"
        @long-press-stop="longPressStop"
        icon="el-icon-plus"
      ></el-button>
    </el-button-group>
  </div>
</template>

<script>
// eslint-disable-next-line
import LongPress from "vue-directive-long-press";

export default {
  directives: {
    'long-press': LongPress
  },
  props: {
    unit: String,
    prefix: Boolean,
    min: Number,
    value: Number
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    add (val) {
      this.value = parseInt(this.value) + val
      this.$emit('change', this.value)
    },
    longPressStart (val) {
      this.val = val
      this.longPress = setInterval(
        (function (scope) {
          return function () {
            scope.value += 5 * scope.val
          }
        })(this),
        50
      )
    },
    longPressStop () {
      clearInterval(this.longPress)
    }
  },
  computed: {
    slot () {
      return this.prefix === true ? 'prepend' : 'append'
    },
    isDecrementDisabled () {
      return this.value < 1
    }
  },
  data () {
    return {
      longPress: null,
      val: 1
    }
  },
  watch: {
    value () {
      this.value = this.value < 0 ? 0 : this.value
      this.value = isNaN(this.value) ? 0 : this.value
    }
  }
}
</script>
<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.padded {
  margin-top: 0.2em;
}
.el-input-group__append {
  min-width: 5em;
  text-align: center;
}
</style>
