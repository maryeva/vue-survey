<script>
  export default {
    name: 'Hero',
    props: {
      backgroundType: {
        type: String,
        validator: value => {
          return ['colour', 'image', 'specialist', 'backgroundImage'].includes(value)
        },
        required: true
      },
      background: {
        type: String
      },
      image: {
        type: String
      }
    },
    computed: {
      pillColourModifier () {
        if (this.backgroundColour) {
          return `pill--${this.backgroundColour}`
        } else {
          return null
        }
      },
      pillClass () {
        let classNames
        if (this.backgroundType === 'colour' || this.backgroundType === 'specialist') {
          classNames = 'pill--colour'
          if (this.background) {
            classNames = classNames + ` pill--${this.background}`
          }
        } else {
          classNames = 'pill--image'
        }
        return classNames
      },
      inlineStyle () {
        if (this.backgroundType === 'image') {
          return `background-image: url('${this.background}')`
        } else {
          return null
        }
      }
    }
  }
</script>

<template lang='pug'>
  .hero(:class="{ 'hero__padding-bottom' : backgroundType === 'backgroundImage' }")
    .grid-container
      .grid-x.grid-margin-x
        .cell.small-12.medium-6.large-5.large-offset-1(v-if="backgroundType === 'image' || backgroundType === 'backgroundImage'")
          .hero__content
            .hero__heading
              slot(name='heading')
            .hero__text
              slot(name='text')
            .hero__cta
              slot(name='cta')

        .cell.small-12.medium-6.large-4.large-offset-1(v-if="backgroundType === 'colour'")
          .hero__content
            .hero__heading
              slot(name='heading')
            .hero__text
              slot(name='text')
            .hero__cta
              slot(name='cta')

        .cell.small-12.medium-6.large-5(v-if="backgroundType === 'specialist'")
          .hero__content
            .hero__heading
              slot(name='heading')
            .hero__text
              slot(name='text')
            .hero__cta
              slot(name='cta')

        .cell.medium-6.large-6(v-if="backgroundType === 'image'")
          .hero__image(v-if='image')
            img(:src='image')

          .hero__background-image
            img(:src='background')

        .cell.small-12.medium-6.large-6(v-if="backgroundType === 'backgroundImage'")
          .pill-image-container(:class='pillClass')
            .pill-image(:style='{ backgroundImage: `url(${ image })` }')
              slot

        .cell.medium-6.large-7(v-if="backgroundType === 'colour' || backgroundType === 'specialist'")
          .pill(:class='pillClass')
          .hero__image
            img(v-if='image', :src='image')
            slot

</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/mixins'
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

  .hero
    position: relative
    overflow: hidden

    &__padding-bottom
      padding-bottom: 360px

      +media-breakpoint-up(md)
        padding-bottom: inherit

    .hero__content
      max-width: 500px
      padding: 30px 10px 40px
      margin: auto

      .hero__cta
        margin-top: 15px

        .cta__secondary
          .button
            margin-right: 10px
            margin-bottom: 15px

          &__details
            margin: 10px auto 30px
            padding: 13px 0 16px
            border-top: 1px solid THRIVA.colours.light-grey
            border-bottom: 1px solid THRIVA.colours.light-grey
            font-size: 14px
            color: THRIVA.colours.grey

      .hero__price
        margin-bottom: 20px
        color: THRIVA.colours.grey
      .hero__price-amount
        heading()
        font-size: rem-calc(26px)

      +media-breakpoint-up(md)
        max-width: 410px
        padding: 90px 0 110px
        margin: 0

        .hero__cta
          margin-top: 40px

    .pill
      position: relative

      &::before
        pill(1000px, THRIVA.colours.pink, -60deg, 'vertical')
        transform: rotate(0deg)
        left: -320px

        +media-breakpoint-up(460px)
          left: -200px

        +media-breakpoint-up(md)
          pill(720px, THRIVA.colours.pink, -60deg, 'horizontal')
          left: inherit
          right: -970px
          top: -510px
          transform: rotate(-45deg)
          animation: home-hero-pill 1.5s 1 ease-out
          @keyframes home-hero-pill
            0%
              transform: rotate(-30deg) translate3d(100px,100px,0)

        +media-breakpoint-up(lg)
          pill(780px, THRIVA.colours.pink, -60deg, 'horizontal')

          right: -800px
          top: -620px

      for colour in THRIVA.colours
        &--{colour}
          &::before
            background-color: THRIVA.colours[colour]

      &-image-container
        overflow: hidden
        pill(1000px, transparent, -60deg, 'vertical')
        transform: rotate(0deg)
        left: -320px

        +media-breakpoint-up(460px)
          left: -200px

        +media-breakpoint-up(md)
          pill(720px, transparent, -60deg, 'horizontal')
          left: inherit
          right: -970px
          top: -510px
          transform: rotate(-50deg)
  
        +media-breakpoint-up(lg)
          pill(780px, transparent, -60deg, 'horizontal')
          right: -800px
          top: -620px

        .pill-image
          background-size: contain
          background-repeat: no-repeat
          width: 100%
          height: 100%
          position: absolute
          top: -300px
          left: 0

          +media-breakpoint-up(md)
            transform: rotate(50deg)
            top: 185px
            left: -300px

          +media-breakpoint-up(lg)
            transform: rotate(60deg)
            top: 185px
            left: -300px

    .hero__image
      padding: 30px 0
      max-width: 670px
      margin: auto
      height: 100%
      display: flex
      justify-content: center
      align-items: center

      svg, img
        width: 100%
        height: auto


      +media-breakpoint-up(md)
        max-width: inherit
        margin: auto

    .hero__background-image
      position: relative
      height: 180px
      img
        position: absolute
        width: 140%
        left: -60px

      +media-breakpoint-up(520px)
        img
          left: -140px

      +media-breakpoint-up(md)
        img
          width: 700px
          height: 700px
          top: -180px
          left: 0

      +media-breakpoint-up(lg)
        img
          width: 800px
          height: 800px
          top: -340px
          left: 60px

  // product page overrides
  .product-page
    &--essential
      .hero
        .hero__content
          +media-breakpoint-up(lg)
            padding: 90px 0 0

    &--baseline, &--advanced
      .hero
        .hero__content
          +media-breakpoint-up(md)
            padding: 90px 0 120px
          +media-breakpoint-up(lg)
            padding: 90px 0 50px

</style>
