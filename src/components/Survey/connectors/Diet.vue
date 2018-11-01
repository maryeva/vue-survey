<script>
  import { mapState, mapGetters } from 'vuex'
  import CheckButton from '@/components/Survey/components/CheckButton'
  import { Button as ThvButton } from '@thrivadev/thriva-ui'

  const CATEGORY = 'diet'

  export default {
    name: 'Diet',
    components: {
      ThvButton,
      CheckButton
    },
    computed: {
      ...mapState('survey', {
        name: state => state.surveyData.name,
        diets: state => state.surveyData.diet
      }),
      ...mapGetters('survey', [
        'selectionLimitReached'
      ]),
      currentlySelected () { return this.$store.getters['survey/selectedValue'](CATEGORY) }
    },
    methods: {
      toggle (value) {
        if (this.currentlySelected.length) {
          this.$store.dispatch('survey/TOGGLE_FIELD', { category: CATEGORY, value: this.currentlySelected[0] })
        }
        this.$store.dispatch('survey/TOGGLE_FIELD', { category: CATEGORY, value: value })
      }
    }
  }
</script>

<template lang='pug'>
  .grid-x.grid-x-margin
    .cell.small-12.medium-6.medium-offset-3
      .survey-questions__diet.align-center
        h1 Do you follow a particular diet?
        .spacer.sp__top--sm

        check-button(
          v-for='(diet, key) in diets',
          :key='key',
          :text='diet.name',
          :value='key',
          :selected='diet.selected',
          @toggle='toggle'
        )

        thv-button(
          element='button',
          size='large'
          :disabled='!currentlySelected.length'
          @click='$router.push("/survey/dob")'
        ) Next

</template>
