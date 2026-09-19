import "../../components/window/WindowContainer/WindowContainer.js";
import "../../components/window/TitleBar/TitleBar.js";
import "../../components/window/WindowContent/WindowContent.js";
import "../../components/window/WindowIcon/WindowIcon.js";
import "../../components/blog/BlogItem/BlogItem.js";
import "../../components/blog/BlogWindow/BlogWindow.js";
import "../../components/MicroBlog/MicroBlog.js";
import "../../components/Button/Button.js";
import { getWindowWidth } from "../../utils/getWindowWidth.js";
import { getBlogs } from "../../utils/getBlogs.js";
import { getMicroBlogs } from "../../utils/getMicroBlogs.js";

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.blogData = [];
    this.microBlogData = [];
    this.offset = 0;
    this.limit = 2;
  }

  handleGetNextBlogs = async () => {
    this.offset = this.offset + this.limit;
    this.blogData = await getBlogs({offset: this.offset});
    this.render();

    const nextPageBtn =
      this.shadowRoot
      .querySelector("#next-page");

    nextPageBtn.action = () => this.handleGetNextBlogs();

    const prevPageBtn =
      this.shadowRoot
      .querySelector("#prev-page");

    prevPageBtn.action = () => this.handleGetPrevBlogs();
  }

  handleGetPrevBlogs = async () => {
    this.offset = this.offset - this.limit;
    this.blogData = await getBlogs({offset: this.offset});
    this.render();

    const nextPageBtn =
      this.shadowRoot
      .querySelector("#next-page");

    nextPageBtn.action = () => this.handleGetNextBlogs();

    const prevPageBtn =
      this.shadowRoot
      .querySelector("#prev-page");

    prevPageBtn.action = () => this.handleGetPrevBlogs();
  }

  async connectedCallback() {
    this.blogData = await getBlogs({});
    this.microBlogBata = await getMicroBlogs();
    this.render();

    const nextPageBtn =
      this.shadowRoot
      .querySelector("#next-page");

    nextPageBtn.action = () => this.handleGetNextBlogs();

    const prevPageBtn =
      this.shadowRoot
      .querySelector("#prev-page");

    prevPageBtn.action = () => this.handleGetPrevBlogs();
  }

  blogs = new URL("../../assets/icons/desktop/blogs.webp", import.meta.url).href;

  microBlogs = new URL(
    "../../assets/icons/desktop/micro-blogs.webp", 
    import.meta.url
  ).href;

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}")
        @import url("${new URL("./HomePage.css", import.meta.url)}")
      </style>

      <div class="home">
        <window-icon
          icon="${this.blogs}"
          title="Blogs"
          bottom="1"
          left="1"
          window="blogs"
        ></window-icon>

        <window-icon
          icon="${this.microBlogs}"
          title="Micro Blogs"
          bottom="1"
          left="${getWindowWidth() >= 1536 ? 5 : 7}"
          window="micro-blogs"
        ></window-icon>

        <window-container
          id="blogs"
          start-x="20" 
          start-y="25" 
          start-width="400" 
          start-height="${getWindowWidth() >= 1536 ? 600 : 400}"
          active
        >
          <title-bar title="Blogs" slot="title-bar"></title-bar>

          <window-content slot="window-content">
            ${this.blogData.map((blog) => `
              <blog-item 
                date="${blog.date}"
                title="${blog.title}"
                image="${blog.image}"
                image-alt="${blog.imageAlt}"
                description="${blog.description}"
                content="${blog.content}"
              ></blog-item>
            `).join("")}

            <div style="display: flex; gap: 2em; justify-content: end;">
              ${this.blogData.length > 0 
                ? `<ui-button 
                    id="next-page" 
                    label="test"
                    page-control
                   ></ui-button>`
                : `<button disabled class="ewan">Ewan</button>`
              }

              ${this.blogData.length > 0 
                ? `<ui-button 
                    id="prev-page" 
                    label="test"
                    page-control
                   ></ui-button>`
                : `<button disabled class="ewan">Ewan</button>`
              }
            </div>
          </window-content>
        </window-container>

        <window-container
          id="micro-blogs"
          start-x="620" 
          start-y="25" 
          start-width="400" 
          start-height="${getWindowWidth() ? 600 : 400}"
          closed
        >
          <title-bar title="Micro Blogs" slot="title-bar"></title-bar>

          <window-content slot="window-content">
            ${this.microBlogBata.map((blog) => `
              <micro-blog 
                date="${blog.date}"
                post="${blog.post}"
              ></micro-blog>
            `).join("")}
          </window-content>
        </window-container>

        <blog-window closed></blog-window>
      </div>
    `
  }
}

customElements.define("home-page", HomePage);
