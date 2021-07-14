<template>
  $END$
</template>

<script>
import router from "@/router";

export default {
  name: "Logout",
  created() {
      localStorage.setItem('accessToken', null)
      this.$store.state.accessToken = null
      this.$store.state.isAuthenticated = false
      router.push({name: 'Login'})
  }
}
</script>

<style scoped>

</style>