<template>
  <div class="Posts">
    <div class="post" v-for="post in responseData" :key="post.id">
      <Post :post="post">
      </Post>
    </div>
  </div>
  <div v-if="responseData.length" ref="pageBottom"></div>
</template>

<script>
import Post from "@/components/Post";
import getAPICall from "@/mixins/getAPICall";
import pagination from "@/mixins/pagination";

export default {
  name: "Bookmarks",
  data() {
    return {
      responseData: [],
    }
  },
  mixins: [getAPICall, pagination],
  components: {Post},
  created() {
    this.callAPI()
  },
  methods: {
    async callAPI() {
      let posts = await this.getAPICall(`api/bookmark-list/?page=${this.page}`);
      //For pagination/infinite scrolling
      this.maxPage = (posts.count/10)
      for (let i=0; i < posts.results.length; i++) {
        this.responseData.push(posts.results[i])
      }
    }
  }
}
</script>

<style scoped>

</style>