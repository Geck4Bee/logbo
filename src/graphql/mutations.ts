/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createReply = /* GraphQL */ `
  mutation CreateReply(
    $input: CreateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    createReply(input: $input, condition: $condition) {
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
export const updateReply = /* GraphQL */ `
  mutation UpdateReply(
    $input: UpdateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    updateReply(input: $input, condition: $condition) {
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
export const deleteReply = /* GraphQL */ `
  mutation DeleteReply(
    $input: DeleteReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    deleteReply(input: $input, condition: $condition) {
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
export const createDel = /* GraphQL */ `
  mutation CreateDel(
    $input: CreateDelInput!
    $condition: ModelDelConditionInput
  ) {
    createDel(input: $input, condition: $condition) {
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
export const updateDel = /* GraphQL */ `
  mutation UpdateDel(
    $input: UpdateDelInput!
    $condition: ModelDelConditionInput
  ) {
    updateDel(input: $input, condition: $condition) {
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
export const deleteDel = /* GraphQL */ `
  mutation DeleteDel(
    $input: DeleteDelInput!
    $condition: ModelDelConditionInput
  ) {
    deleteDel(input: $input, condition: $condition) {
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
export const createNotice = /* GraphQL */ `
  mutation CreateNotice(
    $input: CreateNoticeInput!
    $condition: ModelNoticeConditionInput
  ) {
    createNotice(input: $input, condition: $condition) {
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
export const updateNotice = /* GraphQL */ `
  mutation UpdateNotice(
    $input: UpdateNoticeInput!
    $condition: ModelNoticeConditionInput
  ) {
    updateNotice(input: $input, condition: $condition) {
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
export const deleteNotice = /* GraphQL */ `
  mutation DeleteNotice(
    $input: DeleteNoticeInput!
    $condition: ModelNoticeConditionInput
  ) {
    deleteNotice(input: $input, condition: $condition) {
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
export const createKraken = /* GraphQL */ `
  mutation CreateKraken(
    $input: CreateKrakenInput!
    $condition: ModelKrakenConditionInput
  ) {
    createKraken(input: $input, condition: $condition) {
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
export const updateKraken = /* GraphQL */ `
  mutation UpdateKraken(
    $input: UpdateKrakenInput!
    $condition: ModelKrakenConditionInput
  ) {
    updateKraken(input: $input, condition: $condition) {
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
export const deleteKraken = /* GraphQL */ `
  mutation DeleteKraken(
    $input: DeleteKrakenInput!
    $condition: ModelKrakenConditionInput
  ) {
    deleteKraken(input: $input, condition: $condition) {
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
