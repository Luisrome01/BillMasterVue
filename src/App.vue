<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router/Router.js';

export default {
  setup() {
    return { router };
  }
}
</script>

<style scoped></style>
