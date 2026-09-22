import { useState, type FC } from "react";

type TodoFormProps = {
  onSubmit: (text: string) => void;
};

export const TodoForm: FC<TodoFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(text);
        setText("");
      }}
    >
      <input
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};
