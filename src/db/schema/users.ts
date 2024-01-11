import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { subscriptions } from "./subscriptions";
import { accounts } from "./accounts";
import { sessions } from "./sessions";

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  password: text('password'),
  role: text('role'),
 }, (users) => {
  return {
    nameIdx: index("name_idx").on(users.name),
    emailIdx: index("email_idx").on(users.email)
  }
 })

export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(subscriptions),
  accounts: many(accounts),
  sessions: many(sessions)
}));