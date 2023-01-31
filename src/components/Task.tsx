import React, { useState, useRef } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface TODO_RESULT {
  id: string;
  title: string;
}

interface Props {
  title: string;
  id: string;
  deletedTask: (id: string) => void;
  updatedTask: (result: TODO_RESULT) => void;
}

export default function Task(props: Props) {
  const [checked, setChecked] = useState<boolean>(false);
  const [updateTab, setUpdateTap] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<boolean>(false);
  const [UpdateFormState, setUpdateFormState] = useState<boolean>(false);

  const inputIdRef = useRef<HTMLInputElement>(null);
  const updatedItemRef = useRef<HTMLInputElement>(null);

  const deleteHandler = (e: React.MouseEvent) => {
    const id = inputIdRef!.current!.value;
    props.deletedTask(id);
  };

  const updateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = inputIdRef!.current!.value;
    const title = updatedItemRef!.current!.value;

    if (id !== "" && title !== "") {
      const result: TODO_RESULT = {
        id: id,
        title: title,
      };
      props.updatedTask(result);
      updatedItemRef!.current!.value = "";
      setUpdateFormState(false);
      setUpdateTap(false);
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value !== "" ? setUpdateFormState(true) : setUpdateFormState(false);
  };

  return (
    <div>
      <div className="relative todo_card  py-8 px-1 border-slate-500 flex items-center justify-between">
        <div className="space-x-2">
          <input ref={inputIdRef} type="hidden" value={props.id} />
          <input
            type="checkbox"
            className="bg-slate-700 w-4 h-4 p-5 accent-slate-500"
            onClick={() => (checked ? setChecked(false) : setChecked(true))}
          />
          <span className={`${checked ? "line-through" : "no-underline"}`}>
            {props.title}
          </span>
        </div>

        <div
          className={
            activeTab
              ? "block absolute right-0 top-16 z-10 bg-slate-600 rounded"
              : "hidden"
          }
        >
          <ul className=" [&>li]:border-slate-400 px-2 [&>li]:py-1.5">
            <li className="hover:text-blue-400">
              <button
                onClick={() =>
                  updateTab ? setUpdateTap(false) : setUpdateTap(true)
                }
              >
                Update Task <MdModeEdit className="inline-block mb-1" />
              </button>
            </li>
            <li className="hover:text-red-400">
              <button onClick={deleteHandler}>
                Delete Task <MdDelete className="inline-block mb-1" />
              </button>
            </li>
          </ul>
        </div>

        <button
          onClick={() => (activeTab ? setActiveTab(false) : setActiveTab(true))}
          className="text-2xl"
        >
          ...
        </button>
      </div>

      {updateTab && (
        <form className="space-y-2" onSubmit={updateHandler}>
          <input
            type="text"
            ref={updatedItemRef}
            onChange={inputChangeHandler}
            className="bg-slate-800 text-white w-full block py-2 px-3 rounded focus:outline-none"
            placeholder="Updated task name..."
          />
          <button
            className={`${
              UpdateFormState ? "bg-opacity-100 hover:scale-90" : "bg-opacity-30"
            } bg-slate-500  duration-200 px-8 py-0.5 rounded-full`}
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
}
