import { drizzle } from 'drizzle-orm/d1';

import * as usersSchema from './schema/users';
import * as accounts from './schema/accounts';
import * as subscriptions from './schema/subscriptions';
import * as sessions from './schema/sessions';
import * as verificationTokens from './schema/verificationTokens';

export const schema = {
  ...usersSchema,
  ...accounts,
  ...subscriptions,
  ...sessions,
  ...verificationTokens,
};

export const getDrizzleDB = ({ database }: { database: D1Database }) => {
  const db = drizzle(database, { schema });
  return db;
};
