export const hideItems = ({
  component, 
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
  });

  items = items.slice(
    component.offset, 
    (component.limit + component.offset)
  );

  items.forEach((items) => {
    items.style.display = "block";
  });
};
