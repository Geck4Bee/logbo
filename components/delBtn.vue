<template>
    <div>
        <custom-overlay :overlay="overlay" />
        <custom-dialog
        :dialog="showDialog"
        :message="dialogMessage"
        :cancel="false"
        @agree="showDialog = !showDialog"
        />
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="red"
                dark
                v-bind="attrs"
                v-on="on"
                >
                <v-icon>mdi-bandage</v-icon>
                DEL
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in delTypes" :key="index">
                    <v-list-item-title>
                        <v-btn
                        text
                        @click="sendDel(item)"
                        >
                            {{ item.name }}
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import * as Common from '~/assets/js/common.js'
import CustomOverlay from '~/components/overlay.vue'
import CustomDialog from '~/components/dialog.vue'
import { nanoid } from 'nanoid'

export default {
    name: "DelBtn",
    components: {
        CustomOverlay,
        CustomDialog
    },
    data () {
        return {
            id: "",
            overlay: false,
            showDialog: false,
            dialogMessage: "",
            delTypes: [],
            userID: ""
        }
    },
    props: {
        postID: {
            type: String,
            default: ""
        },
        replyID: {
            type: String,
            default: ""
        }
    },
    async mounted () {
        this.delTypes = this.$store.state.delType
        this.userID = this.$store.state.userID
        if ([null, undefined, ""].indexOf(this.userID) !== -1) {
            const currentUserInfo = await this.$Amplify.Auth.currentUserInfo()
            this.userID = await Common.getUserID(currentUserInfo)
        }
    },
    methods: {
        async sendDel (item) {
            this.id = nanoid()
            this.overlay = true
            try {
                const createDel = `
                    mutation CreateDel {
                        createDel(input: {
                            id: "${this.id}",
                            type: "${item.value}",
                            userID: "${this.userID}"
                            postID: "${this.postID}"
                            replyID: "${this.replyID}"
                        }) {
                            id
                            type
                            userID
                            postID
                            replyID
                        }
                    }
                `
                await API.graphql(graphqlOperation(createDel))
                    .then(res => {
                        console.log("Send DEL")
                        this.overlay = false
                        this.dialogMessage = "DELを送信しました: " + item.name
                        this.showDialog = true
                    })
            } catch (e) {
                Common.failed(e, "DELの送信に失敗しました", this.overlay)
                this.overlay = false
            }
        }
    }
}
</script>