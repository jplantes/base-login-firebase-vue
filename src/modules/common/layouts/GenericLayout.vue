<template>
  <header>  
      <NavBar />
  </header>

  <div class="container mx-auto">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';


</script>

<style scoped>

</style>