export const checkItemsLength = ({component, microblogs = false}) => {
  if ((component.offset - component.limit) < 0) {
    component.shadowRoot
      .querySelector(microblogs ? "#prev-microblogs-page": "#prev-blogs-page")
      .classList.add("disabled");
  } else {
    component.shadowRoot
      .querySelector(microblogs ? "#prev-microblogs-page": "#prev-blogs-page")
      .classList.remove("disabled");
  }

  if ((component.offset + component.limit) >= component.blogs.length) {
    component.shadowRoot
      .querySelector(microblogs ? "#next-microblogs-page": "#next-blogs-page")
      .classList.add("disabled");
  } else {
    component.shadowRoot
      .querySelector(microblogs ? "#next-microblogs-page": "#next-blogs-page")
      .classList.remove("disabled");
  }
}