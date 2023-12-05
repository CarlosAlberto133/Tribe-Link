<template>
  <div class="home text-bg-light min-vh-100">
    <CardsVue></CardsVue>
  </div>
</template>

<script>
import CardsVue from '@/components/CardsVue.vue';

export default {
  name: 'HomeView',
  components: {
    CardsVue,
  }
}
</script>
