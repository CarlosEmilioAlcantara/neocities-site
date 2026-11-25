const handleOpen = (component) => {
  if (component.clickCount >= 2) component.clickCount = 0;

  if (component.clickCount === 0) {
    const filename = component
    .shadowRoot
    .querySelector(".filename");

    filename.style.color = "#000000";
  }
};

const handleIconFocus = (component) => {
  component.clickCount++;

  component.shadowRoot
    .querySelector(".filename")
    .style.backgroundColor = `
      ${component.clickCount === 1 ? '#000000' : '#ffffff'}
    `;

  component.shadowRoot
    .querySelector(".filename")
    .style.color = `
      ${component.clickCount === 1 ? '#ffffff' : '#000000'}
    `;
};

const handleIconUnfocus = (component, e) => {
  const insideIcon = e.composedPath().includes(component);

  if (!insideIcon) {
    if (component.clickCount > 0) component.clickCount--;

    component.shadowRoot
      .querySelector(".filename")
      .style.backgroundColor = "#ffffff";

    component.shadowRoot
      .querySelector(".filename")
      .style.color = "#000000";
  }
};

export { handleOpen, handleIconFocus, handleIconUnfocus };