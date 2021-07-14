import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresLogin)) {
        if (!store.state.isAuthenticated) {
            store.dispatch('verifyUser'
            ).then(_ => {
                next()
                console.log(_)
                }
                ).catch(err => {
                    if (!store.state.isAuthenticated) {
                        store.dispatch('useRefreshToken'
                        ).then(_ => {
                            next()
                            console.log(_)
                        }
                        ).catch(err => {
                            next({name: 'Login'})
                            console.log(err + " You need to be logged in to access that page bro.")
                        })
                    }
                    else {
                        next({name: 'Login'})
                        console.log(err + " You need to be logged in to access that page.")
                    }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})
