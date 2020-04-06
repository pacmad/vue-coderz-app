<template>
  <div class="container-fluid bg-color">
      <div class="row justify-content-center">
          <div class="col-md-6">
              <div class="card">
                  <div class="card-header bg-color1 text-white">Login</div>
                  <div class="card-body bg-color1">
                      <form @submit.prevent="login">
                          <div class="form-group row">
                              <label for="email" class="col-md-4 col-form-label text-md-right text-white">E-Mail Address</label>
                              <div class="col-md-6">
                                  <input v-model="username" id="email" type="email" class="form-control" name="email" required autofocus>
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="password" class="col-md-4 col-form-label text-md-right text-white">Password</label>
                              <div class="col-md-6">
                                  <input v-model="password" id="password" type="password" class="form-control" name="password" required>
                              </div>
                          </div>
                          <div class="form-group row mb-0">
                              <div class="col-md-8 offset-md-4">
                                  <button type="submit" class="btn btn-primary">
                                      Login
                                  </button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      username: "",
      password: ""
    }
  },
  methods:{
    login(){
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password
      })
      .then((response) => {
        return this.$store.dispatch('retrieveUser', response.data.access_token)
      })
      .then(() => {
        this.$router.push({name: 'app'})
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
