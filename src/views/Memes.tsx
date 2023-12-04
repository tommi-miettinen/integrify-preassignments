import { useState, useEffect, Fragment } from "react";
import { Meme, Memes, Inputs } from "../types";
import Modal from "../components/Modal";
import { useQuery } from "@tanstack/react-query";
import { ClipboardDocumentListIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import memeAPI from "../api/memeAPI";

const createTextInputs = (count: number) => Array.from({ length: count }, (_, index) => ({ id: index, value: "" }));

const Memes = () => {
  const { data, isLoading } = useQuery<Memes>({ queryKey: ["memes"], queryFn: memeAPI.fetchMemes });
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [generatedMeme, setGeneratedMeme] = useState("");
  const [inputs, setInputs] = useState<Inputs>([]);
  const [filter, setFilter] = useState("");
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!selectedMeme) {
      setGeneratedMeme("");
      return;
    }
    setInputs(createTextInputs(selectedMeme.lines));
  }, [selectedMeme]);

  const inputsFilled = inputs.every((v) => v.value);

  const filteredMemes =
    data?.filter((meme) => meme.name.toLowerCase().replace(/\s+/g, "").includes(filter.toLowerCase().replace(/\s+/g, ""))) || [];

  const onInputChange = (value: string, inputId: number) =>
    setInputs((v) => v.map((item) => (item.id === inputId ? { ...item, value } : item)));

  const generateMeme = () => {
    const textLines = inputs.map((v) => v.value).join("/");
    const generatedMeme = `https://api.memegen.link/images/${selectedMeme!.id}/${textLines}/${selectedMeme!.id}.png`;
    setGeneratedMeme(generatedMeme);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedMeme);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setCopied(false);
    }, 2000);
  };

  return (
    <Fragment>
      <div className="w-full h-full overflow-auto gap-2 flex flex-col items-center">
        {isLoading && <span className="w-14 h-14 loading loading-spinner text-primary m-auto" />}
        {!isLoading && (
          <div className="flex flex-col">
            <div className="flex flex-col p-8 pb-0 w-full sm:w-[500px] m-auto">
              <input
                placeholder="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                type="text"
                className="input input-bordered w-full"
              />
            </div>
            <section className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMemes.map((meme) => {
                return (
                  <div key={meme.id} className="card w-full h-[350px] sm:w-80  bg-base-100 shadow-xl flex flex-col">
                    <figure className="min-h-[200px]">
                      <img className="w-full object-fit scale-125" src={meme.blank} alt={meme.name} loading="lazy" />
                    </figure>
                    <div className="flex flex-col gap-2 p-4 h-full">
                      <h2 className="card-title text-lg">{meme.name}</h2>
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
      </div>
      <Modal id="generate-meme-modal" onClose={() => setSelectedMeme(null)} visible={Boolean(selectedMeme)}>
        <Fragment>
          {selectedMeme && (
            <div className="card w-screen sm:min-w-[500px] max-w-[500px]  max-h-screen bg-base-300 shadow-xl overflow-auto">
              <figure className="bg-black">
                <img className="max-h-96 object-scale-down" src={generatedMeme || selectedMeme!.blank} alt={selectedMeme!.name} />
              </figure>
              <div className="flex flex-col p-4 gap-4">
                {generatedMeme && (
                  <div className="input input-bordered w-full flex items-center justify-between max-w-full">
                    <span className="truncate">{generatedMeme}</span>
                    <div className="cursor-pointer">
                      {copied ? (
                        <ClipboardDocumentCheckIcon className="h-[24px] w-[24px] text-green-400" />
                      ) : (
                        <ClipboardDocumentListIcon onClick={copyToClipboard} className="h-[24px] w-[24px]" />
                      )}
                    </div>
                  </div>
                )}
                {inputs.map((input) => (
                  <div>
                    <input
                      placeholder={(input.id + 1).toString()}
                      key={input.id}
                      onChange={(e) => onInputChange(e.target.value, input.id)}
                      value={input.value}
                      type="text"
                      className="input input-bordered w-full"
                    />
                  </div>
                ))}
                <button disabled={!inputsFilled} onClick={generateMeme} className="btn btn-primary w-full mt-auto">
                  Generate
                </button>
              </div>
            </div>
          )}
          {showToast && (
            <div className="toast toast-top toast-center">
              <div className="alert  bg-base-100">
                <span>Copied to clipboard</span>
              </div>
            </div>
          )}
        </Fragment>
      </Modal>
    </Fragment>
  );
};

export default Memes;
