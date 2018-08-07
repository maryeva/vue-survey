<script>
  export default {
    name: 'PersonaliseHeading'
  }
</script>

<template lang='pug'>
  .personalise-heading
    slot(name='text')

</template>

<style lang='stylus'>
  @require '~@thrivadev/thriva-ui/src/assets/styles/modules/settings'
  
  .personalise-heading
    margin-top: 20px
    margin-bottom: 20px

</style>
