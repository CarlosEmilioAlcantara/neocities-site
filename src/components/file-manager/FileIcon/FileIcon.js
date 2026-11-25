import { 
  handleOpen, 
  handleIconFocus, 
  handleIconUnfocus 
} from "./FileIconHandlers.js";

class FileIcon extends HTMLElement {
  static get observedAttributes() {
    return ["filename", "content"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.clickCount = 0;
    this.onOpen = () => handleOpen(this);
    this.onIconFocus = () => handleIconFocus(this);
    this.onIconUnfocus = (e) => handleIconUnfocus(this, e);
  }

  attachEventListeners() {
    this.shadowRoot
      .querySelector(".file-icon")
      .addEventListener("pointerdown", this.onIconFocus);
    this.shadowRoot
      .querySelector(".file-icon")
      .addEventListener("pointerdown", this.onOpen);
      
    window.addEventListener("pointerdown", this.onIconUnfocus);
  }

  detachEventListeners() {
    this.shadowRoot.removeEventListener("pointerdown", this.onIconFocus);
    this.shadowRoot.removeEventListener("pointerdown", this.onOpen);
    window.removeEventListener("pointerdown", this.onIconUnfocus);
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
    }
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.detachEventListeners();
  }

  render() {
    const filename = this.getAttribute("filename");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./FileIcon.css", import.meta.url)}");
      </style>

      <div class="file-icon">
        <img src="../../../assets/icons/desktop/text-file.webp" alt="File" />
        ${filename ? `<p class="filename">${filename}</p>` : ""}
      </div>
    `
  }
}

customElements.define("file-icon", FileIcon);
