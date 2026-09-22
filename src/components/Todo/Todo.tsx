import { TodoList } from "./TodoList.js";
import { TodoForm } from "./TodoForm.js";
import { useState, type FC } from "react";
import type { TodoListItem } from "../../types/app.js";

const Todo: FC = () => {
  const [tasks, setTasks] = useState<TodoListItem[]>([]);

  const addTask = (text: string) => {
    if (text.trim() === "") return;
    const newTask: TodoListItem = {
      id: crypto.randomUUID?.() ?? Date.now().toString(36),
      text,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onSubmit={addTask} />
      <TodoList tasks={tasks} onDelete={handleDelete} />
    </div>
  );
};

export default Todo;
