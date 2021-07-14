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
  name: "Search",
  components: {Post},
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
    await this.getAPICall(`api/search-post/${to.params.content}/?page=${1}`
    ).then(response => {this.routeUpdateResponseData = response; this.page = 1}).finally(next())
    this.responseData = this.routeUpdateResponseData.results
  },
  methods: {
    async callAPI() {
      let posts = await this.getAPICall(`api/search-post/${this.$route.params.content}/?page=${this.page}`);
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