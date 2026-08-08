import { apiFetch } from "@/lib/api-client";
import type { Entity } from "@rrm/db";
import type { EntityWithCategory } from "@/interfaces/entity";

export function fetchEntities() {
  return apiFetch<EntityWithCategory[]>("/api/entities");
}

export function fetchEntityById(id: number) {
  return apiFetch<EntityWithCategory>(`/api/entities/${id}`);
}

export function createEntity(formData: FormData) {
  return apiFetch<Entity>("/api/entities", { method: "POST", body: formData });
}

export function updateEntity(id: number, formData: FormData) {
  return apiFetch<Entity>(`/api/entities/${id}`, { method: "PUT", body: formData });
}

export function deleteEntity(id: number) {
  return apiFetch<{ message: string }>(`/api/entities/${id}`, { method: "DELETE" });
}
