export const paginate = ({component, prev = false, microblogs = false}) => {
  let items = Array.prototype.slice.call(component
    .shadowRoot
    .querySelectorAll(microblogs ? "micro-blog": "blog-item"));

  items.forEach((item) => {
    item.style.display = "none";
  })

  if (prev) {
    component.offset = component.offset - component.limit;
  } else {
    component.offset = component.offset + component.limit;
  }

  items = items.slice(
    component.offset,
    (component.limit + component.offset)
  );

  items.forEach((item) => {
    item.style.display = "block";
  });
}