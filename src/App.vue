<template>
  <Navbar @backgroundChanged="backgroundChanged"/>
  <main class="w-full">
    <section class="section">
      <Headline :bgType="bgType"/>
    </section>
  </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Headline from '@/components/Headline.vue'
export default {
  name: 'event-vue',
  components: {
    Navbar,
    Headline
  },
  data() {
    return {
      bgType: 'night'
    }
  },
  methods: {
    backgroundChanged (bgType) {
      this.bgType = bgType
    }
  }
}

</script>

<style scoped>
.section {
  @apply w-screen;
  /* py-24 px-6 py-12 md:px-16 xl:px-28;*/
}
</style>
