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
  readonly replies?: (Reply | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly URL?: string;
  readonly tag?: string;
  readonly date?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly user?: User;
  readonly replies?: (Reply | null)[];
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class Reply {
  readonly id: string;
  readonly post?: Post;
  readonly type: string;
  readonly content: string;
  readonly request?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly user?: User;
  constructor(init: ModelInit<Reply>);
  static copyOf(source: Reply, mutator: (draft: MutableModel<Reply>) => MutableModel<Reply> | void): Reply;
}