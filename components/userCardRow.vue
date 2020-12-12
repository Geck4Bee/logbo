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
        <div class="user-link-small">
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
        }
    },
    mounted () {
        this.icon.imgURL = this.user.iconUrl
        Common.setImgFileUser(this.icon, this.user.identityID)
    },
    computed: {
        query () {
            const title = (this.$route.query.titile !== undefined)? 'title=' + this.$route.query.titile : ""
            const tag = (this.$route.query.tag !== undefined)? 'tag=' + this.$route.query.tag : ""
            const URL = (this.$route.query.URL !== undefined)? 'URL=' + this.$route.query.URL : ""
            const userID ='userID=' + this.user.id
            const query = [title, tag, URL, userID].filter(val => val !== "")
            return '?' + query.join('&')
        }
    }
}
</script>
<style>
.user-info-first-small {
    display: flex;
    align-items: center;
    padding: 3px 12px;
}
.user-link-small {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: white;
}

.user-link-small a {
    color: gray !important;
    font-size: 0.9em;
    width: 14em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
}

.user-link-small a:hover {
    color: white !important;
}
</style>