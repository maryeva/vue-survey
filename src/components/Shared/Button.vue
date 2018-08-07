<script>
export default {
  name: 'ThvButton',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: value => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    element: {
      type: String,
      default: 'a',
      validator: value => {
        return ['a', 'button', 'nuxtLink', 'routerLink'].includes(value)
      }
    },
    type: {
      type: String,
      default: 'primary',
      validator: value => {
        return ['primary', 'transparent'].includes(value)
      }
    },
    link: {
      type: String,
      default: '#'
    },
    colour: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    colourModifierClass () {
      if (this.colour) {
        return `button--${this.colour}`
      } else {
        return null
      }
    }
  }
}
</script>

<template lang='pug'>
  span
    a.button(
      v-if='element==="a"', 
      :class="['button--' + size, colourModifierClass, type]", 
      :href='link'
    )
      slot(name='icon')
      slot

    button.button(
      :disabled='disabled',
      v-else-if='element==="button"', 
      :class="['button--' + size, colourModifierClass, type]", 
      @click='$emit("click")'
    )
      slot(name='icon')
      slot

    nuxt-link.button(
      v-else-if='element==="nuxtLink"', 
      :class="['button--' + size, colourModifierClass, type]", 
      :to='link'
    )
      slot(name='icon')
      slot

    router-link.button(
      v-else-if='element==="routerLink"', 
      :class="['button--' + size, colourModifierClass, type]", 
      :to='link'
    )
      slot(name='icon')
      slot
    

    
</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

  a.button,
  button.button
    position: relative;
    background-color: THRIVA.colours.blue
    border: 2px solid THRIVA.colours.blue
    border-radius: rem-calc(100px)
    height: h = rem-calc(40px)
    line-height: (h/1.09)
    font: rem-calc(16px)/h THRIVA.global.font-family
    font-weight: THRIVA.typography.font-weights.regular
    padding: 0 (h/1.5)
    min-width: 105px
    color: THRIVA.colours.white
    margin: 0
    display: inline-block
    transition: 0.2s
    text-align: center
    outline: none
    cursor pointer
    text-decoration none

    &--large
      height: h = rem-calc(46px)
      line-height: (h/1.09)
      padding: 0 (h/1.5)

    &--small
      font-size: rem-calc(14px)
      height: h = rem-calc(32px)
      line-height: (h/1.09)
      padding: 0 (h/2)

    &:hover
      +media-breakpoint-up(md)
        transform: translateY(-3px)
        background-color: lighten(THRIVA.colours.blue, 10%)
        border: 2px solid lighten(THRIVA.colours.blue, 10%)
        box-shadow: 0 1px 4px 0 rgba(THRIVA.colours.xx-dark-grey,0.18)
        color: THRIVA.colours.white
        position: relative

        &:before
          content: ''
          height: 10px
          width: 100%
          background: transparent
          position: absolute
          bottom: -3px
          left: 0

    &:active
      transform: translateY(0)
      background-color: darken(THRIVA.colours.blue, 15%)
      border: 2px solid darken(THRIVA.colours.blue, 15%)

    &:focus
      &:active
        &:before
          display: none

    &:focus
      &:after
        content: ''
        position: absolute
        border-radius: rem-calc(100px)
        top: n = -3px
        right: n
        bottom: n
        left: n
        border: 2px solid THRIVA.colours.white
        box-shadow: 0 0 rem-calc(6px) 0 THRIVA.colours.blue
      
    &.disabled, &:disabled
      cursor: default
      opacity: 0.4
      &:hover, &:active, &:focus
        transform: translateY(0)
        box-shadow: none
        background-color: THRIVA.colours.blue

    &--secondary
      background-color: THRIVA.colours.light-purple
      border: 2px solid THRIVA.colours.light-purple
      &:hover
        background-color: lighten(THRIVA.colours.light-purple, 10%)
        border: 2px solid lighten(THRIVA.colours.light-purple, 10%)
      &:active
        background-color: darken(THRIVA.colours.light-purple, 15%)
        border: 2px solid darken(THRIVA.colours.light-purple, 15%)
      &:focus
        &:after
          box-shadow: 0 0 rem-calc(6px) 0 THRIVA.colours.light-purple


    for colour in THRIVA.colours
      &--{colour}
        background-color: THRIVA.colours[colour]
        border: 2px solid @background-color
        &:hover
          background-color: lighten(@background-color, 10%)
          border: 2px solid lighten(@background-color, 10%)
        &:active
          background-color: lighten(@background-color, 15%)
          border: 2px solid lighten(@background-color, 15%)
        &:focus
          &:after
            box-shadow: 0 0 rem-calc(6px) 0 @background-color

    &--static:hover
      transform: none
      box-shadow: none

    &.transparent
      background-color: #FFFFFF
      border: 2px solid THRIVA.colours.light-grey
      color: THRIVA.colours.xx-dark-grey

      &:hover
        background-color: #FFFFFF
        border: 2px solid lighten(THRIVA.colours.light-grey, 40%)
        color: THRIVA.colours.xx-dark-grey

</style>
