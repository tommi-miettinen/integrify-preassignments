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
