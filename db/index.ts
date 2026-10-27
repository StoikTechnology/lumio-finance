// Reserved for a production database adapter. No local or in-memory financial data storage.
export function getDb(): never {
  throw new Error('Production database is not configured.');
}
