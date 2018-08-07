<script>
  import PersonaliseHeading from '@/components/Personalise/components/PersonaliseHeading'
  import ThvButton from '@/components/Shared/Button'
  import ThvToolTip from '@/components/Shared/ToolTip'

  export default {
    name: 'RecommendationProfileCard',
    components: {
      PersonaliseHeading,
      ThvButton,
      ThvToolTip
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
      recommendation: {
        type: Object,
        required: true
      },
      references: {
        type: Array,
        required: true
      },
      coreSubscriptionPanel: {
        type: String,
        required: true
      }
    },
    computed: {
      doctorImage () {
        return require('@thrivadev/thriva-ui/src/assets/images/illustrations/thrivaling-dr.svg')
      },
      buttonColour () {
        return this.added ? 'pink' : 'blue'
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
  .recommendation-profile-card
    .recommendation-profile-card-header
      p.recommendation-profile-card-header__name {{ profile.attributes.name }}
      thv-tool-tip(:trigger='"click"', :options='{placement: "bottom"}')
        p(slot='text') {{ profile.attributes.description }}
        img(slot='point', src='/static/images/icons/info.svg')
      p.recommendation-profile-card-header__price + £{{ price | formatPrice }}
      .recommendation-profile-card-header__image
        img(:src='doctorImage')
    .divider
    .recommendation-profile-card-category
      span.recommendation-profile-card-category__icon {{ recommendation.attributes.category ? recommendation.attributes.category.substring(0, 1) : '' }}
      span.recommendation-profile-card-category__name {{ recommendation.attributes.category ? recommendation.attributes.category : '' }}
    .recommendation-profile-card-body
      .recommendation-profile-card-body__recommendation
        h4 {{ recommendation.attributes.summary }}
        p.body {{ recommendation.attributes.reasoning }}
        .recommendation-profile-card-body__recommendation__evidence-toggle(v-if='references.length')
          thv-tool-tip(:trigger='"click"', :options='{placement: "top"}')
            ul(slot='text')
              li(v-for='reason in references')
                //- TODO: optimisation is breaking this SVG so left un-optimised for now
                <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <path d="M10.5355339,7.46446609 C10.1450096,7.0739418 10.1450096,6.44077682 10.5355339,6.05025253 C10.9260582,5.65972824 11.5592232,5.65972824 11.9497475,6.05025253 C13.9023689,8.00287399 13.9023689,11.1686989 11.9497475,13.1213203 L9.12132034,15.9497475 C7.16869888,17.9023689 4.00287399,17.9023689 2.05025253,15.9497475 C0.0976310729,13.997126 0.0976310729,10.8313011 2.05025253,8.87867966 C2.44077682,8.48815536 3.0739418,8.48815536 3.46446609,8.87867966 C3.85499039,9.26920395 3.85499039,9.90236893 3.46446609,10.2928932 C2.29289322,11.4644661 2.29289322,13.363961 3.46446609,14.5355339 C4.63603897,15.7071068 6.53553391,15.7071068 7.70710678,14.5355339 L10.5355339,11.7071068 C11.7071068,10.5355339 11.7071068,8.63603897 10.5355339,7.46446609 Z M7.46446609,10.5355339 C7.85499039,10.9260582 7.85499039,11.5592232 7.46446609,11.9497475 C7.0739418,12.3402718 6.44077682,12.3402718 6.05025253,11.9497475 C4.09763107,9.99712601 4.09763107,6.83130112 6.05025253,4.87867966 L8.87867966,2.05025253 C10.8313011,0.0976310729 13.997126,0.0976310729 15.9497475,2.05025253 C17.9023689,4.00287399 17.9023689,7.16869888 15.9497475,9.12132034 C15.5592232,9.51184464 14.9260582,9.51184464 14.5355339,9.12132034 C14.1450096,8.73079605 14.1450096,8.09763107 14.5355339,7.70710678 C15.7071068,6.53553391 15.7071068,4.63603897 14.5355339,3.46446609 C13.363961,2.29289322 11.4644661,2.29289322 10.2928932,3.46446609 L7.46446609,6.29289322 C6.29289322,7.46446609 6.29289322,9.36396103 7.46446609,10.5355339 Z" id="path-1"></path>
                  </defs>
                  <g id="icons/link-20" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(1.000000, 1.000000)">
                      <mask id="mask-2" fill="white">
                        <use xlink:href="#path-1"></use>
                      </mask>
                      <use id="outline" fill="#ced0d9" fill-rule="nonzero" xlink:href="#path-1"></use>
                        <g id="colours/darkest-grey" mask="url(#mask-2)" fill="#ced0d9">
                          <g transform="translate(-1.000000, -1.000000)">
                            <rect x="0" y="0" width="20" height="20"></rect>
                          </g>
                        </g>
                    </g>
                  </g>
                </svg>
                a(:href='reason.attributes.url', target='_blank') {{ reason.attributes.name }}
            a(slot='point') See evidence
    .recommendation-profile-card-footer
      .recommendation-profile-card-footer__warnings
        .recommendation-profile-card-footer__warnings__timing(v-if='profile.attributes.lab.processing_time && profile.attributes.lab.processing_time > 1')
          .recommendation-profile-card-footer__warnings__timing__image
          span {{ profile.attributes.lab.processing_time }} working days to process
      ThvButton.recommendation-profile-card-footer__button(
        element='button',
        type='primary'
        :colour='buttonColour'
        size='large',
        @click='toggleProfile'
      ) {{ added ? 'Remove' : 'Add' }}
</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'

    .recommendation-profile-card
      padding: 0 0 20px
      margin: 30px auto
      background-color: THRIVA.colours.white
      radius(lg)
      shadow(md)

      &-header
        padding: 20px 20px 0 20px
        min-height: 105px
        position: relative
        overflow: visible

        &__name, &__price
          color: THRIVA.colours.xx-dark-grey
          font-size: rem-calc(20px)
          font-weight: THRIVA.typography.font-weights.regular

        &__name
          margin-bottom: 0
          margin-right: 3px
          display: inline-block

        &__price
          padding: 0
          color: THRIVA.colours.dark-grey


        &__image
          width: 130px
          height: 145px
          position: absolute
          top: -20px
          right: -20px
          bottom: -20px
          display: flex
          justify-content: center
          align-items: center
          border-radius: 50%
          background-color: THRIVA.colours.xx-light-grey
          clip-path: inset(20px 20px 20px 0)

          img
            height: 78px
            margin-right: 10px

        +media-breakpoint-up(md)
          padding: 20px 30px 0 30px

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

        &__recommendation
          position: relative
          margin-top: 10px
          padding: 15px
          color: THRIVA.colours.dark-grey
          border: 1px solid THRIVA.colours.light-grey
          background-color: THRIVA.colours.xx-light-grey
          radius(lg)

          +media-breakpoint-up(md)
            padding: 20px

          &:before
            content: ""
            position: absolute
            width: 10px
            height: 10px
            left: 25px
            top: -7px
            background-color: THRIVA.colours.xx-light-grey
            border: 1px solid THRIVA.colours.light-grey
            border-right-color: transparent
            border-bottom-color: transparent
            transform: rotate(45deg)
            radius(sm)

          h4
            color: THRIVA.colours.xx-dark-grey
            font-size: rem-calc(20px)
            line-height: rem-calc(33px)

          p
            color: THRIVA.colours.dark-grey

          &__evidence-toggle
            margin-top: 10px
            display: inline-block

            .info-tool-tip-point
              width: auto
              height: auto
              margin-left: 0

            .popper[x-placement^=top]
              margin-bottom: 10px

            .popper[x-placement^=bottom]
              margin-top: 10px

            ul
              list-style: none
              padding: 0
              margin: 0

              li
                position: relative
                margin: 12px 0

              svg
                position: absolute
                top: -2px

              a
                display: inline-block
                font-size: rem-calc(16px)
                margin-left: 30px
                width: 280px
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis

      &-footer
        position: relative
        padding: 0 20px
        margin-top: 20px

        +media-breakpoint-up(md)
          height: 66px
          padding: 0 30px
          padding: 20px 20px 0
          margin-top: 0

        &__warnings
          height: 100%
          display: flex
          flex-flow: row wrap
          align-items: center
          margin-bottom: 10px

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
              height: 18px

          &__timing
            margin-bottom: 3px

          &__sample
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
</style>
