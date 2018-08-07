<script>
  export default {
    name: 'InformationMenu',
    props: {
      items: {
        type: Array,
        required: true
      },
      email: {
        type: String,
        default: 'Account'
      }
    },
    methods: {
      menuItemClicked (menuItem) {
        this.$emit('menuItemClicked', menuItem)
      }
    }
  }
</script>

<template lang='pug'>
  .information-menu
    ul.information-menu__list
      li.information-menu__item.information-menu__item--title {{ email }}
      li.information-menu__item(v-for='item in items', @click='menuItemClicked(item)')
        a(:href='item.path') {{ item.name }}
</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/mixins'

  .information-menu
    padding: 20px 0
    margin-top: 5px
    .information-menu__list
      padding: 0 30px
      margin: 0
      .information-menu__item
        list-style: none
        a
          text-decoration: none
          color: THRIVA.colours.xx-dark-grey
          padding: 13px 0
          display: flex
          align-items: center
          position: relative
          font-weight: THRIVA.typography.font-weights.regular
          font-size: rem-calc(18px)
          
          &.router-link-active
            &::before
              content: ''
              position: absolute
              width: 5px
              height: 5px
              border-radius: 50%
              left: 15px
              top: 15px
              background: THRIVA.colours.pink
            
        &:hover
          background-color: THRIVA.colours.xx-light-grey
          
        &--title
          letter-spacing: 2px
          text-transform: uppercase
          padding: 10px 0
          overflow: hidden
          color: THRIVA.colours.grey
          
          &:hover
            background: none
          
        &.divider
          display: none
          
    +media-breakpoint-up(md)
      margin-top: 0
      .information-menu__list
        padding: 0
        .information-menu__item
          padding: 0 30px
          &--title
            display: none
          a
            font-size: rem-calc(16px)
            padding: 10px 0
        
      .information-menu__item--divider
        display: block
        margin: 10px 0
        width: 100%
        height: 2px
        background: THRIVA.colours.x-light-grey
</style>
