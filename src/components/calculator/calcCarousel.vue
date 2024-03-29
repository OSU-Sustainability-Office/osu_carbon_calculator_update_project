<!--
@Author: Jack Woods
@Date:   2019-01-31T14:52:35-08:00
@Email:  jackrwoods@gmail.com
@Filename: calcCarousel.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-18T10:53:49-08:00
@Copyright: 2019 Oregon State University
-->
<template>
  <el-carousel
    v-loading="loading"
    ref="carousel"
    trigger="click"
    height="76vh"
    :autoplay="false"
    arrow="never"
    :initial-index="1"
    indicator-position="none"
    @change="setFocus"
  >
    <!-- Waste category -->
    <el-carousel-item name="Waste">
      <!-- The waste category is positioned first as a workaround. It refuses to render after the calculator categories, so I'm rendering it first and looping around to it. -->
      <FocusLock :disabled="focus !== 0">
        <div class="bg-image">
          <div id="waste-text">
            <h3 class="centered">Why are there no solid waste questions?</h3>
            <p>
              Direct disposal emissions from solid waste in Corvallis are
              negligible for a few reasons. About 10 miles North of Corvallis,
              the Coffin Butte landfill captures methane, which substantially
              reduces emissions associated with waste. Additionally, the OSU
              Corvallis campus composts and recycles enough tons of waste per
              year to counteract most of those emissions.
            </p>
          </div>
        </div>
      </FocusLock>
    </el-carousel-item>

    <!-- Intro Category -->
    <el-carousel-item name="About">
      <FocusLock :disabled="focus !== 1">
        <h3 class="centered" v-if="mobile">About the Calculator</h3>
        <p>
          This carbon footprint calculator has been developed to help members of
          the Oregon State University community understand the connection
          between their everyday actions and their carbon emissions. This is an
          important step in
          <a
            href="http://fa.oregonstate.edu/sustainability/planning-policy-assessment/institutional-carbon-neutrality/osu-carbon-planning"
            >Oregon State University’s initiative to be carbon neutral by
            2025</a
          >.
        </p>
        <p>
          To get started, please select which of the following best describes
          you:
        </p>
        <center>
          <el-radio
            v-model="studentType"
            label="On Campus Resident Student"
            border
          ></el-radio>
          <el-radio
            v-model="studentType"
            label="Full Time Commuter Student, Staff, or Faculty"
            border
          ></el-radio>
          <el-radio
            v-model="studentType"
            label="Part-time Commuter Student, Staff, or Faculty"
            border
          ></el-radio>
          <el-radio
            v-model="studentType"
            label="Not Affiliated with OSU"
            border
          ></el-radio>
        </center>
        <center>
          <p>
            <b>Hint</b>: You can use the arrow buttons at the top of the page to
            navigate between categories.
          </p>
        </center>
      </FocusLock>
    </el-carousel-item>

    <!-- Iterate over each category and render the questions -->
    <el-carousel-item
      v-for="category in categories"
      :key="category.categoryID"
      :name="category.title"
    >
      <FocusLock :disabled="focus !== category.categoryID + 2">
        <h3 class="centered" v-if="mobile">{{ category.title }}</h3>
        <component
          class="extra-margin"
          v-for="(question, index) in category.questions"
          :key="index"
          v-bind:is="question.input.type"
          v-bind:questionData="question"
          v-bind:index="index"
          v-bind:categoryID="category.categoryID"
          v-model="question.value"
        />
      </FocusLock>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
// Import components for each question type
import list from '@/components/calculator/questions/list'
import dependentValue from '@/components/calculator/questions/dependentValue'
import value from '@/components/calculator/questions/value'
import paragraph from '@/components/calculator/questions/paragraph'
import tableQuestion from '@/components/calculator/questions/tableQuestion'

// Import tool for locking tab focusing
import FocusLock from 'vue-focus-lock'

export default {
  name: 'calcCarousel',
  components: {
    list,
    dependentValue,
    value,
    paragraph,
    tableQuestion,
    FocusLock
  },
  props: {
    currentTitle: {
      type: Number,
      default: 0
    },
    mobile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    categories () {
      return this.$store.getters['calculator/categories']
    },
    loading () {
      return this.$store.getters['calculator/categories'].length < 1
    },
    activeIndex () {
      return this.$refs.carousel.activeIndex
    }
  },
  data () {
    return {
      studentType: 'On Campus',
      focus: 0
    }
  },
  methods: {
    setFocus (newSlideIndex, oldSlideIndex) {
      let scope = this
      let carousel = document.querySelector('.carousel')

      // Listen for the "transitioned" event on the carousel element
      if (carousel) {
        carousel.addEventListener(
          'transitioned',
          function () {
            scope.focus = newSlideIndex
          },
          { once: true }
        )

        // Update the carousel index
        this.$nextTick(() => {
          this.$refs.carousel.setSlide(newSlideIndex)
        })
      }
    }
  },
  watch: {
    studentType () {
      this.$store.commit({
        type: 'user/setStudentType',
        newType: this.studentType
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/element-variables.scss";
.el-carousel__item {
  overflow-y: visible;
}
.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
