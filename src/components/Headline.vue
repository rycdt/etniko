<template>
  <section>
    <div id="main" class="invisible sm:invisible md:visible lg:visible wh-full">
<!--      <audio loop autoplay>-->
<!--        <source src="@/assets/audio/wild_light_wind.mp3">-->
<!--      </audio>-->
      <div class="main-bg" v-bind:style="{ 'background-image': 'url(' + background[bgType] + ')' }"></div>
      <div class="main-bg fadeGlow" v-bind:style="{ 'background-image': 'url(' + effect + ')' }"/>
<!--      <div class="main-bg" v-bind:style="{ 'background-image': 'url(' + flag + ')' }"/>-->
<!--      <div class="main-bg" v-bind:style="{ 'background-image': 'url(' + fire + ')' }"/>-->
      <div class="grid grid-cols-12 grid-rows-5 grid-flow-col wh-full z-20">
        <div v-for="bg in slicedBackgroundsLink"
             :class="`${bg.class} ${bg.gridClass}`"
             :key="bg.index"
             @mouseover="mouseOver(bg)"
             @mouseleave="mouseLeave(bg)"
             @click="mouseClick(bg)">
          <div :class="`${bg.textAnim}`">
            <span class="textGlow">{{ bg.text }}</span></div>
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
        night: require('@/assets/bonfire_night_update.png')
      },
      fire: require('@/assets/fire.gif'),
      flag: require('@/assets/flag.gif'),
      sliceCount: 60,
      slicedBackgroundsLink: [],
      hoverEffectsLink: [],
      hovers: hovers,
      effect: {},
      mintAmount: 1,
      fireText: '',
      textAnim: '',
      // audio: new Audio(require('../assets/audio/wild_light_wind.mp3')),
      itemAudio: new Audio(require('../assets/audio/item_click.mp3')),
      hoverId: null
    }
  },
  mounted () {
    this.setSlicedBackgrounds()
    // this.audio.loop = true
    // this.audio.autoplay = true
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
          text: '',
          link: hover ? hover.link : '',
          textAnim: '',
          gridId: hover ? hover.id : null,
          gridTextVisible: hover ? hover.gridTextVisible : false,
          gridClass: hover? hover.gridClass : ''
        })
      })
    },
    mouseClick (bg) {
      // this.audio.play()
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
        if (!this.hoverId || hover.id !== this.hoverId) {
          this.itemAudio.play()
        }
        this.hoverId = hover.id
      } else {
        this.hoverId = null
      }
      if (bg.hasHoverEffect) {
        this.effect = hover.effect
        if (slicedBg) {
          slicedBg.textAnim = hover.textAnim
          slicedBg.text = hover.text
          slicedBg.gridTextVisible = true
        }
      }
    },
    mouseLeave (bg) {
      let hover = this.hovers.find(data => data.tiles.includes(bg.index))
      let slicedBg = null
      if (hover) {
        slicedBg = this.slicedBackgroundsLink.find(data => data.index === hover.id)
        this.hoverId = hover.id
      } else {
        this.hoverId = null
      }
      if (bg.hasHoverEffect) {
        this.effect = ''
        this.textAnim = ''
        if (slicedBg) {
          slicedBg.textAnim = ''
          slicedBg.text = ''
          slicedBg.gridTextVisible = false
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