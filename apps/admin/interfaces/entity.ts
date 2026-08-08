import type { Entity, EntityCategory } from "@rrm/db";

export type EntityWithCategory = Entity & { category: EntityCategory };
export type CategoryWithEntities = EntityCategory & { entities: Entity[] };
