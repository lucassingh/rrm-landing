import { apiFetch } from "@/lib/api-client";
import type { Forum } from "@rrm/db";

export type ForumInput = { name: string; coordinatorName: string; whatsappUrl: string };

export function fetchForums() {
  return apiFetch<Forum[]>("/api/forums");
}

export function fetchForumById(id: number) {
  return apiFetch<Forum>(`/api/forums/${id}`);
}

export function createForum(input: ForumInput) {
  return apiFetch<Forum>("/api/forums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function updateForum(id: number, input: ForumInput) {
  return apiFetch<Forum>(`/api/forums/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function deleteForum(id: number) {
  return apiFetch<{ message: string }>(`/api/forums/${id}`, { method: "DELETE" });
}
