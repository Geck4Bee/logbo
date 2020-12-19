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
            {name: "行政またはそれに準ずる組織・個人", value: "primary"},
            {name: "民間報道", value: "secondary"},
            {name: "その他の企業・機関・団体の公式発表", value: "official"},
            {name: "リーク", value: "leak"},
            {name: "民間情報全般", value: "civilian"},
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