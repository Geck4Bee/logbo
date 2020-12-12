<template>
    <div>
        <custom-overlay :overlay="overlay" />
        <custom-dialog
        :dialog="showDialog"
        :message="dialogMessage"
        :cancel="false"
        @agree="showDialog = !showDialog"
        />
        <v-row v-if="query.title !== '' || query.tag !== '' || query.URL !== '' || showQueryUser">
            <h4>検索条件: </h4>
        </v-row>
        <v-row v-if="query.title !== ''" align="center">
            <v-btn
            icon
            color="indigo"
            @click="removeQuery('title')"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <h4>キーワード:<span class="mx-1"></span>{{ query.title }}</h4>
        </v-row>
        <v-row v-if="query.tag !== ''" align="center">
            <v-btn
            icon
            color="indigo"
            @click="removeQuery('tag')"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <h4>タグ:<span class="mx-1"></span>{{ query.tag }}</h4>
        </v-row>
        <v-row v-if="query.URL !== ''" align="center">
            <v-btn
            icon
            color="indigo"
            @click="removeQuery('URL')"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <h4>URL:<span class="mx-1"></span>{{ query.URL }}</h4>
        </v-row>
        <v-row v-if="showQueryUser" align="center">
            <v-btn
            icon
            color="indigo"
            @click="removeQuery('userID')"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <h4>ユーザー:<span class="mx-1"></span></h4>
            <user-card-row :user="queryUser" />
        </v-row>
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
import Post from "~/components/post.vue"
import UserCardRow from '~/components/userCardRow.vue'

export default {
    components: {
        CustomOverlay,
        CustomDialog,
        Post,
        UserCardRow
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
            postsPerPage: 40,
            date: null,
            startDate: null,
            query: {
                title: "",
                tag: "",
                URL: "",
                userID: ""
            },
            queryUser: {
                id: "",
                identityID: "",
                name: "",
                viewName: "",
                iconUrl: ""
            },
            showQueryUser: false
        }
    },
    asyncData (context) {
        let query = {
            title: "",
            tag: "",
            URL: "",
            userID: ""
        }
        const queryKey = Object.keys(context.query)
        queryKey.map((key) => {
            query[key] = context.query[key]
        })
        const now = new Date()
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const startDate = new Date(2020, 11, 1)
        const nextTokenObj = {
            date: date.toISOString(),
            nextToken: null
        }
        return { 
            query: query,
            date: date,
            startDate: startDate,
            nextTokens: [nextTokenObj]
        }
    },
    watchQuery: ['title', 'tag', 'URL', 'userID'],
    mounted () {
        this.startLoading()
    },
    computed: {
        disableBackBtn () {
            return ((this.page -1 < 1) ? true : false)
        },
        disableNextBtn () {
            return ( ([null, "null", ""].indexOf(this.nextToken) !== -1) ? true : false )
        }
    },
    watch: {
        query: function(newVal) {
            this.startLoading()
        },
    },
    methods: {
        removeQuery (key) {
            this.query[key] = ""
            this.$router.push({ path: "/", query: this.query})
        },
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
        async startLoading () {
            if (this.query.userID !== "") {
                await this.getUser()
            }
            this.getPosts()
        },
        async getPosts () {
            this.overlay = true
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
                                    {title: {contains: "${this.query.title}"}},
                                    {tag: {contains: "${this.query.title}"}}
                                    {tag: {contains: "${this.query.tag}"}},
                                    {URL: {contains: "${this.query.URL}"}},
                                    {userID: {eq: "${this.query.userID}"}}
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
                            this.overlay = false
                        })
                } catch (e) {
                    Common.failed(e, "ログボの読み込みに失敗しました", this.overlay)
                }
            } while (this.flagLoad)
            console.log("Loading done") 
        },
        async getUser() {
            this.overlay = true
            const getUser = `
                query GetUser {
                    getUser(id: "${this.query.userID}") {
                        id
                        identityID
                        name
                        viewName
                        iconUrl
                    }
                }
            `
            try {
                await API.graphql(graphqlOperation(getUser))
                    .then((res) => {
                        this.queryUser = res.data.getUser
                        this.overlay = false
                        this.showQueryUser = true
                    })
            } catch (e) {
                Common.failed(e, "ユーザーの読み込みに失敗しました", this.overlay)
            }
        },
    }
}
</script>
