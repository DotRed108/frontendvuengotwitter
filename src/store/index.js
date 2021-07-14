import Vuex from 'vuex'
import {getAPI} from "@/axios.api";

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    APIData: [],
    isAuthenticated: false,
    userId: 0
  },
  mutations: {
    updateStorage (state, {access, refresh, isAuthenticated}) {
      state.accessToken = access
      state.refreshToken = refresh
      state.isAuthenticated = isAuthenticated
    },
    verifyUser (state, {isAuthenticated, accessToken}) {
      state.isAuthenticated = isAuthenticated
      state.accessToken = accessToken
    },
    setData (state, {APIData}) {
      state.APIData = APIData
    },
    setUser (state, {userId}) {
      state.userId = userId
    },
    useRefreshToken (state, {isAuthenticated, accessToken}) {
      state.isAuthenticated = isAuthenticated
      state.accessToken = accessToken
    }
  },
  actions: {
    userLogin (context, userCredentials) {
      return new Promise((resolve, reject) => {
        getAPI.post('/api-token/',{
          username: userCredentials.username,
          password: userCredentials.password
        }).then(response => {
          context.commit('updateStorage', {access: response.data.access, refresh: response.data.refresh, isAuthenticated: true})
          //unsecure change later
          localStorage.setItem('accessToken', response.data.access)
          localStorage.setItem('refreshToken', response.data.refresh)
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    setLoggedInUserId (context) {
      return new Promise((resolve, reject) => {
        getAPI.get('/api/user/get-logged-in-user/', {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}}
        ).then(response => {
          context.commit('setUser', {userId: response.data.userId})
          localStorage.setItem('userId', response.data.userId)
          resolve()
        }).catch(err => {
          localStorage.setItem('userId', null)
          console.log(err)
          reject()
        })
      })
    },
    verifyUser (context) {
      return new Promise((resolve, reject) => {
        getAPI.post('/api-token-verify/', {
          token: localStorage.getItem('accessToken')
        }).then(response => {
          context.commit('verifyUser', {isAuthenticated: true, accessToken: localStorage.getItem('accessToken')})
          console.log(response)
          resolve()
        }).catch(err => {
          context.commit('verifyUser', {isAuthenticated: false, accessToken: null})
          localStorage.setItem('accessToken', null)
          console.log(err)
          reject()
        })
      })
    },
    useRefreshToken (context) {
      return new Promise((resolve, reject) => {
        getAPI.post('/api-token-refresh/', {
          refresh: localStorage.getItem('refreshToken')
        }).then(response => {
          context.commit('useRefreshToken', {isAuthenticated: true, accessToken: response.data.access})
          localStorage.setItem('accessToken', response.data.access)
          console.log(response)
          resolve()
        }).catch(err => {
          context.commit('useRefreshToken', {isAuthenticated: false, accessToken: null})
          localStorage.setItem('accessToken', null)
          localStorage.setItem('refreshToken', null)
          console.log(err)
          reject()
        })
      })
    },
  },
  getters: {
    loggedIn(state) {
      return state.isAuthenticated
    },
    getPosts(state) {
      return state.APIData
    },
    getUserId() {
      return localStorage.getItem('userId')
    }
  },
  modules: {
  }
})
