<template>
  <div>
    <form v-on:submit.prevent="search">
      <input type="text" id="search-box" v-model="searchContent" placeholder="Search">
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      searchContent: ""
    }
  },
  methods: {
    search() {
      this.$router.push({name: "Search", params: {content: this.searchContent}})
    }
  }
}
</script>
<style scoped>
#search-box {
  height: 1.5rem;
  width: 35vw;
  resize: none;
  border: none;
  outline: none;
  font: inherit;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5% 5% 5% 5% / 100% 100% 100% 100%;
}
@media (max-width: 400px) {
  #search-box {
    width: 70vw;
  }
}
</style>