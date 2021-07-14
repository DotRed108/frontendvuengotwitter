import {getAPI} from "@/axios.api";
import store from "@/store";

export default {
    methods: {
        deleteAPICall(APIUrl) {
            getAPI.delete(APIUrl, {headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}}
            ).then(response => {
                this.responseData = response.data
            }).catch(err => {
                console.log(err)
                store.dispatch('useRefreshToken'
                ).then(_ => {
                    console.log(_)
                    getAPI.post(APIUrl, {headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}}
                    ).then(response => {
                        this.responseData = response.data
                        }).catch(err => {
                            console.log(err)
                        })
                }).catch(err => {
                    console.log(err)
                })
                }
            )
        }
    }
}