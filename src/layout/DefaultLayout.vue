<script>
  import Header from '@/components/Shared/Header'

  export default {
    name: 'DefaultLayout',
    components: {
      Header
    }
  }
</script>

<template lang="pug">
  .wrapper
    Header(
      v-if='$route.meta.layout && !$route.meta.layout.minimalLayout',
    )
    .content
      router-view
</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

  body
    background-color: THRIVA.colours.x-light-grey

  .wrapper
    position: relative
    margin: auto
    max-width: 1680px
    min-height: 100vh
    height: 100%
    background-color: THRIVA.colours.xx-light-grey
    z-index: 0
    overflow: hidden
    shadow(sm)

    .content
      padding-top: 20px
      height: 100%

      +media-breakpoint-up(md)
        padding-top: 82px

</style>
