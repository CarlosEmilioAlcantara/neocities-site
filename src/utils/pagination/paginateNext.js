import { 
  restorePositionDimension 
} from "../viewport/restorePositionDimension.js";

const paginateNext = async (component, offset, dict, getFunc, window) => {
  component[offset] = component[offset] + component.limit;
  component[dict] = await getFunc({offset: component[offset]});
  restorePositionDimension(component, window);
  component.attachButtonActions();
}

export {paginateNext};
