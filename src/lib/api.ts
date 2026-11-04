import type { Post, TodoListItem } from "@/types/app";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

// Shape of one post as Strapi returns it (inside { data: [...] })
type StrapiPost = {
  documentId: string;
  title: string;
  excerpt: string;
  content: string | null;
  createdAt: string;
  image: { url: string; alternativeText: string | null } | null;
};

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

// Posts live in Strapi, not in the Express backend. Newest first; only
// published posts are returned by default.
export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${STRAPI_URL}/api/posts?sort=createdAt:desc&populate=image`);

  if (!res.ok) {
    throw new Error(`Failed to load posts: ${res.status}`);
  }

  const { data }: { data: StrapiPost[] } = await res.json();

  return data.map((post) => ({
    id: post.documentId,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content ?? "",
    created_at: post.createdAt,
    // Uploaded files are served by Strapi; local uploads come back as relative paths
    image_url: post.image
      ? post.image.url.startsWith("/")
        ? `${STRAPI_URL}${post.image.url}`
        : post.image.url
      : null,
  }));
}
