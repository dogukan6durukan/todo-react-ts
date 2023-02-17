import React from "react";
import { useRef, useState } from "react";

interface TODO_RESULT {
  id: string;
  title: string;
}

export default function Form({
  todo,
}: {
  todo: (result: TODO_RESULT) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState<boolean>(false);

  const todoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef!.current!.value;
    if (input !== "") {
      const object = {
        id: crypto.randomUUID(),
        title: input,
      };
      todo(object);
      inputRef!.current!.value = "";
      setFormState(false);
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value !== "" ? setFormState(true) : setFormState(false);
  };

  return (
    <form onSubmit={todoHandler} className="space-y-3">
      <h1 className="text-3xl text-center pb-12">Todo App</h1>
      <div className="space-y-2">
        <input
          ref={inputRef}
          onChange={inputChangeHandler}
          type="text"
          className="bg-slate-800 text-white w-full block py-2 px-3 rounded focus:outline-none"
          placeholder="Add a task..."
        />
      </div>

      <button
        className={`${
          formState ? "bg-opacity-100 hover:scale-90" : "bg-opacity-30"
        } bg-slate-500  duration-200 px-8 py-0.5 rounded-full`}
        disabled={formState ? false : true}
      >
        Add
      </button>
    </form>
  );
}
