<template>
  <header>
    <button
      class="header-logo"
      @click="$router.push({ name: 'Home' })"
    >
      F.C - Kanban 
    </button>
    <button
      class="btn-home"
      @click="$router.push({ name: 'Home' })"
    >
      Back home
    </button>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
  header {
    height: 40px;
    width: 100%;
    background-color: rgb(2, 167, 16);
    border-color: rgb(2, 167, 85);
    position: fixed;
    top: 0;
  }

  header * {
    display: inline;
  }

  .header-logo {
    cursor: pointer;
    background: none;
    border: none;
    height: 100%;
    align-self: anchor-center;
    font-size: 1.3rem;
    margin-left: 40px;
  }

  .btn-home {
    position: absolute;
    right: 0;
    margin-right: 30px;
    cursor: pointer;
    background: none;
    border: none;
    height: 100%;
    align-self: anchor-center;
    font-size: 1.3rem;
  }

  .btn-home:hover {
    color: antiquewhite;
  }
</style>