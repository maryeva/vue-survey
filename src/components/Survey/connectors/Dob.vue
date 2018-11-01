<script>
  import {
    DobInput,
    Button as ThvButton
  } from '@thrivadev/thriva-ui'
  import { createHelpers } from 'vuex-map-fields'

  const { mapFields } = createHelpers({
    getterType: `survey/getField`,
    mutationType: `survey/UPDATE_DOB`
  })

  export default {
    name: 'Dob',
    components: {
      DobInput,
      ThvButton
    },
    computed: {
      ...mapFields([
        'dob'
      ])
    },
    methods: {
      submit () {
        this.$router.push('/survey/gender')
      }
    }
  }
</script>

<template lang='pug'>
  .grid-x.grid-x-margin
    .cell.small-12.medium-6.medium-offset-3
      .survey-questions__dob.align-center
        h1 What is your date of birth?
        .spacer.sp__top--sm

        dob-input.align-center(
          ref='DobInput'
          v-validate="'required'",
          v-model='dob'
          data-vv-value-path="dob",
          name='dob',
          :error='errors.has("dob")',
          minAge='18',
          :feedback='errors.first("dob")'
          @keyup.enter='submit'
        )
        thv-button(
          element='button',
          size='large'
          @click='submit'
        ) Next

</template>

<style lang='stylus'>
  .input__group
    justify-content: center

</style>
