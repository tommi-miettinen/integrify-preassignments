import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { Memes, Meme, Inputs } from "./types";
import Express from "./Express";

const App = () => {
  const [view, setView] = useState("memes");
  const [memes, setMemes] = useState<Memes>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [generatedMeme, setGeneratedMeme] = useState("");
  const [inputs, setInputs] = useState<Inputs>([]);

  useEffect(() => {
    if (!selectedMeme) {
      setGeneratedMeme("");
      return;
    }
    createTextInputs();
  }, [selectedMeme]);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    const res = await axios.get("https://api.memegen.link/templates");
    if (!res) return;
    setMemes(res.data);
  };

  const createTextInputs = () => {
    if (!selectedMeme) return;
    const lines = Array.from({ length: selectedMeme.lines }, (_, index) => ({ id: index, value: "" }));
    setInputs(lines);
  };

  const onInputChange = (value: string, inputId: number) =>
    setInputs((v) => v.map((item) => (item.id === inputId ? { ...item, value } : item)));

  const generateMeme = () => {
    const textLines = inputs.map((v) => v.value).join("/");
    const generatedMeme = `https://api.memegen.link/images/${selectedMeme!.id}/${textLines}/${selectedMeme!.id}.png`;
    setGeneratedMeme(generatedMeme);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="navbar bg-base-100">
        <div onClick={() => setView("express")} className="btn btn-ghost text-xl">
          Express
        </div>
        <div onClick={() => setView("memes")} className="btn btn-ghost text-xl">
          memes
        </div>
        <div onClick={() => setView("todoapp")} className="btn btn-ghost text-xl">
          todoapp
        </div>
      </div>
      {view === "memes" && (
        <div className="w-full h-full gap-2 flex flex-column justify-center">
          <section className="p-8 grid grid-cols-3 gap-8">
            {memes.map((meme) => {
              return (
                <div key={meme.id} className="card w-96 h-96 bg-base-100 shadow-xl">
                  <figure>
                    <img className="object-contain" src={meme.blank} alt={meme.name} loading="lazy" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{meme.name}</h2>
                    <div className="card-actions mt-auto">
                      <button onClick={() => setSelectedMeme(meme)} className="btn btn-primary w-full mt-auto">
                        Generate
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      )}
      {view === "express" && <Express />}
      <Modal onClose={() => setSelectedMeme(null)} visible={Boolean(selectedMeme)}>
        {selectedMeme && (
          <div className="card w-[500px] h-[600px] bg-base-100 shadow-xl">
            <figure>
              <img className="object-contain w-96 h-96" src={generatedMeme || selectedMeme!.blank} alt={selectedMeme!.name} />
            </figure>
            <div className="card-body flex flex-column">
              {inputs.map((input) => (
                <input
                  key={input.id}
                  onChange={(e) => onInputChange(e.target.value, input.id)}
                  value={input.value}
                  type="text"
                  className="input input-bordered w-full"
                />
              ))}
              <button onClick={generateMeme} className="btn btn-primary w-full mt-auto">
                Generate
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
