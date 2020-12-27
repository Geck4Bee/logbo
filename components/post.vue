<template>
    <div class="postRow">
        <v-row class="px-4" align="center">
            <span style="color: gray; font-size: 0.9em;" class="mx-1">投稿者: </span>
            <user-card-row :user="post.user"/>
            <span style="color: gray; font-size: 0.9em;" class="mx-1">投稿: {{ new Date(post.createdAt).toLocaleString() }}</span>
            <span style="color: gray; font-size: 0.9em;" class="mx-1">更新: {{ new Date(post.updatedAt).toLocaleString() }}</span>
        </v-row>
        <v-row justify="start" align="center" class="px-4 pb-1">
            <div class="mx-2 my-2">
                <v-btn
                icon
                :href="post.URL"
                :disabled="post.URL === ''"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <v-avatar tile>
                        <v-img
                        :src="image.imgPreview"
                        alt="画像のプレビュー"
                        @error="Common.resetImgURL(icon)"
                        class="user-image-minimum"
                        max-width="80"
                        />
                    </v-avatar>
                </v-btn>
            </div>
            <div class="mx-4" style="max-width: 90%;">
                <v-row class="px-2">
                    <nuxt-link
                    class="postTitle"
                    :to="'/post/' + post.id"
                    >
                        <h3 class="my-0">{{ post.title }}</h3>
                    </nuxt-link>
                </v-row>
                <v-row>
                    <span class="mx-2" style="color: gray;">{{ typeName }}</span>
                    <div v-for="(tag, index) in JSON.parse(post.tag)" :key="index">
                        <button
                        class="mx-2 tag-link"
                        @click="redirectWithTag(tag)"
                        >
                            <span>#{{ tag }}</span>
                        </button>
                    </div>
                </v-row>
            </div>
        </v-row>
    </div>
</template>

<script>
import UserCardRow from '~/components/userCardRow.vue'
import * as Common from '~/assets/js/common.js'

export default {
    name: "Post",
    Components: {
        UserCardRow
    },
    data () {
        return {
            postTypes: [],
            image: {
                name: "image",
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
                    }
                }
            }
        }
    },
    computed: {
        typeName () {
            const typeObj = this.postTypes.find(obj => obj.value === this.post.type)
            return ([null, undefined, "", {}].indexOf(typeObj) === -1)? typeObj.name : "null"
        }
    },
    created () {
        this.image.imgURL = this.post.imgUrl
        const imageIdentityID = this.post.imgIdentityID || this.post.user.identityID
        Common.setImgFileUser(this.image, imageIdentityID)
    },
    mounted () {
        this.postTypes = this.$store.state.postType
    },
    methods: {
        redirectWithTag (e) {
            const type = (this.$route.query.type !== undefined)? this.$route.query.type : ""
            const title = (this.$route.query.title !== undefined)? this.$route.query.title : ""
            const URL = (this.$route.query.URL !== undefined)? this.$route.query.URL : ""
            const userID = (this.$route.query.userID !== undefined)? this.$route.query.userID : ""
            const date = (this.$route.query.date !== undefined)? this.$route.query.date : ""
            const sort = (this.$route.query.sort !== undefined)? this.$route.query.sort : ""
            const query = {
                type: type,
                title: title,
                tag: e,
                URL: URL,
                userID: userID,
                date: date,
                sort: sort
            }
            this.$router.push({ path: "/", query: query})
        }
    }
}
</script>

<style>
.postRow {
    box-shadow: 3px 3px 10px #000, -3px -3px 10px #000;
}
.v-btn__content {
    width: 100%;
    white-space: normal;
}
.postTitle {
    color: white !important;
    text-decoration: none !important;
}
.postTitle:hover {
    color: gray !important;
}
.tag-link {
    color: gray;
}
.tag-link:hover {
    color: white;
}
</style>