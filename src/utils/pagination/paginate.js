export const paginate = ({
  component, 
  prev = false, 
  microblogs = false,
  cassettes = false,
}) => {
  let toQuery;

  if (microblogs) {
    toQuery = "micro-blog"
  } else if (cassettes) {
    toQuery = ".playlist"
  } else {
    toQuery = "blog-item"
  }

  let items = Array.prototype.slice.call(component
    .shadowRoot
    .querySelectorAll(toQuery));

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
