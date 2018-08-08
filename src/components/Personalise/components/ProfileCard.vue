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

    .profile-card
      padding: 0 0 20px
      margin: 30px auto
      background-color: #FFFFFF
      border-radius: 10px
      box-shadow: 0 6px 20px 0 rgba(#3D4250, 0.18)

      &-header
        padding: 20px 30px 0 30px
        min-height: 105px
        position: relative
        overflow: hidden

        &__name, &__price
          color: #565B75
          font-size: 20px
          font-weight: 400

        &__name
          margin-bottom: 0

        &__price
          padding: 0
          color: #6F749A

      &-category
        padding: 18px 20px
        text-transform: uppercase
        color: #6F749A
        font-size: 14px
        letter-spacing: 1px

        @media (min-width: 768px)
          padding: 18px 30px

        &__icon
          display: inline-flex
          justify-content: center
          align-items: center
          width: 24px
          height: 24px
          background-color: #F7F9FB
          border: 1px solid #E5E7F1
          border-radius: 50%
          margin-right: 10px
          color: #565B75
          font-weight: 400
          padding-bottom: 2px

      &-body
        padding: 0 20px

        @media (min-width: 768px)
          padding: 0 30px

        &__description
          padding: 20px 0

      &-footer
        position: relative
        padding: 0 20px
        margin-top: 20px

        @media (min-width: 768px)
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

            @media (min-width: 768px)
              margin-bottom: 0
              display: flex
              align-items: center

            &__image
              display: inline-block
              width: 16px
              height: 16px
              margin: 2px 5px 0 0
              background-color: #FFC662
              mask: url('~/static/images/icons/error-16.svg') no-repeat center

            span
              font-size: 14px
              color: #565B75

          &__timing
            margin-bottom: 3px

            @media (min-width: 768px)
              margin: auto

          &__sample
            margin-top: 3px
            margin-bottom: 15px

            @media (min-width: 768px)
              margin: auto

        &__button
          @media (min-width: 768px)
            position: absolute
            top: 20px
            right: 30px

          button.button
            width: 100%

            @media (min-width: 768px)
              width: 160px

      .divider
        margin: 0 20px

        @media (min-width: 768px)
          margin: 0 30px

</style>
