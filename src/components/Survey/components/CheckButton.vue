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
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/mixins'
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

  .check-button
    background: THRIVA.colours.white
    border: 1px solid THRIVA.colours.input-border-grey
    height: 100px
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 15px
    cursor: pointer
    font-weight: THRIVA.typography.font-weights.regular
    color: THRIVA.colours.xx-dark-grey
    transition: 0.2s

    &--selected
      border: 2px solid THRIVA.colours.blue
      background: rgba(THRIVA.colours.blue, 0.18)
      box-shadow none
      transition: 0.2s

    &:hover
      shadow(sm)

    &:focus
      box-shadow 0 0 3px 2px rgb(124,160,246)

    &:focus &:hover
      box-shadow 0 0 3px 2px rgb(124,160,246)

    +media-breakpoint-up(md)
      height: 120px
      margin-bottom: 20px

</style>
