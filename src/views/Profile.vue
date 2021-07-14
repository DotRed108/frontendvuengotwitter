<template>
  <div class="profile-container">
    <div class="theme-container">
      <img v-if="responseData.theme" class="theme" :src="`http://127.0.0.1:8000${responseData.theme}`" alt="WTF?">
    </div>
    <div class="profile-pic-container">
      <img class="profile-pic" :src="`http://127.0.0.1:8000${responseData.profile_pic}`">
      <h3 class="profile-username">@{{responseData.username}}</h3>
    </div>
    <div class="profile-info-container">
      <div class="follow-message-button-container">
        <div class="follow-unfollow-button">
          <button class="edit-button"  v-if="responseData.id == userId" v-on:click="$refs.popUpComponent.$refs.popupButton.click()">Edit</button>
          <UnFollow v-else-if="isFollowingLocal === 'true'" v-on:click="localUnfollow();"></UnFollow>
          <Follow v-else v-on:click="localFollow();"></Follow>
        </div>
        <button class="direct-message-button btn"><svg><use href="#chat-icon"></use></svg></button>
      </div>
      <h3 class="profile-username-placeholder">@</h3>
      <p class="profile-bio">{{responseData.bio}}</p>
      <div class="follower-following-count">
        <a v-on:click="FollowersList" class="follower-count">Followers: {{responseData.followers}}</a>
        <a v-on:click="FollowingList" class="following-count">Following: {{responseData.following}}</a>
      </div>
    </div>
  </div>
  <div class="Posts">
    <div class="post" v-for="post in responseData2" :key="post.id">
      <Post :post="post">
      </Post>
    </div>
  </div>
  <div class="edit-popup">
    <PopUp ref="popUpComponent" :form-type="'Profile'"></PopUp>
  </div>
  <PopUp ref="popUpComponent2" :form-type="'Followers'"></PopUp>
  <PopUp ref="popUpComponent3"  :form-type="'Following'"></PopUp>
  <div v-if="responseData2.length" ref="pageBottom1"></div>
</template>

<script>
import Follow from "@/components/Follow";
import getAPICall from "@/mixins/getAPICall";
import Post from "@/components/Post";
import UnFollow from "@/components/Unfollow";
import PopUp from "@/components/PopUp";

export default {
  name: "Profile",
  components: {PopUp, UnFollow, Post, Follow},
  data() {
    return {
      isFollowingLocal: '',
      localFollowers: 0,
      responseData: {},
      responseData2: [],
      page: 1,
      maxPage: 1,
      userId: 0,
    }
  },
  mixins: [getAPICall],
  created() {
    this.userId = localStorage.getItem('userId')
    this.callAPI()
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('scroll', this.onScroll)
      this.onScroll()
    })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    async callAPI() {
      this.responseData = await this.getAPICall(`api/user/get-profile/${this.$route.params.userId}/`);
      this.isFollowingLocal = this.responseData.isFollowing;
      let posts = await this.getAPICall(`api/user-post-list/${this.$route.params.userId}/?page=${this.page}`);
      this.maxPage = (posts.count/10)
      for (let i=0; i < posts.results.length; i++) {
        this.responseData2.push(posts.results[i])
      }
    },
    async callAPI2() {
      let posts = await this.getAPICall(`api/user-post-list/${this.$route.params.userId}/?page=${this.page}`);
      for (let i=0; i < posts.results.length; i++) {
        console.log(posts.results[i])
        this.responseData2.push(posts.results[i])
      }
    },
    localFollow() {
      this.isFollowingLocal = 'true'
      this.localFollowers = this.localFollowers + 1
    },
    localUnfollow() {
      this.isFollowingLocal = 'false'
      this.localFollowers = this.localFollowers - 1
    },
    onScroll() {
      let pageBottom = this.$refs['pageBottom1']
      if (pageBottom) {
        let bottom = pageBottom.getBoundingClientRect()
        let top = window.innerHeight
        if ((bottom.top - top) <= 0.7 && this.page <= this.maxPage) {
          this.page++
          this.callAPI2()
        }
      }
    },
    async FollowersList() {
      await this.$refs.popUpComponent2.$refs.popupButton.click()
      this.$refs.popUpComponent2.$refs.followerListButton.click()
    },
    async FollowingList() {
      await this.$refs.popUpComponent3.$refs.popupButton.click()
      this.$refs.popUpComponent3.$refs.followingListButton.click()
    }
  },
}
</script>

<style scoped>
.profile-container {
  background-color: whitesmoke;
  border-bottom: 1px solid #DFE3E8;
}
.theme-container {
  background-color: darkgray;
  height: 27vh;
}
.theme {
  height: 27vh;
  max-height: 27vh;
  width: 100%;
}
.profile-pic-container {
  border-radius: 50%;
  position: absolute;
  width: 10em;
  height: 10em;
  margin-left: 1rem;
  transform: translateY(-50%);
}
.profile-pic {
  border: .35rem solid white;
  border-radius: 50%;
  overflow: hidden;
  width: 10em;
  height: 10em;
}
.profile-username {
  position: relative;
  font-weight: 700;
  font-size: 1.3em;
  right: 1.6em;
  bottom: 1.2em;
}
.profile-info-container {
  display: grid;
  grid-template-areas: "username follow-message"
                        "bio bio"
                        "count count";
  background-color: whitesmoke;
  min-height: 12em;
}
.profile-username-placeholder {
  color: whitesmoke;
  grid-area: username;
  text-align: left;
  margin-left: 1em;
  min-height: 3em;
}
.follow-message-button-container {
  grid-area: follow-message;
  margin-top: 1%;
  margin-right: 1em;
}
.direct-message-button {
  cursor: pointer;
  border-radius: 50%;
  min-width: 2.5em;
  min-height: 2.5em;
  max-width: 2.5em;
  max-height: 2.5em;
  overflow: hidden;
  float: right;
  outline: none;
}
.follow-unfollow-button {
  display: inline;
  float: right;
}
.edit-button {
  background-color: rgba(250, 250, 250, .7);
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
  transition-duration: 400ms;
  transition-property: background-color;
}
.edit-button:hover {
  background-color: rgba(102, 51, 153, .7);
}
.profile-bio {
  grid-area: bio;
  text-align: left;
  margin-left: 1em;
}
.follower-following-count {
  grid-area: count;
  text-align: left;
  align-self: end;
}
.follower-count {
  margin-right: 5%;
  margin-left: 1em;
}
.follower-count,
.following-count {
  cursor: pointer;
  text-decoration: none;
  color: black;
  vertical-align: bottom;
}
.follower-count:hover,
.following-count:hover {
  text-decoration: underline;
}
svg {
  height: 1.3em;
  display: inline;
  width: 1.3em;
  vertical-align: text-top;
}
.post {
  margin-top: 1em;
}
@media (max-width: 1215px) {
  .profile-container {
    font-size: small;
  }
}
@media (max-width: 600px) {
  .profile-container {
    font-size: x-small;
  }
}
</style>