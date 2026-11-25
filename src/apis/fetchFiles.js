import { files } from "../public/files/files.js";

export const fetchFiles = async () => {
  try {
    const responses = await Promise.all(
      files.map((response) => fetch(response))
    )

    const fileData = await Promise.all(
      responses.map((response) => response.json())
    )

    return fileData;
  } catch (err) {
    console.log(error);
  }
}