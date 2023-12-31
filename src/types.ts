export type Meme = {
  id: string;
  name: string;
  blank: string;
  lines: number;
  overlays: number;
};

export type Memes = Meme[];

export type Input = {
  id: number;
  value: string;
};

export type Inputs = Input[];

export type TodoItem = {
  content: string;
  id: string;
  status: TodoStatusOptions;
  deadline: string;
};

export type TodoItems = TodoItem[];

export enum TodoStatusOptions {
  NotStarted = "not started",
  Started = "started",
  Done = "done",
}

export enum Views {
  Memes = "memes",
  Todos = "todos",
  Express = "express",
}

export interface TodoProps {
  todo: TodoItem;
  deleteTodo: (todoId: string) => void;
  editTodo: (todo: TodoItem) => void;
}

export const todoStatusOptions = [TodoStatusOptions.NotStarted, TodoStatusOptions.Started, TodoStatusOptions.Done];
