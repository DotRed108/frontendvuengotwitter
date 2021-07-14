<template>
  <div class="woah">White</div>
  <form class="login-form" v-on:submit.prevent="login">
    <label for="username-field">Username:
      <input id="username-field" required type="text" v-model="username">
    </label>
    <label for="password-field">Password:
      <input id="password-field" required type="password" v-model="password">
    </label>
    <button type="submit" class="btn login-btn">Login</button>
    <p v-if="incorrectAuth">Incorrect Username or Password</p>
  </form>
</template>

<script>
import router from "@/router";

export default {
  name: "Login",
  data () {
    return {
      username: '',
      password: '',
      incorrectAuth: false,
    }
  },
  methods: {
    login () {
      this.$store.dispatch('userLogin', {
        username: this.username,
        password: this.password
      }).then(() => {
        this.$store.dispatch('setLoggedInUserId')
        router.push({name: 'Home'})
      }).catch(err => {
        console.log(err)
        this.incorrectAuth = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.woah {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  background-color: #F3F5FA;
  color: #F3F5FA;
}

.login-form {
  text-align: right;
  z-index: 11;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #DFE3E8;
  border-radius: 5px;
  padding: 3%;
  display: flex;
  flex-direction: column;
}
#username-field {
  margin-bottom: 10px;
}

#password-field {
  margin-bottom: 10px;
}

.login-btn {
  border-radius: 5px;
  width: 30%;
}
</style>