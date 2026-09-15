export const handleOpen = (component) => {
  component.clickCount++;
  if (component.clickCount >= 2) component.clickCount = 0;

  if (component.clickCount === 0) {
    const windowContainer = component
      .getRootNode()
      .querySelector(`#${component.getAttribute("window")}`)

    const titleBar = windowContainer
      .shadowRoot
      .querySelector('slot[name="title-bar"]')
      .assignedElements()[0];

    windowContainer.style.display = "block";
    windowContainer.style.zIndex = 10;

    titleBar
      .shadowRoot
      .querySelector(".title")
      .style.color = "#000000";
  }

  component.shadowRoot
    .querySelector(".title")
    .style.backgroundColor = `
      ${component.clickCount === 1 ? '#000000' : '#ffffff'}
    `;

  component.shadowRoot
    .querySelector(".title")
    .style.color = `
      ${component.clickCount === 1 ? '#ffffff' : '#000000'}
    `;
};
