<template>
  <button class="unfollow-button" v-on:click="unfollowUser">Unfollow</button>
</template>

<script>
import postAPICall from "@/mixins/postAPICall"

export default {
  name: "UnFollow",
  mixins: [postAPICall],
  methods: {
    unfollowUser: function () {
      this.postAPICall(`/api/user/${this.$route.params.userId}/unfollow/`, {})
    }
  },
}
</script>

<style scoped>
.unfollow-button {
  background-color: rgba(159, 57, 57, 0.7);
  margin-left: 1em;
  border-radius: 50%;
  width: 5.4em;
  height: 2.5em;
  border-radius: 50% 50% 50% 50% / 100% 100% 100% 100%;
  overflow: hidden;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border: 2px solid maroon;
}
.unfollow-button:hover {
  background-color: rgba(159, 57, 57, 1);
}


</style>