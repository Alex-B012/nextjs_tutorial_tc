import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  stock: integer("stock").notNull(),
  brandId: uuid("brand_id").references(() => brands.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productsRelations = relations(products, ({ one }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  details: one(productDetails),
}));

export const productDetails = pgTable("product_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  description: varchar("description", { length: 2000 }),
  materials: varchar("materials", { length: 500 }),
  productId: uuid("product_id")
    .notNull()
    .unique()
    .references(() => products.id),
});

export const productDetailsRelations = relations(productDetails, ({ one }) => ({
  product: one(products, {
    fields: [productDetails.productId],
    references: [products.id],
  }),
}));

export const brands = pgTable("brands", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));
