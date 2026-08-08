import { apiFetch } from "@/lib/api-client";
import type { Profile } from "@rrm/db";

export function fetchUsers() {
  return apiFetch<Profile[]>("/api/users");
}

export function fetchUserById(id: string) {
  return apiFetch<Profile>(`/api/users/${id}`);
}

export function updateUserRole(id: string, role: "admin" | "user") {
  return apiFetch<Profile>(`/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });
}

export function deleteUser(id: string) {
  return apiFetch<{ message: string }>(`/api/users/${id}`, { method: "DELETE" });
}
