<template>
  <div class="home">
    <CreatePost :is-home="true"></CreatePost>
    <div class="post" v-for="post in responseData" :key="post.id">
        <Post :post="post">
        </Post>
    </div>
  </div>
  <div v-if="responseData.length" ref="pageBottom"></div>
</template>

<script>
import Post from "@/components/Post";
import CreatePost from "@/components/CreatePost";
import getAPICall from "@/mixins/getAPICall";
import pagination from "@/mixins/pagination";

export default {
  name: 'Home',
  components: {CreatePost, Post},
  data () {
    return {
      responseData: [],
    }
  },
  mixins: [getAPICall, pagination],
  created() {
    this.callAPI()
  },
  methods: {
    async callAPI() {
      let posts = await this.getAPICall(`/api/home/?page=${this.page}`);
      //For pagination/infinite scrolling
      this.maxPage = (posts.count/10)
      for (let i=0; i < posts.results.length; i++) {
        this.responseData.push(posts.results[i])
      }
    }
  }
}
</script>

<style lang="scss" scoped >
.link {
  text-decoration: none;
}
</style>