// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Post, Reply } = initSchema(schema);

export {
  User,
  Post,
  Reply
};