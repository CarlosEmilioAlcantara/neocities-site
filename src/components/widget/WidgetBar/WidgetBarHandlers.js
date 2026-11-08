const handleDrag = (component, e) => {
  if (e.button !== 0) return;

  component.dispatchEvent(
    new CustomEvent("widget-drag", {
      bubbles: true,
      composed: true,
      detail: {
        x: e.clientX,
        y: e.clientY,
      },
    })
  );
};

export { handleDrag };
