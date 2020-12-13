<template>
    <v-card>
        <custom-overlay :overlay="overlay" />
        <v-card-title class="justify-start">返信する</v-card-title>
        <v-list-item>
            <v-form ref="formReply" style="width: 100%;" class="px-2 mb-3"  @submit.prevent>
                <v-row justify="center">
                    <v-select
                    v-model="reply.type"
                    :items="replyTypes"
                    item-text="name"
                    item-value="value"
                    label="種類"
                    :rules="[required]"
                    />
                </v-row>
                <div v-if="reply.type !== ''">
                    <div class="image-wrapper">
                        <v-row v-if="reply.image.showPreviewImg" justify="center">
                            <v-img
                            :src="reply.image.imgPreview"
                            alt="画像のプレビュー"
                            @error="Common.resetImgURL(reply.image)"
                            class="post-image"
                            :max-width="300"
                            />
                        </v-row>
                    </div>
                    <v-row>
                        <v-file-input
                        show-size
                        accept="image/*"
                        label="画像"
                        :rules="[maxFileSize]"
                        @change="storeImg"
                        />
                    </v-row>
                </div>
                <div v-if="reply.type === 'request'">
                    <v-row justify="center">
                        <v-text-field
                        v-model="reply.request.title"
                        label="タイトル"
                        :rules="[limitLength]"
                        />
                    </v-row>
                    <v-row justify="center">
                        <v-text-field
                        v-model="reply.request.URL"
                        label="URL"
                        :rules="[validateURL]"
                        />
                    </v-row>
                    <v-row justify="start">
                        <v-text-field
                        v-model="tag"
                        label="タグを追加する"
                        />
                        <v-btn
                        color="teal"
                        dark
                        class="mx-2"
                        @click="addTags"
                        >
                        タグ追加
                        </v-btn>
                        <v-btn
                        color="purple"
                        dark
                        class="mx-2"
                        @click="delTags"
                        >
                        タグ削除
                        </v-btn>
                    </v-row>
                    <v-row justify="center">
                        <h4>{{ reply.request.tag.toString() }}</h4>
                    </v-row>
                    <v-row justify="start">
                        <v-text-field
                        v-model="reply.request.date"
                        label="記事の日付"
                        style="max-width: 250px;"
                        :rules="[validateDate]"
                        maxlength="10"
                        >
                        <template v-slot:append-outer>
                            <date-picker v-model="reply.request.date"/>
                        </template>
                        </v-text-field>
                    </v-row>
                </div>
                <div v-if="reply.type !== ''">
                    <v-row>
                        <v-textarea
                        outlined
                        rows="4"
                        v-model="reply.content"
                        label="コメント"
                        counter
                        :rules="[required, limitLength]"
                        >
                        </v-textarea>
                    </v-row>
                </div>
                <v-row justify="center">
                    <v-btn
                    color="primary"
                    dark
                    class="mr-4"
                    @click="validation"
                    >
                    投稿
                    </v-btn>
                </v-row>
            </v-form>
        </v-list-item>
    </v-card>
</template>

<script>
import { nanoid } from 'nanoid'
import * as Common from '~/assets/js/common.js'
import CustomOverlay from '~/components/overlay.vue'
import DatePicker from "~/components/datePicker.vue"

const regURL = new RegExp(/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/)
const regDate = new RegExp(/(\d{4})-(\d{2})-(\d{2})/)

export default {
    name: "FormReply",
    components: {
        CustomOverlay,
        DatePicker
    },
    data () {
        return {
            overlay: false,
            tag: "",
            reply: {
                id: "",
                type: "",
                content: "",
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
                },
                image: {
                    name: "reply",
                    imgURL: null,
                    imgFile: null,
                    imgType: null,
                    imgPreview: null,
                    showPreviewImg: false,
                }
            },
            replyTypes: [],
            required: value => !!value || "必須事項です",
            limitLength: value => value.length <= 1000 || "1000字以内で入力してください",
            maxFileSize: value => !value || value.size < 3*1024*1024 || 'ファイルサイズは3MB以下にしてください',
            validateURL: value => !value || value === "" || regURL.test(value) || "URLを入力してください",
            validateDate: value => !value || value === "" || regDate.test(value) || "日付を入力してください",
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
                    replies: []
                }
            }
        }
    },
    created () {
        this.reply.id = nanoid()
        this.reply.request.title = this.post.title
        this.reply.request.URL = this.post.URL
        this.reply.request.tag = JSON.parse(this.post.tag)
        this.reply.request.date = this.post.date
        this.reply.pastPost = JSON.parse(JSON.stringify(this.reply.request))
    },
    mounted () {
        this.replyTypes = this.$store.state.replyType.filter(obj => ["accept", "reject"].indexOf(obj.value) === -1)
    },
    methods: {
        resetID () {
            this.reply.id = nanoid()
        },
        addTags () {
            this.reply.request.tag.push(this.tag)
            this.reply.request.tag = [...new Set(this.reply.request.tag)]
        },
        delTags () {
            this.reply.request.tag = this.reply.request.tag.filter(tag => tag !== this.tag)
        },
        validation () {
            try {
                if(!this.$refs.formReply.validate()) {
                    throw "ExceptionOccured"
                }
                this.$emit("put", this.reply)
            } catch (e) {
                console.log(e)
            }
        },
        storeImg (file) {
            this.overlay = true
            this.reply.image.imgPreview = null
            this.reply.image.imgFile = null
            this.reply.image.showPreviewImg = false
            try{
                if (file == undefined || file == null || file.name.lastIndexOf('.') <= 0) {
                    throw "ExceptionOccured"
                }
                const image = file
                this.reply.image.imgFile = image
                this.reply.image.imgType = image.type
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onload = () => {
                    this.reply.image.imgPreview = reader.result
                    this.reply.image.showPreviewImg = true
                }
            } catch (e) {
                console.log("Store Image Failed: " + e)
                Common.failed(e, "画像の表示に失敗しました", this.overlay)
            }
            this.overlay = false
        },
    }
}
</script>