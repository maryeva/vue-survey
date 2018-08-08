<script>
  import Popper from 'vue-popperjs'
  import 'vue-popperjs/dist/css/vue-popper.css'

  export default {
    name: 'ThvToolTip',
    components: {
      Popper
    },
    props: {
      trigger: {
        type: String,
        default: 'hover'
      },
      options: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<template lang='pug'>
  popper(:trigger='trigger', :options='options')
    .popper.info-tool-tip
      slot(name='text')

    a.info-tool-tip-point(slot='reference')
      slot(name='point')
</template>

<style lang='stylus'>

  .info-tool-tip
    &.popper
      background-color: #FFFFFF
      border: none
      padding: 20px
      text-align: left
      z-index: 10
      border-radius: 10px
      box-shadow: 0 6px 20px 0 rgba(#3D4250, 0.18)

      .popper__arrow
        display: none
    
    &-point
      width: 16px
      height: 16px
      margin-left: 5px
      position: relative
      display: inline-block
      cursor: help

      img
        position: absolute
        top: 2px
    
</style>
