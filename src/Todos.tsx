import { useState } from "react";
import Modal from "./Modal";

interface Todo {
  content: string;
  id: number;
  status: string;
  deadline: string;
}
const options = ["started", "not started", "done"];

const optionColors: Record<string, string> = {
  started: "yellow",
  done: "green",
  "not started": "red",
};

const Todos = () => {
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  const addTodo = () => {
    setTodos((t) => [...t, { content: input, id: Math.random(), status, deadline }]);
    setInput("");
    setDeadline("");
    setStatus("");
    setOpen(false);
  };

  const deleteTodo = (todoId: number) => setTodos((t) => t.filter((t) => t.id !== todoId));

  return (
    <div className="h-full w-full flex flex-col items-center justify-center pt-16">
      <div className="bg-base-300 p-4 rounded-lg w-[500px]">
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <div onClick={() => deleteTodo(todo.id)} className="flex items-center gap-2 bg-base-200 p-4 rounded-xl" key={todo.id}>
              <span className="w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
              <span>{todo.content}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-4 w-full" onClick={() => setOpen(true)}>
          Add todo
        </button>
      </div>

      <Modal visible={open} onClose={() => setOpen(false)}>
        <div className="bg-base-200 rounded-2xl p-8">
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
          <select className="select select-bordered w-full mb-4" value={status} onChange={(e) => setStatus(e.target.value)}>
            {options.map((option) => (
              <option value={option} key={option}>
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
