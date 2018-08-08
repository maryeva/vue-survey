<script>
  import Navigation from './Navigation'
  import Logomark from '@/assets/images/logos/logomark.svg'

  export default {
    name: 'Header',
    components: {
      Navigation
    },
    props: {
      partner: {
        type: Object
      }
    },
    computed: {
      logoSrc () {
        if (this.partner && this.partner.cobranding) {
          return this.partner.logos.cobranding_alt
        } else {
          return Logomark
        }
      }
    },
    methods: {
      closeMobileNav () {
        this.$children[2].closeMenuOnClick()
      },
      // TODO - Move this somewhere else
      async logout () {
        this.$store.dispatch('auth/DESTROY_TOKEN')
      }
    }
  }
</script>

<template lang='pug'>
  header.header
    .header__container
      a.header__logo.header__logo--logomark(href='/dashboard')
        img(:src='logoSrc')
      navigation(@logout='logout')
</template>

<style lang='stylus'>

  height=62px

  .header
    width: 100%
    background: #FFFFFF
    z-index: 100
    max-width: 1680px

    .header__container
      max-width: 1200px
      background-color: #FFFFFF      
      margin: auto
      padding: 0 20px
      position: relative
      height: height
      display: flex
      flex-wrap: nowrap
      align-items: center
      justify-content: space-between
      border-bottom: 1px solid #E5E7F1
      z-index: 100

      @media (min-width: 768px)
        padding: 0 30px
        border-bottom: none

      .header__logo
        height: 30px
        img
          height: 100%

        &--full
          display: none

  @media (min-width: 768px)
    .header
      position: fixed
      top: 0
      border-bottom: 1px solid #E5E7F1

</style>
