<script>
  import InformationMenu from './Navigation/InformationMenu'

  import { mapState } from 'vuex'

  const navigationDropdownActiveClass = 'navigation--dropdown-active'
  const menuItemActiveClass = 'menu__item--active'
  const menuItemInactiveClass = 'menu__item--inactive'
  const menuItemDropdownClass = 'menu__item--dropdown'

  const accountMenuItems = [
    { name: 'Health profile', path: '#' },
    { name: 'Settings', path: '#' },
    { name: 'Invite friends', path: '#' },
    { name: 'Logout', path: '#' }
  ]

  export default {
    name: 'Navigation',
    components: { InformationMenu },
    data () {
      return {
        navigationToggleActive: false,
        menuItems: [
          {
            title: 'Personalise',
            href: '#'
          },
          {
            title: 'Tests',
            href: '#'
          },
          {
            title: 'Subscriptions',
            href: '#'
          },
          {
            title: 'Account',
            dropdownMenu: 'account',
            href: '#'
          }
        ],
        dropdownMenus: {
          account: accountMenuItems
        }
      }
    },
    mounted () {
      if (process.browser) {
        window.addEventListener('resize', this.resetDropdownPosition)
      }
    },
    methods: {
      toggleMobileNav () {
        if (this.$refs.navigation.classList.contains(navigationDropdownActiveClass)) {
          this.$refs.navigation.classList.remove(navigationDropdownActiveClass)
          document.querySelector('body').classList.remove(navigationDropdownActiveClass)
        } else {
          this.$refs.navigation.classList.add(navigationDropdownActiveClass)
          document.querySelector('body').classList.add(navigationDropdownActiveClass)
        }
        this.$store.commit('resource/MOBILE_NAV_OPEN')
      },
      enterMenuLink (event) {
        if (event.target.classList.contains(menuItemDropdownClass)) {
          this.showDropdownMenu(event.target)
        } else {
          this.hideDropdownMenu()
        }

        for (const item of this.menuItemNodes()) {
          if (event.target === item) {
            item.classList.add(menuItemActiveClass)
            item.classList.remove(menuItemInactiveClass)
          } else {
            item.classList.remove(menuItemActiveClass)
            item.classList.add(menuItemInactiveClass)
          }
        }
      },
      leaveMenuLink (event) {
        setTimeout(() => {
          if (this.mayHideDropDownMenu()) {
            this.hideDropdownMenu()
          }
        }, 200)
      },
      leaveDropdownMenu (event) {
        setTimeout(() => {
          if (this.mayHideDropDownMenu()) {
            this.hideDropdownMenu()
            this.resetMenuItems()
          }
        }, 150)
      },
      leaveMenu () {
        setTimeout(() => {
          if (!this.dropdownMenuVisible()) {
            this.resetMenuItems()
          }
        }, 300)
      },
      resetDropdownPosition () {
        const dropdownBg = this.$refs.dropdownBg
        const dropdownWrapper = this.$refs.dropdownWrapper
        // Set sub menu style
        Object.assign(dropdownWrapper.style, {
          transform: 'translateX(0)',
          width: 'auto',
          height: 'auto'
        })

        // Set dropdown menu background style to match current submenu style
        Object.assign(dropdownBg.style, {
          transform: 'scaleX(0) scaleY(0)',
          width: 'auto',
          height: 'auto'
        })
      },
      showDropdownMenu (el) {
        (function () {
          if (typeof NodeList.prototype.forEach === 'function') return false
          NodeList.prototype.forEach = Array.prototype.forEach
        }())
        const dropdownBg = this.$refs.dropdownBg
        const dropdownWrapper = this.$refs.dropdownWrapper
        const dropdownMenu = this.$el.querySelector(`.dropdown-menu[data-menu="${el.getAttribute('data-dropdown-menu-id')}"]`)
        const dropdownMenuContent = dropdownMenu.querySelector('.dropdown-menu__content')
        // get position of menu item and dropdown menu
        const menuItemRect = el.getBoundingClientRect()
        const dropdownMenuContentRect = dropdownMenuContent.getBoundingClientRect()

        // Remove active sub menu and mark new one as active
        this.dropdownMenuNodes().forEach((el) => {
          if (el !== dropdownMenu) {
            el.classList.remove('active')
          } else {
            el.classList.add('active')
          }
        })

        // Set sub menu style
        Object.assign(dropdownWrapper.style, {
          transform: `translateX(${(el.offsetLeft + (menuItemRect.width / 2) - (dropdownMenuContentRect.width / 2)) + 'px'})`,
          width: dropdownMenuContentRect.width + 'px',
          height: dropdownMenuContentRect.height + 'px'
        })

        // Set dropdown menu background style to match current submenu style
        Object.assign(dropdownBg.style, {
          transform: `scaleX(${dropdownMenuContentRect.width + 'px'}) scaleY(${dropdownMenuContentRect.height + 'px'})`,
          width: dropdownMenuContentRect.width + 'px',
          height: dropdownMenuContentRect.height + 'px'
        })

        if (!this.$refs.navigation.classList.contains(navigationDropdownActiveClass)) {
          setTimeout(() => {
            this.$refs.navigation.classList.add(navigationDropdownActiveClass)
          }, 50)
        }
      },
      hideDropdownMenu () {
        for (let el of this.dropdownMenuNodes()) { el.classList.remove('active') }
        this.$refs.navigation.classList.remove(navigationDropdownActiveClass)
      },
      mayHideDropDownMenu () {
        return (!this.$el.querySelector('.dropdown__wrap:hover') && !this.$el.querySelector('.menu__item--dropdown:hover'))
      },
      dropdownMenuVisible () {
        return this.$refs.navigation.classList.contains(navigationDropdownActiveClass)
      },
      resetMenuItems () {
        for (const item of this.menuItemNodes()) {
          item.classList.remove(menuItemInactiveClass)
          item.classList.remove(menuItemActiveClass)
        }
      },
      menuItemNodes () {
        return this.$el.querySelectorAll('.menu__item')
      },
      dropdownMenuNodes () {
        return this.$el.querySelectorAll('.dropdown-menu')
      },
      closeMenuOnClick () {
        if (window.matchMedia('(min-width: 768px)').matches) {
          this.hideDropdownMenu()
        } else {
          this.$refs.navigation.classList.remove(navigationDropdownActiveClass)
          document.querySelector('body').classList.remove(navigationDropdownActiveClass)
        }
      },
      handleMenuItemClicked (menuItem) {
        if (menuItem.click) { this.$emit(menuItem.click) }
        this.closeMenuOnClick()
      },
      currentRoute (item) {
        // stop gap until we can use router-link for everything in this app
        return this.$route.path === item.href
      }
    },
    computed: {
      ...mapState('auth', {
        email: state => state.resourceOwner.attributes.email
      })
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.resetDropdownPosition)
    }
  }
</script>

<template lang='pug'>
  nav.navigation(ref='navigation')
    .menu(@mouseleave='leaveMenu')
      a.menu__item(
        v-for='(item, key) in menuItems',
        :key='key'
        href='#'
        :class='[{"menu__item--dropdown": item.dropdownMenu, "current-route" : currentRoute (item)}]',
        :data-dropdown-menu-id='item.dropdownMenu',
        @mouseover='enterMenuLink',
        @mouseleave='leaveMenuLink',
        @click='item.href === "#" ? $event.preventDefault() : null'
        :target='item.target',
        :rel='item.rel'
      ) {{ item.title }}

    .dropdown-holder(@mouseleave='leaveDropdownMenu')
      .dropdown__wrap(ref='dropdownWrapper')
        .dropdown-menu#product(data-menu="product")
          .dropdown-menu__content
        .mobile-menu-extension
          a.menu__item.menu__item--mobile(href='#')
            span.menu__item.menu__item__personalise Personalise
        .mobile-menu-extension
          a.menu__item.menu__item--mobile(href='#')
            span Tests
        .mobile-menu-extension.subscription
          a.menu__item.menu__item--mobile(href='#')
            span Subscriptions

        .dropdown-menu#information(data-menu="account")
          .dropdown-menu__content
            information-menu(
              @menuItemClicked='handleMenuItemClicked',
              :items='dropdownMenus.account',
              :email='menuItems[3].title'
            )

        .dropdown__bg(ref='dropdownBg')

    .navigation__responsive-menu
      a.navigation__toggle(
        @click='toggleMobileNav'
      )
         .bar
         .bar
         .bar
</template>

<style lang='stylus'>

  mobileMenuOffset=62px
  mobileMenuBackgroundColor=#EFF4F7

  toggleHeight=32px
  toggleBarWidth=32px
  toggleBarHeight=3px
  toggleBarRadius=3px

  menuItemFontSize=16px

  body.navigation--dropdown-active
    position: fixed
    overflow-x: hidden
    overflow-y: scroll
    left: 0
    right: 0

    .dropdown-holder
      overflow-x: hidden
      overflow-y: scroll

    .header
      position: fixed
      left: 0
      top: 0

    // 😳
    .content
      margin-top: 1000px

  .navigation
    height: inherit
    overflow: scroll
    z-index: 999
    display: flex
    justify-content: flex-end
    align-items: center

    @media (min-width: 768px)
      overflow: hidden

    // Mobile navigation toggle
    .navigation__toggle
      position: relative
      margin-left: 20px
      width: toggleHeight
      height: toggleHeight
      display: flex
      flex-direction: column
      justify-content: space-around
      padding: 4px 0

      .bar
        position: absolute
        width: toggleBarWidth
        height: toggleBarHeight
        border-radius: toggleBarRadius
        background-color: #565B75
        transition: all 0.25s ease-in-out
      :first-child
        transform: translateY(-8px)
      :last-child
        transform: translateY(8px)
      :nth-child(2)
        transition: all 0.15s ease-in-out

    &--dropdown-active
      .navigation__toggle
        :first-child
          transform: rotate(45deg)
        :last-child
          transform: rotate(-45deg)
        :nth-child(2)
          opacity: 0

    .navigation__cta
      margin: 0 3px 0 40px
      width: 140px
      display: flex
      justify-content: center
      align-items: center

    // Hide menu items for mobile
    .menu
      display: none

      a.menu__item
        display: flex
        align-items: center

        &:first-child
          position: relative
          padding-right: 64px

          &:after
            content: 'new'
            position: absolute
            width: 36px
            height: 16px
            font-size: rem-calc(10px)
            right: 18px
            letter-spacing: 1px
            text-transform: uppercase
            color: #FFFFFF
            text-align: center
            background-color: #664277
            display: inline-block
            border-radius: 10px

    .mobile-menu-extension
      padding: 0 30px

      &.subscription
        padding-bottom: 25px

      .menu__item
        color: #565B75
        text-decoration: none
        font-weight: 400
        font-size: rem-calc(18px)
        display: block
        padding: 15px 0 13px

        &__personalise
          position: relative
          padding: 0

          &:after
            content: 'new'
            position: absolute
            width: 36px
            height: 16px
            font-size: rem-calc(10px)
            left: 105px
            letter-spacing: 1px
            text-transform: uppercase
            color: #FFFFFF
            text-align: center
            background-color: #664277
            display: inline-block
            border-radius: 10px

        img
          height: 17px
          width: 17px
          margin-left: 10px

    // Style mobile full screen menu
    .dropdown
      &-holder
        display: none

    &--dropdown-active
      .dropdown
        &-holder
          display block
          width: 100%
          height: 100%
          padding-bottom: 62px
          position: fixed
          top: 0
          left: 0
          top: mobileMenuOffset

        // On mobile, use this container as the menu background
        &__wrap
          background-color: #FFFFFF
          margin: 20px
          padding-top: 15px
          padding-bottom: 5px
          border-radius: 10px
          box-shadow: 0 6px 20px 0 rgba(#3D4250, 0.18)

          .dropdown-menu
            border-top: 1px solid #E5E7F1

            &:first-of-type
              border-top: none

    @media (min-width: 768px)
      .navigation__toggle
        display: none
      .menu
        height: inherit
        list-style: none
        margin: 0
        padding-left: 0
        display: flex
        justify-content: center
        &__item
          height: 100%
          position: relative
          padding: 20px
          display: block
          text-decoration: none
          color: #565B75
          font-weight: 400
          transition: all 0.1s ease-in
          &--dropdown
            cursor: default
          &--inactive
            opacity: 0.35
            &[data-dropdown-menu-id="account"]
              &:before
                border-left-color: darken(#E5E7F1, 18%)
          &:hover
            opacity: 1

          &.current-route::before
            content: ''
            position: absolute
            top: 30px
            left: 7px
            height: 5px
            width: 5px
            background: #FA476F
            border-radius: 50%

      .mobile-menu-extension
        display: none

      .dropdown-holder
        display: block
        left: 0
        top: 100%
        width: auto
        height: auto
        /* Force Hardware acceleration */
        transform-style: preserve3d;
        perspective: 3000px
        will-change: transform
        transform: translateZ(0) translateY(30px)
        transition: transform 0.2s

      .dropdown__bg
        background-color: #FFFFFF
        position: absolute
        z-index: -1
        top: 0
        left: 0
        height: 1px
        width: 1px
        opacity: 0
        transition: opacity .25s
        transform-origin: 0 0
        transform: translateZ(0)
        will-change: transform
        backface-visibility: hidden
        border-radius: 10px
      .dropdown__wrap
        overflow-x: hidden
        overflow-y: visible
        margin: 0
        background-color: #FFFFFF
        position: absolute
        padding-top: 0
        top: 0
        left: 0
        visibility: hidden
        transform: translateZ(0)
        will-change: transform, width, height
        transition: visibilty .5s

        // Add transparent element before to maintain
        // hover in gap between menu and nav
        &:before
          content: ''
          height: 30px
          width: 100%
          background: blue
          display: block
          position: absolute
          top: -30px
          left: 0

        .dropdown-menu
          position: absolute
          left: 0
          top: 0
          opacity: 0
          visibility: hidden
          width: 100%
          transition: opacity .25s, visibility .25s
          border-top: none

      // Visible dropdown
      &--dropdown-active
        .dropdown-holder
          display: block
          position: absolute
          transform: translateZ(0) translateY(10px)
        .dropdown__wrap
          visibility: visible;
          opacity: 1
          transition: all .25s
          overflow: hidden

        .dropdown__bg
          opacity: 1

        .dropdown-menu
          &.active
            opacity: 1
            visibility: visible

      // Set dropdown menu widths
      #product .dropdown-menu__content
        width: 400px
      #information .dropdown-menu__content
        width: 200px

      .navigation__cta.button--hide-mobile
        display: none

      [data-dropdown-menu-id="account"]
        position: relative
        padding-left: 30px
        padding-right: 42px
        margin-left: 10px

        &:before
          content: ''
          height: 100%
          position: absolute
          left: 0
          border-left: 1px solid #E5E7F1
          transition: all 0.1s ease-in

        &:after
          content: url('/static/images/icons/chevron-16-grey.svg')
          position: absolute
          width: 16px
          height: 16px
          display: inline-block
          transform: rotate(90deg)
          right: 5px
          top: 24px

    @media (min-width: 1024px)
      .menu
        &__item
          padding-left: 30px
          padding-right: 30px

          &.current-route::before
            left: 15px
</style>
