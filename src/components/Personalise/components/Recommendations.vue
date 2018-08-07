<script>
  import Loader from '@/components/Personalise/components/Loader'
  import PersonaliseHeading from '@/components/Personalise/components/PersonaliseHeading'
  import RecommendationProfileCard from '@/components/Personalise/components/RecommendationProfileCard'

  export default {
    name: 'Recommendations',
    components: {
      Loader,
      PersonaliseHeading,
      RecommendationProfileCard
    },
    props: {
      recommendations: {
        type: Array,
        required: true
      },
      references: {
        type: Object,
        required: true
      },
      allProfiles: {
        type: Object,
        required: true
      },
      addedProfiles: {
        type: Array,
        required: true
      },
      profilePrices: {
        type: Object,
        required: true
      },
      coreSubscriptionPanel: {
        type: Object,
        required: true
      }
    },
    methods: {
      toggleProfile (profile) {
        this.$emit('toggleProfile', { id: profile.id, remove: this.isAdded(profile.id) })
      },
      profileInfo (profile) {
        let currentProfile = profile.relationships.profile.data.id
        return this.allProfiles[currentProfile]
      },
      profilePrice (recommendation) {
        if (recommendation) return this.profilePrices[recommendation.relationships.profile.data.id]
      },
      isAdded (profileID) {
        return this.addedProfiles.map(addition => addition.id).includes(profileID)
      },
      recommendationReferences (profile) {
        return profile.relationships.references.data.map(reference => this.references[reference.id])
      }
    }
  }
</script>

<template lang='pug'>
  .cell.small-12.medium-7.large-6.large-offset-1
    .personalise-recommendations
      personalise-heading
        h4(slot='text') Personal Recommendations

      div(v-if='Object.values(profilePrices).length > 0')
        .personalise-recommendations-card(v-if='!recommendations.length')
          p.no-recommendations You currently have no personal recommendations. Check back after your next set of results to see updates.
        .personalise-recommendations-card(v-else)
          .personalise-recommendations-card__number
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"><defs><path id="a" d="M9.646 16.227l-2.816-1.11a1.2 1.2 0 0 1 0-2.233l2.816-1.11a2 2 0 0 0 1.127-1.128l1.11-2.816a1.2 1.2 0 0 1 2.233 0l1.11 2.816a2 2 0 0 0 1.128 1.127l2.816 1.11a1.2 1.2 0 0 1 0 2.233l-2.816 1.11a2 2 0 0 0-1.127 1.128l-1.11 2.816a1.2 1.2 0 0 1-2.233 0l-1.11-2.816a2 2 0 0 0-1.128-1.127zm9.177-8.614l-1.408-.555a.6.6 0 0 1 0-1.116l1.408-.555a1 1 0 0 0 .564-.564l.555-1.408a.6.6 0 0 1 1.116 0l.555 1.408a1 1 0 0 0 .564.564l1.408.555a.6.6 0 0 1 0 1.116l-1.408.555a1 1 0 0 0-.564.564l-.555 1.408a.6.6 0 0 1-1.116 0l-.555-1.408a1 1 0 0 0-.564-.564z"/></defs><g fill="none" fill-rule="evenodd" transform="translate(-3)"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><g fill="#FFF" mask="url(#b)"><path d="M3 0h24v24H3z"/></g></g></svg>
            p.personalise-recommendations-card__number__figure {{ Object.values(recommendations).length }}
          p {{ `recommendation${Object.values(recommendations).length > 1 ? 's' : ''} based on your results` }}

        recommendation-profile-card(
          v-if='profilePrice(profile) > 0',
          v-for='profile in recommendations',
          :key='profile.id',
          :profile='profileInfo(profile)',
          :price='profilePrice(profile)',
          :added='isAdded(profile.relationships.profile.data.id)',
          :recommendation='profile',
          :references='recommendationReferences(profile)',
          :coreSubscriptionPanel='coreSubscriptionPanel.id'
          @toggleProfile='toggleProfile'
        )

      loader(v-else)
</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

  .personalise-recommendations
    position: relative
    margin-bottom: 20px
    padding-bottom: 40px

    &:before
      content: ''
      height: 1px
      background-color: THRIVA.colours.light-grey
      display: inline-block
      position: absolute
      margin-top: -25px
      left: -50px
      right: -50px

      +media-breakpoint-up(md)
        display: none

    &:after
      content: ''
      height: 1px
      background-color: THRIVA.colours.light-grey
      display: inline-block
      position: absolute
      margin-top: 40px
      left: -50px
      right: -50px

      +media-breakpoint-up(md)
        left: 0
        right: 0

    &-card
      display: block
      padding: 15px 80px 25px
      background-color: THRIVA.colours.purple
      text-align: center
      radius(lg)
      shadow(md)

      +media-breakpoint-up(md)
        display: flex
        padding: 15px 20px

      p
        color: THRIVA.colours.white
        font-size: rem-calc(16px)
        font-weight: THRIVA.typography.font-weights.regular

        +media-breakpoint-up(lg)
          font-size: rem-calc(20px)

        &.no-recommendations
          font-size: rem-calc(16px)
          margin-left: -40px
          margin-right: -40px

          +media-breakpoint-up(md)
            margin-left: auto
            margin-right: auto

      &__number
        display: flex
        align-items: center
        justify-content: center
        flex-direction: row-reverse

        +media-breakpoint-up(md)
          flex-direction: unset

        p
          font-size: rem-calc(70px)
          line-height: 1.2

          +media-breakpoint-up(md)
            font-size: rem-calc(20px)

        &__figure
          +media-breakpoint-up(md)
            margin-right: 7px

        svg
          opacity: 0.5
          margin-right: 10px
</style>
