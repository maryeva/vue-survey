<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'Personalise',
    metaInfo: {
      title: 'Personalise your Subscription - Thriva'
    },
    created () {
      this.$store.dispatch('resource/FETCH', { path: 'subscriptions', type: 'subscription' })
    },
    computed: {
      ...mapState({
        loading: 'loading'
      }),
      ...mapGetters({
        subscription: 'subscription/firstSub'
      })
    }
  }
</script>

<template lang='pug'>
  .personalise
    router-view(
      v-if='subscription',
      :loading='loading',
      :subscription='subscription'
    )
</template>

<style lang='stylus'>
  .personalise
    height: 100%
    padding-bottom: 100px
</style>
