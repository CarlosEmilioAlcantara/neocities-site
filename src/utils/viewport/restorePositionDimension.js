const restorePositionDimension = (component, window) => {
  const windowPrev = component
    .shadowRoot
    .querySelector(window);

  component.render();

  const windowCur = component
    .shadowRoot
    .querySelector(window);

  windowCur.style.left = windowPrev.style.left;
  windowCur.style.top = windowPrev.style.top;
  windowCur.style.width = windowPrev.style.width;
  windowCur.style.height = windowPrev.style.height;
  windowCur.x = windowPrev.x;
  windowCur.y = windowPrev.y;
}

export {restorePositionDimension};
