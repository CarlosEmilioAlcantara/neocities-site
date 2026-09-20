import { blogs } from "../public/blogs/blogs.js";

export const fetchBlogs = async ({offset = 0, limit = 2}) => {
  try {
    const indexedBlogs = blogs.slice(offset, (limit + offset));
    const responses = await Promise.all(
      indexedBlogs.map((response) => fetch(response))
    );

    const blogData = await Promise.all(
      responses.map((response) => response.json())
    );

    const length = blogs.length;

    return {blogData, length};
  } catch (err) {
    console.log(err);
  }     
}
