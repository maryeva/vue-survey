<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'Loader',
  components: {
    ContentLoader
  }
}
</script>

<template lang='pug'>
  .content-loader
    .content-loader__inner
      content-loader(
        :height="50",
        :width="400",
        :speed="2",
        primaryColor="#EFF4F7",
        secondaryColor="#E5E7F1"
      ) <rect x="0" y="13" rx="4" ry="4" width="90" height="18" />

      .divider

      content-loader(
        :height="50",
        :width="400",
        :speed="2",
        primaryColor="#EFF4F7",
        secondaryColor="#E5E7F1"
      ) <rect x="0" y="13" rx="4" ry="4" width="179" height="18" />

      content-loader(
        :height="50",
        :width="400",
        :speed="2",
        primaryColor="#EFF4F7",
        secondaryColor="#E5E7F1"
      ) <rect x="0" y="13" rx="4" ry="4" width="152" height="18" />
</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

  .content-loader
    &__inner
      width: 100%
      background-color: THRIVA.colours.white
      padding: 20px 20px 70px
      margin: 0 auto 30px
      radius(lg)
      shadow(sm)

      .divider
        margin-bottom: 10px

</style>
