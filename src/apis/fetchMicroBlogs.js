import { microBlogs } from "../public/microblogs/microBlogs.js";

export const fetchMicroBlogs = async ({offset = 0, limit = 2}) => {
  try {
    const indexedMicroBlogs = microBlogs.slice(offset, (limit + offset));
    const responses = await Promise.all(
      indexedMicroBlogs.map((response) => fetch(response))
    );

    const microBlogData = await Promise.all(
      responses.map((response) => response.json())
    );

    const length = microBlogs.length;

    return {microBlogData, length};
  } catch (err) {
    console.log(err);
  }     
}
