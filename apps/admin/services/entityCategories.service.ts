import { apiFetch } from "@/lib/api-client";
import type { EntityCategory } from "@rrm/db";

export function fetchEntityCategories() {
  return apiFetch<EntityCategory[]>("/api/entity-categories");
}

export function fetchEntityCategoryById(id: number) {
  return apiFetch<EntityCategory>(`/api/entity-categories/${id}`);
}

export function createEntityCategory(name: string) {
  return apiFetch<EntityCategory>("/api/entity-categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

export function updateEntityCategory(id: number, name: string) {
  return apiFetch<EntityCategory>(`/api/entity-categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

export function deleteEntityCategory(id: number) {
  return apiFetch<{ message: string }>(`/api/entity-categories/${id}`, { method: "DELETE" });
}
