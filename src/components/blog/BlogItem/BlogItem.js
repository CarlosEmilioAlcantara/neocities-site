import "../../Button/Button.js";

class BlogItem extends HTMLElement {
  static get observedAttributes() {
    return ["date", "title", "image", "image-alt", "description", "content"];
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

  handleOpen() {
    const page = document.documentElement
      .querySelector("home-page");

    const window = page
      .shadowRoot
      .querySelector("blog-window");

    window.setAttribute("title", this.getAttribute("title"));
    window.setAttribute("date", this.getAttribute("date"));
    window.setAttribute("image", this.getAttribute("image"));
    window.setAttribute("image-alt", this.getAttribute("image-alt"));
    window.setAttribute("content", this.getAttribute("content"));
  }

  connectedCallback() {
    this.render();

    this.shadowRoot
      .querySelector(".open-window")
      .addEventListener("click", this.handleOpen.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleOpen);
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
        ${title ? `<h2>${title}</h2>` : ''}
        <hr />

        <div class="item">
          <div class="link-and-date">
            ${date ? `<small>${date}</small>` : ''}
            <p class="open-window">[test]</p>
          </div>

          ${description ? `<p>${description}</p>` : ''}
        </div>
      </div>
    `
  }
}

customElements.define("blog-item", BlogItem);
