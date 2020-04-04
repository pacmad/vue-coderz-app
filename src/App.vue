<template>
  <div class="container-fluid">
    <StatisticsContainer/>
    <TicketsContainer/>
  </div>
</template>

<script>
import StatisticsContainer from './components/StatisticsContainer.vue'
import TicketsContainer from './components/TicketsContainer.vue'

import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'App',
  components: {
    StatisticsContainer,
    TicketsContainer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.z-index-50{
  z-index: 50;
}

.bg-color{
  background-color: #1F1E30;
}

.bg-color1{
  background-color: #27283C;
}

.c-pointer{
  cursor: pointer;
}
</style>
