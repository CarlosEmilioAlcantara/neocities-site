export const handleOpen = (component) => {
  component.clickCount++;
  if (component.clickCount >= 2) component.clickCount = 0;

  if (component.clickCount === 0) {
    const window = component
      .getRootNode()
      .querySelector(`#${component.getAttribute("window")}`)

    const titleBar = window
      .shadowRoot
      .querySelector('slot[name="title-bar"]')
      .assignedElements()[0];

    window.style.display = "block";

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
