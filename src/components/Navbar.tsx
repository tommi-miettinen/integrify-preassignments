import { Views } from "../types";

const Navbar = ({ view, setView }: { view: Views; setView: (view: Views) => void }) => {
  const activeStyle = "bg-primary text-black hover:text-neutral-content";

  return (
    <div className="navbar bg-base-100 p-4 gap-2 flex items-center justify-center sm:justify-start">
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
  );
};

export default Navbar;
