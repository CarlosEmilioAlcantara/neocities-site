import { paginateNext } from "./paginateNext.js";

const handlePaginateNext = (
  component, 
  offset, 
  microblogs = false,
) => {
  paginateNext(component, offset, false, microblogs);
}

const handlePaginatePrev = (
  component, 
  offset, 
  microblogs = false,
) => {
  paginateNext(component, offset, true, microblogs);
}

export { handlePaginateNext, handlePaginatePrev };
