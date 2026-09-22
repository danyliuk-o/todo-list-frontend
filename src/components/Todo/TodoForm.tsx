"use client";

import { useState, type FC } from "react";

type TodoFormProps = {
  onSubmit: (text: string) => void;
};

export const TodoForm: FC<TodoFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState<string>("");

  return (
    <form
      className="flex justify-center gap-2"
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
        className="rounded border border-border px-3 py-2"
      />
      <button
        type="submit"
        className="rounded border border-border px-4 py-2"
      >
        Add
      </button>
    </form>
  );
};
