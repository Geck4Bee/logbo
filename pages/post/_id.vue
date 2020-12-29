<template>
    <v-container fluid style="max-width:950px;">
        <custom-overlay :overlay="overlay" />
        <div v-if="showPost" class="my-2">
            <img-modal ref="imgModal" :image="image" :identityID="post.user.identityID" />
            <custom-dialog
            :dialog="showDialog"
            :message="dialogMessage"
            :cancel="false"
            @agree="reload()"
            />
            <custom-dialog
            :dialog="showDialogDelete"
            :message="dialogMessageDelete"
            :cancel="false"
            @agree="delPost()"
            />
            <custom-dialog
            :dialog="showDialogResult"
            :message="dialogMessageResult"
            :cancel="false"
            @agree="$router.push('/')"
            />
            <v-card :dark="$vuetify.theme.dark">
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
                            <div style="display:flex;flex-wrap:wrap;">
                                <button v-if="image.showPreviewImg" class="mx-2" @click="showImgModal">
                                    <v-img
                                    :src="image.imgPreview"
                                    alt="画像のプレビュー"
                                    @error="Common.resetImgURL(icon)"
                                    class="user-image-minimum"
                                    max-width="200"
                                    />
                                </button>
                                <div class="mx-4" style="max-width: 100%;">
                                    <div class="my-2 wrap-box">
                                        <h4>情報の種類: </h4>
                                        <span class="ml-2" style="color: gray;">{{ typeName }}</span>
                                    </div>
                                    <div class="my-2 wrap-box">
                                        <h4>日付: </h4>
                                        <span class="ml-2" style="color: gray;">{{ post.date }}</span>
                                    </div>
                                    <div class="my-2">
                                        <span style="font-weight: bold;" class="mr-2">URL:</span>
                                        <a
                                        :class="($vuetify.theme.dark)? 'post-url-dark' : 'post-url-light'"
                                        :href="post.URL"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        :style="(post.URL !=='')? '' : 'pointer-events:none;'"
                                        >
                                            {{ (post.URL !=='')? post.URL : "無し" }}
                                        </a>
                                    </div>
                                    <div class="my-2 wrap-box" v-if="[null, undefined, '[]'].indexOf(post.subURLs) === -1">
                                        <span style="font-weight: bold;" class="mr-2">URL(オプション):</span>
                                        <div v-for="(subURL, index) in JSON.parse(post.subURLs)" :key="index" style="max-width: 100%;display: inline-block;">
                                            <a
                                            :class="($vuetify.theme.dark)? 'post-url-dark' : 'post-url-light'"
                                            :href="subURL"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            :style="(subURL !=='')? '' : 'pointer-events:none;'"
                                            >
                                                {{ (subURL !=='')? subURL : "無し" }}
                                            </a>
                                            <span class="mr-2" style="color: gray;">{{(index !== JSON.parse(post.subURLs).length -1)? ',' : ''}}</span>
                                        </div>
                                    </div>
                                    <div class="my-2 wrap-box">
                                        <h4 class="mr-2">タグ:</h4>
                                        <div v-for="(tag, index) in JSON.parse(post.tag)" :key="index">
                                            <button
                                            class="mx-2"
                                            @click="redirectWithTag(tag)"
                                            >
                                                <span :class="($vuetify.theme.dark)? 'tag-link-dark' : 'tag-link-light'">#{{ tag }}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                    @click="delPostDialog"
                                    >
                                    <v-icon>mdi-delete</v-icon>
                                    削除
                                    </v-btn>
                                </div>
                                <div v-if="$store.state.isLoggedIn">
                                    <del-btn :postID="post.id" />
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
    </v-container>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import * as Common from '~/assets/js/common.js'
import CustomOverlay from '~/components/overlay.vue'
import CustomDialog from '~/components/dialog.vue'
import UserCardRow from '~/components/userCardRow.vue'
import FormReply from '~/components/formReply.vue'
import Reply from '~/components/reply.vue'
import DelBtn from '~/components/delBtn.vue'
import ImgModal from '~/components/imgModal.vue'

export default {
    components: {
        CustomOverlay,
        CustomDialog,
        UserCardRow,
        FormReply,
        Reply,
        DelBtn,
        ImgModal
    },
    data () {
        return {
            showPost: false,
            userID: null,
            openPost: [0],
            post: {
                id: "",
                title: "",
                type: "",
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
            postTypes: [],
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
            showDialogDelete: false,
            dialogMessageDelete: "",
            replies: [],
            repliesPerPage: 20,
            replyType: "all",
            nextToken: "",
            nextTokens: [],
            page: 1,
            totalPages: 1,
            dialogReply: false,
        }
    },
    async created () {
        this.postTypes = this.$store.state.postType
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
        },
        typeName () {
            const typeObj = this.postTypes.find(obj => obj.value === this.post.type)
            return ([null, undefined, "", {}].indexOf(typeObj) === -1)? typeObj.name : "null"
        }
    },
    methods: {
        showImgModal () {
            this.$refs.imgModal.setImage()
        },
        delPostDialog () {
            this.dialogMessageDelete = "投稿を削除します。よろしいでしょうか？"
            this.showDialogDelete = true
        },
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
                date: "",
                sort: "date"
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
                        type
                        URL
                        subURLs
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
                this.overlay = false
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
                this.overlay = false
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
                const replyTypes = this.$store.state.replyType
                const typeObj = replyTypes.find(item => item.value === reply.type)
                const typeName = ([null, undefined, "", {}].indexOf(typeObj) === -1)? typeObj.name : "null"
                const createNotice = `
                    mutation CreateNotice {
                        createNotice(input: {
                            id: "${reply.id}",
                            content: "${this.post.title}に${typeName}が投稿されました",
                            userID: "${this.post.userID}",
                            fromUserID: "${this.userID}",
                            postID: "${this.post.id}",
                            replyID: "${reply.id}"
                        }) {
                            id
                            content
                            userID
                            fromUserID
                            postID
                            replyID
                        }
                    }
                `
                await API.graphql(graphqlOperation(createReply))
                    .then(async (res) => {
                        console.log('Send Reply Succeeded')
                        await API.graphql(graphqlOperation(createNotice))
                            .then((res) => {
                                this.overlay = false
                                this.dialogMessage = "リプライを投稿しました"
                                this.showDialog = true
                            })
                    })
            } catch (e) {
                Common.failed(e, "リプライの投稿に失敗しました", this.overlay)
                this.overlay = false
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
                this.overlay = false
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
                this.overlay = false
            }
        },
    }
}
</script>

<style>
.post-url-dark {
    text-decoration: none;
    color: gray !important;
}
.post-url-dark:hover {
    color: white !important;
}
.post-url-light {
    text-decoration: none;
    color: gray !important;
}
.post-url-light:hover {
    color: black !important;
}
.tag-link-dark {
    color: gray;
}
.tag-link-dark:hover {
    color: white;
}
.tag-link-light {
    color: gray;
}
.tag-link-light:hover {
    color: black;
}
.wrap-box {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
}
</style>