"use client";

import { TodoList } from "./TodoList";
import { TodoForm } from "./TodoForm";
import { useCreateTodo, useDeleteTodo, useTodosQuery } from "./useTodos";
import type { FC } from "react";

const Todo: FC = () => {
  const { data: tasks = [], isPending, error } = useTodosQuery();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();

  const addTask = (title: string) => {
    if (title.trim() === "") return;
    createTodo.mutate(title);
  };

  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  const errorMessage =
    error?.message ?? createTodo.error?.message ?? deleteTodo.error?.message;

  return (
    <div>
      <h1>Todo List</h1>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <TodoForm onSubmit={addTask} />
      {isPending ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <TodoList tasks={tasks} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Todo;
