<template>
  <div id="app">
    <header>
      <router-link to="/">Logo</router-link>
      <SearchBox></SearchBox>
      <div>
        <router-link v-if="!this.$store.state.isAuthenticated" to="/login/">Login</router-link>
        <router-link v-if="this.$store.state.isAuthenticated" to="/logout/">Logout</router-link>
      </div>
      <div v-on:click="showMobileNav = !showMobileNav" class="hamburger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </header>
    <transition name="grow" appear>
      <div v-if="showMobileNav" class="growing-circle"></div>
    </transition>
    <transition name="fade" appear>
      <div v-if="showMobileNav" class="mobile-nav" v-on:click="showMobileNav = !showMobileNav">
        <router-link to="/"><svg><use href="#home-icon"></use></svg><span class="router-label"> Home</span></router-link>
        <router-link to="/notifications/"><svg><use href="#bell-icon"></use></svg><span class="router-label"> Notifications</span></router-link>
        <router-link to="/messages/"><svg><use href="#chat-icon"></use></svg><span class="router-label"> Messages</span></router-link>
        <router-link to="/bookmarks/"><svg><use href="#bookmark-icon"></use></svg><span class="router-label"> Bookmarks</span></router-link>
        <router-link :to="{ name: 'Profile', params: { userId: this.$store.getters.getUserId }}"><svg><use href="#alt-profile-icon"></use></svg><span class="router-label"> Profile</span></router-link>
        <router-link to="/settings/"><svg><use href="#settings-icon"></use></svg><span class="router-label"> Settings</span></router-link>
        <div>
          <router-link v-if="!this.$store.state.isAuthenticated" to="/login/">Login</router-link>
          <router-link v-if="this.$store.state.isAuthenticated" to="/logout/">Logout</router-link>
        </div>
      </div>
    </transition>
    <div id="nav-sidebar">
      <div class="sidebar-box">
        <ul>
          <li><router-link to="/"><svg><use href="#home-icon"></use></svg><span class="router-label"> Home</span></router-link></li>
          <li><router-link to="/notifications/"><svg><use href="#bell-icon"></use></svg><span class="router-label"> Notifications</span></router-link></li>
          <li><router-link to="/messages/"><svg><use href="#chat-icon"></use></svg><span class="router-label"> Messages</span></router-link></li>
          <li><router-link to="/bookmarks/"><svg><use href="#bookmark-icon"></use></svg><span class="router-label"> Bookmarks</span></router-link></li>
          <li><router-link :to="{ name: 'Profile', params: { userId: this.$store.getters.getUserId }}"><svg><use href="#alt-profile-icon"></use></svg><span class="router-label"> Profile</span></router-link></li>
          <li><router-link to="/settings/"><svg><use href="#settings-icon"></use></svg><span class="router-label"> Settings</span></router-link></li>
        </ul>
      </div>
    </div>
    <explore-sidebar class="explore"></explore-sidebar>
    <div class="master-grid">
      <div class="header-placeholder">
      </div>
      <div class="header-placeholder">
        <label for="search-box-placeholder"></label>
        <textarea id="search-box-placeholder">Logo</textarea>
      </div>
      <div class="header-placeholder">
      </div>
      <div id="nav-sidebar-placeholder"></div>
      <div class="main-content"><router-view/></div>
      <div id="explore-sidebar-placeholder"></div>
    </div>
  </div>
  <div id="svg-container">
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="home-icon" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id=" fire-icon" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="bell-icon" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="chat-icon" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="group-chat-icon" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="settings-icon" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="bookmark-icon" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="profile-icon" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="alt-profile-icon" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="like-icon" fill="none" stroke="currentColor" viewBox="0 0 22 20">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="unlike-icon" fill="red" stroke="red" viewBox="0 0 22 20">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="image-icon" fill="none" stroke="currentColor" viewBox="3.2 3.2 18 18">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </symbol>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="plus-icon" fill="none" stroke="currentColor" viewBox="0 0 22 20.7">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </symbol>
    </svg>
  </div>
</template>

<script>
import exploreSidebar from "@/components/exploreSidebar";
import SearchBox from "@/components/SearchBox";
export default {
  components: {SearchBox, exploreSidebar},
  data() {
    return {
      searchContent: "",
      showMobileNav: false
    }
  },
  methods: {
    search() {
      this.$router.push({name: "Search", params: {content: this.searchContent}})
    }
  }
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 10px;
  background-color: #F3F5FA;
}
::-webkit-scrollbar-thumb {
  background-color: lightgray;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #F3F5FA;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F3F5FA;
}

.master-grid {
  background-color: #F3F5FA;
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
}

.main-content {
  border-right: 1px solid #DFE3E8;
  border-left: 1px solid #DFE3E8;
}

.header-placeholder {
  font-weight: bold;
  color: #F3F5FA;
  text-decoration: none;
  padding: 8px;
  grid-row: 1 / 2;
  background-color: #F3F5FA;
}

header {
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  background-color: rebeccapurple;
  box-shadow: 0 0 2px 2px rebeccapurple;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;

  a {
    margin-right: 40px;
    margin-left: 40px;
    font-weight: bold;
    color: black;
    text-decoration: none;
  }
}

#search-box-placeholder {
  height: 1.5rem;
}

#nav-sidebar {
  background-color: #F3F5FA;
  position: fixed;
  height: 100%;
  width: 22.2%;
  overflow: hidden;
  ul {
    margin-top: 70px;
    list-style-type: none;
    li {
      text-align: left;
      padding: 25px;
      a {
        font-weight: bold;
        font-size: x-large;
        text-decoration: none;
        color: black;
        transition: .25s;

        &.router-link-exact-active {
          color: rebeccapurple;
          text-shadow: 0 0 1px rebeccapurple;
        }

        svg {
          height: 1em;
          display: inline;
          width: 1em;
          vertical-align: text-top;
        }
      }
      a:hover {
        color: rebeccapurple;
        text-shadow: 0 0 1px rebeccapurple;
      }
    }
  }
}
.mobile-nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 15;
  height: 100%;
  width: 100%;
  text-align: center;
  justify-content: space-evenly;
  font-weight: 600;
  font-size: large;

  a {
    text-decoration: none;
    padding: 10px;
  }
}
.growing-circle {
  position: fixed;
  background-color: #F3F5FA;
  height: 2000px;
  width: 2000px;
  z-index: 14;
  right: -100%;
}
.grow-enter-active,
.grow-leave-active{
  transition: height, width 800ms;
}

.grow-enter-from,
.grow-leave-to {
  height: 0;
  width: 0;
}
.mobile-nav svg {
  height: 20px;
  width: 20px;
  transform: translateY(9%);
}
.fade-enter-active {
  transition: opacity 1000ms;
}
.fade-leave-active {
  transition: opacity 10ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
#svg-container {
  display: none;
}
.hamburger {
  display: none;
}
.hamburger .line {
  margin: 5px;
  background-color: black;
  height: 3px;
  width: 30px;
}
@media (max-width: 1215px) {
  #nav-sidebar svg {
    height: 2.2rem!important;
    display: inline;
    width: 2.2rem!important;
    vertical-align: text-top;
    margin: 0!important;
    padding: 0!important;
  }
  li {
    padding-right: 0!important;
    padding-left: 0!important;
    text-align: center!important;
    margin-right: 10px;
  }
  .explore {
    display: none;
  }
  .master-grid {
    grid-template-columns: 1fr 3fr .5fr;
  }
  li span {
    display: none;
  }
}
@media (max-width: 600px) {
  p {
    font-size: .8rem!important;
  }
  li {
    text-align: left!important;
  }
}

@media (max-width: 400px) {
  .hamburger {
    display: unset;
  }
  #nav-sidebar {
    display: none;
  }
  header a {
    display: none;
  }
  .master-grid {
    grid-template-columns: .1fr 3fr .1fr;
  }
  .router-label {
    display: unset;
  }
}
</style>
