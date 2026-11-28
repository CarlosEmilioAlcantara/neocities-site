export const fetchAPI = async (items, json = false) => {
  try {
    const responses = await Promise.all(
      items.map((response) => fetch(response))
    );

    const data = await Promise.all(
      responses.map((response) => 
        (json) ? response.json() : response.text())
    );

    return data;
  } catch (err) {
    console.log(err);
  }     
}
