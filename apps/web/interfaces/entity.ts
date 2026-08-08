import type { Entity, EntityCategory } from "@rrm/db";

// Same composition pattern as apps/admin/interfaces/entity.ts.
export type EntityWithCategory = Entity & { category: EntityCategory };
export type CategoryWithEntities = EntityCategory & { entities: Entity[] };
