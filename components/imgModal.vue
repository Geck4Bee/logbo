<template>
    <v-dialog
    v-model="dialog"
    max-width="600"
    >
        <v-img
        :src="dataImage.imgPreview"
        alt="画像のプレビュー"
        @error="Common.resetImgURL(dataImage)"
        max-width="600"
        />
    </v-dialog>
</template>

<script>
import * as Common from '~/assets/js/common.js'

export default {
    name: "ImgModal",
    data () {
        return {
            dialog: false,
            dataImage: {
                name: "modal",
                imgURL: null,
                imgFile: null,
                imgType: null,
                imgPreview: null,
                showPreviewImg: false,
            }
        }
    },
    props: {
        image: {
            type: Object,
            default () {
                return {
                    name: "modal",
                    imgURL: null,
                    imgFile: null,
                    imgType: null,
                    imgPreview: null,
                    showPreviewImg: false,
                }
            }
        },
        identityID: {
            type: String,
            default: ""
        }
    },
    methods: {
        async setImage () {
            this.dataImage = JSON.parse(JSON.stringify(this.image))
            await Common.setImgFileUser(this.dataImage, this.identityID)
            this.dialog = true
        }
    }
}
</script>