<template>
    <v-row class="user-info-first-small">
        <div>
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
                <span class="user-viewName">{{ user.viewName }}</span>
                <span class="user-name">@{{ user.name }}</span><br/>
            </div>
        </div>
    </v-row>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
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
                    identityId: "",
                    viewName: '',
                    name: '',
                    iconUrl: '',
                }
            }
        }
    },
    mounted () {
        this.setImgUrlIcon()
    },
    methods: {
        setImgUrlIcon () {
            this.icon.imgURL = this.user.iconUrl
            Common.setImgFileUser(this.icon, this.user.identityId)
        },
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
    text-decoration: none;
    color: white;
}
.user-viewName {
    font-size: 0.9em;
    width: 14em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
}
.user-name {
    font-size: 0.9em;
    width: 14em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
}
.user-name:hover,
.user-viewName:hover {
    color: gray;
}
</style>