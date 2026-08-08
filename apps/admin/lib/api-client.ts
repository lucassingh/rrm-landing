export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Raw fetch() calls never get the app's basePath ("/admin") applied
// automatically — only next/link, useRouter(), and redirect() do that.
// Every service in this app calls apiFetch with a path like "/api/news",
// so prefixing it here fixes all of them in one place.
const BASE_PATH = "/admin";

export async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
  const url = input.startsWith("/") ? `${BASE_PATH}${input}` : input;
  const res = await fetch(url, init);
  if (!res.ok) {
    let detail = "Ocurrió un error inesperado";
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
      // response wasn't JSON, keep the default message
    }
    throw new ApiError(detail, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}
