<template>
    <v-container fluid style="max-width: 800px;">
        <custom-overlay :overlay="overlay" />
        <h2>通知一覧</h2>
        <div v-for="(item, index) in listNotice" :key="index">
            <notice :notice="item" class="my-2" />
        </div>
        <v-row justify="center">
            <v-btn
            v-if="nextToken !== null"
            color="teal"
            class="my-3"
            @click="getNotice"
            >
            さらに読み込み
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import * as Common from '~/assets/js/common.js'
import CustomOverlay from '~/components/overlay.vue'
import Notice from '~/components/notice.vue'

export default {
    components: {
        CustomOverlay,
        Notice
    },
    data () {
        return {
            overlay: false,
            nextToken: null,
            userID: "",
            listNotice: [],
            noticePerLoad: 20
        }
    },
    async mounted () {
        this.userID = this.$store.state.userID
        if ([null, undefined, ""].indexOf(this.userID) !== -1) {
            const currentUserInfo = await this.$Amplify.Auth.currentUserInfo()
            this.userID = await Common.getUserID(currentUserInfo)
        }
        this.getNotice()
    },
    methods: {
        async getNotice () {
            this.overlay = true
            try {
                let nextToken = null
                if (this.nextToken) {
                    nextToken = `"${this.nextToken}"`
                }
                const noticeByUserId = `
                    query NoticeByUserId {
                        noticeByUserID(
                            userID: "${this.userID}",
                            sortDirection: DESC,
                            limit: ${this.noticePerLoad},
                            nextToken: ${nextToken}
                        ) {
                        items {
                            id
                            content
                            fromUserID
                            fromUser {
                                id
                                identityID
                                name
                                viewName
                                iconUrl
                            }
                            postID
                            createdAt
                            _deleted
                            _version
                        }
                        nextToken
                        }
                    }
                `
                await API.graphql(graphqlOperation(noticeByUserId))
                    .then(res => {
                        const items = res.data.noticeByUserID.items
                        this.nextToken = res.data.noticeByUserID.nextToken
                        if ([null, undefined, []].indexOf(items) !== -1) {
                            throw new Error("通知が見つかりません")
                        }
                        this.listNotice = this.listNotice.concat(items)
                        items.map(item => {
                            if ([null, undefined, "", false].indexOf(item._deleted) !== -1) this.delNotice(item)
                        })
                        this.overlay = false
                    })
            } catch (e) {
                console.log('通知の取得に失敗しました' + e)
                this.overlay = false
            }
        },
        async delNotice (item) {
            try {
                const deleteNotice = `
                    mutation DeleteNotice {
                        deleteNotice(input: {
                            id: "${item.id}",
                            _version: ${item._version}
                        }) {
                            id
                            _version
                        }
                    }
                `
                await API.graphql(graphqlOperation(deleteNotice))
                    .then(res => {
                        console.log("Notice deleted")
                    })
            } catch (e) {
                console.log('通知の削除に失敗しました' + e)
            }
        }
    }
}
</script>