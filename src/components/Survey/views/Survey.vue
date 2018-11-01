<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Survey',
    data () {
      return {
        transitionName: 'going-forward'
      }
    },
    computed: {
      ...mapState('survey', {
        surveyStages: state => state.config.surveyStages
      })
    },
    created () {
      this.$router.beforeEach((to, from, next) => {
        if (this.surveyStages.indexOf(to.name) < this.surveyStages.indexOf(from.name)) {
          this.transitionName = 'going-backwards'
        } else this.transitionName = 'going-forward'
        next()
      })
    }
  }
</script>

<template lang='pug'>
  .survey-questions
    .grid-container
      transition(
        :name='transitionName',
        mode='out-in'
      )
        router-view

</template>

<style lang='stylus'>
  .survey-questions
    padding: 60px 0 100px

    .align-center
      text-align: center

    button.button
      margin-top: 20px
      min-width: 200px

    // ANIMATE BETWEEN SURVEY STAGES
    .going-forward-enter-active
      animation: slideInRight 0.1s ease-in-out

    .going-forward-leave-to
      animation: slideOutLeft 0.1s ease-in-out

    .going-backwards-enter-active
      animation: slideInLeft 0.1s ease-in-out

    .going-backwards-leave-to
      animation: slideOutRight 0.1s ease-in-out

      // animate stage connector in
      @keyframes slideInRight
        from
          -webkit-transform: translate3d(100%, 0, 0)
          transform: translate3d(100%, 0, 0)
        to
          -webkit-transform: translate3d(0, 0, 0)
          transform: translate3d(0, 0, 0)

      @-webkit-keyframes slideInRight
        from
          -webkit-transform: translate3d(100%, 0, 0)
          transform: translate3d(100%, 0, 0)
        to
          -webkit-transform: translate3d(0, 0, 0)
          transform: translate3d(0, 0, 0)

      .slideInRight
        animation-name: slideInRight
        -webkit-animation-name: slideInRight
    
      // animate stage connector out
      @keyframes slideOutLeft
        from
          -webkit-transform: translate3d(0, 0, 0)
          transform: translate3d(0, 0, 0)

        to
          -webkit-transform: translate3d(-100%, 0, 0)
          transform: translate3d(-100%, 0, 0)

      @-webkit-keyframes slideOutLeft
        from
          -webkit-transform: translate3d(0, 0, 0)
          transform: translate3d(0, 0, 0)

        to
          -webkit-transform: translate3d(-100%, 0, 0)
          transform: translate3d(-100%, 0, 0)
      
      .slideOutLeft
        animation-name: slideOutLeft
        -webkit-animation-name: slideOutLeft

        // animate the correction when going back
        @-webkit-keyframes slideInLeft
          from
            -webkit-transform: translate3d(-100%, 0, 0)
            transform: translate3d(-100%, 0, 0)

          to
            -webkit-transform: translate3d(0, 0, 0)
            transform: translate3d(0, 0, 0)

        @keyframes slideInLeft
          from
            -webkit-transform: translate3d(-100%, 0, 0)
            transform: translate3d(-100%, 0, 0)

          to
            -webkit-transform: translate3d(0, 0, 0)
            transform: translate3d(0, 0, 0)

        .slideInLeft
          -webkit-animation-name: slideInLeft
          animation-name: slideInLeft
       

        @-webkit-keyframes slideOutRight
          from
            -webkit-transform: translate3d(0, 0, 0)
            transform: translate3d(0, 0, 0)

          to
            -webkit-transform: translate3d(100%, 0, 0)
            transform: translate3d(100%, 0, 0)

        @keyframes slideOutRight
          from
            -webkit-transform: translate3d(0, 0, 0)
            transform: translate3d(0, 0, 0)

          to
            -webkit-transform: translate3d(100%, 0, 0)
            transform: translate3d(100%, 0, 0)

        .slideOutRight
          -webkit-animation-name: slideOutRight
          animation-name: slideOutRight

</style>