<template>
    <article class="post-wrapper">
      <router-link class="profile-pic-container" :to="{ name: 'Profile', params: { userId: post.author }}">
        <img class="profile-pic" :src="`http://127.0.0.1:8000${post.profile_pic}`" alt="PH">
      </router-link>
      <router-link class="author" :to="{ name: 'Profile', params: { userId: post.author }}">@{{post.username}}</router-link>
      <router-link class="links" :to="{name: 'Posts', params: { postId: post.id }}">
        <p class="content">{{post.content}}</p>
      </router-link>
      <div class="image-area">
        <img class="post-image" v-if="post.image_content" v-on:click="$refs.popupComponent.$refs.popupButton.click()" :src="`http://127.0.0.1:8000${post.image_content}`" alt="whyGod?">
        <PopUp ref="popupComponent" :image="`http://127.0.0.1:8000${post.image_content}`"></PopUp>
      </div>
      <div class="date-posted">{{post.date_posted + localLikes}}</div>
      <div class="likes-container">
        <div class="plus-icon"><button v-on:click="$refs.popUpComponent.$refs.popupButton.click()"><svg><use href="#plus-icon"></use></svg></button></div>
        <div class="likes" v-on:click="likeList">{{post.likes + localLikes}}</div>
        <div v-if="isLocalLiked === 'false'" class="like-icon"><button v-on:click="likePost(); localLike();"><svg><use href="#like-icon"></use></svg></button></div>
        <div v-else class="unlike-icon"><button v-on:click="unlikePost(); localUnlike();"><svg><use href="#unlike-icon"></use></svg></button></div>
      </div>
      <PopUp ref="popUpComponent" :post-author="post.author" :post-id="post.id" :form-type="'Post'"></PopUp>
      <PopUp ref="popUpComponent2" :post-id="post.id" :form-type="'Likes'"></PopUp>
    </article>
</template>

<script>
import postAPICall from "@/mixins/postAPICall";
import PopUp from "@/components/PopUp";
import getAPICall from "@/mixins/getAPICall";

export default {
  name: "Post",
  components: {PopUp},
  data() {
    return {
      isLocalLiked: undefined,
      localLikes: 0
    }
  },
  props: {
    post: Object
  },
  mixins: [postAPICall, getAPICall],
  methods: {
    likePost() {
      this.postAPICall(`/api/like-post/${this.post.id}/`, {})
    },
    unlikePost() {
      this.postAPICall(`/api/unlike-post/${this.post.id}/`, {})
    },
    localLike() {
      this.isLocalLiked = 'true'
      this.localLikes = this.localLikes + 1
    },
    localUnlike() {
      this.isLocalLiked = 'false'
      this.localLikes = this.localLikes - 1
    },
    async likeList() {
      await this.$refs.popUpComponent2.$refs.popupButton.click()
      this.$refs.popUpComponent2.$refs.likeListButton.click()
    }
  },
  created() {
    this.isLocalLiked = this.post.hasLiked
  }
}
</script>

<style lang="scss" scoped>
.links {
  text-decoration: none;
  color: black;
}
.post-wrapper {
  margin-top: 1rem;
  display: grid;
  border-top: 1px solid #DFE3E8;
  border-bottom: 1px solid #DFE3E8;
  background-color: white;
  grid-template-columns: .5fr 3.2fr .3fr;
  grid-template-areas: "profile_pic author author"
                        "profile_pic content content"
                        "profile_pic image image"
                        "profile_pic date_posted likes";

  .profile-pic-container {
    grid-area: profile_pic;
  }

  .profile-pic {
    border-radius: 50%;
    border: .2rem solid white;
    height: 5rem;
    width: 5rem;
  }

  .author {
    text-decoration: none;
    color: black;
    cursor: pointer;
    text-align: left;
    font-weight: bold;
    grid-area: author;
  }
  .author:hover {
    text-decoration: underline black;
  }
  .content {
    text-align: left;
    grid-area: content;
    font-size: 1rem;
  }
  .image-area {
    grid-area: image;
    justify-self: left;
  }
  .date-posted {
    text-align: left;
    grid-area: date_posted;
    font-size: .7rem;
    color: darkgray;
    float: left;
  }

  .likes-container {
    display: flex;
    grid-area: likes;
    flex-grow: unset;
    .likes {
      cursor: pointer;
      z-index: 2;
      flex-basis: 100%;
      margin-right: .5rem;
      transform: translate(-30%, -1%);
    }
    .likes:hover {
      text-decoration: underline;
    }
    .like-icon {
      flex-basis: 100%;
    }
  }
  svg {
  height: 1.35rem;
  display: inline;
  width: 1.3rem;
  }
  button {
    border: none;
    background-color: white;
    transform: translate(-30%, -22%);
    cursor: pointer;
    outline: none;
  }
  .plus-icon {
    transform: translate(-60%, 6%);
  }
}
.post-image {
  border: 4px solid lightgray;
  height: 80px;
  width: 100px;
  cursor: pointer;
  border-radius: 10%;
  transition-duration: 250ms;
  transition-property: height, width;
}
 .post-image:hover {
   height: 160px;
   width: 200px;
 }
</style>