import "../../window/WindowContainer/WindowContainer.js";
import "../../window/TitleBar/TitleBar.js";
import "../../window/WindowContent/WindowContent.js";
import "../BlogItem/BlogItem.js";
import "../../ui/Button/Button.js";
import { getWindowWidth } from "../../../utils/viewport/getWindowWidth.js";
import { fetchBlogs } from "../../../apis/fetchBlogs.js";
import { checkItemsLength } from "../../../utils/pagination/checkItemsLength.js";
import { hideItems } from "../../../utils/pagination/hideItems.js";
import { paginate } from "../../../utils/pagination/paginate.js";

class Blogs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.items = {};
    this.offset = 0;
    this.limit = 2;

    this.onClickNext = () => {
      paginate({component: this});
      checkItemsLength({component: this});
    }
    this.onClickPrev = () => {
      paginate({component: this, prev: true});
      checkItemsLength({component: this});
    }
  }

  attachButtonActions() {
    this.shadowRoot
      .querySelector("#next-blogs-page")
      .action = () => this.onClickNext();

    this.shadowRoot
      .querySelector("#prev-blogs-page")
      .action = () => this.onClickPrev();
  }

  async connectedCallback() {
    this.items = await fetchBlogs();
    this.render();
    hideItems({component: this});
    checkItemsLength({component: this});
    this.attachButtonActions();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./Blogs.css", import.meta.url)}");
      </style>

      <window-container
        id="blogs"
        start-x="${getWindowWidth() >= 1536 ? 20 : 351}" 
        start-y="${getWindowWidth() >= 1536 ? 391 : 25}" 
        start-width="${getWindowWidth() >= 1536 ? 300 : 335}" 
        start-height="${getWindowWidth() >= 1536 ? 385 : 335}"
        closed
      >
        <title-bar title="Blogs" slot="title-bar"></title-bar>

        <window-content slot="window-content">
          ${this.items.map((blog) => `
            <blog-item 
              date="${blog.date}"
              title="${blog.title}"
              image="${blog.image}"
              image-alt="${blog.imageAlt}"
              description="${blog.description}"
              content='${blog.content}'
              link="${blog.link}"
            ></blog-item>
          `).join("")}

          <div class="pagination-buttons">
            <ui-button 
              id="prev-blogs-page" 
              page-control
              page-control-left
            ></ui-button>

            <ui-button 
              id="next-blogs-page" 
              page-control
              page-control-right
            ></ui-button>
          </div>
        </window-content>
      </window-container>
    `
  }
}
customElements.define("blogs-window", Blogs);
