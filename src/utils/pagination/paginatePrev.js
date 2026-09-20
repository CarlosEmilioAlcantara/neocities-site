import { 
  restorePositionDimension 
} from "../viewport/restorePositionDimension.js";

const paginatePrev = async (component, getFunc, window) => {
  component.offset = component.offset - component.limit;
  component.blogs = await getFunc({offset: component.offset});
  restorePositionDimension(component, window);
  component.attachButtonActions();
}

export {paginatePrev};
