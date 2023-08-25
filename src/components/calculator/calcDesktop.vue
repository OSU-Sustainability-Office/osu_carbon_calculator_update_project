<!--
@Author: Jack Woods
@Date:   2018-11-27T13:45:59-08:00
@Filename: calcDesktop.vue
@Last modified by:   Jack Woods
@Last modified time: 2019-02-12T14:38:00-08:00
@Copyright: 2018 Oregon State University
-->

<template>
  <div class="calculator">
    <transition name="calculator">
      <el-col id="rightBorder" :span="16" v-show="!lastSlide">
        <el-row class="centerContent">
          <el-col :span="2" centered>
            <el-button
              class="headerButton"
              v-on:click="prev()"
              type="primary"
              icon="el-icon-arrow-left"
              :disabled="currentTitle === 0"
            ></el-button>
          </el-col>
          <el-col :span="20">
            <h1>{{ determineTitle }}</h1>
          </el-col>
          <el-col :span="2">
            <el-button class="headerButton" v-on:click="next()" type="primary"
              ><i class="el-icon-arrow-right"></i
            ></el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1" :span="22">
            <br />
            <calcCarousel
              :mobile="false"
              :currentTitle="currentTitle"
              ref="calcCarousel"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1" :span="22">
            <el-progress
              :show-text="false"
              :stroke-width="18"
              :percentage="progressPercentage > 0 ? progressPercentage : 2.5"
            ></el-progress>
          </el-col>
        </el-row>
      </el-col>
    </transition>

    <!-- Begin Charts Div -->
    <el-col :span="chartsWidth" ref="results">
      <el-button
        id="chartsBackButton"
        v-if="lastSlide"
        v-on:click="prev()"
        type="primary"
        icon="el-icon-arrow-left"
      >
        Back</el-button
      >
      <chartContainer ref="charts" :lastSlide="lastSlide" />
    </el-col>
  </div>
</template>

<script>
// Import components for each question type
import chartContainer from '@/components/calculator/graphs/chartContainer'
import calcCarousel from '@/components/calculator/calcCarousel'

export default {
  name: 'calcDesktop',
  components: {
    chartContainer,
    calcCarousel
  },
  computed: {
    chartsWidth () {
      return this.lastSlide ? 24 : 8
    },
    categories () {
      return this.$store.getters['calculator/categories']
    },
    determineTitle () {
      if ( this.currentTitle === 0 ) return 'About the Calculator'
      else if ( this.currentTitle === 6 ) return 'Waste'
      else return this.categories[this.currentTitle - 1].title // Subtract 1 to remove the Introduction from the calculation
    },
    progressPercentage () {
      return ( this.currentTitle / 6 ) * 100
    }
  },
  data () {
    return {
      lastSlide: false,
      currentTitle: 0,
      focus: 0
    }
  },
  methods: {
    next () {
      if ( this.$refs.calcCarousel.$refs.carousel.activeIndex === 0 ) {
        this.lastSlide = true
        this.openOffsetsDialog()
      } else {
        this.currentTitle++
        this.$refs.calcCarousel.$refs.carousel.next()
      }
    },
    prev () {
      if ( this.lastSlide ) {
        this.lastSlide = false
      } else {
        this.currentTitle--
        this.$refs.calcCarousel.$refs.carousel.prev()
      }
    },
    setFocus ( newSlideIndex, oldSlideIndex ) {
      let scope = this
      let carousel = document.querySelector( '.carousel' )
      if ( carousel ) {
        // Listen for the "transitioned" event on the carousel element
        carousel.addEventListener(
          'transitioned',
          function () {
            scope.focus = newSlideIndex
          },
          { once: true }
        )

        // Update the carousel index
        this.$nextTick( () => {
          this.$refs.carousel.setSlide( newSlideIndex )
        } )
      }
    },
    // This method opens the "carbon offsets" dialog when the calculator reaches its final page.
    openOffsetsDialog () {
      this.$confirm(
        'One way to <b>decrease your carbon footprint</b> is to purchase carbon offsets! Offsets fund projects that reduce carbon emissions elsewhere, such as a wind farm or forestry project. The OSU Sustainability Office has a new voluntary carbon offsets program for OSU-funded travel. For personal travel, individuals are able to purchase offsets from multiple vendors.',
        'Carbon Offsets Available!',
        {
          confirmButtonText: 'Learn More',
          cancelButtonText: 'No Thanks',
          dangerouslyUseHTMLString: true
        }
      ).then( () => {
        window.open(
          'https://fa.oregonstate.edu/sustainability/carbon-offsets-osu-funded-travel',
          '_blank'
        )
      } )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/element-variables.scss";

.calculator-enter-active,
.calculator-leave-active {
  transition: width 0.5s;
}
/* .fade-leave-active below version 2.1.8 */
.calculator-enter,
.calculator-leave-to {
  width: 0;
}
.el-carousel__item {
  overflow-y: visible;
}
.centerContent {
  text-align: center;
}
.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.calculator {
  margin: 1.5vh;
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
.headerButton {
  height: 6vh;
  font-size: 3vh;
  line-height: 6vh;
  text-align: center;
  padding: 0;
  width: 6vh;
}
#waste-text {
  position: relative;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 6px;
  margin-left: 15%;
  margin-right: 15%;
  top: 20%;
  padding: 1vh;
}
#chartsBackButton {
  margin-bottom: 1vh;
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
  font-size: 4vh;
  line-height: 6vh;
}
</style>
