import API, { graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import { moduleFileExtensions } from '~/jest.config'

export async function setImgFile (obj) {
    if (obj.imgURL !== null && obj.imgURL !== 'null') {
        try {
            await Storage.get(obj.imgURL, {level: 'protected'})
                .then((res) => {
                    obj.imgPreview = res
                    obj.showPreviewImg = true
                })
                .catch((e) => {
                    console.log("Getting Image Failed: " + e)
                })
        } catch (e) {
            console.log("Getting Image Failed: " + e)
        } finally {
            return obj
        }
    }
}

export async function setImgFileUser (obj, identityId) {
    if (obj.imgURL !== null && obj.imgURL !== 'null' && identityId !== null) {
        try {
            await Storage.get(obj.imgURL, {
                level: 'protected',
                identityId: identityId
            })
                .then((res) => {
                    obj.imgPreview = res
                    obj.showPreviewImg = true
                })
                .catch((e) => {
                    console.log("Getting Image Failed: " + e)
                })
        } catch (e) {
            console.log("Getting Image Failed: " + e)
        } finally {
            return obj
        }
    }
}

export function getNow () {
    const date = new Date()
    const unixtimenow = Math.floor(date.getTime() / 1000)
    return unixtimenow
}