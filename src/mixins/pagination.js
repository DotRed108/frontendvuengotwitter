export default {
    data () {
        return {
            responseData: [],
            page: 1,
            maxPage: 1
        }
    },
    mounted() {
        this.$nextTick(function () {
            window.addEventListener('scroll', this.onScroll)
            this.onScroll()
        })
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        onScroll() {
            let pageBottom = this.$refs['pageBottom']
            if (pageBottom) {
                let bottom = pageBottom.getBoundingClientRect()
                let top = window.innerHeight
                if ((bottom.top - top) <= 0.7 && this.page < this.maxPage) {
                    this.page++
                    this.callAPI()
                }
            }
        }
    }
}