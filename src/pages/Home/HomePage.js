import "../../components/window/WindowContainer/WindowContainer.js";
import "../../components/window/TitleBar/TitleBar.js";
import "../../components/window/WindowContent/WindowContent.js";
import "../../components/window/WindowIcon/WindowIcon.js";
import "../../components/blog/BlogItem/BlogItem.js";
import "../../components/blog/BlogWindow/BlogWindow.js";
import { getWindowWidth } from "../../utils/getWindowWidth.js";
import { getBlogs } from "../../utils/getBlogs.js";

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.blogBata = [];
  }

  async connectedCallback() {
    this.blogData = await getBlogs();
    this.render();
  }

  blogs = new URL("../../assets/icons/desktop/blogs.webp", import.meta.url).href;

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}")
        @import url("${new URL("./HomePage.css", import.meta.url)}")
      </style>

      <div class="home">
        <window-icon
          icon=${this.blogs}
          title="Blogs"
          bottom="1"
          left="1"
          window="blogs"
        ></window-icon>

        <window-container
          id="blogs"
          start-x="20" 
          start-y="25" 
          start-width="400" 
          start-height="${getWindowWidth() ? 600 : 400}"
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
          </window-content>
        </window-container>

        <blog-window></blog-window>
      </div>
    `
  }
}

customElements.define("home-page", HomePage);
