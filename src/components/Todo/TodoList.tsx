import { type FC } from "react";
import type { TodoListItem } from "../../types/app.js";

type TodoListProps = {
  onDelete: (id: string) => void;
  tasks: TodoListItem[];
};

export const TodoList: FC<TodoListProps> = (props) => {
  const { onDelete, tasks } = props;
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <div>{task.text}</div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(task.id);
                  }}
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
