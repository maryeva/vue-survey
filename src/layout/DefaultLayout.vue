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

  body
    background-color: #EFF4F7

  .wrapper
    position: relative
    margin: auto
    max-width: 1680px
    min-height: 100vh
    height: 100%
    background-color: #F7F9FB
    z-index: 0
    overflow: hidden
    box-shadow: 0 1px 4px 0 rgba(#3D4250, 0.18)

    .content
      padding-top: 20px
      height: 100%

      @media (min-width: 768px)
        padding-top: 82px

</style>
