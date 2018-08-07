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
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

  .card-profile
    width: 100%
    height: 20px
    position: relative
    font-size: 14px
    line-height: 21px
    color: THRIVA.colours.xx-dark-grey
    font-weight: THRIVA.typography.font-weights.regular
    display: flex
    align-items: center

    +media-breakpoint-up(md)
      font-size: 16px
      line-height: 24px

    &__name
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

      +media-breakpoint-up(md)
        max-width: 200px

    &__action
      justify-self: right
      margin-left: auto
      cursor: pointer

    &__close
      width: 20px
      height: 20px
      background-color: THRIVA.colours.pink
      mask: url('~@thrivadev/thriva-ui/src/assets/images/icons/cross-20.svg') no-repeat center

      +media-breakpoint-up(md)
        width: 24px
        height: 24px
        mask: url('~@thrivadev/thriva-ui/src/assets/images/icons/cross-24.svg') no-repeat center

    &__undo
      font-size: 16px
      color: THRIVA.colours.blue
      font-style: normal

    &__icon
      width: 20px
      height: 20px
      margin-right: 10px
      background-color: THRIVA.colours.green
      mask: url('~@thrivadev/thriva-ui/src/assets/images/icons/personalisation-24.svg') no-repeat center

      &--blue
        background-color: THRIVA.colours.blue

      &--baseline
        background-color: THRIVA.colours.orange

      &--advanced
        background-color: THRIVA.colours.purple

    &__removed
      font-style: italic
      font-weight: normal
      color: THRIVA.colours.input-border-grey

    &__price
      color: THRIVA.colours.grey
      font-size: rem-calc(14px)
      margin-right: 10px
      
</style>
