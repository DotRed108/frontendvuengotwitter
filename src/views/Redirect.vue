<template>
  $REDIRECT$
</template>

<script>
import router from "@/router";

export default {
  name: "Redirect",
  created() {
    router.push({name: `${this.$route.params.location}`, params: {postId: `${this.$route.params.id}`}})
  }
}
</script>

<style scoped>

</style>