import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const subscriptions = sqliteTable(
  'subscriptions',
  {
    id: text("id").notNull().primaryKey(),
    userId: text('user_id').notNull(), // Reference to the user who owns the subscription
    type: text('type'), // The type of subscription (e.g. basic, standard, pro)
    period: text('period'), // The period of the subscription (e.g. monthly, yearly)
    subscriptionId: text('subscription_id').unique(), // Unique identifier in Stripe
    priceId: text('price_id'), // ID of the subscription price
    customerId: text('customer_id'), // ID of the customer in Stripe. can maybe get multiple subscription
    currentPeriodEnd: text('end_date'), // The date the subscription is set to end
    createdAt: text('created_at').notNull(), // will autogenerate new Date() at creation time
    updatedAt: text('updated_at').notNull(), // will autogenerate new Date() at creation time
  },
  (usersSubscription) => {
    return {
      userIdIdx: index('subscription_user_id_idx').on(usersSubscription.userId),
      subscriptionIdIdx: index('subscription_id_idx').on(
        usersSubscription.subscriptionId
      ),
    };
  }
);

export const usersSubscriptionRelations = relations(
  subscriptions,
  ({ one }) => ({
    user: one(users, {
      fields: [subscriptions.userId],
      references: [users.id],
    }),
  })
);
