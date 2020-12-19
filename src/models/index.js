// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Notice, User, Post, Reply, Del } = initSchema(schema);

export {
  Notice,
  User,
  Post,
  Reply,
  Del
};