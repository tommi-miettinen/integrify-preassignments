import { useState } from "react";
import Express from "./views/Express";
import Todos from "./views/Todos";
import Memes from "./views/Memes";
import Navbar from "./components/Navbar";
import { Views } from "./types";

const App = () => {
  const [view, setView] = useState(Views.Memes);

  return (
    <div className="h-screen flex flex-col bg-base-300">
      <Navbar view={view} setView={setView} />
      <div className="h-full w-full flex flex-col bg-base-300 overflow-auto">
        {view === Views.Memes && <Memes />}
        {view === Views.Express && <Express />}
        {view === Views.Todos && <Todos />}
      </div>
    </div>
  );
};

export default App;
