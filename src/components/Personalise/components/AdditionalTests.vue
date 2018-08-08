<script>
  import Loader from '@/components/Personalise/components/Loader'
  import PersonaliseHeading from '@/components/Personalise/components/PersonaliseHeading'
  import ProfileCard from '@/components/Personalise/components/ProfileCard'
  import ThvButton from '@/components/Shared/Button'

  export default {
    name: 'AdditionalTests',
    components: {
      Loader,
      PersonaliseHeading,
      ProfileCard,
      ThvButton
    },
    props: {
      availableProfiles: {
        type: Array,
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
      isAdded (profileID) {
        return this.addedProfiles.map(addition => addition.id).includes(profileID)
      },
      profilePrice (profileID) {
        return this.profilePrices[profileID]
      }
    }
  }
</script>

<template lang='pug'>
  .cell.small-12.medium-7.large-6.large-offset-1
    .additional-tests
      personalise-heading
        h4(slot='text') Additional tests
      div(v-if='Object.values(profilePrices).length > 0')
        profile-card(
          v-if='profilePrice(profile.id) > 0',
          v-for='profile in Object.values(availableProfiles)',
          :key='profile.id',
          :profile='profile',
          :price='profilePrice(profile.id)',
          :added='isAdded(profile.id)',
          :coreSubscriptionPanel='coreSubscriptionPanel.id'
          @toggleProfile='toggleProfile'
        )

      loader(v-else)
</template>

<style lang='stylus'>
  .additional-tests
    margin-bottom: 30px

</style>
