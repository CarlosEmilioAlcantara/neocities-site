const fetchBlogContent = (text) => {
  const parsedFile = new DOMParser().parseFromString(text, 'text/html');

  const description = 
    parsedFile.querySelector("meta[name=description]").content;
  const date = parsedFile.querySelector(".date").innerHTML;
  const title = parsedFile.querySelector(".header").innerHTML;
  const image = parsedFile.querySelector(".banner-image").src;
  const imageAlt = parsedFile.querySelector(".banner-image").alt;
  const content = parsedFile.querySelector(".content");
  const contentArr = 
    Array.from(content.children, element => element.outerHTML);
  const link = parsedFile.querySelector(".header").href;

  return {
    "date": date,
    "image": image,
    "imageAlt": imageAlt,
    "title": title,
    "description": description,
    "content": contentArr,
    "link": String(link),
  };
}

export { fetchBlogContent };
