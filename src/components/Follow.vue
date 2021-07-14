<template>
  <button class="follow-button" v-on:click="followUser">Follow</button>
</template>

<script>
import postAPICall from "@/mixins/postAPICall";

export default {
  name: "Follow",
  props: {
    userId: String
  },
  mixins: [postAPICall],
  methods: {
    followUser: function () {
      if (this.userId) {
        this.postAPICall(`/api/user/${this.userId}/follow/`, {})
      } else {
        this.postAPICall(`/api/user/${this.$route.params.userId}/follow/`, {})
      }
    }
  },
}
</script>

<style scoped>
.follow-button {
  background-color: rgba(102, 51, 153, .7);
  margin-left: 1em;
  border-radius: 50%;
  width: 5.4em;
  height: 2.5em;
  border-radius: 50% 50% 50% 50% / 100% 100% 100% 100%;
  overflow: hidden;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border: 2px solid rebeccapurple;
}
.follow-button:hover {
  background-color: rgba(102, 51, 153, 1);
}

</style>