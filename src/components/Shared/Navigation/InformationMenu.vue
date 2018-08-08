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
          color: #565B75
          padding: 13px 0
          display: flex
          align-items: center
          position: relative
          font-weight: 400
          font-size: 18px
          
          &.router-link-active
            &::before
              content: ''
              position: absolute
              width: 5px
              height: 5px
              border-radius: 50%
              left: 15px
              top: 15px
              background: #FA476F
            
        &:hover
          background-color: #F7F9FB
          
        &--title
          letter-spacing: 2px
          text-transform: uppercase
          padding: 10px 0
          overflow: hidden
          color: #99A2BF
          
          &:hover
            background: none
          
        &.divider
          display: none
          
    @media (min-width: 768px)
      margin-top: 0
      .information-menu__list
        padding: 0
        .information-menu__item
          padding: 0 30px
          &--title
            display: none
          a
            font-size: 16px
            padding: 10px 0
        
      .information-menu__item--divider
        display: block
        margin: 10px 0
        width: 100%
        height: 2px
        background: #EFF4F7
</style>
