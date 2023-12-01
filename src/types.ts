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
  id: number;
  status: string;
  deadline: string;
};

export type TodoItems = TodoItem[];
