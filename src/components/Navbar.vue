<template>
<!--  sm:visible md:hidden lg:hidden-->
  <div class="w-full md:h-fit lg:h-fit h-full md:overflow-hidden lg:overflow-hidden overflow-y-auto fixed top-0 left-0 z-30">
    <div class="md:flex items-center justify-between px-6 pt-6">
      <div class="cursor-pointer flex items-center">
         <img src="@/assets/etniko_main.png" class="h-12"/>
      </div>
      <div class="text-3xl absolute right-6 top-4 cursor-pointer md:hidden">
        <button class="text-white w-10 h-10 relative focus:outline-none" :onclick="setOpen">
          <span class="sr-only">Open main menu</span>
          <div class="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
            <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out" :class="{'rotate-45': open,' -translate-y-1.5': !open }"></span>
            <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out" :class="{'opacity-0': open } "></span>
            <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out" :class="{'-rotate-45': open, ' translate-y-1.5': !open}"></span>
          </div>
        </button>
      </div>

      <ul :class="`navbar-menu-mobile sm:visible ${open ? 'top-20 ' : 'top-[-490px]'}`">
        <li class="nav-item-mobile">
          <a class="nav-item-hover">Twitter</a>
        </li>
        <li class="nav-item-mobile">
          <a class="nav-item-hover">Discord</a>
        </li>
        <li class="nav-item-mobile">
          <a class="nav-item-hover">OpenSea</a>
        </li>
        <li class="nav-item-mobile">
          <a class="nav-item-hover">Gallery</a>
        </li>
        <li class="nav-item">
          <a class="nav-item-hover">Mint</a>
        </li>
        <li class="nav-item">
          <a class="nav-item-hover"
             :onclick="connectAccount">{{ isConnected ? 'Connected' : 'Connect' }}</a>
        </li>
        <li class="invisible sm:invisible md:visible md:ml-8 text-xl md:my-0 my-7">
          <img src="@/assets/nft/nftLoop.gif" class="h-12 rounded-md"/>
        </li>

<!--        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">-->
<!--          <a class="text-white hover:text-gray-400 duration-500">{{ currentAccount }}</a>-->
<!--        </li>-->
<!--        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">-->
<!--          <a class="text-white hover:text-gray-400 duration-500">{{ chainId }}</a>-->
<!--        </li>-->
<!--        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">-->
<!--          <div class="relative">-->
<!--            <img src="@/assets/signboard.png" class="h-10"/>-->
<!--            <div class="centered">Mint</div>-->
<!--          </div>-->
<!--        </li>-->
<!--        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">-->
<!--          <div class="relative">-->
<!--            <img src="@/assets/signboard.png" class="h-10"/>-->
<!--            <div class="centered">Connect</div>-->
<!--          </div>-->
<!--        </li>:ml-8 text-xl md:my-0 my-7 cursor-pointer">-->
<!--          <div class="relative">-->
<!--            <img src="@/assets/signboard.png" class="h-10"/>-->
<!--            <div class="centered">Mint</div>-->
<!--          </div>-->
<!--        </li>-->
<!--        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">-->
<!--          <div class="relative">-->
<!--            <img src="@/assets/signboard.png" class="h-10"/>-->
<!--            <div class="centered">Connect</div>-->
<!--          </div>-->
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
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/*.navbar-menu {*/
/*    @apply sm:invisible md:visible lg:visible md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in*/
/*}*/
/*sm:visible md:hidden lg:hidden*/
.navbar-menu-mobile {
  @apply md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in
}
.nav-item {
  @apply md:ml-8 text-xl md:my-0 my-7 cursor-pointer
}
.nav-item-mobile {
  @apply sm:visible md:hidden lg:hidden md:ml-8 text-xl md:my-0 my-7 cursor-pointer
}
.nav-item-hover {
  @apply text-white hover:text-gray-400 duration-500
}
</style>