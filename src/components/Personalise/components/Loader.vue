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

  .content-loader
    &__inner
      width: 100%
      background-color: #FFFFFF
      padding: 20px 20px 70px
      margin: 0 auto 30px
      border-radius: 10px
      box-shadow: 0 1px 4px 0 rgba(#3D4250, 0.18)

      .divider
        margin-bottom: 10px

</style>
