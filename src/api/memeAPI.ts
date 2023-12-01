import axios from "axios";
import { Memes } from "../types";

const baseUrl = "https://api.memegen.link";

const fetchMemes = async (): Promise<Memes> => {
  const result = await axios.get<Memes>(`${baseUrl}/templates`);
  return result.data;
};

export default {
  fetchMemes,
};
