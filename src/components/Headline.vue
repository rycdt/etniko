<template>
  <section>
    <div class="invisible sm:invisible md:visible lg:visible wh-full">
      <div class="cursor-pointer flex items-center absolute z-30 mt-4 ml-7">
        <span class="text-3xl text-indigo-600 mr-1">
         <img src="@/assets/logo_landscape_reverse.png" class="h-12"/>
        </span>
      </div>
      <div class="main-bg" v-bind:style="{ 'background-image': 'url(' + background[bgType] + ')' }"></div>
      <div class="main-bg" v-bind:style="effect"/>
      <div class="main-bg" v-bind:style="fire"/>
      <div class="grid grid-cols-12 grid-rows-5 grid-flow-col wh-full z-20">
        <div v-for="bg in slicedBackgroundsLink"
             :class="bg.class"
             :key="bg.index"
             @mouseover="mouseOver(bg)"
             @mouseleave="mouseLeave(bg)"
             @click="mouseClick(bg)">{{ bg.index }}</div>
      </div>
      <div class='grid wh-full place-content-center z-10'>
        <div class="text-style"><span class="fire">{{ fireText }}</span></div>
<!--        <div class='text-center'>-->
<!--          <div>-->
<!--            <button :onclick="handleDecrement">-</button>-->
<!--            <input type='number' v-model="mintAmount"/>-->
<!--            <button :onclick="handleIncrement">+</button>-->
<!--          </div>-->
<!--          <button :onclick="handleMint">Mint</button>-->
<!--        </div>-->
      </div>
    </div>

    <mobile-vue :bgType="bgType"/>
  </section>
</template>

<script>

import Etniko from '../artifacts/contracts/Etniko.sol/Etniko.json';
import {ethers, BigNumber} from 'ethers';
const etnikoAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
import MobileVue from '@/components/Mobile';

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
        night: require('@/assets/bonfire_night.png')
      },
      backgroundPortrait: {
        day: require('@/assets/bg_day_portrait.jpg'),
        night: require('@/assets/bg_night_portrait.jpg')
      },
      fire: { 'background-image': 'url(' + require('@/assets/fire.gif') + ')' },
      sliceCount: 60,
      slicedBackgroundsLink: [],
      hoverEffectsLink: [],
      hovers: [
        {
          tiles: [40, 41, 42, 45, 46 ,47, 50, 51, 52, 53, 55, 56, 57, 58],
          effect: require('@/assets/hover_effects/hut1.png'),
          text: 'Gallery',
          link: ''
        },
        {
          tiles: [20, 25, 26, 30, 31, 35, 36],
          effect: require('@/assets/hover_effects/hut2.png'),
          text: 'OpenSea',
          link: ''
        },
        {
          tiles: [5, 10, 11, 12, 15, 16, 17, 21, 22],
          effect: require('@/assets/hover_effects/hut3.png'),
          text: 'Discord',
          link: ''
        },
        {
          tiles: [0, 1, 2, 3, 6, 7, 8],
          effect: require('@/assets/hover_effects/hut4.png'),
          text: 'Twitter',
          link: 'https://twitter.com/etniko_io'
        }
      ],
      effect: {},
      mintAmount: 1,
      fireText: ''
    }
  },
  mounted () {
    this.setSlicedBackgrounds()
    console.log(this.bgType)
  },
  methods: {
    async handleMint() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            etnikoAddress,
            Etniko.abi,
            signer
        );

        try {
          const response = await contract.mint(BigNumber.from(this.mintAmount), {
            value: ethers.utils.parseEther((0.01 * this.mintAmount).toString())
          });

          await provider.waitForTransaction(response.hash);
          const receipt = await provider.getTransactionReceipt(response.hash);

          receipt.logs.forEach(log => {
            console.log(parseInt(log.topics[3], 16))
            this.getURI(contract, log.topics[3])
          })
          console.log(receipt)
          console.log('response: ', response)
        } catch (err) {
          console.log(err)
        }
      }
    },
    handleDecrement() {
      if (this.mintAmount <= 1) return;
      this.mintAmount -= 1
    },
    handleIncrement(){
      if (this.mintAmount >= 3) return;
      this.mintAmount += 1
    },
    async getURI(contract, tokenId) {
      const uri = await contract.tokenURI(tokenId);
      console.log(uri);
    },
    setSlicedBackgrounds () {
      [ ...Array(this.sliceCount) ].forEach((index, value) => {
        let hover = this.hovers.find(data => data.tiles.includes(value))
        this.slicedBackgroundsLink.push({
          index: value,
          class: value % 2 === 1 ? 'grid-gray' : 'grid-white',
          // eslint-disable-next-line no-prototype-builtins
          hasHoverEffect: !!hover,
          effect: hover ? { 'background-image': 'url(' + hover.effect + ')' } : '',
          text: hover ? hover.text : '',
          link: hover ? hover.link : ''
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
      if (bg.hasHoverEffect) {
        this.effect = bg.effect
        this.fireText = bg.text
      }
    },
    mouseLeave (bg) {
      if (bg.hasHoverEffect) {
        this.effect = {}
        this.fireText = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.grid-gray {
  /* The image used */
  /* Full height */
  //height: 100vh;

  /* Center and scale the image nicely */
  background-size: cover;
  background: gray no-repeat center;
  opacity: 0%;
}

.grid-white {
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
  @apply absolute h-screen w-screen z-0
}

.wh-full {
  @apply h-screen w-screen absolute
}
</style>