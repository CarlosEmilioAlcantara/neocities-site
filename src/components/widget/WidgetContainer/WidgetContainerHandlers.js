import { getWindowWidth } from "../../../utils/viewport/getWindowWidth.js";
import { getWindowHeight } from "../../../utils/viewport/getWindowHeight.js";

const windowWidth = getWindowWidth();
const windowHeight = getWindowHeight();

const handleDragStart = (component, e) => {
  component.startX = e.detail.x;
  component.startY = e.detail.y;
  
  component.startWindowX = component.x;
  component.startWindowY = component.y;
  
  window.addEventListener("pointermove", component.onDrag);
  window.addEventListener("pointerup", component.onDragEnd);
};

const handleDrag = (component, e) => {
  if ((e.clientX <= 0) || (e.clientX >= windowWidth)) {
    return;
  } else if ((e.clientX >= 1) || (e.clientX <= windowWidth)) {
    const dx = e.clientX - component.startX;
    component.x = component.startWindowX + dx;
    component.style.left = `${component.x}px`;
  }

  if ((e.clientY <= 0) || (e.clientY >= windowHeight)) {
    return;
  } else if ((e.clientY >= 1) || (e.clientY <= windowHeight)) {
    const dy = e.clientY - component.startY;
    component.y = component.startWindowY + dy;
    component.style.top = `${component.y}px`;
  }
};

const handleDragEnd = (component) => {
  window.removeEventListener("pointermove", component.onDrag);
  window.removeEventListener("pointerup", component.onDragEnd);
};

export { handleDragStart, handleDrag, handleDragEnd };
