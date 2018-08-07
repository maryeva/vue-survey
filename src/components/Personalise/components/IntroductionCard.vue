<script>
  import Loader from '@/components/Personalise/components/Loader'
  import ThvButton from '@/components/Shared/Button'

  export default {
    name: 'IntroductionCard',
    components: {
      Loader,
      ThvButton
    },
    props: {
      loading: {
        type: Object,
        required: true
      },
      subscription: {
        type: Object,
        required: true
      },
      completedTest: {
        type: Boolean,
        required: true
      },
      currentSubscriptionPanelId: {
        type: String,
        required: true
      }
    },
    computed: {
      link () {
        return encodeURI(`${process.env.WEB_URL}`)
      },
      image () {
        return require('@thrivadev/thriva-ui/src/assets/images/illustrations/large-personalisation.svg')
      },
      buttonText () {
        if (this.completedTest && this.currentSubscriptionPanelId === 'TPMFB5YAJ6') return 'Add B12 for free'
        else return 'Get started'
      }
    },
    methods: {
      async start () {
        if (this.currentSubscriptionPanelId === 'TPMFB5YAJ6') {
          try {
            await this.$store.dispatch('subscription/UPDATE_PANEL', {id: this.subscription.id, panel: 'TPEHZG'})
            this.$router.push({name: 'build'})
          } catch (error) { console.log(error) }
        } else this.$router.push({name: 'build'})
      }
    }
  }
</script>

<template lang="pug">
  .introduction-card(v-if='!loading["resource/fetch/subscription"]')
    .introduction-card__content
      img(:src='image')
      h3 Personalise your subscription
      p We know how unique you are! So based on your results and health profile we’ll offer you personalised test recommendations. Add any of these new tests to your current subscription and come back anytime to change or remove things. You can also try them as a one-off test.
      .introduction-card__content__explanation(v-if='!subscription && !completedTest')
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M6 7.5h6V5.544C12 4.177 10.69 3 9 3S6 4.177 6 5.544V7.5zm9 0a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-4.5a3 3 0 0 1 3-3V5.544C3 2.444 5.72 0 9 0s6 2.444 6 5.544V7.5z" id="a"/></defs><g transform="translate(3 3)" fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><g mask="url(#b)" fill="#FFC662"><path d="M-3-3h24v24H-3z"/></g></g></svg>
        p You must have at least one set of results so that we can give you accurate recommendations.
        ThvButton.introduction-card__button--products(
          element='a',
          colour='blue',
          size='large',
          :link='link'
        ) View our products
      .introduction-card__content__explanation(v-if='!subscription && completedTest')
        p Pick a base subscription and soon you’ll have access to your recommendations.
        ThvButton.introduction-card__button--products(
          element='a',
          colour='blue',
          size='large',
          :link='link'
        ) View our subscriptions
      .introduction-card__content__explanation(v-if='subscription && !completedTest')
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M6 7.5h6V5.544C12 4.177 10.69 3 9 3S6 4.177 6 5.544V7.5zm9 0a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-4.5a3 3 0 0 1 3-3V5.544C3 2.444 5.72 0 9 0s6 2.444 6 5.544V7.5z" id="a"/></defs><g transform="translate(3 3)" fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><g mask="url(#b)" fill="#FFC662"><path d="M-3-3h24v24H-3z"/></g></g></svg>
        p You must have at least one set of results so that we can give you accurate recommendations. Check back later.
      .introduction-card__content__explanation(v-if='subscription && completedTest && currentSubscriptionPanelId === "TPMFB5YAJ6"')
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"><defs><path id="a" d="M9.646 16.227l-2.816-1.11a1.2 1.2 0 0 1 0-2.233l2.816-1.11a2 2 0 0 0 1.127-1.128l1.11-2.816a1.2 1.2 0 0 1 2.233 0l1.11 2.816a2 2 0 0 0 1.128 1.127l2.816 1.11a1.2 1.2 0 0 1 0 2.233l-2.816 1.11a2 2 0 0 0-1.127 1.128l-1.11 2.816a1.2 1.2 0 0 1-2.233 0l-1.11-2.816a2 2 0 0 0-1.128-1.127zm9.177-8.614l-1.408-.555a.6.6 0 0 1 0-1.116l1.408-.555a1 1 0 0 0 .564-.564l.555-1.408a.6.6 0 0 1 1.116 0l.555 1.408a1 1 0 0 0 .564.564l1.408.555a.6.6 0 0 1 0 1.116l-1.408.555a1 1 0 0 0-.564.564l-.555 1.408a.6.6 0 0 1-1.116 0l-.555-1.408a1 1 0 0 0-.564-.564z"/></defs><g fill="none" fill-rule="evenodd" transform="translate(-3)"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><g fill="#664277" mask="url(#b)"><path d="M3 0h24v24H3z"/></g></g></svg>
        h4 Get a free upgrade!
        p To get started with personalisation, add vitamin B12 to your baseline subscription at no extra cost.
      ThvButton.introduction-card__button(
        v-if='subscription'
        element='button',
        colour='blue',
        size='large',
        @click='start'
        :disabled='!completedTest'
      ) {{ buttonText }}

  loader(v-else)
</template>

<style lang="stylus">
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

  .introduction-card,
  .content-loader
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    margin-top: -30px
    padding: 50px 20px 100px
    background-color: THRIVA.colours.white
    shadow(sm)

    +media-breakpoint-up(md)
      margin: 40px auto auto
      padding: 0
      max-width: 480px
      height: auto
      radius(lg)

    .content-loader__inner
      box-shadow: none

    &__content
      max-width: 480px
      position: relative
      overflow: hidden
      text-align: center

      +media-breakpoint-up(md)
        padding: 30px

      img
        max-width: 280px
        height: auto
        margin-bottom: 30px

      p
        color: THRIVA.colours.dark-grey

      button.button
        margin-top: 30px
        width: 100%

        &:disabled
          background-color: THRIVA.colours.grey
          border-color: THRIVA.colours.grey

      &__explanation
        margin: 30px 5px 0
        radius(sm)
        shadow(md)
        padding: 20px

        +media-breakpoint-up(md)
          margin: 30px auto 0

        svg
          display: block
          margin: auto
          margin-bottom: 10px

        p
          font-size: rem-calc(14px)
          color: THRIVA.colours.xx-dark-grey
          font-weight: THRIVA.typography.font-weights.regular

        a.button
          margin-top: 20px

</style>
