<script>
  import Header from '@/components/Shared/Header'
  import Hero from '@/components/Shared/Hero'
  import { Button as ThvButton } from '@thrivadev/thriva-ui'

  export default {
    name: 'ErrorPage',
    components: {
      Header,
      Hero,
      ThvButton
    },
    // WE NEED TO DETECT ERROR STATUS CODE TO FIGURE OUT WHEN TO DISPLAY 500 ERROR
    props: ['error']
  }
</script>

<template lang='pug'>
  .error-page
    Header(
      v-if='$route.meta.layout && !$route.meta.layout.minimalLayout',
      :partner='partner'
    )
    .content
      Hero.sp__bottom--lg(
        backgroundType='colour',
        background='x-light-grey'
      )
        slot
          img(alt='error' src='https://s3-eu-west-1.amazonaws.com/thriva/images/not-found-scene-illustration.svg')
          //- img(v-if='this.error.statusCode === 500', alt='error' src='https://s3-eu-west-1.amazonaws.com/thriva/images/error-scene-illustration.svg')

        h1(slot='heading') 404 error
        p.body--large(slot='text') Oops! The page you were looking for doesn't exist. If you copied and pasted a link, please make sure you copied the whole thing.

        //- h1(slot='heading', v-if='this.error.statusCode === 500') 500 error
        //- p.body--large(slot='text', v-if='this.error.statusCode === 500') Oops! Something went wrong on our end. We're sorry about that, we've been notified and we're looking into it. Please contact at us at&nbsp;
        //-   a(href='mailto: hello@thriva.co') hello@thriva.co&nbsp;
        //-   | if the problem persists and we'll help out!

        div(slot='cta')
          thv-button(
            element='a'
            link='https://app.thriva.co/dashboard',
            size='large'
          ) Go home

          thv-button(
            element='a'
            link='mailto: hello@thriva.co',
            size='large',
            type='transparent'
          ) Chat to us

</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

  body
    background-color: THRIVA.colours.x-light-grey

  .error-page
    position: relative
    margin: auto
    max-width: 1680px
    min-height: 100vh
    height: 100%
    background-color: THRIVA.colours.white
    z-index: 0
    overflow: hidden
    shadow(sm)

    .content
      padding-top: 20px
      height: 100%

      +media-breakpoint-up(md)
        padding-top: 62px

      .hero
        padding-bottom: 100px

      .button
        &.primary
          margin-right: 15px

  
</style>
