import { blogs } from "../public/blogs/blogs.js";
import { fetchBlogContent } from "./fetchBlogContent.js";

export const fetchBlogs = async ({offset = 0, limit = 2}) => {
  try {
    const indexedBlogs = blogs.slice(offset, (limit + offset));
    const responses = await Promise.all(
      indexedBlogs.map((response) => fetch(response))
    );

    const blogTexts = await Promise.all(
      responses.map((response) => response.text())
    );

    const blogData = blogTexts.map((text) => fetchBlogContent(text));

    const length = blogs.length;

    return {blogData, length};
  } catch (err) {
    console.log(err);
  }     
}
