export const fetchAPI = async (items) => {
  try {
    const responses = await Promise.all(
      items.map((response) => fetch(response))
    );

    const data = await Promise.all(
      responses.map((response) => response.text())
    );

    const blogData = blogTexts.map((text) => fetchBlogContent(text));

    return blogData;
  } catch (err) {
    console.log(err);
  }     
}
