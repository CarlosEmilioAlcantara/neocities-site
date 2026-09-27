const paginatePrev = async (component, offset, dict, getFunc) => {
  component[offset] = component[offset] - component.limit;
  component[dict] = await getFunc({offset: component[offset]});
}

export { paginatePrev };
