import "../window/WindowContainer/WindowContainer.js";
import "../window/TitleBar/TitleBar.js";
import "../window/WindowContent/WindowContent.js";
import "../blog/BlogItem/BlogItem.js";
import "../Button/Button.js";
import { getWindowWidth } from "../../utils/viewport/getWindowWidth.js";
import { fetchMicroBlogs } from "../../apis/fetchMicroBlogs.js";
import { checkItemsLength } from "../../utils/pagination/checkItemsLength.js";
import { hideItems } from "../../utils/pagination/hideItems.js";
import { paginate } from "../../utils/pagination/paginate.js";

class MicroBlogs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.blogs = {};
    this.offset = 0;
    this.limit = 2;

    this.onClickNext = () => {
      paginate({component: this, microblogs: true});
      checkItemsLength({component: this, microblogs: true});
    }
    this.onClickPrev = () => {
      paginate({component: this, prev: true, microblogs: true});
      checkItemsLength({component: this, microblogs: true});
    }
  }

  attachButtonActions() {
    this.shadowRoot
      .querySelector("#next-microblogs-page")
      .action = () => this.onClickNext();

    this.shadowRoot
      .querySelector("#prev-microblogs-page")
      .action = () => this.onClickPrev();

    this.shadowRoot
      .querySelector("#to-rolling-blogs")
      .action = () => 
        window.open("../../public/microblogs/rolling-blogs.html", "_blank").focus();
  }

  async connectedCallback() {
    this.blogs = await fetchMicroBlogs({});
    this.render();
    hideItems({component: this, microblogs: true});
    checkItemsLength({component: this, microblogs: true});
    this.attachButtonActions();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./MicroBlogs.css", import.meta.url)}");
      </style>

      <window-container
        id="micro-blogs"
        start-x="${getWindowWidth() >= 1536 ? 350 : 716}" 
        start-y="25" 
        start-width="400" 
        start-height="${getWindowWidth() >= 1536 ? 337 : 335}"
        closed
      >
        <title-bar title="Microblogs" slot="title-bar"></title-bar>

        <window-content slot="window-content">
          ${this.blogs.microBlogData.map((blog) => `
            <micro-blog 
              date="${blog.date}"
              post="${blog.post}"
            ></micro-blog>
          `).join("")}

          <div class="pagination-controls">
            <ui-button 
              label="Visit Rolling Microblogs Page" 
              id="to-rolling-blogs"
            ></ui-button>

            <div class="right">
              <ui-button 
                id="prev-microblogs-page" 
                page-control
                page-control-left
              ></ui-button>

              <ui-button 
                id="next-microblogs-page" 
                page-control
                page-control-right
              ></ui-button>
            </div>
          </div>
        </window-content>
      </window-container>
    `
  }
}
customElements.define("microblogs-window", MicroBlogs);