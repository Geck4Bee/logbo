<template>
    <div v-if="showReply">
        <custom-overlay :overlay="overlay" />
        <custom-dialog
        :dialog="showDialog"
        :message="dialogMessage"
        :cancel="false"
        @agree="showDialog = !showDialog"
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
                        <v-row justify="start">
                            <div class="mx-2">
                                <v-img
                                :src="image.imgPreview"
                                alt="画像のプレビュー"
                                @error="Common.resetImgURL(image)"
                                class="user-image-minimum"
                                max-width="200"
                                />
                            </div>
                            <div class="mx-4">
                                <div v-if="reply.type === 'request'">
                                    test
                                </div>
                                <v-row justify="start">
                                    <h4>コメント:</h4>
                                </v-row>
                                <v-row justify="start" class="ml-2">
                                    <span class="textbox">{{ reply.content }}</span>
                                </v-row>
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

export default {
    name: "Reply",
    components: {
        CustomOverlay,
        CustomDialog,
        UserCardRow,
    },
    data () {
        return {
            overlay: false,
            showDialog: false,
            dialogMessage: "",
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
            }
        }
    },
    props: {
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
                    request: {
                        title: "",
                        URL: "",
                        tag: [],
                        date: "",
                    },
                    pastPost: {
                        title: "",
                        URL: "",
                        tag: [],
                        date: "",
                    }
                }
            }
        },
    },
    async created () {
        this.replyTypes = this.$store.state.replyType
        this.openReply = (this.index == 0) ? [0] : []
        this.reply.request = JSON.parse(this.reply.request)
        this.reply.pastPost = JSON.parse(this.reply.pastPost)
        this.reply.content = this.reply.content.replace(/\\n/g, '\n')
        this.image.imgURL = this.reply.imgUrl
        if (this.reply.user == null) await this.getUser()
        await Common.setImgFileUser(this.image, this.reply.user.identityID)
        this.showReply = true
    },
    methods: {
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
            }
        },
    }
}
</script>

<style>
.textbox {
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>