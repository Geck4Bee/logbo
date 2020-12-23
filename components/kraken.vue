<template>
    <div class="krakenRow">
        <v-row class="px-4" justify="end" align="center">
            <span style="color: gray; font-size: 0.9em;" class="mx-1">読取日時: {{ new Date(item.createdAt).toLocaleString() }}</span>
        </v-row>
        <v-row class="px-4 pb-1" justify="start" align="center">
            <span class="my-0">{{ item.en }}</span>
        </v-row>
        <v-row class="px-4 pb-1" justify="start" align="center">
            <h4 class="my-0">{{ item.ja }}</h4>
        </v-row>
        <v-row class="px-4 pb-1" justify="start" align="center">
            <a
            class="krakenURL"
            :href="item.URL"
            target="_blank"
            rel="noopener noreferrer"
            >
                <span class="my-0">{{ item.URL }}</span>
            </a>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "Kraken",
    props: {
        item: {
            type: Object,
            default () {
                return {
                    id: "",
                    URL: "",
                    en: "",
                    ja: "",
                    createdAt: "",
                    updatedAt: "",
                    _version: 0,
                    _deleted: false
                }
            }
        }
    }
}
</script>

<style>
.krakenRow {
    box-shadow: 3px 3px 10px #000, -3px -3px 10px #000;
}
.krakenURL {
    color: gray !important;
    text-decoration: none !important;
}
.krakenURL:hover {
    color: white !important;
}
</style>