import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, entities } from "@rrm/db";
import { EntityView } from "./EntityView";

export default async function EntityViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.query.entities.findFirst({
    where: eq(entities.id, Number(id)),
    with: { category: true },
  });
  if (!item) notFound();
  return <EntityView entity={item} />;
}
