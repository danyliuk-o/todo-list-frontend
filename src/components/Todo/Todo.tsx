"use client";

import { TodoList } from "./TodoList";
import { TodoForm } from "./TodoForm";
import { useEffect, useState, type FC } from "react";
import type { TodoListItem } from "@/types/app";
import { createTodo, deleteTodo, fetchTodos } from "@/lib/api";

const Todo: FC = () => {
  const [tasks, setTasks] = useState<TodoListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos()
      .then(setTasks)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load tasks"))
      .finally(() => setIsLoading(false));
  }, []);

  const addTask = async (title: string) => {
    if (title.trim() === "") return;
    try {
      const newTask = await createTodo(title);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add task");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {error && <p className="text-red-600">{error}</p>}
      <TodoForm onSubmit={addTask} />
      {isLoading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <TodoList tasks={tasks} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Todo;
