<script>
  import PersonaliseHeading from '@/components/Personalise/components/PersonaliseHeading'
  import ThvButton from '@/components/Shared/Button'

  export default {
    name: 'ProfileCard',
    components: {
      PersonaliseHeading,
      ThvButton
    },
    props: {
      profile: {
        type: Object,
        required: true
      },
      price: {
        type: Number,
        default: 0
      },
      added: {
        type: Boolean,
        default: false
      },
      coreSubscriptionPanel: {
        type: String,
        required: true
      }
    },
    computed: {
      buttonColour () {
        return this.added ? 'pink' : ''
      },
      buttonType () {
        return this.added ? 'primary' : 'transparent'
      }
    },
    methods: {
      toggleProfile () {
        this.$emit('toggleProfile', this.profile)
      }
    }
  }
</script>

<template lang='pug'>
  .profile-card
    .profile-card-header
      p.profile-card-header__name {{ profile.attributes.name }}
      p.profile-card-header__price + £{{ price | formatPrice }}
    .divider
    .profile-card-category
      span.profile-card-category__icon {{ profile.attributes.categories[0] ? profile.attributes.categories[0].substring(0, 1) : '' }}
      span.profile-card-category__name {{ profile.attributes.categories[0] ? profile.attributes.categories[0] : '' }}
    .divider
    .profile-card-body
      p.profile-card-body__description {{ profile.attributes.description }}
    .divider
    .profile-card-footer
      .profile-card-footer__warnings
        .profile-card-footer__warnings__timing(v-if='profile.attributes.lab.processing_time && profile.attributes.lab.processing_time > 1')
          .profile-card-footer__warnings__timing__image
          span {{ profile.attributes.lab.processing_time }} working days to process
      ThvButton.profile-card-footer__button(
        element='button',
        :type='buttonType'
        :colour='buttonColour'
        size='large',
        @click='toggleProfile'
      ) {{ added ? 'Remove' : 'Add' }}

</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

    .profile-card
      padding: 0 0 20px
      margin: 30px auto
      background-color: THRIVA.colours.white
      radius(lg)
      shadow(md)

      &-header
        padding: 20px 30px 0 30px
        min-height: 105px
        position: relative
        overflow: hidden

        &__name, &__price
          color: THRIVA.colours.xx-dark-grey
          font-size: rem-calc(20px)
          font-weight: THRIVA.typography.font-weights.regular

        &__name
          margin-bottom: 0

        &__price
          padding: 0
          color: THRIVA.colours.dark-grey

      &-category
        padding: 18px 20px
        text-transform: uppercase
        color: THRIVA.colours.dark-grey
        font-size: rem-calc(14px)
        letter-spacing: 1px

        +media-breakpoint-up(md)
          padding: 18px 30px

        &__icon
          display: inline-flex
          justify-content: center
          align-items: center
          width: 24px
          height: 24px
          background-color: THRIVA.colours.xx-light-grey
          border: 1px solid THRIVA.colours.light-grey
          border-radius: 50%
          margin-right: 10px
          color: THRIVA.colours.xx-dark-grey
          font-weight: THRIVA.typography.font-weights.regular
          padding-bottom: 2px

      &-body
        padding: 0 20px

        +media-breakpoint-up(md)
          padding: 0 30px

        &__description
          padding: 20px 0

      &-footer
        position: relative
        padding: 0 20px
        margin-top: 20px

        +media-breakpoint-up(md)
          height: 66px
          padding: 0 30px
          margin-top: 0

        &__warnings
          height: 100%
          display: flex
          flex-flow: row wrap
          align-items: center

          &__timing, &__sample
            display: flex
            width: 100%

            +media-breakpoint-up(md)
              margin-bottom: 0
              display: flex
              align-items: center

            &__image
              display: inline-block
              width: 16px
              height: 16px
              margin: 2px 5px 0 0
              background-color: THRIVA.colours.orange
              mask: url('~@thrivadev/thriva-ui/src/assets/images/icons/error-16.svg') no-repeat center

            span
              font-size: rem-calc(14px)
              color: THRIVA.colours.xx-dark-grey

          &__timing
            margin-bottom: 3px

            +media-breakpoint-up(md)
              margin: auto

          &__sample
            margin-top: 3px
            margin-bottom: 15px

            +media-breakpoint-up(md)
              margin: auto

        &__button
          +media-breakpoint-up(md)
            position: absolute
            top: 20px
            right: 30px

          button.button
            width: 100%

            +media-breakpoint-up(md)
              width: 160px

      .divider
        margin: 0 20px

        +media-breakpoint-up(md)
          margin: 0 30px

</style>
