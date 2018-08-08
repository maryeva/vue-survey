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

  .personalise-hero
    position: relative
    width: 100%
    margin-top: -20px
    margin-bottom: 40px
    background-color: #FFFFFF
    border-bottom: 1px solid #E5E7F1
    overflow: hidden

    &__text
      padding: 30px 0

      @media (min-width: 768px)
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

      @media (min-width: 768px)
        right: 58px
        top: -55px

      @media (min-width: 1024px)
        right: 138px
        top: -35px

    .pill__right
      position: relative
      z-index: 10
      width: 100%

      &:before
        position: absolute
        pill(175px, #AEEC73, 45deg, vertical)
        background-color: white
        border-color: #F0DBCC
        border: 25px solid #F0DBCC
        display: block
        top: -200px
        right: -260px

        @media (min-width: 768px)
          top: -90px
          right: -60px

        @media (min-width: 1024px)
          top: -80px
          right: 10px
</style>
