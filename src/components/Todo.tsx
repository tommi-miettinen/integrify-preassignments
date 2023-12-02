import { useState, Fragment } from "react";
import { Options, TodoProps } from "../types";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "./Modal";
import StatusIndicator from "./StatusIndicator";
import { options } from "../types";

const Todo = ({ todo, deleteTodo, editTodo }: TodoProps) => {
  const [content, setContent] = useState(todo.content);
  const [deadline, setDeadline] = useState(todo.deadline);
  const [status, setStatus] = useState(todo.status);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const inputsFilled = content && deadline && status;

  const handleEditTodo = () => {
    editTodo({ ...todo, content, deadline, status });
    setEditing(false);
  };

  return (
    <Fragment>
      <div className="flex items-center gap-4 bg-base-200 p-4 rounded-xl" key={todo.id}>
        <StatusIndicator status={todo.status} />
        <div className="flex flex-col">
          <span className="overflow-hidden text-md text-white">{todo.content}</span>
          <span className="overflow-hidden text-xs">{todo.deadline}</span>
        </div>
        <div className="ml-auto  flex gap-2">
          <button className="tooltip tooltip-left" data-tip="Edit" onClick={() => setEditing(true)}>
            <PencilIcon className="h-5 w-5" />
          </button>
          <button className="tooltip tooltip-left" data-tip="Delete" onClick={() => setDeleting(true)}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <Modal id={"edit-modal" + todo.id.toString()} visible={editing} onClose={() => setEditing(false)}>
        <div className="sm:w-[500px] bg-base-200 rounded-2xl p-8 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor={"edit-content" + todo.id.toString()}>Content</label>
            <input
              id={"edit-content" + todo.id.toString()}
              type="text"
              className="input input-bordered w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={"edit-deadline" + todo.id.toString()}>Deadline</label>
            <input
              id={"edit-deadline" + todo.id.toString()}
              type="text"
              className="input input-bordered w-full"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={"edit-status" + todo.id.toString()}>Status</label>
            <select
              id={"edit-status" + todo.id.toString()}
              className="capitalize select select-bordered w-[180px] mb-4"
              value={status}
              onChange={(e) => setStatus(e.target.value as Options)}
            >
              {options.map((option) => (
                <option className="capitalize" value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button disabled={!inputsFilled} className="btn btn-primary w-full" onClick={handleEditTodo}>
            Save changes
          </button>
        </div>
      </Modal>
      <Modal id={"delete-modal" + todo.id.toString()} visible={deleting} onClose={() => setDeleting(false)}>
        <div className="w-full sm:w-[500px]  bg-base-200 rounded-2xl p-8 gap-4 flex flex-col">
          <h2 className="text-xl">Delete Todo?</h2>
          <div className="mt-auto flex justify-end gap-2">
            <button onClick={() => setDeleting(false)} className="btn btn-neutral">
              Cancel
            </button>
            <button onClick={() => deleteTodo(todo.id)} className="btn btn-primary">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Todo;
