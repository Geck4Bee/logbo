<template>
    <div class="noticeRow">
        <v-row class="px-4" align="center">
            <span style="color: gray; font-size: 0.9em;" class="mx-1">投稿者: </span>
            <user-card-row :user="notice.fromUser"/>
            <span style="color: gray; font-size: 0.9em;" class="mx-1">日時: {{ new Date(notice.createdAt).toLocaleString() }}</span>
        </v-row>
        <v-row justify="start" align="center" class="px-4 pb-1">
            <div class="mx-4" style="max-width: 90%;">
                <v-row>
                    <v-btn
                    style="max-width: 100%;"
                    text
                    nuxt
                    :to="'/post/' + notice.postID"
                    >
                        <v-row class="my-0" :style="'color: ' + textColor + ';'">
                            <h3 class="noticeTitle">{{ notice.content.substr(0, contentSplitIndex) }}</h3>
                            <h3>{{ notice.content.substr(contentSplitIndex) }}</h3>
                        </v-row>
                    </v-btn>
                </v-row>
            </div>
        </v-row>
    </div>
</template>

<script>
import UserCardRow from '~/components/userCardRow.vue'

export default {
    name: "Notice",
    components: {
        UserCardRow
    },
    props: {
        notice: {
            type: Object,
            default () {
                return {
                    id: "",
                    content: "",
                    fromUserID: "",
                    fromUser: {
                        id: "",
                        identityID: "",
                        viewName: '',
                        name: '',
                        iconUrl: '',
                    },
                    postID: "",
                    createdAt: "",
                    _deleted: "",
                    _version: 0
                }
            }
        }
    },
    computed: {
        textColor () {
            return ([null, undefined, "", false].indexOf(this.notice._deleted) !== -1)? 'white' : 'gray'
        },
        contentSplitIndex () {
            return this.notice.content.lastIndexOf("に")
        }
    }
}
</script>

<style>
.noticeRow {
    box-shadow: 3px 3px 10px #000, -3px -3px 10px #000;
}
.v-btn__content {
    width: 100%;
    white-space: normal;
}
.noticeTitle {
    max-width: 30em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
}
</style>