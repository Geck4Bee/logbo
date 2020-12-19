<template>
    <v-card
    max-width="400"
    dark
    >
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header>検索フォーム</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-form ref="formSearch">
                        <v-card-subtitle class="py-0">
                            <v-select
                            v-model="type"
                            :items="postTypes"
                            item-text="name"
                            item-value="value"
                            label="情報タイプ"
                            />
                        </v-card-subtitle>
                        <v-card-subtitle class="py-0">
                            <v-text-field
                            v-model="title"
                            label="キーワード"
                            />
                        </v-card-subtitle>
                        <v-card-subtitle class="py-0">
                            <v-text-field
                            v-model="URL"
                            label="URL"
                            />
                        </v-card-subtitle>
                        <v-card-subtitle justify="start">
                            <v-text-field
                            v-model="date"
                            label="記事の日付"
                            :rules="[validateDate]"
                            maxlength="10"
                            >
                            <template v-slot:append-outer>
                                <date-picker v-model="date"/>
                            </template>
                            </v-text-field>
                        </v-card-subtitle>
                        <v-card-actions class="pt-0">
                            <v-btn
                            color="teal"
                            dark
                            @click="validation"
                            >
                            検索
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script>
import DatePicker from "~/components/datePicker.vue"
const regDate = new RegExp(/(\d{4})-(\d{2})-(\d{2})/)

export default {
    name: "SearchForm",
    components: {
        DatePicker
    },
    data () {
        return {
            type: "",
            postTypes: [],
            title: "",
            URL: "",
            date: "",
            validateDate: value => !value || value === "" || regDate.test(value) || "日付を入力してください",
        }
    },
    created () {
        this.title = (this.$route.query.title !== undefined)? this.$route.query.title : ""
        this.URL = (this.$route.query.URL !== undefined)? this.$route.query.URL : ""
        this.date = (this.$route.query.date !== undefined)? this.$route.query.date : ""
    },
    mounted () {
        this.postTypes = this.$store.state.postType
        this.type = (this.$route.query.type !== undefined)? this.$route.query.type : ""
    },
    methods: {
        validation () {
            try {
                if(!this.$refs.formSearch.validate()) {
                throw "ExceptionOccured"
                }
                 this.search()
            } catch (e) {
                console.log(e)
            }
        },
        search () {
            const tag = (this.$route.query.tag !== undefined)? this.$route.query.tag : ""
            const userID =(this.$route.query.userID !== undefined)? this.$route.query.userID : ""
            const query = {
                title: this.title,
                type: this.type,
                tag: tag,
                URL: this.URL,
                userID: userID,
                date: this.date
            }
            this.$router.push({ path: "/", query: query})
        }
    }
}
</script>