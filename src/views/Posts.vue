<template>
  <div class="Posts">
    <div class="post" v-for="post in responseData" :key="post.id">
      <Post :post="post">
      </Post>
      <CreatePost v-if="post.parent_post === responseData[0].parent_post "></CreatePost>
    </div>
  </div>
  <div v-if="responseData.length" ref="pageBottom"></div>
</template>
v-on:click.passive="APIUrl = `api/detail-post/${post.id}`; getPost()"

<script>
import Post from "@/components/Post";
import CreatePost from "@/components/CreatePost";
import getAPICall from "@/mixins/getAPICall";
import pagination from "@/mixins/pagination";

export default {
  name: "Posts",
  components: {
    CreatePost,
    Post
  },
  mixins: [getAPICall, pagination],
  data() {
    return {
      responseData: [],
      routeUpdateResponseData: undefined,
    }
  },
  created() {
    this.callAPI()
  },
  async beforeRouteUpdate (to, from, next) {
    //required to get the component to update data when changing routes
    await this.getAPICall(`api/detail-post/${to.params.postId}/?page=${1}`
    ).then(response => {this.routeUpdateResponseData = response; this.page = 1}).finally(next())
    this.responseData = this.routeUpdateResponseData.results
  },
  methods: {
    async callAPI() {
      let posts = await this.getAPICall(`api/detail-post/${this.$route.params.postId}/?page=${this.page}`);
      //For pagination/infinite scrolling
      this.maxPage = (posts.count/10)
      for (let i=0; i < posts.results.length; i++) {
        this.responseData.push(posts.results[i])
      }
    },
  }
}
</script>

<style scoped>
.post {
  margin-top: 1rem;
}
</style>