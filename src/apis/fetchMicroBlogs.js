import { 
  microBlogsHome, 
  microBlogsRolling 
} from "../public/microblogs/microBlogs.js";
import { fetchAPI } from "./fetchAPI.js";

export const fetchMicroBlogs = async ({rolling = false}) => {
  try {
    const microBlogs = 
      rolling 
        ? microBlogsRolling
        : microBlogsHome;

    const data = await fetchAPI(microBlogs, true);
    return data;
  } catch (err) {
    console.log(err);
  }     
}
