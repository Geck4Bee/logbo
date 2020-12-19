<template>
    <div class="noticeRow">
        <v-row class="px-4" align="center">
            <span style="color: gray; font-size: 0.9em;" class="mx-1">投稿者: </span>
            <user-card-row :user="notice.fromUser"/>
            <span style="color: gray; font-size: 0.9em;" class="mx-1">日時: {{ new Date(notice.createdAt).toLocaleString() }}</span>
        </v-row>
        <v-row justify="start" align="center" class="px-4 pb-1">
            <div class="mx-4">
                <v-row>
                    <v-btn
                    text
                    nuxt
                    :to="'/post/' + notice.postID"
                    >
                        <h3 class="my-0" :style="'color: ' + textColor + ';'">{{ notice.content }}</h3>
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
        }
    }
}
</script>

<style>
.noticeRow {
    box-shadow: 3px 3px 10px #000, -3px -3px 10px #000;
}
</style>