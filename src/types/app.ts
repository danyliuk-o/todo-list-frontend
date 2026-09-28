// Matches the shape returned by PProject-backend's /api/todos
export type TodoListItem = {
  id: string;
  title: string;
  completed: boolean;
};

// Matches the shape returned by PProject-backend's /api/posts
export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
};
