import { 
  handleClose, 
  handleDrag, 
  handleMinimize,
} from "./TitleBarHandlers.js";

class TitleBar extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.contentVisible = true;

    this.onClose = () => handleClose(this);
    this.onDrag = (e) => handleDrag(this, e);
    this.onMinimize = () => handleMinimize(this);
  }

  attachEventListeners() {
    this.shadowRoot
      .querySelector(".close-button")
      .addEventListener("click", this.onClose);
    
    this.shadowRoot
      .querySelector(".drag-button")
      .addEventListener("pointerdown", this.onDrag);
    
    this.shadowRoot
      .querySelector(".minimize-button")
      .addEventListener("click", this.onMinimize);
  }

  detachEventListeners() {
    this.removeEventListener("click", this.onClose);
    this.removeEventListener("pointerdown", this.onDrag);
    this.removeEventListener("click", this.onMinimize);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
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
    const title = this.getAttribute("title");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./TitleBar.css", import.meta.url)}");
      </style>

      <div class="title-bar">
        <div class="buttons">
          <button tabindex="-1" class="button close-button">
          </button>

          <button tabindex="-1" class="button drag-button">
          </button>

          <button tabindex="-1" class="button minimize-button">
          </button>
        </div>

        ${title ? `<p class="title">${title}</p>` : ""}
      </div>
    `;
  }
}

customElements.define("title-bar", TitleBar);
