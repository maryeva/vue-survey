<script>
  export default {
  }
</script>

<template lang='pug'>
  .wrapper.wrapper--minimal
    .content
      router-view
</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/mixins'

  body
    background-color: THRIVA.colours.x-light-grey

  .wrapper.wrapper--minimal
    position: relative
    margin: auto
    max-width: 1680px
    min-height: 100vh
    height: 100%
    overflow: hidden
    background-color: THRIVA.colours.xx-light-grey
    z-index: 0
    shadow(sm)

    .content
      +media-breakpoint-up(md)
        margin-top: 0
        padding-top: 0

</style>
