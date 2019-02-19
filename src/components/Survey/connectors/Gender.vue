<script>
  import CheckButton from '@/components/Survey/components/CheckButton'
  import ThvButton from '@/components/Shared/Button'
  import { mapState } from 'vuex'

  export default {
    name: 'Gender',
    components: {
      ThvButton,
      CheckButton
    },
    computed: {
      ...mapState('survey', {
        selectedGender: state => state.gender
      })
    },
    data () {
      return {
        genders: {
          male: {
            name: 'Male'
          },
          female: {
            name: 'Female'
          }
        }
      }
    },
    methods: {
      submit () {
        alert('Survey complete!')
      },
      back () {
        this.$router.push('/dob')
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
        p.body--large.question-description We need your biological sex to process your tests
        .spacer.sp__top--sm

        check-button(
          v-for='(gender, key) in genders',
          :key='key',
          :text='gender.name'
          :selected='selectedGender === gender.name'
          :value="'gender'"
        )

        .grid-x.button-container
          .cell.auto
            .back-button-container
              .back-button(@click='back') BACK
          .cell.auto.align-right
            thv-button(
              :disabled='!selectedGender'
              element='button',
              size='large'
              @click='submit'
            ) Next

</template>
