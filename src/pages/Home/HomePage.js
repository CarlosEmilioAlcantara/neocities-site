import "../../components/window/WindowContainer/WindowContainer.js";
import "../../components/window/TitleBar/TitleBar.js";
import "../../components/window/WindowContent/WindowContent.js";
import "../../components/window/WindowIcon/WindowIcon.js";
import "../../components/blog/BlogItem/BlogItem.js";
import "../../components/blog/BlogWindow/BlogWindow.js";
import "../../components/MicroBlog/MicroBlog.js";
import "../../components/Button/Button.js";
import { getWindowWidth } from "../../utils/viewport/getWindowWidth.js";
import { fetchBlogs } from "../../apis/fetchBlogs.js";
import { fetchMicroBlogs } from "../../apis/fetchMicroBlogs.js";
import { paginateNext } from "../../utils/pagination/paginateNext.js";
import { paginatePrev } from "../../utils/pagination/paginatePrev.js";

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.blogs = {};
    this.microBlogs = {};
    this.blogsOffset = 0;
    this.microBlogsOffset = 0;
    this.limit = 2;

    this.onBlogsClickNext = () => 
      paginateNext(this, "blogsOffset", "blogs", fetchBlogs, "#blogs");
    this.onBlogsClickPrev = () => 
      paginatePrev(this, "blogsOffset", "blogs", fetchBlogs, "#blogs");
    this.onMicroBlogsClickNext = () => paginateNext(
        this, 
        "microBlogsOffset", 
        "microBlogs", 
        fetchMicroBlogs, 
        "#micro-blogs"
    );
    this.onMicroBlogsClickPrev = () => paginatePrev(
        this, 
        "microBlogsOffset", 
        "microBlogs", 
        fetchMicroBlogs, 
        "#micro-blogs"
    )
  }

  attachButtonActions () {
    this.shadowRoot
      .querySelector("#next-blogs-page")
      .action = () => this.onBlogsClickNext();

    this.shadowRoot
      .querySelector("#prev-blogs-page")
      .action = () => this.onBlogsClickPrev();

    this.shadowRoot
      .querySelector("#next-microblogs-page")
      .action = () => this.onMicroBlogsClickNext();

    this.shadowRoot
      .querySelector("#prev-microblogs-page")
      .action = () => this.onMicroBlogsClickPrev();
  }

  async connectedCallback() {
    this.blogs = await fetchBlogs({});
    this.microBlogs = await fetchMicroBlogs({});
    this.render();
    this.attachButtonActions();
  }

  blogsIcn = new URL("../../assets/icons/desktop/blogs.webp", import.meta.url).href;

  microBlogsIcn = new URL(
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
          icon="${this.blogsIcn}"
          title="Blogs"
          bottom="1"
          left="1"
          window="blogs"
        ></window-icon>

        <window-icon
          icon="${this.microBlogsIcn}"
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
            ${this.blogs.blogData.map((blog) => `
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
              <ui-button 
                id="prev-blogs-page" 
                page-control
                page-control-left
                ${(this.blogsOffset - this.limit) < 0 && 'disabled'}
              ></ui-button>

              <ui-button 
                id="next-blogs-page" 
                page-control
                page-control-right
                ${((this.blogsOffset + this.limit) >= 
                  this.blogs.length) && 'disabled'
                }
              ></ui-button>
            </div>
          </window-content>
        </window-container>

        <window-container
          id="micro-blogs"
          start-x="620" 
          start-y="25" 
          start-width="400" 
          start-height="${getWindowWidth() ? 600 : 400}"
        >
          <title-bar title="Micro Blogs" slot="title-bar"></title-bar>

          <window-content slot="window-content">
            ${this.microBlogs.microBlogData.map((blog) => `
              <micro-blog 
                date="${blog.date}"
                post="${blog.post}"
              ></micro-blog>
            `).join("")}

            <div style="display: flex; gap: 2em; justify-content: end;">
              <ui-button 
                id="prev-microblogs-page" 
                page-control
                page-control-left
                ${(this.microBlogsOffset - this.limit) < 0 && 'disabled'}
              ></ui-button>

              <ui-button 
                id="next-microblogs-page" 
                page-control
                page-control-right
                ${((this.microBlogsOffset + this.limit) >= 
                  this.microBlogs.length) && 'disabled'
                }
              ></ui-button>
            </div>
          </window-content>
        </window-container>

        <blog-window closed></blog-window>
      </div>
    `
  }
}

customElements.define("home-page", HomePage);
