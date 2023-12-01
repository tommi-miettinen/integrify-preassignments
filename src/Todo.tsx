import { useState } from "react";
import { TodoItem } from "./types";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "./Modal";

const StatusIndicator = ({ status }: { status: string }) => {
  if (status === "done") return <span className="w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />;
  if (status === "not started") return <span className="w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full" />;
  if (status === "started") return <span className="w-3.5 h-3.5 bg-yellow-500 border-2 border-white dark:border-gray-800 rounded-full" />;
};

const options = ["not started", "started", "done"];

const Todo = ({
  todo,
  deleteTodo,
  editTodo,
}: {
  todo: TodoItem;
  deleteTodo: (todoId: number) => void;
  editTodo: (todo: TodoItem) => void;
}) => {
  const [content, setContent] = useState(todo.content);
  const [deadline, setDeadline] = useState(todo.deadline);
  const [status, setStatus] = useState(todo.status);

  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 bg-base-200 p-4 rounded-xl" key={todo.id}>
        <StatusIndicator status={todo.status} />
        <span>{todo.content}</span>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setEditing(true)}>
            <PencilIcon className="h-5 w-5" />
          </button>
          <button onClick={() => setDeleting(true)}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <Modal id={"edit-modal" + todo.id.toString()} visible={editing} onClose={() => setEditing(false)}>
        <div className="sm:w-[500px] bg-base-200 rounded-2xl p-8">
          <input
            type="text"
            placeholder="Content"
            className="input input-bordered w-full mb-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="text"
            placeholder="Deadline"
            className="input input-bordered w-full mb-4"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <select className="capitalize  select select-bordered w-full mb-4" value={status} onChange={(e) => setStatus(e.target.value)}>
            {options.map((option) => (
              <option className="capitalize" value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <button className="btn btn-primary mt-4 w-full" onClick={() => {}}>
            Save changes
          </button>
        </div>
      </Modal>
      <Modal id={"delete-modal" + todo.id.toString()} visible={deleting} onClose={() => setDeleting(false)}>
        <div className="w-full sm:w-[500px]  bg-base-200 rounded-2xl p-8 gap-4 flex flex-col">
          <h2 className="text-xl">Delete Todo?</h2>
          <div className="mt-auto flex justify-end gap-2">
            <button onClick={() => setDeleting(false)} className="btn btn-outline">
              Cancel
            </button>
            <button onClick={() => deleteTodo(todo.id)} className="btn btn-primary">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Todo;
