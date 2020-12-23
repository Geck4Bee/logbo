// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Notice, User, Post, Reply, Del, Kraken } = initSchema(schema);

export {
  Notice,
  User,
  Post,
  Reply,
  Del,
  Kraken
};