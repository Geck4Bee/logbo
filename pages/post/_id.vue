<template>
    <div>
        <custom-overlay :overlay="overlay" />
        <custom-dialog
        :dialog="showDialog"
        :message="dialogMessage"
        :cancel="false"
        @agree="showDialog = !showDialog"
        />
        <div v-if="showPost" class="my-2">
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
                                <v-btn
                                color="teal"
                                @click="dialogReply = true"
                                >
                                返信
                                </v-btn>
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
                }
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
        await this.getPost()
        this.replyByPostID()
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
                    }
                }
            `
            try {
                await API.graphql(graphqlOperation(getPost))
                    .then(res => {
                        const items = res.data.getPost
                        if (items && Object.keys(items).length > 0) {
                            this.post = items
                            this.image.imgURL = this.post.imgUrl
                            const imageIdentityID = this.post.imgIdentityID || this.post.user.identityID
                            Common.setImgFileUser(this.image, imageIdentityID)
                            this.showPost = true
                        }
                        console.log("Post has loaded")
                    })
            } catch (e) {
                Common.failed(e, "投稿の読み込みに失敗しました", this.overlay)
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
                            pastPost
                            user {
                                id
                                identityID
                                name
                                viewName
                                iconUrl
                            }
                        }
                        nextToken
                        startedAt
                    }
                }
            `
            try {
                API.graphql(graphqlOperation(replyByPostId))
                    .then(res => {
                        const items = res.data.replyByPostID.items
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
                            userID: "${this.$store.state.userID}"
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
                        this.replies.unshift(reply)
                    })
            } catch (e) {
                Common.failed(e, "リプライの投稿に失敗しました", this.overlay)
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