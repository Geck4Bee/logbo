<template>
    <v-row class="user-info-first-small">
        <div v-if="icon.showPreviewImg" class="mx-1">
            <v-img
            :src="icon.imgPreview"
            alt="アイコンのプレビュー"
            @error="Common.resetImgURL(icon)"
            class="user-image-minimum"
            max-width="20"
            />
        </div>
        <div :class="textStyleName">
            <div class="user-name-box-small">
                <nuxt-link :to="'/' + query">{{ user.viewName }}</nuxt-link>
                <nuxt-link :to="'/' + query">@{{ user.name }}</nuxt-link><br/>
            </div>
        </div>
    </v-row>
</template>

<script>
import * as Common from '~/assets/js/common.js'

export default {
    name: 'UserCardRow',
    data () {
        return {
            icon: {
                name: "icon",
                imgURL: null,
                imgFile: null,
                imgType: null,
                imgPreview: null,
                showPreviewImg: false,
            }
        }
    },
    props: {
        user: {
            type: Object,
            defalut () {
                return {
                    id: "",
                    identityID: "",
                    viewName: '',
                    name: '',
                    iconUrl: '',
                }
            }
        },
        isNew: {
            type: Boolean,
            default: false
        },
        isBackground: {
            type: Boolean,
            default: false
        }
    },
    mounted () {
        this.icon.imgURL = this.user.iconUrl
        Common.setImgFileUser(this.icon, this.user.identityID)
    },
    computed: {
        query () {
            const type = (this.$route.query.type !== undefined)? 'type=' + this.$route.query.type : ""
            const title = (this.$route.query.title !== undefined)? 'title=' + this.$route.query.title : ""
            const tag = (this.$route.query.tag !== undefined)? 'tag=' + this.$route.query.tag : ""
            const URL = (this.$route.query.URL !== undefined)? 'URL=' + this.$route.query.URL : ""
            const userID ='userID=' + this.user.id
            const date = (this.$route.query.date !== undefined)? 'date=' + this.$route.query.date : ""
            const sort = (this.$route.query.sort !== undefined)? 'sort=' + this.$route.query.sort : ""
            const query = [type, title, tag, URL, userID, date, sort].filter(val => val !== "")
            return '?' + query.join('&')
        },
        textStyleName () {
            let cls = ""
            if (this.isNew) {
                cls += "user-link-small-isNew "
                if (this.isBackground) {
                    cls += "textDarkIsNew textStroke "
                } else {
                    cls += (this.$vuetify.theme.dark)? "textDarkIsNew" : "textLightIsNew"
                }
            } else {
                cls += 'user-link-small-isNotNew '
                cls += (this.$vuetify.theme.dark)? "textDarkIsNotNew" : "textLightIsNotNew"
            }
            return cls
        }
    }
}
</script>
<style>
.textStroke {
    text-shadow:1px 1px 5px #212121;
}
.textDarkIsNew a {
    color: white !important;
}
.textDarkIsNew a:hover {
    color: black !important;
}
.textDarkIsNotNew a {
    color: gray !important;
}
.textDarkIsNotNew a:hover {
    color: white !important;
}
.textLightIsNew a {
    color: #212121 !important;
}
.textLightIsNew a:hover {
    color:gray !important;
}
.textLightIsNotNew a {
    color: gray !important;
}
.textLightIsNotNew a:hover {
    color: black !important;
}

.user-info-first-small {
    display: flex;
    align-items: center;
    padding: 3px 12px;
}
.user-link-small {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.user-link-small-isNew a {
    font-size: 0.9em;
    width: 14em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
}

.user-link-small-isNotNew a {
    font-size: 0.9em;
    width: 14em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
}
</style>