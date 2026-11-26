export const checkItemsLength = ({
  component, 
  microblogs = false, 
  cassettes = false,
}) => {
  let toQueryPrev;
  let toQueryNext;

  if (microblogs) {
    toQueryPrev = "#prev-microblogs-page"
    toQueryNext = "#next-microblogs-page"
  } else if (cassettes) {
    toQueryPrev = "#storage-up"
    toQueryNext = "#storage-down"
  } else {
    toQueryPrev = "#prev-blogs-page"
    toQueryNext = "#next-blogs-page"
  }

  if ((component.offset - component.limit) < 0) {
    component.shadowRoot
      .querySelector(toQueryPrev)
      .classList.add("disabled");
  } else {
    component.shadowRoot
      .querySelector(toQueryPrev)
      .classList.remove("disabled");
  }

  if ((component.offset + component.limit) >= component.items.length) {
    component.shadowRoot
      .querySelector(toQueryNext)
      .classList.add("disabled");
  } else {
    component.shadowRoot
      .querySelector(toQueryNext)
      .classList.remove("disabled");
  }
}
