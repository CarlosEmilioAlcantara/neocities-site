export const handleOpen = (component) => {
  component.clickCount++;
  if (component.clickCount >= 2) component.clickCount = 0;

  if (component.clickCount === 0) {
    component
      .getRootNode()
      .querySelector(`#${component.getAttribute("window")}`)
      .style.display = "block";
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
