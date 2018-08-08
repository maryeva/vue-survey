<script>
  import Loader from '@/components/Personalise/components/Loader'
  import PersonaliseHeading from '@/components/Personalise/components/PersonaliseHeading'
  import CardProfile from '@/components/Personalise/components/CardProfile'
  import { ContentLoader } from 'vue-content-loader'
  import ThvButton from '@/components/Shared/Button'
  import AsyncButton from '@/components/Shared/AsyncButton'

  export default {
    name: 'SubscriptionCard',
    components: {
      Loader,
      PersonaliseHeading,
      AsyncButton,
      ThvButton,
      CardProfile,
      ContentLoader
    },
    props: {
      loading: {
        type: Object,
        required: true
      },
      subscriptionStatus: {
        type: String,
        required: true
      },
      coreSubscriptionPanel: {
        type: Object,
        required: true
      },
      coreSubscriptionProfiles: {
        type: Array,
        required: true
      },
      updatedSubscriptionPanel: {
        type: Object,
        required: true
      },
      profilePrices: {
        type: Object,
        required: true
      },
      panelHasChanged: {
        type: Boolean,
        default: false
      },
      addedProfiles: {
        type: Array,
        required: true
      },
      removedProfiles: {
        type: Array,
        default: () => []
      },
      submitting: {
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
      mobileNavOpen: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      stage () {
        return this.$route.name
      },
      price () {
        return this.updatedSubscriptionPanel.attributes ? this.updatedSubscriptionPanel.attributes.price : 0
      },
      heading () {
        return this.stage === 'build' ? 'Your subscription' : 'Confirm subscription'
      },
      name () {
        return this.coreSubscriptionPanel.name
      },
      buttonText () {
        if (this.subscriptionStatus === 'cancelled') return 'Reactivate subscription'
        else return 'Update subscription'
      },
      // combines removed and non-removed profiles
      allProfiles () {
        return this.addedProfiles.concat(this.removedProfiles).sort((p1, p2) => p1.id < p2.id)
      },
      oneOffTestText () {
        return this.addedProfiles.length > 1 ? 'Order add-ons as a one-off test' : 'Order add-on as a one-off test'
      },
      showTubeWarning () {
        return this.coreSubscriptionPanel.id !== 'TPIQH3' && this.addedProfiles.some(profile => {
          return profile.attributes.sample.collection_tube_variant === 'purple'
        })
      }
    },
    methods: {
      toggleProductCompare () {
        this.$emit('toggleProductCompare')
      },
      toggleProfile (profileID) {
        this.$emit('toggleProfile', { id: profileID })
      },
      toConfirm (type) {
        this.$emit('toConfirm', type)
      },
      updateSubscription () {
        this.$emit('updateSubscription')
      },
      // TODO: this implementation would be nicer using Intersection Observer, although browser support is not currently great
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      applyFixedPosition () {
        if (window.matchMedia('(min-width: 768px)').matches) {
          const card = document.querySelector('.personalise-sub')
          if (window.scrollY > 270) {
            card.classList.add('personalise-sub--fixed')
            if (window.innerHeight < 900) {
              let offset = (window.scrollY + window.innerHeight)
              let position = document.documentElement.offsetHeight - 100
              if (offset > position) {
                card.classList.remove('personalise-sub--fixed')
                card.classList.add('personalise-sub--fixed-bottom')
              } else {
                card.classList.remove('personalise-sub--fixed-bottom')
                card.classList.add('personalise-sub--fixed')
              }
            }
          } else {
            card.classList.remove('personalise-sub--fixed')
          }
        }
      },
      isRemoved (profileID) {
        return !this.addedProfiles.map(profile => profile.id).includes(profileID) && this.removedProfiles.map(profile => profile.id).includes(profileID)
      }
    },
    mounted () {
      if (window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('scroll', this.applyFixedPosition)
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.applyFixedPosition)
    }
  }
</script>

<template lang='pug'>
  .personalise-sub__wrapper
    .cell.small-12.medium-5.large-4
      // BackBreadcrumb.personalise-sub__breadcrumb(v-if='this.$route.name === "confirm"', type='subscription')
      .personalise-sub
        personalise-heading
          h4(slot='text') {{ heading }}
        .personalise-sub-card(v-if='!loading["resource/fetch/subscription"]')
          .personalise-sub-card__header
            img.product(:src="`/static/images/products/icons/${ name.toLowerCase() ? name.toLowerCase() : 'generic-product' }.svg`")
            h4.personalise-sub-card__name {{ name }}&nbsp;
              span(v-if='addedProfiles.length') +{{ addedProfiles.length }}
            a.personalise-sub-card__switcher-button(
              v-if='stage === "build"'
              @click.stop='toggleProductCompare'
            ) change
            p.personalise-sub-card__price.number--small
              span £
              span(v-if='price') {{ price | formatPrice }}
              span(v-if='price').personalise-sub-card__price__info &nbsp;per test
              content-loader.personalise-sub-card__loader(
                v-else,
                :height="20",
                :width="400",
                :speed="2",
                primaryColor="#EFF4F7",
                secondaryColor="#E5E7F1"
              ) <rect x="0" y="0" rx="4" ry="4" width="60" height="20" />
          .divider
          .personalise-sub-card__body(:class='`personalise-sub-card__body--${name ? name.toLowerCase() : "" }`')
            ul.personalise-sub-card__profiles
              li.body--large(v-for='profile in coreSubscriptionProfiles')
                <svg width="17" height="13" viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg"><title>Tick</title><path d="M15.925 1.95l-9.9 9.9-4.95-4.95" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/></svg>
                | {{ profile.attributes.name }}

            .personalise-sub-card__footer__additions(v-if='allProfiles.length > 0')
              .divider
              ul.personalise-sub-card__addon-profiles
                CardProfile.personalise-sub-card__addon-profile(
                  v-for='profile in allProfiles',
                  :key='profile.id'
                  :id='profile.id',
                  :name='profile.attributes.name',
                  :price='profilePrices[profile.id]',
                  :removed='isRemoved(profile.id)',
                  :color='name ? name.toLowerCase() : null',
                  @remove='toggleProfile(profile.id)',
                  @undo='toggleProfile(profile.id)'
                )

          .personalise-sub-card__actions(:class="`personalise-sub-card__actions--${stage}`")
            a.personalise-sub-card__one-off-link(v-if='addedProfiles.length', @click='toConfirm("oneOff")') {{ oneOffTestText }}
            .divider.personalise-sub-card__desktop-only
            .personalise-sub-card__warning(v-if='showTubeWarning')
              .personalise-sub-card__warning__icon
              span You’ll need to complete 2 sample tubes
            AsyncButton.personalise-sub-card__confirm-button(
              :text='buttonText',
              :waiting='submitting',
              :error='error',
              :success='success',
              :disabled='subscriptionStatus !== "cancelled" && !panelHasChanged',
              @click='updateSubscription'
            )

          .personalise-sub-card__footer(:class='`personalise-sub-card__footer--${stage}`', v-if='!mobileNavOpen')
            img(:src="`/static/images/products/icons/${ name.toLowerCase() ? name.toLowerCase() : 'generic-product' }.svg`")
            .personalise-sub-card__footer__count(v-if='addedProfiles.length') +{{ addedProfiles.length }}
            p.number--small.personalise-sub-card__footer__price £{{ price | formatPrice }}
            ThvButton.personalise-sub-card__continue-button(
              element='button',
              colour='blue',
              size='medium',
              :disabled='subscriptionStatus !== "cancelled" && !panelHasChanged'
              @click='toConfirm("subscription")'
            ) Continue

        loader(v-else)
</template>

<style lang='stylus'>

  .personalise-sub__wrapper
    position: relative
    width: 100%

  .personalise-sub
    margin-bottom: 30px
    padding-bottom: 20px
    width: 100%
    position: relative

    @media (min-width: 768px)
      margin-right: 10px
      position: absolute
      right: 0
      max-width: 300px

    @media (min-width: 900px)
      right: 30px
      max-width: 320px

    @media (min-width: 1024px)
      right: 50px
      width: 350px
      max-width: 350px

    @media (min-width: 1200px)
      margin-left: 720px
      right: auto

    &--fixed, &--fixed-bottom
      position: fixed
      margin-top: -270px

      @media (min-width: 768px)
        right: 10px

      @media (min-width: 900px)
        right: 40px

      @media (min-width: 1024px)
        right: 55px

      @media (min-width: 1200px)
        right: auto

      &-bottom
        bottom: 80px
        margin-top: auto


    &-card
      background-color: #FFFFFF
      border-radius: 10px
      box-shadow: 0 1px 4px 0 rgba(#3D4250, 0.18)

      @media (min-width: 768px)
        position: relative

      &__header
        padding: 20px
        position: relative
        overflow: hidden
        border-top-right-radius: 10px

        img.product
          position: absolute
          width: w = 110px
          height: w
          right: -(w /3)
          top: -(w /10)

      &__name
        display: inline-block
        font-size: 16px
        margin-bottom: 0
        text-transform: capitalize

        @media (min-width: 768px)
          font-size: 21px

      &__price
        display: flex
        align-items: center
        font-weight: 400

        &__info
          font-size: 14px
          color: #99A2BF

      &__loader
        padding-left: 3px
        height: 20px

      &__switcher-button
        display: inline-block
        font-size: 16px
        line-height: 24px
        margin-left: 8px
        text-decoration: none

      &__profiles
        list-style: none
        padding: 0
        margin: 0

        svg
          width: w = 14px
          height: w
          margin-right: 10px
          stroke: #AEEC73

        li
          font-size: 14px
          line-height: 32px
          color: #565B75

          @media (min-width: 768px)
            font-size: 16px

          &.profile__removed
            color: #CED0D9

      &__body
        position: relative
        bottom: 0
        padding: 20px
        font-weight: 400

        &--baseline
          svg
            stroke: #FFC662

        &--advanced
          svg
            stroke: #664277

        @media (min-width: 768px)
          display: block

      &__footer
        position: fixed
        height: 64px
        bottom: 0
        left: 0
        right: 0
        display: flex
        align-items: center
        background-color: #FFFFFF
        padding: 12px 20px
        box-shadow 0 -6px 20px 0 rgba(61, 66, 80, 0.18)
        z-index: 1

        @media (min-width: 768px)
          display: none

        &--confirm
          display: none

        img
          display: inline-block
          width: 28px
          height 28px

        &__count
          width: 32px
          height 32px
          margin-left: -6px
          background-color: #664277
          font-size: 14px
          color: #FFFFFF
          display: inline-flex
          justify-content: center
          align-items: center
          border: 3px solid #FFFFFF
          border-radius: 50%

        &__price
          margin-left: 10px
          font-size: 18px
          font-weight: 400
          color: #6F749A

        button.button
          position: absolute
          top: 12px
          right: 20px

        &__additions
          padding: 20px 0 0 0

      &__addon-profiles
        list-style: none
        padding: 25px 0 10px 0
        margin: 0

        @media (min-width: 768px)
          padding-bottom: 0

      &__addon-profile:not(:last-child)
        margin-bottom: 20px

      &__actions
        padding: 0 20px 20px 20px

        display: none

        &--confirm
          display: block

        @media (min-width: 768px)
          display: block

      button&__confirm-button
        width: 100%
        margin-top: 25px

        &:disabled
          background-color: #99A2BF
          border-color: #99A2BF

      &__one-off-link
        display: block
        margin-bottom: 25px

      &__warning
        display: flex
        font-size: 14px
        color: #565B75
        margin-top: 20px

        &__icon
          display: inline-block
          width: 16px
          height: 16px
          margin: 1px 5px 0 0
          background-color: #FFC662
          mask: url('~/static/images/icons/error-16.svg') no-repeat center


</style>
