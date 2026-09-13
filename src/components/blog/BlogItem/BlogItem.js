import { handleOpen } from "./BlogItemHandlers.js";
import "../../Button/Button.js";

class BlogItem extends HTMLElement {
  static get observedAttributes() {
    return ["date", "title", "image", "image-alt", "description", "content"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.onOpen = () => handleOpen(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();

    const button = this.shadowRoot
      .querySelector("ui-button");

    button.action = () => this.onOpen();
  }

  render() {
    const date = this.getAttribute("date");
    const title = this.getAttribute("title");
    const description = this.getAttribute("description");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./BlogItem.css", import.meta.url)}");
      </style>

      <div class="blog-item">
        <div class="header">
          ${title ? `<h2>${title}</h2>` : ''}

          <span class="link-and-date">
            ${date ? `<small>${date}</small>` : ''}
            <ui-button label="View" blog></ui-button>
          </span>
        </div>
        <hr />

        <div class="item">
          ${description ? `<p>${description}</p>` : ''}
        </div>
      </div>
    `
  }
}

customElements.define("blog-item", BlogItem);
