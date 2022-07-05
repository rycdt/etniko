<template>
  <section>
    <div class="invisible sm:invisible md:visible lg:visible wh-full">
      <div class="main-bg" v-bind:style="{ 'background-image': 'url(' + background[bgType] + ')' }"></div>
      <div class="main-bg" v-bind:style="effect"/>
      <div class="main-bg" v-bind:style="fire"/>
      <div class="grid grid-cols-12 grid-rows-5 grid-flow-col wh-full z-10">
        <div v-for="bg in slicedBackgroundsLink" :class="bg.class" :key="bg.index" @mouseover="mouseOver(bg)" @mouseleave="mouseLeave(bg)" >{{ bg.index }}</div>
      </div>
<!--      <div class='grid wh-full place-content-center z-20'>-->
<!--        <div class='text-center'>-->
<!--          <div>-->
<!--            <button :onclick="handleDecrement">-</button>-->
<!--            <input type='number' v-model="mintAmount"/>-->
<!--            <button :onclick="handleIncrement">+</button>-->
<!--          </div>-->
<!--          <button :onclick="handleMint">Mint</button>-->
<!--        </div>-->
<!--      </div>-->
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
      sliceCount: 60,
      slicedBackgroundsLink: [],
      hoverEffectsLink: [],
      hovers: {
        41: {
          effect: require('@/assets/hover_effects/hut1.png')
        }
      },
      mintAmount: 1,
      fire: { 'background-image': 'url(' + require('@/assets/fire.gif') + ')' },
      effect: {}
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
        this.slicedBackgroundsLink.push({
          index: value,
          class: value % 2 === 1 ? 'grid-gray' : 'grid-white',
          // eslint-disable-next-line no-prototype-builtins
          hasHoverEffect: this.hovers.hasOwnProperty(value)
        })
      })
    },
    mouseOver (bg) {
      if (bg.hasHoverEffect) {
        this.effect = { 'background-image': 'url(' + this.hovers[bg.index].effect + ')' }
      }
    },
    mouseLeave (bg) {
      if (bg.hasHoverEffect) {
        this.effect = {}
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