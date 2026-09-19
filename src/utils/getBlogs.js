import { blogs } from "../public/blogs/blogs.js";

export const getBlogs = async ({offset = 0, limit = 2}) => {
  try {
    const indexedBlogs = blogs.slice(offset, (limit + offset));
    const responses = await Promise.all(
      indexedBlogs.map((response) => fetch(response))
    );

    return await Promise.all(
      responses.map((response) => response.json())
    );
  } catch (err) {
    console.log(err);
  }     
}
