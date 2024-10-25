import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const ProductTypes = pgEnum("productType", [
  "Appliances",
  "Service",
  "Sales",
  "IT",
  "N/A",
]);

export const UserTable = pgTable("Users", {
  username: uuid("username").unique().defaultRandom().primaryKey(),
  email: varchar("email").unique().notNull(),
  passwordHash: varchar("passwordHash").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const UserRelations = relations(UserTable, ({ one, many }) => ({
  products: many(ProductsRegistered),
  profiles: one(UserProfiles, {
    fields: [UserTable.username],
    references: [UserProfiles.owner],
  }),
}));

export const ProductsRegistered = pgTable("Products", {
  id: serial("id").notNull().primaryKey(),
  owner: varchar("owner")
    .notNull()
    .references(() => UserTable.username, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  name: varchar("name").notNull(),
  brand: varchar("brand").default("Generic"),
  type: ProductTypes("type").default("N/A"),
  warrantyPeriod: bigint("warrantyPeriod", { mode: "number" }).default(
    365 * 24 * 60 * 60 * 1000
  ),
  warrantyStartDate: date().defaultNow(),
  price: integer("price").default(0),
  outOfStock: boolean().default(true),
});

export const ProductRelations = relations(ProductsRegistered, ({ one }) => ({
  owner: one(UserTable, {
    fields: [ProductsRegistered.owner],
    references: [UserTable.username],
  }),
}));

export const UserProfiles = pgTable("Profiles", {
  owner: varchar("owner")
    .unique()
    .primaryKey()
    .references(() => UserTable.username, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  theme: varchar("theme").notNull().default("light"),
  phoneNumber: integer("phoneNumber").default(1000000000),
  profilePhoto: varchar("profilePhoto", { length: 255 }),
});

export const ProfileRelations = relations(UserProfiles, ({ one }) => ({
  owner: one(UserTable, {
    fields: [UserProfiles.owner],
    references: [UserTable.username],
  }),
}));
