<script>
  import DefaultLayout from './layout/DefaultLayout.vue'
  export default {
    name: 'app',
    components: {
      DefaultLayout
    },
    computed: {
      layout () {
        return this.$route.meta.layout ? this.$route.meta.layout : DefaultLayout
      }
    }
  }
</script>

<template lang='pug'>
  #app
    component(:is='layout')
</template>

<style style lang='stylus'>

</style>
