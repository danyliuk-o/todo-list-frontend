import type { TodoListItem } from "@/types/app";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed: ${res.status}`);
  }

  return res.json();
}

export function fetchTodos(): Promise<TodoListItem[]> {
  return request("/api/todos");
}

export function createTodo(title: string): Promise<TodoListItem> {
  return request("/api/todos", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export function deleteTodo(id: string): Promise<{ message: string }> {
  return request(`/api/todos/${id}`, { method: "DELETE" });
}
