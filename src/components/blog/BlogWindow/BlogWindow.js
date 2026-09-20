import "../../window/WindowContainer/WindowContainer.js";
import "../../window/WindowContent/WindowContent.js";
import "../../window/TitleBar/TitleBar.js";
import { getWindowWidth } from "../../../utils/viewport/getWindowWidth.js";

class BlogWindow extends HTMLElement {
  static get observedAttributes() {
    return ["date", "title", "content", "image", "image-alt"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
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
            ${date ? `<small>${date}</small>` : ''}
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
