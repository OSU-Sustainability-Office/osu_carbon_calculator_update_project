<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: calcCarousel.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-13T12:02:21-08:00
@Copyright: 2018 Oregon State University
-->

<template>
<div>
  <transition name="calculator">
    <el-col :span="16" v-show="!lastSlide">

      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>{{currentTitle == 0 ? 'Introduction' : categories[currentTitle - 1].title}}</span>
          <el-progress :show-text="false" :stroke-width="18" :percentage="currentTitle / 7 * 100"></el-progress>
        </div>
        <div>
          <el-carousel v-loading="loading" ref="carousel" trigger="click" height="35em" :autoplay="false" arrow="never" indicator-position="none">
            <el-carousel-item name="About">
              <h1>About the Calculator</h1>
              <p>This carbon footprint calculator has been developed to help members of the Oregon State University community understand the connection between their everyday actions and their carbon emissions. This is an important step in <a href="http://fa.oregonstate.edu/sustainability/planning-policy-assessment/institutional-carbon-neutrality/osu-carbon-planning">Oregon State University’s initiative to be carbon neutral by 2025</a>.</p>
              <p>This calculator is based on a calculator developed by Santa Clara University. For more information, please visit <a href="http://www.scu.edu/ethics/practicing/focusareas/environmental_ethics/carbon-footprint/create_calc.html">their website</a>.</p>

              <el-button-group>
                <el-button v-on:click="next()" type="primary">Next <i class="el-icon-arrow-right el-icon-right"></i></el-button>
              </el-button-group>

            </el-carousel-item>

            <!-- Iterate over each category and render the questions -->
            <el-carousel-item v-for="category in categories" :key="category.categoryID" :name="category.title">

              <component v-for="(question, index) in category.questions" :key="index" v-bind:is="question.input.type" v-bind:questionData="question" v-bind:index="index" v-bind:categoryID="category.categoryID" v-model="question.value" />

              <br />
              <el-button-group>
                <el-button v-on:click="prev()" type="primary" icon="el-icon-arrow-left"></el-button>
                <el-button v-on:click="next()" type="primary"><i class="el-icon-arrow-right el-icon-right"></i></el-button>
              </el-button-group>

            </el-carousel-item>
          </el-carousel>
        </div>
      </el-card>

    </el-col>
  </transition>

  <!-- Begin Charts Div -->
  <el-col :span="chartsWidth" ref="results">
    <el-button v-if="lastSlide" v-on:click="prev()" type="primary" icon="el-icon-arrow-left"></el-button>
    <chartContainer ref="charts" :lastSlide="lastSlide" />
  </el-col>

</div>
</template>

<script>
// Import components for each question type
import list from '@/components/calculator/questions/list'
import dependentValue from '@/components/calculator/questions/dependentValue'
import value from '@/components/calculator/questions/value'
import paragraph from '@/components/calculator/questions/paragraph'
import tableQuestion from '@/components/calculator/questions/tableQuestion'
import chartContainer from '@/components/calculator/graphs/chartContainer'

export default {
  name: 'calcCarousel',
  components: {
    list,
    dependentValue,
    value,
    paragraph,
    tableQuestion,
    chartContainer
  },
  computed: {
    categories () { return this.$store.getters['calculator/categories'] },
    loading () { return (this.$store.getters['calculator/categories'].length < 1) },
    chartsWidth () { return this.lastSlide ? 23 : 8 }
  },
  data () {
    return {
      lastSlide: false,
      currentTitle: 0
    }
  },
  methods: {
    next () {
      if (this.$refs.carousel.activeIndex === 6) {
        this.lastSlide = true
      } else {
        this.$refs.carousel.next()
        this.currentTitle++
      }
    },
    prev () {
      if (this.lastSlide) {
        this.lastSlide = false
        this.$refs.carousel.setActiveItem(6)
      } else {
        this.$refs.carousel.prev()
        this.currentTitle--
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calculator-enter-active, .calculator-leave-active {
  transition: width .5s;
}
.calculator-enter, .calculator-leave-to /* .fade-leave-active below version 2.1.8 */ {
  width: 0;
}
.el-carousel__item {
  overflow-y: visible;
}
</style>
