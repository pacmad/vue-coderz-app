<template>
<nav class="navbar navbar-expand-md navbar-light bg-color text-white border-bottom border-white">
    <div class="container-fluid">
        <a class="navbar-brand text-white" href="">
            Coderz
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav mr-auto">

            </ul>

            <!-- Right Side Of Navbar -->
            <ul v-if="loggedIn" class="navbar-nav ml-auto">
                <!-- Authentication Links -->
                  <li class="nav-item">
                      <img src="https://raw.githubusercontent.com/JennerPalacios/SimpleSpoofNinja/master/img/Ninja.png" width="40" height="40">
                  </li>
                  <li id="navbarDropdown" class="nav-item text-white">{{ getUser.name }}</li>
                  <li class="text-white nav-item"><router-link :to="{ name: 'logout' }">Logout</router-link></li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return{

    }
  },
  computed:{
    getUser(){
      return this.$store.getters.getUser
    },
    loggedIn(){
      return this.$store.getters.loggedIn
    }
  },
  methods:{
  }
}
</script>

<style lang="css" scoped>
</style>
