// Matches the shape returned by PProject-backend's /api/todos
export type TodoListItem = {
  id: string;
  title: string;
  completed: boolean;
};

// Post as used by the UI; mapped from Strapi's /api/posts in lib/api.ts
export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  image_url: string | null;
};
