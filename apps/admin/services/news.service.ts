import { apiFetch } from "@/lib/api-client";
import type { NewsWithAuthor } from "@/interfaces/news";

export function fetchNews(params?: { skip?: number; limit?: number }) {
  const qs = new URLSearchParams();
  if (params?.skip) qs.set("skip", String(params.skip));
  if (params?.limit) qs.set("limit", String(params.limit));
  const query = qs.toString();
  return apiFetch<NewsWithAuthor[]>(`/api/news${query ? `?${query}` : ""}`);
}

export function fetchNewsById(id: number) {
  return apiFetch<NewsWithAuthor>(`/api/news/${id}`);
}

export function createNews(formData: FormData) {
  return apiFetch<NewsWithAuthor>("/api/news", { method: "POST", body: formData });
}

export function updateNews(id: number, formData: FormData) {
  return apiFetch<NewsWithAuthor>(`/api/news/${id}`, { method: "PUT", body: formData });
}

export function deleteNews(id: number) {
  return apiFetch<{ message: string }>(`/api/news/${id}`, { method: "DELETE" });
}
