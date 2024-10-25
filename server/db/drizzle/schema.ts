import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("Users", {
  username: uuid("username")
    .notNull()
    .unique()
    .defaultRandom()
    .primaryKey()
    .references(() => UserProfiles.owner, { onDelete: "cascade", onUpdate: "cascade" })
    .references(() => ProductsRegistered.owner, { onDelete: "cascade", onUpdate: "cascade" }),
  email: varchar("email").unique().notNull(),
  passwordHash: varchar("passwordHash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const UserRelations = relations(UserTable, ({ one, many }) => ({
  products: many(ProductsRegistered),
  profiles: one(UserProfiles, {
    fields: [UserTable.username],
    references: [UserProfiles.owner],
  }),
}));

export const ProductsRegistered = pgTable("Products", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  owner: varchar("owner").notNull(),
  price: integer("price").default(0),
});

export const ProductRelations = relations(ProductsRegistered, ({ one }) => ({
  owner: one(UserTable, {
    fields: [ProductsRegistered.owner],
    references: [UserTable.username],
  }),
}));

export const UserProfiles = pgTable("Profiles", {
  owner: varchar("owner").unique().primaryKey(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }),
  theme: varchar("theme").notNull().default("light"),
  phoneNumber: integer("phNo").default(1000000000),
  profilePhoto: varchar("pfp"),
});

export const ProfileRelations = relations(UserProfiles, ({ one }) => ({
  owner: one(UserTable, {
    fields: [UserProfiles.owner],
    references: [UserTable.username],
  }),
}));
