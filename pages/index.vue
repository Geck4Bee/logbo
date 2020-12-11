<template>
    <div>
        <custom-overlay :overlay="overlay" />
        <custom-dialog
        :dialog="showDialog"
        :message="dialogMessage"
        :cancel="false"
        @agree="showDialog = !showDialog"
        />
        <div v-for="(postObj, indexParent) in postObjs" :key="indexParent">
            <div class="mb-4">
                <v-row justify="start">
                    <h2>{{ new Date(postObj.date).toLocaleDateString() }}</h2>
                </v-row>
                <v-divider/>
                <div v-for="(post, indexChild) in postObj.posts" :key="indexChild">
                    <div :id="'post-' + post.id" class="my-2" justify="start">
                        <post :post="post" />
                    </div>
                </div>
            </div>
        </div>
        <v-row justify="center">
            <v-btn
            color="teal"
            class="mx-2"
            :disabled="disableBackBtn"
            @click="backBtn"
            >
                <span>前へ</span>
            </v-btn>
            <v-btn
            color="blue"
            class="mx-2"
            :disabled="disableNextBtn"
            @click="nextBtn"
            >
                <span>次へ</span>
            </v-btn>
        </v-row>
    </div>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import * as Common from '~/assets/js/common.js'
import CustomOverlay from '~/components/overlay.vue'
import CustomDialog from '~/components/dialog.vue'
import DatePicker from "~/components/datePicker.vue"
import Post from "~/components/post.vue"

export default {
    components: {
        CustomOverlay,
        CustomDialog,
        DatePicker,
        Post
    },
    data () {
        return {
            overlay: false,
            showDialog: false,
            dialogMessage: "",
            flagLoad: false,
            postObjs: [],
            nextToken: null,
            nextTokens: [],
            page: 1,
            totalPages: 1,
            postsPerPage: 2,
            date: null,
            startDate: null,
            queryTitle: "",
            queryTag: "",
            queryURL: "",
            queryUserID: ""
        }
    },
    created () {
        const now = new Date()
        this.date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        this.startDate = new Date(2020, 11, 1)
        this.nextTokens.push({
            date: this.date.toISOString(),
            nextToken: null
        })
    },
    mounted () {
        this.getPosts()
    },
    computed: {
        disableBackBtn () {
            return ((this.page -1 < 1) ? true : false)
        },
        disableNextBtn () {
            return ( ([null, "null", ""].indexOf(this.nextToken) !== -1) ? true : false )
        }
    },
    methods: {
        backBtn () {
            this.page--
            this.postObjs = []
            this.nextToken = this.nextTokens[this.page-1].nextToken
            this.date = new Date(this.nextTokens[this.page-1].date)
            this.getPosts()
        },
        nextBtn () {
            if (this.page === this.totalPages) {
                this.nextTokens.push({
                    date: this.date.toISOString(),
                    nextToken: this.nextToken
                })
                this.totalPages++
            }
            this.page++
            this.postObjs = []
            this.getPosts()
        },
        async getPosts () {
            this.flagLoad = true
            do {
                let nextToken = null
                if (this.nextToken) {
                    nextToken = `"${this.nextToken}"`
                }
                const postByDate = `
                    query PostByDate {
                        postByDate (
                            date: "${Common.toISO8601DateString(this.date)}"
                            sortDirection: DESC
                            filter: {
                                or: [
                                    {title: {contains: "${this.queryTitle}"}},
                                    {tag: {contains: "${this.queryTag}"}},
                                    {URL: {contains: "${this.queryURL}"}},
                                    {userID: {eq: "${this.queryUserID}"}}
                                ]
                            }
                            limit: ${this.postsPerPage}
                            nextToken: ${nextToken}
                        ) {
                        items {
                            id
                            title
                            URL
                            tag
                            date
                            imgUrl
                            imgIdentityID
                            createdAt
                            updatedAt
                            userID
                            user {
                                id
                                identityID
                                name
                                viewName
                                iconUrl
                            }
                        }
                        nextToken
                        }
                    }
                `
                try {
                    await API.graphql(graphqlOperation(postByDate))
                        .then((res) => {
                            const items = res.data.postByDate.items
                            this.nextToken = res.data.postByDate.nextToken
                            if (items.length > 0) {
                                this.postObjs.push({
                                    date: this.date.toISOString(),
                                    posts: items
                                })
                            }
                            if (this.postObjs.length >= this.postsPerPage
                            || this.date.getTime() <= this.startDate.getTime()
                            ) {
                                this.flagLoad = false
                            } else if (this.postObjs.length <= this.postsPerPage) {
                                this.date.setDate(this.date.getDate() - 1)
                            }
                        })
                } catch (e) {
                    Common.failed(e, "ログボの読み込みに失敗しました", this.overlay)
                }
            } while (this.flagLoad)
            console.log("Loading done") 
        }
    }
}
</script>
