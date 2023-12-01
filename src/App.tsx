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

  const activeStyle = "bg-primary text-black hover:text-neutral-content";

  return (
    <div className="h-screen flex flex-col bg-base-300">
      <div className="navbar bg-base-100 p-4 gap-3 flex items-center justify-center sm:justify-start">
        <div onClick={() => setView(Views.Express)} className={`btn btn-ghost text-lg ${view === Views.Express && activeStyle}`}>
          Express
        </div>
        <div onClick={() => setView(Views.Memes)} className={`btn btn-ghost text-lg ${view === Views.Memes && activeStyle}`}>
          Memes
        </div>
        <div onClick={() => setView(Views.Todos)} className={`btn btn-ghost text-lg ${view === Views.Todos && activeStyle}`}>
          Todos
        </div>
      </div>
      <div className="h-full w-full flex flex-col bg-base-300 overflow-auto">
        {view === Views.Memes && <Memes />}
        {view === Views.Express && <Express />}
        {view === Views.Todos && <Todos />}
      </div>
    </div>
  );
};

export default App;
