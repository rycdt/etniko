<template>
  <section>
    <div v-if="day" class="main-bg absolute z-0" v-bind:style="{ 'background-image': 'url(' + backgroundDay + ')' }"></div>
    <div v-else class="main-bg absolute z-0" v-bind:style="{ 'background-image': 'url(' + backgroundNight + ')' }"></div>

    <div v-for="hover in hovers" v-bind:key="hover">
      <div class="main-bg absolute z-0" v-if="hover.visible"
           v-bind:style="{ 'background-image': 'url(' + hover.effect + ')' }"
           v-bind:key="hover" />
    </div>
    <div class="grid grid-cols-12 grid-rows-5 grid-flow-col lg:min-h-screen md:relative z-10 flex">
      <div v-for="bg in slicedBackgroundsLink" :class="bg.class" :key="bg.index" @mouseover="mouseOver(bg)" @mouseleave="mouseLeave(bg)" @click="clickCard">{{ bg.index }}</div>
    </div>

    <div class="grid grid-rows-3 grid-flow-col w-full lg:hidden">
      hahaha
    </div>
  </section>
</template>

<script>
export default {
  name:'headline-vue',
  props: ['day'],
  data() {
    return {
      backgroundDay: require('@/assets/bg_day.jpg'),
      backgroundNight: require('@/assets/bg_night.jpg'),
      sliceCount: 60,
      slicedBackgroundsLink: [],
      hoverEffectsLink: [],
      hovers: {
        12: {
          effect: require('@/assets/hover_effects/hover_red_flag.png'),
          visible: false
        },
        13: {
          effect: require('@/assets/hover_effects/hover_red_flag.png'),
          visible: false
        },
        32: {
          effect: require('@/assets/hover_effects/hover_blue_flag.png'),
          visible: false
        },
        33: {
          effect: require('@/assets/hover_effects/hover_blue_flag.png'),
          visible: false
        },
        42: {
          effect: require('@/assets/hover_effects/hover_yellow_flag.png'),
          visible: false
        },
        43: {
          effect: require('@/assets/hover_effects/hover_yellow_flag.png'),
          visible: false
        }
      }
    }
  },
  mounted () {
    this.setSlicedBackgrounds()
  },
  methods: {
    setSlicedBackgrounds () {
      [ ...Array(this.sliceCount) ].forEach((index, value) => {
        this.slicedBackgroundsLink.push({
          index: value,
          class: value % 2 === 1 ? 'bg-gray' : 'bg-white',
          // eslint-disable-next-line no-prototype-builtins
          hasHoverEffect: this.hovers.hasOwnProperty(value)
          // link: `@/assets/bg_night_sliced/bg_night_${(value + 1).toString()}.jpg`,
          // link: require(`@/assets/bg_night_sliced/bg_night_${(value + 1)}.jpg`)
        })
      })
    },
    mouseOver (bg) {
      if (bg.hasHoverEffect) {
        this.hovers[bg.index].visible = true
      }
    },
    mouseLeave (bg) {
      if (bg.hasHoverEffect) {
        this.hovers[bg.index].visible = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.bg-gray {
  /* The image used */
  /* Full height */
  //height: 100vh;

  /* Center and scale the image nicely */
  background-size: cover;
  background: gray no-repeat center;
  opacity: 0%;
}

.bg-white {
  /* The image used */
  /* Full height */
  //height: 100vh;

  /* Center and scale the image nicely */
  background-size: cover;
  background: white no-repeat center;
  opacity: 0%;
}


.main-bg {
  /* The image used */
  /* Full height */

  /* Center and scale the image nicely */
  background: no-repeat center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}

.bg-test {
  /* The image used */
  /* Full height */
  height: 50px;
  width: 50px;

  /* Center and scale the image nicely */
  background: url('../assets/icons/twitter.png') no-repeat center;
  background-size: cover;
}


</style>