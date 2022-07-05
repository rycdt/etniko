<template>
  <div class="w-full fixed top-0 left-0 z-20">
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
        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
          <a class="text-white hover:text-gray-400 duration-500">Discord</a>
        </li>
        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
          <a class="text-white hover:text-gray-400 duration-500">Mint</a>
        </li>
        <li class="md:ml-8 text-xl md:my-0 my-7 cursor-pointer">
          <a class="text-white hover:text-gray-400 duration-500"
             :onclick="connectAccount">{{ isConnected ? 'Connected' : 'Connect' }}</a>
        </li>
      </ul>

<!--      <ul class="navbar-menu">-->
<!--        <img @click="switchBackground" :src="icon[bgType]" class="h-10"/>-->
<!--        <img src="@/assets/icons/twitter.png" class="h-12" @click="twitter"/>-->
<!--        <img src="@/assets/icons/discord.png" class="h-12"/>-->
<!--      </ul>-->
    </div>
  </div>
</template>
<script>

export default {
  name: 'navbar-vue',
  data() {
    return {
      bgType: 'night',
      icon: {
        day: require('@/assets/icons/day.png'),
        night: require('@/assets/icons/night.png')
      },
      open: false,
      isConnected: false
    }
  },
  methods: {
    twitter() {
      window.open('https://twitter.com/etniko_io');
    },
    switchBackground() {
      this.bgType = (this.bgType === 'night' ? 'day' : 'night')
      this.$emit('backgroundChanged', this.bgType)
    },
    async connectAccount() {
      if (window.ethereum) {
        console.log('test')
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        console.log(accounts)
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