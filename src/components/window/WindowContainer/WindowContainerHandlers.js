const handleClose = (component) => {
  component.style.display = "none";
  component.style.left = `${component.getAttribute("start-x")}px`;
  component.style.top = `${component.getAttribute("start-y")}px`;
  component.x = Number(component.getAttribute("start-x")) || 0;
  component.y = Number(component.getAttribute("start-y")) || 0;
}

const handleMinimize = (component, e) => {
  component.querySelector("window-content")
    .style.display = `${e.detail.visible ? "block" : "none"}`;
  
  component.style.height = `${!e.detail.visible ? "fit-content" : ""}`
  
  component.contentVisible = e.detail.visible;
};

const handleDragStart = (component, e) => {
  component.dragging = true;
  
  component.startX = e.detail.x;
  component.startY = e.detail.y;
  
  component.startWindowX = component.x;
  component.startWindowY = component.y;
  
  window.addEventListener("pointermove", component.onDrag);
  window.addEventListener("pointerup", component.onDragEnd);
};

const handleDrag = (component, e) => {
  if (!component.dragging || component.resizing) return;
  
  const dx = e.clientX - component.startX;
  const dy = e.clientY - component.startY;
  
  component.x = component.startWindowX + dx;
  component.y = component.startWindowY + dy;
  
  component.style.left = `${component.x}px`;
  component.style.top = `${component.y}px`;
};

const handleDragEnd = (component) => {
  component.dragging = false;
  
  window.removeEventListener("pointermove", component.onDrag);
  window.removeEventListener("pointerup", component.onDragEnd);
};

const handleResizeStart = (component, e) => {
  e.preventDefault();
  e.stopPropagation();
  
  if (!component.contentVisible) return;
  
  const rect = component.getBoundingClientRect();
  
  component.width = rect.width;
  component.height = rect.height;
  
  component.resizing = true;
  
  component.resizeDirection = e.currentTarget.dataset.resize;
  
  component.startX = e.clientX;
  component.startY = e.clientY;
  
  component.startWindowX = component.x;
  component.startWindowY = component.y;
  
  component.startWidth = component.width;
  component.startHeight = component.height;
  
  window.addEventListener("pointermove", component.onResize);
  window.addEventListener("pointerup", component.onResizeEnd);
};
  
const handleResize = (component, e) => {
  if (!component.resizing || component.dragging) return;
  
  const dx = e.clientX - component.startX;
  const dy = e.clientY - component.startY;
  
  let x = component.startWindowX;
  let y = component.startWindowY;
  let width = component.startWidth;
  let height = component.startHeight;
  
  if (component.resizeDirection.includes("e")) {
    width = component.startWidth + dx;
  }
  
  if (component.resizeDirection.includes("w")) {
    width = component.startWidth - dx;
    x = component.startWindowX + dx;
  }
  
  if (component.resizeDirection.includes("s")) {
    height = component.startHeight + dy;
  }
  
  if (component.resizeDirection.includes("n")) {
    height = component.startHeight - dy;
    y = component.startWindowY + dy;
  }
  
  const minWidth = 200;
  const minHeight = 100;
  
  if (width < minWidth) {
    if (component.resizeDirection.includes("w")) {
      x = component.startWindowX + component.startWidth - minWidth;
    }
  
    width = minWidth;
  }
  
  if (height < minHeight) {
    if (component.resizeDirection.includes("n")) {
      y = component.startWindowY + component.startHeight - minHeight;
    }
  
    height = minHeight;
  }
  
  component.x = x;
  component.y = y;
  component.width = width;
  component.height = height;
  
  component.style.left = `${component.x}px`;
  component.style.top = `${component.y}px`;
  component.style.width = `${component.width}px`;
  component.style.height = `${component.height}px`;
};

const handleResizeEnd = (component) => {
  component.resizing = false;
  
  window.removeEventListener("pointermove", component.onResize);
  window.removeEventListener("pointerup", component.onResizeEnd);
};

export {
  handleClose,
  handleMinimize,
  handleDragStart,
  handleDrag,
  handleDragEnd,
  handleResizeStart,
  handleResize,
  handleResizeEnd,
};
