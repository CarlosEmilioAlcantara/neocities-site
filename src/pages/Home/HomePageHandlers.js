const hideBlogItems = (component, microblogs = false) => {
  let blogItems = Array.prototype.slice.call(component
    .shadowRoot
    .querySelectorAll(microblogs ? "micro-blog" : "blog-item"));
  
  blogItems.forEach((blogItem) => {
    blogItem.style.display = "none";
  });

  blogItems = blogItems.slice(
    component.blogsOffset, 
    (component.limit + component.blogsOffset)
  );

  blogItems.forEach((blogItem) => {
    blogItem.style.display = "block";
  });
};

const checkBlogItemsLength = (component, microblogs = false) => {
  let blogItemsOffset;
  let blogs;

  if (microblogs) {
    blogItemsOffset = component.microBlogsOffset;
    blogs = component.microBlogs;
  } else {
    blogItemsOffset = component.blogsOffset;
    blogs = component.blogs;
  }

  if ((blogItemsOffset - component.limit) < 0) {
    component.shadowRoot
      .querySelector(microblogs ? "#prev-microblogs-page": "#prev-blogs-page")
      .classList.add("disabled");
  } else {
    component.shadowRoot
      .querySelector(microblogs ? "#prev-microblogs-page": "#prev-blogs-page")
      .classList.remove("disabled");
  }

  if ((blogItemsOffset + component.limit) >= blogs.length) {
    component.shadowRoot
      .querySelector(microblogs ? "#next-microblogs-page": "#next-blogs-page")
      .classList.add("disabled");
  } else {
    component.shadowRoot
      .querySelector(microblogs ? "#next-microblogs-page": "#next-blogs-page")
      .classList.remove("disabled");
  }

  console.log("checked");
}

export { hideBlogItems, checkBlogItemsLength };