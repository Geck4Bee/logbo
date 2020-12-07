import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class User {
  readonly id: string;
  readonly cognitoID: string;
  readonly identityID?: string;
  readonly name: string;
  readonly viewName?: string;
  readonly description?: string;
  readonly iconUrl?: string;
  readonly email: string;
  readonly posts?: (Post | null)[];
  readonly comments?: (Comment | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly user?: User;
  readonly comments?: (Comment | null)[];
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class Comment {
  readonly id: string;
  readonly post?: Post;
  readonly user?: User;
  readonly content: string;
  constructor(init: ModelInit<Comment>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}