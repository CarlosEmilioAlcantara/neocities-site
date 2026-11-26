const paginateNext = (component, offset, prev = false, microblogs = false) => {
  let blogItems = Array.prototype.slice.call(component
    .shadowRoot
    .querySelectorAll(microblogs ? "micro-blog": "blog-item"));

  blogItems.forEach((blogItem) => {
    blogItem.style.display = "none";
  })

  if (prev) {
    component[offset] = component[offset] - component.limit;
  } else {
    component[offset] = component[offset] + component.limit;
  }

  blogItems = blogItems.slice(
    component[offset],
    (component.limit + component[offset])
  );

  blogItems.forEach((blogItem) => {
    blogItem.style.display = "block";
  });
}

export { paginateNext };
