<script>
  // TODO: MOVE TO THRIVA-UI
  export default {
    name: 'CheckButton',
    props: {
      text: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      selected: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toggle (value) {
        this.$emit('toggle', value)
      }
    }
  }
</script>

<template lang='pug'>
  .check-button(
    :class="{ 'check-button--selected': selected }",
    tabindex='0',
    @click='toggle(value)',
    @keydown.enter='toggle(value)'
  ) {{ text }}

</template>

<style lang='stylus'>
  // SUGGESTION: style the check-button here

</style>
