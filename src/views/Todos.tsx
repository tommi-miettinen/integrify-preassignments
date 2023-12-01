import { useState } from "react";
import Modal from "../Modal";
import { TodoItems } from "../types";
import Todo from "../Todo";

const options = ["not started", "started", "done"];

const Todos = () => {
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState<TodoItems>([]);
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
      <div className="bg-base-200 p-4 rounded-lg w-full sm:w-[450px] h-full sm:h-[600px] flex flex-col overflow-auto">
        <div className="flex flex-col gap-2 overflow-auto h-full">
          {todos.map((todo) => (
            <Todo key={todo.id} editTodo={() => {}} deleteTodo={deleteTodo} todo={todo} />
          ))}
        </div>
        <button className="btn btn-primary mt-4 w-full" onClick={() => setOpen(true)}>
          Add todo
        </button>
      </div>
      <Modal id="add-todo-modal" visible={open} onClose={() => setOpen(false)}>
        <div className="sm:w-[500px] bg-base-200 rounded-2xl p-8">
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
