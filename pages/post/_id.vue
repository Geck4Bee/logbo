<template>
    <div>
        <custom-overlay :overlay="overlay" />
        <div v-if="showPost" class="my-2">
            <custom-dialog
            :dialog="showDialog"
            :message="dialogMessage"
            :cancel="false"
            @agree="reload()"
            />
            <custom-dialog
            :dialog="showDialogResult"
            :message="dialogMessageResult"
            :cancel="false"
            @agree="$router.push('/')"
            />
            <v-card dark>
                <v-card-subtitle class="pb-0">
                    <v-row align="center">
                        <span style="color: gray; font-size: 0.9em;" class="mx-1">投稿者: </span>
                        <user-card-row :user="post.user" />
                        <span style="color: gray; font-size: 0.9em;" class="mx-1">投稿: {{ new Date(post.createdAt).toLocaleString() }}</span>
                        <span style="color: gray; font-size: 0.9em;" class="mx-1">更新: {{ new Date(post.updatedAt).toLocaleString() }}</span>
                    </v-row>
                </v-card-subtitle>
                <v-expansion-panels multiple v-model="openPost">
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <h2>{{ post.title }}</h2>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row justify="start">
                                <div v-if="image.showPreviewImg" class="mx-2">
                                    <v-img
                                    :src="image.imgPreview"
                                    alt="画像のプレビュー"
                                    @error="Common.resetImgURL(icon)"
                                    class="user-image-minimum"
                                    max-width="200"
                                    />
                                </div>
                                <div class="mx-4">
                                    <v-row justify="start" class="my-2">
                                        <h4>日付: </h4>
                                        <span class="ml-2">{{ post.date }}</span>
                                    </v-row>
                                    <v-row justify="start" class="my-2">
                                        <h4>URL:</h4>
                                            <a
                                            class="post-url ml-2"
                                            :href="post.URL"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            :style="(post.URL !=='')? '' : 'pointer-events:none;'"
                                            >
                                                <span>{{ (post.URL !=='')? post.URL : "無し" }}</span>
                                            </a>
                                    </v-row>
                                    <v-row justrify="start" class="my-2">
                                        <h4 class="mr-2">タグ:</h4>
                                        <div v-for="(tag, index) in JSON.parse(post.tag)" :key="index">
                                            <button
                                            class="mx-2"
                                            @click="redirectWithTag(tag)"
                                            >
                                                <span class="tag-link">#{{ tag }}</span>
                                            </button>
                                        </div>
                                    </v-row>
                                </div>
                            </v-row>
                            <v-row justify="center">
                                <div v-if="$store.state.isLoggedIn">
                                    <v-btn
                                    color="teal"
                                    @click="dialogReply = true"
                                    dark
                                    >
                                    <v-icon class="mr-1">mdi-message-reply</v-icon>
                                    返信
                                    </v-btn>
                                </div>
                                <div v-if="post.userID === userID">
                                    <v-btn
                                    color="indigo"
                                    class="mx-2"
                                    dark
                                    @click="delPost"
                                    >
                                    <v-icon>mdi-delete</v-icon>
                                    削除
                                    </v-btn>
                                </div>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </div>
        <div v-for="(reply, index) in replies" :key="index" class="my-1">
            <reply
            :reply="reply"
            :index="index"
            :post="post"
            @reload="reload"
            />
        </div>
        <v-row justify="center" class="my-1">
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
        <v-dialog v-model="dialogReply" max-width="600">
            <form-reply 
            :post="post"
            ref="formReplyComp"
            @put="createReply"
            />
        </v-dialog>
    </div>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import * as Common from '~/assets/js/common.js'
import CustomOverlay from '~/components/overlay.vue'
import CustomDialog from '~/components/dialog.vue'
import UserCardRow from '~/components/userCardRow.vue'
import FormReply from '~/components/formReply.vue'
import Reply from '~/components/reply.vue'

export default {
    components: {
        CustomOverlay,
        CustomDialog,
        UserCardRow,
        FormReply,
        Reply
    },
    data () {
        return {
            showPost: false,
            userID: null,
            openPost: [0],
            post: {
                id: "",
                title: "",
                URL: "",
                tag: "",
                date: "2020-12-01",
                imgUrl: "",
                imgIdentityID: "",
                createdAt: "",
                updatedAt: "",
                userID: "",
                user: {
                    id: "",
                    identityID: "",
                    name: "",
                    viewName: "",
                    iconUrl: ""
                },
                _version: 0
            },
            image: {
                name: "image",
                imgURL: null,
                imgFile: null,
                imgType: null,
                imgPreview: null,
                showPreviewImg: false,
            },
            overlay: false,
            showDialog: false,
            dialogMessage: "",
            dialogMessageResult: "",
            showDialogResult: false,
            replies: [],
            repliesPerPage: 10,
            replyType: "all",
            nextToken: "",
            nextTokens: [],
            page: 1,
            totalPages: 1,
            dialogReply: false,
        }
    },
    async created () {
        this.post.id = this.$route.params.id
        this.userID = this.$store.state.userID
        if (!this.userID) {
            const currentUserInfo = await this.$Amplify.Auth.currentUserInfo()
            this.userID = await Common.getUserID(currentUserInfo)
        }
        await this.getPost()
        await this.replyByPostID()
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
        async reload () {
            this.showDialog = false
            this.showDialogResult = false
            this.showPost = false
            this.post = {}
            this.post.id = this.$route.params.id
            this.replies = []
            await this.getPost()
            await this.replyByPostID()
        },
        redirectWithTag (e) {
            const query = {
                title: "",
                tag: e,
                URL: "",
                userID: "",
                date: ""
            }
            this.$router.push({ path: "/", query: query})
        },
        backBtn () {
            this.page--
            this.nextToken = this.nextTokens[this.page-1]
            this.replyByPostID()
        },
        nextBtn () {
            if (this.page === this.totalPages) {
                this.nextTokens.push(this.nextToken)
                this.totalPages++
            }
            this.page++
            this.replyByPostID()
        },
        async getPost () {
            this.overlay = true
            const getPost = `
                query GetPost {
                    getPost(id: "${this.post.id}") {
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
                        _version
                        _deleted
                    }
                }
            `
            try {
                await API.graphql(graphqlOperation(getPost))
                    .then(res => {
                        const items = res.data.getPost
                        if (items && Object.keys(items).length > 0) {
                            this.post = items
                            if (this.post._deleted) throw new Error("投稿は削除されています")
                            this.image.imgURL = this.post.imgUrl
                            const imageIdentityID = this.post.imgIdentityID || this.post.user.identityID
                            Common.setImgFileUser(this.image, imageIdentityID)
                            this.showPost = true
                        } else {
                            throw new Error("投稿が見つかりません")
                        }
                        console.log("Post has loaded")
                    })
            } catch (e) {
                Common.failed(e, "投稿の読み込みに失敗しました", this.overlay)
                this.$router.push("/")
            }
            this.overlay = false
        },
        async replyByPostID() {
            this.overlay = true
            let nextToken = null
            if (this.nextToken) {
                nextToken = `"${this.nextToken}"`
            }
            const filter = (this.replyType !== "all")? `filter: {and: [{type: {eq: "${this.replyType}"}}]}` : ""
            const replyByPostId = `
                query ReplyByPostId {
                    replyByPostID (
                        postID: "${this.post.id}"
                        sortDirection: DESC
                        ${filter}
                        limit: ${this.repliesPerPage}
                        nextToken: ${nextToken}
                    ) {
                        items {
                            id
                            type
                            content
                            request
                            createdAt
                            updatedAt
                            userID
                            imgUrl
                            postID
                            pastPost
                            user {
                                id
                                identityID
                                name
                                viewName
                                iconUrl
                            },
                            _version
                            _deleted
                        }
                        nextToken
                        startedAt
                    }
                }
            `
            try {
                API.graphql(graphqlOperation(replyByPostId))
                    .then(res => {
                        const items = res.data.replyByPostID.items.filter(obj => !obj._deleted)
                        this.nextToken = res.data.replyByPostID.nextToken
                        if (items.length > 0) this.replies = items
                        console.log('Replies has loaded')
                    })
            } catch (e) {
                Common.failed(e, "リプライの読み込みに失敗しました", this.overlay)
            }
            this.overlay = false
        },
        async createReply (reply) {
            this.dialogReply = false
            this.overlay = true
            try {
                if (reply.image.imgFile != null) {
                    await Common.S3Upload(reply.image, reply.id, this.overlay)
                }
                const createReply = `
                    mutation CreateReply {
                        createReply(input: {
                            id: "${reply.id}",
                            postID: "${this.post.id}",
                            type: "${reply.type}",
                            content: "${reply.content.replace(/\n/gi, '\\n')}",
                            request: "${JSON.stringify(reply.request).replace(/"/g, '\\"')}",
                            imgUrl: "${reply.image.imgURL}"
                            pastPost: "${JSON.stringify(reply.pastPost).replace(/"/g, '\\"')}"
                            userID: "${this.userID}"
                        }) {
                            id
                            postID
                            type
                            content
                            request
                            imgUrl
                            pastPost
                            userID
                        }
                    }
                `
                API.graphql(graphqlOperation(createReply))
                    .then(res => {
                        console.log('succeeded')
                        this.overlay = false
                        this.dialogMessage = "リプライを投稿しました"
                        this.showDialog = true
                    })
            } catch (e) {
                Common.failed(e, "リプライの投稿に失敗しました", this.overlay)
            }
        },
        async delPost () {
            this.showDialog = false
            this.overlay = true
            try {
                const currentCredentials = await this.$Amplify.Auth.currentCredentials()
                if (this.post.user.identityID !== currentCredentials.identityId) {
                    throw new Error("権限のないアカウント")
                }
                await this.replies.map(async (reply) => {
                    await this.delReply(reply)
                })
                console.log("Deleted All Replies")
                if ([null, undefined, ""].indexOf(this.image.imgURL) === -1) {
                    await Common.S3Remove(this.image, this.overlay)
                }
                const deletePost = `
                    mutation DeletePost {
                        deletePost(input: {
                            id: "${this.post.id}"
                            _version: ${this.post._version}
                        }) {
                        id
                        _version
                        }
                    }
                `
                await API.graphql(graphqlOperation(deletePost))
                    .then(res => {
                        this.overlay = false
                        this.dialogMessageResult = "投稿を削除しました"
                        this.showDialogResult = true
                    })
            } catch (e) {
                Common.failed(e, "投稿の削除に失敗しました", this.overlay)
            }
        },
        async delReply (reply) {
            try {
                if ([null, undefined, ""].indexOf(reply.imgUrl) === -1) {
                    const imgObj = {
                        imgURL: reply.imgUrl
                    }
                    await Common.S3Remove(imgObj, this.overlay)
                }
                const deleteReply = `
                    mutation DeleteReply {
                        deleteReply(input: {
                            id: "${reply.id}"
                            _version: ${reply._version}
                        }) {
                        id
                        _version
                        }
                    }
                `
                await API.graphql(graphqlOperation(deleteReply))
                    .then(res => {
                        console.log("Deleted Reply")
                    })
            } catch (e) {
                Common.failed(e, "投稿の削除に失敗しました", this.overlay)
            }
        },
    }
}
</script>

<style>
.post-url {
    text-decoration: none;
    color: gray !important;
}
.post-url:hover {
    color: white !important;
}
.tag-link {
    color: gray;
}
.tag-link:hover {
    color: white;
}
</style>