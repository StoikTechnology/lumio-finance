import{sqliteTable,text,index}from 'drizzle-orm/sqlite-core';
export const applications=sqliteTable('applications',{id:text('id').primaryKey(),owner:text('owner').notNull(),product:text('product').notNull(),status:text('status').notNull().default('draft'),data:text('data').notNull(),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull()},t=>[index('idx_applications_owner_updated').on(t.owner,t.updatedAt)]);

export const contactEnquiries=sqliteTable('contact_enquiries',{id:text('id').primaryKey(),fullName:text('full_name').notNull(),mobile:text('mobile').notNull(),email:text('email').notNull(),notes:text('notes').notNull(),createdAt:text('created_at').notNull()},t=>[index('idx_contact_email_created').on(t.email,t.createdAt)]);
