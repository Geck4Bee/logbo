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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
