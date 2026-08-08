import { asc } from "drizzle-orm";
import { db, forums } from "@rrm/db";
import { ForumsPageClient } from "@/components/forums/ForumsPageClient";

export default async function ForumPage() {
    const rows = await db.query.forums.findMany({ orderBy: asc(forums.id) });
    return <ForumsPageClient forums={rows} />;
}
