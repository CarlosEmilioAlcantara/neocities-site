import { paginateNext } from "./paginateNext.js";
import { paginatePrev } from "./paginatePrev.js";
import { 
  restorePositionDimension 
} from "../viewport/restorePositionDimension.js";

const handlePaginateNext = async (
  component, 
  offset, 
  dict, 
  getFunc, 
  window,
  windows
) => {
  await paginateNext(component, offset, dict, getFunc);

  const previousWindows = windows.map((window) => {
    return component
      .shadowRoot
      .querySelector(window);
  });

  component.render();

  for (let i = 0; i < windows.length; i++) {
    restorePositionDimension(component, previousWindows[i], windows[i]);
  }

  component.shadowRoot
    .querySelector(window)
    .style.zIndex = 10;

  component.attachButtonActions();
}

const handlePaginatePrev = async (
  component, 
  offset, 
  dict, 
  getFunc, 
  window,
  windows
) => {
  await paginatePrev(component, offset, dict, getFunc);

  const previousWindows = windows.map((window) => {
    return component
      .shadowRoot
      .querySelector(window);
  });

  component.render();

  for (let i = 0; i < windows.length; i++) {
    restorePositionDimension(component, previousWindows[i], windows[i]);
  }

  component.shadowRoot
    .querySelector(window)
    .style.zIndex = 10;

  component.attachButtonActions();
}

export { handlePaginateNext, handlePaginatePrev };
