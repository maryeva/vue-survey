<script>
  import { mapState, mapGetters } from 'vuex'
  import PersonaliseHero from '@/components/Personalise/components/PersonaliseHero'
  import SubscriptionCard from '@/components/Personalise/components/SubscriptionCard'
  import Recommendations from '@/components/Personalise/components/Recommendations'
  import AdditionalTests from '@/components/Personalise/components/AdditionalTests'

  export default {
    name: 'PersonaliseBuildConnector',
    components: {
      PersonaliseHero,
      SubscriptionCard,
      Recommendations,
      AdditionalTests
    },
    props: {
      loading: {
        type: Object,
        required: true
      },
      subscription: {
        type: Object,
        required: true
      }
    },
    created () {
      this.$store.dispatch('resource/FETCH', { path: 'test_profile_recommendations', type: 'profile_recommendation' })
      this.$store.dispatch('personalise/SETUP_EXISTING_PROFILES')
      this.$store.dispatch('resource/FETCH', { path: 'test_profiles', type: 'profile' }).then(result => {
        // this.$store.dispatch('personalise/FETCH_PROFILE_PRICES')
      })
    },
    computed: {
      ...mapState({
        reference: state => state.resource.reference,
        panel: state => state.resource.panel,
        profile: state => state.resource.profile,
        showProductCompare: state => state.personalise.showProductCompare,
        updatingSubscription: state => state.loading['resource/update/subscription'],
        updateSubscriptionError: state => state.error['resource/update/subscription'],
        profilePrices: state => state.personalise.profilePrices,
        mobileNavOpen: state => state.resource.mobileNavOpen
      }),
      ...mapGetters('personalise', [
        'addedProfiles',
        'removedProfiles',
        'updatedSubscriptionPanel',
        'coreSubscriptionPanel',
        'coreSubscriptionProfiles',
        'additionalProfiles',
        'recommendations',
        'panelHasChanged',
        'subscriptionStatus',
        'validProfilesForSub'
      ])
    },
    methods: {
      toggleProfile (params) {
        this.$store.dispatch('personalise/TOGGLE_PROFILE', { ...params, type: 'subscription' })
      },
      async updateSubscription () {
        if (this.subscriptionStatus === 'cancelled') {
          await this.$store.dispatch('personalise/UPDATE_SUBSCRIPTION', this.updatedSubscriptionPanel)
          this.$store.dispatch('subscription/RESUME', this.subscription)
        } else this.$store.dispatch('personalise/UPDATE_SUBSCRIPTION', this.updatedSubscriptionPanel)
      },
      toConfirm (type) {
        this.$store.commit('personalise/SET_TYPE', type)
        this.$router.push({ name: 'confirm', query: { ...this.$route.query, type, addons: this.$route.query.addons, removed: '' } })
      },
      toggleProductCompare () {
        this.$store.commit('personalise/SHOW_PRODUCT_COMPARE')
      },
      async changePanel (panel) {
        await this.$store.dispatch('subscription/UPDATE_PANEL', {id: this.subscription.id, panel})
        this.$store.dispatch('personalise/FETCH_PROFILE_PRICES')
        this.toggleProductCompare()
      }
    },
    mounted () {
      // force Intercom to sit above the fixed subscription card footer on mobile
      if (process.env.NODE_ENV === 'production' && this.$route.name === 'build' && window.matchMedia('(max-width: 768px)').matches) {
        document.querySelector('#intercom-container .intercom-launcher-frame').style.setProperty('bottom', '75px', 'important')
      }
    },
    destroyed () {
      if (process.env.NODE_ENV === 'production') document.querySelector('#intercom-container .intercom-launcher-frame').style.setProperty('bottom', 'inherit')
    }
  }
</script>

<template lang='pug'>
  div
    personalise-hero
      div(slot='text')
        h2 Personalise your subscription
        p.body--default Build a subscription that’s just for you. We’ve recommended tests for you based on your results and health profile. Add them to your current subscription or do a one-off test.

    .grid-container
      .grid-x.grid-margin-x
        subscription-card(
          :loading='loading',
          :subscriptionStatus='subscriptionStatus'
          :coreSubscriptionPanel='coreSubscriptionPanel',
          :coreSubscriptionProfiles='coreSubscriptionProfiles',
          :updatedSubscriptionPanel='updatedSubscriptionPanel',
          :addedProfiles='addedProfiles',
          :removedProfiles='removedProfiles',
          :profilePrices='profilePrices',
          :submitting='updatingSubscription',
          :panelHasChanged='panelHasChanged',
          :error='updateSubscriptionError',
          :success='false',
          :mobileNavOpen='mobileNavOpen'
          @toggleProfile='toggleProfile',
          @toggleProductCompare='toggleProductCompare',
          @updateSubscription='updateSubscription',
          @toConfirm='toConfirm'
        )

        recommendations(
          :recommendations='recommendations',
          :references='reference'
          :allProfiles='profile',
          :addedProfiles='addedProfiles',
          :profilePrices='profilePrices',
          :coreSubscriptionPanel='coreSubscriptionPanel',
          @toggleProfile='toggleProfile'
        )

        additional-tests(
          :availableProfiles='additionalProfiles',
          :addedProfiles='addedProfiles',
          :profilePrices='profilePrices',
          :coreSubscriptionPanel='coreSubscriptionPanel',
          @toggleProfile='toggleProfile'
        )
</template>
