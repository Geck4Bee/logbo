<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            :clipped="clipped"
            fixed
            app
        >
            <v-list class="mt-1 ml-2" v-if="isLoggedIn">
                <div style="display: flex;flex-wrap: nowrap;align-items: center;">
                    <v-avatar
                        color="indigo"
                        size="40"
                    >
                        <v-icon dark v-if="!$store.state.showPreviewImg">mdi-account-circle</v-icon>
                        <v-img
                        :src="$store.state.imgPreview"
                        v-if="$store.state.showPreviewImg"
                        alt="ユーザアイコン"
                        @error="removeImg"
                        class="profileIcon"
                        :max-width="50"
                        />
                    </v-avatar>
                    <span class="mx-2">{{ $store.state.currentUserInfo.username }}</span>
                </div>
                <amplify-sign-out class="mx-auto" v-if="isLoggedIn" />
            </v-list>
            <v-list class="pt-2" dense>
                <v-btn class="ml-4" text nuxt to="/signin" v-if="!isLoggedIn">サインイン</v-btn>
            </v-list>
            <v-list class="pt-2" dense>
                <v-divider></v-divider>
                <v-list-item
                    v-for="(item, i) in filteredItems"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn icon @click.stop="clipped = !clipped">
                <v-icon>mdi-application</v-icon>
            </v-btn>
            <v-btn icon @click.stop="fixed = !fixed">
                <v-icon>mdi-minus</v-icon>
            </v-btn>
            <nuxt-link
            style="text-decoration: none;color: white;"
            to="/">
            <h3>{{ title }}</h3>
            </nuxt-link>
            <v-spacer />
            <v-btn
            v-if="isLoggedIn"
            icon
            nuxt
            to="/notice"
            >
                <v-icon :color="noticeColor">mdi-bell</v-icon>
                <span :style="'color:' + noticeColor + ';'" >{{ noticeCount }}</span>
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container>
                <nuxt />
            </v-container>
        </v-main>
        <v-footer fixed app>
            <v-row justify="center">
                <v-btn
                class="mx-2"
                text
                dark
                href="https://discord.gg/Y9RDUuKfUN"
                target="_blank"
                rel="noopener noreferrer"
                >
                <v-icon color="grey">mdi-discord</v-icon>
                Discord
                </v-btn>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { AmplifyEventBus } from 'aws-amplify-vue'
import * as Common from '~/assets/js/common.js'
import { nanoid } from 'nanoid'

export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            isLoggedIn: false,
            items: [
                {
                    icon: 'mdi-home',
                    title: 'ホーム',
                    to: '/',
                    status: ['loggedIn', 'loggedOut']
                },
                {
                    icon: 'mdi-account',
                    title: 'プロフィール',
                    to: '/profile',
                    status: ['loggedIn']
                },
                {
                    icon: "mdi-post",
                    title: "投稿",
                    to: "/newPost",
                    status: ['loggedIn']
                }
            ],
            title: 'GESONTACLE(β)',
            currentUserInfo: {},
            img: {
                imgURL: null,
                imgPreview: null,
                showPreviewImg: false
            },
            noticeCount: 0,
            noticeColor: "grey",
            subscription: null
        }
    },
    async beforeCreate() {
        AmplifyEventBus.$on('authState', (info) => {
            if (info === 'signedIn') {
                this.$router.push('/')
                this.getUserInfo()
            } else if (info === 'signedOut') {
                this.$router.push('/')
                this.logout()
            }
        })
    },
    async created () {
        this.$store.commit("setPostType")
        this.$store.commit("setReplyType")
        this.$store.commit("setDelType")
        this.$store.commit("setNoticeCount")
        this.$store.subscribe(
            (mutation, state) => {
                if (["incrementNoticeCount", "decrementNoticeCount"].indexOf(mutation.type) !== -1) {
                    this.noticeCount = (state.noticeCount > 10) ? "10+" : state.noticeCount
                    this.noticeColor = (state.noticeCount > 0) ? 'white' : 'grey'
                }
            }
        )
        await this.getUserInfo()
    },
    computed: {
        filteredItems () {
            const self = this
            return self.items.filter((item) => {
                if (self.isLoggedIn) {
                    return item.status.indexOf('loggedIn') !== -1
                } else {
                    return item.status.indexOf('loggedOut') !== -1
                }
            })
        },
    },
    methods: {
        async getUserInfo () {
            this.currentUserInfo = this.$store.state.currentUserInfo || await this.$Amplify.Auth.currentUserInfo()
            if (this.currentUserInfo) {
                this.$store.commit('login', this.currentUserInfo)
                this.isLoggedIn = true
            }
            if (this.isLoggedIn) {
                this.getProfile()
                    .then((res) => this.countNotice())
                    .then((res) => this.subscribe())
            }
        },
        logout () {
            this.$store.commit('logout')
            this.isLoggedIn = false
            this.$store.commit('removeImg')
        },
        async getProfile () {
            if (!this.currentUserInfo) {
                this.currentUserInfo = await this.$Amplify.Auth.currentUserInfo()
            }
            const userByCognitoId = `
                query UserByCognitoId {
                    userByCognitoID(
                        cognitoID: "${this.currentUserInfo.attributes.sub}",
                        limit: 1,
                        nextToken: null
                    ) {
                        items {
                            id
                            iconUrl
                        },
                        nextToken
                    }
                }
            `
            try {
                await API.graphql(graphqlOperation(userByCognitoId))
                    .then(async (res) => {
                        const items = res.data.userByCognitoID.items[0]
                        if (items == null || items == undefined || items == []) {
                            throw "Profile not found"
                        }
                        this.$store.commit('setUserID', items.id)
                        this.img.imgURL = ("iconUrl" in items) ? items.iconUrl : null
                        Common.setImgFile(this.img)
                            .then((res) => {
                                if (res != null || res != undefined) {
                                    this.$store.commit("setImg", res.imgPreview)
                                }
                            })
                    })
            } catch (e) {
                console.log("Profile not found: " + e)
                this.createProfile(this.currentUserInfo)
            }
        },
        removeImg () {
            this.$store.commit("removeImg")
            this.img.imgURL = null
        },
        createProfile (currentUserInfo) {
            try {
                if ([null, undefined, "", {}].indexOf(currentUserInfo) !== -1) {
                    throw new Error('ユーザーが見つかりません')
                }
                const nowUnix = Common.getNow()
                const id = nanoid()
                const createUser = `
                    mutation CreateUser {
                        createUser(input: {
                            id: "${id}",
                            cognitoID: "${currentUserInfo.attributes.sub}",
                            name: "${currentUserInfo.username}",
                            viewName: "${currentUserInfo.username}",
                            email: "${currentUserInfo.attributes.email}",
                            description: "",
                        }) {
                            id
                            name
                            email
                            description
                        }
                    }
                `
                API.graphql(graphqlOperation(createUser))
                    .then((res)=> {
                        console.log("プロフィールを作成しました")
                    })
            } catch (e) {
                console.log("プロフィールの作成に失敗しました: " + e)
            }
        },
        async countNotice () {
            try {
                const noticeByUserId = `
                    query NoticeByUserId {
                        noticeByUserID(
                            userID: "${this.$store.state.userID}"
                            sortDirection: DESC
                            limit: 10
                            nextToken: null
                        ) {
                        items {
                            id
                            _deleted
                        }
                        nextToken
                        }
                    }
                `
                await API.graphql(graphqlOperation(noticeByUserId))
                    .then(res => {
                        const items = res.data.noticeByUserID.items.filter(item => [null, undefined, false, ""].indexOf(item._deleted) !== -1)
                        items.map(item => {
                            this.$store.commit("incrementNoticeCount")
                        })
                    })
            } catch (e) {
                console.log('通知の取得に失敗しました' + e)
            }
        },
        subscribe () {
            const onCreatNotice = `
                subscription OnCreateNotice {
                    onCreateNotice(userID: "${this.$store.state.userID}") {
                        id
                    }
                }
            `
            this.subscription = API.graphql(graphqlOperation(onCreatNotice))
                .subscribe({
                    next: (event) => {
                        if (event) {
                            const noticeObj = event.value.data.onCreateNotice
                            console.log("catch notice")
                            if ([null, undefined, "", {}].indexOf(noticeObj) === -1) {
                                this.$store.commit("incrementNoticeCount")
                            }
                        }
                    }
                })
        },
    }
}
</script>

<style>
.main-footer {
    background-color: #616161;
    box-shadow: 5px 5px 20px black;
}
#openConnectList {
    position: fixed;
    z-index: 90;
    right: 30px;
    bottom: 40px;
}
</style>
