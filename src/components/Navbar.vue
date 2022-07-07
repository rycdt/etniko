<template>
<!--  sm:visible md:hidden lg:hidden-->
  <div class="w-full fixed top-0 left-0 z-30">
    <div class="md:flex items-center justify-between py-4 md:px-10 px-7">
      <div class="cursor-pointer flex items-center">
        <span class="text-3xl text-indigo-600 mr-1">
         <img src="@/assets/logo_landscape_reverse.png" class="h-12"/>
        </span>
      </div>
      <div :onclick="setOpen" class="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
        <ion-icon :name="`${this.open ? 'close' : 'menu'}`" color="light"/>
      </div>

      <ul :class="`navbar-menu-mobile ${open ? 'top-20 ' : 'top-[-490px]'}`">
        <div class="sm:visible md:hidden lg:hidden">
          <div class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
            <a class="text-white hover:text-gray-400 duration-500">Twitter</a>
          </div>
          <div class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
            <a class="text-white hover:text-gray-400 duration-500">Discord</a>
          </div>
          <div class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
            <a class="text-white hover:text-gray-400 duration-500">OpenSea</a>
          </div>
          <div class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
            <a class="text-white hover:text-gray-400 duration-500">Gallery</a>
          </div>
        </div>
        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
          <a class="text-white hover:text-gray-400 duration-500">Mint</a>
        </li>
        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
          <a class="text-white hover:text-gray-400 duration-500"
             :onclick="connectAccount">{{ isConnected ? 'Connected' : 'Connect' }}</a>
        </li>
        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
          <a class="text-white hover:text-gray-400 duration-500">{{ currentAccount }}</a>
        </li>
        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
          <a class="text-white hover:text-gray-400 duration-500">{{ chainId }}</a>
        </li>
        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
          <img @click="switchBackground" :src="icon[bgType]" class="h-10"/>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

import Web3 from 'web3';

export default {
  name: 'navbar-vue',
  props: {
    isConnected: {
      default: false,
      type: Boolean
    },
    currentAccount: {
      default: '',
      type: String
    },
    provider: {
      default: null,
      type: Object
    },
    chainId: {
      default: 0,
      type: Number
    },
    networks: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      bgType: 'night',
      icon: {
        day: require('@/assets/icons/day.png'),
        night: require('@/assets/icons/night.png')
      },
      open: true
    }
  },
  mounted() {
  },
  methods: {
    switchBackground() {
      this.bgType = (this.bgType === 'night' ? 'day' : 'night')
      this.$emit('backgroundChanged', this.bgType)
    },
    async connectAccount() {
      await this.provider.request({
        method: "eth_requestAccounts",
      });
      await this.onLogin(this.provider);
    },
    async onLogin (provider) {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      if (accounts.length === 0) {
        this.$emit('currentAccountChanged', null)
        this.$emit('isConnectedChanged', false)
      } else if (accounts[0] !== this.currentAccount) {
        this.$emit('chainIdChanged', chainId)
        this.$emit('currentAccountChanged', accounts[0])
        this.$emit('isConnectedChanged', true)
      }
    },
    setOpen() {
      this.open = !this.open
    },
  }
}
</script>

<style scoped>
/*.navbar-menu {*/
/*    @apply sm:invisible md:visible lg:visible md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in*/
/*}*/
/*sm:visible md:hidden lg:hidden*/
.navbar-menu-mobile {
  @apply md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in
}
</style>