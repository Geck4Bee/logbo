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
          title
          URL
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
        title
        URL
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
      title
      URL
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
        title
        URL
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
          title
          URL
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
        title
        URL
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
          title
          URL
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
        title
        URL
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
        title
        URL
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
          title
          URL
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
          title
          URL
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
