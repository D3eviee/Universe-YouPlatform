import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, text, timestamp, jsonb, uuid, pgEnum, integer, serial  } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['user', 'editor', 'admin']);
export const articleStatusEnum = pgEnum('article_status', ['public', 'draft', 'archived']);
export const articlePriorityEnum = pgEnum('article_priority', ['normal', 'hero1', 'hero2', 'hero3']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  role: userRoleEnum('role').default('user').notNull(), 
});

export const articles = pgTable('articles', {
  id: uuid('id').primaryKey().notNull(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull().default(''),
  slug: text('slug').notNull().default('/'),
  authorId: integer('author_id').references(() => users.id).notNull(),
  thumbnailImage: text('thumbnail_image').notNull().default(''),
  thumbnailDescription: text('thumbnail_description').notNull().default(''),
  thumbnailAnnotaion: text('thumbnail_annotaion').notNull().default(''),
  thumbnailAlt: text('thumbnail_alt').notNull().default(''),
  category: text('category'),
  status: articleStatusEnum('status').default('draft').notNull(),
  priority: articlePriorityEnum('priority').default('normal').notNull(),
  blocks: jsonb('blocks').notNull(),
  publishedAt: timestamp('published_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export type Article = InferSelectModel<typeof articles>;

export const books = pgTable('books', {
  id: uuid('id').defaultRandom().primaryKey(),
  authorId: integer('author_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  bookCover: text("bookCover").notNull(),
  bookCoverAlt: text("bookCoverAlt").notNull(),
  bookAuthor: jsonb('bookAuthor').notNull(), 
  category: text('category').notNull(),
  author: jsonb('author').notNull(), 
  content: jsonb('content').notNull(), 
  publishedAt: timestamp('published_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  status: text().default("public")
});

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
}));

export const booksRelations = relations(books, ({ one }) => ({
  author: one(users, {
    fields: [books.authorId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
  books: many(books)
}));