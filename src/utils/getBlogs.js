import { blogs } from "../blogs/blogs.js";

export const getBlogs = async () => {
  try {
    const responses = await Promise.all(
      blogs.map((response) => fetch(response))
    );

    return await Promise.all(
      responses.map((response) => response.json())
    );
  } catch (err) {
    console.log(err);
  }     
}
