<template>
    <v-container fluid style="max-width:900px;">
        <custom-overlay :overlay="overlay" />
        <h2>和訳ラーケン</h2>
        <div v-for="(item, index) in krakens" :key="index">
            <kraken :item="item" class="my-3" />
        </div>
        <v-row justify="center" class="my-1">
            <v-btn
            color="teal"
            class="mx-2"
            :disabled="disableBackBtn"
            @click="backBtn"
            >
                <span>前へ</span>
            </v-btn>
            <v-btn
            color="blue"
            class="mx-2"
            :disabled="disableNextBtn"
            @click="nextBtn"
            >
                <span>次へ</span>
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import * as Common from '~/assets/js/common.js'
import CustomOverlay from '~/components/overlay.vue'
import CustomDialog from '~/components/dialog.vue'
import Kraken from '~/components/kraken.vue'

export default {
    components: {
        CustomOverlay,
        CustomDialog,
        Kraken
    },
    data () {
        return {
            overlay: false,
            showDialog: false,
            dialogMessage: "",
            krakens: [],
            krakensPerPage: 20,
            page: 1,
            totalPages: 1,
            nextToken: null,
            nextTokens: [null],
            queryKey: ""
        }
    },
    asyncData (context) {
        const queryKey = context.query['keyword']
        return {
            queryKey: queryKey
        }
    },
    watchQuery: ['keyword'],
    watch: {
        queryKey: function(newVal) {
            this.getKrakens()
        },
    },
    async created () {
        await this.getKrakens()
    },
    computed: {
        disableBackBtn () {
            return ((this.page -1 < 1) ? true : false)
        },
        disableNextBtn () {
            return ( ([null, "null", ""].indexOf(this.nextToken) !== -1) ? true : false )
        }
    },
    methods: {
        backBtn () {
            this.page--
            this.nextToken = this.nextTokens[this.page-1]
            this.getKrakens()
        },
        nextBtn () {
            if (this.page === this.totalPages) {
                this.nextTokens.push(this.nextToken)
                this.totalPages++
            }
            this.page++
            this.getKrakens()
        },
        async getKrakens () {
            this.overlay = true
            try {
                let nextToken = null
                if (this.nextToken) {
                    nextToken = `"${this.nextToken}"`
                }
                const filter = ([null, undefined, ""].indexOf(this.queryKey) === -1)? `filter: {or: [{en: {contain: "${this.queryKey}"}},{ja: {contain: "${this.queryKey}"}}]},` : ""
                const listKrakens = `
                    query ListKrakens {
                        listKrakens(
                            ${filter}
                            limit: ${this.krakensPerPage},
                            nextToken: ${nextToken}
                        ) {
                            items {
                                id
                                URL
                                en
                                ja
                                createdAt
                                updatedAt
                            }
                            nextToken
                            startedAt
                        }
                    }
                `
                await API.graphql(graphqlOperation(listKrakens))
                    .then(res => {
                        const items = res.data.listKrakens.items
                        this.nextToken = res.data.listKrakens.nextToken
                        if (items.length > 0) this.krakens = items
                        console.log('Krakens has loaded')
                        this.overlay = false
                    })
            } catch (e) {
                Common.failed(e, "一覧の取得に失敗しました", this.overlay)
                this.overlay = false
            }
        }
    }
}
</script>