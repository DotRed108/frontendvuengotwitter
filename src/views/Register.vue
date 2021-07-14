<template>
  <div class="woah">White</div>
  <form>
    <form class="register-form" v-on:submit.prevent="register">
    <label for="username-field">Username:
      <input id="username-field" required type="text" v-model="username">
    </label>
    <label for="username-field">Email:
      <input id="email-field" required type="text" v-model="email">
    </label>
    <label for="password-field">Password:
      <input id="password-field" required type="password" v-model="password">
    </label>
      <label for="password2-field">Confirm Password:
      <input id="password2-field" required type="password" v-model="password2">
    </label>
    <button type="submit" class="btn register-btn">Register</button>
    <p v-if="incorrectAuth">You fucked up</p>
  </form>
  </form>
</template>

<script>
import router from "@/router";
import {getAPI} from "@/axios.api";

export default {
  name: "Register",
  data () {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',
      incorrectAuth: false,
    }
  },
  methods: {
    register () {
    getAPI.post('/api/user/',
        {username: this.username, email: this.email, password: this.password, password2: this.password2}
    ).then(response => {
      router.push({name: "Login"})
      console.log(response)
    }).catch(err => {
      console.log(err)
      this.incorrectAuth = true
    })
  }
  }
}
</script>

<style scoped>
.woah {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  background-color: #F3F5FA;
  color: #F3F5FA;
}

.register-form {
  text-align: right;
  z-index: 3;
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

#email-field {
  margin-bottom: 10px;
}

#password-field {
  margin-bottom: 10px;
}

.register-btn {
  border-radius: 5px;
  width: 30%;
}
</style>