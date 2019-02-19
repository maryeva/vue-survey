<script>
  import ProgressBar from '@/components/Shared/ProgressBar'

  export default {
    name: 'SurveyProgress',
    components: {
      ProgressBar
    },
    computed: {
      currentStep () {
        return this.stages.indexOf(this.$route.name) + 1
      }
    },
    data () {
      return {
        stages: ['name', 'goals', 'diet', 'dob', 'gender']
      }
    }
  }
</script>

<template lang='pug'>
  .progress-bar-container
    progress-bar(:currentStep='currentStep', :totalSteps='stages.length')

</template>

<style lang='stylus'>
  .progress-bar-container
    display: flex
    flex-wrap: nowrap
    width: 80px
    align-items: center
</style>
