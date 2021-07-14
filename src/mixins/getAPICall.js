import {getAPI} from "@/axios.api";
import store from "@/store";

export default {
    methods: {
        getAPICall(APIUrl) {
            return new Promise(function (resolve, reject) {
                getAPI.get(APIUrl, {headers: {Authorization: `Bearer ${store.state.accessToken}`}}
                ).then(response => {
                    resolve(response.data)
                }).catch(err => {
                    console.log(err)
                    store.dispatch('useRefreshToken'
                    ).then(_ => {
                        console.log(_)
                        getAPI.get(APIUrl, {headers: {Authorization: `Bearer ${store.state.accessToken}`}}
                        ).then(response => {
                            resolve(response.data)
                            }).catch(err => {
                                reject(err)
                            })
                    }).catch(err => {
                        reject(err)
                    })
                    }
                )
            })
        }
    }
}