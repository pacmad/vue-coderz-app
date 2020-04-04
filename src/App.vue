<template>
  <div id="app">
    <Navbar/>
    <div class="container-fluid">
      <StatisticsContainer/>
      <TicketsContainer/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import StatisticsContainer from './components/StatisticsContainer.vue'
import TicketsContainer from './components/TicketsContainer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
