import { useState } from "react";
import Modal from "./Modal";
import { Todos } from "./types";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";

const StatusIndicator = ({ option }: { option: string }) => {
  if (option === "done") return <span className="w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />;
  if (option === "not started") return <span className="w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full" />;
  if (option === "started") return <span className="w-3.5 h-3.5 bg-yellow-500 border-2 border-white dark:border-gray-800 rounded-full" />;
};

const options = ["started", "not started", "done"];

const Todos = () => {
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState<Todos>([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<string>("not started");

  const addTodo = () => {
    setTodos((t) => [...t, { content: input, id: Math.random(), status, deadline }]);
    setInput("");
    setDeadline("");
    setStatus("not started");
    setOpen(false);
  };

  const deleteTodo = (todoId: number) => setTodos((t) => t.filter((t) => t.id !== todoId));

  return (
    <div className="h-full w-full flex flex-col items-center justify-center pt-16">
      <div className="bg-base-200 p-4 rounded-lg w-[500px]">
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <div className="flex items-center gap-2 bg-base-200 p-4 rounded-xl" key={todo.id}>
              <StatusIndicator option={todo.status} />
              <span>{todo.content}</span>
              <div className="ml-auto flex gap-2">
                <button>
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-4 w-full" onClick={() => setOpen(true)}>
          Add todo
        </button>
      </div>

      <Modal visible={open} onClose={() => setOpen(false)}>
        <div className="w-[500px] bg-base-200 rounded-2xl p-8">
          <input
            type="text"
            placeholder="Content"
            className="input input-bordered w-full mb-4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
          <button className="btn btn-primary mt-4 w-full" onClick={addTodo}>
            Add todo
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Todos;
