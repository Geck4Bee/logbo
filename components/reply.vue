<template>
    <div v-if="showReply">
        <custom-overlay :overlay="overlay" />
        <custom-dialog
        :dialog="showDialog"
        :message="dialogMessage"
        :cancel="false"
        @agree="delReply()"
        />
        <custom-dialog
        :dialog="showDialogResult"
        :message="dialogMessageResult"
        :cancel="false"
        @agree="reload()"
        />
        <custom-dialog
        :dialog="showDialogAccept"
        :message="dialogMessageAccept"
        :cancel="false"
        @agree="accept()"
        />
        <custom-dialog
        :dialog="showDialogReject"
        :message="dialogMessageReject"
        :cancel="false"
        @agree="reject()"
        />
        <v-card dark>
            <v-card-subtitle class="pt-1 pb-0">
                <v-row align="center">
                    <span style="color: gray; font-size: 0.9em;" class="mx-1">投稿者: </span>
                    <user-card-row :user="reply.user" />
                    <span style="color: gray; font-size: 0.9em;" class="mx-1">投稿: {{ new Date(reply.createdAt).toLocaleString() }}</span>
                </v-row>
            </v-card-subtitle>
            <v-expansion-panels multiple v-model="openReply">
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <h4>{{ replyTypes.find(obj => obj.value === reply.type).name }}</h4>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div>
                            <div class="ml-2 mr-4">
                                <div v-if="['request', 'accept', 'reject'].indexOf(reply.type) !== -1 && pastImage.showPreviewImg && image.showPreviewImg">
                                    <v-img
                                    :src="pastImage.imgPreview"
                                    alt="画像のプレビュー"
                                    @error="Common.resetImgURL(pastImage)"
                                    class="user-image-minimum"
                                    max-width="200"
                                    />
                                </div>
                                <div
                                v-if="['request', 'accept', 'reject'].indexOf(reply.type) !== -1 && pastImage.showPreviewImg && image.showPreviewImg"
                                class="my-2 wrap-bo"
                                >
                                    <v-icon>mdi-arrow-down-bold-outline</v-icon>
                                </div>
                                <div v-if="image.showPreviewImg">
                                    <v-img
                                    :src="image.imgPreview"
                                    alt="画像のプレビュー"
                                    @error="Common.resetImgURL(image)"
                                    class="user-image-minimum"
                                    max-width="200"
                                    />
                                </div>
                            </div>
                            <div class="mx-4">
                                <div v-if="['request', 'accept', 'reject'].indexOf(reply.type) !== -1">
                                    <div v-if="reply.pastPost.title !== reply.request.title" class="my-1">
                                        <h4>タイトル:</h4>
                                        <div class="ml-2 wrap-box">
                                            <span class="mr-2">変更前:</span>
                                            <span>{{ reply.pastPost.title }}</span>
                                        </div>
                                        <div class="ml-2 wrap-box">
                                            <span class="mr-2">変更後:</span>
                                            <span>{{ reply.request.title }}</span>
                                        </div>
                                    </div>
                                    <div v-if="reply.pastPost.URL !== reply.request.URL" class="my-1">
                                        <h4>URL(必須):</h4>
                                        <div class="ml-2 wrap-box">
                                            <span class="mr-2">変更前:</span>
                                            <span>{{ reply.pastPost.URL }}</span>
                                        </div>
                                        <div class="ml-2 wrap-box">
                                            <span class="mr-2">変更後:</span>
                                            <span>{{ reply.request.URL }}</span>
                                        </div>
                                    </div>
                                    <div v-if="JSON.stringify(reply.pastPost.subURLs) !== JSON.stringify(reply.request.subURLs)" class="my-1">
                                        <h4>URL(オプション):</h4>
                                        <div class="ml-2 wrap-box">
                                            <span class="mr-2">変更前:</span>
                                            <div v-for="(URL, index) in reply.pastPost.subURLs" :key="index" style="max-width: 100%;">
                                                <span>{{ URL }}</span>
                                                <span v-if="index !== reply.pastPost.subURLs.length -1" class="mr-1">,</span>
                                            </div>
                                        </div>
                                        <div class="ml-2 wrap-box">
                                            <span class="mr-2">変更後:</span>
                                            <div v-for="(URL, index) in reply.request.subURLs" :key="index" style="max-width: 100%;">
                                                <span>{{ URL }}</span>
                                                <span v-if="index !== reply.request.subURLs.length -1" class="mr-1">,</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="reply.pastPost.date !== reply.request.date" class="my-1">
                                        <h4>日付:</h4>
                                        <div class="ml-2 wrap-box">
                                            <span class="mr-2">変更前:</span>
                                            <span>{{ reply.pastPost.date }}</span>
                                        </div>
                                        <div class="ml-2 wrap-box">
                                            <span class="mr-2">変更後:</span>
                                            <span>{{ reply.request.date }}</span>
                                        </div>
                                    </div>
                                    <div v-if="JSON.stringify(reply.pastPost.tag) !== JSON.stringify(reply.request.tag)" class="my-1">
                                        <h4>タグ:</h4>
                                        <div class="ml-2 wrap-box">
                                            <span class="mr-2">変更前:</span>
                                            <div v-for="(tag, index) in reply.pastPost.tag" :key="index">
                                                <span>#{{ tag }}</span>
                                                <span v-if="index !== reply.pastPost.tag.length -1" class="mr-1">,</span>
                                            </div>
                                        </div>
                                        <div class="ml-2 wrap-box">
                                            <span class="mr-2">変更後:</span>
                                            <div v-for="(tag, index) in reply.request.tag" :key="index">
                                                <span>#{{ tag }}</span>
                                                <span v-if="index !== reply.request.tag.length -1" class="mr-1">,</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h4>コメント:</h4>
                                <div class="ml-2">
                                    <span class="textbox" v-html="linkedText"></span>
                                </div>
                            </div>
                        </div>
                        <v-row justify="center" class="my-2" v-if="$store.state.isLoggedIn">
                            <v-btn
                            v-if="identityAndIsRequest"
                            color="teal"
                            class="mx-1"
                            dark
                            @click="delReplyDialogAccept()"
                            >
                                <v-icon>mdi-check-bold</v-icon>
                                承認
                            </v-btn>
                            <v-btn
                            v-if="identityAndIsRequest"
                            color="red"
                            class="mx-1"
                            dark
                            @click="delReplyDialogReject()"
                            >
                                <v-icon>mdi-close-thick</v-icon>
                                却下
                            </v-btn>
                            <v-btn
                            v-if="identityAndNotJudged"
                            color="indigo"
                            class="mx-1"
                            dark
                            @click="delReplyDialog()"
                            >
                                <v-icon>mdi-delete</v-icon>
                                削除
                            </v-btn>
                            <div class="mx-1">
                                <del-btn :postID="post.id" :replyID="reply.id" />
                            </div>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </div>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import * as Common from '~/assets/js/common.js'
import CustomOverlay from '~/components/overlay.vue'
import CustomDialog from '~/components/dialog.vue'
import UserCardRow from '~/components/userCardRow.vue'
import DelBtn from '~/components/delBtn.vue'
import Autolinker from 'autolinker'

export default {
    name: "Reply",
    components: {
        CustomOverlay,
        CustomDialog,
        UserCardRow,
        DelBtn
    },
    data () {
        return {
            currentCredentials: null,
            overlay: false,
            showDialog: false,
            dialogMessage: "",
            showDialogResult: false,
            dialogMessageResult: "",
            showDialogAccept: false,
            dialogMessageAccept: "",
            showDialogReject: false,
            dialogMessageReject: "",
            showReply: false,
            replyTypes: [],
            openReply: [],
            image: {
                name: "reply",
                imgURL: null,
                imgFile: null,
                imgType: null,
                imgPreview: null,
                showPreviewImg: false,
            },
            pastImage: {
                name: "reply",
                imgURL: null,
                imgFile: null,
                imgType: null,
                imgPreview: null,
                showPreviewImg: false,
            }
        }
    },
    props: {
        post: {
            type: Object,
            default () {
                return {
                    id: "",
                    title: "",
                    URL: "",
                    subURLs: "",
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
                }
            }
        },
        index: {
            type: Number,
            default: 1
        },
        reply: {
            type: Object,
            defualt () {
                return {
                    id: "",
                    type: "",
                    content: "",
                    userID: "",
                    user: null,
                    createdAt: "",
                    imgUrl: "",
                    _version: 0,
                    request: {
                        title: "",
                        URL: "",
                        subURLs: [],
                        tag: [],
                        date: "",
                    },
                    postID: "",
                    pastPost: {
                        title: "",
                        URL: "",
                        subURLs: [],
                        tag: [],
                        date: "",
                        imgUrl: "",
                        identityID: ""
                    }
                }
            }
        },
    },
    async created () {
        this.currentCredentials = await this.$Amplify.Auth.currentCredentials()
        this.replyTypes = this.$store.state.replyType
        this.openReply = (this.index < 10) ? [0] : []
        this.reply.request = JSON.parse(this.reply.request)
        this.reply.pastPost = JSON.parse(this.reply.pastPost)
        this.reply.content = this.reply.content.replace(/\\n/g, '\n')
        this.image.imgURL = ([null, undefined, ""].indexOf(this.reply.imgUrl) === -1)? this.reply.imgUrl : null
        this.pastImage.imgURL = ([null, undefined, ""].indexOf(this.reply.pastPost.imgUrl) === -1)? this.reply.pastPost.imgUrl : null
        this.reply.pastPost.identityID = (this.reply.pastPost.identityID && this.reply.pastPost.identityID !== '')? this.reply.pastPost.identityID : null
        if (this.reply.user == null) await this.getUser()
        await Common.setImgFileUser(this.image, this.reply.user.identityID)
        await Common.setImgFileUser(this.pastImage, this.reply.pastPost.identityID)
        this.showReply = true
    },
    computed: {
        identityAndNotJudged () {
            return (this.reply.user.identityID === this.currentCredentials.identityId && ['accept', 'reject'].indexOf(this.reply.type) === -1)? true : false
        },
        identityAndIsRequest () {
            return (this.post.user.identityID === this.currentCredentials.identityId && this.reply.type === 'request')? true : false
        },
        linkedText () {
            return Autolinker.link(this.reply.content, {
                sanitizeHtml: true,
                stripPrefix: false,
                stripTrailingSlash: false,
            })
        }
    },
    methods: {
        reload () {
            this.$emit("reload")
        },
        async getUser() {
            const getUser = `
                query GetUser {
                    getUser(id: "${this.reply.userID}") {
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
                        this.reply.user = res.data.getUser
                    })
            } catch (e) {
                Common.failed(e, "ユーザーの読み込みに失敗しました", this.overlay)
                this.overlay = false
            }
        },
        delReplyDialog () {
            this.dialogMessage = "リプライを削除します。よろしいでしょうか？"
            this.showDialog = true
        },
        delReplyDialogAccept () {
            this.dialogMessageAccept = "変更リクエストを承認します。よろしいでしょうか？"
            this.showDialogAccept = true
        },
        delReplyDialogReject () {
            this.dialogMessageReject = "変更リクエストを却下します。よろしいでしょうか？"
            this.showDialogReject = true
        },
        async delReply () {
            this.showDialog = false
            this.overlay = true
            try {
                if (this.reply.user.identityID !== this.currentCredentials.identityId) {
                    throw new Error("権限のないアカウント")
                }
                if (['accept', 'reject'].indexOf(this.reply.type) !== -1) {
                    throw new Error("承認 or 却下済みのリクエスト")
                }
                if ([null, undefined, ""].indexOf(this.image.imgURL) === -1) {
                    await Common.S3Remove(this.image, this.overlay)
                }
                const deleteReply = `
                    mutation DeleteReply {
                        deleteReply(input: {
                            id: "${this.reply.id}"
                            _version: ${this.reply._version}
                        }) {
                        id
                        _version
                        }
                    }
                `
                await API.graphql(graphqlOperation(deleteReply))
                    .then(res => {
                        this.overlay = false
                        this.dialogMessageResult = "リプライを削除しました"
                        this.showDialogResult = true
                    })
            } catch (e) {
                Common.failed(e, "リプライの削除に失敗しました", this.overlay)
                this.overlay = false
            }
        },
        async accept () {
            this.showDialogAccept = false
            this.overlay = true
            try {
                if (this.post.user.identityID !== this.currentCredentials.identityId) {
                    throw new Error("権限のないアカウント")
                }
                const title = ([null, undefined, ""].indexOf(this.reply.request.title) === -1)? this.reply.request.title : this.reply.pastPost.title
                const URL = ([null, undefined, ""].indexOf(this.reply.request.URL) === -1)? this.reply.request.URL : this.reply.pastPost.URL
                const subURLs = ([null, undefined, "", []].indexOf(this.reply.request.subURLs) === -1)? this.reply.request.subURLs : this.reply.pastPost.subURLs
                const tag = ([null, undefined, "", []].indexOf(this.reply.request.tag) === -1)? this.reply.request.tag : this.reply.pastPost.tag
                const date = ([null, undefined, ""].indexOf(this.reply.request.date) === -1)? this.reply.request.date : this.reply.pastPost.date
                const imgUrl = ([null, undefined, "", "null"].indexOf(this.reply.imgUrl) === -1)? this.reply.imgUrl : this.reply.pastPost.imgUrl
                const imgIdentityID = ([null, undefined, "", "null"].indexOf(this.reply.imgUrl) === -1)? this.reply.user.identityID : this.reply.pastPost.identityID
                const updatePost = `
                    mutation UpdatePost {
                        updatePost(input: {
                            id: "${this.post.id}",
                            div: "1",
                            title: "${title}",
                            URL: "${URL}",
                            subURLs: "${JSON.stringify(subURLs).replace(/"/g, '\\"')}",
                            tag: "${JSON.stringify(tag).replace(/"/g, '\\"')}",
                            date: "${date}",
                            imgUrl: "${imgUrl}",
                            imgIdentityID: "${imgIdentityID}",
                            _version: ${this.post._version}
                        }) {
                            id
                            div
                            title
                            URL
                            subURLs
                            tag
                            date
                            imgUrl
                            imgIdentityID
                            _version
                        }
                    }
                `
                const updateReply = `
                    mutation UpdateReply {
                        updateReply(input: {
                            id: "${this.reply.id}",
                            type: "accept",
                            _version: ${this.reply._version}
                        }) {
                            id
                            type
                            _version
                        }
                    }
                `
                await API.graphql(graphqlOperation(updatePost))
                    .then(async (res) => {
                        console.log("Updated Post")
                        await API.graphql(graphqlOperation(updateReply))
                            .then(resChild => {
                                console.log("Updated Reply")
                                this.overlay = false
                                this.dialogMessageResult = "変更リクエストを承認しました"
                                this.showDialogResult = true
                            })
                    })
            } catch (e) {
                Common.failed(e, "変更リクエストの承認に失敗しました", this.overlay)
                this.overlay = false
            }
        },
        async reject () {
            this.showDialogReject = false
            this.overlay = true
            try {
                if (this.post.user.identityID !== this.currentCredentials.identityId) {
                    throw new Error("権限のないアカウント")
                }
                const updateReply = `
                    mutation UpdateReply {
                        updateReply(input: {
                            id: "${this.reply.id}",
                            type: "reject",
                            _version: ${this.reply._version}
                        }) {
                            id
                            type
                            _version
                        }
                    }
                `
                await API.graphql(graphqlOperation(updateReply))
                    .then(res => {
                        console.log("Updated Reply")
                        this.overlay = false
                        this.dialogMessageResult = "変更リクエストを却下しました"
                        this.showDialogResult = true
                    })
            } catch (e) {
                Common.failed(e, "変更リクエストの却下に失敗しました", this.overlay)
                this.overlay = false
            }
        }
    }
}
</script>

<style>
.textbox {
    white-space: pre-wrap;
    word-wrap: break-word;
}
.wrap-box {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
}
</style>