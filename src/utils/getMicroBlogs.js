import { microBlogs } from "../public/microblogs/microBlogs.js";

export const getMicroBlogs = async () => {
  try {
    const responses = await Promise.all(
      microBlogs.map((response) => fetch(response))
    );

    return await Promise.all(
      responses.map((response) => response.json())
    );
  } catch (err) {
    console.log(err);
  }     
}
