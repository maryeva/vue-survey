<script>
  export default {
    name: 'PersonaliseHero'
  }
</script>

<template lang='pug'>
  .personalise-hero
    img(src='~/assets/images/icons/dots.svg')
    .pill__right
    .grid-container
      .grid-x.grid-margin-x
        .cell.small-12.large-offset-1.personalise-hero__text
          slot(name='text')
</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

  .personalise-hero
    position: relative
    width: 100%
    margin-top: -20px
    margin-bottom: 40px
    background-color: THRIVA.colours.white
    border-bottom: 1px solid THRIVA.colours.light-grey
    overflow: hidden

    &__text
      padding: 30px 0

      +media-breakpoint-up(md)
        padding: 60px 0

    h2
      margin: 0

    p
      max-width: 500px
      margin-top: 10px
      font-weight: 300

    img
      position: absolute
      z-index: 20
      width: 220px
      right: -140px
      top: -115px

      +media-breakpoint-up(md)
        right: 58px
        top: -55px

      +media-breakpoint-up(lg)
        right: 138px
        top: -35px

    .pill__right
      position: relative
      z-index: 10
      width: 100%

      &:before
        position: absolute
        pill(175px, THRIVA.colours.green, 45deg, vertical)
        background-color: white
        border-color: THRIVA.colours.sand
        border: 25px solid THRIVA.colours.sand
        display: block
        top: -200px
        right: -260px

        +media-breakpoint-up(md)
          top: -90px
          right: -60px

        +media-breakpoint-up(lg)
          top: -80px
          right: 10px
</style>
