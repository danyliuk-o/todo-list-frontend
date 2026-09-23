// Matches the shape returned by PProject-backend's /api/todos
export type TodoListItem = {
  id: string;
  title: string;
  completed: boolean;
};
