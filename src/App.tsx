import { useState } from "react";

import Express from "./views/Express";
import Todos from "./views/Todos";
import Memes from "./views/Memes";

enum Views {
  Memes = "memes",
  Todos = "todos",
  Express = "express",
}

const App = () => {
  const [view, setView] = useState(Views.Memes);

  return (
    <div className="min-h-screen h-screen w-full flex flex-col bg-base-300">
      <div className="navbar bg-base-100 fixed top-0 z-10 gap-2 flex items-center justify-center sm:justify-start">
        <div onClick={() => setView(Views.Express)} className="btn btn-ghost text-xl">
          Express
        </div>
        <div onClick={() => setView(Views.Memes)} className="btn btn-ghost text-xl">
          Memes
        </div>
        <div onClick={() => setView(Views.Todos)} className="btn btn-ghost text-xl">
          Todos
        </div>
      </div>
      {view === Views.Memes && <Memes />}
      {view === Views.Express && <Express />}
      {view === Views.Todos && <Todos />}
    </div>
  );
};

export default App;
