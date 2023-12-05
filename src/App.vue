<template>
  <div class="home text-bg-light min-vh-100">
    <navbar-vue></navbar-vue>
    <router-view/>
  </div>
</template>

<script>
import NavbarVue from '@/components/NavbarVue.vue';

export default {
  name: 'App',
  components: {
    NavbarVue
  }
}
</script>

<style>
*{
  font-family: 'Lexend', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

@media (max-width: 520px) {
    .position {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .back {
        margin-left: 10px;
    }
}
</style>
