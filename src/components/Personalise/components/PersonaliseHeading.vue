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
  
  .personalise-heading
    margin-top: 20px
    margin-bottom: 20px

</style>
