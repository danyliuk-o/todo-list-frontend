import { type FC } from "react";
import type { TodoListItem } from "@/types/app";

type TodoListProps = {
  onDelete: (id: string) => void;
  tasks: TodoListItem[];
};

export const TodoList: FC<TodoListProps> = (props) => {
  const { onDelete, tasks } = props;
  return (
    <div className="mt-4">
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="mx-auto flex max-w-md flex-col gap-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between rounded border border-border px-3 py-2"
            >
              <div>{task.text}</div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(task.id);
                  }}
                  className="rounded border border-border px-2 py-1"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
