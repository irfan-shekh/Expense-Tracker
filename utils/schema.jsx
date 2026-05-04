import {pgTable,serial,varchar,numeric,timestamp,boolean, integer } from "drizzle-orm/pg-core";

// Budgets Table
export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull(),
    createdBy: varchar('createdBy').notNull(),
    icon: varchar('icon'),
    // NEW: Handle hidden/draft budgets
    isHidden: boolean('isHidden').default(false)
});

 
export const Expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull(),
    budgetId: integer('budgetId').references(() => Budgets.id),
    // Improved: Using native timestamp with default current time
    createdAt: timestamp('createdAt').defaultNow().notNull()
});