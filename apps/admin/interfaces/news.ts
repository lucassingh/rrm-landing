import type { News, Profile } from "@rrm/db";

export type NewsWithAuthor = News & { author: Profile | null };
