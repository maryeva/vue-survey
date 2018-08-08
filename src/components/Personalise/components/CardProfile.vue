<script>
  export default {
    name: 'CardProfile',
    props: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        default: null
      },
      color: {
        type: String,
        default: 'blue'
      },
      removed: {
        type: Boolean,
        default: false
      },
      showCloseIcon: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      emit (event) {
        this.$emit(event, this.id)
      }
    }
  }
</script>

<template lang='pug'>
  li.card-profile(:class='{ "card-profile__removed" : removed }')
    .card-profile__icon(v-if='!removed', :class='["card-profile__icon--" + color]')
    span.card-profile__name {{ name }}
    span.card-profile__price(v-if='price && !removed') &nbsp;(£{{ price | formatPrice }})
    span(v-if='removed') &nbsp;removed
    .card-profile__action.card-profile__close(v-if='!removed && showCloseIcon', @click='emit("remove")')
    .card-profile__action.card-profile__undo(v-else-if='removed', @click='emit("undo")') UNDO
</template>

<style lang='stylus'>
  .card-profile
    width: 100%
    height: 20px
    position: relative
    font-size: 14px
    line-height: 21px
    color: #565B75
    font-weight: 400
    display: flex
    align-items: center

    @media (min-width: 768px)
      font-size: 16px
      line-height: 24px

    &__name
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

      @media (min-width: 768px)
        max-width: 200px

    &__action
      justify-self: right
      margin-left: auto
      cursor: pointer

    &__close
      width: 20px
      height: 20px
      background-color: #FA476F
      mask: url('~/static/images/icons/cross-20.svg') no-repeat center

      @media (min-width: 768px)
        width: 24px
        height: 24px
        mask: url('~/static/images/icons/cross-24.svg') no-repeat center

    &__undo
      font-size: 16px
      color: #3ECADD
      font-style: normal

    &__icon
      width: 20px
      height: 20px
      margin-right: 10px
      background-color: #AEEC73
      mask: url('~/static/images/icons/personalisation-24.svg') no-repeat center

      &--blue
        background-color: #3ECADD

      &--baseline
        background-color: #FFC662

      &--advanced
        background-color: #664277

    &__removed
      font-style: italic
      font-weight: normal
      color: #CED0D9

    &__price
      color: #99A2BF
      font-size: 14px
      margin-right: 10px
      
</style>
