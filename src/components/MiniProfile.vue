<template>
  <div class="users-list" v-for="user in users.results" :key="user.id">
    <div class="user-container">
      <router-link class="profile-pic-container" :to="{ name: 'Profile', params: { userId: user.id }}">
        <img class="profile-pic" :src="`http://127.0.0.1:8000${user.profile_pic}`" alt="PH">
      </router-link>
      <router-link class="author" :to="{ name: 'Profile', params: { userId: user.id }}">@{{user.username}}</router-link>
    </div>
  </div>
  <button v-if="users.previous" v-on:click="getPreviousUserSet">Back</button>
  <button v-if="users.next" v-on:click="getNextUserSet">Next</button>
  <button ref="likeListRef" v-on:click="getUsersForLikes" class="secret-like-list-button"></button>
  <button ref="followersListRef" v-on:click="getUsersForFollowers" class="secret-like-list-button"></button>
  <button ref="followingListRef" v-on:click="getUsersForFollowing" class="secret-like-list-button"></button>
</template>

<script>
import getAPICall from "@/mixins/getAPICall";

export default {
  name: "MiniProfile",
  props: {
    postId: Number
  },
  data() {
    return {
      users: {}
    }
  },
  mixins: [getAPICall],
  methods: {
    async getUsersForLikes() {
      this.users = await this.getAPICall(`/api/like-list/${this.postId}/`)
    },
    async getUsersForFollowers() {
      console.log('followers')
      this.users = await this.getAPICall(`/api/user/${this.$route.params.userId}/followers/`)
    },
    async getUsersForFollowing() {
      console.log('following')
      this.users = await this.getAPICall(`/api/user/${this.$route.params.userId}/following/`)
    },
    getNextUserSet() {
      this.getAPICall(this.users.next).then(responseData => {this.users = responseData})
          .catch(err => console.log(err + 'Could Not Find Next Page'))
    },
    getPreviousUserSet() {
      this.getAPICall(this.users.previous).then(responseData => {this.users = responseData})
          .catch(err => console.log(err + 'Could Not Find Previous Page'))
    }
  }
}
</script>

<style scoped>
.user-container {
  display: flex;
  margin: 25px;
  align-items: center;
}
.profile-pic {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.author {
  color: black;
  text-decoration: none;
  margin-left: 10px;
}
.author:hover {
  text-decoration: underline;
}
.secret-like-list-button {
  display: none;
}
</style>