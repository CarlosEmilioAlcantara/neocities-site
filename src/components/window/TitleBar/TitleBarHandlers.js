const handleClose = (component) => {
  component.dispatchEvent(
    new CustomEvent("window-close", {
      bubbles: true,
      composed: true,
    })
  );
};

const handleDrag = (component, e) => {
  if (e.button !== 0) return;
  
  component.dispatchEvent(
    new CustomEvent("window-drag", {
      bubbles: true,
      composed: true,
      detail: {
        x: e.clientX,
        y: e.clientY,
      },
    })
  );
};

const handleMinimize = (component) => {
  component.dispatchEvent(
    new CustomEvent("window-minimize", {
      bubbles: true,
      composed: true,
      detail: {
        visible: !component.contentVisible,
      },
    })
  );
  
  component.contentVisible = !component.contentVisible;
  
  if (!component.contentVisible) {
    component.shadowRoot
      .querySelector(".minimize-button")
      .style.transform = "rotate(180deg)";
  } else {
    component.shadowRoot
      .querySelector(".minimize-button")
      .style.transform = "rotate(360deg)";
  }
};

export { handleClose, handleDrag, handleMinimize };
