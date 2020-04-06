

<script>
export default {
  created(){
    this.$store.dispatch('deleteToken', this.$store.getters.getToken)
    .then(() => {
      this.$router.push({name: 'login'})
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="css" scoped>
</style>
