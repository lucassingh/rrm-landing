import type { News, Profile } from "@rrm/db";

// Same composition pattern as apps/admin/interfaces/news.ts — the relational
// query (`db.query.news.findMany({ with: { author: true } })`) resolves `author`
// to `Profile | null` since `news.userId` is nullable (ON DELETE SET NULL).
export type NewsWithAuthor = News & { author: Profile | null };
