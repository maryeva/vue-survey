<script>
  import CheckButton from '@/components/Survey/components/CheckButton'
  import ThvButton from '@/components/Shared/Button'
  import { mapState } from 'vuex'

  export default {
    name: 'Goals',
    components: {
      ThvButton,
      CheckButton
    },
    computed: {
      ...mapState('survey', {
        name: state => state.name,
        selectedGoals: state => state.goals
      }),
      checkLimit () {
        return this.selectedGoals.length > 4
      }
    },
    data () {
      return {
        goals: {
          improveEnergy: {
            name: 'Energy'
          },
          improveFitness: {
            name: 'Fitness'
          },
          improveLongTermHealth: {
            name: 'Long-term health'
          },
          improveMood: {
            name: 'Mood'
          },
          improveSleep: {
            name: 'Sleep'
          },
          improveWeight: {
            name: 'Weight'
          }
        }
      }
    },
    methods: {
      submit () {
        this.$router.push('/diet')
      },
      back () {
        this.$router.push('/name')
      }
    }
  }
</script>

<template lang='pug'>
  .grid-x.grid-x-margin
    .cell.small-12.medium-6.medium-offset-3
      .survey-questions__goals.align-center
        h1 Nice to meet you, {{ name }}. What would you like to focus on?
        p.body--large.question-description(v-bind:class="checkLimit ? 'limit-error' : ''") Choose up to four
        .spacer.sp__top--sm

        check-button(
          v-for='(goal, key) in goals',
          @click="checkLimit"
          :key='key',
          :text='goal.name'
          :selected='selectedGoals.indexOf(goal.name) > -1'
          :value="'goals'"
        )

        .grid-x.button-container
          .cell.auto
            .back-button-container
              .back-button(@click='back') BACK
          .cell.auto.align-right
            thv-button(
              :disabled='!selectedGoals.length || checkLimit'
              element='button',
              size='large'
              @click='submit'
            ) Next
</template>

<style lang='stylus'>
  .limit-error {
    color: #FA476F
  }
</style>
