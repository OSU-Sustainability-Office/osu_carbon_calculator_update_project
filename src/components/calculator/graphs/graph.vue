<template>

  <div class="graphs">

    This is a temporary element for displaying totals for each category.

  </div>

</template>

<script>
export default {
  name: 'graph',
  computed: {
    categories () { return this.$store.getters['calculator/categories'] },
    totals () {
      // Empty array of category totals (in order)
      let totals = []

      this.categories.forEach(category => {
        let total = 0
        category.questions.forEach(question => {
          // Multiply this value by parent question's coefficient
          // eslint-disable-next-line
          if (question.input.type == 'dependentValue') {
            let triggerValue = question.trigger.triggerValue
            let parentQuestion = category.questions[question.trigger.parentQuestion]

            // Check if the parent question has the correct value, activating 'question'
            let valueMap = null
            let location = null
            // eslint-disable-next-line
            if (triggerValue == parentQuestion.value) {
              // Find the location of the correct coefficient in parentQuestion's value list by mapping and linear searching array
              valueMap = parentQuestion.input.values.map(obj => obj.val)
              location = valueMap.indexOf(triggerValue)
            } else { // if (triggerValue == 'any')
              // Find the location of the correct coefficient in parentQuestion's value list by mapping and linear searching array
              valueMap = parentQuestion.input.values.map(obj => obj.val)
              location = valueMap.indexOf(parentQuestion.value)
            }

            // Add to the total for this category
            // If the parentQuestion has a 0 coefficient, the child question has the coefficient
            if (parentQuestion.input.values[location].coef === 0) {
              // Multiply the current question's value to the parent question's coefficient
              total += question.value * question.input.values[0].coef
            } else {
              // Multiply the current question's value to the parent question's coefficient
              if (!isNaN(question.value) && !isNaN(parentQuestion.input.values[location].coef)) total += question.value * parentQuestion.input.values[location].coef
            }

            // eslint-disable-next-line
          } else if (question.input.type == 'value') {
            total += question.value * question.input.values[0].coef
          }
        })
        totals.push(total)
      })

      return totals
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
