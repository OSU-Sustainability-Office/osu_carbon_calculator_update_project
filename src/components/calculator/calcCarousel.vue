<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: calcCarousel.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-01-17T13:13:29-08:00
@Copyright: 2018 Oregon State University
-->

<template>
<div>
  <transition name="calculator">
    <el-col :span="16" v-show="!lastSlide">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <el-row class="centerContent">
            <el-col :span="2" centered><el-button v-on:click="prev()" type="primary" icon="el-icon-arrow-left" :disabled="currentTitle === 0"></el-button></el-col>
            <el-col :span="20"><h1>{{determineTitle}}</h1></el-col>
            <el-col :span="2"><el-button v-on:click="next()" type="primary"><i class="el-icon-arrow-right el-icon-right"></i></el-button></el-col>
          </el-row>
        </div>
        <div>
          <el-carousel v-loading="loading" ref="carousel" trigger="click" height="35em" :autoplay="false" arrow="never" :initial-index="1" indicator-position="none">
            <!-- Waste category -->
            <el-carousel-item name="Waste">
              <!-- No matter what I try, this category will render before any of the calculation question categories. Unfortunately, I combed through the Element UI code and could not find any way to re-arrange carousel items. This is now placed first as a workaround, since the carousel loops back to the beginning. -->
              <div class="bg-image">
                <div id="waste-text">
                  <h3 class="centered">Why are there no solid waste questions?</h3>
                  <p>Direct disposal emissions from solid waste in Corvallis are negligible for a few reasons. About 10 miles North of Corvallis, the Coffin Butte landfill captures methane, which substantially reduces emissions associated with waste. Additionally, the OSU Corvallis campus composts and recycles enough tons of waste per year to counteract most of those emissions.</p>
                </div>
              </div>
            </el-carousel-item>

            <!-- Intro Category -->
            <el-carousel-item name="About">
              <p>This carbon footprint calculator has been developed to help members of the Oregon State University community understand the connection between their everyday actions and their carbon emissions. This is an important step in <a href="http://fa.oregonstate.edu/sustainability/planning-policy-assessment/institutional-carbon-neutrality/osu-carbon-planning">Oregon State University’s initiative to be carbon neutral by 2025</a>.</p>
              <p>To get started, please select which of the following best describes you:</p>
              <el-radio-group v-model="studentType">
                <el-radio-button label="On Campus"></el-radio-button>
                <el-radio-button label="Off Campus Full-time Commuter Student or Staff"></el-radio-button>
                <el-radio-button label="Part-time Commuter Student or Staff"></el-radio-button>
              </el-radio-group>
            </el-carousel-item>

            <!-- Iterate over each category and render the questions -->
            <el-carousel-item v-for="category in categories" :key="category.categoryID" :name="category.title">

              <component class="extra-margin" v-for="(question, index) in category.questions" :key="index" v-bind:is="question.input.type" v-bind:questionData="question" v-bind:index="index" v-bind:categoryID="category.categoryID" v-model="question.value" />

            </el-carousel-item>
          </el-carousel>
        </div>
      </el-card>
      <el-card>
        <el-progress :show-text="false" :stroke-width="18" :percentage="currentTitle / 6 * 100"></el-progress>
      </el-card>

    </el-col>
  </transition>

  <!-- Begin Charts Div -->
  <el-col :span="chartsWidth" ref="results">
    <el-button v-if="lastSlide" v-on:click="prev()" type="primary" icon="el-icon-arrow-left"></el-button>
    <chartContainer ref="charts" :chartsWidth="chartsWidth" :lastSlide="lastSlide" :studentType="studentType" />
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
    chartsWidth () { return this.lastSlide ? 24 : 8 },
    determineTitle () {
      if (this.currentTitle === 0) return 'About the Calculator'
      else if (this.currentTitle === 6) return 'Waste'
      else return this.categories[this.currentTitle - 1].title // Subtract 1 to remove the Introduction from the calculation
    }
  },
  data () {
    return {
      lastSlide: false,
      currentTitle: 0,
      studentType: 'On Campus'
    }
  },
  methods: {
    next () {
      if (this.$refs.carousel.activeIndex === 0) {
        this.lastSlide = true
      } else {
        this.$refs.carousel.next()
        this.currentTitle++
      }
    },
    prev () {
      if (this.lastSlide) {
        this.lastSlide = false
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
.extra-margin {
  margin-bottom: 1.5em;
}
.centerContent {
  text-align: center;
}
.el-progress-bar__inner {
  border: 2px solid #000;
}
.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}
.img-wrapper {
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.bg-image {
  background-image: url("../../../public/static/images/waste.jpg");
  background-size: cover;
  border-radius: 2px;
  height: 98%;
  border: 2px solid #000;
  border-radius: 2px;
}
#waste-text {
  position: relative;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 6px;
  margin-left: 15em;
  margin-right: 15em;
  top: 20%;
  padding: 1em;
}
img {
  cursor: pointer;
  border: 2px solid #000;
  border-radius: 2px;
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
h1 {
  padding: .2em;
  margin: 0;
}
</style>
