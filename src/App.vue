<script>
  import MinimalLayout from './layout/MinimalLayout.vue'
  export default {
    name: 'app',
    components: {
      MinimalLayout
    },
    computed: {
      layout () {
        return this.$route.meta.layout ? this.$route.meta.layout : MinimalLayout
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
