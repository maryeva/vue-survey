<script>
  import { mapState, mapGetters } from 'vuex'
  import CheckButton from '@/components/Survey/components/CheckButton'
  import { Button as ThvButton } from '@thrivadev/thriva-ui'

  const CATEGORY = 'gender'

  export default {
    name: 'Gender',
    components: {
      ThvButton,
      CheckButton
    },
    computed: {
      ...mapState('survey', {
        genders: state => state.surveyData.gender
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
      .survey-questions__gender.align-center
        h1 Are you…
        .spacer.sp__top--sm

        check-button(
          v-for='(gender, key) in genders',
          :key='key',
          :text='gender.name',
          :value='key',
          :selected='gender.selected',
          @toggle='toggle'
        )

        thv-button(
          element='button',
          size='large'
          :disabled='!currentlySelected.length'
          @click='$router.push("/join")'
        ) Next

</template>
