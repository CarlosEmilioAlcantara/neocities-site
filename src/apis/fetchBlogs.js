import { blogs } from "../public/blogs/blogs.js";
import { getBlogContent } from "../utils/data/getBlogContent.js";
import { fetchAPI } from "./fetchAPI.js";

export const fetchBlogs = async () => {
  try {
    const text = await fetchAPI(blogs);
    const data = text.map((text) => getBlogContent(text));
    return data;
  } catch (err) {
    console.log(err);
  }     
}
