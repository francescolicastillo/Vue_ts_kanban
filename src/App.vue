<template>
  <Header />
  <router-view />
</template>

<script setup lang="ts">
import Header from './components/Header.vue';

</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  
  background-color: rgb(38, 38, 38);
}

.dark-mode {
  background-color: rgb(38, 38, 38);
}
</style>
