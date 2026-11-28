import { files } from "../public/files/files.js";
import { fetchAPI } from "./fetchAPI.js";

export const fetchFiles = async () => {
  try {
    const data = await fetchAPI(files, true);
    return data;
  } catch (err) {
    console.log(error);
  }
}
