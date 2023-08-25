<!--
@Author: Jack Woods
@Date:   2018-12-13T13:29:58-08:00
@Email:  jackrwoods@gmail.com
@Filename: editableCell.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-14T18:00:36-08:00
-->

<template>
  <div @click="onFieldClick" class="edit-cell">
    <el-tooltip
      v-if="!editMode && !showInput"
      :placement="toolTipPlacement"
      :open-delay="toolTipDelay"
      :content="toolTipContent"
    >
      <div tabindex="0" @keyup.enter="onFieldClick">
        <slot name="content"></slot>
      </div>
    </el-tooltip>
    <component
      :is="editableComponent"
      v-if="editMode || showInput"
      ref="input"
      @focus="onFieldClick"
      @keyup.enter.native="onInputExit"
      v-on="listeners"
      v-bind="$attrs"
      v-model="model"
    >
      <slot name="edit-component-slot"></slot>
    </component>
  </div>
</template>

<script>
// NOTE: Special thanks to reddit user u/CristiJ for the editable ElementUI table
// source code. Available: https://www.reddit.com/r/vuejs/comments/842g5c/inline_editable_table_with_elementui/

export default {
  name: 'editableCell',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    toolTipContent: {
      type: String,
      default: 'Click to edit'
    },
    toolTipDelay: {
      type: Number,
      default: 500
    },
    toolTipPlacement: {
      type: String,
      default: 'top-start'
    },
    showInput: {
      type: Boolean,
      default: false
    },
    editableComponent: {
      type: String,
      default: 'el-input'
    },
    closeEvent: {
      type: String,
      default: 'blur'
    }
  },
  data () {
    return {
      editMode: false,
      numerical: false
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set ( val ) {
        this.$emit( 'input', val )
      }
    },
    listeners () {
      return {
        [this.closeEvent]: this.onInputExit,
        ...this.$listeners
      }
    }
  },
  methods: {
    onFieldClick () {
      this.editMode = true
      this.$nextTick( () => {
        let inputRef = this.$refs.input
        if ( inputRef ) {
          inputRef.focus()
        }
      } )
    },
    onInputExit () {
      this.editMode = false
    },
    onInputChange ( val ) {
      this.$emit( 'input', val )
    }
  },
  mounted () {
    if ( !isNaN( parseInt( this.value ) ) ) this.numerical = true
  },
  watch: {
    value () {
      if ( this.numerical && isNaN( this.value ) ) {
        this.value = 0
        this.$emit( 'input', this.value )
      }
    }
  }
}
</script>

<style></style>
