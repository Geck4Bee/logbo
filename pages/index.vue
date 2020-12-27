<template>
    <v-container fluid style="max-width: 900px;">
        <custom-overlay :overlay="overlay" />
        <custom-dialog
        :dialog="showDialog"
        :message="dialogMessage"
        :cancel="false"
        @agree="showDialog = !showDialog"
        />
        <search-form class="my-1" />
        <v-row v-if="query.title !== '' || query.tag !== '' || query.URL !== '' || showQueryUser">
            <h4>検索条件: </h4>
        </v-row>
        <v-row justify="end" class="mt-4">
            <v-select
            class="mr-4"
            v-model="query.sort"
            :items="sortTypes"
            item-text="name"
            item-value="value"
            label="並び替え"
            style="max-width: 200px;"
            outlined
            dense
            @change="changeSort"
            />
            <v-btn
            color="grey darken-4"
            dark
            @click="downloadTxt"
            >
            一覧出力
            </v-btn>
        </v-row>
        <v-row v-if="query.date !== ''" align="center">
            <v-btn
            icon
            color="indigo"
            @click="removeQuery('date')"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <h4>日付:<span class="mx-1"></span>{{ query.date }}</h4>
        </v-row>
        <v-row v-if="query.type !== ''" align="center">
            <v-btn
            icon
            color="indigo"
            @click="removeQuery('type')"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <h4>情報の種類:<span class="mx-1"></span>{{ typeName }}</h4>
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
        <v-row align="center">
            <h4>並び順:<span class="mx-1"></span>{{ sortName }}</h4>
        </v-row>
        <div v-for="(postObj, indexParent) in postObjs" :key="indexParent">
            <div class="mb-4">
                <v-row justify="start">
                    <h2>{{ new Date(postObj.date).toLocaleDateString().replace(new RegExp(/(\/)/gi), '-') }}</h2>
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
    </v-container>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import * as Common from '~/assets/js/common.js'
import CustomOverlay from '~/components/overlay.vue'
import CustomDialog from '~/components/dialog.vue'
import Post from "~/components/post.vue"
import UserCardRow from '~/components/userCardRow.vue'
import SearchForm from '~/components/searchForm.vue'
import { saveAs } from 'file-saver'

export default {
    components: {
        CustomOverlay,
        CustomDialog,
        Post,
        UserCardRow,
        SearchForm
    },
    data () {
        return {
            overlay: false,
            showDialog: false,
            dialogMessage: "",
            postObjs: [],
            nextToken: null,
            nextTokens: [null],
            page: 1,
            totalPages: 1,
            postCount: 0,
            postsPerPage: 15,
            date: null,
            startDate: null,
            query: {
                type: "",
                title: "",
                tag: "",
                URL: "",
                userID: "",
                date: "",
                sort: "date",
            },
            typeName: "",
            queryUser: {
                id: "",
                identityID: "",
                name: "",
                viewName: "",
                iconUrl: ""
            },
            showQueryUser: false,
            sortTypes: [
                {name: "ソースの日付順", value: "date"},
                {name: "記事作成日時順", value: "createdAt"},
                {name: "記事更新日時順", value: "updatedAt"}
            ],
            sortName: "ソースの日付順",
            loadflag: true
        }
    },
    asyncData (context) {
        let query = {
            type: "",
            title: "",
            tag: "",
            URL: "",
            userID: "",
            date: "",
            sort: "date"
        }
        const queryKey = Object.keys(context.query)
        queryKey.map((key) => {
            query[key] = context.query[key]
        })
        const postTypes = [
            {name: "政府またはそれに準ずる組織・個人", value: "primary"},
            {name: "民間報道", value: "secondary"},
            {name: "その他の企業・機関・団体の公式発表", value: "official"},
            {name: "リーク", value: "leak"},
            {name: "民間情報全般", value: "civilian"},
        ]
        const sortTypes = [
            {name: "ソースの日付順", value: "date"},
            {name: "記事作成日時順", value: "createdAt"},
            {name: "記事更新日時順", value: "updatedAt"}
        ]
        const typeObj = postTypes.find(obj => obj.value === query.type)
        const sortObj = sortTypes.find(obj => obj.value === query.sort)
        const typeName = ([null, undefined, "", {}].indexOf(typeObj) === -1)? typeObj.name : "null"
        const sortName = ([null, undefined, "", {}].indexOf(sortObj) === -1)? sortObj.name : "null"
        const now = new Date()
        const date = (query.date !== "")? new Date(Number(query.date.substring(0, 4)), Number(query.date.substring(5, 7))-1, Number(query.date.substring(8))) : new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const startDate = new Date(2020, 1, 1)
        return { 
            query: query,
            typeName: typeName,
            sortName: sortName,
            date: date,
            startDate: startDate,
            nextTokens: [null]
        }
    },
    watchQuery: ['type', 'title', 'tag', 'URL', 'userID', 'date', 'sort'],
    created () {
        if (this.$store.state.page === undefined || this.$store.state.nextToken === undefined || this.$store.state.nextTokens === undefined) {
            this.$store.commit("setupNextToken")
            this.$store.commit("setupPage")
        } else {
            this.page = this.$store.state.page
            this.nextTokens = this.$store.state.nextTokens
            this.nextToken = this.nextTokens[this.page -1]
            this.totalPages = this.nextTokens.length
        }
    },
    mounted () {
        this.startLoading()
    },
    computed: {
        disableBackBtn () {
            return ((this.page -1 < 1) ? true : false)
        },
        disableNextBtn () {
            return ( ([null, "null", ""].indexOf(this.nextToken) !== -1 && this.postCount < this.postsPerPage) ? true : false )
        }
    },
    watch: {
        query: function(newVal) {
            console.log(newVal)
            this.nextToken = null
            this.nextTokens = [null]
            this.$store.commit("setupNextToken")
            this.startLoading()
        },
    },
    methods: {
        changeSort () {
            this.$router.push({path: "/", query: this.query})
        },
        downloadTxt () {
            let content = ''
            this.postObjs.map(postObj => {
                const dateLocale = new Date(postObj.date).toLocaleDateString().replace(new RegExp(/(\/)/gi), '-')
                content = content + '●' + dateLocale + '\n'
                postObj.posts.map(post => {
                    content = content + '・' + post.title + '\n' + post.URL + '\n'
                })
                content = content + '\n'
            })
            const blob = new Blob([content], {type: "text/plain;charset=utf-8"})
            const now = new Date().toLocaleDateString().replace(new RegExp(/(\/)/gi), '-')
            const filename = 'ログボ一覧_' + now + '.txt'
            saveAs(blob, filename)
        },
        removeQuery (key) {
            this.query[key] = ""
            this.$router.push({ path: "/", query: this.query})
        },
        backBtn () {
            this.page--
            this.$store.commit("setPage", this.page)
            this.postCount = 0
            this.postObjs = []
            this.$store.commit("setNextToken", this.nextToken)
            this.nextToken = this.nextTokens[this.page-1]
            this.getPosts()
        },
        nextBtn () {
            if (this.page === this.totalPages) {
                this.nextTokens.push(this.nextToken)
                this.$store.commit("setNextTokens", this.nextTokens)
                this.totalPages++
            }
            this.page++
            this.$store.commit("setPage", this.page)
            this.postCount = 0
            this.postObjs = []
            this.getPosts()
        },
        async startLoading () {
            if (this.query.userID !== "") {
                await this.getUser()
            }
            this.getPosts()
        },
        resultGetPostsByDate (items) {
            if (items.length > 0) {
                let dateList = items.map(item => item.date)
                dateList = [...new Set(dateList)]
                const itemsByDate = dateList.map(date => {
                    return {
                        date: date,
                        posts: items.filter(item => item.date === date)
                    }
                })
                this.postObjs = this.postObjs.concat(itemsByDate)
                this.postCount += items.length
            }
            if (this.postCount >= this.postsPerPage || this.nextToken === null) {
                this.loadflag = false
            }
            this.overlay = false
        },
        resultGetPostsByDateTime (items, type) {
            if (items.length > 0) {
                let dateList = (type === "createdAt")? items.map(item => item.createdAt.substring(0, 10)) : items.map(item => item.updatedAt.substring(0, 10))
                dateList = [...new Set(dateList)]
                const itemsByDate = dateList.map(date => {
                    const posts = (type === "createdAt")? items.filter(item => item.createdAt.substring(0, 10) === date) : items.filter(item => item.updatedAt.substring(0, 10) === date)
                    return {
                        date: date,
                        posts: posts
                    }
                })
                this.postObjs = this.postObjs.concat(itemsByDate)
                this.postCount += items.length
            }
            if (this.postCount >= this.postsPerPage || this.nextToken === null) {
                this.loadflag = false
            }
            this.overlay = false
        },
        async getPostsDiVDate (nextToken, filter) {
            const postByDivDate = `
                query PostByDivDate {
                    postByDivDate (
                        div: "1"
                        date: {le: "${Common.toISO8601DateString(this.date)}"}
                        sortDirection: DESC
                        ${filter}
                        limit: ${this.postsPerPage - this.postCount}
                        nextToken: ${nextToken}
                    ) {
                    items {
                        id
                        div
                        title
                        type
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
                        _version
                        _deleted
                    }
                    nextToken
                    }
                }
            `
            try {
                await API.graphql(graphqlOperation(postByDivDate))
                    .then((res) => {
                        const items = res.data.postByDivDate.items.filter(obj => !obj._deleted)
                        this.$store.commit("setNextToken", this.nextToken)
                        this.nextToken = res.data.postByDivDate.nextToken
                        this.resultGetPostsByDate(items)
                    })
            } catch (e) {
                Common.failed(e, "投稿の読み込みに失敗しました", this.overlay)
                this.overlay = false
            }
        },
        async getPostsCreatedAt (nextToken, filter) {
            const postByCreatedAt = `
                query PostByCreatedAt {
                    postByCreatedAt (
                        div: "1"
                        createdAt: {le: "${Common.toISO8601DateString(this.date)}"}
                        sortDirection: DESC
                        ${filter}
                        limit: ${this.postsPerPage - this.postCount}
                        nextToken: ${nextToken}
                    ) {
                    items {
                        id
                        div
                        title
                        type
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
                        _version
                        _deleted
                    }
                    nextToken
                    }
                }
            `
            try {
                await API.graphql(graphqlOperation(postByCreatedAt))
                    .then((res) => {
                        const items = res.data.postByCreatedAt.items.filter(obj => !obj._deleted)
                        this.$store.commit("setNextToken", this.nextToken)
                        this.nextToken = res.data.postByCreatedAt.nextToken
                        this.resultGetPostsByDateTime(items, "createdAt")
                    })
            } catch (e) {
                Common.failed(e, "投稿の読み込みに失敗しました", this.overlay)
                this.overlay = false
            }
        },
        async getPostsUpdatedAt (nextToken, filter) {
            const postByUpdatedAt = `
                query PostByUpdatedAt {
                    postByUpdatedAt (
                        div: "1"
                        updatedAt: {le: "${Common.toISO8601DateString(this.date)}"}
                        sortDirection: DESC
                        ${filter}
                        limit: ${this.postsPerPage - this.postCount}
                        nextToken: ${nextToken}
                    ) {
                    items {
                        id
                        div
                        title
                        type
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
                        _version
                        _deleted
                    }
                    nextToken
                    }
                }
            `
            try {
                await API.graphql(graphqlOperation(postByUpdatedAt))
                    .then((res) => {
                        const items = res.data.postByUpdatedAt.items.filter(obj => !obj._deleted)
                        this.$store.commit("setNextToken", this.nextToken)
                        this.nextToken = res.data.postByUpdatedAt.nextToken
                        this.resultGetPostsByDateTime(items, "updatedAt")
                    })
            } catch (e) {
                Common.failed(e, "投稿の読み込みに失敗しました", this.overlay)
                this.overlay = false
            }
        },
        async getPosts () {
            this.overlay = true
            let nextToken = null
            this.loadflag = true
            do {
                if (this.nextToken) {
                    nextToken = `"${this.nextToken}"`
                }
                const filterTitle = (this.query.title !== "")? `{title: {contains: "${this.query.title}"}},`: ''
                const filterTagTitle = (this.query.title !== "")? `{tag: {contains: "${this.query.title}"}},`: ''
                const filterTag = (this.query.tag !== "")? `{tag: {contains: "${this.query.tag}"}},`: ''
                const filterURL = (this.query.URL !== "")? `{URL: {contains: "${this.query.URL}"}},` : ''
                const filterSubURLs = (this.query.URL !== "")? `{subURLs: {contains: "${this.query.URL}"}}` : ''
                const filterOR = ( filterTitle !== '' || filterTagTitle !== '' || filterURL !== '' || filterSubURLs !== '' || filterTag !== '')? 'or: [' + filterTitle + filterTagTitle + filterTag + filterURL + filterSubURLs + '],' : ''
                
                const filterType = (this.query.type !== "")? `{type: {eq: "${this.query.type}"}},`: ''
                const filterUserID = (this.query.userID !== "")? `{userID: {eq: "${this.query.userID}"}},` : ''
                const filterAnd = ( filterType !== '' || filterUserID !== '')? 'and: [' + filterType + filterURL + filterUserID + ']' : ''
                
                const filter = ( filterOR !== '' || filterAnd !== '')? 'filter: {' + filterOR + filterAnd + '}' : ''
                if (this.query.sort === "date"){
                    await this.getPostsDiVDate(nextToken, filter)
                } else if (this.query.sort === "createdAt") {
                    await this.getPostsCreatedAt(nextToken, filter)
                } else if (this.query.sort === "updatedAt") {
                    await this.getPostsUpdatedAt(nextToken, filter)
                } else {
                    this.loadflag = false
                }
            } while (this.loadflag)
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
                this.overlay = false
            }
        },
    }
}
</script>
