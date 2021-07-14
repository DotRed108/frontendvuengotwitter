<template>
  <div id="explore-sidebar">
    <br>
    <br>
    <br>
    <article class="top-post-box">
      <h1>Top Post Today</h1>
      <div class="author-info">
        <router-link class="profile-pic-container" :to="{ name: 'Profile', params: { userId: post.author }}">
          <img class="profile-pic" :src="`http://127.0.0.1:8000${post.profile_pic}`" alt="PH">
        </router-link>
        <router-link class="author" :to="{ name: 'Profile', params: { userId: post.author }}">@{{post.username}}</router-link>
      </div>
      <router-link class="links" :to="{name: 'Posts', params: { postId: post.id }}">
        <p class="content">{{post.content}}</p>
      </router-link>
      <div class="image-area">
        <img class="post-image" v-if="post.image_content" v-on:click="$refs.popupComponent.$refs.popupButton.click()" :src="`http://127.0.0.1:8000${post.image_content}`" alt="whyGod?">
      </div>
    </article>
    <div class="recommended-user-box">
      <h4>Recommended User</h4>
      <div class="profile-info">
        <router-link class="user-profile-pic-container" :to="{ name: 'Profile', params: { userId: user.id }}">
          <img class="user-profile-pic" :src="`http://127.0.0.1:8000${user.profile_pic}`" alt="WTF?">
        </router-link>
        <router-link class="user-username-container" :to="{ name: 'Profile', params: { userId: user.id }}">
          <h3>@{{user.username}}</h3>
        </router-link>
      </div>
      <Follow :user-id="user.id" class="follow" v-if="user && !user.isFollowing"></Follow>
    </div>
  </div>
</template>

<script>
import getAPICall from "@/mixins/getAPICall";
import Follow from "@/components/Follow";

export default {
  name: "exploreSidebar",
  components: {Follow},
  data() {
    return {
      post: {},
      user: {}
    }
  },
  mixins: [getAPICall],
  async created() {
    this.user = await this.getAPICall(`api/user/get-random-profile/`)
    let tempPost = await this.getAPICall('/api/top-post-today/')
    this.post = tempPost[0]
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
#explore-sidebar {
  position: fixed;
  background-color: #F3F5FA;
  width: 22.2%;
  height: 100%;
  overflow: hidden;
  right: 0;
}
@media (max-height: 700px) {
  .top-post-box {
    font-size: small!important;
  }
}
.top-post-box {
  background-color: white;
  border-radius: 10%;
  height: auto;
  width: 90%;
  margin: auto;
  border: 1px solid lightgray;
  font-size: medium;
}
.author-info {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.profile-pic-container {
  background-color: #2c3e50;
  border-radius: 50%;
  height: 5em;
  width: 5em;
}
.profile-pic {
  border-radius: 50%;
  height: 5em;
  width: 5em;
}
.author {
  font-weight: 700;
  text-align: left;
  font-size: x-large;
}
.links {
}
.image-area {
  height: 20%;
}
.post-image {
  border: 4px solid lightgray;
  height: auto;
  width: 12em;
  border-radius: 10%;
}
.recommended-user-box {
  background-color: white;
  border-radius: 12%;
  height: auto;
  width: 90%;
  margin-top: 15px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid lightgray;
}
.profile-info {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 5px;
}
.user-profile-pic {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}
.follow {
  margin-bottom: 5px;
}

</style>