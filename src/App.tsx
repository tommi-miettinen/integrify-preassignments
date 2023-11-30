import { useState } from "react";

import Express from "./Express";
import Todos from "./Todos";
import Memes from "./Memes";

const App = () => {
  const [view, setView] = useState("memes");

  return (
    <div className="h-screen w-full flex flex-col bg-base-300 overflow-auto">
      <div className="navbar bg-base-100 fixed top-0 z-10 gap-2">
        <div onClick={() => setView("express")} className="btn btn-ghost text-xl">
          Express
        </div>
        <div onClick={() => setView("memes")} className="btn btn-ghost text-xl">
          Memes
        </div>
        <div onClick={() => setView("todoapp")} className="btn btn-ghost text-xl">
          Todos
        </div>
      </div>
      {view === "memes" && <Memes />}
      {view === "express" && <Express />}
      {view === "todoapp" && <Todos />}
    </div>
  );
};

export default App;
