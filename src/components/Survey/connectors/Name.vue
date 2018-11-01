<script>
  import {
    TextInput,
    Button as ThvButton
  } from '@thrivadev/thriva-ui'
  import { createHelpers } from 'vuex-map-fields'

  const { mapFields } = createHelpers({
    getterType: `survey/getField`,
    mutationType: `survey/UPDATE_NAME`
  })

  export default {
    name: 'Name',
    components: {
      TextInput,
      ThvButton
    },
    computed: {
      ...mapFields([
        'name'
      ])
    },
    methods: {
      submit () {
        this.$router.push('/survey/goals')
      }
    }
  }
</script>

<template lang='pug'>
  .grid-x.grid-x-margin
    .cell.small-12.medium-6.medium-offset-3
      .survey-questions__name.align-center
        h1 Hey there! What’s your first name?
        .spacer.sp__top--sm

        text-input(
          type='text',
          name='name',
          v-model='name'
          @keyup.enter='submit'
        )
        thv-button(
          element='button',
          size='large'
          :disabled='!name'
          @click='submit'
        ) Next

</template>
