export const handleOpen = (component) => {
  const page = document.documentElement
    .querySelector("home-page");

  const blogWindow = page
    .shadowRoot
    .querySelector("blog-window");

  blogWindow.setAttribute("title", component.getAttribute("title"));
  blogWindow.setAttribute("date", component.getAttribute("date"));
  blogWindow.setAttribute("image", component.getAttribute("image"));
  blogWindow.setAttribute("image-alt", component.getAttribute("image-alt"));
  blogWindow.setAttribute("content", component.getAttribute("content"));
  blogWindow.removeAttribute("closed");

  const windowContainer = blogWindow
    .shadowRoot
    .querySelector("window-container");

  const titleBar = windowContainer
    .shadowRoot
    .querySelector('slot[name="title-bar"]')
    .assignedElements()[0];

  windowContainer.style.display = "block";

  titleBar
    .shadowRoot
    .querySelector(".title")
    .style.color = "#000000";
}
