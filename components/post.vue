<template>
    <div
    v-if="showPost"
    class="postRow"
    :style="parentStyle"
    >
        <div :style="childStyle">
            <v-row class="px-4" align="center">
                <span v-if="isNew"  style="color: red;font-size: 0.9em;font-weight: bold;" class="mx-1">NEW!</span>
                <span :class="(isNew)? 'topIsNew mx-1' : 'topIsNotNew mx-1'">投稿者: </span>
                <user-card-row :user="post.user" :isNew="isNew"/>
                <span :class="(isNew)? 'topIsNew mx-1' : 'topIsNotNew mx-1'">投稿: {{ new Date(post.createdAt).toLocaleString() }}</span>
                <span :class="(isNew)? 'topIsNew mx-1' : 'topIsNotNew mx-1'">更新: {{ new Date(post.updatedAt).toLocaleString() }}</span>
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
                        :class="(isNew)? 'postTitleIsNew': 'postTitleIsNotNew'"
                        :to="'/post/' + post.id"
                        >
                            <h3 class="my-0">{{ post.title }}</h3>
                        </nuxt-link>
                    </v-row>
                    <v-row>
                        <button
                        :class="(isNew)? 'mx-2 tag-link-isNew' : 'mx-2 tag-link-isNotNew'"
                        @click="redirectWithType"
                        >
                            <span>{{ typeName }}</span>
                        </button>
                        <div v-for="(tag, index) in JSON.parse(post.tag)" :key="index">
                            <button
                            :class="(isNew)? 'mx-2 tag-link-isNew' : 'mx-2 tag-link-isNotNew'"
                            @click="redirectWithTag(tag)"
                            >
                                <span>#{{ tag }}</span>
                            </button>
                        </div>
                    </v-row>
                </div>
            </v-row>
        </div>
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
            showPost: false,
            isNew: false,
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
                    },
                    backgroundImg: null,
                    parentStyle: "",
                    childStyle: ""
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
        this.isNew = this.judgeIsNew()
        this.selectBackgroundImg()
        this.setupParentStyle()
        this.showPost = true
    },
    methods: {
        setupParentStyle () {
            this.parentStyle = (this.isNew)? 'background:linear-gradient(-45deg, rgba(2, 119, 189, .6),  rgba(255, 238, 88, .6));' : ''
            if (this.isNew && [null, undefined, ""].indexOf(this.backgroundImg) === -1) {
                this.parentStyle = this.parentStyle + 'background-image: url(' + this.backgroundImg + ');background-position: center center;background-size: cover;background-repeat: no-repeat;'
                this.childStyle = 'background-color: rgba(0, 0, 0, 0.6);'
            }
        },
        selectBackgroundImg () {
            const CHKeywords = ['中国', 'China', '中華']
            let isCH = false
            CHKeywords.map(keyword => {
                isCH = (isCH || this.post.tag.includes(keyword))? true : false
            })
            const USKeywords = ['不正選挙', '大統領', 'アメリカ', 'トランプ', 'US']
            let isUS = false
            USKeywords.map(keyword => {
                isUS = (isUS || this.post.tag.includes(keyword))? true : false
            })
            const JAKeywords = ['日本', '内閣', 'Japan']
            let isJA = false
            JAKeywords.map(keyword => {
                isJA = (isJA || this.post.tag.includes(keyword))? true : false
            })
            if (isJA) this.backgroundImg = '/ja-flag.jpg'
            else if (isUS) this.backgroundImg = '/us-flag.jpg'
            else if (isCH) this.backgroundImg = '/ch-flag.jpg'
        },
        judgeIsNew () {
            const createdAtDate = new Date(this.post.createdAt).getTime()
            const nowDate = new Date().getTime()
            return (nowDate - createdAtDate < 86400 * 1000)? true : false
        },
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
        },
        redirectWithType (e) {
            const tag = (this.$route.query.tag !== undefined)? this.$route.query.tag : ""
            const title = (this.$route.query.title !== undefined)? this.$route.query.title : ""
            const URL = (this.$route.query.URL !== undefined)? this.$route.query.URL : ""
            const userID = (this.$route.query.userID !== undefined)? this.$route.query.userID : ""
            const date = (this.$route.query.date !== undefined)? this.$route.query.date : ""
            const sort = (this.$route.query.sort !== undefined)? this.$route.query.sort : ""
            const query = {
                type: this.post.type,
                title: title,
                tag: tag,
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
.postTitleIsNew {
    color: white !important;
    text-decoration: none !important;
}
.postTitleIsNew:hover {
    color: black !important;
}
.postTitleIsNotNew {
    color: white !important;
    text-decoration: none !important;
}
.postTitleIsNotNew:hover {
    color: gray !important;
}
.tag-link-isNew {
    color: white;
}
.tag-link-isNew:hover {
    color: black;
}
.tag-link-isNotNew {
    color: gray;
}
.tag-link-isNotNew:hover {
    color: white;
}
.topIsNotNew {
    color: gray;
    font-size: 0.9em;
}
.topIsNew {
    color: white;
    font-size: 0.9em;
}
</style>