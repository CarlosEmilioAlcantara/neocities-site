const restorePositionDimension = async (component, windowPrev, window) => {
  const windowCur = component
    .shadowRoot
    .querySelector(window);

  await customElements.whenDefined("window-container");
  const activeWindow = windowCur.getRootNode().querySelector("[active]");
  const isFocused = windowPrev.hasAttribute("focused");

  if (activeWindow) {
    const activeTitle = activeWindow
      .shadowRoot
      .querySelector('slot[name="title-bar"]')
      .assignedElements()[0]
      .shadowRoot
      .querySelector(".title");
    
      activeTitle.style.color = "#b5b5b5";
  }

  const title = windowCur
    .shadowRoot
    .querySelector('slot[name="title-bar"]')
    .assignedElements()[0]
    .shadowRoot
    .querySelector(".title");

  if (isFocused) {
    windowCur.removeAttribute("active");
    windowCur.setAttribute("focused", "");
    title.style.color = "#000000";
  }

  windowCur.style.display = windowPrev.style.display;
  windowCur.style.left = windowPrev.style.left;
  windowCur.style.top = windowPrev.style.top;
  windowCur.style.width = windowPrev.style.width;
  windowCur.style.height = windowPrev.style.height;
  windowCur.x = windowPrev.x;
  windowCur.y = windowPrev.y;
}

export { restorePositionDimension };
