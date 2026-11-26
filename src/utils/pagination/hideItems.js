export const hideItems = ({component, microblogs = false}) => {
  let items = Array.prototype.slice.call(component
    .shadowRoot
    .querySelectorAll(microblogs ? "micro-blog" : "blog-item"));
  
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