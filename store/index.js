export const state = () => {
    currentUserInfo: null
    isLoggedIn: false
    userID: null
    imgPreview: null
    showPreviewImg: false
    postType: []
    replyType: []
    delType: []
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
    setPostType(state) {
        state.postType = [
            {name: "一次・公式", value: "primary"},
            {name: "報道・記事", value: "secondary"},
            {name: "ツイート・投稿", value: "tweet"},
        ]
    },
    setReplyType(state) {
        state.replyType = [
            {name: "変更リクエスト", value: "request"},
            {name: "承認済み", value: "accept"},
            {name: "却下済み", value: "reject"},
            {name: "補足", value: "supplement"},
            {name: "検証", value: "inspection"}
        ]
    },
    setDelType(state) {
        state.delType = [
            {name: "誹謗・中傷・嫌がらせ", value: "slendering"},
            {name: "脅迫行為", value: "intimidation"},
            {name: "宗教・民族に対する中傷", value: "hate"},
            {name: "ポルノ", value: "porn"},
            {name: "個人情報", value: "person"},
            {name: "雑談", value: "talking"}
        ]
    }
}