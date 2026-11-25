import "../../window/WindowContainer/WindowContainer.js";
import "../../window/WindowContent/WindowContent.js";
import "../../window/TitleBar/TitleBar.js";

class FileWindow extends HTMLElement {
  static get observedAttributes() {
    return ["filename", "content"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const filename = this.getAttribute("filename");

    let content;
    const contentArr = this.getAttribute("content");
    if (contentArr) { content = contentArr.split(","); }

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./FileWindow.css", import.meta.url)}");
      </style>

      <window-container
        id="${filename}"
        start-x="430"
        start-y="25"
        start-width="400"
        start-height="700"
      >
        <title-bar title="${filename}" slot="title-bar"></title-bar>

        <window-content slot="window-content" center>
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

customElements.define("file-window", FileWindow);