<template>
  <form class="create-post-form">
    <div class="content-container">
      <label for=content-input></label>
      <div class="grow-wrap">
        <textarea class="content-input" id="content-input" v-model="createdContent" placeholder="What's on your mind?"></textarea>
        <div class="hidden-input">{{createdContent}}</div>
      </div>
    </div>
    <div class="format-helper">
      <div class="char-counter">{{createdContent.length}}/250</div>
      <div>
        <button v-on:click.prevent="$refs.imageInput.click()" class="image-input-button"><svg><use href="#image-icon"></use></svg></button>
        <input ref="imageInput" type="file" @change="onFileSelected">
        <button type="submit" v-on:click.prevent="createPost" class="btn create-post-button">Create!</button>
      </div>
    </div>
  </form>
</template>

<script>
import router from "@/router";
import postAPICall from "@/mixins/postAPICall";

export default {
  name: "CreatePost",
  props: {
    postId: String,
    isHome: Boolean
  },
  data() {
    return {
      createdContent: '',
      selectedFIle: null,
      parentPostId: this.$route.params.postId
    }
  },
  mixins: [postAPICall],
  methods: {
    async createPost () {
      const postForm = new FormData()
      if (this.selectedFIle) {
       postForm.append('image_content', this.selectedFIle)
      }
      postForm.append('content', this.createdContent)
      if (this.parentPostId !== undefined && !this.isHome){
       postForm.append('parent_post', this.parentPostId)
      }
      await this.postAPICall('/api/create-post/', postForm, {headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}}
      ).then(_ => {console.log(_); this.createdContent = ''; this.selectedFIle = null}
      ).catch(err => {console.log(err); router.push({name: 'Login'})})
      if (this.isHome) {
        await router.push({name: 'Redirect', params: {location: 'Home', id: '0'}})
      } else {
        await router.push({name: 'Redirect', params: {location: 'Posts', id: `${this.$route.params.postId}`}})
      }
    },
    onFileSelected(event) {
      this.selectedFIle = event.target.files[0]
    }
  }
}
</script>

<style scoped>
  .create-post-form {
    margin-top: .5rem;
    border: 1px solid #DFE3E8;
    border-radius: 5px;
    background-color: white;
  }
  .create-post-form:hover {
  }
  .grow-wrap {
    display: grid;
  }
  .hidden-input {
    white-space: pre-wrap;
    visibility: hidden;
  }
  .grow-wrap > textarea {
  resize: none;
  overflow: hidden;
  }
  .grow-wrap > textarea,
  .hidden-input {
    padding: 0.5rem;
    font: inherit;
    border: none;
    outline: none;
    word-break: break-word;

    grid-area: 1 / 1 / 2 / 2;
  }
  .content-container {
    border-bottom: 1px solid #DFE3E8;
    margin: 10px;
  }
  .format-helper {
    display: flex;
    justify-content: space-between;
  }
  .create-post-button {
    margin-right: 10px;
    transform: translateY(-6px);
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
  .create-post-button:hover {
    background-color: rgba(102, 51, 153, .7);
  }
  .char-counter {
    margin-left: 10px;
    height: 20px;
  }
  .format-helper input {
    display: none;
  }
  .image-input-button svg {
    height: 21px;
    width: 20px;
    justify-self: right;
    padding: 0;
  }
  .image-input-button {
    all: unset;
    margin-right: 5px;
  }
</style>