<template>
  <div class="sm:visible md:hidden lg:hidden absolute w-full h-screen main-bg" v-bind:style="{ 'background-image': 'url(' + backgroundPortrait[bgType] + ')' }">
<!--    <div class="mt-20 p-4">-->
<!--      <a href="#" class="flex flex-col items-center bg-transparent rounded-lg border shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">-->
<!--        &lt;!&ndash;          <img class="object-contain w-full h-96 rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg" src="@/assets/flags/flag_blue.png" alt="">&ndash;&gt;-->
<!--        <div class="flex flex-col justify-between p-4 leading-normal bg-white w-full">-->
<!--          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Etniko 2022 Blue</h5>-->
<!--          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Test etniko test etniko test etniko test etniko test etniko test etniko.</p>-->
<!--        </div>-->
<!--      </a>-->
<!--    </div>-->
<!--    <div class="pr-4 pl-4 pb-4">-->
<!--      <a href="#" class="flex flex-col items-center bg-transparent rounded-lg border shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">-->
<!--        &lt;!&ndash;          <img class="object-contain w-full h-96 rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg" src="@/assets/flags/flag_red.png" alt="">&ndash;&gt;-->
<!--        <div class="flex flex-col justify-between p-4 leading-normal bg-white w-full">-->
<!--          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Etniko 2022 Red</h5>-->
<!--          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Test etniko test etniko test etniko test etniko test etniko test etniko.</p>-->
<!--        </div>-->
<!--      </a>-->
<!--    </div>-->
<!--    <div class="pr-4 pl-4 pb-4">-->
<!--      <a href="#" class="flex flex-col items-center bg-transparent rounded-lg border shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">-->
<!--        &lt;!&ndash;          <img class="object-contain w-full h-96 rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg" src="@/assets/flags/flag_yellow.png" alt="">&ndash;&gt;-->
<!--        <div class="flex flex-col justify-between p-4 leading-normal bg-white w-full">-->
<!--          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Etniko 2022 Yellow</h5>-->
<!--          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Test etniko test etniko test etniko test etniko test etniko test etniko.</p>-->
<!--        </div>-->
<!--      </a>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'mobile-vue',
  props: {
    bgType: {
      default: 'night',
      type: String
    }
  },
  data() {
    return {
      backgroundPortrait: {
        day: require('@/assets/bg_day_portrait.jpg'),
        night: require('@/assets/bg_night_portrait.jpg')
      }
    }
  },
}
</script>

<style scoped>

</style>