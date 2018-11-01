<script>
  import { mapState, mapGetters } from 'vuex'
  import CheckButton from '@/components/Survey/components/CheckButton'
  import { Button as ThvButton } from '@thrivadev/thriva-ui'

  const CATEGORY = 'goals'

  export default {
    name: 'Goals',
    components: {
      ThvButton,
      CheckButton
    },
    computed: {
      ...mapState('survey', {
        name: state => state.surveyData.name,
        goals: state => state.surveyData.goals,
        selectionLimit: state => state.config.selectedLimits.goals
      }),
      ...mapGetters('survey', [
        'selectionLimitReached'
      ]),
      currentlySelected () { return this.$store.getters['survey/selectedValue'](CATEGORY) }
    },
    methods: {
      toggle (value) {
        if (!this.goals[value].selected && this.selectionLimitReached.includes(CATEGORY)) {
          console.log('Show error message here')
        } else {
          this.$store.dispatch('survey/TOGGLE_FIELD', { category: CATEGORY, value: value })
        }
      }
    }
  }
</script>

<template lang='pug'>
  .grid-x.grid-x-margin
    .cell.small-12.medium-6.medium-offset-3
      .survey-questions__goals.align-center
        h1 Nice to meet you {{ name }}. What are your goals?
        p.body--large (Choose up to {{ selectionLimit }})
        .spacer.sp__top--sm

        check-button(
          v-for='(goal, key) in goals',
          :key='key',
          :text='goal.name',
          :value='key',
          :selected='goal.selected',
          @toggle='toggle'
        )

        thv-button(
          element='button',
          size='large'
          :disabled='!currentlySelected.length'
          @click='$router.push("/survey/diet")'
        ) Next

</template>
