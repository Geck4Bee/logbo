<template>
    <div
    v-if="showPost"
    :class="($vuetify.theme.dark)? 'postRowDark' : 'postRowLight'"
    :style="parentStyle"
    >
        <div :style="childStyle">
            <v-row class="px-4" align="center">
                <span v-if="isNew"  style="color: red;font-size: 0.9em;font-weight: bold;" class="mx-1">NEW!</span>
                <span :class="textStyleTop">投稿者: </span>
                <user-card-row :user="post.user" :isNew="isNew" :isBackground="([null, undefined, ''].indexOf(this.backgroundImg) === -1)? true : false"/>
                <span :class="textStyleTop">投稿: {{ new Date(post.createdAt).toLocaleString() }}</span>
                <span :class="textStyleTop">更新: {{ new Date(post.updatedAt).toLocaleString() }}</span>
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
                        :class="textStyleTitle"
                        :to="'/post/' + post.id"
                        >
                            <h3 class="my-0">{{ post.title }}</h3>
                        </nuxt-link>
                    </v-row>
                    <v-row>
                        <button
                        :class="textStyleTag"
                        @click="redirectWithType"
                        >
                            <span>{{ typeName }}</span>
                        </button>
                        <div v-for="(tag, index) in JSON.parse(post.tag)" :key="index">
                            <button
                            :class="textStyleTag"
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
            backgroundImg: null,
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
                }
            }
        }
    },
    computed: {
        typeName () {
            const typeObj = this.postTypes.find(obj => obj.value === this.post.type)
            return ([null, undefined, "", {}].indexOf(typeObj) === -1)? typeObj.name : "null"
        },
        childStyle () {
            let style = ""
            if (this.isNew && ([null, undefined, ""].indexOf(this.backgroundImg) === -1)) {
                style = (this.$vuetify.theme.dark)? 'background-color: rgba(0, 0, 0, 0.6);' : 'background-color: rgba(0, 0, 0, 0.2);border-radius: 12px;'
            }
            return style
        },
        parentStyle () {
            let style = ""
            if (this.isNew) {
                const blue = (this.$vuetify.theme.dark)? 'rgba(2, 119, 189, .6)' : 'rgba(2, 119, 189, .6)'
                const yellow = (this.$vuetify.theme.dark)? 'rgba(255, 238, 88, .6)' : 'rgba(255, 252, 77, .6)'
                if ([null, undefined, ""].indexOf(this.backgroundImg) === -1) {
                    style += 'background-image: url(' + this.backgroundImg + ');background-position: center center;background-size: cover;background-repeat: no-repeat;'
                } else {
                    style += 'background:linear-gradient(-45deg, ' + blue + ', ' + yellow + ');'
                }
            }
            return style
        },
        textStyleTop () {
            let cls = "mx-1 "
            if (this.isNew) {
                if ([null, undefined, ""].indexOf(this.backgroundImg) === -1) {
                    cls += "topIsNewDark textStroke"
                } else {
                    cls += (this.$vuetify.theme.dark)? 'topIsNewDark' : 'topIsNewLight'
                }
            } else {
                cls += (this.$vuetify.theme.dark)? 'topIsNotNewDark' : 'topIsNotNewLight'
            }
            return cls
        },
        textStyleTitle () {
            let cls = ""
            if (this.isNew) {
                if ([null, undefined, ""].indexOf(this.backgroundImg) === -1) {
                    cls += 'postTitleIsNewDark textStroke'
                } else {
                    cls += (this.$vuetify.theme.dark)? 'postTitleIsNewDark' : 'postTitleIsNewLight'
                }
            } else {
                cls += (this.$vuetify.theme.dark)? 'postTitleIsNotNewDark' : 'postTitleIsNotNewLight'
            }
            return cls
        },
        textStyleTag () {
            let cls = "mx-2"
            if (this.isNew) {
                if ([null, undefined, ""].indexOf(this.backgroundImg) === -1) {
                    cls += " tag-link-isNewDark textStroke"
                } else {
                    cls += (this.$vuetify.theme.dark)? ' tag-link-isNewDark' : ' tag-link-isNewLight'
                }
            } else {
                cls += (this.$vuetify.theme.dark)? ' tag-link-isNotNewDark' : ' tag-link-isNotNewLight'
            }
            return cls
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
        this.showPost = true
    },
    methods: {
        selectBackgroundImg () {
            const CHKeywords = ['中国', 'China', '中華']
            let isCH = false
            CHKeywords.map(keyword => {
                isCH = (isCH || this.post.tag.includes(keyword))? true : false
            })
            const UKKeywords = ['イギリス', '英国', 'UK']
            let isUK = false
            UKKeywords.map(keyword => {
                isUK = (isUK || this.post.tag.includes(keyword))? true : false
            })
            const BOKeywords = ['ボリス', 'Boris', 'boris']
            let isBO = false
            BOKeywords.map(keyword => {
                isBO = (isBO || this.post.tag.includes(keyword))? true : false
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
            else if (isBO) this.backgroundImg = '/boris.jpg'
            else if (isUK) this.backgroundImg = '/uk-flag.jpg'
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
.textStroke {
    text-shadow:1px 1px 5px #212121;
}
.postRowDark {
    box-shadow: 3px 3px 10px #000, -3px -3px 10px #000;
}
.postRowLight {
    border-radius: 12px;
    border: 1px solid black;
}
.v-btn__content {
    width: 100%;
    white-space: normal;
}
.postTitleIsNewDark {
    color: white !important;
    text-decoration: none !important;
}
.postTitleIsNewDark:hover {
    color: black !important;
}
.postTitleIsNewLight {
    color: black !important;
    text-decoration: none !important;
}
.postTitleIsNewLight:hover {
    color: gray !important;
}
.postTitleIsNotNewDark {
    color: white !important;
    text-decoration: none !important;
}
.postTitleIsNotNewDark:hover {
    color: gray !important;
}
.postTitleIsNotNewLight {
    color: black !important;
    text-decoration: none !important;
}
.postTitleIsNotNewLight:hover {
    color: gray !important;
}
.tag-link-isNewDark {
    color: white;
}
.tag-link-isNewDark:hover {
    color: black;
}
.tag-link-isNewLight {
    color: #212121;
}
.tag-link-isNewLight:hover {
    color: gray;
}
.tag-link-isNotNewDark {
    color: gray;
}
.tag-link-isNotNewDark:hover {
    color: white;
}
.tag-link-isNotNewLight {
    color: gray;
}
.tag-link-isNotNewLight:hover {
    color: black;
}
.topIsNotNewDark {
    color: gray;
    font-size: 0.9em;
}
.topIsNotNewLight {
    color: #212121;
    font-weight: bold;
    font-size: 0.9em;
}
.topIsNewDark {
    color: white;
    font-size: 0.9em;
}
.topIsNewLight {
    color: #212121;
    font-weight: bold;
    font-size: 0.9em;
}
</style>