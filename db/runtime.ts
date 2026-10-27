/** Amplify has no Cloudflare D1 binding. Replace this adapter when connecting a backend. */
interface Statement {
  bind(...values: unknown[]): Statement;
  all<T>(): Promise<{ results: T[] }>;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<{ meta: { changes: number } }>;
}
interface Database { prepare(sql: string): Statement }
export const env: { DB?: Database } = {};
