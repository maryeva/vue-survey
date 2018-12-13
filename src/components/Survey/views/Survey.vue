<script>
  export default {
    name: 'Survey'
  }
</script>

<template lang='pug'>
  .survey-questions
    .grid-container
      .survey-introduction(v-if='$route.name === "index"')
        h1 Welcome to the Thriva front-end coding challenge
        p Instructions:

        p The survey starts 
          router-link(to='/name') here
      
      router-view

</template>

<style lang='stylus'>
  .question-description
    font-weight: 400

  p.max-limit-reached
    color: #FA476F

  .survey-questions__dob .input__dob .input__group .input__dob__year
    max-width: 300px

  .survey-questions
  .back-button-signup
    padding: 60px 0 100px

    .survey-input 

      input 
        height: 60px

      .input__dob
      .input__group
        justify-content: space-between
        
    .align-center
      text-align: center

    .align-right
      text-align: right

    .button-container
      margin-top: 30px

    button.button
      max-width: 200px
      width: 100%

    .back-button-container
      display: flex
      align-items: center
      height: 100%

      .back-button
        outline:0
        font-size: 14px
        color: #3D4250
        display flex
        cursor: pointer

        &:before
          content: url('/images/icons/chevron-16-grey.svg')
          transform: rotate(180deg)
          height: 14px
          width: 14px
          margin-top: 3px
          margin-right: 5px

</style>
