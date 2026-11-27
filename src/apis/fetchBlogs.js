import { blogs } from "../public/blogs/blogs.js";
import { fetchBlogContent } from "./fetchBlogContent.js";

export const fetchBlogs = async () => {
  try {
    const responses = await Promise.all(
      blogs.map((response) => fetch(response))
    );

    const blogTexts = await Promise.all(
      responses.map((response) => response.text())
    );

    const blogData = blogTexts.map((text) => fetchBlogContent(text));

    return blogData;
  } catch (err) {
    console.log(err);
  }     
}
