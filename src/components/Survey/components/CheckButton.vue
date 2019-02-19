<script>
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
      toggleSelectedItem () {
        const action = !this.selected ? 'survey/addSelectedItem' : 'survey/removeSelectedItem'
        this.$store.dispatch(action, { selection: this.text, type: this.value })
      }
    }
  }
</script>

<template lang='pug'>
  .check-button(
    :class="{ 'check-button--selected': selected }",
    tabindex='0'
    @click='toggleSelectedItem'
  ) {{ text }}

</template>

<style lang='stylus'>
  .check-button
    align-items: center
    background-color: #FFFFFF
    border: 1px solid #CED0D9
    border-radius: 4px
    color: #3d4250
    display: flex;
    font-size: 20px
    height: 120px
    justify-content: center;
    margin-bottom: 20px
    transition: .2s
    
    &--selected
      background-color: #F4FCFD
      border: 2px solid #3ECADD

    &:focus
      outline: none

</style>
