import { useState, useEffect } from "react";
import { Meme, Memes, Inputs } from "./types";
import Modal from "./Modal";
import axios from "axios";

const Memes = () => {
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
    <div>
      <div className="w-full h-full gap-2 flex flex-column justify-center pt-16">
        <section className="p-8 grid grid-cols-3 gap-8">
          {memes.map((meme) => {
            return (
              <div key={meme.id} className="card w-96 h-96 bg-base-100 shadow-xl grid grid-rows-3">
                <figure className="row-span-2 bg-red-900">
                  <img className="w-full scale-125" src={meme.blank} alt={meme.name} loading="lazy" />
                </figure>
                <div className="h-full  flex flex-col p-3">
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
      <Modal onClose={() => setSelectedMeme(null)} visible={Boolean(selectedMeme)}>
        {selectedMeme && (
          <div className="card w-[500px] h-[600px] bg-base-300 shadow-xl">
            <figure className="row-span-2 bg-red-900">
              <img className="object-fill" src={generatedMeme || selectedMeme!.blank} alt={selectedMeme!.name} />
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

export default Memes;
