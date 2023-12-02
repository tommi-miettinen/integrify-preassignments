import { useState, useEffect, Fragment } from "react";
import Modal from "../components/Modal";
import { TodoItem, TodoItems, Options } from "../types";
import Todo from "../components/Todo";
import { v4 as uuid } from "uuid";
import { options } from "../types";

const loadTodosFromLocalStorage = () => (localStorage.todos ? JSON.parse(localStorage.todos) : []);

const Todos = () => {
  const [addingTodo, setAddingTodo] = useState(false);
  const [todos, setTodos] = useState<TodoItems>(loadTodosFromLocalStorage());
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<Options>(options[0]);

  const inputsFilled = content && deadline && status;

  useEffect(() => {
    localStorage.todos = JSON.stringify(todos);
  }, [todos]);

  const addTodo = () => {
    setTodos((t) => [...t, { content, id: uuid(), status, deadline }]);
    setContent("");
    setDeadline("");
    setStatus(options[0]);
    setAddingTodo(false);
  };

  const deleteTodo = (todoId: string) => setTodos((todos) => todos.filter((t) => t.id !== todoId));
  const editTodo = (todo: TodoItem) => setTodos((todos) => todos.map((t) => (t.id === todo.id ? todo : t)));

  return (
    <Fragment>
      <div className="h-full w-full flex flex-col items-center xl:p-16">
        <div className="bg-base-200 p-4 rounded-lg w-full xl:w-[450px] h-full flex flex-col overflow-auto">
          <div className="flex flex-col gap-2 overflow-auto h-full">
            {todos.map((todo) => (
              <Todo key={todo.id} editTodo={editTodo} deleteTodo={deleteTodo} todo={todo} />
            ))}
          </div>
          <button className="btn btn-primary mt-4 w-full" onClick={() => setAddingTodo(true)}>
            Add todo
          </button>
        </div>
      </div>
      <Modal id="add-todo-modal" visible={addingTodo} onClose={() => setAddingTodo(false)}>
        <div className="w-screen sm:w-[500px] bg-base-200 rounded-2xl p-8 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="content">Content</label>
            <input
              id="content"
              type="text"
              className="input input-bordered w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="deadline">Deadline</label>
            <input
              id="deadline"
              type="text"
              className="input input-bordered w-full"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              className="capitalize select select-bordered w-full mb-4"
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
          <button disabled={!inputsFilled} className="btn btn-primary w-full" onClick={addTodo}>
            Add todo
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Todos;
