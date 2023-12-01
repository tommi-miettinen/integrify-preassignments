import { useState, useEffect, Fragment } from "react";
import { Meme, Memes, Inputs } from "../types";
import Modal from "../components/Modal";
import { useQuery } from "@tanstack/react-query";
import memeAPI from "../api/memeAPI";

const Memes = () => {
  const { data, isLoading } = useQuery<Memes>({ queryKey: ["memes"], queryFn: memeAPI.fetchMemes });
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
    <Fragment>
      <div className="w-full h-full overflow-auto gap-2 flex flex-col items-center">
        {isLoading && <span className="w-14 h-14 loading loading-spinner text-primary m-auto" />}
        <section className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {!isLoading &&
            data?.map((meme: Meme) => {
              return (
                <div key={meme.id} className="card w-full max-h-96 sm:w-80 sm:h-80 bg-base-100 shadow-xl grid grid-rows-3">
                  <figure className="row-span-2">
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

      <Modal id="generate-meme-modal" onClose={() => setSelectedMeme(null)} visible={Boolean(selectedMeme)}>
        {selectedMeme && (
          <div className="card w-screen sm:min-w-[500px] max-w-[500px]  max-h-screen bg-base-300 shadow-xl overflow-auto">
            <figure className="bg-black">
              <img className="max-h-96 object-contain" src={generatedMeme || selectedMeme!.blank} alt={selectedMeme!.name} />
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
    </Fragment>
  );
};

export default Memes;
