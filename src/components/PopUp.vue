<template>
  <button ref="popupButton" class="popupButton" v-on:click="showPopUp = true"></button>
  <button v-on:click="$refs.miniProfileList.$refs.likeListRef.click()" ref="likeListButton" class="popupButton"></button>
  <button v-on:click="$refs.miniProfileList2.$refs.followersListRef.click()" ref="followerListButton" class="popupButton"></button>
  <button v-on:click="$refs.miniProfileList3.$refs.followingListRef.click()" ref="followingListButton" class="popupButton"></button>
  <transition name="fade" appear>
    <div class="wash" v-if="showPopUp"></div>
  </transition>
  <transition name="slide" appear>
    <div class="popup" v-if="showPopUp">
      <button class="close" v-on:click="showPopUp = false">X</button>
      <div class="plus-options" v-if="formType === 'Post'">
          <button v-on:click="bookmarkPost">Bookmark</button>
          <button v-if="!showLink" v-on:click="copyLink">Link</button>
          <p v-else>http://127.0.0.1:8080/posts/{{postId}}/</p>
          <button v-if="postAuthor == userId" v-on:click="deletePost" class="delete-post">Delete</button>
      </div>
      <MiniProfile v-if="formType === 'Followers'" ref="miniProfileList2"></MiniProfile>
      <MiniProfile v-if="formType === 'Following'" ref="miniProfileList3"></MiniProfile>
      <MiniProfile v-if="formType === 'Likes'" ref="miniProfileList" :post-id="postId"></MiniProfile>
      <div class="edit-profile-form" v-if="formType === 'Profile' && !deleteProfileCheck">
        <div class="theme-input">
          <button v-on:click="$refs.themeInput.click()" class="image-input-button"><svg><use href="#image-icon"></use></svg></button>
          <label>Change Theme</label>
          <input ref="themeInput" @change="onFile2Selected" type="file">
        </div>
        <div class="profile-pic-input">
          <button v-on:click="$refs.profilePicInput.click()" class="image-input-button"><svg><use href="#image-icon"></use></svg></button>
          <label>Profile Pic</label>
          <input ref="profilePicInput" @change="onFile1Selected" type="file">
        </div>
        <div class="bio-input">
          <label for="bio-input">Bio</label>
          <textarea v-model="bio" id="bio-input"></textarea>
        </div>
        <button v-on:click="deleteProfileCheck = true" class="delete-profile">Delete</button>
        <button v-on:click="updateProfile(); showPopUp = false" class="update-profile">Update</button>
      </div>
      <div v-if="formType === 'Profile' && deleteProfileCheck">
        <h3>Are you sure you want to delete your Profile?</h3>
        <button v-on:click="showPopUp = false" class="no">No</button>
        <button v-on:click="deleteProfile" class="yes">Yes</button>
      </div>
      <img v-if="image" class="image" :src="image" alt="What Da?">
    </div>
  </transition>
</template>

<script>
import router from "@/router";
import putAPICall from "@/mixins/putAPICall";
import deleteAPICall from "@/mixins/deleteAPICall";
import postAPICall from "@/mixins/postAPICall";
import MiniProfile from "@/components/MiniProfile";

export default {
  name: "PopUp",
  components: {MiniProfile},
  props: {
    button: String,
    image: String,
    formType: String,
    postId: Number,
    postAuthor: Number,
    likeUsers: Array
  },
  data() {
    return {
      showPopUp: false,
      bio: '',
      deleteProfileCheck: false,
      selectedFIle: null,
      selectedFile2: null,
      userId: undefined,
      showLink: false
    }
  },
  mixins: [putAPICall, deleteAPICall, postAPICall],
  created() {
    this.userId = localStorage.getItem('userId')
  },
  methods: {
    updateProfile () {
      const postForm = new FormData()
      if (this.selectedFIle) {
        postForm.append('profile_pic', this.selectedFIle)
      }
      if (this.bio !== '') {
        postForm.append('bio', this.bio)
      }
      if (this.selectedFile2) {
        postForm.append('theme', this.selectedFile2)
      }
      this.putAPICall(`/api/user/${this.$route.params.userId}/`, postForm
      ).then(response => {
        this.bio = ''
        this.selectedFIle = null
        this.selectedFile2 = null
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },
    async deleteProfile() {
      await this.deleteAPICall(`/api/user/${this.$route.params.userId}/`,).catch(err => console.log(err))
      await router.push({name: 'Login'})
    },
    onFile1Selected(event) {
      this.selectedFIle = event.target.files[0]
    },
    onFile2Selected(event) {
      this.selectedFile2 = event.target.files[0]
    },
    async bookmarkPost() {
      await this.postAPICall(`/api/bookmark-post/${this.postId}/`, {}).catch(err => console.log(err))
      this.showPopUp =  false
    },
    copyLink() {
      this.showLink = true
    },
    async deletePost() {
      await this.deleteAPICall(`/api/delete-post/${this.postId}/`).catch(err => console.log(err))
      this.showPopUp = false
    }
  }
}
</script>



<style scoped>
.plus-options {
  height: 250px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.plus-options button {
  margin-right: 10px;
  transform: translateY(-6px);
  background-color: rgba(102, 51, 153, .7);
  margin-left: 1em;
  border-radius: 50%;
  width: 6em;
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
.plus-options button:hover {
  background-color: rebeccapurple;
}
.delete-post {
  background-color: rgba(255, 0, 0, .7)!important;
}
.delete-post:hover {
  background-color: red!important;
}
p {
  width: inherit;
  text-wrap: normal;
  word-wrap:break-word
}
input {
  display: none;
}

.edit-profile-form {
  padding: 20px;
  display: grid;
  grid-gap: 40px;
  justify-items: left;
  grid-template-areas: "theme theme"
                       "profilePic profilePic"
                       "bio bio"
                       "delete update";
}

.theme-input {
  grid-area: theme;
}

.profile-pic-input {
  grid-area: profilePic;
}

.profile-pic-input button,
.theme-input button {
  background-color: white;
  border: none;
  outline: none;
  transform: translateY(10%);
}

.bio-input {
  grid-area: bio;
  display: inline;
}

#bio-input {
  height: 120px;
  width: 210px;
  resize: none;
  overflow: hidden;
  font: inherit;
  border: 3px solid lightgray;
  outline: none;
  word-break: break-word;
}

.delete-profile,
.yes{
  grid-area: delete;
  margin-right: 10px;
  transform: translateY(-6px);
  background-color: rgba(255, 0, 0, .7);
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
.delete-profile:hover {
  background-color: rgba(255, 0, 0, 1);
}

.update-profile,
.no{
  grid-area: update;
  margin-right: 10px;
  transform: translateY(-6px);
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
  transition-duration: 400ms;
  transition-property: background-color;
}
.update-profile:hover {
  background-color: rebeccapurple;
}

.popupButton {
  display: none;
}

.wash {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .3);
  z-index: 98;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity 400ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup {
  position: fixed;
  z-index: 99;
  background-color: white;
  border-radius: 10%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image {
  padding: 10px;
  border-radius: 10%;
 }

.close {
  font-weight: 900;
  background-color: white;
  outline: none;
  border: none;
  float: right;
  margin-right: 10%;
}
.close:hover {
  opacity: .5;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 400ms;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100vw);
}

svg {
  height: 21px;
  width: 20px;
  justify-self: right;
  padding: 0;
  display: inline;
  transition-duration: 400ms;
  transition-property: height, width;
}

svg:hover {
  height: 25px;
  width: 24px;
}

</style>