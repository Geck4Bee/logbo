/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        cognitoID
        identityID
        name
        viewName
        description
        iconUrl
        email
        posts {
          nextToken
          startedAt
        }
        replies {
          nextToken
          startedAt
        }
        notice {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      cognitoID
      identityID
      name
      viewName
      description
      iconUrl
      email
      posts {
        items {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      replies {
        items {
          id
          postID
          type
          content
          request
          imgUrl
          pastPost
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      notice {
        items {
          id
          content
          userID
          fromUserID
          postID
          replyID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cognitoID
        identityID
        name
        viewName
        description
        iconUrl
        email
        posts {
          nextToken
          startedAt
        }
        replies {
          nextToken
          startedAt
        }
        notice {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        div
        title
        type
        URL
        subURLs
        tag
        date
        imgUrl
        imgIdentityID
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        replies {
          nextToken
          startedAt
        }
        del {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      div
      title
      type
      URL
      subURLs
      tag
      date
      imgUrl
      imgIdentityID
      createdAt
      updatedAt
      userID
      user {
        id
        cognitoID
        identityID
        name
        viewName
        description
        iconUrl
        email
        posts {
          nextToken
          startedAt
        }
        replies {
          nextToken
          startedAt
        }
        notice {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      replies {
        items {
          id
          postID
          type
          content
          request
          imgUrl
          pastPost
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      del {
        items {
          id
          type
          userID
          postID
          replyID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        div
        title
        type
        URL
        subURLs
        tag
        date
        imgUrl
        imgIdentityID
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        replies {
          nextToken
          startedAt
        }
        del {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncReplies = /* GraphQL */ `
  query SyncReplies(
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReplies(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        type
        content
        request
        imgUrl
        pastPost
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getReply = /* GraphQL */ `
  query GetReply($id: ID!) {
    getReply(id: $id) {
      id
      postID
      post {
        id
        div
        title
        type
        URL
        subURLs
        tag
        date
        imgUrl
        imgIdentityID
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        replies {
          nextToken
          startedAt
        }
        del {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      type
      content
      request
      imgUrl
      pastPost
      createdAt
      updatedAt
      userID
      user {
        id
        cognitoID
        identityID
        name
        viewName
        description
        iconUrl
        email
        posts {
          nextToken
          startedAt
        }
        replies {
          nextToken
          startedAt
        }
        notice {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listReplys = /* GraphQL */ `
  query ListReplys(
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReplys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        type
        content
        request
        imgUrl
        pastPost
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDels = /* GraphQL */ `
  query SyncDels(
    $filter: ModelDelFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        replyID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getDel = /* GraphQL */ `
  query GetDel($id: ID!) {
    getDel(id: $id) {
      id
      type
      userID
      user {
        id
        cognitoID
        identityID
        name
        viewName
        description
        iconUrl
        email
        posts {
          nextToken
          startedAt
        }
        replies {
          nextToken
          startedAt
        }
        notice {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      postID
      post {
        id
        div
        title
        type
        URL
        subURLs
        tag
        date
        imgUrl
        imgIdentityID
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        replies {
          nextToken
          startedAt
        }
        del {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      replyID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listDels = /* GraphQL */ `
  query ListDels(
    $filter: ModelDelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        replyID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotices = /* GraphQL */ `
  query SyncNotices(
    $filter: ModelNoticeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        content
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        fromUserID
        fromUser {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        replyID
        reply {
          id
          postID
          type
          content
          request
          imgUrl
          pastPost
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getNotice = /* GraphQL */ `
  query GetNotice($id: ID!) {
    getNotice(id: $id) {
      id
      content
      userID
      user {
        id
        cognitoID
        identityID
        name
        viewName
        description
        iconUrl
        email
        posts {
          nextToken
          startedAt
        }
        replies {
          nextToken
          startedAt
        }
        notice {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      fromUserID
      fromUser {
        id
        cognitoID
        identityID
        name
        viewName
        description
        iconUrl
        email
        posts {
          nextToken
          startedAt
        }
        replies {
          nextToken
          startedAt
        }
        notice {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      postID
      post {
        id
        div
        title
        type
        URL
        subURLs
        tag
        date
        imgUrl
        imgIdentityID
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        replies {
          nextToken
          startedAt
        }
        del {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      replyID
      reply {
        id
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        type
        content
        request
        imgUrl
        pastPost
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listNotices = /* GraphQL */ `
  query ListNotices(
    $filter: ModelNoticeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        fromUserID
        fromUser {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        replyID
        reply {
          id
          postID
          type
          content
          request
          imgUrl
          pastPost
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncKrakens = /* GraphQL */ `
  query SyncKrakens(
    $filter: ModelKrakenFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncKrakens(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        div
        URL
        en
        ja
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getKraken = /* GraphQL */ `
  query GetKraken($id: ID!) {
    getKraken(id: $id) {
      id
      div
      URL
      en
      ja
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listKrakens = /* GraphQL */ `
  query ListKrakens(
    $filter: ModelKrakenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKrakens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        div
        URL
        en
        ja
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const userByCognitoId = /* GraphQL */ `
  query UserByCognitoId(
    $cognitoID: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByCognitoID(
      cognitoID: $cognitoID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cognitoID
        identityID
        name
        viewName
        description
        iconUrl
        email
        posts {
          nextToken
          startedAt
        }
        replies {
          nextToken
          startedAt
        }
        notice {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const postByUserId = /* GraphQL */ `
  query PostByUserId(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByUserID(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        div
        title
        type
        URL
        subURLs
        tag
        date
        imgUrl
        imgIdentityID
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        replies {
          nextToken
          startedAt
        }
        del {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const postByDate = /* GraphQL */ `
  query PostByDate(
    $date: AWSDate
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByDate(
      date: $date
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        div
        title
        type
        URL
        subURLs
        tag
        date
        imgUrl
        imgIdentityID
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        replies {
          nextToken
          startedAt
        }
        del {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const postByCreatedAt = /* GraphQL */ `
  query PostByCreatedAt(
    $div: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByCreatedAt(
      div: $div
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        div
        title
        type
        URL
        subURLs
        tag
        date
        imgUrl
        imgIdentityID
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        replies {
          nextToken
          startedAt
        }
        del {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const replyByUserId = /* GraphQL */ `
  query ReplyByUserId(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    replyByUserID(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        type
        content
        request
        imgUrl
        pastPost
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const replyByPostId = /* GraphQL */ `
  query ReplyByPostId(
    $postID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    replyByPostID(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        type
        content
        request
        imgUrl
        pastPost
        createdAt
        updatedAt
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const delByPostId = /* GraphQL */ `
  query DelByPostId(
    $postID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    delByPostID(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        replyID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const noticeByUserId = /* GraphQL */ `
  query NoticeByUserId(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNoticeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    noticeByUserID(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        userID
        user {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        fromUserID
        fromUser {
          id
          cognitoID
          identityID
          name
          viewName
          description
          iconUrl
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        postID
        post {
          id
          div
          title
          type
          URL
          subURLs
          tag
          date
          imgUrl
          imgIdentityID
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        replyID
        reply {
          id
          postID
          type
          content
          request
          imgUrl
          pastPost
          createdAt
          updatedAt
          userID
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const krakenByUrl = /* GraphQL */ `
  query KrakenByUrl(
    $URL: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelKrakenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    krakenByURL(
      URL: $URL
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        div
        URL
        en
        ja
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const sortedByCreatedAt = /* GraphQL */ `
  query SortedByCreatedAt(
    $div: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelKrakenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sortedByCreatedAt(
      div: $div
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        div
        URL
        en
        ja
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
