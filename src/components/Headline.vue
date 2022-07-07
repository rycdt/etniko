<template>
  <section>
    <div class="invisible sm:invisible md:visible lg:visible wh-full">
<!--      <div class="cursor-pointer flex items-center absolute z-30 mt-4 ml-7">-->
<!--        <span class="text-3xl text-indigo-600 mr-1">-->
<!--         <img src="@/assets/logo_landscape_reverse.png" class="h-12"/>-->
<!--        </span>-->
<!--      </div>-->
      <div class="main-bg" v-bind:style="{ 'background-image': 'url(' + background[bgType] + ')' }"></div>
      <div class="main-bg fadeGlow" v-bind:style="{ 'background-image': 'url(' + effect + ')' }"/>
<!--      <div class="main-bg" v-bind:style="{ 'background-image': 'url(' + fire + ')' }"/>-->
      <div class="grid grid-cols-12 grid-rows-5 grid-flow-col wh-full z-20">
        <div v-for="bg in slicedBackgroundsLink"
             :class="`${bg.class} ${bg.gridClass}`"
             :key="bg.index"
             @mouseover="mouseOver(bg)"
             @mouseleave="mouseLeave(bg)"
             @click="mouseClick(bg)">
<!--          <span v-if="bg.gridTextVisible" class="textGlow text-sm">{{ bg.index === bg.gridId ? bg.text : '' }}</span>-->
        </div>
      </div>
      <div class='grid wh-full place-content-center z-10'>
        <div :class="`${textAnim}`">
          <span class="textGlow">{{ fireText }}</span>
        </div>
      </div>
    </div>

    <mobile-vue :bgType="bgType"/>
  </section>
</template>

<script>

import MobileVue from '@/components/Mobile';
import hovers from './data/hovers'

export default {
  name:'headline-vue',
  props: {
    bgType: {
      default: 'night',
      type: String
    }
  },
  components: {
    MobileVue
  },
  data() {
    return {
      background: {
        day: require('@/assets/bonfire_day.png'),
        night: require('@/assets/bonfire_night.png')
      },
      backgroundPortrait: {
        day: require('@/assets/bg_day_portrait.jpg'),
        night: require('@/assets/bg_night_portrait.jpg')
      },
      fire: require('@/assets/fire.gif'),
      sliceCount: 60,
      slicedBackgroundsLink: [],
      hoverEffectsLink: [],
      hovers: hovers,
      effect: {},
      mintAmount: 1,
      fireText: '',
      textAnim: ''
    }
  },
  mounted () {
    this.setSlicedBackgrounds()
  },
  methods: {
    setSlicedBackgrounds () {
      [ ...Array(this.sliceCount) ].forEach((index, value) => {
        let hover = this.hovers.find(data => data.tiles.includes(value))
        this.slicedBackgroundsLink.push({
          index: value,
          class: value % 2 === 1 ? '' : '',
          // eslint-disable-next-line no-prototype-builtins
          hasHoverEffect: !!hover,
          effect: hover ? hover.effect : '',
          text: hover ? hover.text : '',
          link: hover ? hover.link : '',
          textAnim: hover ? hover.textAnim: '',
          gridId: hover ? hover.id : null,
          gridTextVisible: !!hover,
          gridClass: hover? hover.gridClass : ''
        })
      })
    },
    mouseClick (bg) {
      if (bg.link) {
        window.open(bg.link);
        return true;
      }
    },
    mouseOver (bg) {
      let hover = this.hovers.find(data => data.tiles.includes(bg.index))
      let slicedBg = null
      if (hover) {
        slicedBg = this.slicedBackgroundsLink.find(data => data.index === hover.id)
      }
      if (bg.hasHoverEffect) {
        this.effect = bg.effect
        this.fireText = bg.text
        this.textAnim = bg.textAnim
        if (slicedBg) {
          slicedBg.gridTextVisible = false
        }
      }
    },
    mouseLeave (bg) {
      let hover = this.hovers.find(data => data.tiles.includes(bg.index))
      let slicedBg = null
      if (hover) {
        slicedBg = this.slicedBackgroundsLink.find(data => data.index === hover.id)
      }
      if (bg.hasHoverEffect) {
        this.effect = ''
        this.fireText = ''
        this.textAnim = ''
        if (slicedBg) {
          slicedBg.gridTextVisible = true
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-bg {
  /* The image used */
  /* Full height */

  /* Center and scale the image nicely */
  background: no-repeat center;
  background-size: cover;
  @apply absolute h-screen w-screen z-0
}

.wh-full {
  @apply h-screen w-screen absolute
}
</style>