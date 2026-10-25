import { 
  microBlogsHome, 
  microBlogsRolling 
} from "../public/microblogs/microBlogs.js";

export const fetchMicroBlogs = async ({
  offset = 0, 
  limit = 2, 
  rolling = false,
}) => {
  try {
    const indexedMicroBlogs = 
      rolling 
        ? microBlogsRolling
        : microBlogsHome.slice(offset, (limit + offset));

    const responses = await Promise.all(
      indexedMicroBlogs.map((response) => fetch(response))
    );

    const microBlogData = await Promise.all(
      responses.map((response) => response.json())
    );

    const length = rolling ? microBlogsRolling.length : microBlogsHome.length;

    return {microBlogData, length};
  } catch (err) {
    console.log(err);
  }     
}
