import { redirect } from 'next/navigation';
export type ChatGPTUser = { userId: string; displayName: string; email: string; fullName: string | null };
// Never trust user-supplied oai-authenticated-* headers on public Amplify hosting.
// Implement verified sessions here when a production identity provider is connected.
export async function getChatGPTUser(): Promise<ChatGPTUser | null> { return null; }
export async function requireChatGPTUser(_returnTo: string): Promise<ChatGPTUser> { redirect('/login'); }
export function chatGPTSignInPath(_returnTo: string): string { return '/login'; }
export function chatGPTSignOutPath(_returnTo = '/'): string { return '/login'; }
