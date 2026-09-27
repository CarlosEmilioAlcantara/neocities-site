import "../../window/WindowContainer/WindowContainer.js";
import "../../window/WindowContent/WindowContent.js";
import "../../window/TitleBar/TitleBar.js";
import { getWindowWidth } from "../../../utils/viewport/getWindowWidth.js";
import "../../Button/Button.js";

class BlogWindow extends HTMLElement {
  static get observedAttributes() {
    return ["date", "title", "content", "image", "image-alt", "link"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attachBlogPageLink() {
    const link = this.getAttribute("link");
    const blogPage = new URL(link, import.meta.url)

    this.shadowRoot
      .querySelector("#open-blog-btn")
      .action = () => window.location.href = blogPage;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachBlogPageLink();
    }
  }

  connectedCallback() {
    this.render();
    this.attachBlogPageLink();
  }

  render() {
    const date = this.getAttribute("date");
    const title = this.getAttribute("title");
    const image = this.getAttribute("image");
    const imageAlt = this.getAttribute("image-alt");

    let content;
    const contentArr = this.getAttribute("content");
    if (contentArr) { content = contentArr.split(","); }

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./BlogWindow.css", import.meta.url)}");
      </style>

      <window-container
        id="${title}"
        start-x="430" 
        start-y="25" 
        start-width="600" 
        start-height="${getWindowWidth() >= 1536 ? 800 : 700}"
        active
      >
        <title-bar title="${title}" slot="title-bar"></title-bar>

        <window-content slot="window-content">
          <div class="banner">
            ${title ? `<h2>${title}</h2>` : ''}

            <span class="link-and-date">
              ${date ? `<small>${date}</small>` : ''}
              <ui-button id="open-blog-btn" label="Open in own page" blog>
              </ui-button>
            </span>
            <hr />
          </div>

          <div class="image-wrapper">
            ${image ? `<img src=${image} alt="${imageAlt}" />` : ''}
          </div>

          <div class="content">
            ${content ? `${content.map((element) => 
              `${element}`).join("")
            }` : ''}
          </div>
        </window-content>
      </window-container>
    `
  }
}

customElements.define("blog-window", BlogWindow);
