<template>
<!--  sm:visible md:hidden lg:hidden-->
  <div class="w-full fixed top-0 left-0 z-30">
    <div class="md:flex items-center justify-between py-4 md:px-10 px-7">
      <div class="cursor-pointer flex items-center">
        <span class="text-3xl text-indigo-600 mr-1">
         <img src="@/assets/logo_landscape_reverse.png" class="h-12"/>
        </span>
      </div>
      <div class="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
        <button class="text-white w-10 h-10 relative focus:outline-none" :onclick="setOpen">
          <span class="sr-only">Open main menu</span>
          <div class="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
            <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out" :class="{'rotate-45': open,' -translate-y-1.5': !open }"></span>
            <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out" :class="{'opacity-0': open } "></span>
            <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out" :class="{'-rotate-45': open, ' translate-y-1.5': !open}"></span>
          </div>
        </button>
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
<!--        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">-->
<!--          <a class="text-white hover:text-gray-400 duration-500">{{ currentAccount }}</a>-->
<!--        </li>-->
<!--        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">-->
<!--          <a class="text-white hover:text-gray-400 duration-500">{{ chainId }}</a>-->
<!--        </li>-->
<!--        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">-->
<!--          <img @click="switchBackground" :src="icon[bgType]" class="h-10"/>-->
<!--        </li>-->
      </ul>
    </div>
  </div>
</template>
<script>

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
    },
    metamaskInstalled: {
      type: Function
    },
    connectAccount: {
      type: Function
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