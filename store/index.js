export const state = () => {
    currentUserInfo: null
    isLoggedIn: false
    userID: null
    imgPreview: null
    showPreviewImg: false
}

export const mutations = {
    login(state, user) {
        state.currentUserInfo = user
        state.isLoggedIn = true
    },
    logout(state) {
        state.currentUserInfo = null
        state.isLoggedIn = false
    },
    setImg(state, img) {
        state.imgPreview = img
        state.showPreviewImg = true
    },
    removeImg(state) {
        state.showPreviewImg = false
        state.imgPreview = null
    },
    setUserID(state, id) {
        state.userID = id
    }
}