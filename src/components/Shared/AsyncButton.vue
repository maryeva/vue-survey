<script>
  export default {
    name: 'AsyncButton',
    props: {
      text: {
        type: String,
        required: true
      },
      waiting: {
        type: Boolean,
        default: false
      },
      error: {
        type: Boolean,
        default: false
      },
      success: {
        type: Boolean,
        default: false
      },
      confirm: {
        type: String,
        default: ''
      },
      displayErrorTimeout: {
        type: Number,
        default: 1000
      },
      displaySuccessTimeout: {
        type: Number,
        default: -1
      },
      type: {
        type: String,
        default: 'primary',
        validator: value => {
          return ['primary', 'transparent'].includes(value)
        }
      },
      colour: {
        type: String,
        required: false
      }
    },
    data () {
      return {
        displayError: false,
        displaySuccess: false
      }
    },
    methods: {
      handleClick () {
        if (this.confirm) {
          let confirmed = confirm(this.confirm)
          if (confirmed) {
            this.$emit('click')
          }
        } else {
          this.$emit('click')
        }
      }
    },
    computed: {
      buttonText () {
        if (this.waiting) return 'Submitting...'
        else if (this.displayError) return 'Error'
        else if (this.displaySuccess) return 'Success'
        else return this.text
      },
      colourModifierClass () {
        if (this.colour) {
          return `button--${this.colour}`
        } else {
          return null
        }
      }
    },
    watch: {
      error () {
        if (this.error) {
          this.displayError = true
          setTimeout(() => {
            this.displayError = false
          }, this.displayErrorTimeout)
        } else {
          this.displayError = false
        }
      },
      success () {
        if (this.success) {
          this.displaySuccess = true
          if (this.displaySuccessTimeout >= 0) {
            setTimeout(() => {
              this.displaySuccess = false
            }, this.displaySuccessTimeout)
          }
        } else {
          this.displaySuccess = false
        }
      }
    }
  }
</script>

<template lang="pug">
  button.button.button--async(
    @click.prevent='handleClick',
    :class='[{ error: displayError }, { success: displaySuccess }, { waiting: waiting }, colourModifierClass, type]',
    tabindex=0,
    @keyup.enter='handleClick'
    :disabled='waiting'
  )
    span.spinner(v-if='waiting')
    span.label {{ this.buttonText }}
</template>

<style lang="stylus">

  .button.button--async
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) all
    position: relative
    height: 46px

    &.disabled, &:disabled
      cursor: default

    &.waiting
      opacity: 0.6
      pointer: default
      &:hover, &:active, &:focus
        transform: translateY(0)
        box-shadow: none
        // background-color: #3ECADD
      .label
        padding-left: 30px

    &.error
      background-color: #FA476F
      border-color: #FA476F
      cursor: default

      &:hover, &:active, &:focus
        transform: translateY(0)
        box-shadow: none
        background-color: #FA476F
        border-color: #FA476F

    &.success
      background-color: #AEEC73
      border-color: #AEEC73
      cursor: default

      &:hover, &:active, &:focus
        transform: translateY(0)
        box-shadow: none
        background-color: #AEEC73
        border-color: #AEEC73

    &.transparent
      .spinner
        &:before
          border-top-color: #565B75
          border-left-color: #565B75

    @keyframes spinner
      to {transform: rotate(360deg)}

  .spinner
    margin-right: 10px
    &:before
      position: absolute
      content: ''
      top: 10px
      height: 20px
      width: 20px
      z-index: 1
      border: 3px solid transparent
      border-top-color: #FFFFFF
      border-left-color: #FFFFFF
      border-radius: 50%
      animation: spinner 0.5s linear infinite
</style>
