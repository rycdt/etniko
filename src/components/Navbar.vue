<template>
  <div class="bg-indigo-600">
    <nav class="navbar">
      <div class="flex items-center justify-between">
        <img src="@/assets/logo_landscape_reverse.png" class="h-12"/>

        <!-- Mobile menu button -->
        <div @click="toggleNav" class="flex md:hidden">
          <button
              type="button"
              class="navbar-menu-button">
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul v-if="showMenu" :class="showMenu ? 'flex' : 'hidden'"
          class="navbar-menu">
        <li class="text-gray-100 hover:text-indigo-400">Discord</li>
        <li class="text-gray-100 hover:text-indigo-400">Twitter</li>
      </ul>
      <ul v-else :class="showMenu ? 'flex' : 'hidden'"
          class="navbar-menu">
        <img @click="switchBackground" :src="dayIcon" class="h-10"/>
        <img src="@/assets/icons/twitter.png" class="h-12" @click="twitter"/>
        <img src="@/assets/icons/discord.png" class="h-12"/>
      </ul>
    </nav>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  name:'navbar-vue',
  data () {
    return {
      day: true,
      dayIcon: require('@/assets/icons/day.png')
    }
  },
  methods: {
    twitter () {
      window.open('https://twitter.com/etniko_io');
    },
    switchBackground () {
      this.day = !this.day
      this.dayIcon = this.day ? require('@/assets/icons/day.png') : require('@/assets/icons/night.png')
      this.$emit('backgroundChanged', this.day)
    }
  },
  setup () {
    let showMenu = ref(false)
    const toggleNav = () => (showMenu.value = !showMenu.value)
    return { showMenu, toggleNav }
  }
}
</script>

<style scoped>
.navbar {
  @apply z-20 md:flex md:items-center md:justify-between md:px-6 md:py-8 lg:px-10 w-full fixed top-0 left-0 right-0 px-5 lg:py-4 py-3;
  /*background-color: #1F212C;*/
  opacity: 100%;
}

.navbar-menu-button {
  @apply text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400;
}

.navbar-menu {
  @apply flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
}
</style>