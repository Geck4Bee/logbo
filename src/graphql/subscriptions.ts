/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      URL
      tag
      date
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      URL
      tag
      date
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      title
      URL
      tag
      date
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
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply {
    onCreateReply {
      id
      postID
      post {
        id
        title
        URL
        tag
        date
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
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply {
    onUpdateReply {
      id
      postID
      post {
        id
        title
        URL
        tag
        date
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
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply {
    onDeleteReply {
      id
      postID
      post {
        id
        title
        URL
        tag
        date
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
