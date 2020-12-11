<template>
    <v-container fluid style="max-width: 600px;">
        <custom-overlay :overlay="overlay" />
        <custom-dialog
        :dialog="showDialog"
        :message="dialogMessage"
        :cancel="false"
        @agree="showDialog = !showDialog"
        />
        <v-form ref="formPost" @submit.prevent>
            <div class="image-wrapper">
                <v-row v-if="image.showPreviewImg" justify="center">
                    <v-img
                    :src="image.imgPreview"
                    alt="画像のプレビュー"
                    @error="Common.resetImgURL(image)"
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
            <v-row justify="center">
                <v-text-field
                v-model="title"
                label="タイトル"
                :rules="[required, limitLength]"
                />
            </v-row>
            <v-row justify="center">
                <v-text-field
                v-model="URL"
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
                <h4>{{ tags.toString() }}</h4>
            </v-row>
            <v-row justify="start">
                <v-text-field
                v-model="date"
                label="記事の日付"
                style="max-width: 250px;"
                :rules="[validateDate, required]"
                maxlength="10"
                >
                <template v-slot:append-outer>
                    <date-picker v-model="date"/>
                </template>
                </v-text-field>
            </v-row>
            <v-row justify="center">
                <v-btn
                color="primary"
                dark
                @click="validation"
                >
                投稿する
                </v-btn>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import CustomOverlay from '~/components/overlay.vue'
import CustomDialog from '~/components/dialog.vue'
import DatePicker from "~/components/datePicker.vue"
import * as Common from '~/assets/js/common.js'
import { nanoid } from 'nanoid'

const regURL = new RegExp(/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/)
const regDate = new RegExp(/(\d{4})-(\d{2})-(\d{2})/)

export default {
    components: {
        CustomOverlay,
        CustomDialog,
        DatePicker
    },
    data () {
        return {
            overlay: false,
            showDialog: false,
            dialogMessage: "投稿が完了しました",
            id: "",
            title: "",
            URL: "",
            tag: "",
            tags: [],
            date: "",
            image: {
                name: "image",
                imgURL: null,
                imgFile: null,
                imgType: null,
                imgPreview: null,
                showPreviewImg: false,
            },
            required: value => !!value || "必須事項です",
            maxFileSize: value => !value || value.size < 3*1024*1024 || 'ファイルサイズは3MB以下にしてください',
            limitLength: value => value.length <= 150 || "150字以内で入力してください",
            validateURL: value => !value || value === "" || regURL.test(value) || "URLを入力してください",
            validateDate: value => !value || value === "" || regDate.test(value) || "日付を入力してください",
        }
    },
    created () {
        this.id = nanoid()
    },
    methods: {
        addTags () {
            this.tags.push(this.tag)
            this.tags = [...new Set(this.tags)]
        },
        delTags () {
            this.tags = this.tags.filter(tag => tag !== this.tag)
        },
        validation () {
            try {
                if(!this.$refs.formPost.validate()) {
                throw "ExceptionOccured"
                }
                 this.startCreatePost()
            } catch (e) {
                console.log(e)
            }
        },
        async startCreatePost () {
            this.overlay = true
            if (this.image.imgFile != null) {
                await Common.S3Upload(this.image, this.id, this.overlay)
            }
            this.createPost()
        },
        storeImg (file) {
            this.overlay = true
            this.image.imgPreview = null
            this.image.imgFile = null
            this.image.showPreviewImg = false
            try{
                if (file == undefined || file == null || file.name.lastIndexOf('.') <= 0) {
                    throw "ExceptionOccured"
                }
                const image = file
                this.image.imgFile = image
                this.image.imgType = image.type
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onload = () => {
                    this.image.imgPreview = reader.result
                    this.image.showPreviewImg = true
                }
            } catch (e) {
                console.log("Store Image Failed: " + e)
                Common.failed(e, "画像の表示に失敗しました", this.overlay)
            }
            this.overlay = false
        },
        async createPost () {
            this.overlay = true
            const createPost = `
                mutation CreatePost {
                    createPost(input: {
                        id: "${this.id}",
                        title: "${this.title}",
                        URL: "${this.URL}",
                        imgUrl: "${this.image.imgURL}",
                        tag: "${JSON.stringify(this.tags).replace(/"/g, '\\"')}",
                        date: "${this.date}",
                        userID: "${this.$store.state.userID}"
                    }) {
                        id
                        title
                        imgUrl
                        URL
                        tag
                        date
                        userID
                    }
                }
            `
            try {
                await API.graphql(graphqlOperation(createPost))
                    .then((res) => {
                        console.log("succedeed")
                        this.showDialog = true
                    })
            } catch (e) {
                Common.failed(e, "投稿に失敗しました", this.overlay)
            }
            this.overlay = false
        }
    }
}
</script>

<style>
.image-wrapper {
  width: 100%;
  min-height: 200px;
  background-size: cover;
  display: flex;
  align-items: center;
}
</style>