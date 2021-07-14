import {getAPI} from "@/axios.api";
import store from "@/store";

export default {
    methods: {
        putAPICall(APIUrl, data) {
            return new Promise(function (resolve, reject) {
                getAPI.put(APIUrl, data, {headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}}
                ).then(response => {
                    resolve(response)
                }).catch(err => {
                    console.log(err)
                    store.dispatch('useRefreshToken'
                    ).then(_ => {
                        console.log(_)
                        getAPI.put(APIUrl, data, {headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}}
                        ).then(response => {
                            resolve(response)
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