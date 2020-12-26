<template>
    <v-container fluid style="max-width: 600px;">
        <custom-overlay :overlay="overlay" />
        <custom-dialog
        :dialog="showDialog"
        :message="dialogMessage"
        :cancel="false"
        @agree="$router.push('/')"
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
                <v-select
                v-model="type"
                :items="postTypes"
                item-text="name"
                item-value="value"
                label="情報タイプ"
                :rules="[required]"
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
                label="URL(必須)"
                :rules="[required, validateURL]"
                />
            </v-row>
            <v-row justify="center">
                <v-text-field
                v-model="URLInput"
                label="URL(オプション)"
                :rules="[validateURL]"
                />
                <v-btn
                color="teal"
                dark
                class="mx-2"
                @click="addURL"
                >
                URL追加
                </v-btn>
            </v-row>
            <v-row justify="center">
                <div v-for="(URL, index) in subURLs" :key="index">
                    <v-row class="mx-2" align="center">
                        <v-btn
                        color="indigo"
                        dark
                        icon
                        @click="delURLs(URL)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <h4>{{ URL }}{{ (index !== subURLs.length -1)? ',' : '' }}</h4>
                    </v-row>
                </div>
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
            </v-row>
            <v-row justify="center">
                <div v-for="(tag, index) in tags" :key="index">
                    <v-row class="mx-2" align="center">
                        <v-btn
                        color="indigo"
                        dark
                        icon
                        @click="delTags(tag)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <h4>#{{ tag }}{{ (index !== tags.length -1)? ',' : '' }}</h4>
                    </v-row>
                </div>
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
            type: "",
            postTypes: [],
            URLInput: "",
            URL: "",
            subURLs: [],
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
    mounted () {
        this.postTypes = this.$store.state.postType
    },
    computed: {
        showTags () {
            const tags = this.tags.map(tag => {
                return (tag[0] === '#')? tag : '#' + tag
            })
            return tags.toString()
        }
    },
    methods: {
        addURL () {
            if (!regURL.test(this.URLInput)) return false
            this.subURLs.push(this.URLInput)
            this.subURLs = [...new Set(this.subURLs)]
            this.URLInput = ""
        },
        delURLs (delURL) {
            this.subURLs = this.subURLs.filter(URL => URL !== delURL)
        },
        addTags () {
            this.tags.push(this.tag)
            this.tags = [...new Set(this.tags)]
            this.tag = ""
        },
        delTags (deltag) {
            this.tags = this.tags.filter(tag => tag !== deltag)
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
                this.overlay = false
            }
            this.overlay = false
        },
        async createPost () {
            this.overlay = true
            const createPost = `
                mutation CreatePost {
                    createPost(input: {
                        id: "${this.id}",
                        div: "1",
                        title: "${this.title}",
                        type: "${this.type}",
                        URL: "${this.URL}",
                        subURLs: "${JSON.stringify(this.subURLs).replace(/"/g, '\\"')}",
                        imgUrl: "${this.image.imgURL}",
                        tag: "${JSON.stringify(this.tags).replace(/"/g, '\\"')}",
                        date: "${this.date}",
                        userID: "${this.$store.state.userID}"
                    }) {
                        id
                        div
                        title
                        type
                        imgUrl
                        URL
                        subURLs
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
                this.overlay = false
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