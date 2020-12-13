export const state = () => {
    currentUserInfo: null
    isLoggedIn: false
    userID: null
    imgPreview: null
    showPreviewImg: false
    replyType: []
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
    },
    setReplyType(state) {
        state.replyType = [
            {name: "変更リクエスト", value: "request"},
            {name: "承認リクエスト", value: "accept"},
            {name: "却下リクエスト", value: "reject"},
            {name: "補足", value: "supplement"},
            {name: "検証", value: "inspection"}
        ]
    }
}