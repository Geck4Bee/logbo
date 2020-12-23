<template>
    <div class="krakenRow">
        <v-row class="px-4" justify="end" align="center">
            <span style="color: gray; font-size: 0.9em;" class="mx-1">読取日時: {{ new Date(item.createdAt).toLocaleString() }}</span>
        </v-row>
        <div class="px-4 pb-1">
            <span class="my-0">{{ item.en }}</span>
        </div>
        <div class="px-4 pb-1">
            <h4 class="my-0">{{ item.ja }}</h4>
        </div>
        <div class="px-4 pb-1 wrap-box" style="max-width: 100%;">
            <a
            class="krakenURL"
            :href="item.URL"
            target="_blank"
            rel="noopener noreferrer"
            >
                {{ item.URL }}
            </a>
        </div>
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
    max-width: 100%;
}
.krakenURL:hover {
    color: white !important;
}
.wrap-box {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    word-break: break-all;
}
</style>