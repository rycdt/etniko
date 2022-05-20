<template>
  <Navbar @backgroundChanged="backgroundChanged"/>
  <main class="w-full">
    <section class="section">
      <Headline :day="day"/>
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
      day: true
    }
  },
  methods: {
    backgroundChanged (day) {
      this.day = day
    }
  }
}

</script>

<style scoped>
.section {
  @apply w-full;
  /* py-24 px-6 py-12 md:px-16 xl:px-28;*/
}
</style>
