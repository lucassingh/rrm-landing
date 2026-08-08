import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * profiles — replaces the old `users` table. Identity itself (email verification,
 * password, Google login) lives in Clerk; this table only holds the app-specific
 * fields (role, active flag) keyed by the Clerk user id, kept in sync via the
 * Clerk webhook (see apps/admin/app/api/webhooks/clerk/route.ts).
 */
export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(), // Clerk user id (e.g. "user_xxx")
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role", { enum: ["admin", "user"] }).notNull().default("user"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  subtitle: varchar("subtitle", { length: 200 }).notNull(),
  imageUrl: text("image_url"),
  imageDescription: varchar("image_description", { length: 200 }).notNull(),
  body: text("body").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  userId: text("user_id").references(() => profiles.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const entityCategories = pgTable("entity_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const entities = pgTable("entities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  imageUrl: text("image_url"),
  webUrl: text("web_url"),
  facebookUrl: text("facebook_url"),
  whatsappUrl: text("whatsapp_url"),
  isWhite: boolean("is_white").notNull().default(false),
  categoryId: integer("category_id")
    .notNull()
    .references(() => entityCategories.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const profilesRelations = relations(profiles, ({ many }) => ({
  news: many(news),
}));

export const newsRelations = relations(news, ({ one }) => ({
  author: one(profiles, { fields: [news.userId], references: [profiles.id] }),
}));

export const entityCategoriesRelations = relations(entityCategories, ({ many }) => ({
  entities: many(entities),
}));

export const entitiesRelations = relations(entities, ({ one }) => ({
  category: one(entityCategories, {
    fields: [entities.categoryId],
    references: [entityCategories.id],
  }),
}));

export const forums = pgTable("forums", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  coordinatorName: varchar("coordinator_name", { length: 200 }).notNull(),
  whatsappUrl: text("whatsapp_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;
export type EntityCategory = typeof entityCategories.$inferSelect;
export type NewEntityCategory = typeof entityCategories.$inferInsert;
export type Entity = typeof entities.$inferSelect;
export type NewEntity = typeof entities.$inferInsert;
export type Forum = typeof forums.$inferSelect;
export type NewForum = typeof forums.$inferInsert;
