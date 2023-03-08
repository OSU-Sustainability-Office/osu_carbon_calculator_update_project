<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: calcMobile.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-11T18:09:59-08:00
@Copyright: 2019 Oregon State University
-->

<template>
<div class="calculator">

  <!-- "Floating" Progress Bar and Next/Prev Buttons -->
  <el-row>
    <el-col :span="24">
      <el-card class="box-card" shadow="always">
        <!-- Buttons will be layered over el-progress -->
        <el-col :span="24" id="buttonsContainer">
          <div id="leftButton"><el-button class="button" v-on:click="prev()" :disabled="currentTitle === 0" icon="el-icon-arrow-left"></el-button></div>
          <div id="rightButton"><el-button class="button" v-on:click="next()" icon="el-icon-arrow-right"></el-button></div>
        </el-col>
        <div class="expandButton" @click="chartsVisible = !chartsVisible">
          Show Results <i class="el-icon-arrow-down"></i>
        </div>
        <el-progress :show-text="false" :stroke-width="24" :percentage="progressPercentage > 0 ? progressPercentage : 2.5"></el-progress>
      </el-card>
    </el-col>
  </el-row>

  <!-- Calculator Carousel -->
  <el-row>
    <el-col :offset="1" :span="22">
      <calcCarousel :mobile="true" :currentTitle="currentTitle" ref="calcCarousel"/>
    </el-col>
  </el-row>

  <!-- "Real time" graph overlay -->
  <el-collapse-transition>
    <el-card id="chartsCard" v-if="chartsVisible" shadow="always">
      <div class="expandButton" @click="chartsVisible = !chartsVisible">
        Close <i class="el-icon-arrow-up"></i>
      </div>
      <chartContainer ref="charts" :chartsWidth="chartsWidth" :lastSlide="false" />
    </el-card>
  </el-collapse-transition>
</div>
</template>

<script>
// Import components for each question type
import calcCarousel from '@/components/calculator/calcCarousel'
import chartContainer from '@/components/calculator/graphs/chartContainer'

export default {
  name: 'calcMobile',
  components: {
    calcCarousel,
    chartContainer
  },
  computed: {
    categories () { return this.$store.getters['calculator/categories'] },
    loading () { return (this.$store.getters['calculator/categories'].length < 1) },
    determineTitle () {
      if (this.currentTitle === 0) return 'About the Calculator'
      else if (this.currentTitle === 6) return 'Waste'
      else return this.categories[this.currentTitle - 1].title // Subtract 1 to remove the Introduction from the calculation
    },
    progressPercentage () {
      return this.currentTitle / 6 * 100
    }
  },
  data () {
    return {
      currentTitle: 0,
      chartsVisible: false
    }
  },
  methods: {
    next () {
      if (this.$refs.calcCarousel.$refs.carousel.activeIndex === 0) {
        this.chartsVisible = true
      } else {
        this.currentTitle++
        this.$refs.calcCarousel.$refs.carousel.next()
      }
    },
    prev () {
      if (this.chartsVisible) {
        this.chartsVisible = false
      } else {
        this.currentTitle--
        this.$refs.calcCarousel.$refs.carousel.prev()
      }
    },
    setFocus (newSlideIndex, oldSlideIndex) {
      let scope = this
      let carousel = document.querySelector('.carousel')

      // Listen for the "transitioned" event on the carousel element
      carousel.addEventListener('transitioned', function () {
        scope.focus = newSlideIndex
      }, { once: true })

      // Update the carousel index
      this.$nextTick(() => {
        this.$refs.carousel.setSlide(newSlideIndex)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import '@/assets/element-variables.scss';

.el-carousel__item {
  overflow-y: visible;
}
.button {
  border-radius: 50px;
  width: 25px;
  height: 25px;
  padding: 0px;
}
.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.expandButton {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 40vw;
  margin: auto;
  z-index: 999;
  padding-top: 0px;
  text-align: center;
  font-size: 1em;
  border: 1px solid $--color-black;
  border-top: 0px;
  border-radius: 4px;
}
.expandButton:hover {
  color: $--color-primary;
  cursor: pointer;
}
#chartsCard {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 999;
  margin: 1px;
}
#buttonsContainer {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 999;
  margin-top: 1px;
  padding: 20px;
}
#leftButton {
  display: inline-block;
  color: $--color-primary;
}
#rightButton {
  text-align: right;
  display: inline-block;
  float: right;
  color: $--color-primary;
}
</style>
