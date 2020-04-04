<template>
  <div id="app">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Master',
  components:{
    Navbar
  }
}
</script>

<style lang="css" scoped>
</style>
